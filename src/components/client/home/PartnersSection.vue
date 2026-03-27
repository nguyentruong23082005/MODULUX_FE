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
            :src="partner.logo"
            :alt="partner.name"
            class="h-10 w-auto object-contain sm:h-12 md:h-14 lg:h-16"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  partners: {
    type: Array,
    required: false,
    default: () => []
  },
})

// Chép tay cứng danh sách đúng 10 ảnh giống file hệ thống User yêu cầu (Partners1 đến Partners10).
// Việc này đảm bảo tỷ lệ grid 5x2 (10 logo) chính xác 100% với giao diện gốc
// mà không phụ thuộc vào mock data thiếu đường dẫn ảnh ở ngoài.
const hardcodedPartners = [
  { id: 1, logo: '/images/home/Partners1.webp', name: 'rothoblaas' },
  { id: 2, logo: '/images/home/Partners2.webp', name: 'INNOVA HOMES' },
  { id: 3, logo: '/images/home/Partners3.webp', name: 'Life Design KABAYA' },
  { id: 4, logo: '/images/home/Partners4.webp', name: 'FPT' },
  { id: 5, logo: '/images/home/Partners5.webp', name: 'TranDuc' },
  { id: 6, logo: '/images/home/Partners6.webp', name: 'NOVALAND' },
  { id: 7, logo: '/images/home/Partners7.webp', name: 'ecopark' },
  { id: 8, logo: '/images/home/Partners8.webp', name: 'AN LAM' },
  { id: 9, logo: '/images/home/Partners9.webp', name: 'NovaWORLD' },
  { id: 10, logo: '/images/home/Partners10.webp', name: 'K-Town' }
]

const displayPartners = computed(() => hardcodedPartners)
</script>
