<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-800">Manage Static Pages</h2>
      <button @click="openModal()" class="bg-black hover:bg-brand text-white px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors">Add Page</button>
    </div>
    
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
          <tr>
            <th class="px-6 py-4 border-b">ID</th>
            <th class="px-6 py-4 border-b">Title</th>
            <th class="px-6 py-4 border-b">Slug</th>
            <th class="px-6 py-4 border-b">Sections</th>
            <th class="px-6 py-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="page in pages" :key="page.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4 text-sm font-bold text-gray-500">{{ page.id }}</td>
            <td class="px-6 py-4 font-medium">{{ page.title }}</td>
            <td class="px-6 py-4 text-gray-500 text-sm">{{ page.slug }}</td>
            <td class="px-6 py-4">
              <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                {{ page.sections?.length || 0 }} sections
              </span>
            </td>
            <td class="px-6 py-4">
              <button @click="openModal(page)" class="text-indigo-600 hover:text-indigo-800 font-medium text-sm mr-4">Edit</button>
              <button @click="deletePage(page.id)" class="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal (Full Page / Section Editor) -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        <!-- Modal Header with Tabs -->
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h3 class="text-lg font-bold text-gray-900">{{ isEditing ? 'Edit Page: ' + form.title : 'Add New Page' }}</h3>
          </div>
          <div class="flex bg-gray-200 p-1 rounded-lg">
            <button 
              @click="activeTab = 'basic'"
              :class="['px-4 py-1.5 text-xs font-bold rounded-md transition-all', activeTab === 'basic' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700']"
            >BASIC INFO</button>
            <button 
              v-if="isEditing"
              @click="activeTab = 'sections'"
              :class="['px-4 py-1.5 text-xs font-bold rounded-md transition-all', activeTab === 'sections' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700']"
            >PAGE SECTIONS</button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="flex-1 overflow-y-auto p-6">
          
          <!-- TAB 1: BASIC INFO -->
          <div v-if="activeTab === 'basic'" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-1">
                <label class="text-xs font-bold text-gray-500 uppercase">Page Title</label>
                <input v-model="form.title" required class="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none transition-all" placeholder="e.g. About Us" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold text-gray-500 uppercase">Slug (URL)</label>
                <input v-model="form.slug" required class="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none transition-all" placeholder="e.g. about" />
              </div>
            </div>
            
            <div class="space-y-1">
              <label class="text-xs font-bold text-gray-500 uppercase">Legacy Content (Optional)</label>
              <textarea v-model="form.content" rows="4" class="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none transition-all" placeholder="HTML content if not using sections..."></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
              <div class="space-y-1">
                <label class="text-xs font-bold text-gray-500 uppercase">Meta Title (SEO)</label>
                <input v-model="form.meta_title" class="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none transition-all" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-bold text-gray-500 uppercase">Meta Description (SEO)</label>
                <input v-model="form.meta_description" class="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none transition-all" />
              </div>
            </div>
          </div>

          <!-- TAB 2: SECTIONS MANAGER -->
          <div v-else-if="activeTab === 'sections'" class="space-y-8">
            <div class="flex justify-between items-center">
              <p class="text-sm text-gray-500 italic">Manage visual blocks for the {{ form.slug }} page.</p>
              <button @click="addNewSection" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                <span>+ ADD NEW SECTION</span>
              </button>
            </div>

            <div v-for="(sec, idx) in form.sections" :key="sec.id || idx" class="bg-gray-50 border border-gray-200 rounded-xl p-5 relative group transition-all hover:border-gray-300">
              <div class="absolute -top-3 -right-3 hidden group-hover:block">
                <button @click="removeSection(idx, sec.id)" class="bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>

              <div class="grid grid-cols-12 gap-5">
                <div class="col-span-3">
                  <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Type</label>
                  <select v-model="sec.section_type" class="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="hero">Hero (Badge Right)</option>
                    <option value="intro_asymmetric">Intro (Blue Sidebar)</option>
                    <option value="statistics">Statistics (Numbers)</option>
                    <option value="full_width_image">Full Width Image</option>
                    <option value="projects_asymmetric">Featured Projects</option>
                  </select>
                </div>
                <div class="col-span-1">
                  <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Order</label>
                  <input v-model.number="sec.display_order" type="number" class="w-full border border-gray-200 rounded-lg p-2.5 text-sm" />
                </div>
                <div class="col-span-4">
                  <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Title</label>
                  <input v-model="sec.title" class="w-full border border-gray-200 rounded-lg p-2.5 text-sm" />
                </div>
                <div class="col-span-4">
                  <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Image URL / Upload</label>
                  <div class="flex gap-2">
                    <input v-model="sec.image_url" class="flex-1 border border-gray-200 rounded-lg p-2.5 text-sm" placeholder="/images/..." />
                    <button 
                      type="button" 
                      @click="triggerFileUpload(idx)"
                      class="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-1 rounded text-xs font-bold transition-colors whitespace-nowrap"
                    >
                      <span v-if="uploadingIdx === idx">...</span>
                      <span v-else>UPLOAD</span>
                    </button>
                    <!-- Hidden file input for each section -->
                    <input type="file" :ref="el => sectionFileInputs[idx] = el" class="hidden" accept="image/*" @change="e => handleSectionFileUpload(e, idx)" />
                  </div>
                </div>
                
                <div class="col-span-12">
                  <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Content / Subtitle</label>
                  <textarea v-model="sec.content" rows="3" class="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none" placeholder="HTML or Plain text..."></textarea>
                </div>
              </div>
              
              <div class="mt-3 flex justify-end">
                <button 
                  @click="saveSection(sec, idx)" 
                  class="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest"
                  :disabled="pendingSectionSave === idx"
                >
                  {{ pendingSectionSave === idx ? 'Saving...' : (sec.id ? 'Update Component' : 'Save as New Component') }}
                </button>
              </div>
            </div>

            <div v-if="form.sections?.length === 0" class="text-center py-10 border-2 border-dashed border-gray-100 rounded-xl">
              <p class="text-gray-400">No custom sections defined for this page yet.</p>
            </div>
          </div>

        </div>

        <!-- Sticky Footer -->
        <div class="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button type="button" @click="showModal = false" class="px-5 py-2 border rounded-lg hover:bg-gray-100 font-bold text-sm text-gray-600">CLOSE</button>
          <button @click="savePage" class="px-8 py-2 bg-black text-white rounded-lg hover:bg-brand font-bold text-sm shadow-lg">
            {{ isEditing ? 'UPDATE PAGE INFO' : 'CREATE PAGE' }}
          </button>
        </div>
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
const activeTab = ref('basic')
const pendingSectionSave = ref(null)
const uploadingIdx = ref(null)
const sectionFileInputs = ref([])

const form = ref({ 
  id: null, 
  title: '', 
  slug: '', 
  content: '', 
  meta_title: '', 
  meta_description: '',
  sections: [] 
})

const fetchPages = async () => {
  try {
    const res = await api.get('/api/v1/pages/')
    pages.value = res.data
  } catch (err) {
    console.error('Fetch pages failed', err)
  }
}

const openModal = (page = null) => {
  activeTab.value = 'basic'
  sectionFileInputs.value = []
  if (page) {
    isEditing.value = true
    form.value = JSON.parse(JSON.stringify(page)) // Deep clone
  } else {
    isEditing.value = false
    form.value = { 
      id: null, title: '', slug: '', content: '', meta_title: '', meta_description: '',
      sections: [] 
    }
  }
  showModal.value = true
}

const savePage = async () => {
  const payload = { ...form.value }
  const pageId = payload.id
  delete payload.id
  delete payload.sections 

  try {
    if (isEditing.value) {
      await api.put(`/api/v1/pages/${pageId}`, payload)
    } else {
      await api.post('/api/v1/pages/', payload)
    }
    if (!isEditing.value) {
      await fetchPages()
      const newPage = pages.value.find(p => p.slug === payload.slug)
      if (newPage) openModal(newPage)
    } else {
      showModal.value = false
      fetchPages()
    }
  } catch (err) {
    alert('Failed to save page')
  }
}

/** Section Management **/

const addNewSection = () => {
  form.value.sections.push({
    section_type: 'hero',
    title: '',
    subtitle: '',
    content: '',
    image_url: '',
    display_order: form.value.sections.length + 1
  })
}

const triggerFileUpload = (idx) => {
  if (sectionFileInputs.value[idx]) {
    sectionFileInputs.value[idx].click()
  }
}

const handleSectionFileUpload = async (e, idx) => {
  const file = e.target.files[0]
  if (!file) return
  
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    uploadingIdx.value = idx
    const res = await api.post('/api/v1/pages/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    // Prefer relative_url for consistency with media/ static serving
    form.value.sections[idx].image_url = res.data.relative_url || res.data.url
  } catch (err) {
    alert('Upload failed: ' + (err.response?.data?.detail || err.message))
  } finally {
    uploadingIdx.value = null
    e.target.value = ''
  }
}

const saveSection = async (sec, idx) => {
  pendingSectionSave.value = idx
  try {
    const payload = { ...sec }
    const sectionId = payload.id
    delete payload.id
    delete payload.page_id

    if (sectionId) {
      const res = await api.put(`/api/v1/pages/sections/${sectionId}`, payload)
      form.value.sections[idx] = res.data
    } else {
      const res = await api.post(`/api/v1/pages/${form.value.id}/sections`, payload)
      form.value.sections[idx] = res.data
    }
    alert('Section updated successfully!')
  } catch (err) {
    alert('Failed to save section')
  } finally {
    pendingSectionSave.value = null
  }
}

const removeSection = async (idx, sectionId) => {
  if (!confirm('Are you sure you want to delete this section?')) return
  if (sectionId) {
    try {
      await api.delete(`/api/v1/pages/sections/${sectionId}`)
    } catch (err) {
      alert('Delete failed')
      return
    }
  }
  form.value.sections.splice(idx, 1)
}

const deletePage = async (id) => {
  if(!confirm('Delete this page entirely? All sections will be lost.')) return
  await api.delete(`/api/v1/pages/${id}`)
  fetchPages()
}

onMounted(fetchPages)
</script>

<style scoped>
.bg-brand {
  background-color: #0d6efd;
}
</style>
