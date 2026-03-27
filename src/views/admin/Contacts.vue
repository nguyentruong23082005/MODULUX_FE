<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-800">Customer Enquiries</h2>
    </div>
    
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div v-if="contacts.length === 0" class="p-8 text-center text-gray-500 font-medium">No messages found.</div>
      <div v-else class="divide-y divide-gray-100">
        <div v-for="contact in contacts" :key="contact.id" class="p-6 hover:bg-gray-50 transition-colors">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="text-[15px] font-bold text-black">{{ contact.email }}</h3>
              <p class="text-xs text-gray-500 font-medium tracking-wide mt-1">{{ contact.phone }} • Found us via: {{ contact.source || 'Unknown' }}</p>
            </div>
            <span class="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">{{ new Date(contact.created_at).toLocaleString() }}</span>
          </div>
          <p class="mt-4 text-sm text-gray-700 bg-gray-50 border border-gray-100 p-4 rounded-md">{{ contact.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useAuthStore } from '@/store/auth'

const contacts = ref([])
const auth = useAuthStore()

const fetchContacts = async () => {
  const res = await api.get('/api/v1/contacts/')
  contacts.value = res.data
}

onMounted(fetchContacts)
</script>

