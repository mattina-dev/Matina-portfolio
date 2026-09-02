<template>
    <div class="intro-section">
        <div class="text-wrapper">
            <p class="eyebrow">About</p>
            <h2>Hello! I'm Matina Safaei</h2>
            <p class="lede">
                A frontend engineer who likes the hard part of the job: keeping an interface fast, legible and
                calm while real data moves underneath it. I work across Vue.js, Nuxt, React and TypeScript,
                and I care as much about how a screen feels under load as how it looks in a mockup.
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
                <p class="stack-label">Stack I work in</p>
                <ul class="stack-icons">
                    <li v-for="icon in stackIcons" :key="icon.alt">
                        <img :src="icon.src" :alt="icon.alt" :title="icon.alt" width="32" height="32" loading="lazy"
                            :class="{ mono: icon.mono }" />
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
const D = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons"

/*
 * Mirrors the skill list on /about — the resume is the source of truth, so add
 * here only what's claimed there. `mono` marks logos that are near-black and
 * would disappear on the dark theme; they get inverted in CSS.
 */
const stackIcons = [
    { src: `${D}/vuejs/vuejs-original.svg`, alt: "Vue.js" },
    { src: `${D}/nuxtjs/nuxtjs-original.svg`, alt: "Nuxt" },
    { src: `${D}/react/react-original.svg`, alt: "React" },
    { src: `${D}/nextjs/nextjs-original.svg`, alt: "Next.js", mono: true },
    { src: `${D}/angularjs/angularjs-original.svg`, alt: "Angular" },
    { src: `${D}/typescript/typescript-original.svg`, alt: "TypeScript" },
    { src: `${D}/javascript/javascript-original.svg`, alt: "JavaScript" },
    { src: "https://pinia.vuejs.org/logo.svg", alt: "Pinia" },
    { src: `${D}/tailwindcss/tailwindcss-original.svg`, alt: "Tailwind" },
    { src: `${D}/vuetify/vuetify-original.svg`, alt: "Vuetify" },
    { src: `${D}/bootstrap/bootstrap-original.svg`, alt: "Bootstrap" },
    { src: `${D}/graphql/graphql-plain.svg`, alt: "GraphQL" },
    { src: `${D}/git/git-original.svg`, alt: "Git" },
    { src: `${D}/figma/figma-original.svg`, alt: "Figma" },
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
    gap: var(--space-1);
    width: 72px;
    padding: var(--space-2) var(--space-1);
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
    width: 32px;
    height: 32px;
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
        width: 60px;
    }

    .stack-icons img {
        width: 24px;
        height: 24px;
    }
}
</style>
