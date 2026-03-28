<template>
  <section class="bg-white py-16 md:py-24">
    <div class="mx-auto max-w-[1100px] px-5 sm:px-8">
      
      <!-- Tiêu đề Our Partners (giống mẫu gốc) -->
      <h2
        class="mb-12 text-center text-3xl font-bold text-gray-900 md:mb-16 md:text-4xl"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        Our Partners
      </h2>

      <!-- Lưới 10 logos: 5 cột trên Desktop, 2 hàng -->
      <div class="grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-12 lg:gap-y-14">
        <div
          v-for="(partner, idx) in displayPartners"
          :key="partner.id"
          class="flex items-center justify-center transition-transform duration-300 hover:scale-105"
          data-aos="zoom-in"
          :data-aos-delay="idx * 50"
        >
          <img
            v-if="partner.logo_url"
            :src="partner.logo_url"
            :alt="partner.name"
            class="h-10 w-auto object-contain sm:h-12 md:h-14 lg:h-16"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import publicApi from '@/services/publicApi'

const displayPartners = ref([])

const fetchPartners = async () => {
  try {
    const res = await publicApi.get('/api/v1/partners/')
    displayPartners.value = res.data.sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
  } catch (error) {
    console.error('Failed to load partners', error)
  }
}

onMounted(() => {
  fetchPartners()
})
</script>
