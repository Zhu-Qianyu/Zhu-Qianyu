<script setup>
import {
  profile,
  nav,
  biography,
  newsItems,
  publications,
  projectItems,
  experienceItems,
  honors,
  misc,
} from './data/profile.js'

const year = new Date().getFullYear()
const profilePhoto = `${import.meta.env.BASE_URL}${profile.photo}`

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="page">
    <header id="top" class="banner">
      <figure class="banner-photo">
        <img
          :src="profilePhoto"
          :alt="profile.photoAlt"
          width="180"
          height="225"
          loading="eager"
        />
      </figure>

      <div class="banner-info">
        <h1>{{ profile.nameEn }}</h1>
        <p v-for="line in profile.affiliation" :key="line" class="affiliation">{{ line }}</p>
        <p class="contact-line">
          Email:
          <a :href="`mailto:${profile.email}`">{{ profile.email.replace('@', ' [at] ') }}</a>
        </p>
        <p class="links-line">
          <a :href="profile.github" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </div>
    </header>

    <nav class="toc" aria-label="Sections">
      <a
        v-for="item in nav"
        :key="item.id"
        href="#"
        @click.prevent="scrollTo(item.id)"
      >{{ item.label }}</a>
    </nav>

    <main>
      <section id="bio" class="section">
        <h2>Biography</h2>
        <p v-for="(para, i) in biography" :key="i" class="para">{{ para }}</p>
      </section>

      <section id="news" class="section">
        <h2>News</h2>
        <ul class="news-list">
          <li v-for="item in newsItems" :key="item.date + item.text">
            <strong>{{ item.date }}:</strong> {{ item.text }}
          </li>
        </ul>
      </section>

      <section id="publications" class="section">
        <h2>Selected Publications</h2>
        <article v-for="pub in publications" :key="pub.title" class="pub">
          <h3 class="pub-title">
            <a
              v-if="pub.links[0]"
              :href="pub.links[0].href"
              target="_blank"
              rel="noopener noreferrer"
            >{{ pub.title }}</a>
            <span v-else>{{ pub.title }}</span>
          </h3>
          <p class="pub-meta">{{ pub.authors }}</p>
          <p class="pub-venue"><em>{{ pub.venue }}</em></p>
          <p v-if="pub.links.length" class="pub-links">
            <span v-for="(link, i) in pub.links" :key="link.href">
              [<a :href="link.href" target="_blank" rel="noopener noreferrer">{{ link.text }}</a>]<span v-if="i < pub.links.length - 1"> </span>
            </span>
          </p>
          <p class="pub-desc">{{ pub.desc }}</p>
        </article>
      </section>

      <section id="projects" class="section">
        <h2>Selected Projects</h2>
        <article v-for="item in projectItems" :key="item.title" class="entry">
          <h3 class="entry-title">{{ item.title }}</h3>
          <p class="entry-meta">{{ item.period }}</p>
          <p class="entry-desc">{{ item.desc }}</p>
          <p v-if="item.links" class="entry-links">
            <span v-for="(link, i) in item.links" :key="link.href">
              [<a :href="link.href" target="_blank" rel="noopener noreferrer">{{ link.text }}</a>]<span v-if="i < item.links.length - 1"> </span>
            </span>
          </p>
        </article>
      </section>

      <section id="experience" class="section">
        <h2>Experience</h2>
        <article v-for="item in experienceItems" :key="item.title + item.period" class="entry">
          <h3 class="entry-title">{{ item.title }}</h3>
          <p class="entry-meta">{{ item.period }} · {{ item.org }}</p>
          <p class="entry-desc">{{ item.desc }}</p>
        </article>
      </section>

      <section id="honors" class="section">
        <h2>Honors</h2>
        <ul class="honor-list">
          <li v-for="item in honors" :key="item.title">
            {{ item.title }}<br />
            <span class="honor-year">{{ item.year }}</span>
          </li>
        </ul>
      </section>

      <section id="misc" class="section section-last">
        <h2>Miscellaneous</h2>
        <table class="misc-table">
          <tbody>
            <tr>
              <th>Hobbies</th>
              <td>{{ misc.hobbies.join(' · ') }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>

    <footer class="footer">
      <p>© {{ profile.nameEn }} · {{ year }}</p>
    </footer>
  </div>
</template>

<style scoped>
.page {
  max-width: var(--max);
  margin: 0 auto;
  padding: 1.75rem 1.25rem 2.5rem;
}

/* Banner — Geng Li–style name card, photo left */
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

.contact-line,
.links-line {
  margin-top: 0.75rem;
  font-size: 0.95rem;
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
  margin-bottom: 1.35rem;
}

.pub:last-child {
  margin-bottom: 0;
}

.pub-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
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
  margin-bottom: 1.1rem;
}

.entry-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.1rem;
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

  .honor-list {
    grid-template-columns: 1fr;
  }
}
</style>
