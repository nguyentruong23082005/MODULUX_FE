<template>
  <section class="enquiry" data-aos="zoom-in" data-aos-duration="1000">
    <div class="enquiry__container container-custom">
      <div class="enquiry__content">
        <div class="enquiry__text">
          <p class="enquiry__label">Partner with Modulux</p>
          <h2 class="enquiry__title">Ready to build your next high-performance project?</h2>
          <p class="enquiry__desc">
            Join architects, developers, and investors worldwide who choose Modulux for 
            sustainable, cost-efficient, and rapid modular construction.
          </p>
        </div>
        <router-link to="/contact?type=project" class="enquiry__cta">
          <span>Get Started Now</span>
          <svg class="enquiry__cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.enquiry {
  background: linear-gradient(135deg, #0a4834 0%, #083a2a 100%);
  position: relative;
  overflow: hidden;
}

.enquiry::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
  pointer-events: none;
}

.enquiry__container {
  padding: 5rem 0;
}

.enquiry__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.5rem;
}

@media (min-width: 1024px) {
  .enquiry__content {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.enquiry__label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1rem;
}

.enquiry__title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1.2;
  max-width: 700px;
}

@media (min-width: 768px) {
  .enquiry__title { font-size: 2.5rem; }
}

.enquiry__desc {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  max-width: 600px;
}

.enquiry__cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 1.25rem 2.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #0a4834;
  background: #fff;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.enquiry__cta:hover {
  background: #222;
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.enquiry__cta-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.enquiry__cta:hover .enquiry__cta-icon {
  transform: translateX(5px);
}
</style>
