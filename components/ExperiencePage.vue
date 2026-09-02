<template>
    <section class="experience-page">
        <div class="experience-head">
            <p class="eyebrow">Experience</p>
            <h2>Where I've shipped</h2>
        </div>

        <Timeline :items="experiences" />
    </section>
</template>

<script setup>
import Timeline from "../components/Timeline.vue"

const experiences = [
    {
        title: "Frontend Developer · Eivan Online",
        date: "Apr 2025 → Sep 2025",
        subtitle: "Karaj, Iran",
        details: [
            "Delivered scalable Vue.js + TypeScript features for mobile and desktop.",
            "Improved UI consistency and iteration speed with Vuex, Tailwind, and REST APIs."
        ]
    },
    {
        title: "Frontend Developer · Majara.io",
        date: "Aug 2024 → Apr 2025",
        subtitle: "Remote",
        details: [
            "Refactored admin workflows to improve clarity and usability.",
            "Modernized legacy Vue code and improved performance with design collaboration."
        ]
    },
    {
        title: "Frontend Developer · Gama Train",
        date: "Apr 2024 → Aug 2024",
        subtitle: "Remote (Amsterdam HQ)",
        details: [
            "Built production-ready Vue.js + TypeScript features with reliable delivery.",
            "Implemented reusable components, Pinia patterns, and REST integrations."
        ]
    },
    {
        title: "Frontend Developer · Cyclical Waves",
        date: "Jan 2023 → Jun 2024",
        subtitle: "Karaj, Iran",
        details: [
            "Built high-performance interactive interfaces in Vue.js + TypeScript.",
            "Integrated real-time crypto APIs and improved UX accessibility consistency."
        ]
    }
];
</script>

<style scoped>
.experience-page {
    width: 100%;
    max-width: var(--page-max);
    margin: 0 auto;
    padding: var(--space-8) var(--space-4) var(--space-5);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-5);
}

.experience-head {
    text-align: center;
}

.experience-head h2 {
    font-size: var(--text-h1);
    margin-top: var(--space-2);
}

@media (max-width: 960px) {
    .experience-page {
        padding: 5.5rem var(--space-3) var(--space-5);
    }
}
</style>
