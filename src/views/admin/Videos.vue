<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-800">Manage Videos</h2>
      <button @click="openModal()" class="bg-black hover:bg-brand text-white px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors">Add Video</button>
    </div>
    
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
          <tr>
            <th class="px-6 py-4 border-b w-32">Preview</th>
            <th class="px-6 py-4 border-b">Title</th>
            <th class="px-6 py-4 border-b">YouTube ID</th>
            <th class="px-6 py-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="video in videos" :key="video.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4">
              <img :src="'https://img.youtube.com/vi/' + video.youtube_id + '/hqdefault.jpg'" class="w-24 h-16 object-cover rounded shadow" />
            </td>
            <td class="px-6 py-4 font-medium">{{ video.title }}<div class="text-xs text-gray-500 font-normal mt-1">{{ video.description }}</div></td>
            <td class="px-6 py-4 text-gray-500 text-sm">{{ video.youtube_id }}</td>
            <td class="px-6 py-4">
              <button @click="openModal(video)" class="text-indigo-600 hover:text-indigo-800 font-medium text-sm mr-4">Edit</button>
              <button @click="deleteVideo(video.id)" class="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
            </td>
          </tr>
          <tr v-if="videos.length === 0">
            <td colspan="4" class="px-6 py-8 text-center text-gray-500">No videos found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h3 class="text-lg font-bold mb-4">{{ isEditing ? 'Edit Video' : 'Add Video' }}</h3>
        <form @submit.prevent="saveVideo" class="space-y-4">
          <div><label class="block text-sm font-medium mb-1">Title</label><input v-model="form.title" required class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none" /></div>
          <div><label class="block text-sm font-medium mb-1">YouTube ID</label><input v-model="form.youtube_id" required placeholder="e.g. dQw4w9WgXcQ" class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none" /></div>
          <div><label class="block text-sm font-medium mb-1">Description</label><textarea v-model="form.description" rows="3" class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none"></textarea></div>
          <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <button type="button" @click="showModal = false" class="px-4 py-2 border rounded hover:bg-gray-50 font-medium text-sm">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-black text-white rounded hover:bg-brand font-medium text-sm">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const videos = ref([])
const showModal = ref(false)
const isEditing = ref(false)
const form = ref({ id: null, title: '', youtube_id: '', description: '' })

const fetchVideos = async () => {
  const res = await api.get('/api/v1/videos/')
  videos.value = res.data
}

const openModal = (video = null) => {
  if (video) {
    isEditing.value = true
    form.value = { ...video }
  } else {
    isEditing.value = false
    form.value = { id: null, title: '', youtube_id: '', description: '' }
  }
  showModal.value = true
}

const saveVideo = async () => {
  const payload = { ...form.value }
  delete payload.id
  if (isEditing.value) {
    await api.put(`/api/v1/videos/${form.value.id}`, payload)
  } else {
    await api.post('/api/v1/videos/', payload)
  }
  showModal.value = false
  fetchVideos()
}

const deleteVideo = async (id) => {
  if(!confirm('Delete this video?')) return
  await api.delete(`/api/v1/videos/${id}`)
  fetchVideos()
}

onMounted(fetchVideos)
</script>
