<template>
  <div class="faq-page">
    <section class="faq-hero">
      <div class="faq-hero__bg">
        <img src="/images/home/nen.avif" alt="Frequently Asked Questions" />
      </div>
      <div class="faq-hero__overlay"></div>

      <div class="container-custom faq-hero__inner">
        <h1 data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">Frequently Asked Questions</h1>
        <p data-aos="fade-up" data-aos-offset="20" data-aos-delay="80">
          Let us answer your questions about the modular home building process, permits, design
          customisation and everything in between.
        </p>
      </div>
    </section>

    <FactoryVideo location="faq" section-class="faq-video-section" />

    <section class="faq-content">
      <div class="container-custom">
        <div class="faq-content__intro">
          <h2 data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">Frequently Asked Questions About Projects</h2>
          <p data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
            Do you have any questions about modular home building that are not covered here?
            <router-link to="/contact?type=project">Get in touch</router-link>
            with our friendly team - we are happy to help.
          </p>
          <div class="faq-content__rule" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50"></div>
        </div>

        <article v-for="(group, groupIndex) in visibleGroups" :key="group.title" class="faq-group">
          <h3 data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">{{ group.title }}</h3>
          <div class="faq-group__rule" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50"></div>

          <div
            v-for="(item, faqIndex) in group.faqs"
            :key="`${group.title}-${item.question}`"
            class="faq-item"
            data-aos="fade-up"
            data-aos-offset="20"
            data-aos-delay="50"
          >
            <button type="button" class="faq-item__button" @click="toggleFaq(groupIndex, faqIndex)">
              <span>{{ item.question }}</span>
              <span class="faq-item__icon">{{ isOpen(groupIndex, faqIndex) ? '-' : '+' }}</span>
            </button>

            <div class="faq-item__answer" :style="{ maxHeight: isOpen(groupIndex, faqIndex) ? '420px' : '0px' }">
              <div class="faq-item__answer-inner">
                <p v-for="line in item.answer" :key="line">{{ line }}</p>
              </div>
            </div>
          </div>
        </article>

        <div v-if="canLoadMore" class="faq-load-more" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
          <button type="button" @click="loadMore">Load More</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import FactoryVideo from '@/components/client/home/FactoryVideo.vue'

const activeFaq = ref({ groupIndex: null, faqIndex: null })
const visibleGroupCount = ref(1)

const groupedFaqs = ref([
  {
    title: '1. Product & Design',
    faqs: [
      {
        question: 'Do you provide architectural drawings for permitting?',
        answer: [
          'Yes. We provide full drawing packages including perspectives, floor plans, elevations, sections, and material specifications.',
        ],
      },
      {
        question: 'Can your homes be stacked (multi-story)?',
        answer: [
          'Yes. Our structural systems can support multi-story solutions depending on project type and local code requirements.',
        ],
      },
      {
        question: 'Do your homes include HVAC, solar panels, or smart systems?',
        answer: ['HVAC, solar, and smart systems are optional add-ons and can be integrated upon request.'],
      },
      {
        question: 'What construction methods do you use?',
        answer: ['We support both preassembled block-unit models and flat-pack panelized models.'],
      },
      {
        question: 'Can I customize the layout of the home?',
        answer: ['Yes. We provide flexible customization to match project requirements and client preferences.'],
      },
    ],
  },
  {
    title: '2. Engineering & Technical Specs',
    faqs: [
      {
        question: 'What structural systems do you use?',
        answer: [
          'We offer LGS frame systems, timber systems, and hybrid solutions depending on the design and performance target.',
        ],
      },
      {
        question: 'What fire rating do you provide?',
        answer: ['Standard configuration supports a 1-hour fire rating.'],
      },
      {
        question: 'Do your homes meet energy efficiency standards?',
        answer: [
          'Yes. We can align with different energy standards depending on market and project requirements.',
        ],
      },
      {
        question: 'Can your homes handle seismic or hurricane zones?',
        answer: ['Yes. Engineering is adapted to wind, seismic, and site conditions based on local code.'],
      },
      {
        question: 'Do you offer BIM/Revit models or CAD files?',
        answer: ['Yes. We can provide Revit, AutoCAD, and 3D reference files when required.'],
      },
    ],
  },
  {
    title: '3. Logistics & Construction',
    faqs: [
      {
        question: 'What port do you ship from?',
        answer: ['Primary export port is Cat Lai, Ho Chi Minh City, Vietnam.'],
      },
      {
        question: 'Can units be craned directly onto foundations?',
        answer: ['Yes. Volumetric modules are designed for lift-and-place installation.'],
      },
      {
        question: 'How long does it take to assemble onsite?',
        answer: [
          'Flat-pack homes: usually 7-14 days depending on size and crew.',
          'Block units: usually 3-6 days for placement and connection.',
        ],
      },
      {
        question: 'Do you supply items for assembly?',
        answer: ['Yes. We provide hardware sets and assembly instructions for site teams.'],
      },
    ],
  },
  {
    title: '4. Production & Delivery',
    faqs: [
      {
        question: 'What is the production and delivery timeline?',
        answer: ['Lead time depends on design and volume. Typical benchmark is around 45 days for 50 units.'],
      },
      {
        question: 'Does Modulux offer on-site installation?',
        answer: ['We provide installation drawings and remote support, with optional site supervision if needed.'],
      },
      {
        question: 'Do you have stock or warehouses overseas?',
        answer: ['Current model is FOB Vietnam. Overseas warehouse setup is possible via strategic partnerships.'],
      },
    ],
  },
  {
    title: '5. Legal, Certification & Code Issues',
    faqs: [
      {
        question: 'Do your homes qualify for a Certificate of Occupancy?',
        answer: ['Yes, when project compliance and local inspection requirements are fully met.'],
      },
      {
        question: 'Can your homes be classified as permanent housing?',
        answer: ['Yes. Our modular homes are designed as permanent dwellings with proper foundations and utilities.'],
      },
      {
        question: 'Do you support HUD-code or mobile home standards?',
        answer: ['No. We focus on modular housing built to local building code standards.'],
      },
      {
        question: 'Have your homes passed state-level modular certification?',
        answer: ['We work with recognized certification partners based on target market requirements.'],
      },
    ],
  },
  {
    title: '6. Pricing & Payment',
    faqs: [
      {
        question: 'How is pricing calculated?',
        answer: ['Pricing is based on FOB Vietnam and varies by unit size, specs, finishing level, and quantity.'],
      },
      {
        question: 'What are the payment terms?',
        answer: ['Typical terms are 50% deposit on contract signing and 50% before shipment.'],
      },
    ],
  },
  {
    title: '7. Warranty & After-Sales Support',
    faqs: [
      {
        question: 'Do you offer any warranty?',
        answer: ['Structural warranty is typically up to 10 years, with finishing warranty depending on components.'],
      },
      {
        question: 'Is there training for local teams?',
        answer: ['Yes. We provide remote training and optional on-site supervision with English documentation.'],
      },
    ],
  },
])

const visibleGroups = computed(() => groupedFaqs.value.slice(0, visibleGroupCount.value))
const canLoadMore = computed(() => visibleGroupCount.value < groupedFaqs.value.length)

const isOpen = (groupIndex, faqIndex) =>
  activeFaq.value.groupIndex === groupIndex && activeFaq.value.faqIndex === faqIndex

const toggleFaq = (groupIndex, faqIndex) => {
  if (isOpen(groupIndex, faqIndex)) {
    activeFaq.value = { groupIndex: null, faqIndex: null }
    return
  }
  activeFaq.value = { groupIndex, faqIndex }
}

const loadMore = () => {
  visibleGroupCount.value = Math.min(visibleGroupCount.value + 2, groupedFaqs.value.length)
}

onMounted(() => {
  if (window?.AOS?.refresh) {
    window.AOS.refresh()
  }
})
</script>

<style scoped>
.faq-page {
  background: #f3f3f3;
  min-height: 100vh;
}

.faq-hero {
  position: relative;
  overflow: hidden;
  min-height: 430px;
  padding-top: 44px;
  padding-bottom: 152px;
  background: linear-gradient(122deg, #073640 0%, #0a6c72 58%, #075a62 100%);
}

.faq-hero__bg,
.faq-hero__overlay {
  position: absolute;
  inset: 0;
}

.faq-hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  filter: saturate(0.65) contrast(0.95) brightness(0.68);
}

.faq-hero__overlay {
  background: linear-gradient(90deg, rgba(2, 44, 51, 0.84) 0%, rgba(4, 78, 86, 0.62) 48%, rgba(4, 86, 95, 0.34) 100%);
}

.faq-hero__inner {
  position: relative;
  z-index: 1;
  color: #ffffff;
}

.faq-hero__inner h1 {
  margin: 0;
  max-width: 760px;
  font-size: clamp(2.05rem, 3.6vw, 3.25rem);
  line-height: 1.05;
  font-weight: 700;
}

.faq-hero__inner p {
  margin: 1.85rem 0 0;
  max-width: 680px;
  color: rgba(229, 236, 240, 0.94);
  font-size: clamp(1rem, 1.34vw, 1.14rem);
  line-height: 1.62;
}

:deep(.faq-video-section) {
  position: relative;
  z-index: 3;
  margin-top: -72px;
  padding: 0 0 50px;
  background: transparent;
}

:deep(.faq-video-section .video-hero__shell) {
  width: min(calc(100% - 48px), 1128px);
  margin: 0 auto;
}

:deep(.faq-video-section .video-hero__media) {
  overflow: hidden;
  box-shadow: 0 20px 44px rgba(9, 17, 25, 0.22);
}

:deep(.faq-video-section .video-hero__background),
:deep(.faq-video-section .video-hero__overlay) {
  min-height: clamp(500px, 56vw, 660px);
}

:deep(.faq-video-section .video-hero__overlay) {
  padding: 92px clamp(24px, 4vw, 64px) 172px;
}

:deep(.faq-video-section .video-hero__title) {
  font-size: clamp(2.2rem, 3.8vw, 3.55rem);
  max-width: 620px;
}

:deep(.faq-video-section .video-hero__thumb-strip) {
  bottom: 16px;
  width: min(72vw, 840px);
}

.faq-content {
  padding: 0.2rem 0 3.1rem;
}

.faq-content__intro h2 {
  margin: 0;
  color: #111111;
  font-size: clamp(2rem, 2.8vw, 3rem);
  line-height: 1.1;
  font-weight: 700;
}

.faq-content__intro p {
  margin: 0.75rem 0 0.5rem;
  color: #343a40;
  font-size: 1.06rem;
  line-height: 1.68;
}

.faq-content__intro p a {
  color: #111111;
  text-decoration: underline;
  font-weight: 700;
}

.faq-content__rule {
  width: 100%;
  height: 1px;
  background: #1f2328;
  margin-top: 1rem;
}

.faq-group {
  margin-top: 1.1rem;
}

.faq-group h3 {
  margin: 0;
  color: #0f1114;
  font-size: clamp(1.52rem, 2.1vw, 2rem);
  line-height: 1.2;
  font-weight: 700;
  padding: 0.45rem 0;
}

.faq-group__rule {
  width: 100%;
  height: 1px;
  background: #1f2328;
}

.faq-item {
  border-bottom: 1px solid #1f2328;
}

.faq-item__button {
  width: 100%;
  border: none;
  background: transparent;
  color: #101214;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  text-align: left;
  padding: 0.82rem 0;
  font-size: clamp(1.03rem, 1.45vw, 1.24rem);
  font-weight: 500;
}

.faq-item__icon {
  color: #121212;
  font-size: 2.2rem;
  line-height: 1;
  font-weight: 400;
  flex-shrink: 0;
}

.faq-item__answer {
  overflow: hidden;
  transition: max-height 0.45s ease;
}

.faq-item__answer-inner {
  padding-bottom: 0.9rem;
}

.faq-item__answer p {
  margin: 0.3rem 0 0;
  color: #5d6670;
  font-size: 1rem;
  line-height: 1.72;
}

.faq-load-more {
  margin-top: 1.2rem;
  display: flex;
  justify-content: center;
}

.faq-load-more button {
  border: 1px solid #0a0a0a;
  background: #0a0a0a;
  color: #ffffff;
  padding: 0.5rem 1.15rem;
  font-size: 0.95rem;
  font-weight: 600;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.faq-load-more button:hover {
  background: transparent;
  color: #0a0a0a;
}

@media (max-width: 767px) {
  .faq-page {
    overflow: hidden;
  }

  .faq-hero {
    min-height: 378px;
    padding-top: 26px;
    padding-bottom: 108px;
  }

  .faq-hero__inner h1 {
    font-size: 2rem;
  }

  .faq-hero__inner p {
    margin-top: 1.1rem;
    font-size: 0.97rem;
  }

  :deep(.faq-video-section) {
    margin-top: -40px;
    padding-bottom: 34px;
  }

  :deep(.faq-video-section .video-hero__shell) {
    width: calc(100% - 24px);
  }

  :deep(.faq-video-section .video-hero__background),
  :deep(.faq-video-section .video-hero__overlay) {
    min-height: 505px;
  }

  :deep(.faq-video-section .video-hero__overlay) {
    padding-top: 56px;
    padding-bottom: 156px;
  }

  .faq-content {
    padding-top: 0.5rem;
    padding-bottom: 2.7rem;
  }

  .faq-item__button {
    padding: 0.74rem 0;
  }

  .faq-item__icon {
    font-size: 1.65rem;
  }
}
</style>
