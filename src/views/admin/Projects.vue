<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl text-gray-800 font-bold">Manage Your Modular House Portfolio</h2>
      <button @click="openModal()" class="bg-black hover:bg-brand text-white font-medium px-5 py-2.5 rounded shadow-sm transition-colors flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        Add New Project
      </button>
    </div>
    
    <div class="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Name</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Area (sqft)</th>
            <th class="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="project in projects" :key="project.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{{ project.title }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ project.location || 'N/A' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ project.area_sqft || '0' }} sqft</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="openModal(project)" class="text-indigo-600 hover:text-indigo-900 mr-4 font-bold">Edit</button>
              <button @click="deleteProject(project.id)" class="text-red-600 hover:text-red-900 font-bold">Delete</button>
            </td>
          </tr>
          <tr v-if="projects.length === 0">
            <td colspan="4" class="px-6 py-12 text-center text-gray-500">
              <svg class="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              No projects found. Add one to get started.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Form -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 class="text-xl font-bold text-gray-900">{{ isEditing ? 'Edit Project' : 'Add New Project' }}</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-900 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <form @submit.prevent="saveProject" class="p-6 space-y-5">
          <div class="grid grid-cols-2 gap-5">
            <div class="col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Project Title *</label>
              <input v-model="form.title" type="text" required class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-1">URL Slug (for SEO) *</label>
              <input v-model="form.slug" type="text" required placeholder="ex: luxury-villa-2026" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Location</label>
              <input v-model="form.location" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Installation Time</label>
              <input v-model="form.installation_time" type="text" placeholder="e.g. 15 Days" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Area (sqft)</label>
              <input v-model="form.area_sqft" type="number" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Stories</label>
              <input v-model="form.stories" type="number" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Bedrooms</label>
              <input v-model="form.bedrooms" type="number" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Bathrooms</label>
              <input v-model="form.bathrooms" type="number" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Kitchens</label>
              <input v-model="form.kitchens" type="number" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Thumbnail URL</label>
              <input v-model="form.thumbnail_url" type="text" placeholder="https://..." class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Floor Plan URL</label>
              <input v-model="form.floor_plan_url" type="text" placeholder="https://..." class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Video URL (YouTube/Vimeo)</label>
              <input v-model="form.video_url" type="text" placeholder="https://..." class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Features (comma-separated)</label>
              <textarea v-model="form.features" rows="2" placeholder="Steel framework, Solar compatibility..." class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none"></textarea>
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Finishing Options (comma-separated)</label>
              <textarea v-model="form.finishing_options" rows="2" placeholder="Custom Roofs, Soundproof Doors..." class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none"></textarea>
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Short Description</label>
              <textarea v-model="form.description" rows="2" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none"></textarea>
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Full Content (HTML allowed)</label>
              <textarea v-model="form.content" rows="4" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none"></textarea>
            </div>
            <div class="col-span-2">
              <hr class="my-4 border-gray-200" />
              <h4 class="font-bold text-gray-800 mb-4">SEO Settings</h4>
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Meta Title</label>
              <input v-model="form.meta_title" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Meta Description</label>
              <textarea v-model="form.meta_description" rows="2" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none"></textarea>
            </div>
            <div class="col-span-2 flex items-center mt-2">
              <input v-model="form.is_featured" type="checkbox" id="featured" class="w-4 h-4 text-black border-gray-300 rounded focus:ring-black">
              <label for="featured" class="ml-2 block text-sm font-semibold text-gray-700">Display as Featured Project</label>
            </div>

            <!-- Image Gallery Section (Only shown when editing) -->
            <div v-if="isEditing" class="col-span-2">
              <hr class="my-4 border-gray-200" />
              <div class="flex justify-between items-center mb-4">
                <h4 class="font-bold text-gray-800">Image Gallery</h4>
              </div>

              <!-- Add New Image -->
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 flex gap-4 items-end">
                <div class="flex-grow">
                  <label class="block text-xs font-semibold text-gray-700 mb-1">New Image URL</label>
                  <input v-model="newImageUrl" type="text" placeholder="https://..." class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none text-sm">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Order</label>
                  <input v-model="newImageOrder" type="number" class="w-20 border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none text-sm">
                </div>
                <div class="flex gap-3 px-2 py-2">
                  <label class="flex items-center text-xs text-gray-600 font-semibold cursor-pointer">
                    <input v-model="newImageHero" type="checkbox" class="mr-1"> Hero
                  </label>
                  <label class="flex items-center text-xs text-gray-600 font-semibold cursor-pointer">
                    <input v-model="newImageFloorPlan" type="checkbox" class="mr-1"> Floor Plan
                  </label>
                </div>
                <button type="button" @click="addImage" class="bg-black text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-800 transition-colors">Add</button>
              </div>

              <!-- Existing Images List -->
              <div v-if="form.images && form.images.length > 0" class="space-y-3">
                <div v-for="img in form.images" :key="img.id" class="flex items-center gap-4 bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                  <img :src="img.image_url" class="w-16 h-16 object-cover rounded border border-gray-100" />
                  <div class="flex-grow min-w-0">
                    <p class="text-sm font-medium text-gray-800 truncate" :title="img.image_url">{{ img.image_url }}</p>
                    <div class="flex gap-3 mt-1">
                      <span class="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">Order: {{ img.display_order || 'N/A' }}</span>
                      <span v-if="img.is_hero" class="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded font-medium border border-green-200">Hero</span>
                      <span v-if="img.is_floor_plan" class="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-medium border border-blue-200">Floor Plan</span>
                    </div>
                  </div>
                  <button type="button" @click="removeImage(img.id)" class="text-red-500 hover:text-red-700 p-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-6 flex justify-end space-x-3 border-t border-gray-100 mt-8">
            <button type="button" @click="closeModal" class="px-6 py-2.5 text-black font-semibold bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" class="px-6 py-2.5 text-white font-semibold bg-black rounded hover:bg-brand transition-colors">{{ isEditing ? 'Update Project' : 'Save Project' }}</button>
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

const projects = ref([])
const authStore = useAuthStore()

const showModal = ref(false)
const isEditing = ref(false)

const newImageUrl = ref('')
const newImageOrder = ref(0)
const newImageHero = ref(false)
const newImageFloorPlan = ref(false)

const form = ref({
  id: null,
  title: '',
  slug: '',
  location: '',
  installation_time: '',
  area_sqft: null,
  bedrooms: null,
  bathrooms: null,
  stories: null,
  kitchens: null,
  floor_plan_url: '',
  video_url: '',
  features: '',
  finishing_options: '',
  thumbnail_url: '',
  description: '',
  content: '',
  is_featured: false,
  meta_title: '',
  meta_description: '',
  images: []
})

const fetchProjects = async () => {
  try {
    const response = await api.get('/api/v1/projects/')
    projects.value = response.data
  } catch (error) {
    console.error('Failed to fetch projects', error)
  }
}

const openModal = (project = null) => {
  newImageUrl.value = ''
  newImageOrder.value = 0
  newImageHero.value = false
  newImageFloorPlan.value = false

  if (project) {
    isEditing.value = true
    form.value = { 
      ...project,
      features: project.features ? project.features.join(', ') : '',
      finishing_options: project.finishing_options ? project.finishing_options.join(', ') : ''
    }
  } else {
    isEditing.value = false
    form.value = {
      id: null, title: '', slug: '', location: '', installation_time: '', area_sqft: null,
      bedrooms: null, bathrooms: null, stories: null, kitchens: null,
      floor_plan_url: '', video_url: '', features: '', finishing_options: '',
      thumbnail_url: '', description: '', content: '', is_featured: false,
      meta_title: '', meta_description: '', images: []
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveProject = async () => {
  try {
    const payload = { ...form.value }
    delete payload.id
    delete payload.images

    payload.features = payload.features ? payload.features.split(',').map(s => s.trim()).filter(Boolean) : []
    payload.finishing_options = payload.finishing_options ? payload.finishing_options.split(',').map(s => s.trim()).filter(Boolean) : []

    if (isEditing.value) {
      await api.put(`/api/v1/projects/${form.value.id}`, payload)
    } else {
      await api.post('/api/v1/projects/', payload)
    }
    closeModal()
    fetchProjects()
  } catch (error) {
    console.error('Save failed', error)
    alert('Error saving project. Check console.')
  }
}

const deleteProject = async (id) => {
  if (!confirm('Are you sure you want to delete this project?')) return;
  try {
    await api.delete(`/api/v1/projects/${id}`)
    fetchProjects()
  } catch (error) {
    console.error('Deletion failed', error)
  }
}

// ── Image Gallery API Handling ──
const addImage = async () => {
  if (!newImageUrl.value || !form.value.id) return;
  try {
    const res = await api.post('/api/v1/project-images/', {
      project_id: form.value.id,
      image_url: newImageUrl.value,
      display_order: newImageOrder.value,
      is_hero: newImageHero.value,
      is_floor_plan: newImageFloorPlan.value
    });
    form.value.images.push(res.data);
    newImageUrl.value = '';
    newImageOrder.value = 0;
    newImageHero.value = false;
    newImageFloorPlan.value = false;
    
    // Refresh main list so we have updated images
    fetchProjects();
  } catch (e) {
    console.error('Failed to add image', e);
    alert('Failed to add image');
  }
}

const removeImage = async (imageId) => {
  if (!confirm('Remove this image from gallery?')) return;
  try {
    await api.delete(`/api/v1/project-images/${imageId}`);
    form.value.images = form.value.images.filter(img => img.id !== imageId);
    fetchProjects();
  } catch (e) {
    console.error('Failed to remove image', e);
  }
}

onMounted(() => {
  fetchProjects()
})
</script>

