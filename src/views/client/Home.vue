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
import { ref, onMounted } from 'vue'
import publicApi from '@/services/publicApi'
import { getProjectCardImage } from '@/utils/media'
import { getBlogs } from '@/services/blogApi'

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
const heroBanner = ref({
  eyebrow: 'HIGH-PERFORMANCE MODULAR HOMES FOR',
  title: 'ARCHITECTS, DEVELOPERS, PARTNERS AND INVESTORS.',
  image_url: '/images/home/banner/banner1.webp',
  cta_text: 'Learn more',
  cta_link: '/about',
})

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
        cardImage: getProjectCardImage(p),
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
        icon: f.icon_url || undefined,
        desc: f.description || '',
      }))
    } else {
      keyFeatures.value = []
    }
  } catch (err) {
    console.warn('Key features API error:', err)
    keyFeatures.value = []
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

const fallbackBlogPosts = [
  {
    slug: 'modular-industrialization-supply-chain-transparency',
    title: 'Modular Industrialization & Supply Chain Transparency: A New Step Forward for Vietnam',
    excerpt: '',
    image: '/images/1757315843731-covermdl.jpeg',
    category: 'PROJECTS',
    date: '',
  },
  {
    slug: 'application-of-light-gauge-steel-for-multi-story-houses',
    title: 'Application of light gauge steel for multi-story houses.',
    excerpt: '',
    image: '/images/1757389588623-1212.jpg',
    category: 'BUILDING',
    date: '',
  },
  {
    slug: 'light-gauge-steel-guide-modern-construction-solutions',
    title: 'Light Gauge Steel: The Ultimate Guide to Modern Construction Solutions',
    excerpt: '',
    image: '/images/home/our-technology/LGSModular.webp',
    category: 'BUILDING',
    date: '',
  },
  {
    slug: 'tranduc-at-sydney-build-expo-2025',
    title: 'TranDuc at Sydney Build Expo 2025: Vietnamese Pioneer Showcases Green Building Solutions',
    excerpt: '',
    image: '/images/home/blog/new1.webp',
    category: 'FEATURED',
    date: '',
  },
  {
    slug: 'powering-modulux-homes-modern-prefabricated-home-solution',
    title: 'Powering Modulux Homes Modern Prefabricated Home Solution',
    excerpt: '',
    image: '/images/home/Key Features/why-modulux/2K.avif',
    category: 'DESIGN INSPIRATION',
    date: '',
  },
  {
    slug: 'modulux-homes-comprehensive-solution-for-developers-and-general-contractors',
    title: 'Modulux Homes The Comprehensive Solution for Developers and General Contractors to Accelerate Progress, Optimize Costs, and Control Quality',
    excerpt: '',
    image: '/images/home/our-technology/Block1.png',
    category: 'PROJECTS',
    date: '',
  },
]

const fetchBlogPosts = async () => {
  try {
    const data = await getBlogs({ page: 1, page_size: 6 })
    if (data.items && data.items.length > 0) {
      blogPosts.value = data.items.map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        image: post.image_url || '/images/blog-placeholder.jpg',
        category: post.type || 'PROJECTS',
        date: post.updated_at || post.created_at,
      }))
    } else {
      blogPosts.value = [...fallbackBlogPosts]
    }
  } catch (err) {
    console.warn('Blogs API error:', err)
    blogPosts.value = [...fallbackBlogPosts]
  }
}

// ═══════════════════════════════════════════
// Lifecycle
// ═══════════════════════════════════════════
onMounted(() => {
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
