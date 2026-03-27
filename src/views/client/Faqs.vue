<template>
  <div class="bg-white pt-20">
    <section class="mx-auto max-w-[1320px] px-4 py-12 md:px-6 lg:px-8">
      <h1 class="text-3xl font-semibold md:text-5xl" data-aos="fade-up">Frequently Asked Questions</h1>
      <p class="mt-3 max-w-3xl text-gray-600" data-aos="fade-up" data-aos-delay="70">
        Let us answer your questions about modular home building process, permits, design customization and everything in between.
      </p>

      <div class="mt-8 space-y-3">
        <details v-for="(item, idx) in faqs" :key="item.q" class="border border-gray-200 p-4" data-aos="fade-up" :data-aos-delay="idx * 50">
          <summary class="cursor-pointer list-none font-semibold">{{ item.q }}</summary>
          <p class="mt-2 text-sm text-gray-600">{{ item.a }}</p>
        </details>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import publicApi from '@/services/publicApi'

const faqs = ref([])

const fetchFaqs = async () => {
  try {
    const res = await publicApi.get('/api/v1/faqs/')
    faqs.value = res.data.filter(f => f.is_active).map(f => ({
      q: f.question,
      a: f.answer
    }))
  } catch (err) {
    console.error('API Error:', err)
  }
}

onMounted(fetchFaqs)
</script>
