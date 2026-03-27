<template>
  <div class="home">
    <!-- 1. Hero Banner — full-screen, dữ liệu từ API CMS -->
    <HeroSection :banner="heroBanner" />

    <!-- 2. About Us — 2 cột bất đối xứng -->
    <AboutSection />

    <!-- 3. Feature Projects — cột trái tiêu đề, cột phải grid dự án -->
    <FeaturedProjects :projects="featuredProjects" />

    <!-- 4. Key Features — cột trái intro, cột phải 2×2 cards -->
    <KeyFeatures :features="keyFeatures" />

    <!-- 5. Partners — logo track -->
    <PartnersSection :partners="partnerList" />

    <!-- 6. Factory Video Tour — 2 cột text + media -->
    <FactoryVideo />

    <!-- 7. General Enquiry — CTA banner nền xanh -->
    <GeneralEnquiry />

    <!-- 8. News & Blog — grid 3 cột -->
    <NewsSection :posts="blogPosts" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import publicApi from '@/services/publicApi'

import HeroSection from '@/components/client/home/HeroSection.vue'
import AboutSection from '@/components/client/home/AboutSection.vue'
import FeaturedProjects from '@/components/client/home/FeaturedProjects.vue'
import KeyFeatures from '@/components/client/home/KeyFeatures.vue'
import PartnersSection from '@/components/client/home/PartnersSection.vue'
import FactoryVideo from '@/components/client/home/FactoryVideo.vue'
import GeneralEnquiry from '@/components/client/home/GeneralEnquiry.vue'
import NewsSection from '@/components/client/home/NewsSection.vue'

// ═══════════════════════════════════════════
// 1. Hero Banner — lấy từ API CMS
// ═══════════════════════════════════════════
const DEFAULT_HERO = {
  title: 'HIGH-PERFORMANCE\nMODULAR HOMES',
  description: 'We deliver premium modular homes with precision engineering, faster timelines, and scalable solutions for global markets.',
  image_url: 'https://imagedelivery.net/KHaby7r0MOA4Gt7v7Yk1jg/a52f1a20-b2bb-4d4d-a002-ea57f0b77500/2K',
  cta_text: 'Learn more',
  cta_link: '/about',
}

const heroBanner = ref({ ...DEFAULT_HERO })

const fetchHeroBanner = async () => {
  try {
    const res = await publicApi.get('/api/v1/banners/')
    if (res.data && res.data.length > 0) {
      const b = res.data[0]
      heroBanner.value = {
        title: b.title || DEFAULT_HERO.title,
        description: b.subtitle || DEFAULT_HERO.description,
        image_url: b.media_url || DEFAULT_HERO.image_url,
        cta_text: b.button_text || DEFAULT_HERO.cta_text,
        cta_link: b.button_link || DEFAULT_HERO.cta_link,
      }
    }
  } catch (err) {
    console.warn('Hero banner API error:', err)
  }
}

// ═══════════════════════════════════════════
// 3. Feature Projects — Lấy từ API
// ═══════════════════════════════════════════
const featuredProjects = ref([])

const fetchFeaturedProjects = async () => {
  try {
    const res = await publicApi.get('/api/v1/projects/', {
      params: { is_featured: true, limit: 4 }
    })
    if (res.data && res.data.length > 0) {
      featuredProjects.value = res.data.map(p => ({
        slug: p.slug,
        title: p.title,
        cardImage: p.thumbnail_url || '/images/project-placeholder.jpg',
        installTime: p.installation_time
      }))
    } else {
      featuredProjects.value = []
    }
  } catch (err) {
    console.warn('Projects API error:', err)
    featuredProjects.value = []
  }
}

// ═══════════════════════════════════════════
// 4. Key Features — Lấy từ API
// ═══════════════════════════════════════════
const keyFeatures = ref([])

const fetchKeyFeatures = async () => {
  try {
    const res = await publicApi.get('/api/v1/core-features/')
    if (res.data && res.data.length > 0) {
      keyFeatures.value = res.data.map(f => ({
        title: f.title,
        icon: f.icon_url || '/images/Technology.svg',
        desc: f.description,
        image: '/images/Hawaii-Garden-Studio-Overview-1-1.png' // Fallback image if not in DB
      }))
    } else {
      // Fallback data
      keyFeatures.value = [
        {
          title: 'Quick Installation',
          icon: '/images/Quick_Installation.svg',
          desc: 'Featuring two flexible installation methods tailored to each project scale.',
          image: '/images/Hawaii-Garden-Studio-Overview-1-1.png',
        }
      ]
    }
  } catch (err) {
    console.warn('Key features API error:', err)
  }
}

// ═══════════════════════════════════════════
// 5. Partners — Lấy từ API
// ═══════════════════════════════════════════
const partnerList = ref([])

const fetchPartners = async () => {
  try {
    const res = await publicApi.get('/api/v1/partners/')
    if (res.data && res.data.length > 0) {
      partnerList.value = res.data.map(p => ({
        name: p.name,
        logo: p.logo_url
      }))
    } else {
      partnerList.value = []
    }
  } catch (err) {
    console.warn('Partners API error:', err)
    partnerList.value = []
  }
}

// ═══════════════════════════════════════════
// 8. Blog posts — Lấy từ API
// ═══════════════════════════════════════════
const blogPosts = ref([])

const fetchBlogPosts = async () => {
  try {
    const res = await publicApi.get('/api/v1/posts/', { params: { limit: 3 } })
    if (res.data && res.data.length > 0) {
      blogPosts.value = res.data.map(post => ({
        slug: post.slug,
        title: post.title,
        summary: post.summary,
        thumbnail: post.thumbnail_url || '/images/blog-placeholder.jpg',
        date: post.published_at || post.created_at
      }))
    } else {
      blogPosts.value = []
    }
  } catch (err) {
    console.warn('Blogs API error:', err)
    blogPosts.value = []
  }
}

// ═══════════════════════════════════════════
// Lifecycle
// ═══════════════════════════════════════════
onMounted(() => {
  fetchHeroBanner()
  fetchFeaturedProjects()
  fetchKeyFeatures()
  fetchPartners()
  fetchBlogPosts()
})

</script>

<style scoped>
.home {
  background: #fff;
}
</style>
