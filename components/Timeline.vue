<template>
  <div class="timeline-container">
    <div class="timeline-track">
      <div class="timeline-line"></div>

      <div v-for="(item, index) in items" :key="index" class="timeline-item">
        <div class="timeline-dot"></div>

        <div class="timeline-card">
          <h3 class="timeline-title">{{ item.title }}</h3>
          <p class="timeline-date">{{ item.date }}</p>
          <p v-if="item.subtitle" class="timeline-subtitle">{{ item.subtitle }}</p>
          <ul class="timeline-details">
            <li v-for="(point, i) in item.details" :key="i">{{ point }}</li>
          </ul>
        </div>
      </div>
    </div>    
  </div>
</template>

<script setup lang="ts">
interface TimelineItem {
  title: string;
  date: string;
  subtitle?: string;
  details: string[];
}

defineProps<{
  items: TimelineItem[];
}>();
</script>

<style scoped>
.timeline-container {
  width: 100%;
}

.timeline-track {
  position: relative;
  margin: 0 auto;
  padding: 0.5rem 0 0;
  width: min(100%, 700px);
  box-sizing: border-box;
}

.timeline-line {
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, #5b2b1a99, #5b2b1a33);
}

.timeline-item {
  position: relative;
  padding-left: 0.55rem;
  padding-top: 0.45rem;
  margin-bottom: 1.4rem;
}

.timeline-dot {
  position: absolute;
  left: 0;
  top: 0;
  width: 0.85rem;
  height: 0.85rem;
  transform: translateX(-50%);
  border-radius: 50%;
  background-color: #5b2b1ae8; /* main color */
  box-shadow: 0 0 8px #5b2b1a80;
  transition: 0.3s;
  z-index: 2;
}

.timeline-card {
  border: 1px solid #e6d2bf;
  padding: 0.55rem 0.7rem;
  border-radius: 1rem;
  background: linear-gradient(155deg, #fff8f2, #f4e4d5);
  box-shadow: 0 2px 10px rgba(91, 43, 26, 0.15);
  transition: 0.3s;
  width: 100%;
  margin: 0;
}
.timeline-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(91, 43, 26, 0.25);
}
.timeline-item:hover .timeline-dot {
  transform: translateX(-50%) scale(1.4);
  box-shadow: 0 0 14px #5b2b1ac0;
}

.timeline-title {
  font-size: 1rem;
  font-weight: 700;
  color: #5b2b1a;
  margin-bottom: 0.15rem;
}

.timeline-date {
  font-size: 0.78rem;
  color: #8a633e;
  margin-bottom: 0.15rem;
}

.timeline-subtitle {
  font-size: 0.8rem;
  color: #7a5432;
  margin-bottom: 0.25rem;
}

.timeline-details {
  font-size: 0.82rem;
  color: #2f2318;
  list-style: disc;
  padding-left: 0.85rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  line-height: 1.25;
}

@media (max-width: 800px) {
  .timeline-item {
    margin-bottom: 0.7rem;
  }
}
</style>
