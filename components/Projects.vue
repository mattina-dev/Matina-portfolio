<template>
    <div class="base">
        <div class="section-head">
            <h1 class="mt-8 mb-0">Selected Work</h1>
            <p class="section-sub">
                Real-time dashboards, admin panels and data-heavy interfaces.
                Every card opens a short case study: the problem, what I built, and what changed.
            </p>
        </div>

        <div class="carousel">
            <div class="carousel-track" ref="track" :style="{ transform: `translateX(${position}px)` }">
                <ProjectsCard v-for="(project, index) in duplicatedProjects" :key="index" :image="project.image"
                    :title="project.title" :role="project.role" :description="project.description"
                    :techStack="project.techStack" :buttonText="project.buttonText" :link="project.link"
                    :caseStudy="project.caseStudy" @mouseenter="pause = true" @mouseleave="pause = false"
                    @modal="modalOpen = $event" />
            </div>
        </div>

        <NuxtLink to="/demo/trading" class="demo-cta">
            <i class="mdi mdi-chart-line" />
            Or skip the reading — open the live real-time dashboard demo
        </NuxtLink>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import ProjectsCard from '../components/ProjectsCard.vue'

/*
 * NOTE FOR MATINA: the narratives below are grounded in what these projects
 * actually were. Where you know the real number (users, load time, bundle size,
 * ticks/second, sprint count), swap the qualitative phrase for the figure —
 * hiring managers scan for digits. Only add numbers you can defend in a call.
 *
 * `link` must be a real, public, no-login URL or left empty. An empty link
 * renders a "Private / NDA" badge instead of a button that goes nowhere.
 */
const projects = [
    {
        image: '/projects/cyc.png',
        title: 'Cyclical Waves',
        role: 'Frontend Developer · Jan 2023 – Jun 2024',
        description:
            'Live crypto market dashboards: streaming price data rendered without freezing the UI.',
        techStack: ['Vue.js', 'TypeScript', 'WebSocket', 'Real-time charts', 'UX'],
        buttonText: 'Visit site',
        link: '',
        caseStudy: {
            problem:
                'Trading screens had to show continuously streaming cryptocurrency prices across several markets at once. Naively binding every incoming tick to the DOM made charts and tables stutter, and the interface became unusable exactly when the market moved fastest — the moment traders actually need it.',
            actions: [
                'Integrated live cryptocurrency market APIs and normalised several feed formats into one typed data model in TypeScript.',
                'Buffered incoming ticks and flushed them on an animation frame instead of re-rendering per message, so render work stayed decoupled from feed volume.',
                'Kept the price chart off the reactive graph — drawing it directly rather than re-diffing thousands of points on every update.',
                'Capped in-memory history per symbol with a rolling window so long sessions did not grow unbounded.',
                'Applied UX and accessibility passes to the market navigation so dense numeric data stayed readable.',
            ],
            result:
                'Charts and price tables stayed smooth during high-volume market activity instead of locking up, and long trading sessions no longer degraded over time. This project is the backbone of my fintech and real-time data specialisation.',
        },
    },
    {
        // TODO: add public/projects/eivan.png — until then the card shows a clean
        // initials placeholder instead of a broken image.
        image: '',
        title: 'Eivan Online',
        role: 'Frontend Developer · Apr 2025 – Sep 2025',
        description:
            'Scaled a growing product into a consistent, mobile-first component system built for fast iteration.',
        techStack: ['Vue.js', 'TypeScript', 'Vuex', 'Tailwind', 'REST API'],
        buttonText: 'Visit site',
        link: '',
        caseStudy: {
            problem:
                'The product was shipping new screens faster than its UI could keep up. Similar components had been re-implemented per page, so layouts drifted apart visually and mobile behaviour was inconsistent — every new feature meant re-solving problems that had already been solved somewhere else in the codebase.',
            actions: [
                'Built a reusable, typed component layer in Vue.js and TypeScript that new screens compose instead of re-implementing.',
                'Standardised responsive behaviour so the same components hold up from small phones to desktop.',
                'Wired state and REST integrations through Vuex so data flow was predictable across features.',
                'Worked directly with product and design through rapid iteration cycles, turning designs into shippable UI.',
            ],
            result:
                'New features became assembly rather than rebuilding, visual consistency held across the app as it grew, and the mobile experience stopped being an afterthought.',
        },
    },
    {
        image: '/projects/tritapp.png',
        title: 'TritApp',
        role: 'Frontend Developer',
        description:
            'Responsive product interfaces built with design and product teams, tuned for front-end performance.',
        techStack: ['Vue.js', 'Vuex', 'Responsive UI', 'Performance', 'UI/UX'],
        buttonText: 'Visit site',
        link: '',
        caseStudy: {
            problem:
                'Interfaces needed to work across a wide range of devices while staying fast, and handoff between design and engineering was slow — details were being lost between the mockup and the shipped screen.',
            actions: [
                'Built responsive interfaces from design files, matching spacing, states and edge cases rather than only the happy path.',
                'Cut avoidable front-end work: trimmed unnecessary re-renders and deferred non-critical assets so screens became interactive sooner.',
                'Collaborated closely with product and design so questions were resolved during build instead of in review.',
                'Structured shared state in Vuex to keep feature code readable as the surface area grew.',
            ],
            result:
                'Screens rendered consistently across devices, the shipped UI matched design intent without long correction cycles, and interaction stayed responsive on lower-end hardware.',
        },
    },
    {
        image: '/projects/gama.png',
        title: 'Gama Train',
        role: 'Frontend Developer · Apr 2024 – Aug 2024 · Amsterdam HQ',
        description:
            'Distributed Agile delivery with a European team — reusable Vue + Pinia components and API integration.',
        techStack: ['Vue.js', 'TypeScript', 'Pinia', 'REST API', 'Agile'],
        buttonText: 'Visit site',
        link: '',
        caseStudy: {
            problem:
                'The engineering team was split across time zones with headquarters in Amsterdam, so work had to be self-contained and reviewable asynchronously. Anything ambiguous cost a full day waiting for an answer, and one-off components made handover between contributors expensive.',
            actions: [
                'Built modern Vue.js applications in TypeScript with responsive behaviour as a default, not a follow-up ticket.',
                'Implemented reusable components and REST API integrations through Pinia stores so features could be picked up by anyone on the team.',
                'Worked in Agile sprints across time zones, writing changes to be understandable without a live conversation.',
            ],
            result:
                'Delivered sprint commitments reliably despite the time-zone gap, and left behind components the team kept reusing after the engagement. This is my proof of working remotely with a European team.',
        },
    },
    {
        image: '/projects/majara.png',
        title: 'Majara',
        role: 'Frontend Developer · Aug 2024 – Apr 2025',
        description:
            'Rebuilt a legacy admin panel into an interface operators could actually move through quickly.',
        techStack: ['Vue.js', 'Refactoring', 'Admin UI', 'UI/UX'],
        buttonText: 'View homepage',
        link: 'https://www.majara.io/',
        caseStudy: {
            problem:
                'The admin panel had grown by accretion. Legacy Vue code carried duplicated logic and inconsistent patterns, screens behaved differently from one another, and the people using it daily had to memorise quirks instead of reading the interface. Every change risked breaking something adjacent.',
            actions: [
                'Refactored and modernised the panel, removing duplicated legacy logic and unifying component patterns.',
                'Redesigned the interface for clarity: consistent layout, navigation and states so screens behave the same way everywhere.',
                'Optimised component performance in the heaviest data views.',
                'Worked with UI/UX designers to align the panel with brand identity instead of letting it look like an internal tool.',
            ],
            result:
                'Daily operators moved through routine tasks with less hesitation and fewer support questions, and the codebase became safe to change — new admin features stopped requiring archaeology first.',
        },
    },
]

// Duplicate projects for seamless loop
const duplicatedProjects = [...projects, ...projects, ...projects]

const track = ref(null)
const hovering = ref(false)
const modalOpen = ref(false)
const pause = computed({
    get: () => hovering.value || modalOpen.value,
    set: (value) => (hovering.value = value),
})
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
    padding: 1rem 0 1.2rem;
    /* As a flex item this box would otherwise size to the carousel track's
       max-content width and push its siblings past the viewport edge. */
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
}

.section-head {
    text-align: center;
    padding: 0 1rem;
    width: 100%;
    box-sizing: border-box;
}

.section-sub {
    max-width: min(60ch, 100%);
    margin: 0.5rem auto 0;
    color: #6f5341;
    line-height: 1.65;
}

.carousel {
    overflow: hidden;
    width: 100%;
    height: 540px;
}

.carousel-track {
    display: flex;
    gap: 24px;
    width: max-content;
    will-change: transform;
}

.demo-cta {
    max-width: min(52ch, calc(100% - 2rem));
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: #7a4a2f;
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid #d9bfa6;
    padding-bottom: 2px;
    transition: color 0.25s ease, border-color 0.25s ease;
}

.demo-cta:hover {
    color: #945034;
    border-color: #945034;
}

@media (max-width: 900px) {
    .base {
        padding-top: 4.6rem;
    }

    .section-sub {
        font-size: 0.92rem;
    }

    .carousel {
        height: 510px;
    }

    .carousel-track {
        gap: 14px;
    }

    .demo-cta {
        font-size: 0.88rem;
        text-align: center;
        line-height: 1.5;
    }
}
</style>
