<template>
  <section class="kf section-padding" aria-labelledby="key-features-title">
    <div class="container-custom">
      <div class="kf__layout">
        <aside class="kf__intro" data-aos="fade-right" data-aos-duration="800">
          <h2 id="key-features-title" class="kf__title">Key Features</h2>
          <p class="kf__desc">
            As one of the most modern and internationally standardized factories in Southeast Asia,
            our entire production process is 100% vertically integrated in Vietnam.
          </p>

          <router-link to="/why-modulux" class="kf__button" aria-label="Why Modulux">
            Why Modulux
          </router-link>
        </aside>

        <div class="kf__content">
          <div class="kf__cards">
            <article
              v-for="(feature, idx) in displayFeatures"
              :key="feature.id"
              class="kf__card"
              data-aos="fade-up"
              :data-aos-delay="idx * 90"
              data-aos-duration="800"
            >
              <div class="kf__card-head">
                <div class="kf__card-title-wrap">
                  <img :src="feature.icon" :alt="`${feature.title} icon`" class="kf__card-icon" />
                  <h3 class="kf__card-title">{{ feature.title }}</h3>
                </div>
                <span class="kf__card-line" aria-hidden="true"></span>
              </div>

              <p class="kf__card-desc">{{ feature.desc }}</p>

              <div class="kf__image-wrap">
                <img :src="feature.image" :alt="feature.title" class="kf__image" loading="lazy" />
              </div>
            </article>
          </div>

          <div class="kf__footer" data-aos="fade-left" data-aos-delay="160" data-aos-duration="800">
            <router-link to="/why-modulux" class="kf__more-link">
              <span>Learn more why modulux</span>
              <svg class="kf__more-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  features: {
    type: Array,
    required: true,
  },
})

const fallbackFeatures = [
  {
    title: 'Quick Installation',
    icon: '/images/Quick_Installation.svg',
    desc: 'Featuring two flexible installation methods (Module/Panel) tailored to each project scale.',
    image: '/images/home/Key Features/key-feature-quick-installation.png',
  },
  {
    title: 'Technology',
    icon: '/images/Technology.svg',
    desc: 'Modulux Homes employs the most advanced construction technologies to streamline delivery.',
    image: '/images/home/Key Features/key-feature-technology.png',
  },
  {
    title: 'Cost-Efficient Optimization',
    icon: '/images/Cost-efficient.svg',
    desc: 'Benefit from significant cost reductions due to mass production and minimized on-site work.',
    image: '/images/home/Key Features/key-feature-cost-efficient-optimization.png',
  },
  {
    title: 'Quality',
    icon: '/images/Quality.svg',
    desc: 'Modulux Homes delivers high-quality prefabricated homes that undergo strict factory-controlled standards.',
    image: '/images/home/Key Features/key-feature-quality.png',
  },
]

const normalizeFeatureKey = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')

const featureAliasMap = {
  [normalizeFeatureKey('Quick Installation')]: 'Quick Installation',
  [normalizeFeatureKey('Technology')]: 'Technology',
  [normalizeFeatureKey('Cost-Efficient Optimization')]: 'Cost-Efficient Optimization',
  [normalizeFeatureKey('Cost Efficient Optimization')]: 'Cost-Efficient Optimization',
  [normalizeFeatureKey('Cost Optimization')]: 'Cost-Efficient Optimization',
  [normalizeFeatureKey('Quality')]: 'Quality',
}

const displayFeatures = computed(() => {
  const featureMap = new Map()

  ;(props.features || []).forEach((item) => {
    if (!item?.title) {
      return
    }

    const canonicalTitle = featureAliasMap[normalizeFeatureKey(item.title)] || item.title

    if (!featureMap.has(canonicalTitle)) {
      featureMap.set(canonicalTitle, item)
    }
  })

  return fallbackFeatures.map((fallbackItem) => {
    const apiItem = featureMap.get(fallbackItem.title)

    return {
      id: normalizeFeatureKey(fallbackItem.title).replace(/\s+/g, '-'),
      title: apiItem?.title || fallbackItem.title,
      icon: apiItem?.icon || fallbackItem.icon,
      desc: apiItem?.desc || fallbackItem.desc,
      image: apiItem?.image || fallbackItem.image,
    }
  })
})
</script>

<style scoped>
.kf {
  background: #ffffff;
}

.kf__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.kf__intro {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.kf__title {
  margin: 0;
  color: #111111;
  font-size: clamp(2rem, 3vw, 2.45rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
}

.kf__desc {
  margin: 0.9rem 0 0;
  max-width: 210px;
  color: #6b6f73;
  font-size: 0.74rem;
  line-height: 1.7;
}

.kf__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 7rem;
  min-width: 78px;
  min-height: 22px;
  padding: 0.18rem 0.5rem;
  background: #050505;
  color: #ffffff;
  text-decoration: none;
  font-size: 0.54rem;
  font-weight: 700;
  line-height: 1;
  transition:
    transform 0.25s ease,
    background-color 0.25s ease,
    opacity 0.25s ease;
}

.kf__button:hover {
  background: #0d0d0d;
  transform: translateY(-1px);
  opacity: 0.95;
}

.kf__content {
  display: flex;
  flex-direction: column;
}

.kf__cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.55rem 1.15rem;
}

.kf__card {
  display: flex;
  flex-direction: column;
}

.kf__card-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.kf__card-title-wrap {
  display: inline-flex;
  align-items: center;
  gap: 0.28rem;
  flex-shrink: 0;
}

.kf__card-icon {
  width: 11px;
  height: 11px;
  object-fit: contain;
  opacity: 0.95;
}

.kf__card-title {
  margin: 0;
  color: #202020;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.kf__card-line {
  display: block;
  width: 100%;
  height: 1px;
  background: #bfc3c6;
  transform: translateY(1px);
}

.kf__card-desc {
  margin: 0.42rem 0 0.7rem;
  max-width: 278px;
  min-height: 2.1rem;
  color: #7a8086;
  font-size: 0.61rem;
  line-height: 1.45;
}

.kf__image-wrap {
  overflow: hidden;
  border-radius: 4px;
  background: #f1f1f1;
  aspect-ratio: 1.12 / 1;
}

.kf__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.kf__card:hover .kf__image {
  transform: scale(1.025);
}

.kf__footer {
  display: flex;
  justify-content: flex-start;
  padding-top: 0.65rem;
}

.kf__more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
  color: #245c49;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.2;
  transition:
    color 0.25s ease,
    transform 0.25s ease;
}

.kf__more-link:hover {
  color: #174636;
  transform: translateX(3px);
}

.kf__more-icon {
  width: 13px;
  height: 13px;
}

@media (min-width: 768px) {
  .kf__cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .kf__layout {
    grid-template-columns: minmax(220px, 236px) minmax(0, 1fr);
    gap: 1.15rem;
    align-items: start;
  }

  .kf__footer {
    justify-content: flex-end;
    padding-top: 0.2rem;
    padding-right: 7.2rem;
  }
}

@media (max-width: 1023px) {
  .kf__intro {
    max-width: 100%;
  }

  .kf__desc {
    max-width: 100%;
    font-size: 0.86rem;
  }

  .kf__button {
    margin-top: 1.6rem;
    min-width: 118px;
    min-height: 42px;
    padding: 0.75rem 1rem;
    font-size: 0.78rem;
  }

  .kf__card-title {
    font-size: 1rem;
  }

  .kf__card-desc {
    font-size: 0.76rem;
    min-height: auto;
  }

  .kf__more-link {
    font-size: 0.98rem;
  }

  .kf__more-icon {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 767px) {
  .kf__layout {
    gap: 1.5rem;
  }

  .kf__cards {
    gap: 1.25rem;
  }

  .kf__image-wrap {
    aspect-ratio: 1.08 / 1;
  }

  .kf__footer {
    justify-content: flex-start;
    padding-top: 0.1rem;
  }

  .kf__more-link {
    font-size: 0.94rem;
  }
}
</style>
