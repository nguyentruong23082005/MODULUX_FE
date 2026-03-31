<template>
  <div class="why-page">
    <section class="why-intro">
      <div class="container-custom why-intro__grid">
        <div
          class="why-intro__media"
          data-aos="fade-right"
          data-aos-offset="20"
          data-aos-delay="50"
        >
          <img
            :src="`${whyImageBase}/2K.webp`"
            alt="Why Modulux"
            class="why-intro__image"
            loading="lazy"
          />
        </div>

        <div
          class="why-intro__copy"
          data-aos="fade-left"
          data-aos-offset="20"
          data-aos-delay="50"
        >
          <p>
            As one of the most modern and internationally standardized factories in Southeast Asia,
            our entire production process is 100% vertically integrated in Vietnam, ensuring
            consistent quality and rigorous control over every detail. Modulux Homes not only
            optimizes construction timelines and minimizes unforeseen costs but also delivers
            sustainable, comfortable, and modern structures.
          </p>
        </div>
      </div>
    </section>

    <section class="why-features">
      <div class="container-custom">
        <div class="why-features__grid">
          <article
            v-for="(item, idx) in featureCards"
            :key="item.title"
            class="why-feature"
          >
            <div class="why-feature__head">
              <span
                class="why-feature__icon-wrap"
                data-aos="fade-left"
                data-aos-offset="20"
                :data-aos-delay="featureDelay(idx)"
              >
                <img :src="item.icon" :alt="`${item.title} icon`" class="why-feature__icon" />
              </span>

              <span
                class="why-feature__title"
                data-aos="fade-left"
                data-aos-offset="20"
                :data-aos-delay="featureDelay(idx) + 380"
              >
                {{ item.title }}
              </span>

              <span
                class="why-feature__line"
                data-aos="fade-right"
                data-aos-offset="20"
                :data-aos-delay="featureDelay(idx) + 900"
              ></span>
            </div>

            <div
              class="why-feature__image-wrap"
              data-aos="fade-up"
              data-aos-offset="20"
              data-aos-delay="150"
            >
              <img :src="item.image" :alt="item.title" class="why-feature__image" loading="lazy" />
            </div>

            <p
              class="why-feature__desc"
              data-aos="fade-up"
              data-aos-offset="20"
              data-aos-delay="100"
            >
              <template v-if="item.linkTo">
                {{ item.desc }}
                <router-link :to="item.linkTo" class="why-feature__link">{{ item.linkLabel }}</router-link>
              </template>
              <template v-else>
                {{ item.desc }}
              </template>
            </p>

            <ul v-if="item.points?.length" class="why-feature__points">
              <li v-for="point in item.points" :key="point">{{ point }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="why-cta">
      <div class="why-cta__bg">
        <img src="/images/home/nen.avif" alt="Contact banner" loading="lazy" />
      </div>
      <div class="why-cta__overlay"></div>

      <div class="container-custom why-cta__inner">
        <div class="why-cta__copy">
          <h2 data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
            Contact our team for more information
          </h2>
          <p data-aos="fade-up" data-aos-offset="20" data-aos-delay="100">
            If you have any questions, do not hesitate to reach out to our team of experts.
          </p>
        </div>

        <div class="why-cta__action" data-aos="fade-up" data-aos-offset="20" data-aos-delay="130">
          <router-link to="/contact?type=project" class="why-cta__button">
            CONTACT OUR TEAM
          </router-link>
        </div>
      </div>
    </section>

    <section class="why-projects">
      <div class="container-custom">
        <div class="why-projects__top">
          <div class="why-projects__intro">
            <h2 data-aos="fade-right" data-aos-offset="20" data-aos-delay="50">Feature Projects</h2>
            <p data-aos="fade-right" data-aos-offset="20" data-aos-delay="100">
              Explore completed modular homes for design inspiration and ideas.
            </p>
            <router-link
              to="/projects"
              class="why-projects__all"
              data-aos="fade-right"
              data-aos-offset="20"
              data-aos-delay="150"
            >
              See All Projects
            </router-link>
          </div>

          <article
            v-if="leadProject"
            class="why-projects__lead"
            data-aos="fade-left"
            data-aos-offset="20"
            data-aos-delay="50"
          >
            <router-link :to="`/projects/${leadProject.slug}`" class="why-projects__card-link">
              <img :src="leadProject.image" :alt="leadProject.title" class="why-projects__lead-image" />
              <h3>{{ leadProject.title }}</h3>
              <p>{{ leadProject.summary }}</p>
            </router-link>
          </article>
        </div>

        <div class="why-projects__grid">
          <article
            v-for="(item, idx) in tailProjects"
            :key="item.slug"
            class="why-projects__card"
            data-aos="fade-up"
            data-aos-offset="20"
            :data-aos-delay="80 + idx * 60"
          >
            <router-link :to="`/projects/${item.slug}`" class="why-projects__card-link">
              <img :src="item.image" :alt="item.title" class="why-projects__card-image" />
              <h3>{{ item.title }}</h3>
              <p>{{ item.summary }}</p>
            </router-link>
          </article>
        </div>
      </div>
    </section>

    <FactoryVideo
      location="faq"
      section-class="why-video-section-bottom"
      :fallback-videos="whyModuluxFallbacks"
    />

    <section class="why-faq">
      <div class="container-custom">
        <h2>Frequently Asked Questions About Projects</h2>
        <p>
          Do you have any questions about modular home building that are not covered here?
          <router-link to="/contact?type=project" class="why-faq__contact-link">Get in touch</router-link>
          with our friendly team. We are happy to help.
        </p>

        <div class="why-faq__list">
          <details
            v-for="(item, idx) in faqItems"
            :key="item.q"
            class="why-faq__item"
            data-aos="fade-up"
            data-aos-offset="20"
            :data-aos-delay="idx * 40"
          >
            <summary>
              <span>{{ item.q }}</span>
              <span class="why-faq__plus">+</span>
            </summary>
            <p>{{ item.a }}</p>
          </details>
        </div>

        <div class="why-faq__actions">
          <router-link to="/faqs" class="why-faq__button">All FAQs</router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import FactoryVideo from '@/components/client/home/FactoryVideo.vue'
import publicApi from '@/services/publicApi'
import { resolveMediaUrl, getProjectCardImage } from '@/utils/media'

const whyImageBase = '/images/home/Key%20Features/why-modulux'

const whyModuluxFallbacks = [
  {
    title: "A Tour of Modulux Homes' Cutting-Edge Factory",
    videoUrl: 'https://www.youtube.com/watch?v=F0OqN-H_yMc',
    thumbnailUrl: '/images/MODULUXFACTORYTOUR.jpg',
  },
]

const featureCards = [
  {
    title: 'Quick Installation',
    icon: '/images/Quick_Installation.svg',
    image: `${whyImageBase}/kh1.png`,
    desc: 'Featuring two flexible installation methods (Module/Panel) tailored to each project, our pre-designed models can be assembled in just 3-7 working days.',
  },
  {
    title: 'Technology',
    icon: '/images/Technology.svg',
    image: `${whyImageBase}/kf1.png`,
    desc: 'Modulux Homes employs advanced construction technologies to guarantee superior quality and performance for every project.',
    linkTo: '/our-technology',
    linkLabel: ' See more',
  },
  {
    title: 'Cost-efficient optimization',
    icon: '/images/Cost-efficient.svg',
    image: `${whyImageBase}/Cost-efficient.png`,
    desc: 'Benefit from significant cost reductions due to mass production and minimized material waste.',
  },
  {
    title: 'Quality',
    icon: '/images/Quality.svg',
    image: `${whyImageBase}/Quality.png`,
    desc: 'Modulux Homes delivers high-quality prefabricated homes that undergo stringent inspection by ICC & NTA, leading quality assurance organizations in the USA and Canada.',
    points: [
      'We are proud strategic partners with renowned international corporations.',
      'Rothoblaas: The leading Italian corporation for load-bearing structures and connection solutions for timber constructions.',
      'Life Design Kabaya: A leading Japanese company in CLT applications.',
      "FPT IS: Comprehensive greenhouse gas inventory and emission assessment partner for Modulux Homes' premium prefab homes.",
    ],
  },
  {
    title: 'Experience',
    icon: '/images/Technology.svg',
    image: `${whyImageBase}/2K.avif`,
    desc: 'With over 20 years of architecture and construction experience, we provide flexible manufacturing capabilities for a wide array of custom projects.',
  },
  {
    title: 'One-stop solution',
    icon: '/images/Quick_Installation.svg',
    image: `${whyImageBase}/2K%20(1).avif`,
    desc: 'We provide an integrated premium prefab housing solution from robust structure to high-end interior finishing.',
  },
  {
    title: 'Capacity',
    icon: '/images/Cost-efficient.svg',
    image: `${whyImageBase}/2K%20(2).avif`,
    desc: 'All products are manufactured in internationally standardized factories with high yearly output and stable lead times.',
    points: [
      'Production capacity of around 1200-1500 units per year.',
      '100% Made in Vietnam, ensuring short lead times.',
    ],
  },
  {
    title: 'Sustainability',
    icon: '/images/Quality.svg',
    image: `${whyImageBase}/Sustainability.png`,
    desc: 'Environment-friendly materials and energy-efficient systems reduce waste, power use, and annual operating costs.',
    points: [
      'Environmentally friendly materials minimize on-site construction waste.',
      'Designed for stable indoor temperatures and improved energy efficiency.',
    ],
  },
]

const featureDelay = (idx) => {
  const delays = [50, 1050, 2050, 50, 1050, 2050, 50, 1050]
  return delays[idx] ?? 50
}

const faqItems = [
  {
    q: 'Do you provide architectural drawings for permitting?',
    a: 'Yes. We can provide drawing packages and technical documents based on local permit and authority requirements.',
  },
  {
    q: 'Can your homes be stacked (multi-story)?',
    a: 'Yes. Depending on model and site conditions, multi-story stacking options are available with structural verification.',
  },
  {
    q: 'Do your homes include HVAC, solar panels, or smart systems?',
    a: 'Optional systems are available and can be configured by project scope, climate, and energy targets.',
  },
  {
    q: 'What construction methods do you use?',
    a: 'We use a controlled off-site prefabrication workflow with module or panel assembly to ensure speed and quality consistency.',
  },
  {
    q: 'Can I customize the layout of the home?',
    a: 'Yes. Modulux supports customization in layout, finishes, and system packages depending on selected model and budget.',
  },
]

const fallbackProjects = [
  {
    slug: 'hawaii-garden-studio',
    title: 'Hawaii Garden Studio',
    image: '/images/Hawaii-Garden-Studio-Overview-1-1.png',
    summary: 'Compact modern prefab studio with fast installation and clean contemporary detailing.',
  },
  {
    slug: 'greenscape',
    title: 'Greenscape',
    image: '/images/Greenscape-768x576.png',
    summary: 'Balanced indoor-outdoor living with sustainable materials and practical modular planning.',
  },
  {
    slug: 'ecolux',
    title: 'Ecolux',
    image: '/images/Ecolux-Overview-768x512.png',
    summary: 'Energy-aware modular design optimized for comfort, durability, and long-term operating efficiency.',
  },
  {
    slug: 'nahb-ibs-lv',
    title: 'NAHB IBS LV',
    image: '/images/1757389588623-1212.jpg',
    summary: 'A showcase modular project highlighting rapid deployment and premium construction quality.',
  },
]

const projects = ref([...fallbackProjects])

const leadProject = computed(() => projects.value[0] || null)
const tailProjects = computed(() => projects.value.slice(1, 4))

const fetchProjects = async () => {
  try {
    const res = await publicApi.get('/api/v1/projects/', {
      params: { is_featured: true, limit: 4 },
    })

    const normalized = (res.data || [])
      .filter((item) => item?.slug && item?.title)
      .slice(0, 4)
      .map((item, idx) => ({
        slug: item.slug,
        title: item.title,
        image: getProjectCardImage(item, fallbackProjects[idx % fallbackProjects.length].image),
        summary:
          item.summary ||
          'Explore this modular project for practical design ideas and proven build performance.',
      }))

    if (normalized.length >= 3) {
      projects.value = normalized
    }
  } catch (error) {
    console.error('Unable to load featured projects for Why Modulux:', error)
  }
}

onMounted(fetchProjects)
</script>

<style scoped>
.why-page {
  background: #ececec;
  color: #1f2226;
}

:deep(.why-video-section-bottom) {
  position: relative;
  padding: 80px 0;
  background: #ffffff;
}

:deep(.why-video-section-bottom .video-hero__shell) {
  width: min(calc(100% - 48px), 1512px);
  margin: 0 auto;
}

:deep(.why-video-section-bottom .video-hero__media) {
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
}

:deep(.why-video-section-bottom .video-hero__background),
:deep(.why-video-section-bottom .video-hero__overlay) {
  min-height: clamp(480px, 50vw, 680px);
}

:deep(.why-video-section-bottom .video-hero__overlay) {
  padding: 80px clamp(24px, 4vw, 64px) 160px;
}

:deep(.why-video-section-bottom .video-hero__title) {
  font-size: clamp(2rem, 3.4vw, 3.2rem);
  max-width: 680px;
  line-height: 1.1;
}

:deep(.why-video-section-bottom .video-hero__thumb-rail) {
  bottom: 24px;
}

@media (max-width: 768px) {
  :deep(.why-video-section-bottom) {
    padding: 50px 0;
  }
}

.why-intro {
  padding: 12px 0 12px;
}

.why-intro__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.why-intro__media {
  border-radius: 0;
  overflow: hidden;
}

.why-intro__image {
  width: 100%;
  height: 100%;
  min-height: 210px;
  object-fit: contain;
  object-position: left center;
}

.why-intro__copy {
  display: flex;
  align-items: flex-end;
  padding-bottom: 2px;
}

.why-intro__copy p {
  margin: 0;
  color: #3f444a;
  font-size: 14px;
  line-height: 2;
}

.why-features {
  padding: 8px 0 28px;
}

.why-features__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.35rem;
}

.why-feature {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.why-feature__head {
  display: flex;
  align-items: center;
  gap: 0.26rem;
}

.why-feature__icon-wrap {
  width: 14px;
  height: 14px;
  min-width: 14px;
  background: transparent;
  z-index: 2;
}

.why-feature__icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.62;
  filter: grayscale(1);
}

.why-feature__title {
  font-family: var(--font-display);
  font-size: 1.06rem;
  font-weight: 600;
  color: #22252a;
  line-height: 1.2;
  white-space: nowrap;
  background: #ececec;
  z-index: 2;
}

.why-feature__line {
  flex-grow: 1;
  height: 1px;
  background: #b5b5b5;
}

.why-feature__image-wrap {
  width: 100%;
  border-radius: 7px;
  overflow: hidden;
  aspect-ratio: 1.04 / 1;
}

.why-feature__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.why-feature__desc {
  margin: 0;
  color: #4a4f56;
  font-size: 11.8px;
  line-height: 1.56;
}

.why-feature__link {
  color: #0a5f49;
  text-decoration: none;
  font-weight: 600;
}

.why-feature__points {
  margin: -2px 0 0;
  padding: 0;
  list-style: none;
  color: #4a4f56;
  font-size: 11.7px;
  line-height: 1.54;
}

.why-feature__points li::before {
  content: "- ";
}

.why-cta {
  position: relative;
  overflow: hidden;
  min-height: 126px;
}

.why-cta__bg,
.why-cta__overlay {
  position: absolute;
  inset: 0;
}

.why-cta__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.why-cta__overlay {
  background:
    linear-gradient(90deg, rgba(8, 86, 82, 0.92) 0%, rgba(7, 100, 94, 0.88) 42%, rgba(8, 72, 104, 0.9) 100%),
    linear-gradient(180deg, rgba(7, 35, 52, 0.22) 0%, rgba(7, 35, 52, 0.3) 100%);
}

.why-cta__inner {
  position: relative;
  z-index: 1;
  min-height: 126px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
}

.why-cta__copy h2 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(1.2rem, 3vw, 2.9rem);
  line-height: 1;
  letter-spacing: -0.02em;
}

.why-cta__copy p {
  margin: 6px 0 0;
  color: #d6dbdf;
  font-size: 11px;
  line-height: 1.4;
  max-width: 670px;
}

.why-cta__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 22px;
  padding: 0.22rem 0.72rem;
  background: #ffffff;
  color: #111111;
  text-decoration: none;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0;
  transition:
    background-color 0.25s ease,
    transform 0.25s ease;
}

.why-cta__button:hover {
  background: #ebebeb;
  transform: translateY(-1px);
}

.why-projects {
  background: #ffffff;
  padding: 46px 0 18px;
}

.why-projects__top {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.6rem;
}

.why-projects__intro h2 {
  margin: 0;
  color: #111111;
  font-size: clamp(1.95rem, 4.6vw, 3rem);
  line-height: 1.06;
  letter-spacing: -0.03em;
}

.why-projects__intro p {
  margin: 12px 0 0;
  color: #5d6369;
  font-size: 14px;
  line-height: 1.7;
  max-width: 360px;
}

.why-projects__all {
  display: inline-flex;
  margin-top: 1.1rem;
  padding: 0.65rem 1.1rem;
  background: #040404;
  color: #ffffff;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
}

.why-projects__card-link {
  text-decoration: none;
}

.why-projects__lead-image {
  width: 100%;
  aspect-ratio: 1.58 / 1;
  object-fit: cover;
  border-radius: 8px;
}

.why-projects__lead h3,
.why-projects__card h3 {
  margin: 10px 0 0;
  color: #181c21;
  font-size: 1.18rem;
  line-height: 1.25;
}

.why-projects__lead p,
.why-projects__card p {
  margin: 7px 0 0;
  color: #5e646b;
  font-size: 14px;
  line-height: 1.65;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.why-projects__grid {
  margin-top: 1.2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.why-projects__card-image {
  width: 100%;
  aspect-ratio: 1.16 / 1;
  object-fit: cover;
  border-radius: 8px;
}

.why-faq {
  padding: 26px 0 72px;
  background: #f2f2f2;
}

.why-faq h2 {
  margin: 0;
  color: #101214;
  font-size: clamp(1.7rem, 3.2vw, 2.4rem);
  line-height: 1.2;
}

.why-faq > .container-custom > p {
  margin: 12px 0 0;
  color: #5c6066;
  font-size: 14px;
  line-height: 1.8;
}

.why-faq__contact-link {
  color: #1a1a1a;
  font-weight: 600;
}

.why-faq__list {
  margin-top: 18px;
  border-top: 1px solid #bdbfc3;
}

.why-faq__item {
  border-bottom: 1px solid #bdbfc3;
}

.why-faq__item summary {
  list-style: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 14px 0;
  color: #1d2024;
  font-size: 1.03rem;
  font-weight: 500;
}

.why-faq__item summary::-webkit-details-marker {
  display: none;
}

.why-faq__plus {
  font-size: 2rem;
  font-weight: 300;
  line-height: 1;
  color: #222;
}

.why-faq__item p {
  margin: 0;
  color: #555a60;
  font-size: 14px;
  line-height: 1.8;
  padding: 0 0 16px;
}

.why-faq__actions {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.why-faq__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0.52rem 0.95rem;
  background: #050505;
  color: #ffffff;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 700;
}

@media (min-width: 768px) {
  .why-features__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem 1.1rem;
  }

  .why-feature__title {
    font-size: 1.14rem;
  }

  .why-projects__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.15rem;
  }
}

@media (min-width: 1024px) {
  .why-intro {
    padding-top: 0;
  }

  .why-intro__grid {
    grid-template-columns: minmax(610px, 1fr) minmax(460px, 1fr);
    gap: 1.25rem;
    align-items: end;
  }

  .why-intro__copy {
    padding: 0 0.35rem 0.22rem 0.22rem;
  }

  .why-features {
    padding-top: 12px;
    padding-bottom: 20px;
  }

  .why-features__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.95rem 0.95rem;
  }

  .why-feature__title {
    font-size: 1.75rem;
  }

  .why-cta {
    min-height: 124px;
  }

  .why-cta__inner {
    min-height: 124px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
  }

  .why-projects {
    padding-top: 58px;
    padding-bottom: 30px;
  }

  .why-projects__top {
    grid-template-columns: minmax(280px, 340px) minmax(0, 1fr);
    align-items: end;
    gap: 2.2rem;
  }

  .why-faq {
    padding-top: 42px;
    padding-bottom: 92px;
  }

  .why-faq__item summary {
    font-size: 1.1rem;
    padding-top: 16px;
    padding-bottom: 16px;
  }
}
@media (max-width: 767px) {
  .why-page {
    overflow: hidden;
  }

  :deep(.why-video-section) {
    margin-top: -40px;
    padding-bottom: 34px;
  }

  :deep(.why-video-section .video-hero__shell) {
    width: calc(100% - 24px);
  }

  :deep(.why-video-section .video-hero__background),
  :deep(.why-video-section .video-hero__overlay) {
    min-height: 505px;
  }

  :deep(.why-video-section .video-hero__overlay) {
    padding-top: 56px;
    padding-bottom: 156px;
  }
}
</style>
