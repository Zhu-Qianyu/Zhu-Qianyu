<script setup>
import { ref, watch, nextTick, onUnmounted, onMounted } from 'vue'
import { HandLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const status = ref('idle')
const errorMsg = ref('')
const videoRef = ref(null)
const canvasRef = ref(null)

const base = import.meta.env.BASE_URL
const WASM = `${base}mediapipe/wasm`
const MODEL = `${base}models/hand_landmarker.task`

const FINGER_CHAINS = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
  [17, 18, 19, 20],
]

const PALM_RING = [0, 1, 5, 9, 13, 17]

/** Hand mesh triangles (21-landmark topology) for skin fill */
const HAND_MESH = [
  [0, 1, 5],
  [1, 2, 5],
  [2, 3, 5],
  [3, 4, 5],
  [0, 5, 9],
  [5, 6, 9],
  [6, 7, 9],
  [7, 8, 9],
  [0, 9, 13],
  [9, 10, 13],
  [10, 11, 13],
  [11, 12, 13],
  [0, 13, 17],
  [13, 14, 17],
  [14, 15, 17],
  [15, 16, 17],
  [0, 17, 1],
  [17, 18, 1],
  [18, 19, 1],
  [19, 20, 1],
]

let handLandmarker = null
let stream = null
let rafId = 0
let lastVideoTime = -1
let drawingUtils = null

function close() {
  emit('update:modelValue', false)
}

function toPx(landmark, w, h) {
  return { x: landmark.x * w, y: landmark.y * h }
}

function drawHandSkin(ctx, landmarks, w, h) {
  const pts = landmarks.map((lm) => toPx(lm, w, h))

  ctx.save()
  ctx.globalCompositeOperation = 'source-over'

  // Skin fill mesh
  ctx.fillStyle = 'rgba(255, 198, 158, 0.55)'
  ctx.strokeStyle = 'rgba(210, 140, 100, 0.28)'
  ctx.lineWidth = 1

  for (const [a, b, c] of HAND_MESH) {
    ctx.beginPath()
    ctx.moveTo(pts[a].x, pts[a].y)
    ctx.lineTo(pts[b].x, pts[b].y)
    ctx.lineTo(pts[c].x, pts[c].y)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  // Palm base
  ctx.fillStyle = 'rgba(255, 205, 165, 0.5)'
  ctx.beginPath()
  ctx.moveTo(pts[PALM_RING[0]].x, pts[PALM_RING[0]].y)
  for (let i = 1; i < PALM_RING.length; i += 1) {
    ctx.lineTo(pts[PALM_RING[i]].x, pts[PALM_RING[i]].y)
  }
  ctx.closePath()
  ctx.fill()

  // Finger volume strokes
  for (const chain of FINGER_CHAINS) {
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = 'rgba(255, 210, 175, 0.62)'
    ctx.lineWidth = 14
    ctx.beginPath()
    ctx.moveTo(pts[chain[0]].x, pts[chain[0]].y)
    for (let i = 1; i < chain.length; i += 1) {
      ctx.lineTo(pts[chain[i]].x, pts[chain[i]].y)
    }
    ctx.stroke()

    ctx.strokeStyle = 'rgba(255, 160, 120, 0.35)'
    ctx.lineWidth = 6
    ctx.stroke()
  }

  // Wireframe overlay
  if (drawingUtils && HandLandmarker.HAND_CONNECTIONS) {
    drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, {
      color: 'rgba(100, 180, 255, 0.55)',
      lineWidth: 2,
    })
    drawingUtils.drawLandmarks(landmarks, {
      color: 'rgba(59, 130, 246, 0.85)',
      lineWidth: 1,
      radius: 2.5,
    })
  }

  ctx.restore()
}

async function initModel() {
  if (handLandmarker) return
  const vision = await FilesetResolver.forVisionTasks(WASM)
  const opts = {
    baseOptions: { modelAssetPath: MODEL, delegate: 'GPU' },
    runningMode: 'VIDEO',
    numHands: 2,
  }
  try {
    handLandmarker = await HandLandmarker.createFromOptions(vision, opts)
  } catch {
    handLandmarker = await HandLandmarker.createFromOptions(vision, {
      ...opts,
      baseOptions: { modelAssetPath: MODEL, delegate: 'CPU' },
    })
  }
}

async function startCamera() {
  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
    audio: false,
  })
  const video = videoRef.value
  video.srcObject = stream
  await video.play()
}

function stopAll() {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
  lastVideoTime = -1

  if (stream) {
    stream.getTracks().forEach((t) => t.stop())
    stream = null
  }
  if (videoRef.value) {
    videoRef.value.srcObject = null
  }
  if (handLandmarker) {
    handLandmarker.close()
    handLandmarker = null
  }
  drawingUtils = null
  status.value = 'idle'
  errorMsg.value = ''
}

function detectLoop() {
  const video = videoRef.value
  const canvas = canvasRef.value
  if (!video || !canvas || !handLandmarker || !props.modelValue) return

  if (video.readyState >= 2) {
    const w = video.videoWidth
    const h = video.videoHeight
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      drawingUtils = new DrawingUtils(ctx)
    }

    if (video.currentTime !== lastVideoTime) {
      lastVideoTime = video.currentTime
      const result = handLandmarker.detectForVideo(video, performance.now())
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, w, h)

      if (result.landmarks?.length) {
        for (const landmarks of result.landmarks) {
          drawHandSkin(ctx, landmarks, w, h)
        }
      }
    }
  }

  rafId = requestAnimationFrame(detectLoop)
}

async function boot() {
  status.value = 'loading'
  errorMsg.value = ''
  try {
    await nextTick()
    await initModel()
    await startCamera()
    status.value = 'running'
    detectLoop()
  } catch (err) {
    status.value = 'error'
    errorMsg.value =
      err?.message ||
      'Could not access the camera. Check browser permissions or use HTTPS / localhost.'
    stopAll()
  }
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) boot()
    else stopAll()
  },
)

function onKeydown(e) {
  if (e.key === 'Escape' && props.modelValue) close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  stopAll()
})
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="hand-overlay" role="dialog" aria-modal="true" aria-label="Hand tracking">
      <div class="hand-panel">
        <header class="hand-head">
          <div>
            <h3>Hand mesh</h3>
            <p class="hand-sub">
              {{ status === 'loading' ? 'Loading model and camera…' : 'Live hand tracking with mesh overlay' }}
            </p>
          </div>
          <button type="button" class="hand-close" aria-label="Close" @click="close">×</button>
        </header>

        <div class="hand-viewport-wrap">
          <div class="hand-viewport hand-mirror">
            <video ref="videoRef" class="hand-video" playsinline muted />
            <canvas ref="canvasRef" class="hand-canvas" />
          </div>
          <p v-if="status === 'loading'" class="hand-status">Loading…</p>
          <p v-if="status === 'error'" class="hand-status hand-status-error">{{ errorMsg }}</p>
        </div>

        <footer class="hand-foot">
          <span>MediaPipe Hand Landmarker · on-device inference</span>
          <button type="button" class="hand-stop" @click="close">Close camera</button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.hand-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(8, 18, 36, 0.72);
  backdrop-filter: blur(8px);
}

.hand-panel {
  width: min(100%, 880px);
  background: rgba(22, 38, 62, 0.95);
  border: 1px solid rgba(96, 165, 250, 0.25);
  border-radius: 16px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.45);
  overflow: hidden;
}

.hand-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.15rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.hand-head h3 {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
}

.hand-sub {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.hand-close {
  width: 32px;
  height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text);
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
}

.hand-close:hover {
  border-color: rgba(96, 165, 250, 0.4);
}

.hand-viewport-wrap {
  position: relative;
}

.hand-viewport {
  aspect-ratio: 16 / 10;
  background: #0a1424;
  overflow: hidden;
  position: relative;
}

/* 镜像预览：与前置摄像头习惯一致，蒙皮与画面同步翻转 */
.hand-mirror {
  transform: scaleX(-1);
}

.hand-video,
.hand-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hand-canvas {
  pointer-events: none;
  z-index: 2;
}

.hand-status {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 3;
  font-size: 0.9rem;
  color: var(--text-muted);
  background: rgba(10, 20, 36, 0.55);
}

.hand-status-error {
  padding: 1.5rem;
  text-align: center;
  color: #fca5a5;
}

.hand-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.15rem;
  font-size: 0.72rem;
  color: var(--text-dim);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.hand-stop {
  padding: 0.45rem 0.85rem;
  border-radius: 8px;
  border: 1px solid rgba(96, 165, 250, 0.35);
  background: rgba(59, 130, 246, 0.18);
  color: var(--text);
  font-family: inherit;
  font-size: 0.78rem;
  cursor: pointer;
}

.hand-stop:hover {
  background: rgba(59, 130, 246, 0.3);
}
</style>
