<template>
    <header class="finisher-header hero" ref="headerRef">
        <div class="hero-text">
            <h1 class="hero-title">Matina Safaei</h1>
            <p>Frontend Developer • UI/UX Designer
            </p>
            <p class="typing-text">
                Frontend Developer working with Vue.js & Nuxt 3 to build smooth, modern, human-centered interfaces. I
                blend clean UI/UX with performance-focused engineering to ship experiences that feel effortless.
            </p>
            <h4>scroll to explore!</h4>
        </div>
        <div class="hero-image">
            <img src="../assets/abc.png" alt="Matina Photo" />
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
    padding: 0 6rem;
    position: relative;
    overflow: hidden;
    /* warm creamy beige */
}

/* Ensure particles stay behind */
.finisher-header canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

/* Text + image layer */
.hero-text,
.hero-image {
    position: relative;
    z-index: 2;
    opacity: 0;
}

/* TEXT SIDE ---------------------------------------------------- */

.hero-title {
    font-size: 4rem;
    line-height: 1.1;
    font-weight: 700;
    color: #6b3e24;
    /* warm brown, premium */
    margin-bottom: 0.5rem;
}

.hero-text p:first-of-type {
    font-size: 1.2rem;
    color: #8d6f57;
    letter-spacing: 1px;
    margin-bottom: 1.5rem;
}

/* Typing effect but cleaner */
.typing-text {
    font-size: 1.35rem;
    color: #4d3a32;
    max-width: 650px;
    overflow: hidden;
    display: block;
    line-height: 1.55;
    animation: typing 4s steps(60, end) forwards, blink 0.75s step-end infinite;
}



@keyframes blink {
    50% {
        border-color: transparent;
    }
}

/* "Scroll to explore" */
.hero-text h4 {
    margin-top: 2rem;
    font-weight: 500;
    color: #6f594c;
    opacity: 0.85;
    letter-spacing: 0.5px;
}


/* IMAGE SIDE --------------------------------------------------- */

.hero-image {
    max-width: 40%;
    display: flex;
    justify-content: flex-end;
}

.hero-image img {
    width: 88%;
    border-radius: 1.25rem;
    transition: transform 0.6s ease;
}

.hero-image img:hover {
    transform: scale(1.015);
}

/* ENTRY ANIMATIONS --------------------------------------------- */

.fade-slide-in {
    animation: fadeSlide 1.4s ease forwards;
}

.fade-slide-in-image {
    animation: fadeSlideImage 1.4s ease forwards 0.2s;
}

@keyframes fadeSlide {
    from {
        opacity: 0;
        transform: translateY(40px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeSlideImage {
    from {
        opacity: 0;
        transform: translateY(40px) scale(0.95);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}


/* RESPONSIVE --------------------------------------------------- */

@media (max-width: 1024px) {
    .hero {
        flex-direction: column-reverse;
        padding: 2rem;
        height: auto;
        text-align: center;
    }

    .hero-image {
        max-width: 65%;
        margin-bottom: 2rem;
    }

    .hero-title {
        font-size: 3rem;
    }
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 2.4rem;
    }

    .typing-text {
        font-size: 1.1rem;
    }
}
</style>