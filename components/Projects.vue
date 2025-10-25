<template>
    <div class="base">
        <h2 class="mt-8 mb-0">Projects:</h2>
        <div class="carousel">
            <div class="carousel-track" ref="track">
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
        link: '', // add website if available
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
        link: '', // add website if available
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
const duplicatedProjects = [...projects, ...projects]

const track = ref(null)
const pause = ref(false)
const speed = 0.5
let animationFrame = null
let position = 0

function animate() {
    if (!pause.value && track.value) {
        position -= speed
        const halfWidth = track.value.scrollWidth / 2
        if (Math.abs(position) >= halfWidth) position = 0
        track.value.style.transform = `translateX(${position}px)`
    }
    animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
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
    height: 500px;
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