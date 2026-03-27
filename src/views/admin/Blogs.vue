<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl text-gray-800 font-bold">Manage Blog Posts</h2>
      <button @click="openModal()" class="bg-black hover:bg-brand text-white font-medium px-5 py-2.5 rounded shadow-sm transition-colors flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        New Blog Post
      </button>
    </div>
    
    <div class="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Blog Title</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="blog in blogs" :key="blog.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{{ blog.title }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ blog.category || 'N/A' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-500">{{ new Date(blog.created_at).toLocaleDateString() }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="openModal(blog)" class="text-indigo-600 hover:text-indigo-900 mr-4 font-bold">Edit</button>
              <button @click="deleteBlog(blog.id)" class="text-red-600 hover:text-red-900 font-bold">Delete</button>
            </td>
          </tr>
          <tr v-if="blogs.length === 0">
            <td colspan="4" class="px-6 py-12 text-center text-gray-500">
              <svg class="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
              No blogs found. Add one to get started.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Form -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 class="text-xl font-bold text-gray-900">{{ isEditing ? 'Edit Blog Post' : 'Create Blog Post' }}</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-900 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <form @submit.prevent="saveBlog" class="p-6 space-y-5">
          <div class="grid grid-cols-2 gap-5">
            <div class="col-span-2 md:col-span-1">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
              <input v-model="form.title" type="text" required class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div class="col-span-2 md:col-span-1">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <input v-model="form.category" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div class="col-span-2 md:col-span-1">
              <label class="block text-sm font-semibold text-gray-700 mb-1">URL Slug</label>
              <input v-model="form.slug" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div class="col-span-2 md:col-span-1">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Cover Image URL</label>
              <input v-model="form.thumbnail_image" type="text" placeholder="https://..." class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none">
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Article Content</label>
              <textarea v-model="form.content" rows="8" class="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none"></textarea>
            </div>
          </div>
          <div class="pt-6 flex justify-end space-x-3 border-t border-gray-100 mt-8">
            <button type="button" @click="closeModal" class="px-6 py-2.5 text-black font-semibold bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" class="px-6 py-2.5 text-white font-semibold bg-black rounded hover:bg-brand transition-colors">{{ isEditing ? 'Update Post' : 'Publish Post' }}</button>
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

const blogs = ref([])
const authStore = useAuthStore()

const showModal = ref(false)
const isEditing = ref(false)
const form = ref({
  id: null,
  title: '',
  category: '',
  slug: '',
  thumbnail_image: '',
  content: ''
})

const fetchBlogs = async () => {
  try {
    const response = await api.get('/api/v1/posts/')
    blogs.value = response.data
  } catch (error) {
    console.error('Failed to fetch blogs', error)
  }
}

const openModal = (blog = null) => {
  if (blog) {
    isEditing.value = true
    form.value = { ...blog }
  } else {
    isEditing.value = false
    form.value = {
      id: null, title: '', category: '', slug: '',
      thumbnail_image: '', content: ''
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveBlog = async () => {
  try {
    const payload = { ...form.value }
    delete payload.id

    if (isEditing.value) {
      await api.put(`/api/v1/posts/${form.value.id}`, payload)
    } else {
      await api.post('/api/v1/posts/', payload)
    }
    closeModal()
    fetchBlogs()
  } catch (error) {
    console.error('Save failed', error)
    alert('Error saving blog. Check console.')
  }
}

const deleteBlog = async (id) => {
  if (!confirm('Are you sure you want to delete this blog post?')) return;
  try {
    await api.delete(`/api/v1/posts/${id}`)
    fetchBlogs()
  } catch (error) {
    console.error('Deletion failed', error)
  }
}

onMounted(() => {
  fetchBlogs()
})
</script>

