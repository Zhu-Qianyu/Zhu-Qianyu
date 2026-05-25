<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  profile,
  focusAreas,
  techStack,
  projects,
  navItems,
} from './data/profile.js'

const skillLabels = {
  languages: '语言',
  frameworks: '框架',
  databases: '数据库',
  tools: '工具',
}

const activeSection = ref('about')
const menuOpen = ref(false)

function scrollTo(id) {
  menuOpen.value = false
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function onScroll() {
  const offsets = navItems.map(({ id }) => {
    const el = document.getElementById(id)
    return { id, top: el ? el.getBoundingClientRect().top : Infinity }
  })
  const current = offsets.find((o) => o.top > 120) ?? offsets[offsets.length - 1]
  const idx = Math.max(0, offsets.indexOf(current) - 1)
  activeSection.value = offsets[idx]?.id ?? 'about'
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="header">
    <div class="container header-inner">
      <a href="#" class="logo" @click.prevent="scrollTo('hero')">
        <span class="logo-mark">ZQ</span>
        <span class="logo-text">{{ profile.nameEn }}</span>
      </a>
      <nav class="nav" :class="{ open: menuOpen }">
        <button
          v-for="item in navItems"
          :key="item.id"
          type="button"
          class="nav-link"
          :class="{ active: activeSection === item.id }"
          @click="scrollTo(item.id)"
        >
          {{ item.label }}
        </button>
      </nav>
      <button
        type="button"
        class="menu-toggle"
        aria-label="菜单"
        @click="menuOpen = !menuOpen"
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  </header>

  <main>
    <section id="hero" class="hero">
      <div class="container hero-grid">
        <div class="hero-content">
          <p class="hero-greeting">你好，我是</p>
          <h1 class="hero-name">
            {{ profile.name }}
            <span class="hero-name-en">{{ profile.nameEn }}</span>
          </h1>
          <p class="hero-tagline">{{ profile.tagline }}</p>
          <p class="hero-bio">{{ profile.bio }}</p>
          <div class="hero-actions">
            <a
              :href="profile.github"
              class="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 主页
            </a>
            <button type="button" class="btn btn-ghost" @click="scrollTo('contact')">
              联系我
            </button>
          </div>
        </div>
        <div class="hero-visual">
          <div class="avatar-ring">
            <img
              :src="profile.avatar"
              :alt="profile.name"
              class="avatar"
              width="200"
              height="200"
            />
          </div>
          <ul class="focus-chips">
            <li v-for="area in focusAreas" :key="area.title">
              <span>{{ area.icon }}</span>
              {{ area.title }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section id="about" class="section">
      <div class="container">
        <p class="section-title">About</p>
        <h2 class="section-heading">关于我</h2>
        <div class="focus-grid">
          <article
            v-for="area in focusAreas"
            :key="area.title"
            class="focus-card"
          >
            <span class="focus-icon">{{ area.icon }}</span>
            <h3>{{ area.title }}</h3>
            <p>{{ area.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="skills" class="section section-alt">
      <div class="container">
        <p class="section-title">Skills</p>
        <h2 class="section-heading">技术栈</h2>
        <div class="skills-grid">
          <div v-for="(items, key) in techStack" :key="key" class="skill-group">
            <h3 class="skill-label">{{ skillLabels[key] }}</h3>
            <ul class="skill-tags">
              <li v-for="item in items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="projects" class="section">
      <div class="container">
        <p class="section-title">Projects</p>
        <h2 class="section-heading">精选项目</h2>
        <div class="project-grid">
          <article
            v-for="project in projects"
            :key="project.title"
            class="project-card"
          >
            <h3>{{ project.title }}</h3>
            <p>{{ project.desc }}</p>
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
            </div>
          </article>
        </div>
        <p class="project-hint">
          更多仓库见
          <a :href="profile.github" target="_blank" rel="noopener noreferrer"
            >GitHub</a
          >
        </p>
      </div>
    </section>

    <section id="contact" class="section section-alt">
      <div class="container contact-block">
        <p class="section-title">Contact</p>
        <h2 class="section-heading">保持联系</h2>
        <p class="contact-text">
          欢迎通过 GitHub 与我交流，或发送邮件（请在
          <code>src/data/profile.js</code> 中填写邮箱）。
        </p>
        <div class="contact-links">
          <a
            :href="profile.github"
            class="contact-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="contact-label">GitHub</span>
            <span class="contact-value">@Zhu-Qianyu</span>
          </a>
          <a
            :href="profile.repo"
            class="contact-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="contact-label">本仓库</span>
            <span class="contact-value">Zhu-Qianyu/Zhu-Qianyu</span>
          </a>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer-inner">
      <span>© {{ new Date().getFullYear() }} {{ profile.nameEn }}</span>
      <a :href="profile.repo" target="_blank" rel="noopener noreferrer"
        >源码 · GitHub</a
      >
    </div>
  </footer>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-h);
  background: rgba(12, 17, 23, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  z-index: 100;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text);
  text-decoration: none;
}

.logo-mark {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  background: var(--accent);
  color: #042f2e;
  font-weight: 700;
  font-size: 0.8rem;
  border-radius: 10px;
}

.logo-text {
  font-weight: 600;
  font-size: 0.95rem;
}

.nav {
  display: flex;
  gap: 0.25rem;
}

.nav-link {
  background: none;
  border: none;
  color: var(--text-muted);
  font-family: inherit;
  font-size: 0.9rem;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.nav-link:hover,
.nav-link.active {
  color: var(--text);
  background: var(--accent-soft);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 1px;
}

.hero {
  padding: calc(var(--header-h) + 4rem) 0 5rem;
  min-height: 90vh;
  display: flex;
  align-items: center;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 3rem;
  align-items: center;
}

.hero-greeting {
  color: var(--accent);
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.hero-name {
  font-size: clamp(2.25rem, 6vw, 3.25rem);
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 0.75rem;
}

.hero-name-en {
  display: block;
  font-size: 0.45em;
  font-weight: 500;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.hero-tagline {
  font-size: 1.15rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.hero-bio {
  max-width: 32rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.avatar-ring {
  padding: 4px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), #3b82f6);
  box-shadow: 0 0 48px var(--accent-glow);
}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--bg);
}

.focus-chips {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  max-width: 240px;
}

.focus-chips li {
  font-size: 0.8rem;
  padding: 0.35rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--text-muted);
}

.focus-chips span {
  margin-right: 0.25rem;
}

.section {
  padding: 5rem 0;
}

.section-alt {
  background: var(--bg-elevated);
  border-block: 1px solid var(--border);
}

.focus-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
}

.focus-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  transition: border-color 0.2s, transform 0.2s;
}

.focus-card:hover {
  border-color: rgba(20, 184, 166, 0.35);
  transform: translateY(-2px);
}

.focus-icon {
  font-size: 1.75rem;
  display: block;
  margin-bottom: 0.75rem;
}

.focus-card h3 {
  font-size: 1.1rem;
  margin-bottom: 0.35rem;
}

.focus-card p {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.skill-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
}

.skill-tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tags li {
  font-size: 0.85rem;
  padding: 0.4rem 0.85rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 999px;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.project-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.project-card h3 {
  margin-bottom: 0.5rem;
}

.project-card p {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.project-tags {
  display: flex;
  gap: 0.5rem;
}

.project-tags span {
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  background: var(--accent-soft);
  color: var(--accent);
  border-radius: 6px;
}

.project-hint {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.contact-block {
  text-align: center;
  max-width: 560px;
  margin-inline: auto;
}

.contact-text {
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.contact-text code {
  font-size: 0.85em;
  background: var(--bg-card);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.contact-card {
  flex: 1;
  min-width: 200px;
  max-width: 260px;
  padding: 1.25rem 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-align: left;
  color: inherit;
  transition: border-color 0.2s, transform 0.2s;
}

.contact-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  opacity: 1;
}

.contact-label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}

.contact-value {
  font-weight: 600;
  color: var(--accent);
}

.footer {
  padding: 2rem 0;
  border-top: 1px solid var(--border);
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav {
    position: fixed;
    top: var(--header-h);
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border);
    padding: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.25s, opacity 0.25s;
  }

  .nav.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-bio {
    margin-inline: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-visual {
    order: -1;
  }

  .footer-inner {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
