<template>
  <section ref="sectionRef" class="news">
    <div class="news__container">
      <div class="news__header" data-aos="fade-up" data-aos-duration="700">
        <h2 class="news__title">News and Insights</h2>
      </div>

      <div v-if="featuredPost" class="news__layout">
        <article class="news__featured" data-aos="fade-up" data-aos-duration="800">
          <div class="news__featured-sticky">
            <router-link :to="`/blogs/${featuredPost.slug}`" class="news__featured-image-link">
              <img :src="featuredPost.image" :alt="featuredPost.title" class="news__featured-image" />
            </router-link>

            <div class="news__featured-body">
              <p class="news__category">{{ featuredPost.category }}</p>
              <router-link :to="`/blogs/${featuredPost.slug}`" class="news__title-link">
                <h3 class="news__featured-title">{{ featuredPost.title }}</h3>
              </router-link>
              <router-link :to="`/blogs/${featuredPost.slug}`" class="news__read-more">
                Read more
              </router-link>
            </div>
          </div>
        </article>

        <div class="news__rail-shell">
          <div v-if="lockMode" class="news__rail-stage" data-aos="fade-up" data-aos-duration="700">
            <div class="news__rail-track" :style="railTrackStyle">
              <article v-for="(post, idx) in sidePosts" :key="post.slug" class="news__rail-step" :class="{ 'news__rail-step--active': idx === activeIndex }">
                <router-link :to="`/blogs/${post.slug}`" class="news__rail-step-image-link">
                  <img :src="post.image" :alt="post.title" class="news__rail-step-image" />
                </router-link>

                <div class="news__rail-step-body">
                  <p class="news__category">{{ post.category }}</p>
                  <router-link :to="`/blogs/${post.slug}`" class="news__title-link">
                    <h3 class="news__rail-step-title">{{ post.title }}</h3>
                  </router-link>
                  <router-link :to="`/blogs/${post.slug}`" class="news__read-more">
                    Read more
                  </router-link>
                </div>
              </article>
            </div>
          </div>

          <div v-else class="news__rail-list">
            <article
              v-for="(post, idx) in sidePosts"
              :key="post.slug"
              class="news__rail-item"
              data-aos="fade-up"
              :data-aos-delay="Math.min(idx * 60, 240)"
              data-aos-duration="700"
            >
              <router-link :to="`/blogs/${post.slug}`" class="news__rail-image-link">
                <img :src="post.image" :alt="post.title" class="news__rail-image" />
              </router-link>

              <div class="news__rail-body">
                <p class="news__category">{{ post.category }}</p>
                <router-link :to="`/blogs/${post.slug}`" class="news__title-link">
                  <h3 class="news__rail-title">{{ post.title }}</h3>
                </router-link>
                <router-link :to="`/blogs/${post.slug}`" class="news__read-more">
                  Read more
                </router-link>
              </div>
            </article>
          </div>

          <div v-if="lockMode" class="news__rail-progress">
            <p class="news__rail-counter">{{ counterLabel }}</p>
            <div class="news__rail-bar">
              <span class="news__rail-bar-fill" :style="progressStyle"></span>
            </div>
          </div>
        </div>
      </div>

      <p v-else class="news__empty">No blog posts available.</p>

      <router-link to="/blogs" class="news__view-all">
        Read All
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const DESKTOP_BREAKPOINT = 1280
const LOCK_TOP_OFFSET = 116
const LOCK_RELEASE_MS = 700

const props = defineProps({
  posts: {
    type: Array,
    required: true,
  },
})

const sectionRef = ref(null)
const activeIndex = ref(0)
const isDesktop = ref(false)
const isAnimating = ref(false)

let releaseTimer = null
let resizeHandler = null

const featuredPost = computed(() => props.posts[0] || null)
const sidePosts = computed(() => props.posts.slice(1, 6))
const lockMode = computed(() => isDesktop.value && sidePosts.value.length > 1)

const railTrackStyle = computed(() => ({
  transform: `translate3d(0, -${activeIndex.value * 100}%, 0)`,
}))

const progressStyle = computed(() => ({
  transform: `scaleX(${sidePosts.value.length ? (activeIndex.value + 1) / sidePosts.value.length : 0})`,
}))

const counterLabel = computed(() => {
  const total = String(sidePosts.value.length).padStart(2, '0')
  const current = String(Math.min(activeIndex.value + 1, sidePosts.value.length || 1)).padStart(2, '0')
  return `${current} / ${total}`
})

const syncDesktopState = () => {
  isDesktop.value = window.innerWidth >= DESKTOP_BREAKPOINT
  if (!isDesktop.value) {
    activeIndex.value = 0
    isAnimating.value = false
  }
}

const isSectionPinned = () => {
  if (!lockMode.value || !sectionRef.value) return false
  const rect = sectionRef.value.getBoundingClientRect()
  return rect.top <= LOCK_TOP_OFFSET && rect.bottom >= window.innerHeight - 32
}

const lockViewportToSection = () => {
  if (!sectionRef.value) return
  const rect = sectionRef.value.getBoundingClientRect()
  const targetTop = Math.max(window.scrollY + rect.top - LOCK_TOP_OFFSET, 0)
  if (Math.abs(rect.top - LOCK_TOP_OFFSET) > 2) {
    window.scrollTo({ top: targetTop, behavior: 'auto' })
  }
}

const releaseAnimationLock = () => {
  if (releaseTimer) {
    window.clearTimeout(releaseTimer)
  }
  releaseTimer = window.setTimeout(() => {
    isAnimating.value = false
  }, LOCK_RELEASE_MS)
}

const stepTo = (nextIndex) => {
  activeIndex.value = nextIndex
  isAnimating.value = true
  releaseAnimationLock()
}

const handleWheel = (event) => {
  if (!lockMode.value || !isSectionPinned()) return

  const direction = Math.sign(event.deltaY)
  if (direction === 0) return

  if (isAnimating.value) {
    event.preventDefault()
    return
  }

  if (direction > 0 && activeIndex.value < sidePosts.value.length - 1) {
    event.preventDefault()
    lockViewportToSection()
    stepTo(activeIndex.value + 1)
    return
  }

  if (direction < 0 && activeIndex.value > 0) {
    event.preventDefault()
    lockViewportToSection()
    stepTo(activeIndex.value - 1)
  }
}

watch(sidePosts, (posts) => {
  if (activeIndex.value > posts.length - 1) {
    activeIndex.value = Math.max(posts.length - 1, 0)
  }
})

onMounted(() => {
  syncDesktopState()
  resizeHandler = () => syncDesktopState()
  window.addEventListener('resize', resizeHandler)
  window.addEventListener('wheel', handleWheel, { passive: false })
})

onBeforeUnmount(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
  window.removeEventListener('wheel', handleWheel)
  if (releaseTimer) {
    window.clearTimeout(releaseTimer)
  }
})
</script>

<style scoped>
.news {
  padding: 6rem 0 5.5rem;
  background: #fff;
}

.news__container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 1rem;
}

.news__header {
  margin-bottom: 2rem;
}

.news__title {
  margin: 0;
  color: #111111;
  font-size: clamp(2.1rem, 1.8rem + 1vw, 3.25rem);
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.04em;
}

.news__layout {
  display: grid;
  grid-template-columns: minmax(0, 1.06fr) minmax(340px, 0.94fr);
  gap: 2rem 3rem;
  align-items: start;
}

.news__featured-sticky {
  position: sticky;
  top: 7.25rem;
}

.news__featured-image-link,
.news__rail-image-link,
.news__rail-step-image-link,
.news__title-link,
.news__read-more,
.news__view-all {
  text-decoration: none;
}

.news__featured-image-link,
.news__rail-image-link,
.news__rail-step-image-link {
  display: block;
  overflow: hidden;
  border-radius: 10px;
}

.news__featured-image,
.news__rail-image,
.news__rail-step-image {
  width: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.news__featured-image-link:hover .news__featured-image,
.news__rail-image-link:hover .news__rail-image,
.news__rail-step-image-link:hover .news__rail-step-image {
  transform: scale(1.035);
}

.news__featured-image {
  height: clamp(24rem, 35vw, 34rem);
}

.news__featured-body {
  padding-top: 1.2rem;
}

.news__rail-shell {
  min-width: 0;
}

.news__rail-stage {
  position: sticky;
  top: 7.25rem;
  height: min(40rem, calc(100vh - 9rem));
  overflow: hidden;
}

.news__rail-track {
  height: 100%;
  transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.news__rail-step {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0.35;
  transition: opacity 0.45s ease;
}

.news__rail-step--active {
  opacity: 1;
}

.news__rail-step-image {
  height: calc(100% - 9.25rem);
  min-height: 21rem;
}

.news__rail-step-body {
  padding-top: 1rem;
}

.news__rail-progress {
  position: sticky;
  top: calc(100vh - 6.75rem);
  margin-top: 1rem;
}

.news__rail-counter {
  margin: 0 0 0.65rem;
  color: #6b7280;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.news__rail-bar {
  width: 100%;
  height: 3px;
  background: #d4d4d8;
  overflow: hidden;
}

.news__rail-bar-fill {
  display: block;
  width: 100%;
  height: 100%;
  background: #0a7056;
  transform-origin: left center;
  transition: transform 0.45s ease;
}

.news__rail-list {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.news__rail-item {
  display: grid;
  grid-template-columns: minmax(230px, 0.9fr) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
}

.news__rail-image {
  height: 13rem;
}

.news__category {
  margin: 0;
  color: #6b7280;
  font-size: 0.78rem;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.news__featured-title,
.news__rail-title,
.news__rail-step-title {
  margin: 0.75rem 0 0;
  color: #111111;
  font-weight: 700;
  letter-spacing: -0.035em;
}

.news__featured-title {
  font-size: clamp(2rem, 1.7rem + 0.8vw, 3rem);
  line-height: 1.12;
}

.news__rail-title,
.news__rail-step-title {
  font-size: clamp(1.18rem, 1.05rem + 0.25vw, 1.55rem);
  line-height: 1.16;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news__read-more {
  display: inline-block;
  margin-top: 1rem;
  color: #111827;
  font-size: 0.95rem;
  line-height: 1.2;
  border-bottom: 1px solid currentColor;
  transition: color 0.2s ease;
}

.news__title-link:hover,
.news__read-more:hover {
  color: #0a7056;
}

.news__view-all {
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(100%, 35rem);
  min-height: 3.75rem;
  margin: 2.8rem 0 0 auto;
  background: #050505;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  transition: background 0.2s ease;
}

.news__view-all:hover {
  background: #0a7056;
}

.news__empty {
  padding-top: 1rem;
  color: #6b7280;
  font-size: 0.95rem;
}

@media (min-width: 768px) {
  .news {
    padding: 7rem 0 6rem;
  }

  .news__container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .news__container {
    padding: 0 2rem;
  }
}

@media (max-width: 1279px) {
  .news__layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .news__featured-sticky,
  .news__rail-stage,
  .news__rail-progress {
    position: static;
  }

  .news__rail-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .news__rail-item {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .news {
    padding: 4.5rem 0 4rem;
  }

  .news__container {
    padding: 0 16px;
  }

  .news__header {
    margin-bottom: 1.5rem;
  }

  .news__layout,
  .news__rail-list {
    display: block;
  }

  .news__featured-image {
    height: 17rem;
  }

  .news__featured-title {
    font-size: 1.75rem;
  }

  .news__rail-item {
    display: block;
    margin-top: 1.5rem;
  }

  .news__rail-image {
    height: 14rem;
  }

  .news__rail-title,
  .news__rail-step-title {
    font-size: 1.18rem;
  }

  .news__view-all {
    width: 100%;
    margin-top: 2rem;
  }
}
</style>
