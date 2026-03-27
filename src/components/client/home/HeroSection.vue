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
      <h1 class="hero__title">{{ banner.title }}</h1>
      <p v-if="banner.description" class="hero__desc">
        {{ banner.description }}
      </p>
      <router-link :to="banner.cta_link" class="hero__cta">
        {{ banner.cta_text }}
        <svg class="hero__cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
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
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: #000;
}

.hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 40%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 1;
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1.25rem;
  margin-top: 60px;
}

@media (min-width: 768px) {
  .hero__content { padding: 0 2rem; }
}

.hero__title {
  max-width: 900px;
  font-size: 2.75rem;
  font-weight: 700;
  line-height: 1.05;
  color: #fff;
  white-space: pre-line;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .hero__title { font-size: 4rem; }
}

@media (min-width: 1024px) {
  .hero__title { font-size: 5.5rem; }
}

.hero__desc {
  max-width: 580px;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  font-weight: 400;
}

@media (min-width: 768px) {
  .hero__desc { font-size: 1.125rem; }
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 1.125rem 2.5rem;
  font-size: 0.938rem;
  font-weight: 700;
  color: #fff;
  background: #0a4834;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero__cta:hover {
  background: #fff;
  color: #0a4834;
  transform: translateX(5px);
}

.hero__cta-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.hero__cta:hover .hero__cta-icon {
  transform: translateX(3px);
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
