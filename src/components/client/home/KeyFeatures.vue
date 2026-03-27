<template>
  <section class="kf section-padding">
    <div class="container-custom">
      <div class="kf__grid">
        <!-- Intro -->
        <div class="kf__intro" data-aos="fade-right" data-aos-duration="1000">
          <span class="kf__subtitle">Why Choose Us</span>
          <h2 class="kf__title">Key Features</h2>
          <p class="kf__desc">
            As one of the most modern and internationally standardized factories
            in Southeast Asia, our entire production process is 100% vertically
            integrated in Vietnam.
          </p>
          <router-link to="/why-modulux" class="kf__cta">
            <span>Learn More</span>
            <svg class="kf__cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </router-link>
        </div>

        <!-- Features Grid -->
        <div class="kf__items">
          <div 
            v-for="(feature, idx) in features" 
            :key="feature.title" 
            class="kf__item"
            data-aos="fade-up"
            :data-aos-delay="idx * 150"
            data-aos-duration="1000"
          >
            <div class="kf__item-header">
              <div class="kf__item-icon-wrap">
                <img :src="feature.icon" :alt="feature.title" class="kf__item-icon" />
              </div>
              <h3 class="kf__item-title">{{ feature.title }}</h3>
              <div class="kf__item-line"></div>
            </div>
            <p class="kf__item-desc">{{ feature.desc }}</p>
            <div class="kf__item-img-wrap">
              <img :src="feature.image" :alt="feature.title" class="kf__item-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.kf {
  background: #fff;
}

.kf__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
}

@media (min-width: 1024px) {
  .kf__grid {
    grid-template-columns: 320px 1fr;
    gap: 5rem;
  }
}

/* ── Intro ── */
.kf__subtitle {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  color: #0a4834;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
}

.kf__title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.kf__desc {
  font-size: 1rem;
  color: #6c757d;
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.kf__cta {
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
}

.kf__cta:hover {
  background: #0a4834;
  transform: translateY(-2px);
}

.kf__cta-icon {
  width: 18px;
  height: 18px;
}

/* ── Items Grid ── */
.kf__items {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem 2.5rem;
}

@media (min-width: 768px) {
  .kf__items {
    grid-template-columns: repeat(2, 1fr);
  }
}

.kf__item {
  display: flex;
  flex-direction: column;
}

.kf__item-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
}

.kf__item-icon-wrap {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 72, 52, 0.05);
  border-radius: 6px;
  flex-shrink: 0;
}

.kf__item-icon {
  width: 18px;
  height: 18px;
}

.kf__item-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #212529;
  white-space: nowrap;
}

.kf__item-line {
  height: 1px;
  flex-grow: 1;
  background: #eee;
}

.kf__item-desc {
  font-size: 0.938rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 1.5rem;
  min-height: 3.2rem;
}

.kf__item-img-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  aspect-ratio: 4 / 3;
}

.kf__item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.kf__item:hover .kf__item-img {
  transform: scale(1.05);
}
</style>


<script setup>
defineProps({
  features: {
    type: Array,
    required: true,
  },
})
</script>
