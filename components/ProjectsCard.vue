<template>
    <div class="base">
        <v-card hover elevation="6" class="card d-flex flex-column">
            <v-img :src="image" :alt="title" class="rounded-t-lg project-image"></v-img>

            <v-card-title class="text-center project-title">{{ title }}</v-card-title>

            <v-card-text class="text-center project-description">{{ description }}</v-card-text>

            <v-card-text class="text-center pa-0 chips-wrap">
                <v-chip v-for="(tech, index) in techStack" :key="index" class="ma-1" prepend-icon="$vuetify">
                    {{ tech }}
                </v-chip>
            </v-card-text>

            <v-card-actions class="justify-center mt-auto project-actions">
                <v-btn :href="link" target="_blank" rel="noopener noreferrer" variant="outlined" color="primary" class="project-btn">
                    {{ buttonText }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script setup>
defineProps({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: Array, default: () => [] },
    buttonText: { type: String, default: 'View' },
    link: { type: String, default: "#" }
});
</script>

<style scoped>
.card {
    width: min(88vw, 350px);
    height: 500px;
    border-radius: 16px;
    overflow: hidden;
    padding: 1rem;
}

.project-image {
    height: 170px;
}

.project-title {
    min-height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.project-description {
    min-height: 96px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.chips-wrap {
    min-height: 90px;
}

.project-actions {
    padding-top: 0.7rem;
}

.project-btn {
    min-width: 160px;
    white-space: nowrap;
}

@media (max-width: 768px) {
    .card {
        height: 460px;
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
        min-height: 76px;
    }
}
</style>
