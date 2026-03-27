<template>
  <div class="bg-white pt-20">
    <section class="mx-auto max-w-[1320px] px-4 py-12 md:px-6 lg:px-8">
      <h1 class="text-3xl font-semibold md:text-5xl" data-aos="fade-up">News and Insights</h1>
      <p class="mt-3 max-w-3xl text-gray-600" data-aos="fade-up" data-aos-delay="70">
        Stories and updates around modular architecture, sustainability, and industry showcases.
      </p>

      <div class="mt-8 space-y-8">
        <article
          v-for="(post, idx) in posts"
          :key="post.slug"
          class="grid gap-4 border border-gray-200 p-3 md:grid-cols-[320px,1fr] md:p-4"
          data-aos="fade-up"
          :data-aos-delay="idx * 60"
        >
          <img :src="post.image" :alt="post.title" class="h-52 w-full object-cover md:h-full" />
          <div>
            <p class="text-xs uppercase tracking-[0.12em] text-gray-500">{{ post.category }}</p>
            <h2 class="mt-2 text-xl font-semibold md:text-2xl">{{ post.title }}</h2>
            <p class="mt-3 text-sm text-gray-600">{{ post.excerpt }}</p>
            <router-link :to="`/blogs/${post.slug}`" class="mt-4 inline-block text-sm font-semibold text-[#0a4834]">Read more</router-link>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import publicApi from '@/services/publicApi'

const posts = ref([])

const fetchPosts = async () => {
  try {
    const res = await publicApi.get('/api/v1/posts/')
    posts.value = res.data.map(post => ({
      ...post,
      image: post.thumbnail_url || '/images/blog-placeholder.jpg',
      category: post.category?.name || 'General'
    }))
  } catch (err) {
    console.error('API Error:', err)
  }
}

onMounted(fetchPosts)
</script>
