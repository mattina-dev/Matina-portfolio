<template>
  <v-card class="service-card" elevation="6">
    <v-img
      :src="image"
      :alt="title"
      class="card-image"
      width="96"
      height="86"
    ></v-img>

    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
    </div>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  image: string;
  title: string;
  description: string;
}>();
</script>

<style scoped>
.service-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border-radius: 16px;
  background-color: white;
  transition: all 0.5s ease;
  cursor: pointer;
  width: min(100%, 360px);
  min-height: 320px;
  margin: 0 auto;
}

.service-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  background-color: #BF9264; 
}

.card-image {
  margin-bottom: 14px;
  transition: transform 0.5s ease;
}
.service-card:hover .card-image {
  transform: rotate(12deg);
}

.card-content {
  transition: color 0.5s ease;
  color: #333; /* default text color */
}


.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #945034; /* default title color */
  transition: color 0.5s ease;
}

.card-description {
  font-size: 1rem;
  color: inherit; /* inherits from .card-content */
}

/* Hover states */
.service-card:hover .card-content {
  color: white; /* description becomes white */
}

.service-card:hover .card-title {
  color: white; /* title becomes white on hover */
}

@media (max-width: 960px) {
  .service-card {
    min-height: 260px;
  }
}
</style>
