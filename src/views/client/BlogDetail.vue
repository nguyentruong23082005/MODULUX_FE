<template>
  <div class="blog-detail-page">
    <div v-if="loading" class="blog-detail-page__state blog-detail-page__state--loading">
      <div class="blog-detail-shell">
        <div class="blog-detail-skeleton__hero"></div>
        <div class="blog-detail-skeleton__layout">
          <div class="blog-detail-skeleton__article"></div>
          <div class="blog-detail-skeleton__sidebar"></div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="blog-detail-page__state">
      <div class="blog-detail-shell">
        <div class="blog-detail-state-card blog-detail-state-card--error">{{ error }}</div>
      </div>
    </div>

    <template v-else-if="post">
      <section class="blog-detail-hero">
        <div class="blog-detail-hero__backdrop"></div>
        <div class="blog-detail-shell blog-detail-hero__shell">
          <router-link to="/blogs" class="blog-detail__back">Back to Blog</router-link>

          <div class="blog-detail-hero__grid">
            <div class="blog-detail-hero__copy" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
              <p class="blog-detail__type">{{ post.type }}</p>
              <h1 class="blog-detail-hero__title">{{ post.title }}</h1>
              <p class="blog-detail__meta">Updated {{ formatDate(post.updated_at || post.created_at) }}</p>
            </div>

            <div v-if="post.image_url" class="blog-detail-hero__media" data-aos="fade-up" data-aos-offset="20" data-aos-delay="100">
              <img :src="post.image_url" :alt="post.title" class="blog-detail-hero__image" />
            </div>
          </div>
        </div>
      </section>

      <section class="blog-detail-body">
        <div class="blog-detail-shell blog-detail-layout">
          <article class="blog-detail-article" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
            <div class="blog-body" v-html="post.content"></div>
          </article>

          <aside class="blog-detail-sidebar">
            <section class="blog-sidebar__block" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
              <h2 class="blog-sidebar__title">Categories</h2>
              <div class="blog-sidebar__links">
                <router-link
                  v-for="filter in categoryLinks"
                  :key="filter"
                  :to="{ path: '/blogs', query: { filter } }"
                  class="blog-sidebar__link"
                >
                  {{ filter }}
                </router-link>
              </div>
            </section>

            <section v-if="relatedPosts.length" class="blog-sidebar__block" data-aos="fade-up" data-aos-offset="20" data-aos-delay="100">
              <h2 class="blog-sidebar__title">Related News</h2>

              <article v-for="item in relatedPosts" :key="item.slug" class="blog-sidebar-news">
                <router-link :to="`/blogs/${item.slug}`" class="blog-sidebar-news__image-link">
                  <img :src="item.image_url" :alt="item.title" class="blog-sidebar-news__image" />
                </router-link>

                <div class="blog-sidebar-news__body">
                  <p class="blog-detail__type">{{ item.type }}</p>
                  <router-link :to="`/blogs/${item.slug}`" class="blog-sidebar-news__title-link">
                    <h3 class="blog-sidebar-news__title">{{ item.title }}</h3>
                  </router-link>
                  <router-link :to="`/blogs/${item.slug}`" class="blog-sidebar-news__more">Read more</router-link>
                </div>
              </article>
            </section>

            <section class="blog-sidebar__cta" data-aos="fade-up" data-aos-offset="20" data-aos-delay="150">
              <h2 class="blog-sidebar__cta-title">Ready to talk about your own project?</h2>
              <p class="blog-sidebar__cta-copy">
                Get expert advice from one of our consultants to help you find the right modular solution.
              </p>
              <router-link to="/contact?type=project" class="blog-sidebar__cta-link">Contact Our Team</router-link>
            </section>
          </aside>
        </div>
      </section>
    </template>

    <div v-else class="blog-detail-page__state">
      <div class="blog-detail-shell">
        <div class="blog-detail-state-card blog-detail-state-card--empty">Blog post not found.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogDetail, getBlogs } from '@/services/blogApi'

const FILTERS = Object.freeze(['DESIGN INSPIRATION', 'FEATURED', 'BUILDING', 'PROJECTS'])
const FALLBACK_IMAGE = '/images/home/blog/new1.webp'

const route = useRoute()

const loading = ref(true)
const error = ref('')
const post = ref(null)
const relatedPool = ref([])

const normalizeType = (value) => {
  const raw = String(value || '').trim().toUpperCase()
  if (FILTERS.includes(raw)) return raw
  return 'PROJECTS'
}

const normalizePost = (item) => ({
  ...item,
  type: normalizeType(item.type),
  image_url: item.image_url || FALLBACK_IMAGE,
})

const categoryLinks = computed(() => FILTERS)

const relatedPosts = computed(() => {
  if (!post.value) return []

  const sameType = relatedPool.value.filter((item) => item.slug !== post.value.slug && item.type === post.value.type)
  const fallback = relatedPool.value.filter((item) => item.slug !== post.value.slug && item.type !== post.value.type)
  return [...sameType, ...fallback].slice(0, 3)
})

const formatDate = (value) => {
  if (!value) return 'Unknown date'
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

const fetchPost = async () => {
  loading.value = true
  error.value = ''
  post.value = null

  try {
    const [detail, list] = await Promise.all([
      getBlogDetail(route.params.slug),
      getBlogs({ page: 1, page_size: 12 }),
    ])

    post.value = normalizePost(detail)
    relatedPool.value = (list.items || []).map(normalizePost)
  } catch (err) {
    error.value = err.response?.data?.detail || 'Failed to load blog post.'
  } finally {
    loading.value = false
  }
}

watch(() => route.params.slug, fetchPost)
onMounted(fetchPost)
</script>

<style scoped>
.blog-detail-page {
  background: #ffffff;
  padding-top: 5rem;
}

.blog-detail-shell {
  width: min(100%, 1560px);
  margin: 0 auto;
  padding: 0 24px;
}

.blog-detail-page__state {
  padding: 3rem 0 5rem;
}

.blog-detail-page__state--loading {
  background: #f8f8f5;
}

.blog-detail-state-card {
  border-radius: 20px;
  padding: 1.25rem 1.5rem;
  font-size: 0.95rem;
  line-height: 1.7;
}

.blog-detail-state-card--error {
  border: 1px solid #fecaca;
  background: #fff1f2;
  color: #be123c;
}

.blog-detail-state-card--empty {
  border: 1px solid #d6d3d1;
  background: #fafaf9;
  color: #57534e;
}

.blog-detail-skeleton__hero,
.blog-detail-skeleton__article,
.blog-detail-skeleton__sidebar {
  background: linear-gradient(90deg, rgba(226, 232, 240, 0.85), rgba(241, 245, 249, 1), rgba(226, 232, 240, 0.85));
  background-size: 200% 100%;
  animation: blog-detail-skeleton 1.4s ease-in-out infinite;
}

.blog-detail-skeleton__hero {
  height: 420px;
  border-radius: 24px;
}

.blog-detail-skeleton__layout {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.85fr);
  gap: 32px;
  margin-top: 2rem;
}

.blog-detail-skeleton__article {
  min-height: 760px;
  border-radius: 24px;
}

.blog-detail-skeleton__sidebar {
  min-height: 560px;
  border-radius: 24px;
}

.blog-detail-hero {
  position: relative;
  overflow: hidden;
  padding: 1.5rem 0 2.75rem;
}

.blog-detail-hero__backdrop {
  position: absolute;
  inset: 0 0 auto;
  height: 24rem;
  background: linear-gradient(180deg, #f0f2ec 0%, #ffffff 100%);
}

.blog-detail-hero__shell {
  position: relative;
  z-index: 1;
}

.blog-detail__back {
  display: inline-block;
  color: #111111;
  text-decoration: none;
  font-size: clamp(1.6rem, 1.3rem + 0.4vw, 2.3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
}

.blog-detail__back:hover {
  color: #0a7056;
}

.blog-detail-hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 32px;
  align-items: end;
  margin-top: 1.5rem;
}

.blog-detail__type {
  margin: 0;
  color: #5f5f5f;
  font-size: 0.92rem;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.blog-detail-hero__title {
  margin: 0.9rem 0 0;
  color: #111111;
  font-size: clamp(2.2rem, 1.8rem + 1vw, 3.9rem);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.04em;
}

.blog-detail__meta {
  margin: 1rem 0 0;
  color: #5f5f5f;
  font-size: 0.96rem;
}

.blog-detail-hero__image {
  width: 100%;
  height: 28rem;
  border-radius: 8px;
  object-fit: cover;
}

.blog-detail-body {
  padding: 0 0 5rem;
}

.blog-detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.85fr);
  gap: 36px;
  align-items: start;
}

.blog-detail-article {
  min-width: 0;
}

.blog-detail-sidebar {
  position: sticky;
  top: 110px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.blog-sidebar__block,
.blog-sidebar__cta {
  border-radius: 16px;
  background: #f5f5f1;
  padding: 1.5rem;
}

.blog-sidebar__title,
.blog-sidebar__cta-title {
  margin: 0;
  color: #111111;
  font-size: 1.5rem;
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.blog-sidebar__links {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1rem;
}

.blog-sidebar__link {
  color: #111111;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
}

.blog-sidebar__link:hover,
.blog-sidebar-news__more:hover,
.blog-sidebar__cta-link:hover {
  color: #0a7056;
}

.blog-sidebar-news {
  margin-top: 1.25rem;
}

.blog-sidebar-news:first-of-type {
  margin-top: 1rem;
}

.blog-sidebar-news__image-link {
  display: block;
  overflow: hidden;
  border-radius: 8px;
}

.blog-sidebar-news__image {
  width: 100%;
  height: 14rem;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.blog-sidebar-news__image-link:hover .blog-sidebar-news__image {
  transform: scale(1.03);
}

.blog-sidebar-news__body {
  padding-top: 0.9rem;
}

.blog-sidebar-news__title-link,
.blog-sidebar-news__more {
  text-decoration: none;
}

.blog-sidebar-news__title {
  margin: 0.7rem 0 0;
  color: #111111;
  font-size: 1.25rem;
  line-height: 1.16;
  font-weight: 700;
  letter-spacing: -0.03em;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-sidebar-news__more {
  display: inline-block;
  margin-top: 0.9rem;
  color: #1f2937;
  font-size: 0.9rem;
  border-bottom: 1px solid currentColor;
}

.blog-sidebar__cta {
  background: #000000;
  color: #ffffff;
}

.blog-sidebar__cta-title {
  color: #ffffff;
}

.blog-sidebar__cta-copy {
  margin: 0.95rem 0 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.97rem;
  line-height: 1.8;
}

.blog-sidebar__cta-link {
  display: inline-block;
  margin-top: 1.2rem;
  color: #ffffff;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  border-bottom: 1px solid currentColor;
}

.blog-body :deep(.blog-cover) {
  display: none;
}

.blog-body :deep(.blog-rich-content),
.blog-body :deep(.blog-row),
.blog-body :deep(.blog-column) {
  display: block;
}

.blog-body :deep(.blog-rich-content) {
  color: #3f3f46;
}

.blog-body :deep(.blog-row + .blog-row) {
  margin-top: 1.5rem;
}

.blog-body :deep(.blog-heading) {
  margin: 1.85rem 0 0.8rem;
  font-size: 1.85rem;
  line-height: 1.18;
  color: #111111;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.blog-body :deep(.blog-text),
.blog-body :deep(p),
.blog-body :deep(li) {
  font-size: 1.02rem;
  line-height: 1.95;
  color: #52525b;
}

.blog-body :deep(p) {
  margin: 1rem 0;
}

.blog-body :deep(ul),
.blog-body :deep(ol) {
  margin: 1rem 0 1rem 1.3rem;
}

.blog-body :deep(.blog-image),
.blog-body :deep(figure) {
  margin: 1.85rem 0;
}

.blog-body :deep(img) {
  width: 100%;
  max-width: 100%;
  border-radius: 12px;
  display: block;
}

.blog-body :deep(hr) {
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid #d6d3d1;
}

@keyframes blog-detail-skeleton {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

@media (max-width: 1279px) {
  .blog-detail-shell {
    padding: 0 20px;
  }

  .blog-detail-layout,
  .blog-detail-skeleton__layout,
  .blog-detail-hero__grid {
    grid-template-columns: 1fr;
  }

  .blog-detail-sidebar {
    position: static;
  }
}

@media (max-width: 767px) {
  .blog-detail-page {
    padding-top: 4.5rem;
  }

  .blog-detail-shell {
    padding: 0 16px;
  }

  .blog-detail-hero__image {
    height: 17rem;
  }

  .blog-detail-hero {
    padding-bottom: 2rem;
  }

  .blog-detail-body {
    padding-bottom: 4rem;
  }

  .blog-sidebar__block,
  .blog-sidebar__cta {
    padding: 1.2rem;
  }

  .blog-body :deep(.blog-heading) {
    font-size: 1.45rem;
  }

  .blog-body :deep(.blog-text),
  .blog-body :deep(p),
  .blog-body :deep(li) {
    font-size: 0.98rem;
    line-height: 1.85;
  }
}
</style>
