<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-800">Manage Static Pages</h2>
      <button @click="openModal()" class="bg-black hover:bg-brand text-white px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors">Add Page</button>
    </div>
    
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
          <tr>
            <th class="px-6 py-4 border-b">ID</th>
            <th class="px-6 py-4 border-b">Title</th>
            <th class="px-6 py-4 border-b">Slug</th>
            <th class="px-6 py-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="page in pages" :key="page.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4 text-sm font-bold text-gray-500">{{ page.id }}</td>
            <td class="px-6 py-4 font-medium">{{ page.title }}</td>
            <td class="px-6 py-4 text-gray-500 text-sm">{{ page.slug }}</td>
            <td class="px-6 py-4">
              <button @click="openModal(page)" class="text-indigo-600 hover:text-indigo-800 font-medium text-sm mr-4">Edit</button>
              <button @click="deletePage(page.id)" class="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
            </td>
          </tr>
          <tr v-if="pages.length === 0">
            <td colspan="4" class="px-6 py-8 text-center text-gray-500">No pages found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <h3 class="text-lg font-bold mb-4">{{ isEditing ? 'Edit Page' : 'Add Page' }}</h3>
        <form @submit.prevent="savePage" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div><label class="block text-sm font-medium mb-1">Title</label><input v-model="form.title" required class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none" /></div>
            <div><label class="block text-sm font-medium mb-1">Slug</label><input v-model="form.slug" required class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none" /></div>
            <div class="col-span-2"><label class="block text-sm font-medium mb-1">Content</label><textarea v-model="form.content" rows="6" class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none"></textarea></div>
            <div><label class="block text-sm font-medium mb-1">Meta Title</label><input v-model="form.meta_title" class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none" /></div>
            <div><label class="block text-sm font-medium mb-1">Meta Description</label><input v-model="form.meta_description" class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none" /></div>
          </div>
          
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

const pages = ref([])
const showModal = ref(false)
const isEditing = ref(false)
const form = ref({ id: null, title: '', slug: '', content: '', meta_title: '', meta_description: '' })

const fetchPages = async () => {
  const res = await api.get('/api/v1/pages/')
  pages.value = res.data
}

const openModal = (page = null) => {
  if (page) {
    isEditing.value = true
    form.value = { ...page }
  } else {
    isEditing.value = false
    form.value = { id: null, title: '', slug: '', content: '', meta_title: '', meta_description: '' }
  }
  showModal.value = true
}

const savePage = async () => {
  const payload = { ...form.value }
  delete payload.id
  if (isEditing.value) {
    await api.put(`/api/v1/pages/${form.value.id}`, payload)
  } else {
    await api.post('/api/v1/pages/', payload)
  }
  showModal.value = false
  fetchPages()
}

const deletePage = async (id) => {
  if(!confirm('Delete this page?')) return
  await api.delete(`/api/v1/pages/${id}`)
  fetchPages()
}

onMounted(fetchPages)
</script>
