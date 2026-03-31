<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl text-gray-800 font-bold">Homepage Content Settings</h2>
      <button @click="saveSettings" class="bg-black hover:bg-brand text-white font-medium px-5 py-2.5 rounded shadow-sm transition-colors flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        Save All Changes
      </button>
    </div>
    
    <div class="bg-white shadow-sm border border-gray-200 rounded-lg p-8">
      <div v-if="loading" class="text-gray-400">Loading settings...</div>
      <form v-else class="space-y-6">
        
        <h3 class="text-lg font-bold border-b pb-2 mb-4">Hero Section</h3>
        <div class="grid grid-cols-1 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Hero Title</label>
            <input v-model="settingsMap.hero_title" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black outline-none">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Hero Video URL</label>
            <input v-model="settingsMap.hero_video_url" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black outline-none">
          </div>
        </div>

        <h3 class="text-lg font-bold border-b pb-2 mb-4 mt-10">Why Partner With Us (Features)</h3>
        <div class="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-2 gap-6">
          <!-- Feature 1 -->
          <div><label class="block text-sm font-semibold text-gray-700 mb-1">Feature 1 Title</label><input v-model="settingsMap.feature1_title" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-black outline-none"></div>
          <div><label class="block text-sm font-semibold text-gray-700 mb-1">Feature 1 Description</label><textarea v-model="settingsMap.feature1_desc" rows="2" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-black outline-none"></textarea></div>
          
          <!-- Feature 2 -->
          <div><label class="block text-sm font-semibold text-gray-700 mb-1">Feature 2 Title</label><input v-model="settingsMap.feature2_title" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-black outline-none"></div>
          <div><label class="block text-sm font-semibold text-gray-700 mb-1">Feature 2 Description</label><textarea v-model="settingsMap.feature2_desc" rows="2" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-black outline-none"></textarea></div>

          <!-- Feature 3 -->
          <div><label class="block text-sm font-semibold text-gray-700 mb-1">Feature 3 Title</label><input v-model="settingsMap.feature3_title" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-black outline-none"></div>
          <div><label class="block text-sm font-semibold text-gray-700 mb-1">Feature 3 Description</label><textarea v-model="settingsMap.feature3_desc" rows="2" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-black outline-none"></textarea></div>

          <!-- Feature 4 -->
          <div><label class="block text-sm font-semibold text-gray-700 mb-1">Feature 4 Title</label><input v-model="settingsMap.feature4_title" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-black outline-none"></div>
          <div><label class="block text-sm font-semibold text-gray-700 mb-1">Feature 4 Description</label><textarea v-model="settingsMap.feature4_desc" rows="2" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-black outline-none"></textarea></div>
        </div>

        <h3 class="text-lg font-bold border-b pb-2 mb-4 mt-10">Other Sections</h3>
        <div class="grid grid-cols-1 gap-6">
          <div><label class="block text-sm font-semibold text-gray-700 mb-1">Factory Tour Title</label><input v-model="settingsMap.factory_tour_title" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-black outline-none"></div>
          <div><label class="block text-sm font-semibold text-gray-700 mb-1">Partners List (comma separated)</label><input v-model="settingsMap.partners_list" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-black outline-none"></div>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useAuthStore } from '@/store/auth'

const settingsMap = ref({})
const loading = ref(true)
const authStore = useAuthStore()

const fetchSettings = async () => {
  try {
    const res = await api.get('/api/v1/site-settings/')
    const map = {}
    res.data.forEach(item => {
      map[item.key] = item.value
    })
    settingsMap.value = map
  } catch(e) { console.error(e) } finally { loading.value = false }
}

const saveSettings = async () => {
  try {
    const payload = Object.keys(settingsMap.value).map(key => ({
      key, value: settingsMap.value[key]
    }))
    await api.put('/api/v1/site-settings/', payload)
    alert('Settings saved successfully! Homepage content is now updated.')
  } catch(e) {
    console.error(e)
    alert('Failed to save settings')
  }
}

onMounted(() => fetchSettings())
</script>

