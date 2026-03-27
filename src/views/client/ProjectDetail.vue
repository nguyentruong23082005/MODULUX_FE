<template>
  <div v-if="project" class="bg-white min-h-screen text-dark">
    <!-- ════════════════════════════════════════════
         HERO SECTION — Dark Teal with Stats
    ═════════════════════════════════════════════ -->
    <section class="relative min-h-[70vh] md:min-h-[80vh] flex items-center bg-[#0a3322] overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img :src="project.heroImage" :alt="project.title" class="h-full w-full object-cover opacity-80" />
        <div class="absolute inset-0 bg-gradient-to-b from-[#0a3322]/90 via-[#0a3322]/40 to-transparent"></div>
        <div class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div class="container-custom relative z-10 py-24 mt-20 pointer-events-none">
        <div class="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          <!-- Left: Title & Quick Nav -->
          <div class="text-white pointer-events-auto" data-aos="fade-right">
            <h1 class="text-4xl md:text-6xl font-display font-semibold leading-[1.1] mb-6 tracking-tight">{{ project.title }}</h1>
            <p class="text-[13px] md:text-sm text-white/70 mb-10 flex items-center gap-2 font-medium tracking-wide">
              <svg class="w-4 h-4 text-white/50" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
              Canada
            </p>
            
            <div class="flex flex-wrap gap-3 mt-12">
              <a v-if="project.floorPlanImage" href="#floorplan" class="hero-btn">Floor plan</a>
              <a v-if="project.gallery.length" href="#gallery" class="hero-btn">Image gallery</a>
              <a v-if="project.videoUrl" href="#video" class="hero-btn">Video</a>
            </div>
          </div>

          <!-- Right: Summary Specs -->
          <div class="text-white pointer-events-auto pt-4 md:pt-12" data-aos="fade-left">
            <div class="grid grid-cols-3 gap-6 mb-10">
              <div class="flex flex-col gap-2">
                <span class="text-[10px] uppercase text-white/60 font-bold tracking-[0.1em]">Bedroom</span>
                <div class="flex items-center gap-3">
                   <svg class="w-5 h-5 opacity-80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                   <span class="text-md md:text-lg font-medium">{{ project.bedrooms }} Rooms</span>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-[10px] uppercase text-white/60 font-bold tracking-[0.1em]">Bathroom</span>
                <div class="flex items-center gap-3">
                   <svg class="w-5 h-5 opacity-80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                   <span class="text-md md:text-lg font-medium">{{ project.bathrooms }} Rooms</span>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-[10px] uppercase text-white/60 font-bold tracking-[0.1em]">Area</span>
                <div class="flex items-center gap-3">
                   <svg class="w-5 h-5 opacity-80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                   <span class="text-md md:text-lg font-medium">{{ project.areaSqft }} Sqft</span>
                </div>
              </div>
            </div>
            <p class="text-[14px] leading-relaxed text-white/80 font-normal max-w-lg mt-8">
               {{ project.summary }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════
         FLOOR PLAN
    ═════════════════════════════════════════════ -->
    <section v-if="project.floorPlanImage" id="floorplan" class="py-16 md:py-24 bg-white" data-aos="fade-up">
       <div class="container-custom">
          <div class="max-w-4xl mx-auto border border-gray-100 p-6 md:p-12 bg-white shadow-sm cursor-zoom-in" @click="openGalleryAt(allImages.indexOf(project.floorPlanImage))">
            <img :src="project.floorPlanImage" class="w-full h-auto" />
          </div>
       </div>
    </section>

    <!-- ════════════════════════════════════════════
         SPECIFICATIONS GRID (Alternating)
    ═════════════════════════════════════════════ -->
    <section class="bg-[#f1f1f1]">
      <!-- Block 1: Technical specs -->
      <div id="overview" class="grid lg:grid-cols-[1fr_1.6fr] gap-0">
         <div class="p-10 lg:p-20 flex flex-col justify-center">
            <h2 class="text-3xl lg:text-5xl font-display font-semibold mb-12 text-dark leading-[1.1] tracking-tight">Project<br/>Specifications</h2>
            <div class="space-y-10">
                <div>
                  <p class="text-[11px] font-bold uppercase tracking-[0.1em] text-dark mb-4">General Information</p>
                  <ul class="text-[14px] text-gray-600 space-y-1 font-medium">
                    <li>425 sq ft</li>
                    <li>1 bedrooms ( Studio )</li>
                    <li>1 bathrooms</li>
                  </ul>
                </div>
                <div>
                  <ul class="text-[14px] text-gray-600 space-y-1 font-medium">
                    <li>Modular Installation</li>
                    <li>1 story</li>
                    <li>1 kitchen</li>
                  </ul>
                </div>
            </div>
         </div>
         <div class="min-h-[400px] lg:min-h-[600px] overflow-hidden cursor-pointer" @click="openGalleryAt(0)">
            <img :src="project.gallery[0] || project.heroImage" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
         </div>
      </div>

      <!-- Block 2: Features -->
      <div class="grid lg:grid-cols-[1.6fr_1fr] gap-0">
         <div class="min-h-[400px] lg:min-h-[600px] overflow-hidden order-2 lg:order-1 cursor-pointer" @click="openGalleryAt(1)">
            <img :src="project.gallery[1] || project.heroImage" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
         </div>
         <div class="p-10 lg:p-20 flex flex-col justify-center order-1 lg:order-2">
            <h3 class="text-3xl lg:text-4xl font-display font-semibold mb-10 text-dark tracking-tight">Features</h3>
            <ul class="space-y-4 text-[14px] font-medium text-gray-600">
              <li>Steel framework</li>
              <li>Solar + Battery Powered</li>
              <li>Smart home system</li>
              <br/>
              <li>Front Porch</li>
              <li>Insulated Walls</li>
              <li>1 entrance</li>
            </ul>
         </div>
      </div>

      <!-- Block 3: Finishing -->
      <div class="grid lg:grid-cols-[1fr_1.6fr] gap-0">
         <div class="p-10 lg:p-20 flex flex-col justify-center">
            <h3 class="text-2xl lg:text-3xl font-display font-semibold mb-10 text-dark tracking-tight">Finishing Options</h3>
            <div class="grid grid-cols-2 gap-8 text-[14px] font-medium text-gray-600">
              <ul class="space-y-1">
                <li>Roofs</li>
                <li>Doors</li>
                <li>Cladding</li>
                <li>Lighting</li>
              </ul>
              <ul class="space-y-1">
                <li>Ceiling</li>
                <li>Flooring/Decking</li>
                <li>Appliances</li>
                <li>Furnishings</li>
              </ul>
            </div>
            <div class="mt-12 flex flex-wrap gap-4">
              <router-link to="/contact" class="bg-black text-white px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-brand transition-all">Request a Quote</router-link>
              <button @click="openGalleryAt(2)" class="border-2 border-black px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">Open Gallery</button>
            </div>
         </div>
         <div class="min-h-[400px] lg:min-h-[600px] overflow-hidden cursor-pointer" @click="openGalleryAt(2)">
            <img :src="project.gallery[2] || project.heroImage" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
         </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════
         CTA & OTHER PROJECTS
    ═════════════════════════════════════════════ -->
    <section class="py-24 bg-white" data-aos="fade-up">
       <div class="container-custom">
          <!-- CTA Row -->
          <div class="flex flex-col md:flex-row items-center justify-between gap-12 pb-24 border-b border-gray-100">
            <div>
              <h2 class="text-4xl lg:text-6xl font-display font-semibold tracking-tight text-dark mb-4">Ready to talk about your own project?</h2>
              <p class="text-gray-400 font-medium text-sm">Get expert advice from one of our consultants to help you find your ideal home</p>
            </div>
            <router-link to="/contact" class="bg-black text-white px-10 py-5 text-[12px] font-bold uppercase tracking-widest hover:bg-brand transition-all whitespace-nowrap">
                CONTACT OUR TEAM
            </router-link>
          </div>

          <!-- Related Projects Header -->
          <div class="mt-24 mb-16 flex items-center justify-between">
            <h3 class="text-3xl lg:text-4xl font-display font-semibold tracking-tight">Other Projects</h3>
            <div class="flex gap-4">
               <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-dark hover:text-dark transition">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
               </button>
               <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-dark hover:text-dark transition">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
               </button>
            </div>
          </div>

          <!-- Related Projects Grid -->
          <div class="grid gap-8 md:grid-cols-3">
            <router-link v-for="item in relatedProjects" :key="item.slug" :to="`/projects/${item.slug}`" class="group">
              <div class="aspect-[16/11] overflow-hidden mb-6 bg-gray-50 border border-gray-100">
                <img :src="item.cardImage" :alt="item.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div>
                <h4 class="text-lg lg:text-xl font-display font-semibold mb-2 group-hover:text-brand transition">{{ item.title }}</h4>
                <div class="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  <span class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    {{ item.bedrooms }}
                  </span>
                  <span class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    {{ item.bathrooms }}
                  </span>
                </div>
                <p class="mt-4 text-[10px] uppercase font-bold text-gray-300 tracking-[0.2em]">Installation time: {{ item.installTime }}</p>
              </div>
            </router-link>
          </div>
       </div>
    </section>

    <!-- ════════════════════════════════════════════
         GALLERY / VIDEO SECTION ANCHORS
    ═════════════════════════════════════════════ -->
    <div id="gallery" class="scroll-mt-32"></div>
    <section v-if="project.videoUrl" id="video" class="py-24 bg-white scroll-mt-32" data-aos="fade-up">
       <div class="container-custom">
          <div class="max-w-5xl mx-auto aspect-video rounded-sm overflow-hidden bg-black shadow-2xl">
              <iframe :src="project.videoUrl" class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
       </div>
    </section>

    <!-- ════════════════════════════════════════════
         ADVANCED LIGHTBOX
    ═════════════════════════════════════════════ -->
    <transition name="fade">
      <div v-if="galleryActive" class="fixed inset-0 z-[100] flex flex-col bg-black/98" @click.self="closeGallery">
        <!-- Close button -->
        <button class="absolute top-6 right-6 text-white/50 hover:text-white transition p-2 z-20" @click="closeGallery">
          <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <!-- Main Carousel -->
        <div class="flex-1 relative flex items-center justify-center p-4">
          <button class="absolute left-6 text-white/40 hover:text-white p-4" @click="prevImage">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          
          <img :src="allImages[activeIndex]" class="max-h-[85vh] max-w-[90vw] object-contain animate-zoom-in shadow-2xl" @click.stop />

          <button class="absolute right-6 text-white/40 hover:text-white p-4" @click="nextImage">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

        <!-- Thumbnail Strip -->
        <div class="h-32 flex items-center justify-center bg-black/90 p-4 gap-3 border-t border-white/10 overflow-x-auto no-scrollbar">
           <div 
             v-for="(img, idx) in allImages" :key="idx" 
             class="h-16 md:h-20 aspect-video flex-shrink-0 cursor-pointer border-2 transition-all duration-300"
             :class="activeIndex === idx ? 'border-brand opacity-100 scale-105' : 'border-transparent opacity-40 hover:opacity-100'"
             @click="activeIndex = idx"
           >
              <img :src="img" class="w-full h-full object-cover" />
           </div>
        </div>
      </div>
    </transition>
  </div>

  <!-- Loading State -->
  <div v-else class="flex min-h-screen items-center justify-center">
    <div class="flex flex-col items-center">
      <div class="h-12 w-12 border-2 border-gray-100 border-t-brand animate-spin rounded-full"></div>
      <p class="mt-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Loading your project...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import publicApi from '@/services/publicApi'

const route = useRoute()
const project = ref(null)
const relatedProjects = ref([])

// Lightbox state
const galleryActive = ref(false)
const activeIndex = ref(0)

const allImages = computed(() => {
  if (!project.value) return []
  const list = []
  if (project.value.heroImage) list.push(project.value.heroImage)
  if (project.value.gallery) list.push(...project.value.gallery)
  if (project.value.floorPlanImage) list.push(project.value.floorPlanImage)
  return list
})

const fetchProject = async () => {
  try {
    const slug = route.params.id
    const res = await publicApi.get(`/api/v1/projects/slug/${slug}`)
    const p = res.data
    project.value = {
      ...p,
      heroImage: p.images?.find(img => img.is_hero)?.image_url || p.thumbnail_url || '/images/2K(10)',
      gallery: p.images?.filter(img => !img.is_hero && !img.is_floor_plan).map(img => img.image_url) || [],
      floorPlanImage: p.floor_plan_url || p.images?.find(img => img.is_floor_plan)?.image_url || null,
      areaSqft: p.area_sqft || 0,
      summary: p.description,
      videoUrl: p.video_url?.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/'),
      stories: p.stories || 1,
      kitchens: p.kitchens || 1,
      installTime: p.installation_time || 'Modular Installation'
    }
  } catch (err) { console.error(err) }
}

const fetchRelatedProjects = async () => {
  try {
    const res = await publicApi.get('/api/v1/projects/', { params: { limit: 4 } })
    relatedProjects.value = res.data.filter(p => p.slug !== route.params.id).slice(0, 3).map(p => ({
      ...p,
      cardImage: p.thumbnail_url || '/images/2K(10)',
      installTime: p.installation_time || 'Modular'
    }))
  } catch (err) { console.error(err) }
}

function openGalleryAt(index) {
  activeIndex.value = index;
  galleryActive.value = true;
}
function closeGallery() { galleryActive.value = false; }
function nextImage() { activeIndex.value = (activeIndex.value + 1) % allImages.value.length; }
function prevImage() { activeIndex.value = (activeIndex.value - 1 + allImages.value.length) % allImages.value.length; }

onMounted(() => {
  fetchProject()
  fetchRelatedProjects()
})

watch(() => route.params.id, () => {
  fetchProject()
  fetchRelatedProjects()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
@reference "@/style.css";

.hero-btn {
  @apply px-6 py-2.5 border border-white/40 text-white font-medium text-[12px] hover:bg-white/10 transition-all duration-300;
}

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to     { opacity: 0; }

@keyframes zoom-in {
  from { transform: scale(0.98); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.animate-zoom-in { animation: zoom-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }

h1, h2, h3, h4 {
  font-family: var(--font-display);
}
</style>