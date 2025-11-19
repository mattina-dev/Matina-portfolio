<template>
    <Timeline :items="experiences" />
</template>

<script setup>
import Timeline from "../components/Timeline.vue"

const experiences = [
    {
        title: "Eivan Online",
        date: "Apr 2025 → Sep 2025",
        details: [
            "Developed scalable, mobile-friendly web apps with Vue.js + TypeScript",
            "Ensured visual consistency + responsiveness across devices",
            "Supported rapid iterations using Vuex, Tailwind, and REST APIs"
        ]
    },
    {
        title: "Majara.io",
        date: "Aug 2024 → Apr 2025",
        details: [
            "Refactored & modernized the admin panel for clarity and usability",
            "Cleaned legacy Vue.js codebase and optimized component performance",
            "Collaborated with UI/UX to align visuals with the updated brand identity"
        ]
    },
    {
        title: "Cyclical Waves",
        date: "Jan 2023 → Jun 2024",
        details: [
            "Developed high-performance, interactive apps using Vue.js + TypeScript",
            "Integrated real-time crypto APIs for live market visualizations",
            "Applied UX principles to improve accessibility and design consistency"
        ]
    }
];
</script>