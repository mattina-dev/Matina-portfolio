<template>
    <header class="finisher-header hero" ref="headerRef">
        <div class="hero-text">
            <h1 class="hero-title">Matina Safaei</h1>
            <p class="typing-text">
                Vue.js + Nuxt 3 Frontend Developer crafting polished, intuitive, and visually calm experiences. I
                combine modern UI/UX design with performance-focused development to create products people enjoy using.
            </p>
        </div>
        <div class="hero-image">
            <img src="../assets/photo_2025-10-03_19-00-38-Photoroom.png" alt="Matina Photo" />
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const headerRef = ref(null);

onMounted(async () => {
    await nextTick();

    // FinisherHeader particle effect
    const script = document.createElement('script');
    script.src = '/js/finisher-header.es5.min.js';
    script.onload = () => {
        if (window.FinisherHeader) {
            new window.FinisherHeader({
                className: 'finisher-header',
                count: 12,
                size: { min: 1300, max: 1500, pulse: 0 },
                speed: { x: { min: 0.6, max: 3 }, y: { min: 0.6, max: 3 } },
                colors: { background: "#4b352a", particles: ["#b75321", "#d9c4b0", "#bf9264", "#f8f4e1"] },
                blending: "lighten",
                opacity: { center: 0.6, edge: 0 },
                skew: -2,
                shapes: ["c"]
            });
        }
    };
    document.body.appendChild(script);

    // Trigger fade-in animation
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    heroText.classList.add('fade-slide-in');
    heroImage.classList.add('fade-slide-in-image');
});
</script>

<style scoped>
.hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    padding: 0 4rem;
    overflow: hidden;
    position: relative;
}

.finisher-header canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.hero-text,
.hero-image {
    position: relative;
    z-index: 2;
    opacity: 0;
    /* initial state for fade-in */
}

.hero-title {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    color: rgb(139, 69, 19);
}

/* Typing effect */
.typing-text {
    font-size: 1.5rem;
    color: #555;
    white-space: nowrap;
    white-space: normal;
    display: inline-block;
    max-width: 1800px;
    /* adjust for your layout */
    overflow: hidden;
    animation: typing 4s steps(60, end) forwards, blink 0.75s step-end infinite;
}

/* Image floating */
.hero-image img {
    width: 100%;
    border-radius: 1rem;
    animation: float 6s ease-in-out infinite, scaleBounce 3s ease-in-out infinite;
}

/* Fade-in & slide animation */
.fade-slide-in {
    animation: fadeSlide 3.2s forwards;
}

.fade-slide-in-image {
    animation: fadeSlideImage 1.2s forwards;
}

/* Keyframes */
@keyframes fadeSlide {
    0% {
        opacity: 0;
        transform: translateY(50px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeSlideImage {
    0% {
        opacity: 0;
        transform: translateY(30px) scale(0.9);
    }

    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/*  */

@keyframes blink {
    50% {
        border-color: transparent;
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-15px);
    }
}

@keyframes scaleBounce {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }
}
</style>