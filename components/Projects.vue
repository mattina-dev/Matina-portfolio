<template>
    <div class="base">
        <div class="section-head">
            <p class="eyebrow">Selected work</p>
            <h2>Real-time dashboards &amp; data-heavy interfaces</h2>
            <p class="section-sub">
                Every card opens a short case study: the problem, what I built, and what changed.
            </p>
        </div>

        <div class="carousel-shell">
            <div class="carousel" @mouseenter="hovering = true" @mouseleave="hovering = false">
                <ul class="carousel-track" ref="track" :style="{ transform: `translateX(${position}px)` }">
                    <!-- Copies 2 and 3 exist only to make the loop seamless. `inert`
                         keeps them out of the tab order and the accessibility tree,
                         so keyboard users don't traverse the same cards three times. -->
                    <li v-for="(project, index) in duplicatedProjects" :key="index"
                        :inert="index >= projects.length || undefined">
                        <ProjectsCard :image="project.image" :title="project.title" :role="project.role"
                            :description="project.description" :techStack="project.techStack"
                            :buttonText="project.buttonText" :link="project.link" :caseStudy="project.caseStudy"
                            @modal="modalOpen = $event" />
                    </li>
                </ul>
            </div>

            <!-- WCAG 2.2.2: moving content needs a keyboard-operable stop control. -->
            <button type="button" class="marquee-toggle" :aria-pressed="userPaused"
                :aria-label="userPaused ? 'Resume project carousel' : 'Pause project carousel'"
                @click="userPaused = !userPaused">
                <i :class="userPaused ? 'mdi mdi-play' : 'mdi mdi-pause'" aria-hidden="true" />
                <span>{{ userPaused ? 'Play' : 'Pause' }}</span>
            </button>
        </div>

        <NuxtLink to="/demo/trading" class="demo-cta">
            <i class="mdi mdi-chart-line" aria-hidden="true" />
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
const userPaused = ref(false)
const reduceMotion = ref(false)

// Motion stops for any of: an explicit stop, hover, an open dialog, or the
// user's reduced-motion preference.
const paused = computed(
    () => userPaused.value || hovering.value || modalOpen.value || reduceMotion.value
)

const speed = 0.7
let animationFrame = null
const position = ref(0)
let trackWidth = 0

function animate() {
    if (!paused.value && track.value) {
        position.value -= speed
        // Jump forward by one copy's width once we pass it, so the loop is seamless.
        if (Math.abs(position.value) >= trackWidth / 3) {
            position.value += trackWidth / 3
        }
    }
    animationFrame = requestAnimationFrame(animate)
}

let motionQuery = null
const onMotionChange = (e) => {
    reduceMotion.value = e.matches
    if (e.matches) userPaused.value = true
}

onMounted(() => {
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduceMotion.value = motionQuery.matches
    // Reduced motion: start stopped, and let the control opt back in.
    if (motionQuery.matches) userPaused.value = true
    motionQuery.addEventListener('change', onMotionChange)

    trackWidth = track.value.scrollWidth
    animationFrame = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
    motionQuery?.removeEventListener('change', onMotionChange)
    cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
.base {
    background-color: var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-5);
    padding: var(--space-7) 0 var(--space-6);
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
}

.section-head {
    text-align: center;
    padding: 0 var(--space-4);
    width: 100%;
    box-sizing: border-box;
}

.section-head h2 {
    font-size: var(--text-h1);
    margin: var(--space-2) 0 var(--space-3);
}

.section-sub {
    max-width: min(60ch, 100%);
    margin: 0 auto;
    color: var(--text-muted);
    line-height: var(--leading-normal);
}

.carousel-shell {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    min-width: 0;
}

.carousel {
    overflow: hidden;
    width: 100%;
}

.carousel-track {
    display: flex;
    gap: var(--space-4);
    width: max-content;
    list-style: none;
    margin: 0;
    padding: var(--space-2) 0;
    will-change: transform;
}

.marquee-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    min-height: 36px;
    padding: 0 var(--space-4);
    border-radius: var(--radius-full);
    border: 1px solid var(--border-control);
    background: var(--bg-elev);
    color: var(--text-muted);
    font-family: inherit;
    font-size: var(--text-label);
    font-weight: 600;
    letter-spacing: var(--track-label);
    text-transform: uppercase;
    cursor: pointer;
    transition: color var(--dur) var(--ease), border-color var(--dur) var(--ease),
        background-color var(--dur) var(--ease);
}

.marquee-toggle:hover {
    color: var(--accent);
    border-color: var(--accent);
    background: var(--bg-subtle);
}

.demo-cta {
    max-width: min(52ch, calc(100% - 2rem));
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--accent);
    font-weight: 600;
    font-size: var(--text-sm);
    text-decoration: none;
    border-bottom: 1px solid var(--border-control);
    padding-bottom: 2px;
    transition: color var(--dur) var(--ease), border-color var(--dur) var(--ease);
}

.demo-cta:hover {
    color: var(--accent-hover);
    border-color: var(--accent);
}

@media (max-width: 900px) {
    .base {
        padding-top: 5.5rem;
        gap: var(--space-4);
    }

    .section-sub {
        font-size: var(--text-sm);
    }

    .carousel-track {
        gap: var(--space-3);
    }

    .demo-cta {
        text-align: center;
        line-height: var(--leading-snug);
    }
}
</style>
