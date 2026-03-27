<template>
  <header :class="['header', { 'header--scrolled': isScrolled }]">
    <div class="header__inner">
      <!-- Logo bên trái -->
      <router-link to="/" class="header__logo">
        <img src="/images/Logo_MDL.svg" alt="Modulux Homes" />
      </router-link>

      <!-- Nav + Actions gom bên phải (giống reference) -->
      <div class="header__right">
        <nav class="header__nav">
          <template v-for="item in mainItems" :key="item.key">
            <router-link
              v-if="!item.children?.length"
              class="nav-link"
              :to="item.path"
            >
              {{ item.label }}
            </router-link>

            <div v-else class="nav-dropdown">
              <button class="nav-link nav-link--parent" type="button">
                {{ item.label }}
                <svg class="nav-link__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="m6 9 6 6 6-6" stroke-linecap="round" />
                </svg>
              </button>
              <div class="nav-dropdown__panel">
                <router-link
                  v-for="child in item.children"
                  :key="child.key"
                  class="nav-dropdown__item"
                  :to="child.path"
                >
                  {{ child.label }}
                </router-link>
              </div>
            </div>
          </template>
        </nav>

        <div class="header__actions">
          <span class="header__divider">|</span>
          <router-link :to="searchPath" class="header__search" aria-label="Search">
            <svg class="header__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="m21 21-4.35-4.35" stroke-linecap="round" />
              <circle cx="11" cy="11" r="7" />
            </svg>
          </router-link>
          <router-link :to="cta.path" class="header__cta">
            {{ cta.label }}
          </router-link>
        </div>
      </div>

      <!-- Mobile hamburger -->
      <button class="header__hamburger" type="button" @click="isOpen = !isOpen" aria-label="Open menu">
        <svg v-if="!isOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="m6 6 12 12M18 6 6 18" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <transition name="slide-fade">
      <div v-if="isOpen" class="mobile-menu">
        <template v-for="item in mobileItems" :key="`m-${item.key}`">
          <router-link
            v-if="!item.children?.length"
            class="mobile-menu__link"
            :to="item.path"
            @click="closeMobile"
          >
            {{ item.label }}
          </router-link>

          <div v-else class="mobile-menu__group">
            <p class="mobile-menu__group-title">{{ item.label }}</p>
            <router-link
              v-for="child in item.children"
              :key="`mc-${child.key}`"
              class="mobile-menu__sublink"
              :to="child.path"
              @click="closeMobile"
            >
              {{ child.label }}
            </router-link>
          </div>
        </template>

        <router-link
          :to="cta.path"
          class="mobile-menu__cta"
          @click="closeMobile"
        >
          {{ cta.label }}
        </router-link>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import publicApi from '@/services/publicApi'

const isOpen = ref(false)
const isScrolled = ref(false)
const route = useRoute()

const fallbackItems = [
  { key: 'about', label: 'About', path: '/about' },
  {
    key: 'what-we-do',
    label: 'What We Do',
    path: '/why-modulux',
    children: [
      { key: 'why-modulux', label: 'Why Modulux', path: '/why-modulux' },
      { key: 'our-technology', label: 'Our Technology', path: '/our-technology' },
      { key: 'technical-specification', label: 'Technical Specification', path: '/technical-specification' },
      { key: 'our-process', label: 'Our Process', path: '/our-process' },
      { key: 'projects', label: 'Projects', path: '/projects' },
      { key: 'faqs', label: 'FAQs', path: '/faqs' },
    ],
  },
  { key: 'blog', label: 'Blog', path: '/blogs' },
  { key: 'contact', label: 'Contact', path: '/contact?type=project' },
]

const menuItems = ref(fallbackItems)
const cta = ref({ label: 'Enquire Now', path: '/contact?type=project' })
const searchPath = ref('/blogs')

const mainItems = computed(() => menuItems.value)
const mobileItems = computed(() => menuItems.value)

function closeMobile() {
  isOpen.value = false
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

async function fetchMenu() {
  try {
    const { data } = await publicApi.get('/api/v1/site/menu', {
      params: { location: 'header', locale: 'en-US' },
    })

    if (Array.isArray(data?.items) && data.items.length) {
      menuItems.value = data.items
    }
    if (data?.cta?.label && data?.cta?.path) {
      cta.value = data.cta
    }
    if (data?.search?.path) {
      searchPath.value = data.search.path
    }
  } catch {
    // Giữ fallback menu khi API chưa sẵn sàng
  }
}

watch(() => route.fullPath, () => { isOpen.value = false })

onMounted(() => {
  fetchMenu()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* ========================================
   HEADER — nền trắng, fixed top
   ======================================== */
.header {
  position: fixed;
  inset-inline: 0;
  top: 0;
  z-index: 50;
  background: transparent;
  transition: all 0.3s ease;
}

.header--scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  height: 84px;
  margin: 0 auto;
  padding: 0 1.25rem;
  transition: height 0.3s ease;
}

.header--scrolled .header__inner {
  height: 72px;
}

@media (min-width: 768px) {
  .header__inner { padding: 0 2rem; }
}

/* ---- Logo (bên trái) ---- */
.header__logo {
  flex-shrink: 0;
}

.header__logo img {
  height: 48px;
  width: auto;
  transition: height 0.3s ease;
}

.header--scrolled .header__logo img {
  height: 42px;
}

@media (min-width: 768px) {
  .header__logo img { height: 54px; }
  .header--scrolled .header__logo img { height: 48px; }
}

/* ---- Right group: Nav + Actions gom phải ---- */
.header__right {
  display: none;
  align-items: center;
}

@media (min-width: 1024px) {
  .header__right { display: flex; }
}

/* ---- Nav ---- */
.header__nav {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

/* ---- Nav link ---- */
.nav-link {
  position: relative;
  font-size: 0.938rem;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.3s ease;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  letter-spacing: 0.02em;
}

.header--scrolled .nav-link {
  color: #222;
}

.nav-link:hover,
.router-link-active.nav-link {
  color: #0a4834 !important;
}

.nav-link__icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-left: 4px;
  transition: transform 0.2s;
}

.nav-dropdown:hover .nav-link__icon {
  transform: rotate(180deg);
}

/* ---- Dropdown ---- */
.nav-dropdown {
  position: relative;
}

.nav-dropdown__panel {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  margin-top: 20px;
  min-width: 250px;
  padding: 10px 6px;
  background: #fff;
  border-radius: 14px;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.10),
    0 2px 8px rgba(0, 0, 0, 0.04);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  pointer-events: none;
}

.nav-dropdown:hover .nav-dropdown__panel {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  margin-top: 16px;
}

.nav-dropdown__item {
  display: block;
  padding: 10px 18px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #222;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.2s;
}

.nav-dropdown__item:hover {
  background: #f5f5f5;
  color: #0a4834;
}

/* ---- Actions (divider | search | CTA) ---- */
.header__actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 2.5rem;
}

.header__divider {
  font-size: 1.2rem;
  line-height: 1;
  color: rgba(255, 255, 255, 0.3);
  user-select: none;
}

.header--scrolled .header__divider {
  color: #eee;
}

.header__search {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  transition: all 0.2s;
}

.header--scrolled .header__search {
  color: #333;
}

.header__search:hover {
  background: rgba(10, 72, 52, 0.1);
  color: #0a4834;
}

.header__search-icon {
  width: 20px;
  height: 20px;
}

/* ---- CTA Button — nền đen ---- */
.header__cta {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: #0a4834;
  text-decoration: none;
  transition: all 0.3s ease;
  letter-spacing: 0.01em;
}

.header--scrolled .header__cta {
  background: #222;
}

.header__cta:hover {
  background: #0d5d43;
  transform: translateY(-1px);
}

.header--scrolled .header__cta:hover {
  background: #0a4834;
}

/* ---- Hamburger (mobile) ---- */
.header__hamburger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  color: #fff;
  cursor: pointer;
}

.header--scrolled .header__hamburger {
  color: #222;
}

.header__hamburger svg {
  width: 28px;
  height: 28px;
}

@media (min-width: 1024px) {
  .header__hamburger { display: none; }
}

/* ========================================
   MOBILE MENU
   ======================================== */
.mobile-menu {
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 12px 16px 32px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

.mobile-menu__link {
  display: block;
  padding: 16px 8px;
  font-size: 1rem;
  font-weight: 500;
  color: #222;
  text-decoration: none;
  border-bottom: 1px solid #f5f5f5;
}

.mobile-menu__group {
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.mobile-menu__group-title {
  padding: 4px 8px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.mobile-menu__sublink {
  display: block;
  padding: 10px 8px 10px 20px;
  font-size: 0.95rem;
  color: #444;
  text-decoration: none;
}

.mobile-menu__cta {
  display: block;
  margin-top: 24px;
  padding: 16px;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  background: #0a4834;
  text-decoration: none;
}

</style>
