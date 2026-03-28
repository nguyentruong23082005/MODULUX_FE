<template>
  <section class="general-enquiry" data-aos="fade-up" data-aos-duration="1000">
    <div class="general-enquiry__shell">
      <div class="general-enquiry__card">
        <img
          class="general-enquiry__image"
          src="/images/home/General_Enquiry.png"
          alt="Modern Modulux home exterior"
        />
        <div class="general-enquiry__shade"></div>

        <div class="general-enquiry__content">
          <div class="general-enquiry__copy">
            <h2 class="general-enquiry__title">General Enquiry</h2>
            <p class="general-enquiry__caption">
              Have questions or need more information? Fill in the contact form,
              and we'll get back to you promptly.
            </p>
          </div>

          <!-- Trạng thái thành công -->
          <div v-if="isSubmitted" class="general-enquiry__form general-enquiry__success">
            <div class="general-enquiry__success-icon">✓</div>
            <p class="general-enquiry__success-title">Thank you!</p>
            <p class="general-enquiry__success-text">
              Your enquiry has been submitted. We'll get back to you shortly.
            </p>
            <button class="general-enquiry__submit" type="button" @click="resetForm">
              Send another enquiry
            </button>
          </div>

          <!-- Form nhập liệu -->
          <form v-else class="general-enquiry__form" @submit.prevent="handleSubmit">
            <div class="general-enquiry__grid">
              <input
                id="general-enquiry-first-name"
                v-model.trim="form.firstName"
                class="general-enquiry__field"
                type="text"
                placeholder="First Name*"
                :disabled="isSubmitting"
              />
              <input
                id="general-enquiry-last-name"
                v-model.trim="form.lastName"
                class="general-enquiry__field"
                type="text"
                placeholder="Last Name*"
                :disabled="isSubmitting"
              />
            </div>

            <input
              id="general-enquiry-email"
              v-model.trim="form.email"
              class="general-enquiry__field"
              type="email"
              placeholder="Email*"
              :disabled="isSubmitting"
            />

            <div class="general-enquiry__grid">
              <input
                id="general-enquiry-country-code"
                v-model.trim="form.countryCode"
                class="general-enquiry__field"
                type="text"
                placeholder="Country Code*"
                :disabled="isSubmitting"
              />
              <input
                id="general-enquiry-phone-number"
                v-model.trim="form.phone"
                class="general-enquiry__field"
                type="tel"
                placeholder="Phone Number*"
                :disabled="isSubmitting"
              />
            </div>

            <div class="general-enquiry__select-wrap">
              <select
                id="general-enquiry-hear-about"
                v-model="form.source"
                class="general-enquiry__field general-enquiry__select"
                aria-label="How did you hear about us?"
                :disabled="isSubmitting"
              >
                <option value="" selected disabled>How did you hear about us?</option>
                <option value="Google">Google</option>
                <option value="Facebook">Facebook</option>
                <option value="Referral">Referral</option>
                <option value="Website">Website</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <textarea
              id="general-enquiry-message"
              v-model.trim="form.message"
              class="general-enquiry__field general-enquiry__textarea"
              rows="5"
              placeholder="Message"
              :disabled="isSubmitting"
            ></textarea>

            <p v-if="errorMsg" class="general-enquiry__error">{{ errorMsg }}</p>

            <button
              id="general-enquiry-submit"
              class="general-enquiry__submit"
              type="submit"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Submitting...' : 'Submit' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import publicApi from '@/services/publicApi'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '',
  phone: '',
  source: '',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errorMsg = ref('')

const validate = () => {
  if (!form.firstName || !form.lastName) {
    errorMsg.value = 'Please enter your first and last name.'
    return false
  }
  if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
    errorMsg.value = 'Please enter a valid email address.'
    return false
  }
  if (!form.countryCode) {
    errorMsg.value = 'Please enter your country code.'
    return false
  }
  if (!form.phone || form.phone.replace(/\D/g, '').length < 7) {
    errorMsg.value = 'Please enter a valid phone number (at least 7 digits).'
    return false
  }
  errorMsg.value = ''
  return true
}

const handleSubmit = async () => {
  if (!validate()) return

  isSubmitting.value = true
  errorMsg.value = ''

  try {
    await publicApi.post('/api/v1/contacts/', {
      enquiry_type: 'home_general',
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      country_code: form.countryCode,
      phone: form.phone.replace(/\D/g, ''),
      source: form.source || null,
      message: form.message || null,
    })

    isSubmitted.value = true
  } catch (err) {
    console.error('Submit home enquiry error:', err)
    errorMsg.value = 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.countryCode = ''
  form.phone = ''
  form.source = ''
  form.message = ''
  isSubmitted.value = false
  errorMsg.value = ''
}
</script>

<style scoped>
.general-enquiry {
  width: 100%;
  padding: 200px 0 78px;
  background: #fbfaf7;
}

.general-enquiry__shell {
  width: min(100%, 1600px);
  margin: 0 auto;
  padding: 0 24px;
}

.general-enquiry__card {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  min-height: 540px;
  box-shadow: 0 20px 44px rgba(19, 26, 19, 0.1);
}

.general-enquiry__image,
.general-enquiry__shade {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.general-enquiry__image {
  object-fit: cover;
  object-position: center center;
}

.general-enquiry__shade {
  background:
    linear-gradient(90deg, rgba(20, 24, 19, 0.32) 0%, rgba(20, 24, 19, 0.12) 34%, rgba(20, 24, 19, 0.06) 56%, rgba(20, 24, 19, 0.08) 100%),
    linear-gradient(180deg, rgba(12, 12, 12, 0) 0%, rgba(12, 12, 12, 0.14) 100%);
}

.general-enquiry__content {
  position: relative;
  z-index: 1;
  min-height: 540px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  align-items: start;
  gap: 48px;
  padding: 48px 40px 36px 36px;
}

.general-enquiry__copy {
  min-height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 16px;
}

.general-enquiry__title {
  margin: 0;
  font-size: clamp(3rem, 4.8vw, 4.5rem);
  line-height: 0.95;
  font-weight: 700;
  letter-spacing: -0.045em;
  color: #ffffff;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
}

.general-enquiry__caption {
  margin: 0;
  max-width: 520px;
  font-size: 14px;
  line-height: 1.6;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.96);
  text-shadow: 0 3px 14px rgba(0, 0, 0, 0.18);
}

.general-enquiry__form {
  width: 100%;
  margin-top: 32px;
  padding: 20px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.97);
  border: 1px solid rgba(213, 218, 225, 0.9);
  box-shadow: 0 20px 36px rgba(27, 31, 35, 0.12);
  backdrop-filter: blur(10px);
}

.general-enquiry__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.general-enquiry__grid + .general-enquiry__field,
.general-enquiry__field + .general-enquiry__grid,
.general-enquiry__field + .general-enquiry__select-wrap,
.general-enquiry__select-wrap + .general-enquiry__textarea,
.general-enquiry__textarea + .general-enquiry__submit {
  margin-top: 10px;
}

.general-enquiry__field {
  width: 100%;
  min-height: 44px;
  padding: 10px 14px;
  border: 1px solid #d7dde6;
  border-radius: 5px;
  background: #ffffff;
  font: inherit;
  font-size: 14px;
  line-height: 1.4;
  color: #1c2228;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.general-enquiry__field::placeholder,
.general-enquiry__select {
  color: #97a1ae;
}

.general-enquiry__field:focus,
.general-enquiry__select:focus {
  border-color: #9da6b2;
  box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.06);
}

.general-enquiry__select-wrap {
  position: relative;
}

.general-enquiry__select-wrap::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 14px;
  width: 8px;
  height: 8px;
  border-right: 1.5px solid #9aa3af;
  border-bottom: 1.5px solid #9aa3af;
  transform: translateY(-65%) rotate(45deg);
  pointer-events: none;
}

.general-enquiry__select {
  appearance: none;
  cursor: pointer;
  padding-right: 32px;
}

.general-enquiry__textarea {
  min-height: 120px;
  resize: none;
  padding-top: 12px;
}

.general-enquiry__submit {
  width: 100%;
  min-height: 44px;
  border: none;
  border-radius: 0;
  background: #050505;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.general-enquiry__submit:hover {
  opacity: 0.92;
}

.general-enquiry__submit:active {
  transform: translateY(1px);
}

@media (max-width: 1199px) {
  .general-enquiry__shell {
    padding: 0 20px;
  }

  .general-enquiry__card {
    min-height: 480px;
  }

  .general-enquiry__content {
    min-height: 480px;
    grid-template-columns: minmax(0, 1fr) 340px;
    gap: 32px;
    padding: 36px 28px 28px 24px;
  }

  .general-enquiry__copy {
    min-height: 400px;
    padding-top: 12px;
  }
}

@media (max-width: 991px) {
  .general-enquiry {
    padding: 60px 0 56px;
  }

  .general-enquiry__content {
    grid-template-columns: 1fr;
    min-height: auto;
    gap: 24px;
    padding: 28px 24px 24px;
  }

  .general-enquiry__copy {
    min-height: auto;
    gap: 120px;
    padding-top: 0;
  }

  .general-enquiry__caption {
    max-width: 520px;
  }

  .general-enquiry__form {
    max-width: 480px;
    margin-top: 16px;
    margin-left: auto;
  }
}

@media (max-width: 767px) {
  .general-enquiry {
    padding: 40px 0 40px;
  }

  .general-enquiry__shell {
    padding: 0 16px;
  }

  .general-enquiry__card,
  .general-enquiry__content {
    min-height: auto;
  }

  .general-enquiry__content {
    padding: 20px;
  }

  .general-enquiry__title {
    font-size: clamp(2.4rem, 10vw, 3.2rem);
  }

  .general-enquiry__copy {
    gap: 160px;
  }

  .general-enquiry__grid {
    grid-template-columns: 1fr;
  }

  .general-enquiry__form {
    max-width: none;
    margin-left: 0;
  }

  .general-enquiry__field {
    min-height: 40px;
    font-size: 13px;
  }

  .general-enquiry__submit {
    min-height: 40px;
    font-size: 13px;
  }
}

.general-enquiry__success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 280px;
}

.general-enquiry__success-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #059669;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}

.general-enquiry__success-title {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 700;
  color: #1c2228;
}

.general-enquiry__success-text {
  margin: 0 0 18px;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
}

.general-enquiry__error {
  margin: 6px 0 0;
  padding: 8px 12px;
  border-radius: 4px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  font-size: 12px;
  line-height: 1.4;
}

.general-enquiry__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
