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
import { onMounted, ref, nextTick } from 'vue'
import Lenis from '@studio-freight/lenis'

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import aboutme from '../components/aboutme.vue'
import Projects from '../components/Projects.vue'

const appRef = ref(null)

onMounted(async () => {
  await nextTick()
  const sections = Array.from(document.querySelectorAll('.section'))
  let currentIndex = 0
  let isLocked = false

  const lenis = new Lenis({
    duration: 1,
    easing: (t) => t,
    smooth: true,
  })

  const scrollToSection = (index) => {
    if (index < 0) index = 0
    if (index >= sections.length) index = sections.length - 1
    currentIndex = index
    isLocked = true
    lenis.scrollTo(sections[index], { offset: 0, duration: 1 })
    setTimeout(() => {
      isLocked = false
    }, 1100)
  }

  // فقط یک اسکرول در هر بار
  let lastScrollTime = 0
  const minDelay = 1000 // فاصله مجاز بین دو اسکرول

  const handleWheel = (e) => {
    e.preventDefault()
    const now = Date.now()
    if (isLocked || now - lastScrollTime < minDelay) return
    lastScrollTime = now

    if (e.deltaY > 30) scrollToSection(currentIndex + 1)
    else if (e.deltaY < -30) scrollToSection(currentIndex - 1)
  }

  // لمس موبایل
  let touchStartY = 0
  const handleTouchStart = (e) => (touchStartY = e.touches[0].clientY)
  const handleTouchEnd = (e) => {
    const diff = touchStartY - e.changedTouches[0].clientY
    const now = Date.now()
    if (isLocked || now - lastScrollTime < minDelay) return
    lastScrollTime = now

    if (diff > 50) scrollToSection(currentIndex + 1)
    else if (diff < -50) scrollToSection(currentIndex - 1)
  }

  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchend', handleTouchEnd, { passive: true })

  const raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
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
