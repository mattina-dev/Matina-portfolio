<template>
    <div class="intro-section">
        <div class="text-wrapper">
            <h2>Hello! I’m Matina Safaei</h2>
            <p>
                I’m a Frontend Developer passionate about crafting clean, interactive, and user-friendly web
                experiences.
                I specialize in modern frontend technologies and love exploring UI/UX design.
            </p>

            <!-- Main Stack Icons -->
            <div class="stack-icons">
                <img v-for="icon in stackIcons" :key="icon.alt" :src="icon.src" :alt="icon.alt" :title="icon.alt" />
            </div>

            <!-- CTA Button -->
            <NuxtLink to="/about" class="btn-know">
                Know Me Better!
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const stackIcons = [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", alt: "Vue.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg", alt: "Nuxt.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", alt: "Bootstrap" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuetify/vuetify-original.svg", alt: "Vuetify" },
    { src: "https://pinia.vuejs.org/logo.svg", alt: "Pinia" },
];
</script>
<style scoped>
.intro-section {
    background-color: #fdf6f0;
    padding: 6rem 4rem;
    text-align: center;
}

.text-wrapper h2 {
    font-size: 2.5rem;
    color: #4e2c0a;
    margin-bottom: 1rem;
}

.text-wrapper p {
    max-width: 600px;
    margin: 0 auto 2rem auto;
    color: #5a3e1b;
    line-height: 1.6;
}

.stack-icons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.stack-icons img {
    width: 50px;
    height: 50px;
    transition: transform 0.3s;
}

.stack-icons img:hover {
    transform: scale(1.1);
}

.btn-know {
    display: inline-block;
    background-color: #e0cbb8;
    color: #3b1d0c;
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.2s, background-color 0.2s;
}

.btn-know:hover {
    background-color: #d4b798;
    transform: translateY(-2px);
}
</style>