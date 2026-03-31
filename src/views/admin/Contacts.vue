<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-800">Customer Enquiries</h2>
      <div class="flex items-center gap-2">
        <select
          v-model="statusFilter"
          class="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          @change="fetchContacts"
        >
          <option value="">All Status</option>
          <option value="new">🟢 New</option>
          <option value="read">🟡 Read</option>
          <option value="replied">🔵 Replied</option>
          <option value="archived">⚪ Archived</option>
        </select>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 mb-5 bg-gray-100 p-1 rounded-lg">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="[
          'px-4 py-2 rounded-md text-sm font-medium transition-all',
          activeTab === tab.key
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700',
        ]"
        @click="setTab(tab.key)"
      >
        {{ tab.label }}
        <span
          v-if="stats[tab.key] !== undefined"
          :class="[
            'ml-1.5 text-xs font-semibold px-1.5 py-0.5 rounded-full',
            activeTab === tab.key
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-200 text-gray-500',
          ]"
        >
          {{ stats[tab.key] }}
        </span>
      </button>
    </div>

    <!-- Danh sách -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div v-if="isLoading" class="p-12 text-center text-gray-400">
        <div class="animate-spin w-6 h-6 border-2 border-gray-300 border-t-green-600 rounded-full mx-auto mb-3"></div>
        Loading...
      </div>

      <div v-else-if="contacts.length === 0" class="p-12 text-center text-gray-500 font-medium">
        No enquiries found.
      </div>

      <div v-else class="divide-y divide-gray-100">
        <div
          v-for="contact in contacts"
          :key="contact.id"
          class="p-5 hover:bg-gray-50 transition-colors cursor-pointer"
          @click="openDetail(contact)"
        >
          <div class="flex justify-between items-start mb-2">
            <div class="flex items-center gap-3">
              <!-- Status badge -->
              <span :class="statusBadgeClass(contact.status)">
                {{ contact.status }}
              </span>
              <!-- Type badge -->
              <span :class="typeBadgeClass(contact.enquiry_type)">
                {{ typeLabel(contact.enquiry_type) }}
              </span>
            </div>
            <span class="text-xs text-gray-400">
              {{ formatDate(contact.created_at) }}
            </span>
          </div>

          <div class="mt-2">
            <h3 class="text-[15px] font-bold text-gray-900">
              {{ contact.first_name }} {{ contact.last_name }}
            </h3>
            <p class="text-sm text-gray-500 mt-0.5">
              {{ contact.email }}
              <span v-if="contact.phone"> · {{ contact.country_code }} {{ contact.phone }}</span>
            </p>
          </div>

          <!-- Project info preview -->
          <div v-if="contact.enquiry_type === 'project' && contact.building_type" class="mt-2 flex flex-wrap gap-2">
            <span class="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded">
              🏗️ {{ contact.building_type }}
            </span>
            <span v-if="contact.living_units" class="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
              🏠 {{ contact.living_units }} units
            </span>
            <span v-if="contact.area" class="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded">
              📐 {{ contact.area }}
            </span>
            <span v-if="contact.arrange_tour" class="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
              🗓️ Tour requested
            </span>
          </div>

          <!-- Brochure request -->
          <div v-if="contact.get_brochure" class="mt-2">
            <span class="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
              📖 Wants brochure
            </span>
          </div>

          <p v-if="contact.message" class="mt-3 text-sm text-gray-600 line-clamp-2">
            {{ contact.message }}
          </p>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <Teleport to="body">
      <div
        v-if="selectedContact"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeDetail"
      >
        <div class="fixed inset-0 bg-black/40" @click="closeDetail"></div>

        <div class="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto z-10">
          <!-- Header -->
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-xl">
            <div class="flex items-center gap-3">
              <h3 class="text-lg font-bold text-gray-900">Enquiry Details</h3>
              <span :class="typeBadgeClass(selectedContact.enquiry_type)">
                {{ typeLabel(selectedContact.enquiry_type) }}
              </span>
            </div>
            <button class="text-gray-400 hover:text-gray-600 text-2xl leading-none" @click="closeDetail">
              ×
            </button>
          </div>

          <div class="p-6 space-y-5">
            <!-- Status -->
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-gray-500">Status:</span>
              <select
                :value="selectedContact.status"
                class="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-green-500 outline-none"
                @change="updateStatus(selectedContact.id, $event.target.value)"
              >
                <option value="new">🟢 New</option>
                <option value="read">🟡 Read</option>
                <option value="replied">🔵 Replied</option>
                <option value="archived">⚪ Archived</option>
              </select>
            </div>

            <!-- Contact Info -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="text-sm font-semibold text-gray-700 mb-3">Contact Information</h4>
              <div class="grid grid-cols-1 sm:grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span class="text-gray-500">Name:</span>
                  <span class="ml-2 font-medium text-gray-900">
                    {{ selectedContact.first_name }} {{ selectedContact.last_name }}
                  </span>
                </div>
                <div>
                  <span class="text-gray-500">Email:</span>
                  <a :href="`mailto:${selectedContact.email}`" class="ml-2 font-medium text-green-600 hover:underline">
                    {{ selectedContact.email }}
                  </a>
                </div>
                <div>
                  <span class="text-gray-500">Phone:</span>
                  <span class="ml-2 font-medium text-gray-900">
                    {{ selectedContact.country_code }} {{ selectedContact.phone }}
                  </span>
                </div>
                <div>
                  <span class="text-gray-500">Source:</span>
                  <span class="ml-2 font-medium text-gray-900">
                    {{ selectedContact.source || 'Not provided' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Project Details (only for project enquiry) -->
            <div
              v-if="selectedContact.enquiry_type === 'project' && selectedContact.building_type"
              class="bg-amber-50 rounded-lg p-4"
            >
              <h4 class="text-sm font-semibold text-amber-800 mb-3">🏗️ Project Details</h4>
              <div class="grid grid-cols-1 sm:grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span class="text-amber-600">Building Type:</span>
                  <span class="ml-2 font-medium text-gray-900">{{ selectedContact.building_type }}</span>
                </div>
                <div>
                  <span class="text-amber-600">Living Units:</span>
                  <span class="ml-2 font-medium text-gray-900">{{ selectedContact.living_units }}</span>
                </div>
                <div>
                  <span class="text-amber-600">Area:</span>
                  <span class="ml-2 font-medium text-gray-900">{{ selectedContact.area }}</span>
                </div>
                <div>
                  <span class="text-amber-600">Arrange Tour:</span>
                  <span class="ml-2 font-medium text-gray-900">
                    {{ selectedContact.arrange_tour ? '✅ Yes' : '❌ No' }}
                  </span>
                </div>
                <div v-if="selectedContact.preferred_day">
                  <span class="text-amber-600">Preferred Day:</span>
                  <span class="ml-2 font-medium text-gray-900">{{ selectedContact.preferred_day }}</span>
                </div>
                <div v-if="selectedContact.preferred_time">
                  <span class="text-amber-600">Preferred Time:</span>
                  <span class="ml-2 font-medium text-gray-900">{{ selectedContact.preferred_time }}</span>
                </div>
              </div>
              <div v-if="selectedContact.file_url" class="mt-3">
                <a
                  :href="selectedContact.file_url"
                  target="_blank"
                  class="inline-flex items-center gap-1.5 text-sm text-amber-700 hover:underline font-medium"
                >
                  📎 Download attached file
                </a>
              </div>
            </div>

            <!-- Brochure request -->
            <div v-if="selectedContact.get_brochure" class="bg-indigo-50 rounded-lg p-4">
              <p class="text-sm font-medium text-indigo-800">📖 This customer requested a brochure.</p>
            </div>

            <!-- Message -->
            <div v-if="selectedContact.message" class="bg-gray-50 rounded-lg p-4">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">Message</h4>
              <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {{ selectedContact.message }}
              </p>
            </div>

            <!-- Timeline -->
            <div class="text-xs text-gray-400 pt-2 border-t border-gray-100">
              📅 Submitted: {{ formatDate(selectedContact.created_at) }}
            </div>
          </div>

          <!-- Footer actions -->
          <div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-between items-center rounded-b-xl">
            <button
              class="text-sm text-red-600 hover:text-red-800 font-medium"
              @click="deleteContact(selectedContact.id)"
            >
              Delete
            </button>
            <div class="flex gap-3">
              <a
                :href="`mailto:${selectedContact.email}?subject=Re: Your Modulux Homes Enquiry`"
                class="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const contacts = ref([])
const stats = ref({ all: 0, home_general: 0, general: 0, project: 0 })
const activeTab = ref('all')
const statusFilter = ref('')
const isLoading = ref(false)
const selectedContact = ref(null)

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'home_general', label: 'Home General' },
  { key: 'general', label: 'General' },
  { key: 'project', label: 'Project' },
]

const fetchContacts = async () => {
  isLoading.value = true
  try {
    const params = {}
    if (activeTab.value !== 'all') params.enquiry_type = activeTab.value
    if (statusFilter.value) params.status = statusFilter.value

    const res = await api.get('/api/v1/contacts/', { params })
    contacts.value = res.data
  } catch (err) {
    console.error('Fetch contacts error:', err)
  } finally {
    isLoading.value = false
  }
}

const fetchStats = async () => {
  try {
    const res = await api.get('/api/v1/contacts/stats')
    stats.value = res.data
  } catch (err) {
    console.error('Fetch stats error:', err)
  }
}

const setTab = (key) => {
  activeTab.value = key
  fetchContacts()
}

const openDetail = async (contact) => {
  selectedContact.value = contact

  // Tự động đánh dấu là "read" nếu đang "new"
  if (contact.status === 'new') {
    await updateStatus(contact.id, 'read')
  }
}

const closeDetail = () => {
  selectedContact.value = null
}

const updateStatus = async (id, newStatus) => {
  try {
    await api.put(`/api/v1/contacts/${id}`, { status: newStatus })

    // Cập nhật local
    const target = contacts.value.find((c) => c.id === id)
    if (target) target.status = newStatus
    if (selectedContact.value?.id === id) selectedContact.value.status = newStatus

    fetchStats()
  } catch (err) {
    console.error('Update status error:', err)
  }
}

const deleteContact = async (id) => {
  if (!confirm('Are you sure you want to delete this enquiry?')) return

  try {
    await api.delete(`/api/v1/contacts/${id}`)
    closeDetail()
    fetchContacts()
    fetchStats()
  } catch (err) {
    console.error('Delete contact error:', err)
  }
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const typeLabel = (type) => {
  const map = {
    home_general: 'Home',
    general: 'General',
    project: 'Project',
  }
  return map[type] || type
}

const statusBadgeClass = (status) => {
  const base = 'text-xs font-semibold px-2 py-0.5 rounded-full capitalize'
  const map = {
    new: 'bg-green-100 text-green-700',
    read: 'bg-yellow-100 text-yellow-700',
    replied: 'bg-blue-100 text-blue-700',
    archived: 'bg-gray-100 text-gray-500',
  }
  return `${base} ${map[status] || 'bg-gray-100 text-gray-500'}`
}

const typeBadgeClass = (type) => {
  const base = 'text-xs font-semibold px-2 py-0.5 rounded-full'
  const map = {
    home_general: 'bg-emerald-100 text-emerald-700',
    general: 'bg-sky-100 text-sky-700',
    project: 'bg-amber-100 text-amber-700',
  }
  return `${base} ${map[type] || 'bg-gray-100 text-gray-500'}`
}

onMounted(() => {
  fetchContacts()
  fetchStats()
})
</script>
