<template>
  <div class="our-tech-page">
    <section class="tech-hero">
      <div class="tech-hero__bg">
        <img src="/images/home/nen.avif" alt="Our Technology" loading="lazy" />
      </div>
      <div class="tech-hero__overlay"></div>

      <div class="container-custom tech-hero__inner">
        <div class="tech-hero__copy" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
          <h1>Our Technology</h1>
          <p>
            Modulux Homes employs the most advanced construction technologies to guarantee superior
            quality and performance for every project.
          </p>
        </div>
      </div>
    </section>

    <VideoHero
      heading="A Tour of Modulux Homes' Cutting-Edge Factory"
      heading-tag="h2"
      play-label="Autoplay"
      play-sub-label="Video"
      section-class="our-tech-video"
    />

    <section class="tech-section">
      <div class="container-custom tech-structure">
        <article class="tech-structure__copy" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
          <h2>Structure Solution</h2>
          <p>
            Steel Frame: Manufactured from high-strength galvanized steel using fully automated
            systems, offering dimensions from 89mm to 250mm for diverse project requirements.
          </p>
          <p>
            Wood Frame: Utilizing internationally standardized wood treatment technology to meet
            architectural and performance requirements.
          </p>
          <p>
            Steel & Wood Frame: The floor can be combined with a steel frame and the walls with a
            wooden frame for flexible design customization.
          </p>
        </article>

        <article class="tech-structure__card" data-aos="fade-up" data-aos-offset="20" data-aos-delay="100">
          <img src="/images/home/Key%20Features/why-modulux/kf1.png" alt="Steel Frame" loading="lazy" />
          <p>Steel Frame</p>
        </article>

        <article class="tech-structure__card" data-aos="fade-up" data-aos-offset="20" data-aos-delay="150">
          <img src="/images/home/Key%20Features/why-modulux/kh1.png" alt="Wood Frame" loading="lazy" />
          <p>Wood Frame</p>
        </article>
      </div>
    </section>

    <section class="tech-section">
      <div class="container-custom tech-flow">
        <h2 data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">What is Modular Construction?</h2>

        <div class="tech-flow__track">
          <div class="tech-flow__item" data-aos="fade-right" data-aos-offset="20" data-aos-delay="50">
            <img src="/images/our-tech-flow-1.jpg" alt="Factory prefabrication" loading="lazy" />
          </div>

          <div class="tech-flow__arrow" aria-hidden="true">
            <span class="tech-flow__arrow--desktop">&#8594;</span>
            <span class="tech-flow__arrow--mobile">&#8595;</span>
          </div>

          <div class="tech-flow__item" data-aos="fade-right" data-aos-offset="20" data-aos-delay="200">
            <img src="/images/our-tech-flow-2.jpg" alt="Module transport" loading="lazy" />
          </div>

          <div class="tech-flow__arrow" aria-hidden="true">
            <span class="tech-flow__arrow--desktop">&#8594;</span>
            <span class="tech-flow__arrow--mobile">&#8595;</span>
          </div>

          <div class="tech-flow__item" data-aos="fade-right" data-aos-offset="20" data-aos-delay="350">
            <img src="/images/our-tech-flow-3.jpg" alt="On-site installation" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <section class="tech-section">
      <div class="container-custom tech-installation">
        <article class="tech-installation__copy" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
          <h3>Panelized Installation</h3>
          <p>
            Panels are manufactured at our factory and transported to site. The structural frame is
            erected on foundation first, then each panel is installed to form a complete house.
          </p>
        </article>

        <article class="tech-installation__media" data-aos="fade-up" data-aos-offset="20" data-aos-delay="90">
          <img
            src="/images/home/Key%20Features/key-feature-technology.png"
            alt="Panelized installation"
            loading="lazy"
          />
        </article>

        <article class="tech-installation__media" data-aos="fade-up" data-aos-offset="20" data-aos-delay="120">
          <img
            src="/images/home/Key%20Features/why-modulux/2K%20(2).avif"
            alt="Panelized installation process"
            loading="lazy"
          />
        </article>

        <article class="tech-installation__media" data-aos="fade-up" data-aos-offset="20" data-aos-delay="150">
          <img src="/images/home/Key%20Features/why-modulux/2K.avif" alt="Block installation" loading="lazy" />
        </article>

        <article class="tech-installation__media" data-aos="fade-up" data-aos-offset="20" data-aos-delay="180">
          <img
            src="/images/home/Key%20Features/why-modulux/2K%20(1).avif"
            alt="Block installation process"
            loading="lazy"
          />
        </article>

        <article class="tech-installation__copy" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
          <h3>Block Installation</h3>
          <p>
            Complete modules are pre-assembled in factory and delivered to site, where modules are
            connected on prepared foundations to complete the house quickly.
          </p>
        </article>
      </div>
    </section>

    <section class="tech-lgs">
      <div class="container-custom">
        <div class="tech-lgs__intro-grid">
          <article class="tech-lgs__intro" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
            <h2>LGS Modular Buildings</h2>
            <h3>Applications of LGS Modular Buildings</h3>
            <p>
              Residential: single-family homes, townhouses, duplexes, triplexes, condominiums, and
              accessory dwelling units.
            </p>
            <p>
              Commercial: offices, retail, service buildings, supermarkets, shopping centers,
              hotels, restaurants, schools, and hospitals.
            </p>
          </article>

          <div class="tech-lgs__hero" data-aos="fade-up" data-aos-offset="20" data-aos-delay="90">
            <img src="/images/our-tech-lgs.jpg" alt="LGS modular building application" loading="lazy" />
          </div>
        </div>

        <div class="tech-lgs__benefits">
          <article
            v-for="(benefit, idx) in lgsBenefits"
            :key="benefit.title"
            class="tech-lgs__benefit"
            data-aos="fade-up"
            data-aos-offset="20"
            :data-aos-delay="50 + idx * 40"
          >
            <h4>{{ benefit.title }}</h4>
            <p v-for="point in benefit.points" :key="point">- {{ point }}</p>
          </article>
        </div>

        <div class="tech-lgs__materials" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
          <h3>Using materials from reputable and renowned global brands</h3>
          <p>
            With a team of experienced architects and engineers, Modulux provides modular building
            solutions aligned with ASTM standards and high sustainability goals.
          </p>
        </div>

        <div class="tech-marquee" aria-label="Global material brands">
          <div class="tech-marquee__track">
            <img
              v-for="(logo, idx) in repeatedLogos"
              :key="`${logo}-${idx}`"
              :src="logo"
              :alt="`Partner logo ${idx + 1}`"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="tech-articles">
      <div class="container-custom tech-articles__inner">
        <h2 data-aos="fade-up" data-aos-offset="20" data-aos-delay="100">Articles related to LGS modular building</h2>

        <div class="tech-articles__grid">
          <article
            v-for="(post, idx) in relatedPosts"
            :key="post.slug"
            class="tech-articles__card"
            data-aos="fade-up"
            data-aos-offset="20"
            :data-aos-delay="140 + idx * 40"
          >
            <router-link :to="`/blogs/${post.slug}`" class="tech-articles__image-link">
              <img :src="post.image" :alt="post.title" loading="lazy" />
            </router-link>
            <p class="tech-articles__type">{{ post.type }}</p>
            <h3>{{ post.title }}</h3>
            <router-link :to="`/blogs/${post.slug}`" class="tech-articles__more">Read more</router-link>
          </article>
        </div>
      </div>
    </section>

    <section class="tech-contact">
      <div class="container-custom tech-contact__inner">
        <div>
          <h2 data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">Contact our team for more information</h2>
          <p data-aos="fade-up" data-aos-offset="20" data-aos-delay="80">
            If you have any questions, do not hesitate to reach out to our team of experts.
          </p>
        </div>
        <div data-aos="fade-up" data-aos-offset="20" data-aos-delay="100">
          <router-link to="/contact?type=project" class="tech-contact__button">CONTACT OUR TEAM</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { getBlogs } from '@/services/blogApi'
import VideoHero from '@/components/client/VideoHero.vue'

const partnerLogos = [
  '/images/home/Partners1.webp',
  '/images/home/Partners2.webp',
  '/images/home/Partners3.webp',
  '/images/home/Partners4.webp',
  '/images/home/Partners5.webp',
  '/images/home/Partners6.webp',
  '/images/home/Partners7.webp',
  '/images/home/Partners8.webp',
  '/images/home/Partners9.webp',
  '/images/home/Partners10.webp',
]

const repeatedLogos = computed(() => [...partnerLogos, ...partnerLogos])

const lgsBenefits = [
  {
    title: 'Shortening construction time',
    points: [
      'Construction is up to 50% faster than traditional methods.',
      'Project completion can be achieved within 30 to 45 days.',
    ],
  },
  {
    title: 'Sustainable quality',
    points: [
      'LGS structures are highly resistant to earthquakes, strong winds, and snowstorms.',
      'Material systems reduce termite and mold risks and improve long-term durability.',
    ],
  },
  {
    title: 'Reducing investment costs',
    points: [
      'Labor cost can be reduced significantly with synchronized modular assembly.',
      'Overall cost saving through minimized waste and controlled production.',
    ],
  },
  {
    title: 'Sustainable construction',
    points: [
      'Construction waste and on-site disruption are minimized.',
      'Energy-efficient systems help reduce annual heating and cooling costs.',
    ],
  },
]

const relatedPosts = ref([
  {
    slug: 'modulux-homes-the-comprehensive-solution-for-developers-and-general-contractors-to-accelerate-progress-optimize-costs-and-control-quality',
    title: 'Modular delivery for developers and contractors',
    type: 'PROJECTS',
    image: '/images/home/blog/new1.webp',
  },
  {
    slug: 'powering-modulux-homes-modern-prefabricated-home-solution',
    title: 'Powering modern prefabricated home solutions',
    type: 'BUILDING',
    image: '/images/home/blog/new1.webp',
  },
])

const fetchRelatedBlogs = async () => {
  try {
    const data = await getBlogs({ page: 1, page_size: 8 })
    const items = (data.items || [])
      .filter((item) => item.slug && item.title)
      .slice(0, 2)
      .map((item) => ({
        slug: item.slug,
        title: item.title,
        type: item.type || 'PROJECTS',
        image: item.image_url || '/images/home/blog/new1.webp',
      }))

    if (items.length >= 2) {
      relatedPosts.value = items
    }
  } catch (error) {
    console.warn('Unable to fetch related blogs for Our Technology:', error)
  }
}

onMounted(fetchRelatedBlogs)
</script>

<style scoped>
.our-tech-page {
  background: #ffffff;
  padding-top: 80px;
}

.tech-hero {
  position: relative;
  overflow: hidden;
  min-height: 300px;
}

.tech-hero__bg,
.tech-hero__overlay {
  position: absolute;
  inset: 0;
}

.tech-hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tech-hero__overlay {
  background: linear-gradient(90deg, rgba(10, 17, 28, 0.82) 0%, rgba(10, 17, 28, 0.58) 55%, rgba(10, 17, 28, 0.3) 100%);
}

.tech-hero__inner {
  position: relative;
  z-index: 1;
  min-height: 300px;
  display: flex;
  align-items: center;
}

.tech-hero__copy {
  max-width: 780px;
  color: #ffffff;
}

.tech-hero__copy h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.7rem);
  line-height: 1.02;
}

.tech-hero__copy p {
  margin: 14px 0 0;
  max-width: 680px;
  font-size: 1rem;
  line-height: 1.75;
  color: #e5e9ef;
}

:deep(.our-tech-video) {
  background: #ffffff;
  padding-bottom: 8px;
}

.tech-section {
  padding: 26px 0;
}

.tech-structure {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.tech-structure__copy {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.tech-structure__copy h2 {
  margin: 0;
  font-size: clamp(1.8rem, 3.7vw, 2.9rem);
  line-height: 1.1;
}

.tech-structure__copy p {
  margin: 0;
  color: #4b5057;
  font-size: 0.95rem;
  line-height: 1.74;
}

.tech-structure__card {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.tech-structure__card img {
  width: 100%;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
  border-radius: 8px;
}

.tech-structure__card p {
  margin: 0;
  color: #2b2e33;
  font-size: 0.9rem;
}

.tech-flow h2 {
  margin: 0;
  color: #111111;
  font-size: clamp(1.85rem, 3.5vw, 2.8rem);
}

.tech-flow__track {
  margin-top: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.tech-flow__item img {
  width: 100%;
  height: 100%;
  min-height: 170px;
  max-height: 320px;
  object-fit: contain;
}

.tech-flow__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3d4046;
  font-size: 1.7rem;
}

.tech-flow__arrow--desktop {
  display: none;
}

.tech-flow__arrow--mobile {
  display: inline;
}

.tech-installation {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;
}

.tech-installation__copy {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.2rem;
}

.tech-installation__copy h3 {
  margin: 0;
  font-size: clamp(1.55rem, 2.8vw, 2.45rem);
  line-height: 1.1;
}

.tech-installation__copy p {
  margin: 0;
  color: #4f545a;
  font-size: 0.95rem;
  line-height: 1.72;
}

.tech-installation__media img {
  width: 100%;
  min-height: 220px;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.tech-lgs {
  background: #f4f5f6;
  padding: 36px 0;
}

.tech-lgs__intro-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.tech-lgs__intro h2 {
  margin: 0;
  font-size: clamp(1.8rem, 3.5vw, 3rem);
  line-height: 1.05;
}

.tech-lgs__intro h3 {
  margin: 12px 0 0;
  font-size: 1.2rem;
  line-height: 1.3;
}

.tech-lgs__intro p {
  margin: 9px 0 0;
  color: #4a4f55;
  font-size: 0.95rem;
  line-height: 1.74;
}

.tech-lgs__hero img {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.tech-lgs__benefits {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.6rem;
}

.tech-lgs__benefit {
  background: #ffffff;
  border: 1px solid #e4e6e8;
  padding: 1rem;
}

.tech-lgs__benefit h4 {
  margin: 0;
  font-size: 1rem;
}

.tech-lgs__benefit p {
  margin: 0.45rem 0 0;
  color: #515860;
  font-size: 0.9rem;
  line-height: 1.65;
}

.tech-lgs__materials {
  margin-top: 1.1rem;
}

.tech-lgs__materials h3 {
  margin: 0;
  font-size: clamp(1.3rem, 2.2vw, 2rem);
  line-height: 1.2;
}

.tech-lgs__materials p {
  margin: 10px 0 0;
  color: #50555b;
  font-size: 0.95rem;
  line-height: 1.72;
}

.tech-marquee {
  margin-top: 1.1rem;
  overflow: hidden;
  border-top: 1px solid #dde0e3;
  border-bottom: 1px solid #dde0e3;
  background: #ffffff;
}

.tech-marquee__track {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: max-content;
  padding: 12px 0;
  animation: techMarquee 32s linear infinite;
}

.tech-marquee__track img {
  width: 125px;
  height: 50px;
  object-fit: contain;
  filter: grayscale(0.1);
}

.tech-articles {
  background: #ffffff;
  padding: 42px 0 24px;
}

.tech-articles__inner h2 {
  margin: 0;
  font-size: clamp(1.6rem, 2.7vw, 2.3rem);
}

.tech-articles__grid {
  margin-top: 0.95rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.9rem;
}

.tech-articles__card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tech-articles__image-link img {
  width: 100%;
  min-height: 220px;
  border-radius: 8px;
  object-fit: cover;
}

.tech-articles__type {
  margin: 0;
  color: #767e86;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.tech-articles__card h3 {
  margin: 0;
  color: #20242a;
  font-size: 1.05rem;
  line-height: 1.4;
}

.tech-articles__more {
  width: fit-content;
  color: #1e2125;
  text-decoration: none;
  border-bottom: 1px solid #1e2125;
  font-size: 0.9rem;
}

.tech-contact {
  background: #ffffff;
  padding: 12px 0 38px;
}

.tech-contact__inner {
  border-top: 1px solid #e4e6e8;
  padding-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.tech-contact__inner h2 {
  margin: 0;
  font-size: clamp(1.45rem, 2.2vw, 2rem);
}

.tech-contact__inner p {
  margin: 8px 0 0;
  color: #555c63;
  font-size: 0.95rem;
  line-height: 1.65;
}

.tech-contact__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0.58rem 1rem;
  background: #050505;
  color: #ffffff;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 700;
}

@media (min-width: 768px) {
  .tech-structure {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tech-structure__copy {
    grid-column: span 2;
  }

  .tech-flow__track {
    flex-direction: row;
    align-items: center;
    gap: 0.6rem;
  }

  .tech-flow__item {
    flex: 1;
  }

  .tech-flow__arrow {
    width: 36px;
    flex: 0 0 36px;
  }

  .tech-flow__arrow--desktop {
    display: inline;
  }

  .tech-flow__arrow--mobile {
    display: none;
  }

  .tech-installation {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tech-lgs__benefits {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tech-articles__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tech-contact__inner {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1.2rem;
  }
}

@media (min-width: 1024px) {
  .tech-hero,
  .tech-hero__inner {
    min-height: 360px;
  }

  .tech-section {
    padding: 34px 0;
  }

  .tech-structure {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.1rem;
  }

  .tech-structure__copy {
    grid-column: span 1;
  }

  .tech-flow__track {
    gap: 0.95rem;
  }

  .tech-flow__item img {
    min-height: 300px;
  }

  .tech-installation {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .tech-lgs__intro-grid {
    grid-template-columns: minmax(320px, 1fr) minmax(0, 2fr);
    gap: 1.2rem;
  }

  .tech-lgs__benefits {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.8rem;
  }

  .tech-marquee__track img {
    width: 138px;
    height: 56px;
  }
}

@keyframes techMarquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>

