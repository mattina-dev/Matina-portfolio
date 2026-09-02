<template>
    <div class="intro-section">
        <div class="text-wrapper">
            <p class="eyebrow">About</p>
            <h2>Hello! I'm Matina Safaei</h2>
            <p class="lede">
                A frontend engineer who likes the hard part of the job: keeping an interface fast, legible and
                calm while real data moves underneath it. I work in Vue.js, Nuxt and TypeScript, and I care as
                much about how a screen feels under load as how it looks in a mockup.
            </p>

            <ul class="stat-row">
                <li>
                    <span class="stat-value u-mono">3+</span>
                    <span class="stat-label">Years shipping</span>
                </li>
                <li>
                    <span class="stat-value u-mono">5</span>
                    <span class="stat-label">Products delivered</span>
                </li>
                <li>
                    <span class="stat-value u-mono">60</span>
                    <span class="stat-label">fps under live data</span>
                </li>
            </ul>

            <div class="stack">
                <p class="stack-label">Core stack</p>
                <ul class="stack-icons">
                    <li v-for="icon in stackIcons" :key="icon.alt">
                        <img :src="icon.src" :alt="icon.alt" :title="icon.alt" width="36" height="36" loading="lazy" />
                        <span>{{ icon.alt }}</span>
                    </li>
                </ul>
            </div>

            <NuxtLink to="/about" class="btn btn-secondary">
                Read the full background
                <i class="mdi mdi-arrow-right" aria-hidden="true" />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const stackIcons = [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", alt: "Vue.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg", alt: "Nuxt" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript" },
    { src: "https://pinia.vuejs.org/logo.svg", alt: "Pinia" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuetify/vuetify-original.svg", alt: "Vuetify" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", alt: "Bootstrap" },
];
</script>

<style scoped>
.intro-section {
    width: 100%;
    background-color: var(--bg);
    padding: var(--space-8) var(--space-4);
    display: flex;
    justify-content: center;
}

.text-wrapper {
    width: min(100%, 760px);
    text-align: center;
}

.text-wrapper h2 {
    font-size: var(--text-h1);
    margin: var(--space-2) 0 var(--space-4);
}

.lede {
    color: var(--text-muted);
    line-height: var(--leading-normal);
    max-width: 62ch;
    margin: 0 auto;
}

/* ---- Stats ---- */
.stat-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-6);
    list-style: none;
    margin: var(--space-6) 0;
    padding: 0;
}

.stat-row li {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
}

.stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: var(--track-heading);
}

.stat-label {
    font-size: var(--text-label);
    font-weight: 600;
    letter-spacing: var(--track-label);
    text-transform: uppercase;
    color: var(--text-subtle);
}

/* ---- Stack ---- */
.stack {
    margin: var(--space-6) 0;
}

.stack-label {
    font-size: var(--text-label);
    font-weight: 600;
    letter-spacing: var(--track-label);
    text-transform: uppercase;
    color: var(--text-subtle);
    margin-bottom: var(--space-4);
}

.stack-icons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-4);
    list-style: none;
    margin: 0;
    padding: 0;
}

.stack-icons li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    width: 76px;
    padding: var(--space-3) var(--space-1);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--bg-elev);
    transition: border-color var(--dur) var(--ease), background-color var(--dur) var(--ease);
}

.stack-icons li:hover {
    border-color: var(--accent);
    background: var(--bg-subtle);
}

.stack-icons img {
    width: 36px;
    height: 36px;
}

.stack-icons span {
    font-size: 0.6875rem;
    color: var(--text-subtle);
    font-weight: 500;
}

@media (max-width: 900px) {
    .intro-section {
        padding: 5.5rem var(--space-3) var(--space-6);
    }

    .stat-row {
        gap: var(--space-5);
    }

    .stat-value {
        font-size: 1.4rem;
    }

    .stack-icons {
        gap: var(--space-2);
    }

    .stack-icons li {
        width: 66px;
    }

    .stack-icons img {
        width: 28px;
        height: 28px;
    }
}
</style>
