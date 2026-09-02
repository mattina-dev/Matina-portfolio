<template>
    <section ref="vantaRef" class="hero-section">
        <div class="hero">
            <div class="hero-text">
                <p class="eyebrow">Frontend Engineer · Vue.js · React · TypeScript</p>
                <h1 class="hero-title">Matina Safaei</h1>
                <p class="hero-role">Fintech dashboards &amp; real-time data visualization</p>
                <p class="hero-lede">
                    I build data-heavy interfaces that stay fast under live data — streaming market feeds,
                    trading dashboards and admin panels in Vue.js, Nuxt and TypeScript.
                    3+ years turning noisy real-time data into screens people can actually read and act on.
                </p>

                <div class="hero-actions">
                    <a class="btn btn-primary" href="/matina-safaei-resume.pdf" download>
                        <i class="mdi mdi-download-outline" aria-hidden="true" /> Download Resume (PDF)
                    </a>
                    <NuxtLink class="btn btn-secondary" to="/demo/trading">
                        <i class="mdi mdi-chart-line-variant" aria-hidden="true" /> View live demo
                    </NuxtLink>
                </div>

                <ul class="hero-meta">
                    <li><i class="mdi mdi-map-marker-outline" aria-hidden="true" /> Remote · Europe-friendly hours</li>
                    <li><i class="mdi mdi-circle-medium" aria-hidden="true" /> Available for new work</li>
                </ul>
            </div>

            <div class="hero-image">
                <img src="../assets/abc.png" alt="Portrait of Matina Safaei" width="420" height="420" />
            </div>
        </div>
    </section>
</template>


<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useColorTheme } from '~/composables/useColorTheme'

const { theme } = useColorTheme()

const vantaRef = ref(null)
let vantaEffect = null
let motionQuery = null

const readToken = (name, fallback) => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    if (!raw) return fallback
    const parsed = Number(raw)
    return Number.isNaN(parsed) ? fallback : parsed
}

const destroyVanta = () => {
    if (vantaEffect) {
        vantaEffect.destroy()
        vantaEffect = null
    }
}

const initVanta = () => {
    // The animated background is decoration; never run it under reduced motion.
    if (motionQuery?.matches) return
    if (!window.VANTA || !vantaRef.value || vantaEffect) return

    vantaEffect = window.VANTA.TOPOLOGY({
        el: vantaRef.value,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        color: readToken('--vanta-line', 0xf59e0b),
        backgroundColor: readToken('--vanta-bg', 0x0b1120),
    })
}

const loadScript = (src) =>
    new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`)
        if (existing) {
            existing.addEventListener('load', resolve, { once: true })
            if (existing.dataset.loaded) resolve()
            return
        }
        const el = document.createElement('script')
        el.src = src
        el.async = true
        el.addEventListener('load', () => {
            el.dataset.loaded = 'true'
            resolve()
        }, { once: true })
        el.addEventListener('error', reject, { once: true })
        document.body.appendChild(el)
    })

const onMotionChange = () => {
    if (motionQuery?.matches) destroyVanta()
    else initVanta()
}

onMounted(async () => {
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionQuery.addEventListener('change', onMotionChange)
    if (motionQuery.matches) return

    try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js')
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.topology.min.js')
        initVanta()
    } catch {
        // Decorative only — the hero reads fine without it.
    }
})

// Vanta bakes its colours in at construction, so rebuild it on theme change.
watch(theme, () => {
    if (!vantaEffect) return
    destroyVanta()
    initVanta()
})

onBeforeUnmount(() => {
    motionQuery?.removeEventListener('change', onMotionChange)
    destroyVanta()
})
</script>

<style scoped>
.hero-section {
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: var(--bg);
}

.hero {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    align-items: center;
    gap: var(--space-7);
    width: min(100% - 2rem, var(--page-max));
    margin: 0 auto;
    min-height: 100vh;
    padding: var(--space-8) 0 var(--space-6);
    position: relative;
}

.hero-text,
.hero-image {
    position: relative;
    z-index: 2;
}

.hero-title {
    font-size: var(--text-display);
    font-weight: 700;
    letter-spacing: var(--track-display);
    line-height: var(--leading-tight);
    color: var(--text);
    margin: var(--space-2) 0 var(--space-3);
}

.hero-role {
    font-size: var(--text-h2);
    font-weight: 600;
    letter-spacing: var(--track-heading);
    line-height: var(--leading-snug);
    color: var(--accent);
    margin-bottom: var(--space-4);
}

.hero-lede {
    font-size: 1.0625rem;
    line-height: var(--leading-normal);
    color: var(--text-muted);
    max-width: 58ch;
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-top: var(--space-6);
}

.hero-meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-5);
    list-style: none;
    margin: var(--space-5) 0 0;
    padding: 0;
    font-size: var(--text-sm);
    color: var(--text-subtle);
}

.hero-meta li {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
}

.hero-meta li:last-child i {
    color: var(--up);
    font-size: 1.25rem;
}

.hero-image {
    display: flex;
    justify-content: flex-end;
}

.hero-image img {
    width: 100%;
    max-width: 420px;
    height: auto;
    /* Transparent cutout — no frame, or it renders as an empty box. */
    filter: drop-shadow(0 18px 32px rgba(0, 0, 0, 0.28));
}

@media (max-width: 1024px) {
    .hero {
        grid-template-columns: 1fr;
        text-align: center;
        gap: var(--space-5);
        padding: var(--space-9) 0 var(--space-6);
        min-height: 100svh;
    }

    .hero-text {
        order: 2;
    }

    .hero-image {
        order: 1;
        justify-content: center;
    }

    .hero-image img {
        max-width: 260px;
    }

    .hero-lede {
        margin-inline: auto;
    }

    .hero-actions,
    .hero-meta {
        justify-content: center;
    }
}

@media (max-width: 768px) {
    .hero {
        padding-top: 5.5rem;
    }

    .hero-lede {
        font-size: 1rem;
    }

    .hero-image img {
        max-width: 200px;
    }
}
</style>
