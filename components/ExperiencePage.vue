<template>
    <Timeline :items="experiences" />
</template>

<script setup>
import Timeline from "../components/Timeline.vue"

const experiences = [
    {
        title: "Digimenue",
        date: "Feb 2024 → Present",
        details: [
            "Interactive teamwork & feature development",
            "Next.js + Tailwind for full design implementation",
            "Stripe integration, Matterport 3D table viewer",
            "Contribution to restaurant reservation system"
        ]
    },
    {
        title: "ShemiranWeb",
        date: "Sep 2022 → Feb 2024",
        details: [
            "Template implementation with HTML, CSS, JS",
            "Tailwind components based on Figma"
        ]
    },
    {
        title: "Asrez",
        date: "Jun 2021 → July 2023",
        details: [
            "Built webapps for Kasian Media, Nota, Panda Cloud",
            "Increased user engagement by 20%",
            "React, Next.js, Pure JS development"
        ]
    }
];
</script>