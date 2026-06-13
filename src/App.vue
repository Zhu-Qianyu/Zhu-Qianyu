<script setup>
import { ref, onMounted, watch } from 'vue'
import {
  profile,
  nav,
  themes,
  workItems,
  researchItems,
  ventureItems,
} from './data/profile.js'
import HandTracker from './components/HandTracker.vue'

const handOpen = ref(false)
const theme = ref('blue')
const themeStatus = ref('blue')
const year = new Date().getFullYear()
const profilePhoto = `${import.meta.env.BASE_URL}${profile.photo}`

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function setTheme(id) {
  theme.value = id
  themeStatus.value = id
  document.documentElement.setAttribute('data-theme', id)
  try {
    localStorage.setItem('zq-theme', id)
  } catch {
    /* ignore */
  }
}

onMounted(() => {
  let saved = 'blue'
  try {
    saved = localStorage.getItem('zq-theme') || 'blue'
  } catch {
    /* ignore */
  }
  if (themes.some((t) => t.id === saved)) {
    setTheme(saved)
  } else {
    setTheme('blue')
  }
})

watch(theme, (id) => {
  document.documentElement.setAttribute('data-theme', id)
})
</script>

<template>
  <div class="site">
    <header class="site-head">
      <div class="site-head-inner">
        <a href="#" class="site-logo" @click.prevent="scrollTo('home')">{{ profile.nameEn }}</a>
        <nav class="site-nav" aria-label="Main">
          <button
            v-for="item in nav"
            :key="item.id"
            type="button"
            class="site-nav-link"
            @click="scrollTo(item.id)"
          >
            {{ item.label }}
          </button>
        </nav>
      </div>
    </header>

    <main>
      <section id="home" class="page-hero">
        <div class="page-hero-grid">
          <div class="page-hero-text">
            <h1 class="page-hero-title">{{ profile.nameEn }}</h1>
            <p class="page-hero-role">{{ profile.role }}</p>
            <ul class="page-hero-id">
              <li v-for="line in profile.identity" :key="line.text">
                <span v-if="line.period" class="page-hero-period">{{ line.period }}</span>
                <span>{{ line.text }}</span>
              </li>
            </ul>
            <div v-if="profile.intro" class="page-hero-intro">
              <p class="page-hero-lead">{{ profile.intro.lead }}</p>
              <ul class="page-hero-skills">
                <li v-for="skill in profile.intro.skills" :key="skill">{{ skill }}</li>
              </ul>
              <p class="page-hero-aside">{{ profile.intro.aside }}</p>
              <p class="page-hero-aitebot">{{ profile.intro.aitebot }}</p>
            </div>
          </div>
          <figure class="page-hero-photo">
            <img
              :src="profilePhoto"
              :alt="profile.photoAlt"
              width="280"
              height="350"
              loading="eager"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      <section id="work" class="page-section">
        <h2 class="page-heading">Work</h2>
        <ul class="entry-list">
          <li v-for="item in workItems" :key="item.title + item.period" class="entry">
            <span class="entry-period">{{ item.period }}</span>
            <div class="entry-body">
              <h3>{{ item.title }}</h3>
              <p v-if="item.advisor" class="entry-advisor">{{ item.advisor }}</p>
              <p v-if="item.descHtml" class="entry-desc" v-html="item.descHtml" />
              <p v-else>{{ item.desc }}</p>
              <p v-if="item.links" class="entry-links">
                <a
                  v-for="link in item.links"
                  :key="link.href"
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                >{{ link.text }}</a>
              </p>
            </div>
          </li>
        </ul>
        <p class="page-lab">
          <button type="button" class="text-btn" @click="handOpen = true">Open hand mesh camera →</button>
        </p>
      </section>

      <section id="research" class="page-section">
        <h2 class="page-heading">Research</h2>
        <ul class="entry-list">
          <li v-for="item in researchItems" :key="item.title" class="entry">
            <span class="entry-period">{{ item.period }}</span>
            <div class="entry-body">
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
              <p v-if="item.links" class="entry-links">
                <a
                  v-for="link in item.links"
                  :key="link.href"
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                >{{ link.text }}</a>
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section id="venture" class="page-section">
        <h2 class="page-heading">Venture</h2>
        <ul class="entry-list">
          <li v-for="item in ventureItems" :key="item.title" class="entry">
            <span class="entry-period">{{ item.period }}</span>
            <div class="entry-body">
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </li>
        </ul>
      </section>

      <section id="contact" class="page-section page-section-last">
        <h2 class="page-heading">Contact</h2>
        <ul class="contact-list">
          <li><a :href="`mailto:${profile.email}`">{{ profile.email }}</a></li>
          <li><a :href="profile.github" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </section>
    </main>

    <footer class="site-foot">
      <p>All rights reserved. {{ profile.nameEn }} © {{ year }}.</p>
      <p class="site-foot-note">Made with Vue · inspired by <a href="https://www.ilithya.rocks/" target="_blank" rel="noopener noreferrer">ilithya.rocks</a></p>
    </footer>

    <aside id="js-picker" class="picker" aria-label="Theme picker">
      <p class="picker-status is-hidden" role="status">
        Current theme color is <span>{{ themeStatus }}</span>.
      </p>
      <ul class="picker-list">
        <li v-for="t in themes" :key="t.id" class="picker-item">
          <label class="picker-btn" :class="`picker-btn--${t.id}`" :data-theme="t.id">
            <input
              :id="t.id"
              v-model="theme"
              type="radio"
              name="theme"
              :value="t.id"
              class="is-hidden"
              @change="setTheme(t.id)"
            />
            <span class="is-hidden">{{ t.label }}</span>
          </label>
        </li>
      </ul>
    </aside>

    <HandTracker v-model="handOpen" />
  </div>
</template>

<style scoped>
.site {
  min-height: 100vh;
  padding-bottom: 5rem;
}

.site-head {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--c-bg);
  border-bottom: 1px solid var(--c-border);
  transition: background 0.35s ease;
}

.site-head-inner {
  width: min(100% - 2rem, 920px);
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0;
}

.site-logo {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--c-text);
  text-decoration: none;
  letter-spacing: -0.02em;
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem 0.75rem;
}

.site-nav-link {
  background: none;
  border: none;
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--c-text-soft);
  cursor: pointer;
  padding: 0.25rem 0;
  text-decoration: underline;
  text-underline-offset: 0.2em;
  text-decoration-color: transparent;
  transition: color 0.2s, text-decoration-color 0.2s;
}

.site-nav-link:hover {
  color: var(--c-text);
  text-decoration-color: currentColor;
}

.page-hero {
  width: min(100% - 2rem, 920px);
  margin-inline: auto;
  padding: 3.5rem 0 2.5rem;
  scroll-margin-top: 4rem;
}

.page-hero-grid {
  display: grid;
  grid-template-columns: 1fr min(260px, 34vw);
  gap: 2rem 2.5rem;
  align-items: start;
}

.page-hero-photo {
  margin: 0;
}

.page-hero-photo img {
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center 15%;
  border: 2px solid var(--c-border);
  box-shadow: 4px 4px 0 var(--c-text);
}

.page-hero-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin-bottom: 0.5rem;
}

.page-hero-role {
  font-size: clamp(1.1rem, 3vw, 1.45rem);
  font-weight: 600;
  margin-bottom: 1.5rem;
  max-width: 28rem;
}

.page-hero-id {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.page-hero-id li {
  font-size: 0.88rem;
  color: var(--c-text-soft);
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.65rem;
  align-items: baseline;
}

.page-hero-period {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--c-accent);
  flex-shrink: 0;
}

.page-hero-intro {
  margin-top: 1.75rem;
  max-width: 32rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.page-hero-lead,
.page-hero-aside,
.page-hero-aitebot {
  font-size: 0.88rem;
  color: var(--c-text-soft);
  line-height: 1.55;
}

.page-hero-skills {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding-left: 0.15rem;
}

.page-hero-skills li {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--c-text);
  line-height: 1.45;
}

.page-hero-skills li::before {
  content: '—';
  margin-right: 0.45rem;
  font-weight: 500;
  color: var(--c-accent);
}

.page-hero-aitebot {
  padding-top: 0.35rem;
  border-top: 1px solid var(--c-border);
}

.page-section {
  width: min(100% - 2rem, 920px);
  margin-inline: auto;
  padding: 2.5rem 0;
  border-top: 1px solid var(--c-border);
  scroll-margin-top: 4rem;
}

.page-section-last {
  padding-bottom: 4rem;
}

.page-heading {
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 4vw, 1.75rem);
  font-weight: 700;
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;
}

.page-lab {
  margin-top: 1.5rem;
}

.text-btn {
  background: none;
  border: none;
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--c-link);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 0.15em;
  padding: 0;
}

.text-btn:hover {
  opacity: 0.75;
}

.entry-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.entry {
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  gap: 1rem;
}

.entry-period {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--c-accent);
  padding-top: 0.15rem;
}

.entry-body h3 {
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.entry-advisor {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--c-accent);
  margin-bottom: 0.35rem;
}

.entry-body p {
  font-size: 0.88rem;
  color: var(--c-text-soft);
}

.entry-desc :deep(a) {
  color: var(--c-link);
  font-weight: 600;
}

.entry-desc :deep(a:hover) {
  opacity: 0.75;
}

.entry-links {
  margin-top: 0.45rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.entry-links a {
  font-size: 0.8rem;
  font-weight: 600;
}

.contact-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.site-foot {
  width: min(100% - 2rem, 920px);
  margin-inline: auto;
  padding: 2rem 0 1rem;
  border-top: 1px solid var(--c-border);
  font-size: 0.78rem;
  color: var(--c-text-soft);
}

.site-foot-note {
  margin-top: 0.35rem;
}

/* Theme picker — ilithya-style radio swatches */
.picker {
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  z-index: 40;
}

.picker-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.picker-btn {
  display: block;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  border: 2px solid var(--c-text);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  background: var(--c-picker);
}

.picker-btn:hover {
  transform: scale(1.08);
}

.picker-btn--blue { background: #4a9fd4; }
.picker-btn--purple { background: #7c6bb8; }
.picker-btn--hotpink { background: #ff4d94; }
.picker-btn--black { background: #333; border-color: #888; }

.picker-item:has(input:checked) .picker-btn {
  box-shadow: 0 0 0 3px var(--c-bg), 0 0 0 5px var(--c-text);
}

@media (max-width: 720px) {
  .page-hero-grid {
    grid-template-columns: 1fr;
  }

  .page-hero-photo {
    max-width: 200px;
    order: -1;
  }

  .site-head-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .entry {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }

  .picker {
    right: 0.75rem;
    bottom: 0.75rem;
  }
}
</style>
