<template>
  <div class="timeline-container">
    <!-- Vertical Line -->
    <div class="timeline-line"></div>

    <div v-for="(item, index) in items" :key="index" class="timeline-item">
      <!-- Dot -->
      <div class="timeline-dot"></div>

      <!-- Content Card -->
      <div class="timeline-card">
        <h3 class="timeline-title">{{ item.title }}</h3>
        <p class="timeline-date">{{ item.date }}</p>
        <ul class="timeline-details">
          <li v-for="(point, i) in item.details" :key="i">• {{ point }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TimelineItem {
  title: string;
  date: string;
  details: string[];
}

defineProps<{
  items: TimelineItem[];
}>();
</script>

<style scoped>
.timeline-container {
  position: relative;
  margin: 0 auto;
  padding: 6rem 0;
  max-height: 100vh;
}

.timeline-line {
  position: absolute;
  left: 1.5rem; /* 6 in Tailwind */
  top: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, #5b2b1a99, #5b2b1a33);
}

.timeline-item {
  position: relative;
  padding-left: 4rem; /* pl-16 */
  margin-bottom: 4rem; /* mb-16 */
}

.timeline-dot {
  position: absolute;
  left: 1.1rem; /* 5 */
  top: 0.5rem; /* 2 */
  width: 1rem; /* 4 */
  height: 1rem;
  border-radius: 50%;
  background-color: #5b2b1ae8; /* main color */
  box-shadow: 0 0 8px #5b2b1a80;
  transition: 0.3s;
}

.timeline-card {
  border: 1px solid rgba(253, 230, 138, 0.2);
  padding: 1.5rem; /* p-6 */
  border-radius: 1rem; /* rounded-xl */
  box-shadow: 0 2px 10px rgba(91, 43, 26, 0.15);
  transition: 0.3s;
}
.timeline-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(91, 43, 26, 0.25);
}
.timeline-item:hover .timeline-dot {
  transform: scale(1.6);
  box-shadow: 0 0 14px #5b2b1ac0;
}

.timeline-title {
  font-size: 1.25rem; /* text-xl */
  font-weight: 600; /* font-semibold */
  color: #5b2b1ab3; /* main color */
  margin-bottom: 0.5rem;
}

.timeline-date {
  font-size: 0.75rem; /* text-xs */
  color: #9ca3af; /* gray-400 */
  margin-bottom: 0.75rem;
}

.timeline-details {
  font-size: 0.875rem; /* text-sm */
  color: black  ; /* gray-300 */
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem; /* space-y-1 */
}
</style>