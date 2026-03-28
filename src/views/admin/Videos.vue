<template>
  <div>
    <div class="mb-6 flex items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-bold text-gray-800">Manage Videos</h2>
        <p class="mt-1 text-sm text-gray-500">
          Quản lý video hero cho Home và FAQ, bao gồm poster lớn, thumbnail nhỏ và trạng thái hiển thị.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <select
          v-model="locationFilter"
          class="rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:ring-1 focus:ring-black"
          @change="fetchVideos"
        >
          <option value="">All locations</option>
          <option value="home">Home</option>
          <option value="faq">FAQ</option>
          <option value="both">Home + FAQ</option>
        </select>
        <button
          @click="openModal()"
          class="rounded bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand"
        >
          Add Video
        </button>
      </div>
    </div>

    <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table class="w-full border-collapse text-left">
        <thead class="bg-gray-50 text-xs font-semibold uppercase text-gray-700">
          <tr>
            <th class="border-b px-4 py-4">Order</th>
            <th class="border-b px-4 py-4">Preview</th>
            <th class="border-b px-4 py-4">Content</th>
            <th class="border-b px-4 py-4">Links</th>
            <th class="border-b px-4 py-4">Status</th>
            <th class="border-b px-4 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="video in videos" :key="video.id" class="border-b align-top hover:bg-gray-50">
            <td class="px-4 py-4 text-sm font-semibold text-gray-500">
              #{{ video.display_order ?? '-' }}
            </td>
            <td class="px-4 py-4">
              <div class="grid w-52 gap-2">
                <div>
                  <p class="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                    Poster
                  </p>
                  <img
                    :src="video.poster_url || video.thumbnail_url || fallbackPoster"
                    :alt="video.title || 'Video poster'"
                    class="h-24 w-full rounded-lg object-cover"
                  />
                </div>
                <div>
                  <p class="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                    Thumbnail
                  </p>
                  <img
                    :src="video.thumbnail_url || video.poster_url || fallbackPoster"
                    :alt="video.thumbnail_label || video.title || 'Thumbnail'"
                    class="h-16 w-full rounded-lg object-cover"
                  />
                </div>
              </div>
            </td>
            <td class="max-w-[320px] px-4 py-4">
              <p class="text-sm font-semibold text-gray-800">{{ video.title || 'Untitled video' }}</p>
              <p class="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-gray-400">
                {{ locationLabel(video.location) }}
              </p>
              <p class="mt-1 text-xs text-gray-500">{{ video.thumbnail_label || 'No thumbnail label' }}</p>
            </td>
            <td class="max-w-[360px] px-4 py-4 text-xs text-gray-500">
              <p class="line-clamp-2 break-all">
                <span class="font-semibold text-gray-700">Video:</span>
                {{ video.video_url }}
              </p>
              <p class="mt-2 line-clamp-2 break-all">
                <span class="font-semibold text-gray-700">Poster:</span>
                {{ video.poster_url || '—' }}
              </p>
              <p class="mt-2 line-clamp-2 break-all">
                <span class="font-semibold text-gray-700">Thumbnail:</span>
                {{ video.thumbnail_url || '—' }}
              </p>
            </td>
            <td class="px-4 py-4">
              <span
                :class="
                  video.is_active
                    ? 'rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700'
                    : 'rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700'
                "
              >
                {{ video.is_active ? 'Visible' : 'Hidden' }}
              </span>
            </td>
            <td class="px-4 py-4">
              <div class="flex flex-col items-start gap-2">
                <button
                  @click="toggleVideoStatus(video)"
                  :class="
                    video.is_active
                      ? 'text-sm font-medium text-amber-600 hover:text-amber-800'
                      : 'text-sm font-medium text-emerald-600 hover:text-emerald-800'
                  "
                >
                  {{ video.is_active ? 'Hide' : 'Show' }}
                </button>
                <button
                  @click="openModal(video)"
                  class="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  @click="deleteVideo(video.id)"
                  class="text-sm font-medium text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="videos.length === 0">
            <td colspan="6" class="px-6 py-8 text-center text-gray-500">
              No videos found for this location filter.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div class="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <h3 class="mb-4 text-lg font-bold">{{ isEditing ? 'Edit Video' : 'Add Video' }}</h3>
        <form @submit.prevent="saveVideo" class="space-y-5">
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="mb-1 block text-sm font-medium">
                Title <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.title"
                required
                class="w-full rounded border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-black"
                placeholder="A Tour of Modulux Homes' Cutting-Edge Factory"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium">
                Location <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.location"
                required
                class="w-full rounded border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-black"
              >
                <option value="home">Home</option>
                <option value="faq">FAQ</option>
                <option value="both">Home + FAQ</option>
              </select>
            </div>
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium">
              Thumbnail Label <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.thumbnail_label"
              required
              class="w-full rounded border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-black"
              placeholder="Factory Tour"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium">
              Video URL <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.video_url"
              required
              class="w-full rounded border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-black"
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p class="mt-1 text-xs text-gray-400">
              Hỗ trợ link YouTube watch, share, embed hoặc shorts.
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="mb-1 block text-sm font-medium">
                Poster URL <span class="text-red-500">*</span>
              </label>
              <div class="flex gap-2">
                <input
                  v-model="form.poster_url"
                  required
                  class="w-full rounded border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-black"
                  placeholder="/images/home/anhVD/tronganhchuavideo.webp"
                />
                <button
                  type="button"
                  class="shrink-0 rounded border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                  :disabled="uploading.poster"
                  @click="triggerFileSelect('poster')"
                >
                  {{ uploading.poster ? 'Uploading...' : 'Chọn file' }}
                </button>
              </div>
              <input
                ref="posterFileInput"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/avif"
                class="hidden"
                @change="handleFileChange($event, 'poster')"
              />
              <p class="mt-1 text-xs text-gray-400">
                Chọn ảnh từ máy tính để upload tự động hoặc nhập URL thủ công.
              </p>
              <p v-if="uploadErrors.poster" class="mt-1 text-xs text-red-500">{{ uploadErrors.poster }}</p>
              <img
                v-if="form.poster_url"
                :src="form.poster_url"
                alt="Poster preview"
                class="mt-2 h-32 w-full rounded border object-cover"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium">
                Thumbnail URL <span class="text-red-500">*</span>
              </label>
              <div class="flex gap-2">
                <input
                  v-model="form.thumbnail_url"
                  required
                  class="w-full rounded border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-black"
                  placeholder="/images/home/anhVD/anhVD1.jpg"
                />
                <button
                  type="button"
                  class="shrink-0 rounded border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                  :disabled="uploading.thumbnail"
                  @click="triggerFileSelect('thumbnail')"
                >
                  {{ uploading.thumbnail ? 'Uploading...' : 'Chọn file' }}
                </button>
              </div>
              <input
                ref="thumbnailFileInput"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/avif"
                class="hidden"
                @change="handleFileChange($event, 'thumbnail')"
              />
              <p class="mt-1 text-xs text-gray-400">
                Dùng ảnh nhỏ riêng cho card thumbnail để giao diện đẹp và cân đối hơn.
              </p>
              <p v-if="uploadErrors.thumbnail" class="mt-1 text-xs text-red-500">{{ uploadErrors.thumbnail }}</p>
              <img
                v-if="form.thumbnail_url"
                :src="form.thumbnail_url"
                alt="Thumbnail preview"
                class="mt-2 h-24 w-full rounded border object-cover"
              />
            </div>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="mb-1 block text-sm font-medium">Display Order</label>
              <input
                v-model.number="form.display_order"
                type="number"
                min="1"
                class="w-full rounded border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-black"
                placeholder="1"
              />
            </div>

            <div class="flex items-end">
              <label class="inline-flex items-center gap-3 rounded border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700">
                <input v-model="form.is_active" type="checkbox" class="h-4 w-4 rounded border-gray-300" />
                Hiển thị video trên frontend
              </label>
            </div>
          </div>

          <div class="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p class="text-sm font-semibold text-gray-800">Preview data</p>
            <div class="mt-3 grid gap-4 md:grid-cols-[1.4fr_1fr]">
              <img
                :src="form.poster_url || form.thumbnail_url || fallbackPoster"
                alt="Hero preview"
                class="h-40 w-full rounded-xl object-cover"
              />
              <div class="space-y-2 rounded-xl bg-white p-4 shadow-sm">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Thumbnail card</p>
                <img
                  :src="form.thumbnail_url || form.poster_url || fallbackPoster"
                  alt="Thumb preview"
                  class="h-20 w-full rounded-lg object-cover"
                />
                <p class="text-sm font-semibold text-gray-800">{{ form.thumbnail_label || 'Thumbnail label' }}</p>
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              @click="showModal = false"
              class="rounded border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-brand disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="uploading.poster || uploading.thumbnail"
            >
              {{ isEditing ? 'Update Video' : 'Save Video' }}
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

const fallbackPoster = '/images/home/anhVD/tronganhchuavideo.webp'
const locationFilter = ref('')
const VIDEO_LOCATION_LABELS = {
  home: 'Home',
  faq: 'FAQ',
  both: 'Home + FAQ',
}

const videos = ref([])
const showModal = ref(false)
const editingId = ref(null)
const posterFileInput = ref(null)
const thumbnailFileInput = ref(null)

const uploading = ref({
  poster: false,
  thumbnail: false,
})

const uploadErrors = ref({
  poster: '',
  thumbnail: '',
})

const emptyForm = {
  location: 'home',
  title: '',
  video_url: '',
  thumbnail_url: '',
  poster_url: fallbackPoster,
  thumbnail_label: '',
  display_order: 1,
  is_active: true,
}

const form = ref({ ...emptyForm })
const isEditing = computed(() => editingId.value !== null)
const locationLabel = (location) => VIDEO_LOCATION_LABELS[location] || (location || 'Unknown')

const resetUploadState = () => {
  uploading.value = {
    poster: false,
    thumbnail: false,
  }
  uploadErrors.value = {
    poster: '',
    thumbnail: '',
  }
}

const fetchVideos = async () => {
  const params = {}
  if (locationFilter.value) {
    params.location = locationFilter.value
  }
  const res = await api.get('/api/v1/videos/admin', { params })
  videos.value = res.data
}

const openModal = (video = null) => {
  resetUploadState()

  if (video) {
    editingId.value = video.id
    form.value = {
      location: video.location ?? 'home',
      title: video.title ?? '',
      video_url: video.video_url ?? '',
      thumbnail_url: video.thumbnail_url ?? '',
      poster_url: video.poster_url ?? video.thumbnail_url ?? fallbackPoster,
      thumbnail_label: video.thumbnail_label ?? video.title ?? '',
      display_order: video.display_order ?? 1,
      is_active: Boolean(video.is_active),
    }
  } else {
    editingId.value = null
    form.value = {
      ...emptyForm,
      display_order: videos.value.length + 1,
    }
  }

  showModal.value = true
}

const buildPayload = () => ({
  location: form.value.location || 'home',
  title: form.value.title.trim(),
  video_url: form.value.video_url.trim(),
  thumbnail_url: form.value.thumbnail_url.trim(),
  poster_url: form.value.poster_url.trim(),
  thumbnail_label: form.value.thumbnail_label.trim(),
  display_order: Number(form.value.display_order) || 1,
  is_active: Boolean(form.value.is_active),
})

const triggerFileSelect = (kind) => {
  if (kind === 'poster') {
    posterFileInput.value?.click()
    return
  }

  thumbnailFileInput.value?.click()
}

const uploadImage = async (file, kind) => {
  const body = new FormData()
  body.append('file', file)

  const response = await api.post(`/api/v1/videos/upload-image?kind=${kind}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

const handleFileChange = async (event, kind) => {
  const [file] = event.target.files || []
  event.target.value = ''

  if (!file) return

  uploadErrors.value[kind] = ''
  uploading.value[kind] = true

  try {
    const uploaded = await uploadImage(file, kind)

    if (kind === 'poster') {
      form.value.poster_url = uploaded.url
    } else {
      form.value.thumbnail_url = uploaded.url
    }
  } catch (error) {
    uploadErrors.value[kind] = error.response?.data?.detail || 'Upload ảnh thất bại. Vui lòng thử lại.'
  } finally {
    uploading.value[kind] = false
  }
}

const saveVideo = async () => {
  const payload = buildPayload()

  if (!payload.title || !payload.video_url || !payload.thumbnail_url || !payload.poster_url || !payload.thumbnail_label) {
    alert('Vui lòng nhập đầy đủ title, video URL, poster URL, thumbnail URL và thumbnail label.')
    return
  }

  if (isEditing.value) {
    await api.put(`/api/v1/videos/${editingId.value}`, payload)
  } else {
    await api.post('/api/v1/videos/', payload)
  }

  showModal.value = false
  await fetchVideos()
}

const toggleVideoStatus = async (video) => {
  await api.put(`/api/v1/videos/${video.id}`, {
    is_active: !video.is_active,
  })
  await fetchVideos()
}

const deleteVideo = async (id) => {
  if (!confirm('Bạn có chắc muốn xoá video này không?')) return
  await api.delete(`/api/v1/videos/${id}`)
  await fetchVideos()
}

onMounted(fetchVideos)
</script>
