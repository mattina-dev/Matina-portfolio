<template>
  <v-app ref="appRef">
    <Headers class="sticky-header" :go-to="goTo" :current-index="currentIndex" />

    <template v-if="$route.path === '/'">
      <div class="sections-wrap" ref="wrap">
        <section class="section">
          <Header />
        </section>
        <section class="section">
          <aboutme />
        </section>
        <section class="section">
          <Projects />
        </section>
        <section class="section">
          <Services />
        </section>
        <section class="section">
          <ExperiencePage />
        </section>
        <section class="section">
          <contactMe />
        </section>
        <section class="section">
          <Footer />
        </section>
      </div>
    </template>

    <!-- Nuxt pages render here for all non-home routes -->
    <NuxtPage />
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import aboutme from '../components/aboutme.vue'
import Projects from '../components/Projects.vue'
import Services from '../components/Services.vue'
import Headers from '../components/Headers.vue'
import contactMe from '../components/contactMe.vue'
import ExperiencePage from '../components/ExperiencePage.vue'
import Lenis from '@studio-freight/lenis/types'
const scroll = Lenis


const wrap = ref(null)
const currentIndex = ref(0)
let isAnimating = false
let touchStartY = 0

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

const goTo = (index) => {
  const wrapEl = wrap.value
  if (!wrapEl) return
  const count = wrapEl.children.length
  const i = clamp(index, 0, count - 1)
  if (i === currentIndex.value) return
  currentIndex.value = i
  isAnimating = true
  wrapEl.style.transition = 'transform 2000ms cubic-bezier(.25,.8,.25,1)'
  wrapEl.style.transform = `translateY(-${i * 100}vh)`
  setTimeout(() => {
    isAnimating = false
    wrapEl.style.transition = ''
  }, 2050)
}

const handleWheel = (e) => {
  e.preventDefault()
  if (isAnimating) return
  if (e.deltaY > 0) goTo(currentIndex.value + 1)
  else if (e.deltaY < 0) goTo(currentIndex.value - 1)
}

const handleKey = (e) => {
  if (isAnimating) return
  if (e.key === 'ArrowDown' || e.key === 'PageDown') goTo(currentIndex.value + 1)
  else if (e.key === 'ArrowUp' || e.key === 'PageUp') goTo(currentIndex.value - 1)
}

const handleTouchStart = (e) => (touchStartY = e.touches[0].clientY)
const handleTouchEnd = (e) => {
  if (isAnimating) return
  const diff = touchStartY - e.changedTouches[0].clientY
  if (diff > 50) goTo(currentIndex.value + 1)
  else if (diff < -50) goTo(currentIndex.value - 1)
}

onMounted(async () => {
  await nextTick()
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'

  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('keydown', handleKey)
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchend', handleTouchEnd, { passive: true })

  const wrapEl = wrap.value
  if (wrapEl) {
    wrapEl.style.transform = 'translateY(0)'
  }
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('keydown', handleKey)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
})
</script>

<style scoped>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
}
.nuxt-page {
  height: auto !important;
  overflow: visible !important;
}

.v-application,
.v-application__wrap,
.v-app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.sticky-header {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sections-wrap {
  height: 100vh;
  width: 100%;
  display: block;
  will-change: transform;
}

.section {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fdf6f0;

}
</style>

<style>
body {
  font-family: 'Lato', sans-serif !important;
}

h1,
h2,
h3 {
  font-family: 'Montserrat', sans-serif !important;
}
</style>