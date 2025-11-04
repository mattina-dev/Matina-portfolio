<template>
    <header :class="['site-header', { scrolled: isScrolled }]">
        <nav class="nav-container">
            <div class="logo">
                <a @click.prevent="props.goTo(0)">Matina<span>Safaei</span></a>
            </div>

            <ul class="nav-links">
                <li :class="{ active: props.currentIndex === 1 }"><a @click.prevent="props.goTo(1)">About</a></li>
                <li :class="{ active: props.currentIndex === 2 }"><a @click.prevent="props.goTo(2)">Projects</a></li>
                <li :class="{ active: props.currentIndex === 3 }"><a @click.prevent="props.goTo(3)">Services</a></li>
                <li :class="{ active: props.currentIndex === 4 }"><a @click.prevent="props.goTo(4)">Contact</a></li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
    // optional if you ever use native scroll
    isScrolled.value = window.scrollY > 30
}
const props = defineProps({
    goTo: Function,
    currentIndex: Number
})
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
    width: 60%;
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
    padding: 1rem 4rem;

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
    gap: 2rem;
    list-style: none;
    margin: 0;
}

.nav-links a {
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
</style>