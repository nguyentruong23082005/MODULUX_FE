<template>
  <section ref="sectionRef" class="news" aria-labelledby="news-title">
    <div class="container-custom news__shell">
      <header class="news__header" data-aos="fade-up" data-aos-duration="800">
        <h2 id="news-title" class="news__title">News and Insights</h2>
      </header>

      <div
        v-if="hasPosts"
        ref="scrollyRef"
        class="news__scrolly"
        :class="{ 'is-locking': isDesktopLayout && isLockZoneActive }"
      >
        <div
          class="news__sticky-stage"
          :class="{ 'is-desktop': isDesktopLayout }"
          :style="stickyStageStyle"
        >
          <article
            v-if="featuredPost"
            ref="featuredCardRef"
            class="news__featured"
            data-aos="fade-up"
            data-aos-duration="900"
          >
            <router-link :to="`/blogs/${featuredPost.slug}`" class="news__featured-image-link">
              <img
                :src="featuredPost.image"
                :alt="featuredPost.title"
                class="news__featured-image"
                loading="lazy"
              />
            </router-link>

            <div class="news__featured-copy">
              <p class="news__meta">{{ formatCategory(featuredPost.category) }}</p>
              <router-link :to="`/blogs/${featuredPost.slug}`" class="news__heading-link">
                <h3 class="news__featured-heading">{{ featuredPost.title }}</h3>
              </router-link>
              <router-link :to="`/blogs/${featuredPost.slug}`" class="news__more-link">
                Read more
              </router-link>
            </div>
          </article>

          <div v-if="sidePosts.length" class="news__rail">
            <div ref="railViewportRef" class="news__rail-viewport" :style="railViewportStyle">
              <div ref="railTrackRef" class="news__rail-track">
                <article
                  v-for="(post, index) in sidePosts"
                  :key="post.slug"
                  :ref="(element) => setSideCardRef(element, index)"
                  class="news__side-card"
                  data-aos="fade-up"
                  :data-aos-delay="Math.min(index * 60, 180)"
                  data-aos-duration="850"
                >
                  <router-link :to="`/blogs/${post.slug}`" class="news__side-image-link">
                    <img
                      :src="post.image"
                      :alt="post.title"
                      class="news__side-image"
                      loading="lazy"
                    />
                  </router-link>

                  <div class="news__side-copy">
                    <p class="news__meta">{{ formatCategory(post.category) }}</p>
                    <router-link :to="`/blogs/${post.slug}`" class="news__heading-link">
                      <h3 class="news__side-heading">{{ post.title }}</h3>
                    </router-link>
                    <router-link :to="`/blogs/${post.slug}`" class="news__more-link">
                      Read more
                    </router-link>
                  </div>
                </article>
              </div>
            </div>

            <router-link to="/blogs" class="news__read-all">
              Read All
            </router-link>
          </div>
        </div>
      </div>

      <p v-else class="news__empty">No blog posts available.</p>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const DESKTOP_BREAKPOINT = 1024
const DESKTOP_STICKY_TOP = 112
const VISIBLE_SIDE_POSTS = 3

const props = defineProps({
  posts: {
    type: Array,
    required: true,
  },
})

const normalizedPosts = computed(() => (props.posts || []).filter(Boolean).slice(0, 6))
const featuredPost = computed(() => normalizedPosts.value[0] || null)
const sidePosts = computed(() => normalizedPosts.value.slice(1))
const hasPosts = computed(() => normalizedPosts.value.length > 0)

const sectionRef = ref(null)
const scrollyRef = ref(null)
const featuredCardRef = ref(null)
const railViewportRef = ref(null)
const railTrackRef = ref(null)
const sideCardRefs = ref([])

const isDesktopLayout = ref(false)
const featuredHeight = ref(0)
const railViewportHeight = ref(0)
const isLockZoneActive = ref(false)

let measureFrame = null
let resizeObserver = null
let touchStartY = 0

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const formatCategory = (value = '') => value.toString().trim().toUpperCase() || 'NEWS'

const stickyStageStyle = computed(() => {
  if (!isDesktopLayout.value || !featuredHeight.value) {
    return undefined
  }

  return {
    minHeight: `${featuredHeight.value}px`,
  }
})

const railViewportStyle = computed(() => {
  if (!isDesktopLayout.value || !railViewportHeight.value) {
    return undefined
  }

  return {
    height: `${railViewportHeight.value}px`,
  }
})

const updateViewportMode = () => {
  if (typeof window === 'undefined') return
  isDesktopLayout.value = window.innerWidth >= DESKTOP_BREAKPOINT
}

const setSideCardRef = (element, index) => {
  if (element) {
    sideCardRefs.value[index] = element
  }
}

const getRailMaxScroll = () => {
  if (!railViewportRef.value) return 0
  return Math.max(0, railViewportRef.value.scrollHeight - railViewportRef.value.clientHeight)
}

const syncLockZoneState = () => {
  if (
    typeof window === 'undefined' ||
    !isDesktopLayout.value ||
    !sidePosts.value.length ||
    !sectionRef.value ||
    !scrollyRef.value ||
    !featuredHeight.value
  ) {
    isLockZoneActive.value = false
    return
  }

  const sectionRect = sectionRef.value.getBoundingClientRect()
  const scrollyRect = scrollyRef.value.getBoundingClientRect()
  const stickyBottom = DESKTOP_STICKY_TOP + Math.min(featuredHeight.value, window.innerHeight * 0.82)
  const topReached = scrollyRect.top <= DESKTOP_STICKY_TOP + 1
  const sectionStillVisible =
    sectionRect.top < window.innerHeight - 80 && sectionRect.bottom > stickyBottom + 80

  isLockZoneActive.value =
    topReached && sectionStillVisible && getRailMaxScroll() > 0
}

const scrollRailBy = (delta) => {
  if (!railViewportRef.value) return false

  const maxScroll = getRailMaxScroll()
  if (maxScroll <= 0) {
    return false
  }

  const current = railViewportRef.value.scrollTop
  const next = clamp(current + delta, 0, maxScroll)

  if (Math.abs(next - current) < 0.5) {
    return false
  }

  railViewportRef.value.scrollTop = next
  return true
}

const handleWheelLock = (event) => {
  if (!isLockZoneActive.value || !railViewportRef.value) {
    return
  }

  const delta = event.deltaY
  if (delta === 0) return

  const maxScroll = getRailMaxScroll()
  const current = railViewportRef.value.scrollTop
  const isScrollingDown = delta > 0
  const canConsume =
    (isScrollingDown && current < maxScroll - 1) || (!isScrollingDown && current > 1)

  if (!canConsume) {
    return
  }

  event.preventDefault()
  scrollRailBy(delta)
}

const handleTouchStart = (event) => {
  if (!event.touches?.length) return
  touchStartY = event.touches[0].clientY
}

const handleTouchMove = (event) => {
  if (!isLockZoneActive.value || !event.touches?.length) {
    return
  }

  const currentY = event.touches[0].clientY
  const delta = touchStartY - currentY
  if (delta === 0) return

  const maxScroll = getRailMaxScroll()
  const current = railViewportRef.value?.scrollTop || 0
  const isScrollingDown = delta > 0
  const canConsume =
    (isScrollingDown && current < maxScroll - 1) || (!isScrollingDown && current > 1)

  if (!canConsume) {
    touchStartY = currentY
    return
  }

  event.preventDefault()
  scrollRailBy(delta)
  touchStartY = currentY
}

const measureLayout = () => {
  updateViewportMode()

  if (!featuredCardRef.value) {
    return
  }

  featuredHeight.value = Math.ceil(featuredCardRef.value.offsetHeight)
  railViewportHeight.value = featuredHeight.value

  if (!isDesktopLayout.value || !sidePosts.value.length || !railTrackRef.value) {
    isLockZoneActive.value = false
    if (railViewportRef.value) {
      railViewportRef.value.scrollTop = 0
    }
    return
  }

  const visibleCount = Math.min(VISIBLE_SIDE_POSTS, sideCardRefs.value.length)
  if (visibleCount > 0) {
    const firstVisible = sideCardRefs.value[0]
    const lastVisible = sideCardRefs.value[visibleCount - 1]

    if (firstVisible && lastVisible) {
      railViewportHeight.value = Math.ceil(
        lastVisible.offsetTop + lastVisible.offsetHeight - firstVisible.offsetTop,
      )
    }
  }

  const nextOverflow = Math.max(0, Math.ceil(railTrackRef.value.scrollHeight - railViewportHeight.value))
  if (railViewportRef.value) {
    railViewportRef.value.scrollTop = clamp(railViewportRef.value.scrollTop, 0, nextOverflow)
  }
  syncLockZoneState()
}

const scheduleMeasure = () => {
  if (typeof window === 'undefined' || measureFrame !== null) {
    return
  }

  measureFrame = window.requestAnimationFrame(() => {
    measureFrame = null
    measureLayout()
  })
}

onMounted(async () => {
  await nextTick()
  measureLayout()

  window.addEventListener('resize', scheduleMeasure)
  window.addEventListener('scroll', syncLockZoneState, { passive: true })
  window.addEventListener('load', scheduleMeasure)
  window.addEventListener('wheel', handleWheelLock, { passive: false })
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchmove', handleTouchMove, { passive: false })

  if (railViewportRef.value) {
    railViewportRef.value.addEventListener('scroll', syncLockZoneState, { passive: true })
  }

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      scheduleMeasure()
    })

    if (featuredCardRef.value) resizeObserver.observe(featuredCardRef.value)
    if (railTrackRef.value) resizeObserver.observe(railTrackRef.value)
    if (railViewportRef.value) resizeObserver.observe(railViewportRef.value)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', scheduleMeasure)
    window.removeEventListener('scroll', syncLockZoneState)
    window.removeEventListener('load', scheduleMeasure)
    window.removeEventListener('wheel', handleWheelLock)
    window.removeEventListener('touchstart', handleTouchStart)
    window.removeEventListener('touchmove', handleTouchMove)
  }

  if (railViewportRef.value) {
    railViewportRef.value.removeEventListener('scroll', syncLockZoneState)
  }

  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }

  if (measureFrame !== null && typeof window !== 'undefined') {
    window.cancelAnimationFrame(measureFrame)
  }
})

watch(
  normalizedPosts,
  async () => {
    sideCardRefs.value = []
    await nextTick()
    measureLayout()
  },
  { deep: true },
)
</script>

<style scoped>
.news {
  background: #ffffff;
  padding: 4rem 0 6rem;
}

.news__shell {
  position: relative;
}

.news__header {
  margin-bottom: 2.5rem;
}

.news__title {
  margin: 0;
  color: #111111;
  font-family: 'Geoform-Bold', 'Montserrat', var(--font-display);
  font-size: clamp(2.35rem, 1.9rem + 1.15vw, 3.6rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.05em;
}

.news__scrolly {
  position: relative;
}

.news__scrolly.is-locking {
  cursor: ns-resize;
}

.news__sticky-stage {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.25rem;
  align-items: start;
}

.news__featured,
.news__side-card {
  min-width: 0;
}

.news__featured-image-link,
.news__side-image-link,
.news__heading-link,
.news__more-link,
.news__read-all {
  text-decoration: none;
}

.news__featured-image-link,
.news__side-image-link {
  display: block;
  overflow: hidden;
  border-radius: 0.8rem;
  background: #ededed;
}

.news__featured-image,
.news__side-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.news__featured-image {
  aspect-ratio: 1.76 / 1;
}

.news__side-image {
  aspect-ratio: 1.2 / 1;
}

.news__featured-image-link:hover .news__featured-image,
.news__side-image-link:hover .news__side-image {
  transform: scale(1.035);
}

.news__featured-copy {
  padding-top: 0.95rem;
}

.news__meta {
  margin: 0;
  color: #3c3c3c;
  font-family: 'Quicksand-Medium', 'Quicksand', var(--font-sans);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.news__featured-heading,
.news__side-heading {
  margin: 0.85rem 0 0;
  color: #111111;
  font-family: 'Geoform-Medium', 'Montserrat', var(--font-display);
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1.08;
  transition: color 0.2s ease;
}

.news__featured-heading {
  font-size: clamp(2rem, 1.55rem + 0.8vw, 3.05rem);
}

.news__side-heading {
  font-size: clamp(1.2rem, 1rem + 0.28vw, 1.62rem);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.news__heading-link:hover .news__featured-heading,
.news__heading-link:hover .news__side-heading,
.news__more-link:hover {
  color: #0a4834;
}

.news__more-link {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  margin-top: 1rem;
  color: #111111;
  font-family: 'Quicksand-Medium', 'Quicksand', var(--font-sans);
  font-size: 0.88rem;
  line-height: 1.2;
  border-bottom: 1px solid currentColor;
  transition: color 0.2s ease;
}

.news__rail {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.news__rail-viewport {
  overflow: visible;
}

.news__rail-track {
  display: flex;
  flex-direction: column;
  gap: 1.55rem;
  will-change: transform;
}

.news__side-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
  align-items: stretch;
}

.news__side-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.news__read-all {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 3.85rem;
  padding: 0 1.5rem;
  background: #000000;
  color: #ffffff;
  font-family: 'Quicksand-Bold', 'Quicksand', var(--font-sans);
  font-size: 1rem;
  letter-spacing: 0.01em;
  transition: background-color 0.2s ease;
}

.news__read-all:hover {
  background: #0a4834;
}

.news__empty {
  margin: 0;
  color: #6b7280;
  font-family: 'Quicksand-Medium', 'Quicksand', var(--font-sans);
}

@media (min-width: 768px) {
  .news {
    padding-top: 4.75rem;
    padding-bottom: 6.5rem;
  }

  .news__header {
    margin-bottom: 3rem;
  }

  .news__sticky-stage {
    gap: 2.5rem;
  }

  .news__side-card {
    min-height: 11.35rem;
    grid-template-columns: 11.5rem minmax(0, 1fr);
    gap: 1.1rem;
  }

  .news__side-image-link {
    height: 100%;
  }

  .news__side-image {
    height: 100%;
    aspect-ratio: auto;
  }

  .news__more-link {
    margin-top: 0.85rem;
  }
}

@media (min-width: 1024px) {
  .news__sticky-stage.is-desktop {
    position: sticky;
    top: 7rem;
    grid-template-columns: minmax(0, 1.68fr) minmax(24rem, 1fr);
    gap: 1.85rem;
  }

  .news__rail-viewport {
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    scrollbar-width: none;
  }

  .news__rail-viewport::-webkit-scrollbar {
    display: none;
  }
}

@media (max-width: 767px) {
  .news {
    padding: 3.5rem 0 4.5rem;
  }

  .news__header {
    margin-bottom: 2rem;
  }

  .news__sticky-stage {
    gap: 2rem;
  }

  .news__featured-heading {
    font-size: clamp(1.8rem, 1.55rem + 0.7vw, 2.3rem);
  }

  .news__side-heading {
    font-size: 1.4rem;
  }

  .news__read-all {
    width: 100%;
  }
}
</style>
