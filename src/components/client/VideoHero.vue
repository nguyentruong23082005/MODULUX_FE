<template>
  <section :class="['video-hero', sectionClass]">
    <div class="video-hero__shell">
      <div class="video-hero__media">
        <div class="video-hero__stage" :class="{ 'is-playing': isPlaying }">
          <div
            v-if="activeVideo"
            class="video-hero__background"
            :style="heroBackgroundStyle"
          >
            <div v-if="!isPlaying" class="video-hero__scrim"></div>

            <template v-if="isPlaying && currentEmbedUrl">
              <button
                type="button"
                class="video-hero__close"
                aria-label="Đóng video"
                @click="handleClosePlayer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M6 6l12 12" />
                  <path d="M18 6 6 18" />
                </svg>
              </button>
              <div v-if="isIframeLoading" class="video-hero__loading">
                <span class="video-hero__spinner"></span>
                <span class="video-hero__loading-text">Đang tải video...</span>
              </div>
              <iframe
                :key="iframeKey"
                class="video-hero__iframe"
                :class="{ 'is-visible': !isIframeLoading }"
                :src="currentEmbedUrl"
                :title="resolvedHeading"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                referrerpolicy="strict-origin-when-cross-origin"
                @load="handleIframeLoad"
              ></iframe>
            </template>

            <template v-else>
              <div class="video-hero__overlay">
                <div class="video-hero__copy">
                  <p v-if="eyebrow" class="video-hero__eyebrow">{{ eyebrow }}</p>
                  <component :is="headingTag" class="video-hero__title">
                    {{ resolvedHeading }}
                  </component>
                  <p v-if="description" class="video-hero__description">
                    {{ description }}
                  </p>
                </div>

                <button
                  id="video-hero-play-button"
                  type="button"
                  class="video-hero__play-button"
                  :aria-label="`Play ${resolvedHeading}`"
                  @click="handlePlay"
                >
                  <span class="video-hero__play-ring"></span>
                  <span class="video-hero__play-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span class="video-hero__play-label">
                    <span>{{ playLabel }}</span>
                    <small>{{ playSubLabel }}</small>
                  </span>
                </button>
              </div>
            </template>
          </div>
        </div>

        <div v-show="!isPlaying" class="video-hero__thumb-rail">
          <button
            type="button"
            class="video-hero__thumb-nav"
            :class="{ 'is-hidden': !showThumbNav }"
            :disabled="!showThumbNav || !canScrollLeft"
            aria-label="Show previous thumbnails"
            @click="scrollThumbnails('prev')"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="m15 6-6 6 6 6" />
            </svg>
          </button>

          <div
            ref="thumbStripRef"
            class="video-hero__thumb-strip"
            :class="{ 'is-centered': !showThumbNav }"
            @scroll="handleThumbScroll"
          >
            <button
              v-for="(video, index) in normalizedVideos"
              :id="`video-hero-thumb-${index + 1}`"
              :key="video.id || `${video.videoUrl}-${index}`"
              type="button"
              :class="['video-hero__thumb', { 'is-active': index === activeIndex }]"
              :aria-label="`Select video ${index + 1}: ${video.title}`"
              @click="handleSelect(index)"
            >
              <img
                class="video-hero__thumb-image"
                :src="video.thumbnailUrl || video.posterUrl || fallbackPoster"
                :alt="video.title"
                loading="lazy"
              />
              <span class="video-hero__thumb-overlay"></span>
              <span class="video-hero__thumb-play">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span class="video-hero__thumb-text">
                {{ video.thumbnailLabel || video.title }}
              </span>
            </button>
          </div>

          <button
            type="button"
            class="video-hero__thumb-nav"
            :class="{ 'is-hidden': !showThumbNav }"
            :disabled="!showThumbNav || !canScrollRight"
            aria-label="Show next thumbnails"
            @click="scrollThumbnails('next')"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import publicApi from '@/services/publicApi'
import { resolveMediaUrl } from '@/utils/media'

const props = defineProps({
  heading: {
    type: String,
    default: "A Tour of Modulux Homes' Cutting-Edge Factory",
  },
  headingTag: {
    type: String,
    default: 'h2',
  },
  eyebrow: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  apiEndpoint: {
    type: String,
    default: '/api/v1/videos/',
  },
  videoLocation: {
    type: String,
    default: 'home',
  },
  fallbackVideos: {
    type: Array,
    default: () => [],
  },
  playLabel: {
    type: String,
    default: 'Autoplay',
  },
  playSubLabel: {
    type: String,
    default: 'Video',
  },
  sectionClass: {
    type: String,
    default: '',
  },
  preferVideoTitle: {
    type: Boolean,
    default: false,
  },
})

const videos = ref([])
const activeIndex = ref(0)
const isPlaying = ref(false)
const isIframeLoading = ref(false)
const iframeKey = ref(0)
const fallbackPoster = '/images/home/anhVD/tronganhchuavideo.webp'
const thumbStripRef = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

const normalizeVideo = (video, index = 0) => {
  const rawThumbnail = video.thumbnailUrl || video.thumbnail_url || ''
  const rawPoster = video.posterUrl || video.poster_url || ''

  return {
    id: video.id ?? index + 1,
    title: video.title || `Modulux Video ${index + 1}`,
    videoUrl: video.videoUrl || video.video_url || '',
    thumbnailUrl: resolveMediaUrl(rawThumbnail),
    posterUrl: resolveMediaUrl(rawPoster || rawThumbnail) || fallbackPoster,
    thumbnailLabel:
      video.thumbnailLabel ||
      video.thumbnail_label ||
      video.title ||
      `Video ${index + 1}`,
    displayOrder: video.displayOrder || video.display_order || index,
    isActive: video.isActive ?? video.is_active ?? true,
  }
}

const normalizedVideos = computed(() => {
  const source = videos.value.length ? videos.value : props.fallbackVideos

  return source
    .map((video, index) => normalizeVideo(video, index))
    .filter((video) => video.isActive)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
})
const showThumbNav = computed(() => normalizedVideos.value.length > 3)

const activeVideo = computed(() => normalizedVideos.value[activeIndex.value] || null)

const resolvedHeading = computed(() => {
  if (props.preferVideoTitle) {
    return activeVideo.value?.title || props.heading
  }
  return props.heading || activeVideo.value?.title || "A Tour of Modulux Homes' Cutting-Edge Factory"
})

const heroBackgroundStyle = computed(() => {
  const poster = activeVideo.value?.posterUrl || fallbackPoster

  return {
    backgroundImage: `url('${poster}')`,
  }
})

const extractYoutubeId = (url) => {
  if (!url) return ''

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/,
    /youtube\.com\/embed\/([^&?/]+)/,
    /youtube\.com\/shorts\/([^&?/]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match?.[1]) {
      return match[1]
    }
  }

  try {
    const parsed = new URL(url)
    return parsed.searchParams.get('v') || ''
  } catch {
    return ''
  }
}

const currentEmbedUrl = computed(() => {
  const youtubeId = extractYoutubeId(activeVideo.value?.videoUrl)

  if (!youtubeId) return ''

  return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
})

const resetPlayback = () => {
  isPlaying.value = false
  isIframeLoading.value = false
  iframeKey.value += 1
}

const updateThumbScrollState = () => {
  const strip = thumbStripRef.value
  if (!strip || !showThumbNav.value) {
    canScrollLeft.value = false
    canScrollRight.value = false
    return
  }

  const maxScroll = strip.scrollWidth - strip.clientWidth
  canScrollLeft.value = strip.scrollLeft > 6
  canScrollRight.value = strip.scrollLeft < maxScroll - 6
}

const scrollActiveThumbIntoView = async (index = activeIndex.value) => {
  await nextTick()
  const strip = thumbStripRef.value
  if (!strip) return

  const target = strip.querySelector(`#video-hero-thumb-${index + 1}`)
  target?.scrollIntoView({
    behavior: 'smooth',
    inline: 'center',
    block: 'nearest',
  })

  window.setTimeout(updateThumbScrollState, 220)
}

const handleThumbScroll = () => {
  updateThumbScrollState()
}

const scrollThumbnails = (direction) => {
  const strip = thumbStripRef.value
  if (!strip || !showThumbNav.value) return

  const thumb = strip.querySelector('.video-hero__thumb')
  const step = (thumb?.clientWidth || 220) + 12
  const offset = direction === 'next' ? step : -step
  strip.scrollBy({
    left: offset,
    behavior: 'smooth',
  })

  window.setTimeout(updateThumbScrollState, 280)
}

const handleIframeLoad = () => {
  isIframeLoading.value = false
}

const startPlayback = async () => {
  if (!currentEmbedUrl.value) return

  isIframeLoading.value = true
  await nextTick()
  isPlaying.value = true
  iframeKey.value += 1
}

const handleSelect = async (index) => {
  const isSwitchingWhilePlaying = isPlaying.value && index !== activeIndex.value

  activeIndex.value = index

  if (isSwitchingWhilePlaying) {
    isIframeLoading.value = true
    iframeKey.value += 1
    await nextTick()
  } else {
    resetPlayback()
  }

  await scrollActiveThumbIntoView(index)
  await startPlayback()
}

const handleClosePlayer = () => {
  resetPlayback()
}

const handlePlay = async () => {
  await startPlayback()
}

const fetchVideosByLocation = async (location) => {
  const response = await publicApi.get(props.apiEndpoint, {
    params: {
      location,
    },
  })
  return Array.isArray(response.data) ? response.data : []
}

const fetchVideos = async () => {
  try {
    const requestedLocation = (props.videoLocation || 'home').toLowerCase()
    const requestedVideos = await fetchVideosByLocation(requestedLocation)
    if (requestedVideos.length > 0) {
      videos.value = requestedVideos
      return
    }

    if (requestedLocation !== 'home') {
      const homeVideos = await fetchVideosByLocation('home')
      if (homeVideos.length > 0) {
        videos.value = homeVideos
        return
      }
    }
  } catch (error) {
    console.warn('Video hero API error:', error)
  }

  videos.value = []
}

watch(
  normalizedVideos,
  (nextVideos) => {
    if (!nextVideos.length) {
      activeIndex.value = 0
      resetPlayback()
      return
    }

    if (activeIndex.value > nextVideos.length - 1) {
      activeIndex.value = 0
    }

    nextTick(() => {
      updateThumbScrollState()
      scrollActiveThumbIntoView(activeIndex.value)
    })
  },
  { immediate: true }
)

onMounted(() => {
  fetchVideos()
  window.addEventListener('resize', updateThumbScrollState)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateThumbScrollState)
})
</script>

<style scoped>
.video-hero {
  width: 100%;
  background: #ffffff;
}

.video-hero__shell {
  width: 100%;
  margin: 0;
  padding: 0;
}

.video-hero__media {
  position: relative;
  width: 100%;
}

.video-hero__stage {
  position: relative;
  width: 100%;
}

.video-hero__stage.is-playing {
  background: #000000;
}

.video-hero__background {
  position: relative;
  width: 100%;
  min-height: clamp(620px, 74vw, 820px);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
}

.video-hero__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(6, 6, 6, 0.56) 0%, rgba(6, 6, 6, 0.34) 30%, rgba(6, 6, 6, 0.08) 58%, rgba(6, 6, 6, 0.2) 100%),
    linear-gradient(180deg, rgba(4, 4, 4, 0.05) 0%, rgba(4, 4, 4, 0.24) 72%, rgba(4, 4, 4, 0.4) 100%);
}

.video-hero__overlay {
  position: relative;
  z-index: 2;
  min-height: clamp(620px, 74vw, 820px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  padding: 110px clamp(28px, 5vw, 80px) 210px;
}

.video-hero__copy {
  max-width: 620px;
  color: #ffffff;
}

.video-hero__eyebrow {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
}

.video-hero__title {
  margin: 0;
  max-width: 620px;
  font-size: clamp(2.8rem, 4.8vw, 4.6rem);
  line-height: 0.94;
  font-weight: 700;
  letter-spacing: -0.055em;
  text-wrap: balance;
}

.video-hero__description {
  margin: 18px 0 0;
  max-width: 560px;
  font-size: 15px;
  line-height: 1.72;
  color: rgba(255, 255, 255, 0.84);
}

.video-hero__play-button {
  position: relative;
  z-index: 2;
  margin-right: clamp(20px, 4vw, 70px);
  display: inline-flex;
  align-items: center;
  gap: 18px;
  border: 0;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.24s ease, opacity 0.24s ease;
}

.video-hero__play-button:hover {
  transform: translateY(-2px);
  opacity: 0.96;
}

.video-hero__play-ring {
  position: absolute;
  left: 15px;
  top: 50%;
  width: 128px;
  height: 128px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  transform: translateY(-50%);
}

.video-hero__play-icon {
  width: 98px;
  height: 98px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.46);
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.22);
}

.video-hero__play-icon svg {
  width: 36px;
  height: 36px;
  margin-left: 4px;
}

.video-hero__play-label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.video-hero__play-label small {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.78);
  letter-spacing: 0.08em;
}

.video-hero__loading {
  position: absolute;
  inset: 0;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  background: rgba(0, 0, 0, 0.78);
  color: #ffffff;
}

.video-hero__spinner {
  width: 52px;
  height: 52px;
  border-radius: 999px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: #ffffff;
  animation: video-hero-spin 0.85s linear infinite;
}

.video-hero__loading-text {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.video-hero__iframe {
  position: absolute;
  inset: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  border: 0;
  opacity: 0;
  transition: opacity 0.28s ease;
}

.video-hero__iframe.is-visible {
  opacity: 1;
}

.video-hero__thumb-rail {
  position: absolute;
  left: 50%;
  bottom: 26px;
  z-index: 4;
  display: grid;
  grid-template-columns: 52px 1fr 52px;
  gap: 10px;
  align-items: center;
  width: min(78vw, 980px);
  transform: translateX(-50%);
}

.video-hero__thumb-nav {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.44);
  background: rgba(8, 8, 8, 0.44);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease, opacity 0.2s ease;
}

.video-hero__thumb-nav:hover:not(:disabled) {
  transform: translateY(-1px);
  background: rgba(8, 8, 8, 0.64);
}

.video-hero__thumb-nav svg {
  width: 18px;
  height: 18px;
}

.video-hero__thumb-nav:disabled {
  opacity: 0.34;
  cursor: not-allowed;
}

.video-hero__thumb-nav.is-hidden {
  opacity: 0;
  pointer-events: none;
}

.video-hero__thumb-strip {
  display: flex;
  gap: 12px;
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-snap-type: x mandatory;
}

.video-hero__thumb-strip::-webkit-scrollbar {
  display: none;
}

.video-hero__thumb-strip.is-centered {
  justify-content: center;
  overflow-x: visible;
}

.video-hero__thumb {
  position: relative;
  flex: 0 0 calc((100% - 24px) / 3);
  min-height: 132px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.08);
  overflow: hidden;
  scroll-snap-align: center;
  cursor: pointer;
  text-align: left;
  transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
}

.video-hero__thumb:hover,
.video-hero__thumb.is-active {
  transform: translateY(-6px);
  border-color: rgba(255, 255, 255, 0.52);
  box-shadow: 0 22px 46px rgba(0, 0, 0, 0.3);
}

.video-hero__thumb-image,
.video-hero__thumb-overlay {
  position: absolute;
  inset: 0;
}

.video-hero__thumb-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-hero__thumb-overlay {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.72) 100%);
}

.video-hero__thumb-play {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.video-hero__thumb-play svg {
  width: 14px;
  height: 14px;
  margin-left: 1px;
}

.video-hero__thumb-text {
  position: absolute;
  right: 12px;
  bottom: 12px;
  left: 12px;
  z-index: 2;
  font-size: 11px;
  line-height: 1.4;
  font-weight: 500;
  color: #ffffff;
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.36);
}

.video-hero__close {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 5;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.58);
  backdrop-filter: blur(8px);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.24s ease, background 0.24s ease, border-color 0.24s ease;
}

.video-hero__close:hover {
  transform: scale(1.04);
  background: rgba(10, 10, 10, 0.78);
  border-color: rgba(255, 255, 255, 0.32);
}

.video-hero__close svg {
  width: 20px;
  height: 20px;
}

@keyframes video-hero-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1200px) {
  .video-hero__background,
  .video-hero__overlay {
    min-height: 680px;
  }

  .video-hero__overlay {
    padding: 92px 40px 198px;
  }

  .video-hero__title {
    font-size: clamp(2.5rem, 4.6vw, 4rem);
  }

  .video-hero__thumb-rail {
    width: min(86vw, 920px);
  }
}

@media (max-width: 991px) {
  .video-hero__background,
  .video-hero__overlay {
    min-height: 600px;
  }

  .video-hero__overlay {
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    padding: 86px 28px 194px;
  }

  .video-hero__copy {
    max-width: 700px;
  }

  .video-hero__play-button {
    align-self: flex-start;
    margin-right: 0;
  }

  .video-hero__thumb-rail {
    width: calc(100% - 56px);
  }

  .video-hero__thumb-nav {
    width: 42px;
    height: 42px;
  }

  .video-hero__thumb {
    min-height: 124px;
  }
}

@media (max-width: 767px) {
  .video-hero__background,
  .video-hero__overlay {
    min-height: 500px;
  }

  .video-hero__overlay {
    gap: 24px;
    padding: 58px 18px 156px;
  }

  .video-hero__title {
    max-width: 340px;
    font-size: clamp(2.2rem, 8vw, 3rem);
  }

  .video-hero__description {
    font-size: 14px;
  }

  .video-hero__play-ring {
    left: 10px;
    width: 96px;
    height: 96px;
  }

  .video-hero__play-icon {
    width: 72px;
    height: 72px;
  }

  .video-hero__play-icon svg {
    width: 28px;
    height: 28px;
  }

  .video-hero__play-label {
    font-size: 11px;
  }

  .video-hero__thumb-rail {
    left: 18px;
    right: 18px;
    bottom: 18px;
    width: auto;
    transform: none;
    grid-template-columns: 1fr;
    gap: 0;
  }

  .video-hero__thumb-nav {
    display: none;
  }

  .video-hero__thumb-strip {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    scroll-snap-type: x proximity;
    padding-bottom: 6px;
  }

  .video-hero__thumb-strip::-webkit-scrollbar {
    height: 4px;
  }

  .video-hero__thumb-strip::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.35);
  }

  .video-hero__thumb {
    flex: 0 0 172px;
    min-height: 108px;
  }

  .video-hero__thumb-text {
    font-size: 10px;
  }

  .video-hero__close {
    top: 14px;
    right: 14px;
    width: 42px;
    height: 42px;
  }
}
</style>
