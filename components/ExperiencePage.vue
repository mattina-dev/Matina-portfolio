<template>
    <section class="experience-page">
        

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
    max-width: 1100px;
    margin: 0 auto;
    padding: 5.8rem 1rem 0.8rem;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
}
</style>
