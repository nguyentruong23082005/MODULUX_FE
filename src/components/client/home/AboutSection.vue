<template>
  <section class="about">
    <div class="about__container">
      <!-- Cột trái: tiêu đề + link -->
      <div class="about__left" data-aos="fade-right" data-aos-duration="800">
        <h2 class="about__title">About Us</h2>
        <router-link to="/about" class="about__link">
          Learn more about us
          <span class="about__arrow">→</span>
        </router-link>
      </div>

      <!-- Cột phải: ảnh "24 years" + quote -->
      <div class="about__right" data-aos="fade-left" data-aos-duration="800">
        <!-- Ảnh composite đã chứa sẵn typography "24 years" -->
        <div class="about__visual">
          <img
            src="/images/home/2K (1).webp"
            alt="24 years - Modulux modular building"
            class="about__image"
          />
        </div>

        <!-- Quote bên dưới ảnh, có border-left, offset phải -->
        <div class="about__quote">
          <p class="about__quote-text">
            The first factory in Vietnam certified for quality by leading global
            inspection agencies.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.about {
  padding: 3.5rem 0 3rem;
  background: #fff;
}

@media (min-width: 768px) {
  .about {
    padding: 4.5rem 0 3.5rem;
  }
}

/* ── Container 2 cột ── */
.about__container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 1.25rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;
}

@media (min-width: 768px) {
  .about__container {
    padding: 0 2rem;
    gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .about__container {
    grid-template-columns: 200px 1fr;
    gap: 3rem;
    padding: 0 5rem;
  }
}

@media (min-width: 1280px) {
  .about__container {
    grid-template-columns: 220px 1fr;
    gap: 3.5rem;
    padding: 0 7rem;
  }
}

/* ── Cột trái ── */
.about__left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 140px;
}

@media (min-width: 1024px) {
  .about__left {
    min-height: 280px;
    padding-top: 0.25rem;
  }
}

.about__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111;
  margin: 0;
}

@media (min-width: 768px) {
  .about__title {
    font-size: 1.75rem;
  }
}

.about__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #0a4834;
  text-decoration: none;
  transition: gap 0.3s ease;
}

.about__link:hover {
  gap: 0.65rem;
}

.about__arrow {
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.about__link:hover .about__arrow {
  transform: translateX(5px);
}

/* ── Cột phải ── */
.about__right {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ── Visual: ảnh composite "24 years" ── */
.about__visual {
  overflow: hidden;
}

.about__image {
  width: 100%;
  max-width: 620px;
  height: auto;
  display: block;
  object-fit: contain;
  margin-left: auto;
}

/* ── Quote ── căn ngang sát phải ảnh */
.about__quote {
  padding-left: 1rem;
  border-left: 3px solid #111;
  margin-left: 0;
}

@media (min-width: 640px) {
  .about__quote {
    margin-left: 35%;
  }
}

@media (min-width: 1024px) {
  .about__quote {
    margin-left: 30%;
  }
}

@media (min-width: 1280px) {
  .about__quote {
    margin-left: 28%;
  }
}

.about__quote-text {
  font-size: 0.88rem;
  line-height: 1.65;
  color: #444;
  max-width: 460px;
  margin: 0;
}
</style>
