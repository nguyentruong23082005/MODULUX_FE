<template>
  <section class="space-y-6">
    <div class="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-2">
        <p class="text-sm font-medium uppercase tracking-[0.24em] text-emerald-600">Header Navigation</p>
        <h2 class="text-2xl font-semibold text-slate-900">Manage the public menu</h2>
        <p class="max-w-2xl text-sm leading-6 text-slate-500">
          Update top-level links, dropdown items, and the right-side CTA used by the website header.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="inline-flex items-center rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          @click="fetchMenuConfig"
          :disabled="loading || saving"
        >
          Refresh
        </button>
        <button
          type="button"
          class="inline-flex items-center rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          @click="saveMenu"
          :disabled="loading || saving"
        >
          {{ saving ? 'Saving...' : 'Save Navigation' }}
        </button>
      </div>
    </div>

    <div v-if="error" class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
      {{ error }}
    </div>
    <div v-if="success" class="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
      {{ success }}
    </div>

    <div v-if="loading" class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
      Loading navigation config...
    </div>

    <template v-else>
      <div class="grid gap-6 xl:grid-cols-[minmax(0,2fr)_24rem]">
        <div class="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <div>
              <h3 class="text-lg font-semibold text-slate-900">Main menu items</h3>
              <p class="mt-1 text-sm text-slate-500">You can add dropdown children under each primary link.</p>
            </div>
            <button
              type="button"
              class="inline-flex items-center rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
              @click="addMainItem"
            >
              Add menu item
            </button>
          </div>

          <div v-if="!menuConfig.items.length" class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
            No menu items yet. Add the first one to start building the header.
          </div>

          <div v-for="(item, index) in menuConfig.items" :key="item.id" class="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Primary item {{ index + 1 }}</p>
                <h4 class="mt-1 text-lg font-semibold text-slate-900">{{ item.label || 'Untitled menu item' }}</h4>
              </div>

              <div class="flex flex-wrap gap-2">
                <button type="button" class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-white" @click="moveItem(index, -1)" :disabled="index === 0">
                  Move up
                </button>
                <button type="button" class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-white" @click="moveItem(index, 1)" :disabled="index === menuConfig.items.length - 1">
                  Move down
                </button>
                <button type="button" class="rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50" @click="removeItem(index)">
                  Remove
                </button>
              </div>
            </div>

            <div class="mt-5 grid gap-4 md:grid-cols-2">
              <label class="space-y-2">
                <span class="text-sm font-medium text-slate-700">Label</span>
                <input v-model="item.label" type="text" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" placeholder="About" />
              </label>
              <label class="space-y-2">
                <span class="text-sm font-medium text-slate-700">Path</span>
                <input v-model="item.path" type="text" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" placeholder="/about" />
              </label>
              <label class="space-y-2">
                <span class="text-sm font-medium text-slate-700">Key</span>
                <input v-model="item.key" type="text" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" placeholder="about" />
              </label>
              <label class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <input v-model="item.is_active" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                <span class="text-sm font-medium text-slate-700">Visible on the website</span>
              </label>
            </div>

            <div class="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
              <div class="flex items-center justify-between gap-4">
                <div>
                  <h5 class="text-sm font-semibold text-slate-900">Dropdown items</h5>
                  <p class="mt-1 text-sm text-slate-500">Optional second-level links under this menu item.</p>
                </div>
                <button type="button" class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50" @click="addChildItem(item)">
                  Add child
                </button>
              </div>

              <div v-if="!item.children.length" class="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500">
                No dropdown items.
              </div>

              <div v-for="(child, childIndex) in item.children" :key="child.id" class="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <p class="text-sm font-semibold text-slate-900">Child {{ childIndex + 1 }}</p>
                  <div class="flex flex-wrap gap-2">
                    <button type="button" class="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-white" @click="moveChild(item, childIndex, -1)" :disabled="childIndex === 0">
                      Up
                    </button>
                    <button type="button" class="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-white" @click="moveChild(item, childIndex, 1)" :disabled="childIndex === item.children.length - 1">
                      Down
                    </button>
                    <button type="button" class="rounded-xl border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50" @click="removeChild(item, childIndex)">
                      Remove
                    </button>
                  </div>
                </div>

                <div class="mt-4 grid gap-4 md:grid-cols-2">
                  <label class="space-y-2">
                    <span class="text-sm font-medium text-slate-700">Label</span>
                    <input v-model="child.label" type="text" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" placeholder="Projects" />
                  </label>
                  <label class="space-y-2">
                    <span class="text-sm font-medium text-slate-700">Path</span>
                    <input v-model="child.path" type="text" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" placeholder="/projects" />
                  </label>
                  <label class="space-y-2">
                    <span class="text-sm font-medium text-slate-700">Key</span>
                    <input v-model="child.key" type="text" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" placeholder="projects" />
                  </label>
                  <label class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <input v-model="child.is_active" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                    <span class="text-sm font-medium text-slate-700">Visible on the website</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside class="space-y-4">
          <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-slate-900">Header actions</h3>
            <div class="mt-5 space-y-4">
              <label class="space-y-2">
                <span class="text-sm font-medium text-slate-700">CTA label</span>
                <input v-model="menuConfig.cta_label" type="text" class="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" placeholder="Enquire Now" />
              </label>
              <label class="space-y-2">
                <span class="text-sm font-medium text-slate-700">CTA path</span>
                <input v-model="menuConfig.cta_path" type="text" class="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" placeholder="/contact?type=project" />
              </label>
              <label class="space-y-2">
                <span class="text-sm font-medium text-slate-700">Search path</span>
                <input v-model="menuConfig.search_path" type="text" class="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" placeholder="/blogs" />
              </label>
            </div>
          </div>

          <div class="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-slate-100 shadow-sm">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Publishing note</p>
            <p class="mt-3 text-sm leading-6 text-slate-300">
              Saved changes are applied to the public navbar after the website refreshes and fetches
              <code class="rounded bg-white/10 px-2 py-1 text-xs text-white">/api/v1/site/menu</code>.
            </p>
          </div>
        </aside>
      </div>
    </template>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import api from '@/services/api'

const loading = ref(true)
const saving = ref(false)
const error = ref('')
const success = ref('')
const itemId = ref(0)

const menuConfig = reactive(createEmptyConfig())

function createEmptyItem() {
  itemId.value += 1
  return {
    id: `menu-${itemId.value}`,
    key: '',
    label: '',
    path: '',
    order: 0,
    is_active: true,
    children: [],
  }
}

function createEmptyConfig() {
  return {
    location: 'header',
    locale: 'en-US',
    cta_label: 'Enquire Now',
    cta_path: '/contact?type=project',
    search_path: '/blogs',
    items: [],
  }
}

function resetConfig(nextConfig) {
  menuConfig.location = nextConfig.location
  menuConfig.locale = nextConfig.locale
  menuConfig.cta_label = nextConfig.cta_label
  menuConfig.cta_path = nextConfig.cta_path
  menuConfig.search_path = nextConfig.search_path
  menuConfig.items = nextConfig.items
}

function normalizeItem(item) {
  const normalized = createEmptyItem()
  normalized.key = item?.key ?? ''
  normalized.label = item?.label ?? ''
  normalized.path = item?.path ?? ''
  normalized.order = item?.order ?? 0
  normalized.is_active = item?.is_active ?? true
  normalized.children = (item?.children ?? []).map(normalizeItem)
  return normalized
}

function normalizeConfig(config) {
  return {
    location: config?.location ?? 'header',
    locale: config?.locale ?? 'en-US',
    cta_label: config?.cta_label ?? 'Enquire Now',
    cta_path: config?.cta_path ?? '/contact?type=project',
    search_path: config?.search_path ?? '/blogs',
    items: (config?.items ?? []).map(normalizeItem),
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function buildItemPayload(item, index) {
  return {
    key: item.key?.trim() || slugify(item.label || item.path || `item-${index + 1}`),
    label: item.label?.trim() || `Menu ${index + 1}`,
    path: item.path?.trim() || '/',
    order: index,
    is_active: Boolean(item.is_active),
    children: item.children.map((child, childIndex) => buildItemPayload(child, childIndex)),
  }
}

async function fetchMenuConfig() {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const { data } = await api.get('/api/v1/site/menu/config', {
      params: { location: 'header', locale: 'en-US' },
    })
    resetConfig(normalizeConfig(data))
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load navigation settings.'
  } finally {
    loading.value = false
  }
}

async function saveMenu() {
  saving.value = true
  error.value = ''
  success.value = ''

  try {
    const payload = {
      location: menuConfig.location,
      locale: menuConfig.locale,
      cta_label: menuConfig.cta_label?.trim() || 'Enquire Now',
      cta_path: menuConfig.cta_path?.trim() || '/contact?type=project',
      search_path: menuConfig.search_path?.trim() || '/blogs',
      items: menuConfig.items.map((item, index) => buildItemPayload(item, index)),
    }

    const { data } = await api.put('/api/v1/site/menu', payload)
    resetConfig(normalizeConfig(data))
    success.value = 'Navigation saved successfully.'
  } catch (err) {
    console.error(err)
    error.value = 'Failed to save navigation.'
  } finally {
    saving.value = false
  }
}

function addMainItem() {
  menuConfig.items.push(createEmptyItem())
}

function removeItem(index) {
  menuConfig.items.splice(index, 1)
}

function moveItem(index, direction) {
  const target = index + direction
  if (target < 0 || target >= menuConfig.items.length) return
  ;[menuConfig.items[index], menuConfig.items[target]] = [menuConfig.items[target], menuConfig.items[index]]
}

function addChildItem(item) {
  item.children.push(createEmptyItem())
}

function removeChild(item, childIndex) {
  item.children.splice(childIndex, 1)
}

function moveChild(item, childIndex, direction) {
  const target = childIndex + direction
  if (target < 0 || target >= item.children.length) return
  ;[item.children[childIndex], item.children[target]] = [item.children[target], item.children[childIndex]]
}

onMounted(fetchMenuConfig)
</script>
