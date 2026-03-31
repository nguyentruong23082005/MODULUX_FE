<template>
  <header :class="['header', { 'header--scrolled': isScrolled }]">
    <div class="header__inner">
      <router-link to="/" class="header__logo" aria-label="Modulux Homes">
        <img src="/images/Logo_MDL.svg" alt="Modulux Homes" />
      </router-link>

      <div class="header__right">
        <nav class="header__nav">
          <template v-for="item in mainItems" :key="item.key">
            <router-link v-if="!item.children?.length" class="nav-link" :to="item.path">
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
          <span class="header__divider" aria-hidden="true"></span>
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

      <button class="header__hamburger" type="button" @click="isOpen = !isOpen" aria-label="Open menu">
        <svg v-if="!isOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="m6 6 12 12M18 6 6 18" stroke-linecap="round" />
        </svg>
      </button>
    </div>

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

        <router-link :to="cta.path" class="mobile-menu__cta" @click="closeMobile">
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
  { key: 'contact', label: 'Contact', path: '/contact?type=general' },
]

const menuItems = ref(fallbackItems)
const cta = ref({ label: 'Enquire Now', path: '/contact?type=general' })
const searchPath = ref('/blogs')

const mainItems = computed(() => menuItems.value)
const mobileItems = computed(() => menuItems.value)

function closeMobile() {
  isOpen.value = false
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

function normalizeCtaPath(path, label) {
  if (!path) {
    return '/contact?type=general'
  }

  if (label?.toLowerCase().includes('enquire') || path.includes('/enquire-now')) {
    return '/contact?type=general'
  }

  return path
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
      cta.value = {
        ...data.cta,
        path: normalizeCtaPath(data.cta.path, data.cta.label),
      }
    }

    if (data?.search?.path) {
      searchPath.value = data.search.path
    }
  } catch {
    // Keep fallback navigation when the API is unavailable.
  }
}

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  },
)

onMounted(() => {
  fetchMenu()
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: #ffffff;
  border-bottom: 1px solid #ececec;
  transition: box-shadow 0.3s ease;
}

.header--scrolled {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1536px;
  height: 80px;
  margin: 0 auto;
  padding: 0 0.5rem;
}

.header__logo {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.header__logo img {
  width: auto;
  height: 56px;
}

.header__right {
  display: none;
  align-items: center;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: #111111;
  text-decoration: none;
  white-space: nowrap;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.24s ease;
}

.nav-link:hover,
.nav-link:focus-visible,
.router-link-active.nav-link,
.nav-dropdown:hover > .nav-link,
.nav-dropdown:focus-within > .nav-link {
  color: #355845;
  outline: none;
}

.nav-link__icon {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

.nav-dropdown {
  position: relative;
}

.nav-dropdown::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  height: 22px;
}

.nav-dropdown:hover .nav-link__icon,
.nav-dropdown:focus-within .nav-link__icon {
  transform: rotate(180deg);
}

.nav-dropdown__panel {
  position: absolute;
  left: 50%;
  top: calc(100% + 18px);
  transform: translateX(-50%);
  min-width: 250px;
  padding: 10px 6px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.03);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity 0.24s ease,
    transform 0.24s ease,
    visibility 0.24s ease;
}

.nav-dropdown:hover .nav-dropdown__panel,
.nav-dropdown:focus-within .nav-dropdown__panel {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.nav-dropdown__item {
  display: block;
  padding: 10px 18px;
  border-radius: 8px;
  color: #333333;
  text-decoration: none;
  font-size: 0.95rem;
  line-height: 1.4rem;
  font-weight: 500;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.nav-dropdown__item:hover,
.nav-dropdown__item:focus-visible,
.nav-dropdown__item.router-link-active {
  background: #f2f6f3;
  color: #355845;
  outline: none;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 2rem;
}

.header__divider {
  display: inline-block;
  width: 2px;
  height: 16px;
  background: #222222;
  flex-shrink: 0;
}

.header__search {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: #111111;
  border-radius: 50%;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.header__search:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #355845;
}

.header__search-icon {
  width: 20px;
  height: 20px;
}

.header__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 8px 16px;
  background: #111111;
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  transition: background-color 0.24s ease;
}

.header__cta:hover {
  background: #333333;
}

.header__hamburger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 0;
  background: transparent;
  color: #111111;
  cursor: pointer;
}

.header__hamburger svg {
  width: 28px;
  height: 28px;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 12px 16px 32px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.mobile-menu__link {
  display: block;
  padding: 16px 8px;
  color: #222222;
  text-decoration: none;
  border-bottom: 1px solid #f5f5f5;
  font-size: 1rem;
  font-weight: 500;
}

.mobile-menu__group {
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.mobile-menu__group-title {
  margin: 0;
  padding: 4px 8px;
  color: #888888;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.mobile-menu__sublink {
  display: block;
  padding: 10px 8px 10px 20px;
  color: #444444;
  text-decoration: none;
  font-size: 0.95rem;
}

.mobile-menu__cta {
  display: block;
  margin-top: 24px;
  padding: 16px;
  text-align: center;
  background: #0a4834;
  color: #ffffff;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
}

@media (min-width: 768px) {
  .header__logo img {
    height: 72px;
  }
}

@media (min-width: 1024px) {
  .header__right {
    display: flex;
  }

  .header__hamburger {
    display: none;
  }
}
</style>
