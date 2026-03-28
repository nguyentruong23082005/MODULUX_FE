<template>
  <div class="relative font-sans text-gray-900 bg-white">
    <!-- Hero Section -->
    <section class="relative pt-10 pb-16 px-6 lg:px-8">
      <!-- Background Image -->
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
        style="background-image: url('/images/home/nen.avif');"
      ></div>
      <!-- Subtle Gradient Overlay matching text color but keeping image visible -->
      <div class="absolute inset-0 z-0 bg-[#063B40]/60"></div>

      <div class="relative z-10 max-w-[1200px] mx-auto pt-10">
        <div class="text-white" data-aos="fade-up">
          <h1 class="text-[44px] leading-tight font-bold mb-6 font-geoform">Contact Us</h1>

          <div class="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 text-[15px] font-semibold mb-10 tracking-wide">
            <a href="tel:+84988897997" class="flex items-center gap-3 hover:text-gray-200 transition group">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5.11 3h3a2 2 0 0 1 2 1.72l.34 2.29a2 2 0 0 1-.57 1.72L8.09 10.5a16 16 0 0 0 5.41 5.41l1.77-1.79a2 2 0 0 1 1.72-.57l2.29.34A2 2 0 0 1 22 16.92Z" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span>(+84) 988 897 997 / (+84) 934 826 309</span>
            </a>

            <a href="mailto:sales@moduluxhomes.com" class="flex items-center gap-3 hover:text-gray-200 transition group">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>sales@moduluxhomes.com</span>
            </a>
          </div>

          <p class="text-[17px] leading-[1.6] max-w-[480px] text-white font-medium opacity-90">
            Please contact our sales team by filling out the form or sending an email for any questions or inquiries regarding Modulux Homes solutions.
          </p>
        </div>
      </div>
    </section>

    <!-- Form Section -->
    <section class="relative z-20 max-w-[1200px] mx-auto px-4 lg:px-8 -mt-10 mb-16">
      <div class="bg-white rounded-[10px] shadow-[0_10px_50px_rgba(0,0,0,0.15)] p-8 md:p-12 lg:px-16 lg:py-14" data-aos="fade-up" data-aos-delay="100">
        
        <div class="mb-12">
          <h2 class="text-[34px] leading-tight font-bold mb-8 text-[#1A1A1A] font-geoform">Submit your enquiry</h2>

          <div class="mb-8">
            <p class="text-[15px] font-bold text-gray-900 mb-4 tracking-wide">Enquiry type</p>
            <div class="flex items-center gap-8">
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="enquiry-type"
                  class="sr-only"
                  :checked="isProjectEnquiry"
                  @change="setEnquiryType('project')"
                />
                <span class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition"
                      :class="isProjectEnquiry ? 'border-[#0A4834]' : 'border-gray-300'">
                  <span v-if="isProjectEnquiry" class="w-2.5 h-2.5 rounded-full bg-[#0A4834]"></span>
                </span>
                <span class="text-[15px]" :class="isProjectEnquiry ? 'text-[#1A1A1A]' : 'text-gray-500'">Project enquiry</span>
              </label>

              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="enquiry-type"
                  class="sr-only"
                  :checked="!isProjectEnquiry"
                  @change="setEnquiryType('general')"
                />
                <span class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition"
                      :class="!isProjectEnquiry ? 'border-[#0A4834]' : 'border-gray-300'">
                  <span v-if="!isProjectEnquiry" class="w-2.5 h-2.5 rounded-full bg-[#0A4834]"></span>
                </span>
                <span class="text-[15px]" :class="!isProjectEnquiry ? 'text-[#1A1A1A]' : 'text-gray-500'">General enquiry</span>
              </label>
            </div>
          </div>
        </div>

        <div v-if="isSubmitted" class="bg-gray-50 border border-gray-100 rounded p-12 text-center my-8">
          <h3 class="text-2xl font-bold mb-4 text-[#0a4834]">Thank you for submitting the form.</h3>
          <p class="text-[16px] text-gray-600 mb-8 max-w-[500px] mx-auto">
            Our team will be in touch with you soon. In the meantime, check out some of our recent projects.
          </p>
          <router-link to="/projects" class="inline-block px-10 py-3.5 bg-[#000] text-white font-bold tracking-wide hover:bg-gray-800 transition">
            Explore Our Projects
          </router-link>
        </div>

        <template v-else>
          <!-- Project Enquiry Form -->
          <div v-if="isProjectEnquiry" class="animate-fade-in-up">
            <h3 class="text-[26px] font-bold mb-4 text-[#1A1A1A]">Project Enquiry</h3>
            <p class="text-gray-500 mb-10 max-w-[850px] leading-[1.6] text-[15px]">
              Found a design you like or need custom guidance? We can help. Fill in the form about your project, and we'll contact you to discuss options and answer questions.
            </p>

            <form @submit.prevent="submitProjectForm" class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input v-model.trim="projectForm.firstName" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition placeholder:text-gray-400" type="text" placeholder="First Name*" :disabled="isProjectSubmitting" required />
                <input v-model.trim="projectForm.lastName" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition placeholder:text-gray-400" type="text" placeholder="Last Name*" :disabled="isProjectSubmitting" required />
              </div>

              <input v-model.trim="projectForm.email" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition placeholder:text-gray-400" type="email" placeholder="Email*" :disabled="isProjectSubmitting" required />

              <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-5">
                <input v-model.trim="projectForm.countryCode" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition placeholder:text-gray-400" type="text" list="contact-country-code-options" placeholder="Country Code*" :disabled="isProjectSubmitting" required />
                <input v-model.trim="projectForm.phoneNumber" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition placeholder:text-gray-400" type="text" placeholder="Phone Number*" :disabled="isProjectSubmitting" required />
              </div>

              <div class="relative">
                <select v-model="projectForm.buildingType" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition appearance-none text-gray-800" :disabled="isProjectSubmitting" required>
                  <option disabled value="">Building Type*</option>
                  <option v-for="option in buildingTypeOptions" :key="option" :value="option">{{ option }}</option>
                </select>
                <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              <div class="relative">
                <select v-model="projectForm.livingUnits" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition appearance-none text-gray-800" :disabled="isProjectSubmitting" required>
                  <option disabled value="">Living Units*</option>
                  <option v-for="option in livingUnitOptions" :key="option" :value="option">{{ option }}</option>
                </select>
                <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              <input v-model.trim="projectForm.area" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition placeholder:text-gray-400" type="text" placeholder="Area*" :disabled="isProjectSubmitting" required />

              <div class="relative">
                <select v-model="projectForm.hearAbout" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition appearance-none text-gray-500" :disabled="isProjectSubmitting" :class="{'text-gray-800': projectForm.hearAbout}" required>
                  <option value="">How did you hear about us?</option>
                  <option v-for="option in hearAboutOptions" :key="option" :value="option">{{ option }}</option>
                </select>
                <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              <input v-if="projectForm.hearAbout === 'Other'" v-model.trim="projectForm.hearAboutOther" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition placeholder:text-gray-400" type="text" placeholder="Please specify" :disabled="isProjectSubmitting" required />

              <textarea v-model.trim="projectForm.note" class="w-full px-4 py-4 text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition resize-none placeholder:text-gray-400" rows="5" placeholder="Tell us more about your project...*" :disabled="isProjectSubmitting" required></textarea>

              <label class="flex items-center gap-3 cursor-pointer py-1 w-max group mt-4">
                <div class="w-5 h-5 rounded-full border border-black flex items-center justify-center relative">
                  <div v-if="projectForm.arrangeTour" class="w-2.5 h-2.5 rounded-full bg-black absolute"></div>
                </div>
                <input v-model="projectForm.arrangeTour" type="checkbox" class="sr-only" :disabled="isProjectSubmitting" />
                <span class="text-[14px] text-gray-500 group-hover:text-black">Arrange a tour</span>
              </label>

              <div v-if="projectForm.arrangeTour" class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                <input v-model="projectForm.preferredDay" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition text-gray-700" type="date" :disabled="isProjectSubmitting" required />
                <div class="relative">
                  <select v-model="projectForm.preferredTime" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition appearance-none text-gray-700" :disabled="isProjectSubmitting" required>
                    <option disabled value="">Preferred time*</option>
                    <option v-for="option in preferredTimeOptions" :key="option" :value="option">{{ option }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div class="pt-6">
                <div class="text-[13px] text-gray-500 mb-4">Upload a relevant file (Optional)</div>
                <div class="flex items-center gap-4">
                  <input id="contact-project-file" ref="projectFileInput" class="hidden" type="file" accept=".jpeg,.jpg,.png" @change="handleProjectFileChange" />
                  <label for="contact-project-file" class="cursor-pointer px-6 py-2 bg-white border border-black font-bold text-[14px] hover:bg-gray-50 transition text-black inline-block">
                    Choose File
                  </label>
                  <span v-if="selectedProjectFile" class="text-[14px] text-gray-700 truncate max-w-[200px]">{{ selectedProjectFile.name }}</span>
                  <button v-if="selectedProjectFile" type="button" @click="clearProjectFile" class="text-[13px] text-red-500 underline ml-2">Remove</button>
                </div>
              </div>

              <div v-if="submitFeedback" :class="['px-5 py-4 mt-6 rounded-[4px] text-[14px] font-medium', submitFeedback.type === 'success' ? 'bg-[#E6F4EA] text-[#0A4834]' : 'bg-red-50 text-red-800']">
                {{ submitFeedback.text }}
              </div>

              <div class="pt-8">
                <button type="submit" :disabled="isProjectSubmitting" class="px-12 py-3.5 bg-black text-white text-[15px] font-bold tracking-wide hover:bg-gray-800 transition disabled:opacity-70 disabled:cursor-not-allowed">
                  {{ isProjectSubmitting ? 'Enquiring...' : 'Enquire Now' }}
                </button>
              </div>
            </form>
          </div>

          <!-- General Enquiry Form -->
          <div v-else class="animate-fade-in-up">
            <h3 class="text-[26px] font-bold mb-4 text-[#1A1A1A]">General Enquiry</h3>
            <p class="text-gray-500 mb-10 max-w-[850px] leading-[1.6] text-[15px]">
              Have questions or need more information? Fill in the contact form, and we'll get back to you promptly.
            </p>

            <form @submit.prevent="submitGeneralForm" class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input v-model.trim="generalForm.firstName" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition placeholder:text-gray-400" type="text" placeholder="First Name*" :disabled="isGeneralSubmitting" required />
                <input v-model.trim="generalForm.lastName" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition placeholder:text-gray-400" type="text" placeholder="Last Name*" :disabled="isGeneralSubmitting" required />
              </div>

              <input v-model.trim="generalForm.email" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition placeholder:text-gray-400" type="email" placeholder="Email*" :disabled="isGeneralSubmitting" required />

              <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-5">
                <input v-model.trim="generalForm.countryCode" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition placeholder:text-gray-400" type="text" list="contact-country-code-options" placeholder="Country Code*" :disabled="isGeneralSubmitting" required />
                <input v-model.trim="generalForm.phoneNumber" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition placeholder:text-gray-400" type="text" placeholder="Phone Number*" :disabled="isGeneralSubmitting" required />
              </div>

              <div class="relative">
                <select v-model="generalForm.hearAbout" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition appearance-none text-gray-500" :disabled="isGeneralSubmitting" :class="{'text-gray-800': generalForm.hearAbout}" required>
                  <option value="">How did you hear about us?</option>
                  <option v-for="option in hearAboutOptions" :key="option" :value="option">{{ option }}</option>
                </select>
                <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              <input v-if="generalForm.hearAbout === 'Other'" v-model.trim="generalForm.hearAboutOther" class="w-full px-4 py-[13px] text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition placeholder:text-gray-400" type="text" placeholder="Please specify" :disabled="isGeneralSubmitting" required />

              <textarea v-model.trim="generalForm.note" class="w-full px-4 py-4 text-[14px] bg-white rounded-[4px] border border-gray-300 outline-none focus:border-black transition resize-none placeholder:text-gray-400" rows="5" placeholder="How can we help?*" :disabled="isGeneralSubmitting" required></textarea>

              <label class="flex items-center gap-3 cursor-pointer py-1 w-max group mt-4">
                <div class="w-5 h-5 rounded-full border border-black flex items-center justify-center relative">
                  <div v-if="generalForm.getBrochure" class="w-2.5 h-2.5 rounded-full bg-black absolute"></div>
                </div>
                <input v-model="generalForm.getBrochure" type="checkbox" class="sr-only" :disabled="isGeneralSubmitting" />
                <span class="text-[14px] text-gray-500 group-hover:text-black">Get a brochure</span>
              </label>

              <div v-if="submitFeedback" :class="['px-5 py-4 mt-6 rounded-[4px] text-[14px] font-medium', submitFeedback.type === 'success' ? 'bg-[#E6F4EA] text-[#0A4834]' : 'bg-red-50 text-red-800']">
                {{ submitFeedback.text }}
              </div>

              <div class="pt-8 grid grid-cols-1 md:grid-cols-2">
                <button type="submit" :disabled="isGeneralSubmitting" class="w-full py-[14px] bg-black text-white text-[15px] font-bold tracking-wide hover:bg-gray-800 transition disabled:opacity-70 disabled:cursor-not-allowed text-center">
                  {{ isGeneralSubmitting ? 'Submitting...' : 'Submit' }}
                </button>
              </div>
            </form>
          </div>
        </template>

        <datalist id="contact-country-code-options">
          <option v-for="option in countryCodeOptions" :key="`${option.value}-${option.label}`" :value="option.value">{{ option.label }}</option>
        </datalist>
      </div>
    </section>

    <!-- Map Section -->
    <section class="relative bg-[#484f55] min-h-[500px] lg:min-h-[700px] flex items-center pt-10 pb-20 mt-10">
      <!-- Full Map image background -->
      <div 
        class="absolute inset-0 bg-contain lg:bg-cover bg-center bg-no-repeat opacity-[0.85]" 
        style="background-image: url('/images/home/bando.webp');"
      ></div>
      
      <!-- Overlay pins (positioned via absolute percent based on standard world map) -->
      <div class="absolute inset-0 z-10 hidden md:block max-w-[1400px] mx-auto">
          <!-- Canada pin -->
          <div class="absolute top-[28%] left-[17%] -translate-x-1/2 flex flex-col items-center">
            <img src="/images/Logo_MDL_white.svg" class="w-[38px] h-[38px] mb-2 drop-shadow-lg" />
            <div class="w-[1px] h-12 bg-white"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-white mt-1"></div>
          </div>
          <!-- Pacific pin -->
          <div class="absolute top-[52%] left-[8%] -translate-x-1/2 flex flex-col items-center">
            <img src="/images/Logo_MDL_white.svg" class="w-[38px] h-[38px] mb-2 drop-shadow-lg" />
            <div class="w-[1px] h-12 bg-white"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-white mt-1"></div>
          </div>
          <!-- US East pin -->
          <div class="absolute top-[46%] left-[32%] -translate-x-1/2 flex flex-col items-center">
            <img src="/images/Logo_MDL_white.svg" class="w-[38px] h-[38px] mb-2 drop-shadow-lg" />
            <div class="w-[1px] h-12 bg-white"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-white mt-1"></div>
          </div>
          <!-- Europe pin -->
          <div class="absolute top-[50%] left-[64%] -translate-x-1/2 flex flex-col items-center">
            <img src="/images/Logo_MDL_white.svg" class="w-[38px] h-[38px] mb-2 drop-shadow-lg" />
            <div class="w-[1px] h-12 bg-white"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-white mt-1"></div>
          </div>
          <!-- Asia pin -->
          <div class="absolute top-[56%] left-[80%] -translate-x-1/2 flex flex-col items-center">
            <img src="/images/Logo_MDL_white.svg" class="w-[38px] h-[38px] mb-2 drop-shadow-lg" />
            <div class="w-[1px] h-12 bg-white"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-white mt-1"></div>
          </div>
          <!-- Australia pin -->
          <div class="absolute top-[72%] left-[90%] -translate-x-1/2 flex flex-col items-center">
            <img src="/images/Logo_MDL_white.svg" class="w-[38px] h-[38px] mb-2 drop-shadow-lg" />
            <div class="w-[1px] h-12 bg-white"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-white mt-1"></div>
          </div>
      </div>

      <!-- Modular Projects Callout (left aligned within container) -->
      <div class="relative z-20 w-full max-w-[1240px] mx-auto px-4 mt-auto mb-10 pt-[350px]">
        <div class="text-white max-w-[320px]">
          <h2 class="text-[20px] font-bold mb-2 tracking-wide font-geoform">MODULAR PROJECTS.</h2>
          <p class="text-[14px] leading-snug mb-5 font-medium opacity-90">
            Explore our completed home projects for design inspiration and ideas.
          </p>
          <router-link to="/projects" class="inline-block px-5 py-2.5 bg-white text-black text-[13px] font-bold border border-white hover:bg-transparent hover:text-white transition">
            See All Projects
          </router-link>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="max-w-[1200px] mx-auto px-4 lg:px-8 py-20 pb-32">
      <h2 class="text-[28px] font-bold mb-3 text-[#1A1A1A] font-geoform md:text-left">Frequently Asked Questions About Projects</h2>
      <p class="text-[14px] text-gray-500 mb-12 md:text-left font-medium">
        Do you have any questions about modular home building that aren't covered here? <router-link to="/contact?type=general" class="font-bold border-b border-black text-black pb-0.5">Get in touch</router-link> with our friendly team - we're happy to help.
      </p>

      <div class="max-w-full">
        <h3 class="text-[16px] font-bold mb-4">1. Product & Design</h3>
        <div class="border-t border-black mb-6"></div>

        <div class="space-y-0">
          <details v-for="(faq, index) in projectFaqPreview" :key="index" class="group border-b border-gray-300">
            <summary class="flex items-center justify-between cursor-pointer py-5 list-none">
              <span class="text-[15px] font-medium text-gray-800 pr-6">{{ faq.question }}</span>
              <span class="text-2xl text-gray-400 group-open:hidden">+</span>
              <span class="text-3xl font-light text-gray-400 hidden group-open:block" style="line-height:0.5">-</span>
            </summary>
            <div class="pb-6 text-gray-600 text-[15px] leading-relaxed">
              {{ faq.answer }}
            </div>
          </details>
        </div>

        <div class="mt-12 text-center">
          <router-link to="/faqs" class="inline-block px-12 py-3.5 bg-black text-white text-[14px] font-bold hover:bg-gray-800 transition">
            All FAQs
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import publicApi from '@/services/publicApi'

const route = useRoute()
const router = useRouter()

const buildingTypeOptions = [
  'Residential',
  'Commercial',
  'Multifamily',
  'Hospitality',
  'Supportive',
  'Other'
]

const livingUnitOptions = ['1-10', '11-50', '51-100', '101+']
const hearAboutOptions = [
  'Google Search',
  'Social Media',
  'Friend / Colleague',
  'Advertisement',
  'Other'
]
const preferredTimeOptions = [
  'Morning (9 AM - 12 PM)',
  'Afternoon (1 PM - 4 PM)',
  'Late Afternoon (4 PM - 6 PM)'
]

const countryCodeOptions = [
  { value: '+1', label: '+1 (US/Canada)' },
  { value: '+44', label: '+44 (UK)' },
  { value: '+61', label: '+61 (Australia)' },
  { value: '+84', label: '+84 (Vietnam)' }
]

const projectFaqPreview = [
  {
    question: 'Do you provide architectural drawings for permitting?',
    answer: 'Yes, we provide the necessary architectural and engineering drawings required for your local permitting process as part of our comprehensive package.'
  },
  {
    question: 'Can your homes be stacked (multi-story)?',
    answer: 'Absolutely. Many of our modular units are designed to be stackable, making them an excellent choice for multi-family or medium-density projects.'
  },
  {
    question: 'Do your homes include HVAC, solar panels, or smart systems?',
    answer: 'Our standard modules include high-efficiency HVAC pre-installation. Solar integrations and advanced smart home packages are available as premium upgrades.'
  },
  {
    question: 'What construction methods do you use?',
    answer: 'We utilize state-of-the-art precision volumetric modular construction in our controlled factory environment, ensuring high quality and reduced waste.'
  },
  {
    question: 'Can I customize the layout of the home?',
    answer: 'Yes, while we offer optimized standard floor plans, customization options are available for project-scale orders. Our design team will work closely with you.'
  }
]

const validEnquiryTypes = ['project', 'general']

const getInitialEnquiryType = () => {
  const queryType = route.query.type?.toLowerCase()
  if (queryType === 'home_general') return 'general'
  if (validEnquiryTypes.includes(queryType)) {
    return queryType
  }
  return 'project'
}

const currentEnquiryType = ref(getInitialEnquiryType())
const isProjectEnquiry = computed(() => currentEnquiryType.value === 'project')

const setEnquiryType = (type) => {
  if (validEnquiryTypes.includes(type)) {
    currentEnquiryType.value = type
    router.replace({ query: { ...route.query, type } })
  }
}

import { watch } from 'vue'
watch(() => route.query.type, () => {
  const newType = getInitialEnquiryType()
  if (currentEnquiryType.value !== newType) {
    currentEnquiryType.value = newType
  }
})

// Ensure the form state persists so I don't lose the hard work done for validation!
const projectForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '',
  phoneNumber: '',
  buildingType: '',
  livingUnits: '',
  area: '',
  hearAbout: '',
  hearAboutOther: '',
  note: '',
  arrangeTour: false,
  preferredDay: '',
  preferredTime: '',
  fileUrl: null
})

const selectedProjectFile = ref(null)
const projectFileInput = ref(null)

const handleProjectFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    if (file.size > 5 * 1024 * 1024) { 
      alert('File size exceeds 5MB limit.')
      clearProjectFile()
      return
    }
    selectedProjectFile.value = file
  }
}

const clearProjectFile = () => {
  selectedProjectFile.value = null
  if (projectFileInput.value) {
    projectFileInput.value.value = ''
  }
}

const generalForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '',
  phoneNumber: '',
  hearAbout: '',
  hearAboutOther: '',
  note: '',
  getBrochure: false
})

const isProjectSubmitting = ref(false)
const isGeneralSubmitting = ref(false)
const isSubmitted = ref(false)
const submitFeedback = ref(null)

const submitProjectForm = async () => {
  if (isProjectSubmitting.value) return
  isProjectSubmitting.value = true
  submitFeedback.value = null

  try {
    const payload = {
      first_name: projectForm.firstName,
      last_name: projectForm.lastName,
      email: projectForm.email,
      phone: projectForm.phoneNumber,
      country_code: projectForm.countryCode,
      enquiry_type: 'project',
      building_type: projectForm.buildingType || null,
      living_units: projectForm.livingUnits || null,
      area: projectForm.area || null,
      source: projectForm.hearAbout === 'Other' ? projectForm.hearAboutOther : projectForm.hearAbout,
      message: projectForm.note,
      arrange_tour: projectForm.arrangeTour,
      preferred_day: projectForm.preferredDay || null,
      preferred_time: projectForm.preferredTime || null,
      file_url: selectedProjectFile.value ? `uploaded_${selectedProjectFile.value.name}` : null
    }

    await publicApi.post('/api/v1/contacts', payload)
    
    isSubmitted.value = true
    submitFeedback.value = {
      type: 'success',
      text: 'Project enquiry submitted successfully.'
    }
    
  } catch (err) {
    console.error('Project enquiry error:', err)
    submitFeedback.value = {
      type: 'error',
      text: 'Failed to submit enquiry. Please try again.'
    }
  } finally {
    isProjectSubmitting.value = false
  }
}

const submitGeneralForm = async () => {
  if (isGeneralSubmitting.value) return
  isGeneralSubmitting.value = true
  submitFeedback.value = null

  try {
    const payload = {
      first_name: generalForm.firstName,
      last_name: generalForm.lastName,
      email: generalForm.email,
      phone: generalForm.phoneNumber,
      country_code: generalForm.countryCode,
      enquiry_type: 'general',
      source: generalForm.hearAbout === 'Other' ? generalForm.hearAboutOther : generalForm.hearAbout,
      message: generalForm.note,
      get_brochure: generalForm.getBrochure
    }

    await publicApi.post('/api/v1/contacts', payload)
    
    isSubmitted.value = true
    submitFeedback.value = {
      type: 'success',
      text: 'General enquiry submitted successfully.'
    }
    
  } catch (err) {
    console.error('General enquiry error:', err)
    submitFeedback.value = {
      type: 'error',
      text: 'Failed to submit enquiry. Please try again.'
    }
  } finally {
    isGeneralSubmitting.value = false
  }
}
</script>
