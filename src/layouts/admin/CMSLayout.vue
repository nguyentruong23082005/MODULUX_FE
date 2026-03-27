<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <div v-if="sidebarOpen" class="fixed inset-0 z-30 bg-slate-950/30 backdrop-blur-sm lg:hidden" @click="sidebarOpen = false"></div>

    <aside
      class="fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-800 bg-slate-950 text-slate-100 transition-transform duration-200 lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex h-20 items-center justify-between border-b border-white/10 px-6">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">Modulux</p>
          <h1 class="mt-2 text-xl font-semibold tracking-wide text-white">CMS Control</h1>
        </div>
        <button
          type="button"
          class="rounded-xl border border-white/10 p-2 text-slate-400 transition hover:border-white/20 hover:text-white lg:hidden"
          @click="sidebarOpen = false"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="m6 6 12 12M18 6 6 18" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      <div class="px-4 py-5">
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p class="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Signed in</p>
          <p class="mt-3 text-sm font-semibold text-white">{{ currentUsername }}</p>
          <p class="mt-1 text-xs text-slate-400">Admin workspace</p>
        </div>
      </div>

      <nav class="flex-1 space-y-1 overflow-y-auto px-4 pb-4">
        <router-link
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          class="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
          active-class="bg-emerald-500/12 text-white ring-1 ring-emerald-400/30"
          @click="sidebarOpen = false"
        >
          <svg class="h-5 w-5 shrink-0 text-slate-500 transition group-hover:text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path :d="item.icon" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="border-t border-white/10 p-4">
        <button
          type="button"
          class="flex w-full items-center justify-center rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-rose-300/30 hover:bg-rose-500/10 hover:text-white"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </aside>

    <div class="lg:pl-72">
      <header class="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div class="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <div class="flex items-center gap-3">
            <button
              type="button"
              class="rounded-2xl border border-slate-200 p-2 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 lg:hidden"
              @click="sidebarOpen = true"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
              </svg>
            </button>

            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Admin Mode</p>
              <h2 class="mt-2 text-2xl font-semibold text-slate-950">{{ currentTitle }}</h2>
            </div>
          </div>

          <div class="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right sm:block">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Workspace</p>
            <p class="mt-1 text-sm font-medium text-slate-700">Manage menu, content, and contact data</p>
          </div>
        </div>
      </header>

      <main class="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const sidebarOpen = ref(false)

const navigationItems = [
  { to: '/admin', label: 'Dashboard', icon: 'M4 12.5 12 4l8 8.5M6.5 10.5V20h11V10.5' },
  { to: '/admin/navigation', label: 'Navigation', icon: 'M4 7h16M4 12h10M4 17h16' },
  { to: '/admin/pages', label: 'Pages', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6' },
  { to: '/admin/projects', label: 'Projects', icon: 'M4 7h16v10H4zM9 7V4h6v3' },
  { to: '/admin/blogs', label: 'Blogs', icon: 'M6 5.5h9A2.5 2.5 0 0 1 17.5 8v10.5H8.5A2.5 2.5 0 0 0 6 21V5.5Zm0 0A2.5 2.5 0 0 0 3.5 8v10.5' },
  { to: '/admin/categories', label: 'Categories', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
  { to: '/admin/faqs', label: 'FAQs', icon: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z' },
  { to: '/admin/videos', label: 'Videos', icon: 'M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14M5 18h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z' },
  { to: '/admin/banners', label: 'Hero Banners', icon: 'M4 6.5h16v11H4zM8 11l2.5 2.5L14 10l4 4' },
  { to: '/admin/features', label: 'Features', icon: 'm5 12 4 4L19 6' },
  { to: '/admin/partners', label: 'Partners', icon: 'M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
  { to: '/admin/contacts', label: 'Enquiries', icon: 'M4 6.5h16v11H4zM4 8l8 5 8-5' },
  { to: '/admin/subscribers', label: 'Subscribers', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { to: '/admin/settings', label: 'Site Settings', icon: 'M10.5 4.5h3l.5 2.2a6.8 6.8 0 0 1 1.7.99l2.08-.83 1.5 2.6-1.6 1.56a6.79 6.79 0 0 1 0 1.96l1.6 1.56-1.5 2.6-2.08-.83a6.8 6.8 0 0 1-1.7.99l-.5 2.2h-3l-.5-2.2a6.8 6.8 0 0 1-1.7-.99l-2.08.83-1.5-2.6 1.6-1.56a6.79 6.79 0 0 1 0-1.96L4.72 9.46l1.5-2.6 2.08.83a6.8 6.8 0 0 1 1.7-.99l.5-2.2ZM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z' },
]

const currentTitle = computed(() => route.meta?.title || route.name || 'Admin')
const currentUsername = computed(() => authStore.user?.username || 'admin')

function logout() {
  authStore.logout()
  router.push('/admin/login')
}

onMounted(() => {
  if (authStore.token && !authStore.user) {
    authStore.fetchUser()
  }
})
</script>
