<template>
    <div class="base">
        <div class="mb-8">
            <h2>services:</h2>
        </div>
        <div class="d-flex">
            <ServicesCard v-for="service in services" :key="index" :image="service.image" :title="service.title"
                :description="service.description" />
        </div>

    </div>

</template>

<script setup>
import ServicesCard from "../components/ServicesCard.vue"

const services = [
    {
        image: 'icons/code.png',
        title: 'Coding',
        description: 'Transform your ideas into high-performance, scalable web applications with clean, maintainable code. Expert in JavaScript, Vue.js, and modern frameworks to deliver efficient solutions tailored to your needs.',
    },
    {
        image: 'icons/design.png',
        title: 'UX/UI Design',
        description: 'Craft visually stunning and user-friendly digital experiences. From wireframes to interactive prototypes, I focus on intuitive interfaces that engage users and boost conversion rates.',
    },
    {
        image: 'icons/develop.png',
        title: 'Business Development',
        description: 'Accelerate growth and maximize your business potential with strategic planning, market research, and innovative solutions. I help bridge the gap between technology and business success.',
    },
]
</script>
<style scoped>
.base {
    background-color: #fdf6f0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    font-family: Montserrat;
    /* height: 100vh; */
}
</style>