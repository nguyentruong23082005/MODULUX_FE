<template>
  <div class="bg-white pt-20">
    <section class="mx-auto max-w-[980px] px-4 py-12 md:px-6 lg:px-8">
      <router-link to="/blogs" class="text-sm font-semibold text-gray-500 hover:text-black">? Back to Insights</router-link>

      <article v-if="post" class="mt-6">
        <p class="text-xs uppercase tracking-[0.13em] text-[#0a4834]">{{ post.category }}</p>
        <h1 class="mt-2 text-3xl font-semibold leading-tight md:text-5xl">{{ post.title }}</h1>
        <img :src="post.image" :alt="post.title" class="mt-6 h-[300px] w-full object-cover md:h-[420px]" />
        <div class="mt-6 text-lg leading-8 text-gray-700" v-html="post.content || post.excerpt"></div>
      </article>

      <p v-else class="mt-8 text-gray-500">Post not found.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import publicApi from '@/services/publicApi'

const route = useRoute()
const post = ref(null)

const fetchPost = async () => {
  try {
    const slug = route.params.id
    const res = await publicApi.get(`/api/v1/posts/slug/${slug}`)
    const p = res.data
    post.value = {
      title: p.title,
      image: p.thumbnail_url || '/images/blog-placeholder.jpg',
      category: p.category?.name || 'News',
      excerpt: p.summary,
      content: p.content
    }
  } catch (err) {
    console.error('API Error:', err)
  }
}

onMounted(fetchPost)
</script>

