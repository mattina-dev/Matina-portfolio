<template>
    <div class="base">
        <v-card hover elevation="6" class="card d-flex flex-column">
            <div class="media">
                <v-img v-if="image" :src="image" :alt="`${title} screenshot`" class="rounded-t-lg project-image"
                    cover>
                    <template #error>
                        <div class="media-fallback">{{ initials }}</div>
                    </template>
                    <template #placeholder>
                        <div class="media-fallback">{{ initials }}</div>
                    </template>
                </v-img>
                <div v-else class="project-image media-fallback">{{ initials }}</div>

                <span class="status-badge" :class="isLive ? 'is-live' : 'is-private'">
                    <i :class="isLive ? 'mdi mdi-open-in-new' : 'mdi mdi-lock-outline'" />
                    {{ isLive ? 'Live site' : 'Private / NDA' }}
                </span>
            </div>

            <v-card-title class="text-center project-title">{{ title }}</v-card-title>

            <v-card-text class="text-center project-description">{{ description }}</v-card-text>

            <v-card-text class="text-center pa-0 chips-wrap">
                <v-chip v-for="tech in techStack" :key="tech" class="ma-1" size="small" variant="tonal" color="#8a5a2b">
                    {{ tech }}
                </v-chip>
            </v-card-text>

            <v-card-actions class="justify-center mt-auto project-actions">
                <v-btn variant="flat" color="#7b440d" class="project-btn" @click="dialog = true">
                    Read case study
                </v-btn>
                <v-btn v-if="isLive" :href="link" target="_blank" rel="noopener noreferrer" variant="text"
                    color="#7b440d" class="link-btn" append-icon="mdi-open-in-new">
                    {{ buttonText }}
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog v-model="dialog" max-width="720" scrollable>
            <v-card class="case-study">
                <div class="case-head">
                    <div>
                        <p class="case-eyebrow">Case study</p>
                        <h3>{{ title }}</h3>
                        <p class="case-role">{{ role }}</p>
                    </div>
                    <v-btn icon="mdi-close" variant="text" color="#7b440d" aria-label="Close case study" @click="dialog = false" />
                </div>

                <v-card-text class="case-body">
                    <v-img v-if="image" :src="image" :alt="`${title} interface`" class="case-shot" cover />

                    <section>
                        <h4><i class="mdi mdi-help-circle-outline" /> The problem</h4>
                        <p>{{ caseStudy.problem }}</p>
                    </section>

                    <section>
                        <h4><i class="mdi mdi-hammer-wrench" /> What I did</h4>
                        <ul>
                            <li v-for="item in caseStudy.actions" :key="item">{{ item }}</li>
                        </ul>
                    </section>

                    <section>
                        <h4><i class="mdi mdi-trending-up" /> The result</h4>
                        <p>{{ caseStudy.result }}</p>
                    </section>

                    <div class="case-chips">
                        <v-chip v-for="tech in techStack" :key="tech" size="small" class="ma-1" variant="tonal"
                            color="#8a5a2b">{{ tech }}</v-chip>
                    </div>
                </v-card-text>

                <v-card-actions class="case-actions">
                    <v-btn v-if="isLive" :href="link" target="_blank" rel="noopener noreferrer" variant="flat"
                        color="#7b440d" append-icon="mdi-open-in-new">
                        {{ buttonText }}
                    </v-btn>
                    <p v-else class="nda-note">
                        <i class="mdi mdi-lock-outline" />
                        Internal product behind authentication — screenshots shared with permission, code under NDA.
                    </p>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
    image: { type: String, default: '' },
    title: { type: String, required: true },
    role: { type: String, default: '' },
    description: { type: String, required: true },
    techStack: { type: Array, default: () => [] },
    buttonText: { type: String, default: 'Visit site' },
    link: { type: String, default: '' },
    caseStudy: {
        type: Object,
        default: () => ({ problem: '', actions: [], result: '' }),
    },
})

const emit = defineEmits(['modal'])

const dialog = ref(false)
watch(dialog, (open) => emit('modal', open))

// A link only counts as "live" when it actually goes somewhere public.
const isLive = computed(() => /^https?:\/\//.test(props.link))

const initials = computed(() =>
    props.title
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase()
)
</script>

<style scoped>
.card {
    width: min(88vw, 350px);
    height: 500px;
    border-radius: 16px;
    overflow: hidden;
    padding: 1rem;
}

.media {
    position: relative;
}

.project-image {
    height: 170px;
    border-radius: 12px;
}

.media-fallback {
    height: 100%;
    min-height: 145px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 2.2rem;
    font-weight: 700;
    letter-spacing: 2px;
    color: #a9713f;
    background: linear-gradient(140deg, #f7e7da, #e8d0ba);
    border-radius: 12px;
}

.status-badge {
    position: absolute;
    top: 8px;
    left: 8px;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.18rem 0.55rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    backdrop-filter: blur(4px);
}

.status-badge.is-live {
    background: rgba(232, 245, 233, 0.94);
    color: #2e7d32;
}

.status-badge.is-private {
    background: rgba(255, 248, 242, 0.94);
    color: #8a5a2b;
}

.project-title {
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.project-description {
    min-height: 92px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.chips-wrap {
    min-height: 76px;
}

.project-actions {
    padding-top: 0.4rem;
    flex-wrap: wrap;
    gap: 0.2rem;
}

.project-btn {
    min-width: 150px;
    white-space: nowrap;
}

.link-btn {
    white-space: nowrap;
}

/* ---- Case study dialog ---- */
.case-study {
    background: #fffaf5;
    border-radius: 18px;
}

.case-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.6rem;
    padding: 1.1rem 1.2rem 0.4rem;
}

.case-eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.72rem;
    font-weight: 700;
    color: #9e6438;
    margin: 0;
}

.case-head h3 {
    margin: 0.15rem 0 0.2rem;
    font-size: 1.5rem;
    color: #4e2c0a;
}

.case-role {
    margin: 0;
    color: #8a623d;
    font-size: 0.9rem;
}

.case-body {
    padding-top: 0.4rem;
}

.case-shot {
    width: 100%;
    max-height: 260px;
    border-radius: 12px;
    margin-bottom: 1.1rem;
    border: 1px solid #ecd9c6;
}

.case-body section {
    margin-bottom: 1.05rem;
}

.case-body h4 {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.95rem;
    color: #6b4323;
    margin: 0 0 0.35rem;
}

.case-body p,
.case-body li {
    color: #4d3a32;
    line-height: 1.7;
    font-size: 0.95rem;
}

.case-body ul {
    padding-left: 1.1rem;
    margin: 0;
}

.case-body li {
    margin-bottom: 0.3rem;
}

.case-chips {
    margin-top: 0.4rem;
}

.case-actions {
    padding: 0.4rem 1.2rem 1.1rem;
}

.nda-note {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin: 0;
    color: #8a623d;
    font-size: 0.85rem;
    line-height: 1.5;
}

@media (max-width: 768px) {
    .card {
        height: 470px;
        width: min(90vw, 340px);
        padding: 0.85rem;
    }

    .project-image {
        height: 145px;
    }

    .project-description {
        min-height: 82px;
    }

    .chips-wrap {
        min-height: 64px;
    }

    .case-head h3 {
        font-size: 1.25rem;
    }
}
</style>
