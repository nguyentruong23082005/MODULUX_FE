<template>
  <div class="process-page">
    <section class="process-hero">
      <div class="process-hero__bg">
        <img src="/images/home/nen.avif" alt="" loading="lazy" />
      </div>

      <div class="process-shell process-hero__inner">
        <div class="process-hero__copy">
          <h1 data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">Our process</h1>
          <p data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
            Modulux Homes offers excellent customer service and innovative home designs, built
            smarter and delivered efficiently. Use this outline below to understand our modular home
            building process.
          </p>
        </div>

        <figure
          class="process-hero__media"
          data-aos="fade-up"
          data-aos-offset="20"
          data-aos-delay="50"
        >
          <img src="/images/home/our-process/bangrang.webp" alt="Our process" loading="lazy" />
        </figure>
      </div>
    </section>

    <section class="process-main">
      <div class="process-shell process-grid">
        <template v-for="step in processSteps" :key="step.number">
          <article
            v-if="step.imageSide === 'left'"
            :class="['process-grid__image', 'process-grid__image--left']"
            data-aos="fade-up"
            data-aos-offset="20"
            data-aos-delay="50"
          >
            <img :src="step.image" :alt="step.title" loading="lazy" />
          </article>

          <article
            class="process-grid__text"
            data-aos="fade-up"
            data-aos-offset="20"
            data-aos-delay="50"
          >
            <div class="process-step">
              <h2>{{ step.number }}. {{ step.title }}</h2>
              <p>{{ step.description }}</p>

              <p v-if="step.secondaryDescription">
                {{ step.secondaryDescription }}
                <template v-for="(phone, index) in step.phoneLinks" :key="phone.href">
                  <template v-if="index > 0"> / </template>
                  <a :href="phone.href">{{ phone.label }}</a>
                </template>
              </p>

              <div class="process-step__arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
          </article>

          <article
            v-if="step.imageSide === 'right'"
            :class="['process-grid__image', 'process-grid__image--right']"
            data-aos="fade-up"
            data-aos-offset="20"
            data-aos-delay="50"
          >
            <img :src="step.image" :alt="step.title" loading="lazy" />
          </article>
        </template>
      </div>
    </section>

    <section class="process-cta">
      <div class="process-shell process-cta__inner">
        <div class="process-cta__copy">
          <h2 data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
            Contact our team for more information
          </h2>
          <p data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
            If you have any questions, don't hesitate to reach out to our team of experts.
          </p>
        </div>

        <div
          class="process-cta__action"
          data-aos="fade-up"
          data-aos-offset="20"
          data-aos-delay="50"
        >
          <router-link to="/contact?type=project" class="process-cta__button">
            CONTACT OUR TEAM
          </router-link>
        </div>
      </div>
    </section>

    <section class="process-faq">
      <div class="process-shell">
        <div class="process-faq__intro">
          <h2 data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
            Frequently Asked Questions About Projects
          </h2>
          <p data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
            Do you have any questions about modular home building that aren't covered here?
            <router-link to="/contact?type=project">Get in touch</router-link>
            with our friendly team - we're happy to help.
          </p>
          <div
            class="process-faq__rule"
            data-aos="fade-up"
            data-aos-offset="20"
            data-aos-delay="50"
          ></div>
        </div>

        <div class="process-faq__group">
          <h3 data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">1. Product &amp; Design</h3>
          <div
            class="process-faq__rule"
            data-aos="fade-up"
            data-aos-offset="20"
            data-aos-delay="50"
          ></div>

          <article
            v-for="(item, idx) in faqItems"
            :key="item.question"
            class="process-faq__item"
            data-aos="fade-up"
            data-aos-offset="20"
            data-aos-delay="50"
          >
            <button type="button" class="process-faq__question" @click="toggleFaq(idx)">
              <span>{{ item.question }}</span>
              <span class="process-faq__toggle" aria-hidden="true">
                <svg
                  v-if="activeFaq === idx"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15M19.5 12h-15" />
                </svg>
              </span>
            </button>

            <div class="process-faq__answer" :style="{ maxHeight: activeFaq === idx ? '40rem' : '0px' }">
              <div class="process-faq__answer-inner">
                <p v-for="line in item.answer" :key="line">{{ line }}</p>
              </div>
            </div>
          </article>
        </div>

        <div class="process-faq__action" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
          <router-link to="/faqs" class="process-faq__button">All FAQs</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const activeFaq = ref(null)

const processSteps = [
  {
    number: 1,
    title: 'Consultation & Advice',
    image: '/images/home/our-process/Consultation.avif',
    imageSide: 'left',
    description:
      'Our dedicated team is always ready to provide consultation and assist you in selecting the most suitable solution to meet your specific needs and desires.',
    secondaryDescription: 'To get started, reach out to us via our contact page, arrange a visit or call us on ',
    phoneLinks: [
      { label: '(+84) 988 897 997', href: 'tel:+84988897997' },
      { label: '(+84) 934 826 309', href: 'tel:+84934826309' },
    ],
  },
  {
    number: 2,
    title: 'Bespoke Design Options',
    image: '/images/home/our-process/Bespoke.avif',
    imageSide: 'right',
    description:
      'You can choose from our existing models or create a unique design tailored to your personal preferences, which we will then bring to life in production. (Optional: Furnishing)',
  },
  {
    number: 3,
    title: 'Manufacturing',
    image: '/images/home/our-process/Manufacturing.png',
    imageSide: 'left',
    description:
      'Our factory production process adheres to stringent standards, ensuring both quality and timely completion. For our pre-designed models, construction and A-Z handover take as little as 7 days.',
  },
  {
    number: 4,
    title: 'Delivery',
    image: '/images/home/our-process/Delivery.png',
    imageSide: 'right',
    description:
      'The house is transported to the construction site in modules and then expertly assembled by our skilled technicians.',
  },
  {
    number: 5,
    title: 'Installation & handover',
    image: '/images/home/our-process/Installation.png',
    imageSide: 'left',
    description:
      'You will inspect and experience the completed project, ensuring every detail meets your satisfaction.',
  },
]

const faqItems = [
  {
    question: 'Do you provide architectural drawings for permitting?',
    answer: [
      'Yes. We provide full drawing packages including 3D perspectives, floor plans, elevations, sections and material specs - sealed by licensed engineers if required.',
      'This service is currently available for projects in Hawaii, Texas, and California.',
    ],
  },
  {
    question: 'Can your homes be stacked (multi-story)?',
    answer: [
      'Yes. Our structural systems allow up to 3 stories depending on the module type and code requirements.',
      'Engineering must be verified for each project. Other types of buildings may also be possible depending on the design.',
    ],
  },
  {
    question: 'Do your homes include HVAC, solar panels, or smart systems?',
    answer: ['HVAC, smart systems and solar are optional add-ons, can be integrated upon request.'],
  },
  {
    question: 'What construction methods do you use?',
    answer: [
      'We offer two main construction types:',
      'Block units (preassembled, plug-and-play)',
      'Flat-pack panelized',
    ],
  },
  {
    question: 'Can I customize the layout of the home?',
    answer: ['Yes. We offer flexible layout customization to suit client preferences and project requirements.'],
  },
]

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

onMounted(() => {
  if (window?.AOS?.refresh) {
    window.AOS.refresh()
  }
})
</script>

<style scoped>
.process-page {
  background: #ffffff;
}

.process-shell {
  max-width: 1536px;
  margin: 0 auto;
  padding: 0 1rem;
}

.process-hero {
  position: relative;
  overflow: hidden;
}

.process-hero__bg {
  position: absolute;
  inset: 0 0 auto;
  height: 24rem;
  z-index: 0;
}

.process-hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.process-hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.process-hero__copy {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.process-hero__copy h1 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(2rem, 4vw, 2.25rem);
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.process-hero__copy p {
  margin: 0;
  max-width: 46rem;
  color: #d1d5db;
  font-size: 1rem;
  line-height: 1.625rem;
}

.process-hero__media {
  display: none;
  margin: 0;
}

.process-hero__media img {
  width: 100%;
  height: 13rem;
  object-fit: contain;
}

.process-main {
  padding: 0.5rem 0 0;
}

.process-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.process-grid__image,
.process-grid__text {
  min-width: 0;
}

.process-grid__image img {
  width: 100%;
  height: 18rem;
  border-radius: 0.5rem;
  object-fit: cover;
}

.process-grid__text {
  display: flex;
  align-items: center;
}

.process-step {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.process-step h2 {
  margin: 0;
  color: #222222;
  font-size: clamp(2rem, 3vw, 2.25rem);
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.process-step p {
  margin: 0;
  color: #222222;
  font-size: 1rem;
  line-height: 1.5rem;
}

.process-step a {
  color: #000000;
  font-weight: 700;
  text-decoration: none;
}

.process-step a:hover {
  text-decoration: underline;
}

.process-step__arrow {
  display: flex;
  justify-content: center;
  margin-top: 0.25rem;
  color: #222222;
}

.process-step__arrow svg {
  width: 2rem;
  height: 2rem;
}

.process-cta {
  padding: 4.5rem 0 2.5rem;
}

.process-cta__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: center;
}

.process-cta__copy h2 {
  margin: 0;
  color: #000000;
  font-size: clamp(2.4rem, 4vw, 3rem);
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.035em;
}

.process-cta__copy p {
  margin: 1rem 0 0;
  color: #737373;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.process-cta__action {
  display: flex;
  justify-content: flex-start;
}

.process-cta__button,
.process-faq__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  padding: 0.5rem 1rem;
  background: #000000;
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  letter-spacing: 0;
}

.process-cta__button:hover,
.process-faq__button:hover {
  background: #1f1f1f;
}

.process-faq {
  padding: 0 0 4rem;
}

.process-faq__intro h2 {
  margin: 0;
  color: #000000;
  font-size: clamp(2rem, 2.6vw, 1.875rem);
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.process-faq__intro p {
  margin: 1rem 0;
  color: #222222;
  font-size: 1rem;
  line-height: 1.5rem;
}

.process-faq__intro p a {
  color: #000000;
  font-weight: 600;
  text-decoration: underline;
}

.process-faq__rule {
  width: 100%;
  height: 1px;
  background: #000000;
}

.process-faq__group {
  margin-top: 1rem;
}

.process-faq__group h3 {
  margin: 0;
  padding: 0.75rem 0;
  color: #000000;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.process-faq__item {
  border-bottom: 1px solid #000000;
}

.process-faq__question {
  width: 100%;
  padding: 1rem 0;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
  text-align: left;
  color: #000000;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
}

.process-faq__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  flex-shrink: 0;
}

.process-faq__toggle svg {
  width: 100%;
  height: 100%;
}

.process-faq__answer {
  overflow: hidden;
  transition: max-height 0.35s ease;
}

.process-faq__answer-inner {
  padding: 0 0 1rem;
}

.process-faq__answer p {
  margin: 0.35rem 0 0;
  color: #404040;
  font-size: 0.98rem;
  line-height: 1.5rem;
}

.process-faq__action {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

@media (min-width: 768px) {
  .process-hero__inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    min-height: 18rem;
  }

  .process-hero__copy {
    min-height: 13rem;
    justify-content: space-between;
    padding-right: 1rem;
  }

  .process-hero__copy p {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }

  .process-hero__media {
    display: block;
  }

  .process-hero__media img {
    height: 13rem;
  }

  .process-main {
    padding-top: 1.5rem;
  }

  .process-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .process-grid__image--left {
    padding-right: 3.5rem;
  }

  .process-grid__image--right {
    padding-left: 3.5rem;
  }

  .process-grid__image img {
    height: 27rem;
  }

  .process-step p {
    max-width: 46.25rem;
  }

  .process-cta__inner {
    grid-template-columns: minmax(0, 3fr) minmax(0, 1fr);
  }

  .process-cta__action {
    justify-content: flex-end;
    align-items: center;
  }

  .process-faq__intro h2 {
    font-size: 1.875rem;
    line-height: 2.25rem;
  }
}

@media (min-width: 1024px) {
  .process-cta {
    padding-top: 6rem;
  }

  .process-faq {
    padding-bottom: 5rem;
  }
}
</style>
