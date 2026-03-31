<template>
  <section class="kf" aria-labelledby="key-features-title">
    <div class="kf__shell">
      <div class="kf__grid">
        <aside class="kf__intro" data-aos="fade-up" data-aos-duration="800">
          <div class="kf__intro-copy">
            <h2 id="key-features-title" class="kf__title">Key Features</h2>
            <p class="kf__intro-desc">
              As one of the most modern and internationally standardized factories in Southeast Asia,
              our entire production process is 100% vertically integrated in Vietnam
            </p>
          </div>

          <router-link to="/why-modulux" class="kf__button" aria-label="Why Modulux">
            Why Modulux
          </router-link>
        </aside>

        <article
          v-for="(feature, idx) in displayFeatures"
          :key="feature.id"
          class="kf__card"
          data-aos="fade-up"
          :data-aos-delay="80 + idx * 70"
          data-aos-duration="800"
        >
          <div class="kf__card-head">
            <span class="kf__card-icon-wrap">
              <img :src="feature.icon" :alt="`${feature.title} icon`" class="kf__card-icon" loading="lazy" />
            </span>
            <h3 class="kf__card-title">{{ feature.title }}</h3>
            <span class="kf__card-line" aria-hidden="true"></span>
          </div>

          <p class="kf__card-desc">
            <template v-if="feature.descLines?.length">
              <template v-for="(line, lineIdx) in feature.descLines" :key="`${feature.id}-${lineIdx}`">
                {{ line }}<br v-if="lineIdx < feature.descLines.length - 1" />
              </template>
            </template>
            <template v-else>
              {{ feature.desc }}
            </template>
          </p>

          <div class="kf__image-wrap">
            <img :src="feature.image" :alt="feature.title" class="kf__image" loading="lazy" />
          </div>
        </article>

        <div class="kf__cta" data-aos="fade-right" data-aos-delay="360" data-aos-duration="800">
          <router-link to="/why-modulux" class="kf__more-link">
            <span>Learn more why modulux</span>
            <svg class="kf__more-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </router-link>
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
    desc: 'Featuring two flexible installation methods (Module/Panel) tailored to',
    descLines: [
      'Featuring two flexible installation',
      'methods (Module/Panel) tailored to',
    ],
    image: '/images/home/Key Features/key-feature-quick-installation.png',
  },
  {
    title: 'Technology',
    icon: '/images/Technology.svg',
    desc: 'Modulux Homes employs the most advanced construction technologies to',
    descLines: [
      'Modulux Homes employs the most',
      'advanced construction technologies to',
    ],
    image: '/images/home/Key Features/key-feature-technology.png',
  },
  {
    title: 'Cost-Efficient Optimization',
    icon: '/images/Cost-efficient.svg',
    desc: 'Benefit from significant cost reductions due to mass production and minimized',
    descLines: [
      'Benefit from significant cost reductions',
      'due to mass production and minimized',
    ],
    image: '/images/home/Key Features/key-feature-cost-efficient-optimization.png',
  },
  {
    title: 'Quality',
    icon: '/images/Quality.svg',
    desc: 'Modulux Homes delivers high-quality prefabricated homes that undergo',
    descLines: [
      'Modulux Homes delivers high-quality',
      'prefabricated homes that undergo',
    ],
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
      descLines: apiItem?.desc ? null : fallbackItem.descLines,
      image: apiItem?.image || fallbackItem.image,
    }
  })
})
</script>

<style scoped>
.kf {
  background: #ffffff;
  padding: 3.25rem 0 4.5rem;
}

.kf__shell {
  width: min(calc(100% - 2rem), 94rem);
  margin: 0 auto;
}

.kf__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.kf__intro {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}

.kf__intro-copy {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.kf__title {
  margin: 0;
  color: #000000;
  font-family: 'Geoform-Bold', 'Montserrat', var(--font-display);
  font-size: clamp(2rem, 1.65rem + 0.95vw, 2.25rem);
  font-weight: 700;
  line-height: 1.11;
  letter-spacing: -0.03em;
}

.kf__intro-desc {
  margin: 0;
  color: #222222;
  font-family: 'Quicksand-Medium', 'Quicksand', var(--font-sans);
  font-size: 1rem;
  line-height: 1.5;
}

.kf__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-height: 2.5rem;
  padding: 0.5rem 1rem;
  background: #000000;
  color: #ffffff;
  text-decoration: none;
  font-family: 'Geoform-Medium', 'Quicksand', var(--font-sans);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  transition:
    background-color 0.25s ease,
    transform 0.25s ease;
}

.kf__button:hover {
  background: #1b1b1b;
  transform: translateY(-1px);
}

.kf__card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  overflow: hidden;
}

.kf__card-head {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.kf__card-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  min-width: 1.5rem;
  overflow: hidden;
  background: #ffffff;
  flex-shrink: 0;
}

.kf__card-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.kf__card-title {
  margin: 0;
  color: #1a1a1a;
  font-family: 'Geoform-Medium', 'Montserrat', var(--font-display);
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.4;
  white-space: nowrap;
  flex-shrink: 0;
}

.kf__card-line {
  flex: 1;
  height: 1px;
  background: #afafaf;
}

.kf__card-desc {
  margin: 0;
  min-height: 2.5rem;
  color: #6b7280;
  font-family: 'Quicksand-Medium', 'Quicksand', var(--font-sans);
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.kf__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.kf__image-wrap {
  width: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
  background: #f1f1f1;
  height: 18.5rem;
}

.kf__cta {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.kf__more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  color: #0a4834;
  text-decoration: none;
  font-family: 'Quicksand-Bold', 'Quicksand', var(--font-sans);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  transition:
    color 0.25s ease,
    transform 0.25s ease;
}

.kf__more-link:hover {
  color: #174636;
  transform: translateX(3px);
}

.kf__more-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .kf {
    padding-top: 4.75rem;
    padding-bottom: 5rem;
  }

  .kf__shell {
    width: min(calc(100% - 4rem), 94rem);
  }

  .kf__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.75rem 1.5rem;
  }

  .kf__cta {
    grid-column: 1 / -1;
  }
}

@media (min-width: 1024px) {
  .kf {
    padding-top: 5.5rem;
  }

  .kf__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2.5rem;
  }

  .kf__button {
    margin-bottom: 6rem;
  }

  .kf__intro {
    min-height: 32.4375rem;
    justify-content: space-between;
  }

  .kf__cta {
    grid-column: 3;
    grid-row: 2;
    padding-top: 0;
  }

  .kf__more-link {
    padding-top: 2.5rem;
  }

  .kf__image-wrap {
    height: 24rem;
  }
}

@media (max-width: 1023px) {
  .kf__button {
    margin-top: 0.5rem;
  }

  .kf__card-desc {
    min-height: auto;
  }
}

@media (max-width: 767px) {
  .kf {
    padding-top: 3rem;
    padding-bottom: 4rem;
  }

  .kf__shell {
    width: calc(100% - 2rem);
  }

  .kf__grid {
    gap: 1.25rem;
  }

  .kf__title {
    font-size: 2rem;
  }

  .kf__image-wrap {
    height: 16rem;
  }

  .kf__intro-desc {
    font-size: 0.95rem;
  }

  .kf__card-title,
  .kf__more-link {
    font-size: 1.05rem;
    line-height: 1.35;
  }
}
</style>
