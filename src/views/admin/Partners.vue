<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-800">Manage Partners</h2>
      <button @click="openModal()" class="bg-black hover:bg-brand text-white px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors">Add Partner</button>
    </div>
    
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
          <tr>
            <th class="px-6 py-4 border-b">Order</th>
            <th class="px-6 py-4 border-b">Name</th>
            <th class="px-6 py-4 border-b">Logo preview</th>
            <th class="px-6 py-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="partner in partners" :key="partner.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4 text-sm font-bold text-gray-500">{{ partner.order }}</td>
            <td class="px-6 py-4 font-medium">{{ partner.name }}</td>
            <td class="px-6 py-4"><img v-if="partner.logo_url" :src="partner.logo_url" class="h-8 object-contain" /><span v-else class="text-xs text-gray-400">No logo</span></td>
            <td class="px-6 py-4">
              <button @click="deletePartner(partner.id)" class="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
            </td>
          </tr>
          <tr v-if="partners.length === 0">
            <td colspan="4" class="px-6 py-8 text-center text-gray-500">No partners found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h3 class="text-lg font-bold mb-4">Add Partner</h3>
        <form @submit.prevent="savePartner" class="space-y-4">
          <div><label class="block text-sm font-medium mb-1">Company Name</label><input v-model="form.name" required class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none" /></div>
          <div><label class="block text-sm font-medium mb-1">Logo URL (Optional)</label><input v-model="form.logo_url" class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none" /></div>
          <div><label class="block text-sm font-medium mb-1">Order Index (1, 2, 3..)</label><input type="number" v-model="form.order" class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-black outline-none" /></div>
          
          <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <button type="button" @click="showModal = false" class="px-4 py-2 border rounded hover:bg-gray-50 font-medium text-sm">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-black text-white rounded hover:bg-brand font-medium text-sm">Save Partner</button>
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

const partners = ref([])
const showModal = ref(false)
const form = ref({ name: '', logo_url: '', order: 0 })
const auth = useAuthStore()

const fetchPartners = async () => {
  const res = await api.get('/api/v1/partners/')
  partners.value = res.data
}

const openModal = () => {
  form.value = { name: '', logo_url: '', order: partners.value.length + 1 }
  showModal.value = true
}

const savePartner = async () => {
  await api.post('/api/v1/partners/', form.value)
  showModal.value = false
  fetchPartners()
}

const deletePartner = async (id) => {
  if(!confirm('Are you sure you want to delete this partner?')) return
  await api.delete(`/api/v1/partners/${id}`)
  fetchPartners()
}

onMounted(fetchPartners)
</script>

