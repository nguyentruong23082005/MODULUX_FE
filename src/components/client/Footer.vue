<template>
  <footer class="bg-black pb-8 pt-16 text-white lg:pt-20">
    <div class="mx-auto max-w-[1320px] px-4 md:px-6 lg:px-8">
      <div class="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <img src="/images/Logo_MDL_white.svg" alt="Modulux Homes" class="mb-5 h-12 w-auto" />
          <p class="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Sustainable living solution</p>
          <h3 class="mb-4 text-lg font-semibold">Subscribe to our email newsletter for regular updates and exclusive content</h3>

          <form class="grid gap-3 sm:grid-cols-2" @submit.prevent="submitNewsletter">
            <input v-model="form.firstName" class="footer-input" placeholder="First name*" required />
            <input v-model="form.lastName" class="footer-input" placeholder="Last name*" required />
            <input v-model="form.email" type="email" class="footer-input" placeholder="Email*" required />
            <input v-model="form.phone" class="footer-input" placeholder="Phone*" required />
            <button class="mt-1 bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#0a4834] hover:text-white sm:col-span-2 sm:w-fit">
              Submit
            </button>
          </form>
        </div>

        <div class="lg:col-span-3">
          <h4 class="mb-3 text-base font-semibold">Head Office</h4>
          <p class="text-sm leading-6 text-white/80">
            TranDuc Corporation, Nguyen Hue Street,<br />
            District 1, Ho Chi Minh City, Vietnam
          </p>
        </div>

        <div class="lg:col-span-3">
          <h4 class="mb-3 text-base font-semibold">Factory</h4>
          <p class="text-sm leading-6 text-white/80">
            TranDuc Industrial Complex,<br />
            Binh Duong, Vietnam
          </p>
        </div>

        <div class="lg:col-span-1">
          <h4 class="mb-3 text-base font-semibold">Follow</h4>
          <div class="flex gap-2">
            <a class="social-btn" href="https://www.facebook.com/moduluxhomes" target="_blank" rel="noreferrer">
              <img src="/images/FB_white.svg" alt="Facebook" class="h-4 w-4" />
            </a>
            <a class="social-btn" href="https://www.instagram.com/moduluxhomes_/" target="_blank" rel="noreferrer">
              <img src="/images/IG_white.svg" alt="Instagram" class="h-4 w-4" />
            </a>
            <a class="social-btn" href="https://www.linkedin.com/company/tranduccorp" target="_blank" rel="noreferrer">
              <img src="/images/Linkedin_white.svg" alt="LinkedIn" class="h-4 w-4" />
            </a>
            <a class="social-btn" href="https://www.youtube.com/@tranduccorp" target="_blank" rel="noreferrer">
              <img src="/images/Youtube_white.svg" alt="YouTube" class="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center justify-between gap-3 pt-6 text-xs text-white/60 md:flex-row">
        <p>© {{ currentYear }} Modulux Homes. All rights reserved.</p>
        <button class="text-white/80 transition hover:text-white" type="button" @click="scrollTop">Back to top</button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { reactive } from 'vue'

const currentYear = new Date().getFullYear()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
})

function submitNewsletter() {
  // UI-first phase: use local confirmation and wire API next step.
  alert('Subscribed successfully.')
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.phone = ''
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.footer-input {
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: transparent;
  color: white;
  padding: 0.65rem 0.75rem;
  font-size: 0.9rem;
}

.footer-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.footer-input:focus {
  outline: 1px solid #0a4834;
  border-color: #0a4834;
}

.social-btn {
  display: inline-flex;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s;
}

.social-btn:hover {
  border-color: #0a4834;
  background: #0a4834;
}
</style>

