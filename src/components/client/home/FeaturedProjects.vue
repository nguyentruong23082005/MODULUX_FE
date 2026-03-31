<template>
  <section class="fp section-padding">
    <div class="container-custom">
      <div class="fp__grid">
        <!-- Cột trái: Tiêu đề + CTA -->
        <div class="fp__header" data-aos="fade-right" data-aos-duration="1000">
          <div class="fp__header-content">
            <h2 class="fp__title">Featured Projects</h2>
            <p class="fp__description">
              Explore our latest modular housing solutions, designed for sustainability, speed, and architectural excellence.
            </p>
          </div>
          <router-link to="/projects" class="fp__cta">
            <span>View All Projects</span>
            <svg class="fp__cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </router-link>
        </div>

        <!-- Card dự án Hero -->
        <article
          v-if="featured"
          class="fp__card fp__card--hero"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <router-link :to="`/projects/${featured.slug}`" class="fp__card-inner">
            <div class="fp__card-img-wrap">
              <img :src="featured.cardImage" :alt="featured.title" class="fp__card-img" />
              <div class="fp__card-overlay">
                <span class="fp__card-btn">View Details</span>
              </div>
            </div>
            <div class="fp__card-info">
              <h3 class="fp__card-name">{{ featured.title }}</h3>
              <div class="fp__card-meta">
                <svg class="fp__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span>Installation: {{ featured.installTime || 'Rapid' }}</span>
              </div>
            </div>
          </router-link>
        </article>

        <!-- 3 card nhỏ bên dưới -->
        <article
          v-for="(project, idx) in smallCards"
          :key="project.slug"
          class="fp__card fp__card--small"
          data-aos="fade-up"
          :data-aos-delay="(idx + 1) * 150"
          data-aos-duration="1000"
        >
          <router-link :to="`/projects/${project.slug}`" class="fp__card-inner">
            <div class="fp__card-img-wrap">
              <img :src="project.cardImage" :alt="project.title" class="fp__card-img" />
              <div class="fp__card-overlay">
                <span class="fp__card-btn">View Details</span>
              </div>
            </div>
            <div class="fp__card-info">
              <h3 class="fp__card-name">{{ project.title }}</h3>
              <div class="fp__card-meta">
                <span>{{ project.installTime || 'Modular' }}</span>
              </div>
            </div>
          </router-link>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
})

// Dự án Hero (index 0)
const featured = computed(() => {
  const p = props.projects[0]
  if (!p) return null
  // Fix đường dẫn ảnh nếu cần
  if (p.slug === 'canada-modular-home') {
    return { ...p, cardImage: '/images/home/z7064049794304_84f12356d5ae045c35679809cbab3cab.jpg' }
  }
  return p
})

// 3 dự án nhỏ bên dưới (index 1..3)
const smallCards = computed(() => {
  return props.projects.slice(1, 4).map(p => {
    // Ưu tiên dùng các ảnh có extension để tránh lỗi render của Vite
    if (p.slug === 'ecolux') return { ...p, cardImage: '/images/Ecolux-Overview-768x512.png' }
    if (p.slug === 'greenscape') return { ...p, cardImage: '/images/Greenscape-768x576.png' }
    if (p.slug === 'nahb-ibs-lv') return { ...p, cardImage: '/images/1757389588623-1212.jpg' }
    if (p.slug === 'hawaii-garden-studio') return { ...p, cardImage: '/images/Hawaii-Garden-Studio-Overview-1-1.png' }
    return p
  });
})
</script>

<style scoped>
.fp {
  background: #fdfdfd;
  overflow: hidden;
  padding-top: 3.5rem;
}

.fp__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 1024px) {
  .fp {
    padding-top: 4.5rem;
  }

  .fp__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 4rem 2.5rem;
  }

  .fp__header {
    grid-column: 1 / 2;
  }

  .fp__card--hero {
    grid-column: 2 / 4;
  }
}

/* ── Header ── */
.fp__header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 1rem;
}

.fp__subtitle {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  color: #0a4834;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
}

.fp__title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.fp__description {
  font-size: 1rem;
  color: #6c757d;
  line-height: 1.6;
  max-width: 320px;
}

.fp__cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 1rem 2rem;
  font-size: 0.938rem;
  font-weight: 700;
  color: #fff;
  background: #212529;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: 2rem;
  align-self: flex-start;
}

.fp__cta:hover {
  background: #0a4834;
  transform: translateY(-2px);
}

.fp__cta-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.fp__cta:hover .fp__cta-icon {
  transform: translateX(5px);
}

/* ── Card Styles ── */
.fp__card-inner {
  text-decoration: none;
  display: block;
}

.fp__card-img-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  background: #eee;
}

.fp__card-img {
  width: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.fp__card:hover .fp__card-img {
  transform: scale(1.08);
}

.fp__card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 72, 52, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.fp__card:hover .fp__card-overlay {
  opacity: 1;
}

.fp__card-btn {
  padding: 0.75rem 1.5rem;
  background: #fff;
  color: #0a4834;
  font-weight: 700;
  font-size: 0.875rem;
  transform: translateY(20px);
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.fp__card:hover .fp__card-btn {
  transform: translateY(0);
}

/* Hero Card */
.fp__card--hero .fp__card-img {
  height: 300px;
}

@media (min-width: 768px) {
  .fp__card--hero .fp__card-img { height: 400px; }
}

@media (min-width: 1024px) {
  .fp__card--hero .fp__card-img { height: 480px; }
}

/* Small Card */
.fp__card--small .fp__card-img {
  height: 240px;
}

@media (min-width: 1024px) {
  .fp__card--small .fp__card-img { height: 280px; }
}

.fp__card-info {
  padding: 0.5rem 0;
}

.fp__card-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 0.5rem;
  transition: color 0.3s;
}

.fp__card:hover .fp__card-name {
  color: #0a4834;
}

.fp__card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #6c757d;
  font-weight: 500;
}

.fp__card-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 767px) {
  .fp {
    padding-top: 2.5rem;
  }
}
</style>
