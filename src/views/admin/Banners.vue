<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-xl font-bold text-gray-800">Manage Hero Banners</h2>
      <button
        @click="openModal()"
        class="rounded bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand"
      >
        Add Banner
      </button>
    </div>

    <div class="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table class="w-full border-collapse text-left">
        <thead class="bg-gray-50 text-xs font-semibold uppercase text-gray-700">
          <tr>
            <th class="border-b px-4 py-4">ID</th>
            <th class="border-b px-4 py-4">Image</th>
            <th class="border-b px-4 py-4">Title</th>
            <th class="border-b px-4 py-4">Description</th>
            <th class="border-b px-4 py-4">CTA</th>
            <th class="border-b px-4 py-4">Status</th>
            <th class="border-b px-4 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="banner in banners" :key="banner.id" class="border-b hover:bg-gray-50">
            <td class="px-4 py-3 text-sm">{{ banner.id }}</td>
            <td class="px-4 py-3">
              <img
                v-if="banner.image_url"
                :src="banner.image_url"
                :alt="banner.title"
                class="h-12 w-20 rounded object-cover"
              />
              <span v-else class="text-xs text-gray-400">No image</span>
            </td>
            <td class="px-4 py-3 text-sm font-medium">{{ banner.title }}</td>
            <td class="max-w-[260px] truncate px-4 py-3 text-sm text-gray-600">{{ banner.description }}</td>
            <td class="px-4 py-3 text-sm">
              <span class="text-blue-600">{{ banner.cta_text }}</span>
              <br />
              <span class="text-xs text-gray-400">→ {{ banner.cta_link }}</span>
            </td>
            <td class="px-4 py-3">
              <span
                :class="
                  banner.is_active
                    ? 'rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700'
                    : 'rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700'
                "
              >
                {{ banner.is_active ? 'Visible' : 'Hidden' }}
              </span>
            </td>
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button
                  @click="toggleBannerStatus(banner)"
                  :class="
                    banner.is_active
                      ? 'text-sm font-medium text-amber-600 hover:text-amber-800'
                      : 'text-sm font-medium text-emerald-600 hover:text-emerald-800'
                  "
                >
                  {{ banner.is_active ? 'Hide' : 'Show' }}
                </button>
                <button @click="openModal(banner)" class="text-sm font-medium text-blue-600 hover:text-blue-800">
                  Edit
                </button>
                <button @click="deleteBanner(banner.id)" class="text-sm font-medium text-red-500 hover:text-red-700">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="banners.length === 0">
            <td colspan="7" class="px-6 py-8 text-center text-gray-500">
              No banners found. Add one to show on homepage.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <h3 class="mb-4 text-lg font-bold">{{ isEditing ? 'Edit Banner' : 'Add Banner' }}</h3>
        <form @submit.prevent="saveBanner" class="space-y-4">
          <div>
            <label class="mb-1 block text-sm font-medium">Title <span class="text-red-500">*</span></label>
            <input
              v-model="form.title"
              required
              class="w-full rounded border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-black"
              placeholder="e.g. ARCHITECTS, DEVELOPERS, PARTNERS AND INVESTORS."
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium">Description <span class="text-red-500">*</span></label>
            <textarea
              v-model="form.description"
              required
              rows="3"
              class="w-full rounded border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-black"
              placeholder="Hero description"
            ></textarea>
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium">Image URL <span class="text-red-500">*</span></label>
            <input
              v-model="form.image_url"
              required
              class="w-full rounded border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-black"
              placeholder="https://..."
            />
            <img
              v-if="form.image_url"
              :src="form.image_url"
              alt="Preview"
              class="mt-2 h-32 w-full rounded border object-cover"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="mb-1 block text-sm font-medium">CTA Button Text <span class="text-red-500">*</span></label>
              <input
                v-model="form.cta_text"
                required
                class="w-full rounded border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-black"
                placeholder="Learn more"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium">CTA Button Link <span class="text-red-500">*</span></label>
              <input
                v-model="form.cta_link"
                required
                class="w-full rounded border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-black"
                placeholder="/about"
              />
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button type="button" @click="showModal = false" class="rounded border px-4 py-2 text-sm font-medium hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="submit"
              class="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-brand"
            >
              {{ isEditing ? 'Update Banner' : 'Save Banner' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import api from '@/services/api'

const banners = ref([])
const showModal = ref(false)
const editingId = ref(null)

const emptyForm = {
  title: '',
  description: '',
  image_url: '',
  cta_text: 'Learn more',
  cta_link: '/about',
}

const form = ref({ ...emptyForm })
const isEditing = computed(() => editingId.value !== null)

const fetchBanners = async () => {
  const res = await api.get('/api/v1/banners/')
  banners.value = res.data
}

const openModal = (banner = null) => {
  if (banner) {
    editingId.value = banner.id
    form.value = {
      title: banner.title ?? '',
      description: banner.description ?? '',
      image_url: banner.image_url ?? '',
      cta_text: banner.cta_text ?? 'Learn more',
      cta_link: banner.cta_link ?? '/about',
    }
  } else {
    editingId.value = null
    form.value = { ...emptyForm }
  }
  showModal.value = true
}

const buildPayload = () => ({
  title: form.value.title.trim(),
  description: form.value.description.trim(),
  image_url: form.value.image_url.trim(),
  cta_text: form.value.cta_text.trim(),
  cta_link: form.value.cta_link.trim(),
})

const saveBanner = async () => {
  const payload = buildPayload()

  if (!payload.title || !payload.description || !payload.image_url || !payload.cta_text || !payload.cta_link) {
    alert('Please fill all required hero banner fields.')
    return
  }

  if (isEditing.value) {
    await api.put(`/api/v1/banners/${editingId.value}`, payload)
  } else {
    await api.post('/api/v1/banners/', payload)
  }

  showModal.value = false
  await fetchBanners()
}

const toggleBannerStatus = async (banner) => {
  await api.put(`/api/v1/banners/${banner.id}`, {
    is_active: !banner.is_active,
  })
  await fetchBanners()
}

const deleteBanner = async (id) => {
  if (!confirm('Are you sure you want to delete this banner?')) return
  await api.delete(`/api/v1/banners/${id}`)
  await fetchBanners()
}

onMounted(fetchBanners)
</script>
