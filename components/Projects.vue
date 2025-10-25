<template>
    <div class="base">
        <h2>Projects:</h2>

        <ProjectsCard />
    </div>
</template>
<script>
import ProjectsCard from '../components/ProjectsCard.vue'
export default {
    components: {
        ProjectsCard
    }
}
</script>

<style scoped>
.base {
    background-color: #fdf6f0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}

h2,
h3,
h4 {
    color: #6b4226;
}
</style>