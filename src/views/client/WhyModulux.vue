<template>
  <div class="bg-white pt-20">
    <section class="relative overflow-hidden">
      <img src="/images/Greenscape-768x576.png" alt="Why Modulux" class="h-[36vh] w-full object-cover md:h-[45vh]" />
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="absolute inset-0 mx-auto flex max-w-[1320px] items-end px-4 pb-8 text-white md:px-6 lg:px-8">
        <h1 class="text-3xl font-semibold md:text-5xl">Why Modulux</h1>
      </div>
    </section>

    <section class="mx-auto max-w-[1320px] px-4 py-12 md:px-6 lg:px-8">
      <p class="max-w-4xl text-gray-700" data-aos="fade-up">
        As one of the most modern and internationally standardized factories in Southeast Asia, our entire production process is 100% vertically integrated in Vietnam. Modulux Homes optimizes construction timelines, reduces uncertainty, and delivers sustainable, comfortable, and modern structures.
      </p>

      <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <article v-for="(item, idx) in values" :key="item.title" class="border border-gray-200 p-4" data-aos="fade-up" :data-aos-delay="idx * 70">
          <img :src="item.icon" :alt="item.title" class="mb-4 h-9 w-9" />
          <h3 class="mb-2 text-lg font-semibold">{{ item.title }}</h3>
          <p class="text-sm text-gray-600">{{ item.desc }}</p>
        </article>
      </div>

      <div class="mt-10 rounded border border-[#0a4834] bg-[#f3faf7] p-5" data-aos="fade-up">
        <h3 class="text-xl font-semibold text-[#0a4834]">Contact our team for more information</h3>
        <p class="mt-2 text-gray-700">If you have any questions, don't hesitate to reach out to our team of experts.</p>
        <router-link to="/contact?type=project" class="mt-4 inline-block bg-[#0a4834] px-5 py-2.5 text-sm font-semibold text-white">Get in touch</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
const values = [
  {
    title: 'Quick Installation',
    icon: '/images/Quick_Installation.svg',
    desc: 'Pre-designed models can be assembled in just 3-7 working days.',
  },
  {
    title: 'Advanced Technology',
    icon: '/images/Technology.svg',
    desc: 'Modern manufacturing and QA systems guarantee quality and consistency.',
  },
  {
    title: 'Cost Efficiency',
    icon: '/images/Cost-efficient.svg',
    desc: 'Mass production and waste optimization reduce overall project cost.',
  },
  {
    title: 'Trusted Quality',
    icon: '/images/Quality.svg',
    desc: 'Strict inspections and robust standards for every delivered structure.',
  },
]
</script>


