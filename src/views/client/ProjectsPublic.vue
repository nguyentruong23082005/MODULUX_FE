<template>
  <div class="bg-[#f7f7f7] pt-20">
    <section class="relative overflow-hidden">
      <img src="/images/z7064049794304_84f12356d5ae045c35679809cbab3cab.jpg" alt="Projects" class="h-[38vh] w-full object-cover md:h-[46vh]" />
      <div class="absolute inset-0 bg-black/35"></div>
      <div class="absolute inset-0 mx-auto flex max-w-[1320px] items-end px-4 pb-8 md:px-6 lg:px-8">
        <div>
          <h1 class="text-3xl font-semibold text-white md:text-5xl">Projects</h1>
          <p class="mt-2 text-sm text-white/85 md:text-base">Discover our modular homes, event showcases, and deployable living systems.</p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-[1320px] px-4 py-10 md:px-6 lg:px-8">
      <div class="rounded-md border border-gray-200 bg-white p-4" data-aos="fade-up">
        <div class="grid gap-4 md:grid-cols-4">
          <div>
            <label class="filter-label">Bedrooms</label>
            <select v-model="filters.bedrooms" class="filter-input">
              <option value="">All</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div>
            <label class="filter-label">Bathrooms</label>
            <select v-model="filters.bathrooms" class="filter-input">
              <option value="">All</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div>
            <label class="filter-label">Min Area (sqft)</label>
            <input v-model.number="filters.minArea" type="number" class="filter-input" min="0" placeholder="e.g. 300" />
          </div>
          <div>
            <label class="filter-label">Max Area (sqft)</label>
            <input v-model.number="filters.maxArea" type="number" class="filter-input" min="0" placeholder="e.g. 900" />
          </div>
        </div>
      </div>

      <div class="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(project, idx) in filteredProjects"
          :key="project.slug"
          class="overflow-hidden border border-gray-200 bg-white"
          data-aos="fade-up"
          :data-aos-delay="idx * 60"
        >
          <img :src="project.cardImage" :alt="project.title" class="h-56 w-full object-cover" />
          <div class="p-4">
            <h2 class="text-lg font-semibold">{{ project.title }}</h2>
            <p class="mt-1 text-sm text-gray-500">{{ project.location }}</p>
            <div class="mt-3 flex flex-wrap gap-2 text-xs">
              <span class="spec-pill">{{ project.bedrooms }} Bed</span>
              <span class="spec-pill">{{ project.bathrooms }} Bath</span>
              <span class="spec-pill">{{ project.areaSqft }} sqft</span>
              <span class="spec-pill">{{ project.installTime }}</span>
            </div>
            <p class="mt-3 line-clamp-3 text-sm text-gray-600">{{ project.summary }}</p>
            <router-link :to="`/projects/${project.slug}`" class="mt-4 inline-block text-sm font-semibold text-[#0a4834]">Open project</router-link>
          </div>
        </article>
      </div>

      <p v-if="filteredProjects.length === 0" class="mt-10 text-center text-sm text-gray-500">No project matches the current filters.</p>
    </section>
  </div>
</template>

<script setup>
import { computed, reactive, ref, onMounted } from 'vue'
import publicApi from '@/services/publicApi'

const projects = ref([])

const fetchProjects = async () => {
  try {
    const res = await publicApi.get('/api/v1/projects/')
    projects.value = res.data.map(p => ({
      slug: p.slug,
      title: p.title,
      location: p.location || 'Global Delivery',
      bedrooms: p.bedrooms || 1,
      bathrooms: p.bathrooms || 1,
      areaSqft: p.area_sqft || 500,
      installTime: p.installation_time || '4-6 weeks',
      summary: p.summary,
      cardImage: p.thumbnail_url || '/images/project-placeholder.jpg'
    }))
  } catch (err) {
    console.error('API Error:', err)
  }
}

onMounted(fetchProjects)

const filters = reactive({
  bedrooms: '',
  bathrooms: '',
  minArea: null,
  maxArea: null,
})

const filteredProjects = computed(() => {
  return projects.value.filter((project) => {
    if (filters.bedrooms && project.bedrooms !== Number(filters.bedrooms)) return false
    if (filters.bathrooms && project.bathrooms !== Number(filters.bathrooms)) return false
    if (filters.minArea && project.areaSqft < filters.minArea) return false
    if (filters.maxArea && project.areaSqft > filters.maxArea) return false
    return true
  })
})
</script>

<style scoped>
.filter-label {
  margin-bottom: 0.4rem;
  display: block;
  font-size: 0.77rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #666;
}

.filter-input {
  width: 100%;
  border: 1px solid #dfdfdf;
  padding: 0.58rem 0.65rem;
  font-size: 0.9rem;
  background: white;
}

.spec-pill {
  border: 1px solid #ddd;
  padding: 0.2rem 0.48rem;
  color: #555;
}
</style>

