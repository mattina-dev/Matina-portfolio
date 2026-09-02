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
                    <i :class="isLive ? 'mdi mdi-open-in-new' : 'mdi mdi-lock-outline'" aria-hidden="true" />
                    {{ isLive ? 'Live site' : 'Private / NDA' }}
                </span>
            </div>

            <v-card-title class="text-center project-title">{{ title }}</v-card-title>

            <v-card-text class="text-center project-description">{{ description }}</v-card-text>

            <v-card-text class="text-center pa-0 chips-wrap">
                <v-chip v-for="tech in techStack" :key="tech" class="ma-1" size="small" variant="tonal" color="primary">
                    {{ tech }}
                </v-chip>
            </v-card-text>

            <v-card-actions class="justify-center mt-auto project-actions">
                <v-btn variant="flat" color="primary" class="project-btn" @click="dialog = true">
                    Read case study
                </v-btn>
                <v-btn v-if="isLive" :href="link" target="_blank" rel="noopener noreferrer" variant="text"
                    color="primary" class="link-btn" append-icon="mdi-open-in-new">
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
                    <v-btn icon="mdi-close" variant="text" color="primary" aria-label="Close case study" @click="dialog = false" />
                </div>

                <v-card-text class="case-body">
                    <v-img v-if="image" :src="image" :alt="`${title} interface`" class="case-shot" cover />

                    <section>
                        <h4><i class="mdi mdi-help-circle-outline" aria-hidden="true" /> The problem</h4>
                        <p>{{ caseStudy.problem }}</p>
                    </section>

                    <section>
                        <h4><i class="mdi mdi-hammer-wrench" aria-hidden="true" /> What I did</h4>
                        <ul>
                            <li v-for="item in caseStudy.actions" :key="item">{{ item }}</li>
                        </ul>
                    </section>

                    <section>
                        <h4><i class="mdi mdi-trending-up" aria-hidden="true" /> The result</h4>
                        <p>{{ caseStudy.result }}</p>
                    </section>

                    <div class="case-chips">
                        <v-chip v-for="tech in techStack" :key="tech" size="small" class="ma-1" variant="tonal" color="primary">{{ tech }}</v-chip>
                    </div>
                </v-card-text>

                <v-card-actions class="case-actions">
                    <v-btn v-if="isLive" :href="link" target="_blank" rel="noopener noreferrer" variant="flat"
                        color="primary" append-icon="mdi-open-in-new">
                        {{ buttonText }}
                    </v-btn>
                    <p v-else class="nda-note">
                        <i class="mdi mdi-lock-outline" aria-hidden="true" />
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
    width: min(88vw, 348px);
    height: 100%;
    min-height: 492px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    padding: var(--space-4);
    background: var(--bg-elev) !important;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}

.card:hover {
    border-color: var(--accent);
    box-shadow: var(--shadow);
}

.media {
    position: relative;
}

.project-image {
    height: 168px;
    border-radius: var(--radius);
    border: 1px solid var(--border);
}

.media-fallback {
    height: 100%;
    min-height: 168px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: var(--track-label);
    color: var(--accent);
    background: var(--bg-subtle);
    border-radius: var(--radius);
}

.status-badge {
    position: absolute;
    top: var(--space-2);
    left: var(--space-2);
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: 2px var(--space-2);
    border-radius: var(--radius-full);
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    border: 1px solid transparent;
    backdrop-filter: blur(6px);
}

.status-badge.is-live {
    background: var(--bg-elev);
    border-color: var(--up);
    color: var(--up);
}

.status-badge.is-private {
    background: var(--bg-elev);
    border-color: var(--border-control);
    color: var(--text-subtle);
}

.project-title {
    min-height: 0;
    padding: var(--space-4) 0 var(--space-2);
    font-size: var(--text-h3);
    font-weight: 600;
    letter-spacing: var(--track-heading);
    color: var(--text);
    justify-content: center;
    line-height: var(--leading-snug);
}

.project-description {
    min-height: 84px;
    padding: 0 0 var(--space-3);
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    color: var(--text-muted);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.chips-wrap {
    min-height: 68px;
}

.project-actions {
    padding: var(--space-3) 0 0;
    flex-wrap: wrap;
    gap: var(--space-1);
}

.project-btn {
    min-width: 150px;
    white-space: nowrap;
    font-weight: 600;
    letter-spacing: 0;
    text-transform: none;
}

.link-btn {
    white-space: nowrap;
    text-transform: none;
    letter-spacing: 0;
}

/* ---- Case study dialog ---- */
.case-study {
    background: var(--bg-elev) !important;
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
}

.case-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-3);
    padding: var(--space-5) var(--space-5) var(--space-2);
}

.case-eyebrow {
    text-transform: uppercase;
    letter-spacing: var(--track-label);
    font-size: var(--text-label);
    font-weight: 700;
    color: var(--accent);
    margin: 0;
}

.case-head h3 {
    margin: var(--space-1) 0 var(--space-1);
    font-size: var(--text-h2);
    color: var(--text);
}

.case-role {
    margin: 0;
    color: var(--text-subtle);
    font-size: var(--text-sm);
}

.case-body {
    padding: var(--space-2) var(--space-5) var(--space-4);
}

.case-shot {
    width: 100%;
    max-height: 260px;
    border-radius: var(--radius);
    margin-bottom: var(--space-5);
    border: 1px solid var(--border);
}

.case-body section {
    margin-bottom: var(--space-5);
}

.case-body h4 {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    font-weight: 600;
    letter-spacing: var(--track-label);
    text-transform: uppercase;
    color: var(--accent);
    margin: 0 0 var(--space-2);
}

.case-body p,
.case-body li {
    color: var(--text-muted);
    line-height: var(--leading-normal);
    font-size: var(--text-sm);
}

.case-body ul {
    padding-left: var(--space-5);
    margin: 0;
}

.case-body li {
    margin-bottom: var(--space-2);
}

.case-chips {
    margin-top: var(--space-2);
}

.case-actions {
    padding: 0 var(--space-5) var(--space-5);
}

.nda-note {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin: 0;
    color: var(--text-subtle);
    font-size: var(--text-sm);
    line-height: var(--leading-snug);
}

@media (max-width: 768px) {
    .card {
        min-height: 468px;
        width: min(90vw, 336px);
        padding: var(--space-3);
    }

    .project-image,
    .media-fallback {
        height: 144px;
        min-height: 144px;
    }

    .case-head,
    .case-body,
    .case-actions {
        padding-inline: var(--space-4);
    }
}
</style>
