<template>
    <div class="base">
        <v-card hover elevation="6" class="card d-flex flex-column pa-6">
            <v-img :src="image" :alt="title" class="rounded-t-lg"></v-img>

            <v-card-title class="text-center">{{ title }}</v-card-title>

            <v-card-text class="text-center">{{ description }}</v-card-text>

            <v-card-text class="text-center pa-0">
                <v-chip v-for="(tech, index) in techStack" :key="index" class="ma-1" prepend-icon="$vuetify">
                    {{ tech }}
                </v-chip>
            </v-card-text>

            <v-card-actions class="justify-center">
                <v-btn :href="link" target="_blank" rel="noopener noreferrer" variant="outlined" color="primary">
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
    width: 350px;
    height: 450px;
    border-radius: 16px;
    overflow: visible;
}
</style>