<template>
    <header :class="['site-header', { scrolled: isScrolled }]">
        <nav class="nav-container" aria-label="Main">
            <div class="logo">
                <a href="/" @click.prevent="handleLogoClick">Matina<span>Safaei</span></a>
            </div>

            <ul class="nav-links">
                <li v-for="item in sections" :key="item.label"
                    :class="{ active: isHome && props.currentIndex === item.index }">
                    <a href="/" :aria-current="isHome && props.currentIndex === item.index ? 'true' : undefined"
                        @click.prevent="navigate(item.index)">{{ item.label }}</a>
                </li>
                <li :class="{ active: isDemoRoute }">
                    <NuxtLink to="/demo/trading" :aria-current="isDemoRoute ? 'page' : undefined">Live Demo</NuxtLink>
                </li>
            </ul>

            <div class="nav-actions">
                <button type="button" class="icon-btn" :aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
                    :aria-pressed="isDark" @click="toggle">
                    <i :class="isDark ? 'mdi mdi-weather-night' : 'mdi mdi-weather-sunny'" aria-hidden="true" />
                </button>

                <a class="resume-btn" href="/matina-safaei-resume.pdf" download>
                    <i class="mdi mdi-download-outline" aria-hidden="true" />
                    <span class="resume-label">Resume</span>
                </a>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from '#app'
import { useColorTheme } from '~/composables/useColorTheme'

const sections = [
    { label: 'About', index: 1 },
    { label: 'Projects', index: 2 },
    { label: 'Services', index: 3 },
    { label: 'Experience', index: 4 },
    { label: 'Contact', index: 5 },
]

const isScrolled = ref(false)
const route = useRoute()
const router = useRouter()
const { isDark, toggle } = useColorTheme()

const handleScroll = () => {
    isScrolled.value = window.scrollY > 30
}
const props = defineProps({
    goTo: Function,
    currentIndex: Number
})

const isHome = computed(() => route.path === '/')
const isDemoRoute = computed(() => route.path === '/demo/trading')

const handleLogoClick = async () => {
    if (isHome.value) {
        if (props.goTo) props.goTo(0)
        return
    }
    await router.push('/')
}

// Section links only scroll on the home page; from a sub-route they route home first.
const navigate = async (index) => {
    if (!isHome.value) {
        await router.push('/')
        await nextTick()
    }
    if (props.goTo) props.goTo(index)
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.site-header {
    position: fixed;
    top: var(--space-3);
    left: 50%;
    transform: translateX(-50%);
    background: color-mix(in srgb, var(--bg-elev) 88%, transparent);
    width: min(94%, 1060px);
    z-index: 2000;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--border);
    border-radius: var(--radius-full);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow-sm);
    transition: box-shadow var(--dur) var(--ease), background-color var(--dur) var(--ease);
}

.site-header.scrolled {
    box-shadow: var(--shadow);
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-2) var(--space-2) var(--space-2) var(--space-5);
    width: 100%;
}

.logo a {
    font-size: 1.0625rem;
    font-weight: 700;
    letter-spacing: var(--track-heading);
    color: var(--accent);
    text-decoration: none;
    white-space: nowrap;
    transition: color var(--dur) var(--ease);
}

.logo span {
    color: var(--text);
}

.logo a:hover {
    color: var(--accent-hover);
}

.nav-links {
    display: flex;
    gap: var(--space-5);
    list-style: none;
    margin: 0 auto;
    padding: 0;
}

.nav-links a,
.nav-links :deep(a) {
    position: relative;
    display: inline-block;
    padding: var(--space-2) 0;
    color: var(--text-muted);
    text-decoration: none;
    font-size: var(--text-sm);
    font-weight: 500;
    white-space: nowrap;
    transition: color var(--dur) var(--ease);
}

.nav-links a::after,
.nav-links :deep(a)::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 0;
    height: 2px;
    border-radius: 2px;
    background-color: var(--accent);
    transition: width var(--dur) var(--ease);
}

.nav-links a:hover,
.nav-links :deep(a):hover {
    color: var(--text);
}

.nav-links a:hover::after,
.nav-links :deep(a):hover::after {
    width: 100%;
}

.nav-links li.active a,
.nav-links li.active :deep(a) {
    color: var(--accent);
    font-weight: 600;
}

.nav-links li.active a::after,
.nav-links li.active :deep(a)::after {
    width: 100%;
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    flex-shrink: 0;
}

.icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    border: 1px solid transparent;
    background: transparent;
    color: var(--text-muted);
    font-size: 1.15rem;
    cursor: pointer;
    transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease);
}

.icon-btn:hover {
    background: var(--bg-subtle);
    color: var(--accent);
}

.resume-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: 40px;
    padding: 0 var(--space-4);
    border-radius: var(--radius-full);
    background: var(--accent);
    color: var(--on-accent);
    font-weight: 600;
    font-size: var(--text-sm);
    text-decoration: none;
    white-space: nowrap;
    transition: background-color var(--dur) var(--ease);
}

.resume-btn:hover {
    background: var(--accent-hover);
}

@media (max-width: 900px) {
    .site-header {
        top: var(--space-2);
        width: 96%;
        border-radius: var(--radius-lg);
    }

    .nav-container {
        padding: var(--space-2) var(--space-2) var(--space-2) var(--space-3);
        gap: var(--space-2);
    }

    .logo a {
        font-size: 0.9375rem;
    }

    .nav-links {
        margin: 0;
        gap: var(--space-4);
        overflow-x: auto;
        white-space: nowrap;
        scrollbar-width: none;
        min-width: 0;
    }

    .nav-links::-webkit-scrollbar {
        display: none;
    }

    .nav-links a,
    .nav-links :deep(a) {
        font-size: 0.8125rem;
    }

    .resume-btn {
        padding: 0 var(--space-3);
    }

    .resume-label {
        font-size: 0.8125rem;
    }
}
</style>
