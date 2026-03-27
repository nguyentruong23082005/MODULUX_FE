<template>
  <section class="factory">
    <div class="factory__container">
      <!-- Text -->
      <div class="factory__text" data-aos="fade-right" data-aos-duration="800">
        <h2 class="factory__title">A Tour of Modulux</h2>
        <p class="factory__desc">
          Discover our factory capability, prefabrication workflow, and model
          lineup through an immersive visual walkthrough.
        </p>
        <a
          class="factory__cta"
          href="https://www.youtube.com/@tranduccorp"
          target="_blank"
          rel="noreferrer"
        >
          Watch on YouTube
        </a>
      </div>

      <!-- Video / Image -->
      <div class="factory__media" data-aos="fade-left" data-aos-duration="800">
        <div class="factory__media-inner">
          <img
            src="/images/MODULUXFACTORYTOUR.jpg"
            alt="Modulux Factory Tour"
            class="factory__img"
          />
          <div class="factory__play">
            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.factory {
  padding: 5rem 0;
  background: #fff;
}

@media (min-width: 768px) {
  .factory {
    padding: 6rem 0;
  }
}

.factory__container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: center;
}

@media (min-width: 768px) {
  .factory__container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .factory__container {
    grid-template-columns: 1fr 1.2fr;
    gap: 3.5rem;
    padding: 0 2rem;
  }
}

.factory__title {
  font-size: 2rem;
  font-weight: 600;
  color: #111;
  margin: 0 0 0.75rem;
}

@media (min-width: 768px) {
  .factory__title {
    font-size: 2.5rem;
  }
}

.factory__desc {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #555;
  margin: 0 0 1.5rem;
  max-width: 480px;
}

.factory__cta {
  display: inline-flex;
  align-items: center;
  padding: 0.7rem 1.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #111;
  background: transparent;
  border: 1.5px solid #111;
  text-decoration: none;
  transition: all 0.3s ease;
}

.factory__cta:hover {
  background: #111;
  color: #fff;
}

/* ── Media ── */
.factory__media-inner {
  position: relative;
  overflow: hidden;
}

.factory__img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

@media (min-width: 768px) {
  .factory__img {
    height: 400px;
  }
}

.factory__media-inner:hover .factory__img {
  transform: scale(1.03);
}

.factory__play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.factory__play:hover {
  background: #0a4834;
  color: #fff;
  transform: translate(-50%, -50%) scale(1.1);
}
</style>
