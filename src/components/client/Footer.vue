<template>
  <footer class="footer-shell">
    <div class="footer-shell__inner">
      <div class="footer-brand-row">
        <router-link to="/" class="footer-brand" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
          <img src="/images/Logo_MDL_white.svg" alt="Modulux Homes" class="footer-brand__logo" />
        </router-link>
        <p class="footer-brand__tagline" data-aos="fade-up" data-aos-offset="20" data-aos-delay="90">
          Sustainable living solution
        </p>
      </div>

      <div class="footer-main-grid">
        <section class="footer-newsletter" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
          <h2 class="footer-newsletter__title">
            Subscribe to our email newsletter for regular updates and exclusive content
          </h2>

          <form class="footer-form" @submit.prevent="submitNewsletter">
            <label class="footer-field">
              <span class="footer-field__label">First name*</span>
              <input
                v-model.trim="form.firstName"
                class="footer-field__input"
                name="first_name"
                autocomplete="given-name"
                required
                :disabled="isSubmitting"
              />
            </label>

            <label class="footer-field">
              <span class="footer-field__label">Last name*</span>
              <input
                v-model.trim="form.lastName"
                class="footer-field__input"
                name="last_name"
                autocomplete="family-name"
                required
                :disabled="isSubmitting"
              />
            </label>

            <label class="footer-field footer-field--full">
              <span class="footer-field__label">Email*</span>
              <input
                v-model.trim="form.email"
                type="email"
                class="footer-field__input"
                name="email"
                autocomplete="email"
                required
                :disabled="isSubmitting"
              />
            </label>

            <label class="footer-field footer-field--full">
              <span class="footer-field__label">Phone*</span>
              <input
                v-model.trim="form.phone"
                class="footer-field__input"
                name="phone"
                autocomplete="tel"
                required
                :disabled="isSubmitting"
              />
            </label>

            <button type="submit" class="footer-form__submit" :disabled="isSubmitting">
              {{ isSubmitting ? 'Submitting...' : 'Submit' }}
            </button>

            <div
              v-if="formFeedback"
              :class="['footer-form__feedback', `footer-form__feedback--${formFeedback.type}`]"
              aria-live="polite"
            >
              <span v-if="formFeedback.type === 'success'" class="footer-form__feedback-icon">✓</span>
              <span>{{ formFeedback.text }}</span>
            </div>
          </form>

          <nav class="footer-social" aria-label="Social media links">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              class="footer-social__link"
              target="_blank"
              rel="noreferrer"
              :aria-label="social.label"
              :title="social.label"
            >
              <span :class="['footer-icon', social.iconClass]" aria-hidden="true"></span>
            </a>
          </nav>
        </section>

        <nav class="footer-nav footer-nav--primary" aria-label="Footer primary navigation">
          <router-link to="/about" class="footer-nav__heading" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">
            About
          </router-link>

          <span class="footer-nav__divider" data-aos="fade-up" data-aos-offset="20" data-aos-delay="70"></span>

          <div class="footer-nav__group" data-aos="fade-up" data-aos-offset="20" data-aos-delay="90">
            <p class="footer-nav__heading footer-nav__heading--static">What We Do</p>
            <router-link to="/why-modulux" class="footer-nav__link">Why Modulux</router-link>
            <router-link to="/our-technology" class="footer-nav__link">Our Technology</router-link>
            <router-link to="/technical-specification" class="footer-nav__link">Technical Specification</router-link>
            <router-link to="/our-process" class="footer-nav__link">Our Process</router-link>
          </div>

          <span class="footer-nav__divider" data-aos="fade-up" data-aos-offset="20" data-aos-delay="110"></span>

          <router-link to="/projects" class="footer-nav__heading" data-aos="fade-up" data-aos-offset="20" data-aos-delay="130">
            Projects
          </router-link>

          <span class="footer-nav__divider" data-aos="fade-up" data-aos-offset="20" data-aos-delay="150"></span>

          <router-link to="/blogs" class="footer-nav__heading" data-aos="fade-up" data-aos-offset="20" data-aos-delay="170">
            Blog
          </router-link>
        </nav>

        <nav class="footer-nav footer-nav--secondary" aria-label="Footer secondary navigation">
          <router-link
            to="/contact?type=project"
            class="footer-nav__heading"
            data-aos="fade-up"
            data-aos-offset="20"
            data-aos-delay="70"
          >
            Contact
          </router-link>

          <span class="footer-nav__divider" data-aos="fade-up" data-aos-offset="20" data-aos-delay="90"></span>

          <router-link
            to="/faqs"
            class="footer-nav__heading"
            data-aos="fade-up"
            data-aos-offset="20"
            data-aos-delay="110"
          >
            FAQs
          </router-link>
        </nav>

        <section class="footer-offices" aria-label="Company office information">
          <article
            v-for="(office, idx) in offices"
            :key="office.name"
            class="footer-office"
            data-aos="fade-up"
            data-aos-offset="20"
            :data-aos-delay="50 + idx * 70"
          >
            <h2 class="footer-office__title">{{ office.name }}</h2>

            <p class="footer-office__row">
              <span class="footer-icon footer-icon--phone" aria-hidden="true"></span>
              <span class="footer-office__text">
                <a v-for="phone in office.phones" :key="phone.href" :href="phone.href" class="footer-office__contact">
                  {{ phone.label }}
                </a>
              </span>
            </p>

            <p class="footer-office__row">
              <span class="footer-icon footer-icon--location" aria-hidden="true"></span>
              <span class="footer-office__text">{{ office.address }}</span>
            </p>
          </article>
        </section>
      </div>

      <div class="footer-legal">
        <p class="footer-legal__copy">&copy; 2025 Modulux Homes. All rights reserved.</p>

        <div class="footer-legal__links">
          <a
            v-for="legal in legalLinks"
            :key="legal.label"
            :href="legal.href"
            class="footer-legal__link"
            target="_blank"
            rel="noreferrer"
          >
            {{ legal.label }}
          </a>
        </div>
      </div>
    </div>
  </footer>

  <button
    type="button"
    class="scroll-top"
    :class="{ 'scroll-top--visible': showScrollTop }"
    aria-label="Back to top"
    @click="scrollTop"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="m5 10 7-7 7 7M12 3v18" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import publicApi from '@/services/publicApi'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
})

const socials = [
  { label: 'YouTube', href: 'https://www.youtube.com/@tranduccorp', iconClass: 'footer-icon--youtube' },
  { label: 'Facebook', href: 'https://www.facebook.com/moduluxhomes', iconClass: 'footer-icon--facebook' },
  { label: 'Instagram', href: 'https://www.instagram.com/moduluxhomes_/', iconClass: 'footer-icon--instagram' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/tranduccorp', iconClass: 'footer-icon--linkedin' },
]

const offices = [
  {
    name: 'Head Office',
    phones: [
      { label: '(+84) 988 897 997', href: 'tel:+84988897997' },
      { label: '(+84) 934 826 309', href: 'tel:+84934826309' },
    ],
    address: 'Unit 901, The Waterfront Saigon, 1-1A-2 Ton Duc Thang, Sai Gon Ward, Ho Chi Minh City, Vietnam',
  },
  {
    name: 'Factory',
    phones: [
      { label: '(+84) 988 897 997', href: 'tel:+84988897997' },
      { label: '(+84) 934 826 309', href: 'tel:+84934826309' },
    ],
    address: 'T1/21M, Group 1, Binh Thuan 2 Quarter, Thuan Giao Ward, Ho Chi Minh City, Vietnam',
  },
]

const legalLinks = [
  { label: 'Terms & conditions', href: 'https://moduluxhomes.com/terms' },
  { label: 'Privacy Policy', href: 'https://moduluxhomes.com/privacy-policy' },
]

const isSubmitting = ref(false)
const formFeedback = ref(null)
const showScrollTop = ref(false)

const resetForm = () => {
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.phone = ''
}

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 360
}

const submitNewsletter = async () => {
  formFeedback.value = null
  isSubmitting.value = true

  try {
    await publicApi.post('/api/v1/subscribers/', {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
    })

    formFeedback.value = {
      type: 'success',
      text: 'Congratulations! You have successfully subscribed to our newsletter.',
    }
    resetForm()
  } catch (error) {
    if (error?.response?.status === 409) {
      formFeedback.value = {
        type: 'error',
        text: 'This email is already subscribed.',
      }
    } else {
      formFeedback.value = {
        type: 'error',
        text: 'Unable to submit right now. Please try again later.',
      }
    }
  } finally {
    isSubmitting.value = false
  }
}

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.footer-shell {
  background: #020202;
  color: #ffffff;
}

.footer-shell :deep([data-aos]) {
  opacity: 1 !important;
  transform: none !important;
}

.footer-shell__inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 3.2rem 1rem 1.15rem;
}

.footer-brand-row {
  display: grid;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2.6rem;
}

.footer-brand {
  display: inline-flex;
  width: fit-content;
}

.footer-brand__logo {
  width: min(100%, 14.5rem);
  height: auto;
  object-fit: contain;
}

.footer-brand__tagline {
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.72rem;
  font-weight: 500;
  line-height: 1.3;
  text-transform: uppercase;
  letter-spacing: 0.22em;
}

.footer-main-grid {
  display: grid;
  gap: 2.2rem 1.8rem;
}

.footer-newsletter__title,
.footer-nav__heading,
.footer-office__title {
  font-family: var(--font-display);
}

.footer-newsletter__title {
  margin: 0 0 1.15rem;
  max-width: 18rem;
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.45;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.footer-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem 0.72rem;
  max-width: 20rem;
}

.footer-field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.footer-field--full {
  grid-column: 1 / -1;
}

.footer-field__label {
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.85rem;
  line-height: 1.2;
  font-weight: 600;
}

.footer-field__input {
  width: 100%;
  min-height: 2.3rem;
  border: 1px solid transparent;
  background: #222222;
  color: #ffffff;
  padding: 0.55rem 0.72rem;
  font-size: 0.92rem;
  line-height: 1.2;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease,
    transform 0.3s ease;
}

.footer-field__input:focus {
  outline: none;
  border-color: #0a4834;
  background: #181818;
}

.footer-field__input:disabled,
.footer-form__submit:disabled {
  cursor: not-allowed;
  opacity: 0.72;
}

.footer-form__submit {
  grid-column: 1 / -1;
  width: min(100%, 6.5rem);
  min-height: 2.15rem;
  border: none;
  background: #ffffff;
  color: #000000;
  padding: 0.6rem 0.95rem;
  font-size: 0.9rem;
  line-height: 1.1;
  font-weight: 700;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;
}

.footer-form__submit:hover:not(:disabled) {
  background: #d9d9d9;
  transform: translateY(-1px);
}

.footer-form__feedback {
  grid-column: 1 / -1;
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.45;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.footer-form__feedback-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #059669;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 2px;
}

.footer-form__feedback--success {
  color: #c4f0dd;
}

.footer-form__feedback--error {
  color: #ffb4b4;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.9rem;
}

.footer-nav__group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.45rem;
}

.footer-nav__heading,
.footer-nav__link,
.footer-legal__link,
.footer-office__contact {
  text-decoration: none;
}

.footer-nav__heading {
  color: #ffffff;
  font-size: 1.08rem;
  line-height: 1.1;
  font-weight: 600;
  transition: color 0.3s ease;
}

.footer-nav__heading--static {
  margin: 0;
}

.footer-nav__link {
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.82rem;
  line-height: 1.25;
  font-weight: 500;
  transition:
    color 0.3s ease,
    transform 0.3s ease;
}

.footer-nav__divider {
  width: 2.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.85);
}

.footer-nav__heading:hover,
.footer-nav__heading.router-link-active,
.footer-nav__link:hover,
.footer-nav__link.router-link-active,
.footer-legal__link:hover,
.footer-office__contact:hover {
  color: #0a7056;
}

.footer-nav__link:hover {
  transform: translateX(2px);
}

.footer-offices {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.footer-office {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.footer-office__title {
  margin: 0;
  color: #ffffff;
  font-size: 1.08rem;
  line-height: 1.1;
  font-weight: 600;
}

.footer-office__row {
  display: flex;
  align-items: flex-start;
  gap: 0.42rem;
  margin: 0;
}

.footer-office__text {
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.8rem;
  line-height: 1.42;
}

.footer-office__contact {
  color: inherit;
  transition: color 0.3s ease;
}

.footer-office__contact + .footer-office__contact::before {
  content: ' / ';
}

.footer-social {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1.2rem;
}

.footer-social__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  opacity: 0.88;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.footer-social__link:hover {
  transform: translateY(-2px);
  opacity: 1;
}

.footer-social__link:hover .footer-icon {
  background-color: #0a7056;
}

.footer-legal {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: 1.25rem;
  padding-top: 0.95rem;
  border-top: 1px solid rgba(255, 255, 255, 0.35);
}

.footer-legal__copy,
.footer-legal__link {
  color: rgba(255, 255, 255, 0.76);
  font-size: 0.68rem;
  line-height: 1.45;
}

.footer-legal__copy {
  margin: 0;
}

.footer-legal__links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem 1rem;
}

.footer-icon {
  display: inline-flex;
  flex: 0 0 auto;
  width: 1.05rem;
  height: 1.05rem;
  background-color: currentColor;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: contain;
}

.footer-office__row:hover .footer-icon {
  transform: translateY(-1px);
}

.footer-icon--phone {
  -webkit-mask-image: url('/images/Phone_white.svg');
  mask-image: url('/images/Phone_white.svg');
}

.footer-icon--location {
  -webkit-mask-image: url('/images/Location_white.svg');
  mask-image: url('/images/Location_white.svg');
}

.footer-icon--youtube {
  -webkit-mask-image: url('/images/Youtube_white.svg');
  mask-image: url('/images/Youtube_white.svg');
}

.footer-icon--facebook {
  -webkit-mask-image: url('/images/FB_white.svg');
  mask-image: url('/images/FB_white.svg');
}

.footer-icon--instagram {
  -webkit-mask-image: url('/images/IG_white.svg');
  mask-image: url('/images/IG_white.svg');
}

.footer-icon--linkedin {
  -webkit-mask-image: url('/images/Linkedin_white.svg');
  mask-image: url('/images/Linkedin_white.svg');
}

.scroll-top {
  position: fixed;
  right: 0.75rem;
  bottom: 1rem;
  z-index: 30;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.9rem;
  height: 2.9rem;
  border: none;
  border-radius: 999px;
  background: #111111;
  color: #ffffff;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.26);
  opacity: 0;
  pointer-events: none;
  transform: translateY(16px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease,
    background-color 0.3s ease;
}

.scroll-top svg {
  width: 1.2rem;
  height: 1.2rem;
}

.scroll-top--visible {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.scroll-top:hover {
  background: #0a7056;
}

@media (min-width: 768px) {
  .footer-shell__inner {
    padding: 3.8rem 1.5rem 1.35rem;
  }

  .footer-brand-row {
    grid-template-columns: minmax(0, 1fr) auto;
    margin-bottom: 2.9rem;
  }

  .footer-brand__tagline {
    text-align: right;
  }

  .footer-main-grid {
    grid-template-columns: minmax(0, 1.28fr) minmax(0, 0.84fr) minmax(0, 0.62fr);
    align-items: start;
  }

  .footer-newsletter {
    grid-column: 1 / 2;
  }

  .footer-nav--primary {
    grid-column: 2 / 3;
  }

  .footer-nav--secondary {
    grid-column: 3 / 4;
  }

  .footer-offices {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.8rem 2rem;
  }

  .footer-legal {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .scroll-top {
    right: 1.5rem;
    bottom: 1.5rem;
  }
}

@media (min-width: 1100px) {
  .footer-shell__inner {
    padding: 4rem 2rem 1.35rem;
  }

  .footer-brand__logo {
    width: 15.5rem;
  }

  .footer-main-grid {
    grid-template-columns: minmax(18rem, 1.32fr) minmax(9rem, 0.76fr) minmax(7rem, 0.6fr) minmax(17rem, 1fr);
    gap: 1.8rem 3.2rem;
  }

  .footer-newsletter__title {
    margin-bottom: 1.2rem;
  }

  .footer-nav--primary,
  .footer-nav--secondary,
  .footer-offices {
    grid-column: auto;
  }

  .footer-offices {
    display: flex;
    gap: 2.4rem;
  }

  .footer-legal {
    margin-top: 1rem;
    padding-top: 1rem;
  }

  .scroll-top {
    right: 1.9rem;
    bottom: 1.9rem;
  }
}

@media (max-width: 767px) {
  .footer-shell__inner {
    padding-top: 3rem;
  }

  .footer-form {
    grid-template-columns: 1fr;
    max-width: 100%;
  }

  .footer-form__submit {
    width: 100%;
  }

  .footer-newsletter__title {
    max-width: 100%;
  }

  .footer-social {
    margin-top: 1rem;
  }
}
</style>
