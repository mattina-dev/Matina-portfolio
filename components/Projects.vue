<template>
    <div class="base">
        <h2 class="mt-8 mb-0">Projects:</h2>
        <div class="carousel">
            <div class="carousel-track" ref="track" :style="{ transform: `translateX(${position}px)` }">
                <ProjectsCard v-for="(project, index) in duplicatedProjects" :key="index" :image="project.image"
                    :title="project.title" :description="project.description" :techStack="project.techStack"
                    :buttonText="project.buttonText" :link="project.link" @mouseenter="pause = true"
                    @mouseleave="pause = false" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ProjectsCard from '../components/ProjectsCard.vue'

const projects = [
    {
        image: '/projects/eivan.png',
        title: 'Eivan Online',
        description: 'Built scalable, mobile-friendly web apps with Vue.js and TypeScript. Ensured UI consistency and rapid product iterations.',
        techStack: ['Vue.js', 'TypeScript', 'Vuex', 'UI/UX', '+6 skills'],
        buttonText: 'View Website',
        link: '',
    },
    {
        image: '/projects/majara.png',
        title: 'Majara',
        description: 'Improved and redesigned the admin panel. Cleaned code and made the interface intuitive and consistent.',
        techStack: ['Vue.js', 'Front-end Development', 'UI/UX'],
        buttonText: 'View Homepage',
        link: 'https://www.majara.io/',
    },
    {
        image: '/projects/tritapp.png',
        title: 'TritApp',
        description: 'Built responsive interfaces, collaborated with product/design teams, and optimized front-end performance.',
        techStack: ['Vue.js', 'Vuex', 'UI/UX', '+4 skills'],
        buttonText: 'View Project',
        link: '',
    },
    {
        image: '/projects/gama.png',
        title: 'Gama Train',
        description: 'Built scalable, mobile-friendly apps with Vue.js and TypeScript. Ensured UI consistency and rapid product iterations.',
        techStack: ['Vue.js', 'Pinia', 'Front-End Development', '+1 skill'],
        buttonText: 'View Project',
        link: '',
    },
    {
        image: '/projects/cyc.png',
        title: 'Cyclical Waves',
        description: 'Developed high-performance web apps with Vue.js and TypeScript. Integrated real-time crypto APIs and improved UX.',
        techStack: ['JavaScript', 'Front-end Coding', '+2 skills'],
        buttonText: 'View Project',
        link: '',
    },
]

// Duplicate projects for seamless loop
const duplicatedProjects = [...projects, ...projects, ...projects]

const track = ref(null)
const pause = ref(false)
const speed = 0.7
let animationFrame = null
const position = ref(0)
let trackWidth = 0

function animate() {
    if (!pause.value && track.value) {
        position.value -= speed
        // وقتی به نصف track رسیدیم، position را دوباره جلو می‌بریم تا پرش دیده نشود
        if (Math.abs(position.value) >= trackWidth / 3) {
            position.value += trackWidth / 3
        }
    }
    animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
    trackWidth = track.value.scrollWidth
    animationFrame = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
    cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
.base {
    background-color: #fdf6f0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    /* height: 100vh; */
}

.carousel {
    overflow: hidden;
    width: 100%;
    height: 500px;
}

.carousel-track {
    display: flex;
    gap: 24px;
    width: max-content;
    will-change: transform;
}
</style>