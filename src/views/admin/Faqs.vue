<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-800">Manage FAQs</h2>
      <button @click="openModal()" class="bg-black hover:bg-brand text-white px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors">Add FAQ</button>
    </div>
    
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
          <tr>
            <th class="px-6 py-4 border-b">ID</th>
            <th class="px-6 py-4 border-b">Question</th>
            <th class="px-6 py-4 border-b">Status</th>
            <th class="px-6 py-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="faq in faqs" :key="faq.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4 text-sm font-bold text-gray-500">{{ faq.id }}</td>
            <td class="px-6 py-4 font-medium">{{ faq.question }}</td>
            <td class="px-6 py-4 text-gray-500 text-sm">{{ faq.is_active ? 'Active' : 'Hidden' }}</td>
            <td class="px-6 py-4">
              <button @click="openModal(faq)" class="text-indigo-600 hover:text-indigo-800 font-medium text-sm mr-4">Edit</button>
              <button @click="deleteFaq(faq.id)" class="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
            </td>
          </tr>
          <tr v-if="faqs.length === 0">
            <td colspan="4" class="px-6 py-8 text-center text-gray-500">No faqs found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
        <h3 class="text-lg font-bold mb-4">{{ isEditing ? 'Edit FAQ' : 'Add FAQ' }}</h3>
        <form @submit.prevent="saveFaq" class="space-y-4">
          <div><label class="block text-sm font-medium mb-1">Question</label><input v-model="form.question" required class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none" /></div>
          <div><label class="block text-sm font-medium mb-1">Answer</label><textarea v-model="form.answer" required rows="4" class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none"></textarea></div>
          <div class="flex items-center mt-2">
            <input v-model="form.is_active" type="checkbox" id="faq-active" class="w-4 h-4 text-black border-gray-300 rounded focus:ring-black">
            <label for="faq-active" class="ml-2 block text-sm font-semibold text-gray-700">Active (Visible)</label>
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

const faqs = ref([])
const showModal = ref(false)
const isEditing = ref(false)
const form = ref({ id: null, question: '', answer: '', is_active: true })

const fetchFaqs = async () => {
  const res = await api.get('/api/v1/faqs/')
  faqs.value = res.data
}

const openModal = (faq = null) => {
  if (faq) {
    isEditing.value = true
    form.value = { ...faq }
  } else {
    isEditing.value = false
    form.value = { id: null, question: '', answer: '', is_active: true }
  }
  showModal.value = true
}

const saveFaq = async () => {
  const payload = { ...form.value }
  delete payload.id
  if (isEditing.value) {
    await api.put(`/api/v1/faqs/${form.value.id}`, payload)
  } else {
    await api.post('/api/v1/faqs/', payload)
  }
  showModal.value = false
  fetchFaqs()
}

const deleteFaq = async (id) => {
  if(!confirm('Delete this faq?')) return
  await api.delete(`/api/v1/faqs/${id}`)
  fetchFaqs()
}

onMounted(fetchFaqs)
</script>
