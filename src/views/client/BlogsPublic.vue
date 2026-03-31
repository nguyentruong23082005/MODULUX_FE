<template>
  <div class="blogs-page">
    <div v-if="loading" class="blogs-page__state blogs-page__state--loading">
      <div class="blogs-shell">
        <div class="blogs-skeleton__hero"></div>
        <div class="blogs-skeleton__grid">
          <div v-for="n in 6" :key="n" class="blogs-skeleton__card"></div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="blogs-page__state">
      <div class="blogs-shell">
        <div class="blogs-state-card blogs-state-card--error">{{ error }}</div>
      </div>
    </div>

    <template v-else>
      <section ref="heroSectionRef" class="blogs-hero" :class="{ 'blogs-hero--locked': heroPinnedVisual }">
        <div class="blogs-hero__backdrop"></div>
        <div class="blogs-shell blogs-hero__shell">
          <h1 data-aos="fade-up" data-aos-offset="20" data-aos-delay="50" class="blogs-hero__title">News and Insights</h1>

          <div v-if="heroLead" ref="heroLockAnchorRef" class="blogs-hero__desktop" @wheel.prevent="handleHeroWheel">
            <article class="blogs-lead" data-aos="fade-up" data-aos-offset="20" data-aos-delay="100">
              <div class="blogs-lead__sticky">
                <router-link :to="`/blogs/${heroLead.slug}`" class="blogs-lead__image-link">
                  <img :src="heroLead.image_url" :alt="heroLead.title" class="blogs-lead__image" />
                </router-link>

                <div class="blogs-lead__body">
                  <p class="blogs-post-type">{{ heroLead.type }}</p>
                  <router-link :to="`/blogs/${heroLead.slug}`" class="blogs-lead__title-link">
                    <h2 class="blogs-lead__title">{{ heroLead.title }}</h2>
                  </router-link>
                  <router-link :to="`/blogs/${heroLead.slug}`" class="blogs-read-more">Read more</router-link>
                </div>
              </div>
            </article>

            <div class="blogs-side-shell">
              <div ref="heroSideScrollRef" class="blogs-side" :class="{ 'blogs-side--scrollable': heroLockMode }">
                <article
                  v-for="(post, index) in heroSidePosts"
                  :key="post.slug"
                  class="blogs-side__item"
                  :class="{ 'blogs-side__item--hero': index === activeHeroSideIndex }"
                  data-aos="fade-up"
                  data-aos-offset="20"
                  data-aos-delay="100"
                >
                  <router-link :to="`/blogs/${post.slug}`" class="blogs-side__image-link">
                    <img :src="post.image_url" :alt="post.title" class="blogs-side__image" />
                  </router-link>

                  <div class="blogs-side__content">
                    <p class="blogs-post-type">{{ post.type }}</p>
                    <router-link :to="`/blogs/${post.slug}`" class="blogs-side__title-link">
                      <h2 class="blogs-side__title">{{ post.title }}</h2>
                    </router-link>
                    <router-link :to="`/blogs/${post.slug}`" class="blogs-read-more">Read more</router-link>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div v-if="mobileFeaturedPosts.length" class="blogs-hero__mobile">
            <article
              v-for="post in mobileFeaturedPosts"
              :key="post.slug"
              class="blogs-mobile-card"
              data-aos="fade-up"
              data-aos-offset="20"
              data-aos-delay="100"
            >
              <router-link :to="`/blogs/${post.slug}`" class="blogs-mobile-card__image-link">
                <img :src="post.image_url" :alt="post.title" class="blogs-mobile-card__image" />
              </router-link>

              <div class="blogs-mobile-card__body">
                <p class="blogs-post-type">{{ post.type }}</p>
                <router-link :to="`/blogs/${post.slug}`" class="blogs-mobile-card__title-link">
                  <h2 class="blogs-mobile-card__title">{{ post.title }}</h2>
                </router-link>
                <router-link :to="`/blogs/${post.slug}`" class="blogs-read-more">Read more</router-link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="blogs-catalog">
        <div class="blogs-shell">
          <div class="blogs-filters" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
            <button
              v-for="filter in FILTERS"
              :key="filter"
              type="button"
              class="blogs-filters__button"
              :class="{ 'blogs-filters__button--active': activeFilter === filter }"
              @click="setFilter(filter)"
            >
              {{ filter }}
            </button>
          </div>

          <div v-if="visiblePosts.length" class="blogs-grid">
            <article
              v-for="post in visiblePosts"
              :key="post.slug"
              class="blogs-card"
              data-aos="fade-up"
              data-aos-offset="20"
              data-aos-delay="50"
            >
              <router-link :to="`/blogs/${post.slug}`" class="blogs-card__image-link">
                <img :src="post.image_url" :alt="post.title" class="blogs-card__image" />
              </router-link>

              <div class="blogs-card__body">
                <p class="blogs-post-type">{{ post.type }}</p>
                <router-link :to="`/blogs/${post.slug}`" class="blogs-card__title-link">
                  <h2 class="blogs-card__title">{{ post.title }}</h2>
                </router-link>
                <router-link :to="`/blogs/${post.slug}`" class="blogs-read-more">Read more</router-link>
              </div>
            </article>
          </div>

          <div v-else class="blogs-state-card blogs-state-card--empty">No blog posts match this category.</div>

          <div v-if="visiblePosts.length < filteredPosts.length" class="blogs-load-more">
            <button type="button" class="blogs-load-more__button" @click="visibleCount += PAGE_INCREMENT">Load More</button>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBlogs } from '@/services/blogApi'

const FILTERS = Object.freeze(['ALL', 'DESIGN INSPIRATION', 'FEATURED', 'BUILDING', 'PROJECTS'])
const PAGE_SIZE = 50
const PAGE_INCREMENT = 9
const FALLBACK_IMAGE = '/images/home/blog/new1.webp'
const HERO_DESKTOP_BREAKPOINT = 1280
const HERO_LOCK_TOP_OFFSET = 116
const HERO_LOCK_TOLERANCE = 4
const route = useRoute()
const router = useRouter()

const loading = ref(true)
const error = ref('')
const posts = ref([])
const activeFilter = ref('ALL')
const visibleCount = ref(PAGE_INCREMENT)
const heroSectionRef = ref(null)
const heroLockAnchorRef = ref(null)
const heroSideScrollRef = ref(null)
const isHeroDesktop = ref(false)
const heroPinnedVisual = ref(false)
const activeHeroSideIndex = ref(0)

let heroResizeHandler = null
let heroScrollHandler = null

const toSingleValue = (value) => (Array.isArray(value) ? value[0] : value)

const normalizeType = (value) => {
  const raw = String(value || '').trim().toUpperCase()
  if (FILTERS.includes(raw)) return raw
  return 'PROJECTS'
}

const normalizePost = (post) => ({
  ...post,
  type: normalizeType(post.type),
  image_url: post.image_url || FALLBACK_IMAGE,
})

const normalizeFilter = (value) => {
  const raw = String(toSingleValue(value) || 'ALL').replace(/\+/g, ' ').trim().toUpperCase()
  return FILTERS.includes(raw) ? raw : 'ALL'
}

const heroLead = computed(() => posts.value[0] || null)
const heroSidePosts = computed(() => posts.value.slice(1, 6))
const mobileFeaturedPosts = computed(() => posts.value.slice(0, 6))
const heroLockMode = computed(() => isHeroDesktop.value && heroSidePosts.value.length > 1)

const filteredPosts = computed(() => {
  if (activeFilter.value === 'ALL') return posts.value
  return posts.value.filter((post) => post.type === activeFilter.value)
})

const visiblePosts = computed(() => filteredPosts.value.slice(0, visibleCount.value))

const syncHeroDesktopState = () => {
  isHeroDesktop.value = window.innerWidth >= HERO_DESKTOP_BREAKPOINT
  if (!isHeroDesktop.value) {
    resetHeroSideScroll()
  }
  syncHeroPinnedVisual()
}

const resetHeroSideScroll = () => {
  if (heroSideScrollRef.value) {
    heroSideScrollRef.value.scrollTop = 0
  }
  activeHeroSideIndex.value = 0
}

const isHeroSectionPinned = () => {
  if (!heroLockMode.value || !heroSectionRef.value || !heroLockAnchorRef.value) return false
  const anchorRect = heroLockAnchorRef.value.getBoundingClientRect()
  const sectionRect = heroSectionRef.value.getBoundingClientRect()
  const sideHeight = heroSideScrollRef.value?.clientHeight || 0
  const stickyBottom = HERO_LOCK_TOP_OFFSET + sideHeight
  return anchorRect.top <= HERO_LOCK_TOP_OFFSET + HERO_LOCK_TOLERANCE && sectionRect.bottom >= stickyBottom
}

const alignViewportToHero = () => {
  if (!heroLockAnchorRef.value) return
  const rect = heroLockAnchorRef.value.getBoundingClientRect()
  const targetTop = Math.max(window.scrollY + rect.top - HERO_LOCK_TOP_OFFSET, 0)
  if (Math.abs(rect.top - HERO_LOCK_TOP_OFFSET) > 2) {
    window.scrollTo({ top: targetTop, behavior: 'auto' })
  }
}

const syncHeroPinnedVisual = () => {
  heroPinnedVisual.value = isHeroSectionPinned()
}

const getHeroSideItems = () => {
  if (!heroSideScrollRef.value) return []
  return Array.from(heroSideScrollRef.value.querySelectorAll('.blogs-side__item'))
}

const syncActiveHeroSideIndex = (scrollTop) => {
  const items = getHeroSideItems()
  if (!items.length) {
    activeHeroSideIndex.value = 0
    return
  }

  let nextIndex = 0
  let minDistance = Number.POSITIVE_INFINITY

  items.forEach((item, index) => {
    const distance = Math.abs(item.offsetTop - scrollTop)
    if (distance < minDistance) {
      minDistance = distance
      nextIndex = index
    }
  })

  activeHeroSideIndex.value = nextIndex
}

const handleHeroWheel = (event) => {
  if (!heroLockMode.value || !heroSideScrollRef.value || !isHeroSectionPinned()) {
    window.scrollBy({ top: event.deltaY, behavior: 'auto' })
    return
  }

  const direction = Math.sign(event.deltaY)
  if (direction === 0) return

  const side = heroSideScrollRef.value
  const maxScrollTop = Math.max(side.scrollHeight - side.clientHeight, 0)
  if (maxScrollTop <= 0) return

  const cappedDelta = Math.max(Math.min(event.deltaY, 260), -260)
  const nextScrollTop = Math.min(Math.max(side.scrollTop + cappedDelta, 0), maxScrollTop)

  if (nextScrollTop !== side.scrollTop) {
    alignViewportToHero()
    side.scrollTop = nextScrollTop
    syncActiveHeroSideIndex(nextScrollTop)
    return
  }

  window.scrollBy({ top: event.deltaY, behavior: 'auto' })
}

const syncRouteQuery = (filter) => {
  const query = { ...route.query }
  if (filter === 'ALL') {
    delete query.filter
  } else {
    query.filter = filter
  }

  router.replace({ query }).catch(() => {})
}

const setFilter = (filter, options = {}) => {
  const { syncRoute = true } = options
  activeFilter.value = filter
  visibleCount.value = PAGE_INCREMENT

  if (syncRoute) {
    syncRouteQuery(filter)
  }
}

const fetchBlogs = async () => {
  loading.value = true
  error.value = ''

  try {
    const data = await getBlogs({ page: 1, page_size: PAGE_SIZE })
    posts.value = (data.items || []).map(normalizePost)

    const initialFilter = normalizeFilter(route.query.filter)
    activeFilter.value = initialFilter
    visibleCount.value = PAGE_INCREMENT
  } catch (err) {
    error.value = err.response?.data?.detail || 'Failed to load blog posts.'
  } finally {
    loading.value = false
    await nextTick()
    syncHeroPinnedVisual()
  }
}

watch(heroSidePosts, () => {
  nextTick(resetHeroSideScroll)
})

watch(
  () => route.query.filter,
  (value) => {
    const nextFilter = normalizeFilter(value)
    if (nextFilter !== activeFilter.value) {
      setFilter(nextFilter, { syncRoute: false })
    }
  }
)

onMounted(() => {
  fetchBlogs()
  syncHeroDesktopState()
  heroResizeHandler = () => syncHeroDesktopState()
  heroScrollHandler = () => syncHeroPinnedVisual()
  window.addEventListener('resize', heroResizeHandler)
  window.addEventListener('scroll', heroScrollHandler, { passive: true })
})

onBeforeUnmount(() => {
  if (heroResizeHandler) {
    window.removeEventListener('resize', heroResizeHandler)
  }
  if (heroScrollHandler) {
    window.removeEventListener('scroll', heroScrollHandler)
  }
})
</script>

<style scoped>
.blogs-page {
  background: #ffffff;
  padding-top: 5rem;
}

.blogs-shell {
  width: min(100%, 1560px);
  margin: 0 auto;
  padding: 0 24px;
}

.blogs-page__state {
  padding: 3rem 0 5rem;
}

.blogs-page__state--loading {
  background: #f6f6f2;
}

.blogs-state-card {
  border-radius: 20px;
  padding: 1.25rem 1.5rem;
  font-size: 0.95rem;
  line-height: 1.7;
}

.blogs-state-card--error {
  border: 1px solid #fecaca;
  background: #fff1f2;
  color: #be123c;
}

.blogs-state-card--empty {
  border: 1px solid #d6d3d1;
  background: #fafaf9;
  color: #57534e;
}

.blogs-skeleton__hero,
.blogs-skeleton__card {
  background: linear-gradient(90deg, rgba(226, 232, 240, 0.85), rgba(241, 245, 249, 1), rgba(226, 232, 240, 0.85));
  background-size: 200% 100%;
  animation: blogs-skeleton 1.4s ease-in-out infinite;
}

.blogs-skeleton__hero {
  height: 520px;
  border-radius: 24px;
}

.blogs-skeleton__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-top: 2rem;
}

.blogs-skeleton__card {
  height: 420px;
  border-radius: 16px;
}

.blogs-hero {
  position: relative;
  overflow: visible;
  background: #ffffff;
  padding: 1.5rem 0 4.5rem;
}

.blogs-hero__backdrop {
  position: absolute;
  inset: 0 0 auto;
  height: 27rem;
  background:
    linear-gradient(123deg, rgba(10, 128, 109, 0.97) 0%, rgba(2, 42, 61, 0.96) 82%),
    url('/images/home/nen.avif') center/cover no-repeat;
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.blogs-hero__shell {
  position: relative;
  z-index: 1;
}

.blogs-hero__title {
  margin: 0;
  color: #ffffff;
  font-size: clamp(2.35rem, 2.1rem + 1.6vw, 4.2rem);
  line-height: 1;
  font-weight: 700;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.blogs-hero__desktop {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: 28px;
  margin-top: 1.75rem;
}

.blogs-hero__mobile {
  display: none;
  margin-top: 1.5rem;
}

.blogs-lead__image-link,
.blogs-side__image-link,
.blogs-mobile-card__image-link,
.blogs-card__image-link,
.blog-sidebar-news__image-link {
  display: block;
  overflow: hidden;
  border-radius: 8px;
}

.blogs-lead__image,
.blogs-side__image,
.blogs-mobile-card__image,
.blogs-card__image,
.blog-sidebar-news__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.blogs-lead__image-link:hover .blogs-lead__image,
.blogs-side__image-link:hover .blogs-side__image,
.blogs-mobile-card__image-link:hover .blogs-mobile-card__image,
.blogs-card__image-link:hover .blogs-card__image,
.blog-sidebar-news__image-link:hover .blogs-sidebar-news__image {
  transform: scale(1.03);
}

.blogs-lead__image {
  height: 25rem;
}

.blogs-lead__body {
  padding-top: 0.95rem;
}

.blogs-lead__sticky {
  position: sticky;
  top: 7.25rem;
}

.blogs-side-shell {
  min-width: 0;
  position: sticky;
  top: 7.25rem;
  height: min(44rem, calc(100vh - 8rem));
  overflow: hidden;
}

.blogs-side {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.blogs-side__item {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 2.1rem;
}

.blogs-side__item:last-child {
  margin-bottom: 0;
}

.blogs-side__item--hero .blogs-post-type,
.blogs-side__item--hero .blogs-side__title,
.blogs-side__item--hero .blogs-read-more {
  color: #ffffff;
}

.blogs-side__image-link {
  flex: 0 0 58%;
}

.blogs-side__image {
  height: 20.25rem;
}

.blogs-side__content {
  flex: 1;
}

.blogs-side--scrollable {
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-right: 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.blogs-side--scrollable::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.blogs-post-type {
  margin: 0;
  color: #5f5f5f;
  font-size: 0.92rem;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.blogs-lead__title,
.blogs-side__title,
.blogs-mobile-card__title,
.blogs-card__title,
.blog-detail-hero__title,
.blog-sidebar-news__title {
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.blogs-lead__title {
  margin-top: 0.65rem;
  color: #111111;
  font-size: clamp(2rem, 1.6rem + 1vw, 3rem);
  line-height: 1.1;
}

.blogs-side__title {
  margin-top: 0.85rem;
  color: #111111;
  font-size: clamp(1.55rem, 1.2rem + 0.45vw, 2rem);
  line-height: 1.15;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blogs-lead__title-link,
.blogs-side__title-link,
.blogs-mobile-card__title-link,
.blogs-card__title-link,
.blogs-read-more,
.blog-sidebar-news__title-link {
  text-decoration: none;
}

.blogs-read-more {
  display: inline-block;
  margin-top: 1rem;
  color: #1f2937;
  font-size: 0.95rem;
  line-height: 1.2;
  border-bottom: 1px solid currentColor;
}

.blogs-read-more:hover {
  color: #0a7056;
}

.blogs-hero--locked .blogs-hero__backdrop {
  opacity: 0;
  transform: translateY(-2.5rem);
}

.blogs-hero--locked .blogs-hero__title {
  opacity: 0;
  transform: translateY(-1rem);
  pointer-events: none;
}

.blogs-catalog {
  background: #f1f0ec;
  padding: 4.25rem 0 5rem;
}

.blogs-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1.1rem 2rem;
  padding-bottom: 2.3rem;
}

.blogs-filters__button {
  border: 0;
  background: transparent;
  padding: 0;
  color: #2f2f2f;
  font-size: 0.92rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  cursor: pointer;
}

.blogs-filters__button:hover,
.blogs-filters__button--active {
  color: #0a7056;
}

.blogs-filters__button--active {
  font-weight: 700;
}

.blogs-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px 24px;
}

.blogs-card__image {
  height: 25.5rem;
}

.blogs-card__body {
  padding-top: 0.95rem;
}

.blogs-card__title {
  margin-top: 0.7rem;
  color: #101010;
  font-size: 1.45rem;
  line-height: 1.18;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blogs-load-more {
  display: flex;
  justify-content: center;
  padding-top: 3rem;
}

.blogs-load-more__button {
  border: 0;
  background: #000000;
  color: #ffffff;
  padding: 0.85rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.blogs-load-more__button:hover {
  background: #292524;
}

@keyframes blogs-skeleton {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

@media (max-width: 1279px) {
  .blogs-shell {
    padding: 0 20px;
  }

  .blogs-hero__desktop {
    grid-template-columns: minmax(0, 1fr);
  }

  .blogs-lead__sticky,
  .blogs-side-shell {
    position: static;
    height: auto;
    overflow: visible;
  }

  .blogs-side {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    height: auto;
  }

  .blogs-side__item {
    margin-bottom: 0;
  }

  .blogs-side--scrollable {
    overflow: visible;
    padding-right: 0;
  }

  .blogs-side__item--hero .blogs-post-type,
  .blogs-side__item--hero .blogs-side__title,
  .blogs-side__item--hero .blogs-read-more {
    color: #111111;
  }

  .blogs-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1023px) {
  .blogs-page {
    padding-top: 4.5rem;
  }

  .blogs-hero {
    padding-bottom: 2rem;
  }

  .blogs-hero__backdrop {
    height: 18rem;
  }

  .blogs-hero__desktop {
    display: none;
  }

  .blogs-hero__mobile {
    display: block;
  }

  .blogs-mobile-card {
    margin-bottom: 1.75rem;
  }

  .blogs-mobile-card:last-child {
    margin-bottom: 0;
  }

  .blogs-mobile-card__image {
    height: 22rem;
  }

  .blogs-mobile-card__body {
    padding-top: 0.9rem;
  }

  .blogs-mobile-card__title {
    margin-top: 0.7rem;
    color: #111111;
    font-size: 1.7rem;
    line-height: 1.18;
  }

  .blogs-grid,
  .blogs-skeleton__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .blogs-shell {
    padding: 0 16px;
  }

  .blogs-hero__title {
    font-size: 2.7rem;
  }

  .blogs-mobile-card__image,
  .blogs-card__image {
    height: 17rem;
  }

  .blogs-mobile-card__title,
  .blogs-card__title,
  .blogs-side__title {
    font-size: 1.35rem;
  }

  .blogs-catalog {
    padding: 3rem 0 4rem;
  }

  .blogs-filters {
    gap: 0.85rem 1.25rem;
    padding-bottom: 1.75rem;
  }

  .blogs-filters__button,
  .blogs-post-type,
  .blogs-read-more {
    font-size: 0.82rem;
  }
}
</style>
