<template>
    <section ref="vantaRef" class="s-page-1 s-section-1 s-section">
        <header class="hero">
            <div class="hero-text">
                <h1 class="hero-title">Matina Safaei</h1>
                <p>Frontend Developer • UI/UX Designer</p>
                <p class="typing-text">
                    Frontend Developer working with Vue.js & Nuxt 3 to build smooth, modern, human-centered interfaces.
                    I
                    blend clean UI/UX with performance-focused engineering to ship experiences that feel effortless.
                </p>
                <h4>scroll to explore!</h4>
            </div>
            <div class="hero-image">
                <img src="../assets/abc.png" alt="Matina Photo" />
            </div>
        </header>
    </section>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const vantaRef = ref(null)
let vantaEffect = null

const initVanta = () => {
    if (window.VANTA && vantaRef.value && !vantaEffect) {
        vantaEffect = window.VANTA.TOPOLOGY({
            el: vantaRef.value,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x754230,          // warm brown
            backgroundColor: 0xfdf6f0 // creamy beige
        })
    }
}

onMounted(() => {
    const script1 = document.createElement('script')
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js'
    script1.onload = () => {
        const script2 = document.createElement('script')
        script2.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js'
        script2.onload = initVanta
        document.body.appendChild(script2)
    }
    document.body.appendChild(script1)
})

onBeforeUnmount(() => {
    if (vantaEffect) vantaEffect.destroy()
})
</script>

<style scoped>
.s-page-1 .s-section-1 .s-section {
    width: 100%;
    height: 100vh;
    position: relative;

}

section {
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: center;

}

.hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    padding: 0rem;
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
    opacity: 1;
}

/* TEXT SIDE ---------------------------------------------------- */

.hero-title {
    font-size: 4rem;
    line-height: 1.1;
    font-weight: 700;
    color: #ab6e4b;
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
    max-width: 750px;
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
    font-size: large;
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