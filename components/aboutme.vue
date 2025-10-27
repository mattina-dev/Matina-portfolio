<template>
    <div class="about-container">
        <div class="content-wrapper">
            <!-- Left Column -->
            <div class="text-column">
                <h2 class="section-title">About Me</h2>
                <p>
                    Hi! I’m <b>Matina Safaei</b>, a passionate Frontend Developer and UI/UX Enthusiast.
                    I love creating clean, interactive, and user-friendly web experiences.
                </p>
                <p>
                    My main focus is on modern frontend technologies, responsive design,
                    and smooth animations. I’m constantly learning and exploring new ways to improve my craft.
                </p>

                <!-- Tabs -->
                <div class="tab-container">
                    <div v-for="tab in tabs" :key="tab.id" class="tab" :class="{ active: activeTab === tab.id }"
                        @click="activeTab = tab.id">
                        <h4>{{ tab.label }}</h4>
                    </div>
                </div>
            </div>

            <!-- Right Column -->
            <transition name="fade" mode="out-in">
                <div class="info-column" :key="activeTab">
                    <!-- Education -->
                    <div v-if="activeTab === 'education'" class="d-flex flex-column align-center justify-center">
                        <img src="../public/edu.png" width="180px" height="130px"/>
                        <b>Computer Engineering</b><br />
                        <span>Islamic Azad University of Karaj</span><br />
                        <p class="text-center align-center">
                            I’m currently pursuing my Bachelor’s degree in Computer Engineering at Azad University of
                            Karaj.
                            Throughout my studies, I’ve focused on topics such as web development, software engineering,
                            and data structures — which have strengthened my problem-solving mindset.
                            This academic background has helped me bridge the gap between theory and real-world
                            development,
                            especially through my projects and UI/UX work.
                        </p>
                    </div>

                    <!-- Languages / Skills -->
                    <div v-else class="skills-section text-center">
                        <h3 class="skills-title">Skills & Tools</h3>

                        <div class="icon-section">
                            <v-row class="d-flex justify-center">
                                <v-col v-for="(skill, index) in skillIcons" :key="index" cols="2" sm="2"
                                    class="skill-icon">
                                    <img :src="skill.src" :alt="skill.alt" height="60" />
                                </v-col>
                            </v-row>
                        </div>

                        <div class="learning-section">
                            <h4>Learning:</h4>
                            <v-row class="d-flex mt-1 justify-center">
                                <v-col v-for="(Nskill, index) in NskillIcons" :key="index" cols="2" sm="2"
                                    class="skill-icon">
                                    <img :src="Nskill.src" :alt="Nskill.alt" height="60" />
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const activeTab = ref("education");
const tabs = [
    { id: "education", label: "Education" },
    { id: "languages", label: "Languages" },
];

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
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", alt: "Figma" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", alt: "Three.js" },
];
</script>

<style scoped>
.about-container {
    background-color: #fdf6f0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 4rem;
    animation: fadeIn 1s ease-in;
}

.content-wrapper {
    display: flex;
    gap: 4rem;
    width: 80%;
    max-width: 1500px;
    height: 340px;
    align-items: flex-start;
}

.text-column {
    width: 45%;
    color: #4e2c0a;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #3b1d0c;
}

.tab-container {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.tab {
    cursor: pointer;
    padding: 0.75rem 1.5rem;
    border: 1px solid #d7bfa6;
    border-radius: 12px;
    transition: all 0.3s ease;
    background-color: white;
}

.tab:hover {
    background-color: #f7e9de;
    transform: translateY(-2px);
}

.tab.active {
    background-color: #e0cbb8;
    border-color: #c6a27d;
    box-shadow: 0 4px 10px rgba(198, 162, 125, 0.3);
}

.info-column {
    width: 50%;
    text-align: center;
}

.tab-content {
    color: #4e2c0a;
    
}

.skills-title {
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #3b1d0c;
}

.icon-section,
.learning-section {
    margin-top: 2rem;
}

.skill-icon img {
    transition: transform 0.3s ease;
}

.skill-icon img:hover {
    transform: scale(1.1);
}

/* Smooth fade transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Page fade-in */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>