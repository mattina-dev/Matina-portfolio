<template>
    <v-container class="about-container">
        <v-row align="center" justify="space-between">
            <!-- About Text -->
            <div class="about-text d-flex flex-column align-center ">
                <h2 class="display-1 font-weight-bold mb-4">About Me</h2>
                <p class="mb-4 ">
                    Hi! I’m Matina Safaei, a passionate Frontend Developer and UI/UX Enthusiast. I love
                    creating clean, interactive, and user-friendly web experiences. I enjoy combining
                    design and functionality to build websites and apps that delight users.
                </p>
                <p class="mb-5">
                    My main focus is on modern frontend technologies, responsive design, and smooth
                    animations. I’m constantly learning and exploring new ways to improve my craft.
                </p>
            </div>

            <!-- Skills List -->
            <v-col cols="12" md="5" class="skills-section">
                <h3 class="text-h5 font-weight-bold mb-3">Skills & Tools</h3>

                <!-- Hands On -->
                <div class="my-16">
                    <h4 class="mb-4">Hands On:</h4>
                    <v-row class="d-flex justify-center">
                        <v-col v-for="(skill, index) in skillIcons" :key="index" cols="4" sm="3" class="skill-icon">
                            <img :src="skill.src" :alt="skill.alt" height="80" class="mx-5" />
                        </v-col>
                    </v-row>
                </div>

                <!-- Learning -->
                <div class="mb-16">
                    <h4 class="mb-4">Learning:</h4>
                    <v-row class="d-flex justify-center">
                        <v-col v-for="(Nskill, index) in NskillIcons" :key="index" cols="4" sm="3" class="skill-icon">
                            <img :src="Nskill.src" :alt="Nskill.alt" height="80" class="mx-5" />
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
const skillIcons = [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", alt: "HTML" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", alt: "CSS" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", alt: "Vue.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg", alt: "Nuxt.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", alt: "Bootstrap" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuetify/vuetify-original.svg", alt: "Vuetify" },
    { src: "https://pinia.vuejs.org/logo.svg", alt: "Pinia" },
];

const NskillIcons = [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" },
    { src: "https://pinia.vuejs.org/logo.svg", alt: "Pinia" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", alt: "Figma" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "ML / Python" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", alt: "Three.js" },
];
</script>

<style scoped>
.about-container {
    padding: 4rem 2rem;
    background-color: #fdf6f0;
    min-height: 100vh;
    display: flex;
    /* align-items: center; */
}

h2,
h3,
h4 {
    color: #6b4226;
}

.about-text p {
    color: #4e2c0a;
    line-height: 1.7;
    font-size: 1.1rem;
    width: 70%;
}



.skills-section img {
    display: block;
    margin: 0 auto;
}
</style>