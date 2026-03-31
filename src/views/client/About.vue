<script setup>
import { ref, onMounted, computed } from 'vue';
import publicApi from '@/services/publicApi';
import { getProjectCardImage } from '@/utils/media';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PartnersSection from '@/components/client/home/PartnersSection.vue';
import FeaturedProjects from '@/components/client/home/FeaturedProjects.vue';

const pageData = ref(null);
const projects = ref([]);
const loading = ref(true);

// Helper to handle image URLs
const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${import.meta.env.VITE_API_URL}${url}`;
};

const fetchData = async () => {
  try {
    const [pageRes, projectsRes] = await Promise.all([
      publicApi.get('/api/v1/pages/slug/about'),
      publicApi.get('/api/v1/projects/', { params: { is_featured: true, limit: 4 } })
    ]);
    pageData.value = pageRes.data;
    // Format projects data exactly like Home.vue
    projects.value = projectsRes.data.map(p => ({
      slug: p.slug,
      title: p.title,
      cardImage: getProjectCardImage(p),
      installTime: p.installation_time
    }));
  } catch (err) {
    console.error('Error fetching about data:', err);
  } finally {
    loading.value = false;
    setTimeout(() => {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 120
      });
    }, 300);
  }
};

const sortedSections = computed(() => {
  if (!pageData.value?.sections) return [];
  return [...pageData.value.sections].sort((a, b) => a.display_order - b.display_order);
});

onMounted(fetchData);
</script>

<template>
  <div class="about-page-wrapper">
    <div class="about-page" v-if="!loading">
      <template v-for="section in sortedSections" :key="section.id">
        
        <!-- 1. INTRO / IMPACT WITH 24 YEARS GRAPHIC -->
        <section v-if="section.section_type === 'intro_impact'" class="about-impact py-80">
          <div class="container-custom about-impact__grid">
            <div class="about-impact__text-side" data-aos="fade-up">
              <h2 class="about-impact__title">{{ section.title }}</h2>
              <div class="about-impact__body" v-html="section.content"></div>
            </div>
            <div class="about-impact__visual-side" data-aos="fade-left">
              <img :src="getImageUrl(section.image_url)" alt="Impact Visual" class="about-impact__graphic" />
            </div>
          </div>
        </section>

        <!-- 2. FULL WIDTH PANORAMA -->
        <section v-if="section.section_type === 'full_width_image'" class="about-panorama">
          <div class="container-custom">
            <div class="about-panorama__wrapper" data-aos="zoom-out">
              <img :src="getImageUrl(section.image_url)" :alt="section.title" class="about-panorama__img" />
            </div>
          </div>
        </section>

        <!-- 3. MODULUX HOMES (BLUE LINE) -->
        <section v-if="section.section_type === 'intro_blue_line'" class="about-intro-blue py-80">
          <div class="container-custom about-intro-blue__grid">
            <div class="about-intro-blue__title-side" data-aos="fade-right">
              <h2 class="about-intro-blue__main-title" v-html="section.title"></h2>
            </div>
            <div class="about-intro-blue__content-side" data-aos="fade-left">
              <div class="about-intro-blue__accent-box">
                <h3 v-if="section.subtitle" class="about-intro-blue__subtitle">{{ section.subtitle }}</h3>
                <div class="about-intro-blue__para" v-html="section.content"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- 4. PARTNERS (Dynamic Placement) -->
        <section v-if="section.section_type === 'partners'" class="about-partners">
          <PartnersSection />
        </section>

        <!-- 5. ASYMMETRIC PROJECTS (Reusing Component from Home) -->
        <FeaturedProjects v-if="section.section_type === 'projects_asymmetric'" :projects="projects" />

      </template>
    </div>

    <div v-else class="about-loading container-custom py-120 text-center">
      <div class="spinner"></div>
      <p>Loading Modulux Excellence...</p>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  background-color: #fff;
  overflow-x: hidden;
  font-family: 'Inter', sans-serif;
}

.about-panorama__wrapper {
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
}
.about-panorama__img {
  width: 100%;
  height: auto;
  display: block;
}

/* 2. Intro Blue Line */
.about-intro-blue__grid {
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 40px;
  align-items: start;
}
.about-intro-blue__main-title {
  font-size: 64px;
  font-weight: 700;
  line-height: 1.1;
  color: #002233;
}
.about-intro-blue__accent-box {
  border-left: 4px solid #0055ff;
  padding-left: 40px;
}
.about-intro-blue__subtitle {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #000;
}
.about-intro-blue__para {
  font-size: 18px;
  line-height: 1.8;
  color: #444;
}

/* 3. Impact Section */
.about-impact__grid {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 60px;
  align-items: center;
}
.about-impact__title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 25px;
  line-height: 1.2;
}
.about-impact__body {
  font-size: 18px;
  color: #555;
  line-height: 1.8;
}
.about-impact__graphic {
  width: 100%;
  height: auto;
}

/* Global Utilities */
.py-80 { padding: 80px 0; }
.container-custom { max-width: 1400px; margin: 0 auto; padding: 0 40px; }

@media (max-width: 1024px) {
  .about-intro-blue__grid, .about-impact__grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 768px) {
  .about-intro-blue__main-title { font-size: 42px; }
  .about-impact__title { font-size: 32px; }
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0055ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>