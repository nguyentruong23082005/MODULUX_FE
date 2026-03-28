<template>
  <section class="hero">
    <!-- Video nền nếu có image_url kết thúc bằng .mp4 hoặc có prop video_url -->
    <video
      v-if="isVideo"
      autoplay
      muted
      loop
      playsinline
      class="hero__bg"
      :src="banner.image_url"
    ></video>
    <img
      v-else
      :src="banner.image_url"
      alt="Modulux Homes Hero"
      class="hero__bg"
    />
    
    <div class="hero__overlay"></div>

    <div class="hero__content" data-aos="fade-up" data-aos-duration="1200">
      <h1 class="hero__title" v-html="formattedTitle(banner.title)"></h1>
      <p v-if="banner.description" class="hero__desc">
        {{ banner.description }}
      </p>
      <router-link :to="banner.cta_link" class="hero__cta">
        Learn more
      </router-link>
    </div>

    <!-- Scroll Indicator -->
    <div class="hero__scroll">
      <div class="hero__scroll-line"></div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  banner: {
    type: Object,
    required: true,
  },
})

const isVideo = computed(() => {
  return props.banner.image_url?.toLowerCase().endsWith('.mp4')
})

const formattedTitle = (title) => {
  if (!title) return ''
  // For matching the reference design: first line is normal, rest is bold
  // We'll split the title safely based on what we have
  return title.replace(/HIGH-PERFORMANCE MODULAR HOMES FOR/i, '<span class="hero__title-light">HIGH-PERFORMANCE MODULAR HOMES FOR</span><br>')
}
</script>

<style scoped>
.hero {
  position: relative;
  height: calc(100vh - 84px); /* Trừ đi height của header */
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: flex-end; /* Đẩy nội dung xuống đáy */
  background: #000;
}

.hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.2) 60%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: 1;
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1.25rem 4rem 1.25rem; /* Padding bottom lớn */
}

@media (min-width: 768px) {
  .hero__content { padding: 0 2rem 5rem 2rem; }
}

.hero__title {
  max-width: 900px;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: #fff;
  white-space: pre-line;
  margin-bottom: 1.25rem;
  letter-spacing: -0.01em;
  text-transform: uppercase;
}

::v-deep(.hero__title-light) {
  font-weight: 300;
  font-size: 0.9em;
  letter-spacing: 0em;
}

@media (min-width: 768px) {
  .hero__title { font-size: 2.25rem; }
}

@media (min-width: 1024px) {
  .hero__title { font-size: 2.5rem; max-width: 800px; }
}

.hero__desc {
  max-width: 580px;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-weight: 400;
  display: none; /* Ẩn đi để giống mẫu nhất */
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  font-size: 0.938rem;
  font-weight: 500;
  color: #111111;
  background: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
}

.hero__cta:hover {
  background: #f0f0f0;
  color: #000;
}

/* Scroll Indicator */
.hero__scroll {
  position: absolute;
  bottom: 40px;
  right: 40px;
  z-index: 2;
  height: 80px;
  width: 1px;
  background: rgba(255, 255, 255, 0.2);
}

.hero__scroll-line {
  width: 100%;
  height: 30%;
  background: #fff;
  animation: scroll-anim 2s infinite;
}

@keyframes scroll-anim {
  0% { transform: translateY(0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(150%); opacity: 0; }
}

@media (max-width: 767px) {
  .hero__scroll { display: none; }
}
</style>
