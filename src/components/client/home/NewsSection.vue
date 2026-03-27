<template>
  <section class="news">
    <div class="news__container">
      <div class="news__header" data-aos="fade-up" data-aos-duration="600">
        <h2 class="news__title">News and Insights</h2>
        <router-link to="/blogs" class="news__view-all">
          Read all blogs
        </router-link>
      </div>

      <div class="news__grid">
        <article
          v-for="(post, idx) in posts"
          :key="post.slug"
          class="news__card"
          data-aos="fade-up"
          :data-aos-delay="idx * 100"
          data-aos-duration="700"
        >
          <div class="news__card-img-wrap">
            <img :src="post.image" :alt="post.title" class="news__card-img" />
          </div>
          <div class="news__card-body">
            <p class="news__card-cat">{{ post.category }}</p>
            <h3 class="news__card-title">{{ post.title }}</h3>
            <p class="news__card-excerpt">{{ post.excerpt }}</p>
            <router-link
              :to="`/blogs/${post.slug}`"
              class="news__card-link"
            >
              Read more →
            </router-link>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  posts: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.news {
  padding: 5rem 0;
  background: #fff;
}

@media (min-width: 768px) {
  .news {
    padding: 6rem 0;
  }
}

.news__container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .news__container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .news__container {
    padding: 0 2rem;
  }
}

.news__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.news__title {
  font-size: 2rem;
  font-weight: 600;
  color: #111;
  margin: 0;
}

@media (min-width: 768px) {
  .news__title {
    font-size: 2.25rem;
  }
}

.news__view-all {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0a4834;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.news__view-all:hover {
  opacity: 0.7;
}

/* ── Grid ── */
.news__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .news__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .news__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ── Card ── */
.news__card {
  border: 1px solid #eee;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.news__card:hover {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
}

.news__card-img-wrap {
  overflow: hidden;
}

.news__card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.news__card:hover .news__card-img {
  transform: scale(1.05);
}

.news__card-body {
  padding: 1.25rem;
}

.news__card-cat {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #888;
  margin: 0 0 0.5rem;
}

.news__card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111;
  margin: 0 0 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.news__card-excerpt {
  font-size: 0.88rem;
  line-height: 1.6;
  color: #666;
  margin: 0 0 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news__card-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0a4834;
  text-decoration: none;
  transition: opacity 0.2s;
}

.news__card-link:hover {
  opacity: 0.7;
}
</style>
