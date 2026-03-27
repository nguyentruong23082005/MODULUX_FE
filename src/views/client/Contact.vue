<template>
  <div class="bg-[#f7f7f7] pt-20">
    <section class="mx-auto max-w-[1320px] px-4 py-12 md:px-6 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-5" data-aos="fade-up">
          <h1 class="text-3xl font-semibold md:text-5xl">Contact Us</h1>
          <p class="mt-3 text-gray-600">
            Please contact our sales team by filling out the form for any questions or inquiries regarding Modulux Homes solutions.
          </p>

          <div class="mt-8 space-y-4 text-sm text-gray-700">
            <p><strong>Head Office:</strong> Nguyen Hue Street, District 1, HCMC, Vietnam</p>
            <p><strong>Factory:</strong> TranDuc Industrial Complex, Binh Duong, Vietnam</p>
            <p><strong>Email:</strong> hello@moduluxhomes.com</p>
          </div>
        </div>

        <div class="lg:col-span-7" data-aos="fade-up" data-aos-delay="80">
          <div class="border border-gray-200 bg-white p-4 md:p-6">
            <div class="mb-4 inline-flex rounded border border-gray-300 p-1 text-sm">
              <button type="button" class="px-4 py-1.5" :class="tab === 'project' ? 'bg-black text-white' : 'text-gray-700'" @click="tab = 'project'">
                Project enquiry
              </button>
              <button type="button" class="px-4 py-1.5" :class="tab === 'general' ? 'bg-black text-white' : 'text-gray-700'" @click="tab = 'general'">
                General enquiry
              </button>
            </div>

            <h2 class="text-xl font-semibold">{{ tab === 'project' ? 'Project Enquiry' : 'General Enquiry' }}</h2>
            <p class="mt-1 text-sm text-gray-600">Have questions? Fill in the form and we'll get back to you promptly.</p>

            <form class="mt-6 grid gap-3 md:grid-cols-2" @submit.prevent="onSubmit">
              <input v-model="form.firstName" class="form-input" placeholder="First name*" required :disabled="isSubmitting" />
              <input v-model="form.lastName" class="form-input" placeholder="Last name*" required :disabled="isSubmitting" />
              <input v-model="form.email" type="email" class="form-input" placeholder="Email*" required :disabled="isSubmitting" />
              <input v-model="form.phone" class="form-input" placeholder="Phone*" required :disabled="isSubmitting" />
              <input v-if="tab === 'project'" v-model="form.company" class="form-input md:col-span-2" placeholder="Company name" :disabled="isSubmitting" />
              <textarea v-model="form.message" class="form-input md:col-span-2 min-h-28" placeholder="Message" :disabled="isSubmitting"></textarea>
              
              <div v-if="messageStatus" :class="['md:col-span-2 p-3 text-sm rounded', messageStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200']">
                {{ messageStatus.text }}
              </div>

              <button 
                type="submit" 
                class="mt-2 bg-[#222222] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0a4834] md:col-span-2 md:w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Sending...' : 'Submit your enquiry' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import publicApi from '@/services/publicApi'

const route = useRoute()
const tab = ref(route.query.type === 'general' ? 'general' : 'project')
const isSubmitting = ref(false)
const messageStatus = ref(null)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  message: '',
})

async function onSubmit() {
  isSubmitting.value = true
  messageStatus.value = null
  
  try {
    const payload = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
      source: tab.value === 'project' ? `Project Enquiry: ${form.company}` : 'General Enquiry',
      message: form.message
    }
    await publicApi.post('/api/v1/contacts/', payload)
    
    messageStatus.value = { type: 'success', text: 'Thank you! Your enquiry has been submitted successfully.' }
    
    // Reset form
    form.firstName = ''
    form.lastName = ''
    form.email = ''
    form.phone = ''
    form.company = ''
    form.message = ''
  } catch (err) {
    console.error('Submit enquiry error:', err)
    messageStatus.value = { type: 'error', text: 'Something went wrong. Please try again later.' }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.form-input {
  width: 100%;
  border: 1px solid #dadada;
  padding: 0.65rem 0.75rem;
  font-size: 0.95rem;
  background: #fff;
}

.form-input:focus {
  outline: 1px solid #0a4834;
  border-color: #0a4834;
}
</style>

