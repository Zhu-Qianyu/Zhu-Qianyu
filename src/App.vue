<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { profileBase, messages } from './data/profile.js'

const locale = ref('en')
const year = new Date().getFullYear()
const profilePhoto = `${import.meta.env.BASE_URL}${profileBase.photo}`

const t = computed(() => messages[locale.value] ?? messages.en)

function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path}`
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function setLocale(lang) {
  locale.value = lang
  try {
    localStorage.setItem('zq-lang', lang)
  } catch {
    /* ignore */
  }
}

function printPage() {
  window.print()
}

onMounted(() => {
  let saved = 'en'
  try {
    saved = localStorage.getItem('zq-lang') || 'en'
  } catch {
    /* ignore */
  }
  if (messages[saved]) setLocale(saved)
})

watch(locale, (lang) => {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
}, { immediate: true })
</script>

<template>
  <div class="page">
    <div class="toolbar no-print">
      <div class="lang-switch" role="group" :aria-label="locale === 'zh' ? '语言' : 'Language'">
        <button
          type="button"
          class="lang-btn"
          :class="{ active: locale === 'en' }"
          @click="setLocale('en')"
        >{{ t.ui.langEn }}</button>
        <span class="lang-sep">|</span>
        <button
          type="button"
          class="lang-btn"
          :class="{ active: locale === 'zh' }"
          @click="setLocale('zh')"
        >{{ t.ui.langZh }}</button>
      </div>
      <button type="button" class="print-btn" @click="printPage">{{ t.ui.print }}</button>
    </div>

    <header id="top" class="banner">
      <figure class="banner-photo">
        <img
          :src="profilePhoto"
          :alt="t.photoAlt"
          width="180"
          height="225"
          loading="eager"
        />
      </figure>

      <div class="banner-info">
        <h1>{{ t.name }}</h1>
        <p v-for="line in t.affiliation" :key="line" class="affiliation">{{ line }}</p>

        <div class="icon-links no-print">
          <a
            :href="`mailto:${profileBase.email}`"
            class="icon-link"
            :aria-label="`${t.ui.emailLabel} ${profileBase.email}`"
            :title="profileBase.email"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
          <a
            :href="profileBase.github"
            class="icon-link"
            aria-label="GitHub"
            title="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.021C22 6.484 17.523 2 12 2z" />
            </svg>
          </a>
        </div>

        <p class="print-contact print-only">
          {{ t.ui.emailLabel }}: {{ profileBase.email }} ·
          {{ t.ui.githubLabel }}: {{ profileBase.github }}
        </p>
      </div>
    </header>

    <nav class="toc no-print" aria-label="Sections">
      <a
        v-for="item in t.nav"
        :key="item.id"
        href="#"
        @click.prevent="scrollTo(item.id)"
      >{{ item.label }}</a>
    </nav>

    <main>
      <section id="bio" class="section">
        <h2>{{ t.sections.bio }}</h2>
        <p v-for="(para, i) in t.biography" :key="i" class="para">{{ para }}</p>
      </section>

      <section id="news" class="section">
        <h2>{{ t.sections.news }}</h2>
        <ul class="news-list">
          <li v-for="item in t.newsItems" :key="item.date + item.text">
            <strong>{{ item.date }}:</strong> {{ item.text }}
          </li>
        </ul>
      </section>

      <section id="publications" class="section">
        <h2>{{ t.sections.publications }}</h2>
        <article v-for="pub in t.publications" :key="pub.title" class="pub">
          <h3 class="pub-title">
            <a
              v-if="pub.links[0]"
              :href="pub.links[0].href"
              class="print-link"
              target="_blank"
              rel="noopener noreferrer"
            >{{ pub.title }}</a>
            <span v-else>{{ pub.title }}</span>
          </h3>
          <div class="media-row">
            <div class="media-body">
              <p class="pub-meta">{{ pub.authors }}</p>
              <p class="pub-venue"><em>{{ pub.venue }}</em></p>
              <p v-if="pub.links.length" class="pub-links">
                <span v-for="(link, i) in pub.links" :key="link.href">
                  [<a :href="link.href" class="print-link" target="_blank" rel="noopener noreferrer">{{ link.text }}</a>]<span v-if="i < pub.links.length - 1"> </span>
                </span>
              </p>
              <p class="pub-desc">{{ pub.desc }}</p>
            </div>
            <figure v-if="pub.image" class="media-figure">
              <img :src="assetUrl(pub.image)" :alt="pub.title" loading="lazy" />
            </figure>
          </div>
        </article>
      </section>

      <section id="projects" class="section">
        <h2>{{ t.sections.projects }}</h2>
        <article v-for="item in t.projectItems" :key="item.title" class="entry">
          <h3 class="entry-title">{{ item.title }}</h3>
          <div class="media-row">
            <div class="media-body">
              <p class="entry-meta">{{ item.period }}</p>
              <p class="entry-desc">{{ item.desc }}</p>
              <p v-if="item.links" class="entry-links">
                <span v-for="(link, i) in item.links" :key="link.href">
                  [<a :href="link.href" class="print-link" target="_blank" rel="noopener noreferrer">{{ link.text }}</a>]<span v-if="i < item.links.length - 1"> </span>
                </span>
              </p>
            </div>
            <figure v-if="item.image" class="media-figure">
              <img :src="assetUrl(item.image)" :alt="item.title" loading="lazy" />
            </figure>
          </div>
        </article>
      </section>

      <section id="experience" class="section">
        <h2>{{ t.sections.experience }}</h2>
        <article v-for="item in t.experienceItems" :key="item.title + item.period" class="entry">
          <h3 class="entry-title">{{ item.title }}</h3>
          <p class="entry-meta">{{ item.period }} · {{ item.org }}</p>
          <p class="entry-desc">{{ item.desc }}</p>
        </article>
      </section>

      <section id="honors" class="section">
        <h2>{{ t.sections.honors }}</h2>
        <ul class="honor-list">
          <li v-for="item in t.honors" :key="item.title">
            {{ item.title }}<br />
            <span class="honor-year">{{ item.year }}</span>
          </li>
        </ul>
      </section>

      <section id="misc" class="section section-last">
        <h2>{{ t.sections.misc }}</h2>
        <table class="misc-table">
          <tbody>
            <tr>
              <th>{{ t.sections.hobbies }}</th>
              <td>{{ t.misc.hobbies.join(' · ') }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>

    <footer class="footer">
      <p>© {{ t.name }} · {{ year }}</p>
    </footer>
  </div>
</template>

<style scoped>
.page {
  max-width: var(--max);
  margin: 0 auto;
  padding: 1.75rem 1.25rem 2.5rem;
}

.toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.88rem;
}

.lang-switch {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.lang-btn {
  background: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  color: var(--c-muted);
  cursor: pointer;
  padding: 0.15rem 0.25rem;
}

.lang-btn:hover,
.lang-btn.active {
  color: var(--c-text);
  font-weight: 600;
}

.lang-sep {
  color: var(--c-border);
}

.print-btn {
  background: none;
  border: 1px solid var(--c-border);
  font-family: inherit;
  font-size: inherit;
  color: var(--c-text);
  cursor: pointer;
  padding: 0.25rem 0.65rem;
  border-radius: 3px;
}

.print-btn:hover {
  border-color: var(--c-text);
}

.print-only {
  display: none;
}

.banner {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  padding-bottom: 1.25rem;
  border-bottom: 2px solid var(--c-text);
  scroll-margin-top: 1rem;
}

.banner-photo {
  margin: 0;
  flex: 0 0 160px;
}

.banner-photo img {
  width: 160px;
  height: auto;
  border: 1px solid var(--c-border);
}

.banner-info h1 {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.affiliation {
  font-size: 0.95rem;
  line-height: 1.45;
  margin-bottom: 0.1rem;
}

.icon-links {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.75rem;
}

.icon-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  text-decoration: none;
  color: var(--c-text);
}

.icon-link:hover {
  color: var(--c-muted);
}

.icon-link svg {
  width: 1.35rem;
  height: 1.35rem;
  fill: currentColor;
}

.print-contact {
  margin-top: 0.75rem;
  font-size: 0.92rem;
}

.toc {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  padding: 0.85rem 0;
  font-size: 0.88rem;
  border-bottom: 1px solid var(--c-border);
  margin-bottom: 0.5rem;
}

.toc a {
  color: var(--c-muted);
  text-decoration: none;
}

.toc a:hover {
  color: var(--c-text);
  text-decoration: underline;
}

.section {
  padding-top: 1.75rem;
  scroll-margin-top: 0.5rem;
}

.section-last {
  padding-bottom: 1rem;
}

.section h2 {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.85rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--c-border);
}

.para {
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  text-align: justify;
}

.para:last-child {
  margin-bottom: 0;
}

.news-list {
  padding-left: 1.25rem;
  font-size: 0.95rem;
}

.news-list li {
  margin-bottom: 0.45rem;
}

.pub {
  margin-bottom: 1.5rem;
}

.pub:last-child {
  margin-bottom: 0;
}

.media-row {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}

.media-figure {
  margin: 0;
  flex: 0 0 18rem;
  max-width: 18rem;
}

.media-figure img {
  width: 100%;
  height: auto;
  border: 1px solid var(--c-border);
  object-fit: contain;
}

.media-body {
  flex: 1;
  min-width: 0;
}

.pub-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.pub-title a {
  color: var(--c-text);
  text-decoration: none;
}

.pub-title a:hover {
  text-decoration: underline;
}

.pub-meta,
.pub-venue {
  font-size: 0.92rem;
  margin-bottom: 0.1rem;
}

.pub-links {
  font-size: 0.9rem;
  margin: 0.25rem 0;
}

.pub-desc {
  font-size: 0.92rem;
  color: var(--c-muted);
  margin-top: 0.25rem;
}

.entry {
  margin-bottom: 1.35rem;
}

.entry:last-child {
  margin-bottom: 0;
}

.entry-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.entry-meta {
  font-size: 0.88rem;
  color: var(--c-muted);
  margin-bottom: 0.2rem;
}

.entry-desc {
  font-size: 0.93rem;
}

.entry-links {
  font-size: 0.9rem;
  margin-top: 0.2rem;
}

.honor-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 0.75rem 1.5rem;
  font-size: 0.93rem;
}

.honor-year {
  font-size: 0.85rem;
  color: var(--c-muted);
}

.misc-table {
  width: 100%;
  max-width: 28rem;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.misc-table th {
  text-align: left;
  font-weight: 600;
  padding: 0.35rem 1rem 0.35rem 0;
  vertical-align: top;
  white-space: nowrap;
}

.misc-table td {
  padding: 0.35rem 0;
  vertical-align: top;
}

.footer {
  margin-top: 2.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--c-border);
  font-size: 0.85rem;
  color: var(--c-muted);
  text-align: center;
}

@media (max-width: 560px) {
  .banner {
    flex-direction: column;
    gap: 1rem;
  }

  .banner-photo img {
    width: 130px;
  }

  .media-row {
    flex-direction: column;
  }

  .media-figure {
    flex: 0 0 auto;
    max-width: 100%;
    width: min(100%, 20rem);
  }

  .honor-list {
    grid-template-columns: 1fr;
  }
}
</style>

<style>
@media print {
  .no-print {
    display: none !important;
  }

  .print-only {
    display: block !important;
  }

  body {
    font-size: 11pt;
    color: #000;
    background: #fff;
  }

  .page {
    max-width: none;
    padding: 0;
  }

  a.print-link {
    color: #000 !important;
    text-decoration: none !important;
  }

  a.print-link[href^='http']:after,
  a.print-link[href^='mailto']:after {
    content: ' (' attr(href) ')';
    font-size: 0.88em;
    word-break: break-all;
  }

  .media-figure img {
    max-height: 9cm;
  }

  .section {
    break-inside: avoid-page;
  }

  .pub {
    break-inside: avoid-page;
  }
}
</style>
