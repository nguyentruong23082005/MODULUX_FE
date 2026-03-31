<template>
  <VideoHero
    heading="A Tour of Modulux Homes' Cutting-Edge Factory"
    heading-tag="h2"
    play-label="Autoplay"
    play-sub-label="Video"
    :video-location="location"
    :section-class="resolvedSectionClass"
    :fallback-videos="fallbackVideos"
  />
</template>

<script setup>
import { computed } from 'vue'
import VideoHero from '@/components/client/VideoHero.vue'

const props = defineProps({
  location: {
    type: String,
    default: 'home',
  },
  sectionClass: {
    type: String,
    default: '',
  },
  fallbackVideos: {
    type: Array,
    default: () => [],
  },
})

const resolvedSectionClass = computed(() => props.sectionClass || 'factory-video-section')
</script>

<style scoped>
:deep(.factory-video-section) {
  padding: 0 0 56px;
}

:deep(.factory-video-section .video-hero__shell) {
  width: min(100%, 1512px);
}

:deep(.factory-video-section .video-hero__background) {
  min-height: 620px;
}

:deep(.factory-video-section .video-hero__overlay) {
  min-height: 620px;
}

@media (max-width: 991px) {
  :deep(.factory-video-section) {
    padding-bottom: 40px;
  }

  :deep(.factory-video-section .video-hero__background),
  :deep(.factory-video-section .video-hero__overlay) {
    min-height: 540px;
  }
}
</style>
