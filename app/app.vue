<template>
  <v-app ref="appRef" :class="{ 'home-mode': isHome }">
    <a class="u-sr-only" href="#main">Skip to content</a>

    <Headers class="sticky-header" :go-to="goTo" :current-index="currentIndex" />

    <template v-if="isHome">
      <main id="main" class="sections-wrap" ref="wrap">
        <section class="section" aria-label="Introduction">
          <Header />
        </section>
        <section class="section" aria-label="About">
          <AboutMe />
        </section>
        <section class="section" aria-label="Selected work">
          <Projects />
        </section>
        <section class="section" aria-label="Services">
          <Services />
        </section>
        <section class="section" aria-label="Experience">
          <ExperiencePage />
        </section>
        <section class="section" aria-label="Contact">
          <ContactMe />
        </section>
        <section class="section" aria-label="Footer">
          <Footer />
        </section>
      </main>

      <!-- Section indicator: replaces the scrollbar the snap mode hides, and
           is keyboard operable rather than decoration. -->
      <nav v-if="isHomeDesktop" class="section-dots" aria-label="Page sections">
        <button v-for="(label, i) in sectionLabels" :key="label" class="dot"
          :class="{ active: currentIndex === i }" :aria-current="currentIndex === i ? 'true' : undefined"
          :aria-label="label" @click="goTo(i)">
          <span class="dot-tip">{{ label }}</span>
        </button>
      </nav>
    </template>

    <!-- Nuxt pages render here for all non-home routes -->
    <v-main v-else class="page-main">
      <div id="main">
        <NuxtPage />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from '#app'
import { useTheme as useVuetifyTheme } from 'vuetify'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import AboutMe from '../components/aboutme.vue'
import Projects from '../components/Projects.vue'
import Services from '../components/Services.vue'
import Headers from '../components/Headers.vue'
import ContactMe from '../components/contactMe.vue'
import ExperiencePage from '../components/ExperiencePage.vue'
import { useColorTheme } from '~/composables/useColorTheme'

const sectionLabels = ['Intro', 'About', 'Projects', 'Services', 'Experience', 'Contact', 'Footer']

const wrap = ref(null)
const currentIndex = ref(0)
const isMobile = ref(false)
const reduceMotion = ref(false)
let isAnimating = false
let touchStartY = 0

const route = useRoute()
const isHome = computed(() => route.path === '/')
const isHomeDesktop = computed(() => isHome.value && !isMobile.value)

// Keep Vuetify's own theme in step with the CSS-variable theme, so v-card,
// v-dialog and friends follow the toggle instead of staying light.
const { theme } = useColorTheme()
const vuetifyTheme = useVuetifyTheme()
watch(
  theme,
  (value) => {
    vuetifyTheme.change(value === 'light' ? 'portfolioLight' : 'portfolioDark')
  },
  { immediate: true }
)

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
    window.scrollTo({ top, behavior: reduceMotion.value ? 'auto' : 'smooth' })
    return
  }

  if (i === currentIndex.value) return
  currentIndex.value = i

  // Reduced motion: jump straight there, no animation, no lock-out window.
  if (reduceMotion.value) {
    wrapEl.style.transition = 'none'
    wrapEl.style.transform = `translateY(-${i * 100}vh)`
    return
  }

  isAnimating = true
  wrapEl.style.transition = 'transform var(--dur-slow) var(--ease)'
  wrapEl.style.transform = `translateY(-${i * 100}vh)`
  window.setTimeout(() => {
    isAnimating = false
    wrapEl.style.transition = ''
  }, 620)
}

// Never hijack the wheel over an open dialog or any scrollable overlay.
const inOverlay = (target) =>
  target instanceof Element && !!target.closest('.v-overlay, [role="dialog"]')

const handleWheel = (e) => {
  if (!isHomeDesktop.value) return
  if (inOverlay(e.target)) return
  e.preventDefault()
  if (isAnimating) return
  if (e.deltaY > 0) goTo(currentIndex.value + 1)
  else if (e.deltaY < 0) goTo(currentIndex.value - 1)
}

const handleKey = (e) => {
  if (!isHomeDesktop.value) return
  if (inOverlay(e.target)) return
  // Let people type in the contact form without paging the site.
  const tag = e.target?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return
  if (isAnimating) return

  const count = wrap.value?.children.length ?? 1
  switch (e.key) {
    case 'ArrowDown':
    case 'PageDown':
      e.preventDefault()
      goTo(currentIndex.value + 1)
      break
    case 'ArrowUp':
    case 'PageUp':
      e.preventDefault()
      goTo(currentIndex.value - 1)
      break
    case 'Home':
      e.preventDefault()
      goTo(0)
      break
    case 'End':
      e.preventDefault()
      goTo(count - 1)
      break
  }
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

let motionQuery = null
const onMotionChange = (e) => (reduceMotion.value = e.matches)

onMounted(() => {
  setViewportMode()
  window.addEventListener('resize', setViewportMode)

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduceMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', onMotionChange)

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
  motionQuery?.removeEventListener('change', onMotionChange)
  disableHomeScroll()
})
</script>

<style scoped>
.v-application,
.v-application__wrap,
.v-app {
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg);
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
  background-color: var(--bg);
  /* Centre within the space below the fixed header, so section headings are
     never tucked underneath it. */
  padding-top: var(--header-h);
}

/* The hero is designed full-bleed and handles its own header clearance. */
.section:first-child {
  padding-top: 0;
}

.page-main {
  min-height: 100vh;
  width: 100%;
  overflow: auto;
  padding-top: var(--header-h);
  background-color: var(--bg);
}

/* ---- Section indicator ---- */
.section-dots {
  position: fixed;
  right: var(--space-5);
  top: 50%;
  transform: translateY(-50%);
  z-index: 1500;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.dot {
  position: relative;
  /* 44px hit area around an 8px visual dot. */
  width: 44px;
  height: 24px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.dot::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--border-control);
  transition: background-color var(--dur) var(--ease), height var(--dur) var(--ease);
}

.dot:hover::after {
  background: var(--accent);
}

.dot.active::after {
  background: var(--accent);
  height: 22px;
  border-radius: var(--radius-full);
}

.dot-tip {
  position: absolute;
  right: calc(100% - 4px);
  white-space: nowrap;
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--text-muted);
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-3);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--dur) var(--ease);
}

.dot:hover .dot-tip,
.dot:focus-visible .dot-tip {
  opacity: 1;
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
    padding: var(--space-5) var(--space-3);
  }

  .section:first-child {
    padding-top: var(--space-5);
  }

  .page-main {
    padding-top: 64px;
  }

  .section-dots {
    display: none;
  }
}
</style>
