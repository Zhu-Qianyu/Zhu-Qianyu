<script setup>
import {
  profile,
  nav,
  workItems,
  researchItems,
  ventureItems,
} from './data/profile.js'

const year = new Date().getFullYear()
const profilePhoto = `${import.meta.env.BASE_URL}${profile.photo}`

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="page">
    <header class="header">
      <a href="#" class="name" @click.prevent="scrollTo('home')">{{ profile.nameEn }}</a>
      <nav class="nav" aria-label="Main">
        <a
          v-for="item in nav"
          :key="item.id"
          href="#"
          @click.prevent="scrollTo(item.id)"
        >{{ item.label }}</a>
      </nav>
    </header>

    <main>
      <section id="home" class="hero">
        <div class="hero-main">
          <h1>{{ profile.nameEn }}</h1>
          <p class="role">{{ profile.role }}</p>

          <ul v-if="profile.intro?.skills" class="skills">
            <li v-for="skill in profile.intro.skills" :key="skill">{{ skill }}</li>
          </ul>

          <p v-if="profile.intro?.lead" class="text">{{ profile.intro.lead }}</p>
          <p v-if="profile.intro?.aside" class="text muted">{{ profile.intro.aside }}</p>
          <p v-if="profile.intro?.aitebot" class="text">{{ profile.intro.aitebot }}</p>

          <ul class="timeline">
            <li v-for="line in profile.identity" :key="line.text">
              <span v-if="line.period" class="when">{{ line.period }}</span>
              {{ line.text }}
            </li>
          </ul>
        </div>

        <figure class="photo">
          <img
            :src="profilePhoto"
            :alt="profile.photoAlt"
            width="200"
            height="250"
            loading="eager"
          />
        </figure>
      </section>

      <section id="work" class="section">
        <h2>Work</h2>
        <article v-for="item in workItems" :key="item.title + item.period" class="item">
          <p class="meta">{{ item.period }}</p>
          <h3>{{ item.title }}</h3>
          <p v-if="item.advisor" class="sub">{{ item.advisor }}</p>
          <p v-if="item.descHtml" class="desc" v-html="item.descHtml" />
          <p v-else class="desc">{{ item.desc }}</p>
          <p v-if="item.links" class="links">
            <a
              v-for="link in item.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
            >{{ link.text }}</a>
          </p>
        </article>
      </section>

      <section id="research" class="section">
        <h2>Research</h2>
        <article v-for="item in researchItems" :key="item.title" class="item">
          <p class="meta">{{ item.period }}</p>
          <h3>{{ item.title }}</h3>
          <p class="desc">{{ item.desc }}</p>
          <p v-if="item.links" class="links">
            <a
              v-for="link in item.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
            >{{ link.text }}</a>
          </p>
        </article>
      </section>

      <section id="venture" class="section">
        <h2>Venture</h2>
        <article v-for="item in ventureItems" :key="item.title" class="item">
          <p class="meta">{{ item.period }}</p>
          <h3>{{ item.title }}</h3>
          <p class="desc">{{ item.desc }}</p>
        </article>
      </section>

      <section id="contact" class="section section-last">
        <h2>Contact</h2>
        <p>
          <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
          ·
          <a :href="profile.github" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </section>
    </main>

    <footer class="footer">
      <p>{{ profile.nameEn }} · {{ year }}</p>
    </footer>
  </div>
</template>

<style scoped>
.page {
  max-width: var(--max);
  margin: 0 auto;
  padding: 2rem 1.25rem 3rem;
}

.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem 1.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--c-border);
  margin-bottom: 2.5rem;
}

.name {
  font-weight: 600;
  text-decoration: none;
  color: var(--c-text);
}

.name:hover {
  color: var(--c-muted);
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  font-size: 0.9rem;
}

.nav a {
  color: var(--c-muted);
  text-decoration: none;
}

.nav a:hover {
  color: var(--c-text);
  text-decoration: underline;
}

.hero {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2.5rem;
  scroll-margin-top: 1rem;
}

.hero-main {
  flex: 1 1 16rem;
  min-width: 0;
}

.hero h1 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.role {
  font-size: 1rem;
  margin-bottom: 1.25rem;
}

.skills {
  list-style: none;
  margin-bottom: 1rem;
}

.skills li {
  font-size: 0.95rem;
  margin-bottom: 0.15rem;
}

.skills li::before {
  content: '· ';
}

.text {
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.muted {
  color: var(--c-muted);
}

.timeline {
  list-style: none;
  margin-top: 1.25rem;
  font-size: 0.9rem;
  color: var(--c-muted);
}

.timeline li {
  margin-bottom: 0.35rem;
}

.when {
  display: inline-block;
  min-width: 7.5rem;
  font-variant-numeric: tabular-nums;
}

.photo {
  margin: 0;
  flex: 0 0 160px;
}

.photo img {
  width: 160px;
  height: auto;
  border: 1px solid var(--c-border);
}

.section {
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid var(--c-border);
  scroll-margin-top: 1rem;
}

.section-last {
  padding-bottom: 1rem;
}

.section h2 {
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--c-muted);
  margin-bottom: 1.25rem;
}

.item {
  margin-bottom: 1.5rem;
}

.item:last-child {
  margin-bottom: 0;
}

.meta {
  font-size: 0.85rem;
  color: var(--c-muted);
  margin-bottom: 0.15rem;
}

.item h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.sub {
  font-size: 0.9rem;
  color: var(--c-muted);
  margin-bottom: 0.25rem;
}

.desc {
  font-size: 0.95rem;
  color: var(--c-text);
}

.desc :deep(a) {
  color: var(--c-link);
}

.links {
  margin-top: 0.35rem;
  font-size: 0.9rem;
}

.links a + a {
  margin-left: 0.75rem;
}

.footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--c-border);
  font-size: 0.85rem;
  color: var(--c-muted);
}

@media (max-width: 540px) {
  .when {
    display: block;
    min-width: 0;
    margin-bottom: 0.1rem;
  }

  .photo {
    flex-basis: 100%;
  }

  .photo img {
    width: 140px;
  }
}
</style>
