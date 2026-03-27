<template>
  <div class="bg-white pt-20">
    <section class="mx-auto max-w-[1320px] px-4 py-12 md:px-6 lg:px-8">
      <h1 class="text-3xl font-semibold md:text-5xl" data-aos="fade-up">Technical Specification</h1>
      <p class="mt-3 max-w-4xl text-gray-600" data-aos="fade-up" data-aos-delay="70">
        Standard inclusions and construction specifications for Modulux Homes prefabricated systems.
      </p>

      <div class="mt-8 space-y-4">
        <article v-for="(section, idx) in sections" :key="section.title" class="border border-gray-200 p-4" data-aos="fade-up" :data-aos-delay="idx * 60">
          <h2 class="text-lg font-semibold">{{ section.title }}</h2>
          <p class="mt-2 text-sm text-gray-600">{{ section.content }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
const sections = [
  {
    title: 'Structural Frame',
    content:
      'Wall, Ceiling, Roof and Floor use light-gauge steel frame with galvanized coating. Floor includes hot dip galvanized I-beam steel frame for block solutions.',
  },
  {
    title: 'Roof Finishing',
    content:
      'Metal roofing, asphalt shingle roofing, and TPO/EPDM options depending on design and roof type.',
  },
  {
    title: 'Wall and Ceiling Finishing',
    content:
      'Exterior and interior systems use high-grade wood and gypsum with optional decorative finishes.',
  },
  {
    title: 'Insulation and MEP',
    content:
      'Continuous insulation and cavity insulation with embedded pipes, concealed wiring, and standard terminal devices.',
  },
]
</script>

