<template>
  <div class="projects-page">
    <section class="projects-hero">
      <img class="projects-hero__image" src="/images/home/bando.webp" alt="Modular projects" />
      <div class="projects-hero__overlay"></div>

      <div class="projects-hero__content">
        <p class="projects-hero__eyebrow" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">MODULAR PROJECTS.</p>
        <h1 class="projects-hero__title" data-aos="fade-up" data-aos-offset="20" data-aos-delay="100">Explore our completed home projects for design inspiration and ideas.</h1>
        <button class="projects-hero__button" data-aos="fade-up" data-aos-offset="20" data-aos-delay="150" @click="scrollToProjects">
          See All Projects
        </button>
      </div>
    </section>

    <section ref="projectsRef" class="projects-filter-section">
      <div class="projects-filter">
        <div class="projects-filter__group">
          <h3 class="projects-filter__title">Bedrooms</h3>
          <p class="projects-filter__selected">Selected bedrooms: {{ filters.bedrooms === 'any' ? 'Any' : filters.bedrooms }}</p>
          <div class="projects-filter__popover">
            <button
              v-for="option in bedroomOptions"
              :key="`bed-${option}`"
              type="button"
              :class="['projects-filter__option', option === 'any' ? 'projects-filter__option--pill' : '', filters.bedrooms === option ? 'is-active' : '']"
              @click="setBedrooms(option)"
            >
              {{ option === 'any' ? 'Any' : option }}
            </button>
          </div>
        </div>

        <div class="projects-filter__group">
          <h3 class="projects-filter__title">Bathrooms</h3>
          <p class="projects-filter__selected">Selected bathrooms: {{ filters.bathrooms === 'any' ? 'Any' : filters.bathrooms }}</p>
          <div class="projects-filter__popover">
            <button
              v-for="option in bathroomOptions"
              :key="`bath-${option}`"
              type="button"
              :class="['projects-filter__option', option === 'any' ? 'projects-filter__option--pill' : '', filters.bathrooms === option ? 'is-active' : '']"
              @click="setBathrooms(option)"
            >
              {{ option === 'any' ? 'Any' : option }}
            </button>
          </div>
        </div>

        <div class="projects-filter__group">
          <h3 class="projects-filter__title">Area</h3>
          <p class="projects-filter__selected">{{ filters.area[0] }}sqft - {{ filters.area[1] }}sqft</p>
          <div class="projects-filter__popover projects-filter__popover--range">
            <label class="projects-filter__range-label">Min Area:</label>
            <input v-model.number="filters.area[0]" type="range" :min="180" :max="filters.area[1]" step="1" class="projects-filter__range" @input="resetVisibleCount" />
            <label class="projects-filter__range-label">Max Area:</label>
            <input v-model.number="filters.area[1]" type="range" :min="filters.area[0]" :max="1200" step="1" class="projects-filter__range" @input="resetVisibleCount" />
          </div>
        </div>
      </div>

      <div class="projects-grid">
        <article
          v-for="project in visibleProjects"
          :key="project.slug"
          class="projects-card"
          data-aos="fade-up"
          data-aos-offset="20"
          data-aos-delay="50"
          @click="goDetail(project.slug)"
        >
          <div class="projects-card__image-wrap">
            <img
              class="projects-card__image"
              :src="project.cardImage"
              :alt="project.title"
              @error="handleProjectImageError($event, project)"
            />
          </div>

          <div class="projects-card__body">
            <div class="projects-card__head">
              <h3 class="projects-card__title">{{ project.title }}</h3>

              <div class="projects-card__specs">
                <p class="projects-card__spec">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
                    <path d="M3 7h18v10H3z" />
                    <path d="M7 11v3m10-3v3M3 10h18" />
                  </svg>
                  <span>{{ project.bedrooms }}</span>
                </p>
                <p class="projects-card__spec">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
                    <path d="M7 9h10v9H7z" />
                    <path d="M6 18h12M9 6h6M9 6v3m6-3v3" />
                  </svg>
                  <span>{{ project.bathrooms }}</span>
                </p>
              </div>
            </div>

            <p class="projects-card__desc">{{ project.shortDescription }}</p>
          </div>
        </article>
      </div>

      <p v-if="filteredProjects.length === 0" class="projects-empty">No results found.</p>

      <div class="projects-loadmore" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
        <button v-if="canLoadMore" type="button" class="projects-loadmore__button" @click="loadMore">Load More</button>
      </div>
    </section>

    <section class="projects-tour">
      <VideoHero
        heading="A Tour of Modulux Homes' Cutting-Edge Factory"
        heading-tag="h2"
        play-label="Autoplay"
        play-sub-label="Video"
        section-class="projects-video-hero"
      />
    </section>

    <section class="projects-faq">
      <div class="projects-faq__inner">
        <h2>Frequently Asked Questions About Projects</h2>
        <p>
          Do you have any questions about modular home building that are not covered here?
          <router-link to="/contact?type=project">Get in touch</router-link>
          with our friendly team - we are happy to help.
        </p>

        <div class="projects-faq__list">
          <details v-for="(item, index) in faqPreview" :key="item.question" class="projects-faq__item" :open="index === 0">
            <summary>
              <span>{{ item.question }}</span>
              <span class="projects-faq__icon">+</span>
            </summary>
            <div class="projects-faq__answer">{{ item.answer }}</div>
          </details>
        </div>

        <div class="projects-faq__action">
          <router-link to="/faqs" class="projects-faq__button">All FAQs</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import publicApi from '@/services/publicApi'
import VideoHero from '@/components/client/VideoHero.vue'
import { resolveMediaUrl } from '@/utils/media'

const router = useRouter()
const projectsRef = ref(null)
const projects = ref([])
const visibleCount = ref(6)
const PROJECT_FALLBACK_IMAGE = '/images/home/project/jp1/pj1.png'

const bedroomOptions = ['any', 1, 2, 3, 4, 5]
const bathroomOptions = ['any', 1, 2, 3, 4]

const filters = reactive({
  bedrooms: 'any',
  bathrooms: 'any',
  area: [180, 1200],
})

const faqPreview = [
  {
    question: 'Do you provide architectural drawings for permitting?',
    answer: 'Yes. We provide drawing packages and technical documentation to support permitting requirements.',
  },
  {
    question: 'Can your homes be stacked (multi-story)?',
    answer: 'Yes. Multi-story options are available depending on structural requirements and local code.',
  },
  {
    question: 'Do your homes include HVAC, solar panels, or smart systems?',
    answer: 'These systems are optional and can be integrated based on project scope and preferences.',
  },
  {
    question: 'What construction methods do you use?',
    answer: 'We support both block-unit and panelized prefabrication methods for flexibility and speed.',
  },
  {
    question: 'Can I customize the layout of the home?',
    answer: 'Yes. Layout and finishing customization are supported to match client requirements.',
  },
]

const filteredProjects = computed(() =>
  projects.value.filter((project) => {
    const bedroomMatch = filters.bedrooms === 'any' || project.bedrooms === Number(filters.bedrooms)
    const bathroomMatch = filters.bathrooms === 'any' || project.bathrooms === Number(filters.bathrooms)
    const areaMatch = project.area >= filters.area[0] && project.area <= filters.area[1]
    return bedroomMatch && bathroomMatch && areaMatch
  })
)

const visibleProjects = computed(() => filteredProjects.value.slice(0, visibleCount.value))
const canLoadMore = computed(() => visibleCount.value < filteredProjects.value.length)

const resetVisibleCount = () => {
  visibleCount.value = 6
}

const setBedrooms = (value) => {
  filters.bedrooms = value
  resetVisibleCount()
}

const setBathrooms = (value) => {
  filters.bathrooms = value
  resetVisibleCount()
}

const loadMore = () => {
  visibleCount.value = Math.min(visibleCount.value + 6, filteredProjects.value.length)
}

const goDetail = (slug) => {
  router.push(`/projects/${slug}`)
}

const getProjectPrimaryImage = (item) => {
  const heroImage = item.images?.find((img) => img.is_hero)?.image_url
  return resolveMediaUrl(heroImage || item.thumbnail_url || PROJECT_FALLBACK_IMAGE)
}

const getProjectFallbackImage = (item) => {
  const floorPlanImage = item.images?.find((img) => img.is_floor_plan)?.image_url
  const heroImage = item.images?.find((img) => img.is_hero)?.image_url
  return resolveMediaUrl(floorPlanImage || heroImage || item.floor_plan_url || PROJECT_FALLBACK_IMAGE)
}

const handleProjectImageError = (event, project) => {
  const fallbackImage = project.fallbackCardImage || PROJECT_FALLBACK_IMAGE
  if (event.target.dataset.fallbackApplied === 'true') {
    event.target.src = PROJECT_FALLBACK_IMAGE
    return
  }
  event.target.dataset.fallbackApplied = 'true'
  event.target.src = fallbackImage
}

const scrollToProjects = () => {
  if (!projectsRef.value) return
  const offsetTop = projectsRef.value.getBoundingClientRect().top + window.scrollY - 110
  window.scrollTo({ top: offsetTop, behavior: 'smooth' })
}

const fetchProjects = async () => {
  try {
    const res = await publicApi.get('/api/v1/projects/')
    projects.value = (res.data || []).map((item) => ({
      slug: item.slug,
      title: item.title || 'Modulux Project',
      bedrooms: Number(item.bedrooms || 1),
      bathrooms: Number(item.bathrooms || 1),
      area: Number(item.area || item.area_sqft || 500),
      shortDescription: item.short_description || item.summary || item.description || 'Installation time varies by project scope.',
      cardImage: getProjectPrimaryImage(item),
      fallbackCardImage: getProjectFallbackImage(item),
    }))
  } catch (error) {
    console.error('Unable to fetch projects:', error)
    projects.value = []
  }
}

onMounted(async () => {
  await fetchProjects()
  if (window?.AOS?.refresh) {
    window.AOS.refresh()
  }
})
</script>

<style scoped>
.projects-page {
  padding-top: 80px;
  background: #fff;
}

.projects-hero {
  position: relative;
  min-height: 520px;
  overflow: hidden;
}

.projects-hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.projects-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(12, 16, 21, 0.58) 0%, rgba(12, 16, 21, 0.42) 42%, rgba(12, 16, 21, 0.2) 100%);
}

.projects-hero__content {
  position: relative;
  z-index: 1;
  width: min(100%, 1320px);
  margin: 0 auto;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.65rem;
  padding: 0 16px 40px;
  color: #fff;
}

.projects-hero__eyebrow {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
}

.projects-hero__title {
  margin: 0;
  max-width: 620px;
  color: #ececec;
  font-size: clamp(1.12rem, 2vw, 1.46rem);
  line-height: 1.45;
  font-weight: 500;
}

.projects-hero__button {
  width: fit-content;
  margin-top: 0.35rem;
  border: 1px solid #fff;
  background: #fff;
  color: #111;
  padding: 0.58rem 1rem;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.25s ease;
}

.projects-hero__button:hover {
  background: transparent;
  color: #fff;
}

.projects-filter-section {
  width: min(100%, 1320px);
  margin: 0 auto;
  padding: 32px 16px 56px;
}

.projects-filter {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  border-radius: 14px;
  overflow: visible;
  box-shadow: 0 8px 26px rgba(0, 0, 0, 0.09);
}

.projects-filter__group {
  position: relative;
  padding: 1rem;
  background: #fff;
}

.projects-filter__title {
  margin: 0;
  font-size: 1.18rem;
  line-height: 1.2;
  font-weight: 700;
}

.projects-filter__selected {
  margin: 0.35rem 0 0;
  color: #5f6770;
  font-size: 0.98rem;
}

.projects-filter__popover {
  position: static;
  margin-top: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.projects-filter__option {
  border: 1px solid #111;
  background: #fff;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  font-size: 0.86rem;
  color: #111;
  transition: all 0.2s ease;
}

.projects-filter__option--pill {
  width: auto;
  padding: 0 0.8rem;
  border-radius: 9999px;
}

.projects-filter__option:hover,
.projects-filter__option.is-active {
  color: #0a4834;
  font-weight: 700;
}

.projects-filter__popover--range {
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
}

.projects-filter__range-label {
  font-size: 0.82rem;
  color: #444;
  font-weight: 600;
}

.projects-filter__range {
  width: 100%;
  accent-color: #0a4834;
}

.projects-grid {
  margin-top: 2rem;
  display: grid;
  gap: 1.6rem;
  grid-template-columns: 1fr;
}

.projects-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
}

.projects-card__image-wrap {
  border-radius: 10px;
  overflow: hidden;
  height: 288px;
}

.projects-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.55s ease;
}

.projects-card:hover .projects-card__image {
  transform: scale(1.08);
}

.projects-card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.projects-card__title {
  margin: 0;
  font-size: 1.38rem;
  line-height: 1.3;
  font-weight: 700;
}

.projects-card__specs {
  display: flex;
  gap: 0.75rem;
}

.projects-card__spec {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.32rem;
  color: #0a4834;
  font-weight: 700;
}

.projects-card__spec svg {
  width: 18px;
  height: 18px;
}

.projects-card__desc {
  margin: 0;
  color: #5f6770;
  font-size: 0.92rem;
  line-height: 1.42;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.projects-empty {
  margin-top: 1rem;
  text-align: center;
  font-size: 1rem;
  color: #5f6770;
}

.projects-loadmore {
  display: flex;
  justify-content: center;
}

.projects-loadmore__button {
  margin-top: 1.35rem;
  border: none;
  background: #0c0c0c;
  color: #fff;
  padding: 0.66rem 1.1rem;
  font-size: 1rem;
  font-weight: 600;
}

.projects-tour {
  margin-top: 0.2rem;
}

:deep(.projects-video-hero .video-hero__background),
:deep(.projects-video-hero .video-hero__overlay) {
  min-height: clamp(520px, 65vw, 720px);
}

.projects-faq {
  padding: 54px 0 70px;
}

.projects-faq__inner {
  width: min(100%, 1320px);
  margin: 0 auto;
  padding: 0 16px;
}

.projects-faq h2 {
  margin: 0;
  color: #121417;
  font-size: clamp(1.65rem, 3vw, 2.7rem);
}

.projects-faq p {
  margin: 0.7rem 0 0;
  color: #5f6770;
  font-size: 0.98rem;
  line-height: 1.7;
}

.projects-faq p a {
  color: #121417;
  font-weight: 700;
  text-decoration: underline;
}

.projects-faq__list {
  margin-top: 1.2rem;
  border-top: 1px solid #d3d7dd;
}

.projects-faq__item {
  border-bottom: 1px solid #d3d7dd;
}

.projects-faq__item summary {
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  font-size: 1.05rem;
  color: #1d2127;
  font-weight: 600;
}

.projects-faq__item summary::-webkit-details-marker {
  display: none;
}

.projects-faq__icon {
  font-size: 1.9rem;
  line-height: 1;
  color: #333;
}

.projects-faq__answer {
  margin: 0;
  padding: 0 0 1rem;
  color: #5f6770;
  font-size: 0.95rem;
  line-height: 1.72;
}

.projects-faq__action {
  margin-top: 1.2rem;
  display: flex;
  justify-content: center;
}

.projects-faq__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  background: #0a0a0a;
  color: #fff;
  padding: 0.52rem 1rem;
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none;
}

@media (min-width: 1024px) {
  .projects-hero {
    min-height: 640px;
  }

  .projects-hero__content {
    min-height: 640px;
    padding-bottom: 72px;
  }

  .projects-filter {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .projects-filter__group {
    padding: 1.1rem 1.25rem;
  }

  .projects-filter__popover {
    position: absolute;
    left: 1rem;
    top: calc(100% - 0.3rem);
    width: max-content;
    max-width: 92%;
    z-index: 20;
    background: #fff;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
    padding: 0.9rem;
    border-radius: 12px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: all 0.25s ease;
  }

  .projects-filter__group:hover .projects-filter__popover {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .projects-filter__popover--range {
    width: 280px;
  }

  .projects-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.8rem;
  }

  .projects-card__image-wrap {
    height: 430px;
  }
}
</style>

