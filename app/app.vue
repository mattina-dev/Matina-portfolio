<template>
  <v-app ref="appRef">
    <Header class="section" />
    <aboutme class="section" />
    <Projects class="section" />
    <NuxtPage class="section" />
    <Footer class="section" />
  </v-app>
</template>

<script setup>
import { onMounted, ref, nextTick, onUnmounted } from 'vue'
import Lenis from '@studio-freight/lenis'

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import aboutme from '../components/aboutme.vue'
import Projects from '../components/Projects.vue'

const appRef = ref(null)

onMounted(async () => {
  await nextTick()

  const sections = document.querySelectorAll('.section')
  let currentIndex = 0
  let isScrolling = false

  const lenis = new Lenis({
    duration: 1,
    easing: (t) => t,
    smooth: true,
  })

  const scrollToIndex = (index) => {
    if (index < 0) index = 0
    if (index >= sections.length) index = sections.length - 1
    currentIndex = index
    const targetY = window.innerHeight * index
    isScrolling = true
    lenis.scrollTo(targetY, { duration: 1 })
    setTimeout(() => (isScrolling = false), 1100)
  }

  const handleWheel = (e) => {
    e.preventDefault()
    if (isScrolling) return

    if (e.deltaY > 50) scrollToIndex(currentIndex + 1)
    else if (e.deltaY < -50) scrollToIndex(currentIndex - 1)
  }

  // برای لمس موبایل
  let touchStartY = 0
  const handleTouchStart = (e) => (touchStartY = e.touches[0].clientY)
  const handleTouchEnd = (e) => {
    if (isScrolling) return
    const diff = touchStartY - e.changedTouches[0].clientY
    if (diff > 50) scrollToIndex(currentIndex + 1)
    else if (diff < -50) scrollToIndex(currentIndex - 1)
  }

  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchend', handleTouchEnd, { passive: true })

  const raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  onUnmounted(() => {
    window.removeEventListener('wheel', handleWheel)
    window.removeEventListener('touchstart', handleTouchStart)
    window.removeEventListener('touchend', handleTouchEnd)
  })
})
</script>

<style scoped>
.section {
  height: 100vh;
  width: 100%;
}

html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

v-app {
  overflow: hidden;
  position: relative;
}
</style>
