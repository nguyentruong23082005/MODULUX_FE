<template>
  <div class="bg-white pt-20">
    <section class="mx-auto max-w-[1320px] px-4 py-12 md:px-6 lg:px-8">
      <h1 class="text-3xl font-semibold md:text-5xl" data-aos="fade-up">Our Process</h1>
      <p class="mt-3 max-w-4xl text-gray-600" data-aos="fade-up" data-aos-delay="70">
        Modulux Homes offers excellent customer service and innovative home designs, built smarter and delivered efficiently.
      </p>

      <div class="mt-10 grid gap-5 md:grid-cols-2">
        <article v-for="(step, idx) in steps" :key="step.title" class="border border-gray-200 p-5" data-aos="fade-up" :data-aos-delay="idx * 70">
          <p class="text-xs font-semibold uppercase tracking-[0.12em] text-[#0a4834]">Step {{ idx + 1 }}</p>
          <h2 class="mt-2 text-xl font-semibold">{{ step.title }}</h2>
          <p class="mt-2 text-sm text-gray-600">{{ step.desc }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
const steps = [
  {
    title: 'Consultation & Advice',
    desc: 'Our team assists you in selecting the most suitable modular solution for your goals and market.',
  },
  {
    title: 'Bespoke Design Options',
    desc: 'Choose from existing models or create a tailored design with optional furnishing packages.',
  },
  {
    title: 'Manufacturing',
    desc: 'Factory production follows strict standards for quality, consistency, and schedule reliability.',
  },
  {
    title: 'Delivery',
    desc: 'Modules or panels are shipped to site with coordinated logistics and installation planning.',
  },
  {
    title: 'Installation & Handover',
    desc: 'On-site assembly, inspection, and final handover ensure every detail meets requirements.',
  },
]
</script>

