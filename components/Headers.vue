<template>
    <header :class="['site-header', { scrolled: isScrolled }]">
        <nav class="nav-container">
            <div class="logo">
                <a href="/" @click.prevent="handleLogoClick">Matina<span>Safaei</span></a>
            </div>

            <ul class="nav-links">
                <li :class="{ active: isHome && props.currentIndex === 1 }"><a @click.prevent="navigate(1)">About</a>
                </li>
                <li :class="{ active: isHome && props.currentIndex === 2 }"><a @click.prevent="navigate(2)">Projects</a>
                </li>
                <li :class="{ active: isHome && props.currentIndex === 3 }"><a @click.prevent="navigate(3)">Services</a>
                </li>
                <li :class="{ active: isHome && props.currentIndex === 4 }"><a
                        @click.prevent="navigate(4)">Experience</a></li>
                <li :class="{ active: isHome && props.currentIndex === 5 }"><a @click.prevent="navigate(5)">Contact</a>
                </li>
                <li :class="{ active: route.path === '/demo/trading' }">
                    <NuxtLink to="/demo/trading">Live Demo</NuxtLink>
                </li>
            </ul>

            <a class="resume-btn" href="/matina-safaei-resume.pdf" download>
                <i class="mdi mdi-download-outline" />
                <span>Resume</span>
            </a>
        </nav>
    </header>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from '#app'

const isScrolled = ref(false)
const route = useRoute()
const router = useRouter()

const handleScroll = () => {
    // optional if you ever use native scroll
    isScrolled.value = window.scrollY > 30
}
const props = defineProps({
    goTo: Function,
    currentIndex: Number
})

const isHome = computed(() => route.path === '/')

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
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.9);
    width: min(92%, 980px);
    z-index: 2000;
    backdrop-filter: blur(8px);
    transition: all 0.4s ease;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.site-header.scrolled {
    /* background: rgba(253, 246, 240, 0.95); */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 0.4rem 0;
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.9rem 1.4rem;

    width: 100%;
    font-family: 'Montserrat', sans-serif;
}

.logo a {
    font-size: 1.4rem;
    font-weight: 700;
    color: #945034;
    text-decoration: none;
    transition: color 0.3s ease;
    cursor: pointer;
}

.logo span {
    color: #5b2b1a;
}

.logo a:hover {
    color: #5b2b1a;
}

.nav-links {
    display: flex;
    gap: 1.2rem;
    list-style: none;
    margin: 0 auto 0 2rem;
    padding: 0;
}

.resume-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.42rem 0.95rem;
    border-radius: 999px;
    background: linear-gradient(90deg, #7b440d 0%, #b57f3d 100%);
    color: #fff8f2;
    font-weight: 700;
    font-size: 0.86rem;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    transition: filter 0.25s ease, transform 0.25s ease;
}

@media (hover: hover) and (pointer: fine) {
    .resume-btn:hover {
        filter: brightness(1.08);
        transform: translateY(-1px);
    }
}

.nav-links a,
.nav-links :deep(a) {
    color: #7a4a2f;
    text-decoration: none;
    font-weight: 500;
    letter-spacing: 0.5px;
    position: relative;
    transition: color 0.3s ease;
    cursor: pointer;
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: #945034;
    transition: width 0.3s ease;
}

.nav-links a:hover::after {
    width: 100%;
}

.nav-links a:hover {
    color: #945034;
}

.nav-links li.active a {
    color: #945034;
    font-weight: 700;
}

.nav-links li.active a::after {
    width: 100%;
}

@media (max-width: 900px) {
    .site-header {
        top: 8px;
        border-radius: 18px;
    }

    .nav-container {
        padding: 0.65rem 0.8rem;
        gap: 0.8rem;
    }

    .logo a {
        font-size: 1rem;
    }

    .nav-links {
        margin: 0 0.5rem;
        gap: 0.7rem;
        overflow-x: auto;
        white-space: nowrap;
        scrollbar-width: none;
    }

    .resume-btn {
        padding: 0.36rem 0.7rem;
        font-size: 0.78rem;
    }

    .resume-btn span {
        display: none;
    }

    .resume-btn::after {
        content: 'CV';
    }

    .nav-links::-webkit-scrollbar {
        display: none;
    }

    .nav-links a {
        font-size: 0.88rem;
    }
}
</style>
