<template>
  <div>
    <Header />
    <aboutme/>
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import aboutme from '../components/aboutme.vue'
</script>