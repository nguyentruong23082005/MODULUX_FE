<template>
  <section class="hero">
    <div class="hero__media">
      <video
        v-if="isVideo"
        autoplay
        muted
        loop
        playsinline
        class="hero__bg hero__bg--video"
        :src="banner.image_url"
      ></video>
      <img
        v-else
        :src="banner.image_url"
        alt="Modulux Homes hero banner"
        class="hero__bg hero__bg--image"
      />
    </div>

    <div class="hero__overlay"></div>

    <div class="hero__content" data-aos="fade-up" data-aos-duration="1200">
      <div class="hero__copy">
        <p v-if="banner.eyebrow" class="hero__eyebrow">
          {{ banner.eyebrow }}
        </p>
        <h1 class="hero__title">
          {{ banner.title }}
        </h1>
      </div>

      <router-link :to="banner.cta_link" class="hero__cta">
        {{ banner.cta_text || 'Learn more' }}
      </router-link>
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

const isVideo = computed(() => props.banner.image_url?.toLowerCase().endsWith('.mp4'))
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #000;
  min-height: calc(100vh - 80px);
}

.hero__media {
  position: absolute;
  inset: 0;
}

.hero__bg {
  display: block;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hero__bg--image {
  object-fit: cover;
  object-position: center center;
}

.hero__bg--video {
  object-fit: cover;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.04) 0%,
    rgba(0, 0, 0, 0.14) 48%,
    rgba(0, 0, 0, 0.58) 100%
  );
  z-index: 1;
  pointer-events: none;
}

.hero__content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  max-width: 1536px;
  margin: 0 auto;
  padding: 0 1rem 4.5rem;
}

.hero__copy {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  max-width: min(100%, 68rem);
}

.hero__eyebrow,
.hero__title {
  margin: 0;
  color: #ffffff;
  text-transform: uppercase;
  font-family: 'Geoform-Regular', 'Quicksand', var(--font-sans);
}

.hero__eyebrow {
  font-size: clamp(1rem, 0.95rem + 0.18vw, 1.05rem);
  line-height: 1.5;
  font-weight: 400;
}

.hero__title {
  max-width: min(100%, 74rem);
  font-size: clamp(1.65rem, 1.35rem + 1.15vw, 2.18rem);
  line-height: 1.18;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-height: 2.5rem;
  margin-top: 1.2rem;
  padding: 0.5rem 1rem;
  background: #ffffff;
  color: #111111;
  text-decoration: none;
  font-family: 'Geoform-Medium', 'Quicksand', var(--font-sans);
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 500;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.hero__cta:hover {
  background: #e7e7e7;
  color: #000000;
}

@media (min-width: 768px) {
  .hero__content {
    padding: 0 2rem 6rem;
  }
}

@media (min-width: 1200px) {
  .hero__content {
    padding-bottom: 6.9rem;
  }
}

@media (max-width: 767px) {
  .hero {
    min-height: calc(100svh - 80px);
  }

  .hero__content {
    padding: 0 1rem 3.5rem;
  }

  .hero__copy {
    gap: 0.35rem;
    max-width: 22rem;
  }

  .hero__eyebrow {
    font-size: 0.92rem;
    line-height: 1.35;
  }

  .hero__title {
    font-size: 1.75rem;
    line-height: 1.2;
  }
}
</style>
