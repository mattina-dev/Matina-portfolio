<template>
    <header class="finisher-header hero" ref="headerRef">
        <div class="hero-text">
            <h1>Matina Safaei</h1>
            <p class="typing-text">
                Frontend Developer specializing in Vue.js, Nuxt 3, and modern UI/UX design.
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
  await nextTick(); // ensures DOM fully rendered

  const script = document.createElement('script');
  script.src = '/js/finisher-header.es5.min.js';
  script.onload = () => {
    if (window.FinisherHeader) {
      new window.FinisherHeader({
        className: 'finisher-header', // library expects className
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
}

.hero-text h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    color: rgb(139, 69, 19);
}

.typing-text {
    font-size: 1.5rem;
    color: #555;
    white-space: nowrap;
    overflow: hidden;
    border-right: 3px solid rgb(139, 69, 19);
    width: 0;
    animation: typing 4s steps(60, end) forwards, blink 0.75s step-end infinite;
}

.hero-image img {
    width: 100%;
    border-radius: 1rem;
    animation: float 6s ease-in-out infinite;
}

/* Animations */
@keyframes typing {
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
}

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
</style>