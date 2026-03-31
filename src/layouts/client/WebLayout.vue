<template>
  <div class="min-h-screen flex flex-col font-sans text-gray-900 selection:bg-brand selection:text-white">
    <Navbar />
    <main class="grow" style="padding-top: 80px;">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/client/Navbar.vue'
import Footer from '@/components/client/Footer.vue'
</script>

