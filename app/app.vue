<template>
  <v-app ref="appRef" :class="{ 'home-mode': isHome }">
    <Headers class="sticky-header" :go-to="goTo" :current-index="currentIndex" />

    <template v-if="isHome">
      <div class="sections-wrap" ref="wrap">
        <section class="section">
          <Header />
        </section>
        <section class="section">
          <AboutMe />
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
          <ContactMe />
        </section>
        <section class="section">
          <Footer />
        </section>
      </div>
    </template>

    <!-- Nuxt pages render here for all non-home routes -->
    <v-main v-else class="page-main">
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from '#app'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import AboutMe from '../components/aboutme.vue'
import Projects from '../components/Projects.vue'
import Services from '../components/Services.vue'
import Headers from '../components/Headers.vue'
import ContactMe from '../components/contactMe.vue'
import ExperiencePage from '../components/ExperiencePage.vue'


const wrap = ref(null)
const currentIndex = ref(0)
const isMobile = ref(false)
let isAnimating = false
let touchStartY = 0

const route = useRoute()
const isHome = computed(() => route.path === '/')
const isHomeDesktop = computed(() => isHome.value && !isMobile.value)
const setViewportMode = () => {
  isMobile.value = window.innerWidth <= 960
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

const goTo = (index) => {
  const wrapEl = wrap.value
  if (!wrapEl) return
  const count = wrapEl.children.length
  const i = clamp(index, 0, count - 1)

  if (!isHomeDesktop.value) {
    currentIndex.value = i
    const target = wrapEl.children[i]
    if (!target) return
    const headerOffset = 88
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset
    window.scrollTo({ top, behavior: 'smooth' })
    return
  }

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
  if (!isHomeDesktop.value) return
  e.preventDefault()
  if (isAnimating) return
  if (e.deltaY > 0) goTo(currentIndex.value + 1)
  else if (e.deltaY < 0) goTo(currentIndex.value - 1)
}

const handleKey = (e) => {
  if (!isHomeDesktop.value) return
  if (isAnimating) return
  if (e.key === 'ArrowDown' || e.key === 'PageDown') goTo(currentIndex.value + 1)
  else if (e.key === 'ArrowUp' || e.key === 'PageUp') goTo(currentIndex.value - 1)
}

const handleTouchStart = (e) => (touchStartY = e.touches[0].clientY)
const handleTouchEnd = (e) => {
  if (!isHomeDesktop.value) return
  if (isAnimating) return
  const diff = touchStartY - e.changedTouches[0].clientY
  if (diff > 50) goTo(currentIndex.value + 1)
  else if (diff < -50) goTo(currentIndex.value - 1)
}

const enableHomeScroll = async () => {
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
}

const disableHomeScroll = () => {
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('keydown', handleKey)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
}

onMounted(() => {
  setViewportMode()
  window.addEventListener('resize', setViewportMode)
  watch(
    isHomeDesktop,
    (homeDesktop) => {
      if (homeDesktop) enableHomeScroll()
      else disableHomeScroll()
    },
    { immediate: true }
  )
})

onUnmounted(() => {
  window.removeEventListener('resize', setViewportMode)
  disableHomeScroll()
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
  min-height: 100vh;
  width: 100%;
}

.home-mode {
  height: 100%;
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

.page-main {
  min-height: 100vh;
  width: 100%;
  overflow: auto;
  padding-top: 88px;
  background-color: #fdf6f0;
}

@media (max-width: 960px) {
  .home-mode {
    height: auto;
    overflow: auto;
  }

  .sections-wrap {
    height: auto;
    transform: none !important;
  }

  .section {
    height: auto;
    min-height: 100svh;
    padding: 1.2rem 0.8rem;
  }

  .page-main {
    padding-top: 76px;
  }
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
