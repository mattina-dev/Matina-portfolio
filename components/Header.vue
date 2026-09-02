<template>
    <section ref="vantaRef" class="s-page-1 s-section-1 s-section">
        <header class="hero">
            <div class="hero-text">
                <p class="hero-eyebrow">Frontend Engineer · Vue.js &amp; TypeScript</p>
                <h1 class="hero-title">Matina Safaei</h1>
                <p class="hero-role">Fintech dashboards &amp; real-time data visualization</p>
                <p class="typing-text">
                    I build data-heavy interfaces that stay fast under live data — streaming market feeds,
                    trading dashboards and admin panels in Vue.js, Nuxt and TypeScript.
                    3+ years turning noisy real-time data into screens people can actually read and act on.
                </p>

                <div class="hero-actions">
                    <a class="btn btn-primary" href="/matina-safaei-resume.pdf" download>
                        <i class="mdi mdi-download-outline" /> Download Resume (PDF)
                    </a>
                    <NuxtLink class="btn btn-ghost" to="/demo/trading">
                        <i class="mdi mdi-chart-line-variant" /> View live demo
                    </NuxtLink>
                </div>

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

.hero-eyebrow {
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 700;
    color: #9e6438;
    margin: 0 0 0.35rem;
}

.hero-role {
    font-size: 1.35rem;
    font-weight: 600;
    color: #8d6f57;
    letter-spacing: 0.5px;
    margin-bottom: 1.2rem;
}

/* Primary calls to action: resume download + clickable live demo */
.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    margin-top: 1.6rem;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.7rem 1.25rem;
    border-radius: 999px;
    font-weight: 700;
    font-size: 0.95rem;
    text-decoration: none;
    transition: transform 0.2s ease, filter 0.2s ease, background-color 0.2s ease;
}

.btn-primary {
    background: linear-gradient(90deg, #7b440d 0%, #b57f3d 100%);
    color: #fff8f2;
    box-shadow: 0 8px 18px rgba(123, 68, 13, 0.24);
}

.btn-ghost {
    background: transparent;
    color: #7b440d;
    border: 1.5px solid #c9a179;
}

@media (hover: hover) and (pointer: fine) {
    .btn:hover {
        transform: translateY(-2px);
        filter: brightness(1.05);
    }

    .btn-ghost:hover {
        background-color: #f4e4d5;
    }
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
    margin-top: 1.6rem;
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
    section {
        min-height: 100svh;
    }

    .hero {
        flex-direction: column-reverse;
        padding: 4.6rem 1.2rem 1.4rem;
        height: auto;
        text-align: center;
        gap: 1rem;
    }

    .hero-image {
        max-width: 65%;
        margin-bottom: 0.8rem;
    }

    .hero-title {
        font-size: 3rem;
    }

    .hero-actions {
        justify-content: center;
    }
}

@media (max-width: 768px) {
    .hero {
        padding-top: 4.2rem;
    }

    .hero-image {
        max-width: 82%;
    }

    .hero-title {
        font-size: 2.4rem;
    }

    .typing-text {
        font-size: 1.1rem;
        line-height: 1.6;
    }

    .hero-text h4 {
        margin-top: 1rem;
    }

    .hero-role {
        font-size: 1.1rem;
        margin-bottom: 0.9rem;
    }

    .hero-actions {
        margin-top: 1.2rem;
        gap: 0.5rem;
    }

    .btn {
        padding: 0.62rem 1rem;
        font-size: 0.88rem;
    }
}
</style>
