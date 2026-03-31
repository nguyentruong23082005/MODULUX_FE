<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-800">Email Subscribers</h2>
    </div>
    
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
          <tr>
            <th class="px-6 py-4 border-b">ID</th>
            <th class="px-6 py-4 border-b">Email</th>
            <th class="px-6 py-4 border-b">Source</th>
            <th class="px-6 py-4 border-b">Created At</th>
            <th class="px-6 py-4 border-b text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sub in subscribers" :key="sub.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4 text-sm font-bold text-gray-500">{{ sub.id }}</td>
            <td class="px-6 py-4 font-medium">{{ sub.email }}</td>
            <td class="px-6 py-4 text-gray-500 text-sm">{{ sub.source || 'Website Footer' }}</td>
            <td class="px-6 py-4 text-gray-500 text-sm">{{ new Date(sub.created_at).toLocaleString() }}</td>
            <td class="px-6 py-4 text-right">
              <button @click="deleteSubscriber(sub.id)" class="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
            </td>
          </tr>
          <tr v-if="subscribers.length === 0">
            <td colspan="5" class="px-6 py-8 text-center text-gray-500">No subscribers found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const subscribers = ref([])

const fetchSubscribers = async () => {
  try {
    const res = await api.get('/api/v1/subscribers/')
    subscribers.value = res.data
  } catch (err) {
    console.error(err)
  }
}

const deleteSubscriber = async (id) => {
  if(!confirm('Are you sure you want to remove this subscriber?')) return
  try {
    await api.delete(`/api/v1/subscribers/${id}`)
    fetchSubscribers()
  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchSubscribers)
</script>
