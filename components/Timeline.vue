<template>
  <div class="timeline-container">
    <ol class="timeline-track">
      <li v-for="(item, index) in items" :key="index" class="timeline-item">
        <span class="timeline-dot" aria-hidden="true"></span>

        <div class="timeline-card">
          <div class="timeline-head">
            <h3 class="timeline-title">{{ item.title }}</h3>
            <p class="timeline-date u-mono">{{ item.date }}</p>
          </div>
          <p v-if="item.subtitle" class="timeline-subtitle">
            <i class="mdi mdi-map-marker-outline" aria-hidden="true" />{{ item.subtitle }}
          </p>
          <ul class="timeline-details">
            <li v-for="(point, i) in item.details" :key="i">{{ point }}</li>
          </ul>
        </div>
      </li>
    </ol>
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
  display: flex;
  justify-content: center;
}

.timeline-track {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0 0 0 var(--space-6);
  width: min(100%, 780px);
  box-sizing: border-box;
}

/* The spine */
.timeline-track::before {
  content: '';
  position: absolute;
  top: var(--space-2);
  bottom: var(--space-2);
  left: 5px;
  width: 2px;
  border-radius: 2px;
  background: var(--border);
}

.timeline-item {
  position: relative;
  padding-bottom: var(--space-4);
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: calc(-1 * var(--space-6) + 1px);
  top: var(--space-5);
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--bg);
}

.timeline-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--bg-elev);
  padding: var(--space-4) var(--space-5);
  transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}

.timeline-card:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-sm);
}

.timeline-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.timeline-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
}

.timeline-date {
  font-size: var(--text-label);
  color: var(--accent);
  font-weight: 600;
  white-space: nowrap;
}

.timeline-subtitle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-sm);
  color: var(--text-subtle);
  margin-top: var(--space-1);
}

.timeline-details {
  margin: var(--space-3) 0 0;
  padding-left: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.timeline-details li {
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .timeline-card {
    padding: var(--space-4);
  }

  .timeline-head {
    flex-direction: column;
    gap: var(--space-1);
  }
}
</style>
