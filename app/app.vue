<template>
  <v-app>
    <Header />
      <aboutme />
      <Projects />
    <NuxtPage />
    <Footer />
  </v-app>
</template>
<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import aboutme from '../components/aboutme.vue'
import Projects from '../components/Projects.vue'
</script>