<template>
    <v-app>
        <div class="base">
            <v-card hover elevation="6" class="card d-flex flex-column pa-6">
                <v-img src="https://via.placeholder.com/350x200" alt="Project Image" class="rounded-t-lg"></v-img>
                <v-card-title class="text-center">Project Name</v-card-title>
                <v-card-text class="text-center">
                    Short description of your project.
                </v-card-text>
                <v-card-text class="text-center">
                    used:
                    <v-chip prepend-icon="$vuetify">
                        Chip
                    </v-chip>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn variant="outlined" color="primary">View</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-app>
</template>

<style scoped>
.base {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px;
    overflow: visible;
}

.card {
    width: 350px;
    height: 450px;
    border-radius: 16px;
    overflow: visible;
    background-color: #fff;

}
</style>