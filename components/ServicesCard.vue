<template>
  <article class="service-card">
    <span class="card-icon" aria-hidden="true">
      <i :class="['mdi', icon]" />
    </span>

    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
  description: string;
}>();
</script>

<style scoped>
.service-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: var(--space-4);
  padding: var(--space-5);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background-color: var(--bg-elev);
  box-shadow: var(--shadow-sm);
  height: 100%;
  /* Colour and shadow only — hovering must not move the card's bounds. */
  transition: border-color var(--dur) var(--ease),
    box-shadow var(--dur) var(--ease),
    background-color var(--dur) var(--ease);
}

.service-card:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow);
  background-color: var(--bg-subtle);
}

.card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 1.5rem;
}

.card-title {
  font-size: var(--text-h3);
  font-weight: 600;
  margin-bottom: var(--space-2);
  color: var(--text);
}

.card-description {
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: var(--text-muted);
}
</style>
