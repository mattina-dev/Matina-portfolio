<template>
    <section class="services">
        <div class="services-head">
            <p class="eyebrow">What I Offer</p>
            <h1>Professional Services</h1>
        </div>
        <div class="services-grid">
            <ServicesCard v-for="service in services" :key="service.title" :icon="service.icon" :title="service.title"
                :description="service.description" />
        </div>
    </section>

</template>

<script setup>
import ServicesCard from "../components/ServicesCard.vue"

const services = [
    {
        icon: 'mdi-code-tags',
        title: 'Frontend Engineering',
        description: 'Scalable, maintainable interfaces with Vue.js, Nuxt, and TypeScript.',
    },
    {
        icon: 'mdi-palette-outline',
        title: 'UI/UX Implementation',
        description: 'Design-first implementation focused on usability, accessibility, and polish.',
    },
    {
        icon: 'mdi-account-group-outline',
        title: 'Product Collaboration',
        description: 'Delivery with product context, fast iteration, and clear user impact.',
    },
]
</script>
<style scoped>
.services {
    background-color: var(--bg);
    width: 100%;
    padding: var(--space-8) var(--space-4);
}

.services-head {
    text-align: center;
    margin-bottom: var(--space-6);
}

h1 {
    margin: var(--space-2) 0 0;
    font-size: var(--text-h1);
}

.services-grid {
    max-width: var(--page-max);
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-4);
}

@media (max-width: 960px) {
    .services {
        padding: 5.5rem var(--space-3) var(--space-6);
    }

    .services-grid {
        grid-template-columns: 1fr;
    }
}
</style>
