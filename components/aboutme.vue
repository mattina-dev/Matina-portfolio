<template>
  <v-container class="my-16">
    <v-row align="center" justify="space-between">
      <!-- About Text -->
      <v-col cols="12" md="6">
        <h2 class="display-1 font-weight-bold mb-4">About Me</h2>
        <p class="text-h6 mb-4">
          Hi! I’m Matina Safaei, a passionate Frontend Developer and UI/UX Enthusiast. I love
          creating clean, interactive, and user-friendly web experiences. I enjoy combining
          design and functionality to build websites and apps that delight users.
        </p>
        <p class="text-h6">
          My main focus is on modern frontend technologies, responsive design, and smooth
          animations. I’m constantly learning and exploring new ways to improve my craft.
        </p>
      </v-col>

      <!-- Skills List -->
      <v-col cols="12" md="5">
        <h3 class="text-h5 font-weight-bold mb-3">Skills & Tools</h3>
        <v-row>
          <v-col cols="6" v-for="(skill, index) in skills" :key="index">
            <v-chip outlined class="ma-2">{{ skill }}</v-chip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const skills = [
  'Vue.js', 'Nuxt 3', 'JavaScript', 'TypeScript', 
  'HTML5 & CSS3', 'Vuetify', 'UI/UX Design', 
  'Figma', 'Responsive Design', 'GSAP Animations'
]
</script>

<style scoped>
.v-container {
  max-width: 1200px;
}

h2, h3 {
  color: #6b4226; /* subtle brown tone to match your style */
}

v-chip {
  font-weight: 500;
  color: #4e2c0a; /* darker brown for text */
}
</style>