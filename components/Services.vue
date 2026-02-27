<template>
    <section class="services">
        <div class="services-head">
            <p class="eyebrow">What I Offer</p>
            <h1>Professional Services</h1>
        </div>
        <div class="services-grid">
            <ServicesCard v-for="service in services" :key="service.title" :image="service.image" :title="service.title"
                :description="service.description" />
        </div>
    </section>

</template>

<script setup>
import ServicesCard from "../components/ServicesCard.vue"

const services = [
    {
        image: 'icons/code.png',
        title: 'Frontend Engineering',
        description: 'Scalable, maintainable interfaces with Vue.js, Nuxt, and TypeScript.',
    },
    {
        image: 'icons/design.png',
        title: 'UI/UX Implementation',
        description: 'Design-first implementation focused on usability, accessibility, and polish.',
    },
    {
        image: 'icons/develop.png',
        title: 'Product Collaboration',
        description: 'Delivery with product context, fast iteration, and clear user impact.',
    },
]
</script>
<style scoped>
.services {
    background-color: #fdf6f0;
    width: 100%;
    padding: 3rem 1rem;
}

.services-head {
    text-align: center;
    margin-bottom: 1.5rem;
}

.eyebrow {
    margin: 0;
    color: #a56d43;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 0.78rem;
    font-weight: 700;
}

h1 {
    margin: 0.35rem 0 0;
    color: #4e2c0a;
    font-size: clamp(1.8rem, 4vw, 2.6rem);
}

.services-grid {
    max-width: 1180px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
}

@media (max-width: 960px) {
    .services-grid {
        grid-template-columns: 1fr;
    }
}
</style>
