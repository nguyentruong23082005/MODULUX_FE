<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-800">Manage Features</h2>
      <button @click="openModal()" class="bg-black hover:bg-brand text-white px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors">Add Feature</button>
    </div>
    
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
          <tr>
            <th class="px-6 py-4 border-b">Order</th>
            <th class="px-6 py-4 border-b">Icon</th>
            <th class="px-6 py-4 border-b">Title</th>
            <th class="px-6 py-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="feature in features" :key="feature.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4 text-sm font-bold text-gray-500">{{ feature.order }}</td>
            <td class="px-6 py-4"><img :src="feature.icon_url" class="w-8 h-8 object-contain" /></td>
            <td class="px-6 py-4 font-medium">{{ feature.title }}<div class="font-normal text-xs text-gray-500 mt-1 truncate max-w-sm">{{ feature.description }}</div></td>
            <td class="px-6 py-4">
              <button @click="deleteFeature(feature.id)" class="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
            </td>
          </tr>
          <tr v-if="features.length === 0">
            <td colspan="4" class="px-6 py-8 text-center text-gray-500">No features found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h3 class="text-lg font-bold mb-4">Add Feature</h3>
        <form @submit.prevent="saveFeature" class="space-y-4">
          <div><label class="block text-sm font-medium mb-1">Title</label><input v-model="form.title" required class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none" /></div>
          <div><label class="block text-sm font-medium mb-1">Description</label><textarea v-model="form.description" rows="2" class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none"></textarea></div>
          <div><label class="block text-sm font-medium mb-1">Icon URL (SVG/PNG)</label><input v-model="form.icon_url" class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none" /></div>
          <div><label class="block text-sm font-medium mb-1">Order Index (1, 2, 3..)</label><input type="number" v-model="form.order" class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none" /></div>
          
          <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <button type="button" @click="showModal = false" class="px-4 py-2 border rounded hover:bg-gray-50 font-medium text-sm">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-black text-white rounded hover:bg-brand font-medium text-sm">Save Feature</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useAuthStore } from '@/store/auth'

const features = ref([])
const showModal = ref(false)
const form = ref({ title: '', description: '', icon_url: '', order: 0 })
const auth = useAuthStore()

const fetchFeatures = async () => {
  const res = await api.get('/api/v1/core-features/')
  features.value = res.data
}

const openModal = () => {
  form.value = { title: '', description: '', icon_url: '', order: features.value.length + 1 }
  showModal.value = true
}

const saveFeature = async () => {
  await api.post('/api/v1/core-features/', form.value)
  showModal.value = false
  fetchFeatures()
}

const deleteFeature = async (id) => {
  if(!confirm('Are you sure you want to delete this feature?')) return
  await api.delete(`/api/v1/core-features/${id}`)
  fetchFeatures()
}

onMounted(fetchFeatures)
</script>

