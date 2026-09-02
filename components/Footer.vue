<template>
  <footer class="site-footer">
    <div class="footer-shell">
      <div class="footer-grid">
        <section>
          <p class="eyebrow">Matina Safaei</p>
          <h3>Fintech Dashboards &amp; Real-Time Data Visualization</h3>
          <p class="muted">
            Vue.js and TypeScript interfaces that stay fast under live data — streaming feeds,
            trading dashboards and admin panels.
          </p>
          <a class="footer-cta" href="/matina-safaei-resume.pdf" download>
            <i class="mdi mdi-download-outline" aria-hidden="true" /> Download Resume (PDF)
          </a>
        </section>

        <section>
          <h4>Explore</h4>
          <div class="links">
            <NuxtLink to="/demo/trading">Live Demo</NuxtLink>
            <NuxtLink to="/about">About &amp; Resume</NuxtLink>
            <a href="mailto:matina.safaei@gmail.com">Email Me</a>
          </div>
        </section>

        <section>
          <h4>Professional</h4>
          <div class="links">
            <a href="https://www.linkedin.com/in/matina-safaei" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/mattina-dev" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </section>
      </div>

      <div class="bottom-row">
        <p>© {{ year }} Matina Safaei. All rights reserved.</p>
        <p>Built with Nuxt 4, Vue 3 and TypeScript.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6) var(--space-4);
  background: var(--bg);
  color: var(--text);
}

.footer-shell {
  width: min(100%, var(--page-max));
  padding: var(--space-6);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  background: var(--bg-elev);
  box-shadow: var(--shadow-sm);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: var(--space-6);
}

h3 {
  margin: var(--space-1) 0 var(--space-3);
  font-size: var(--text-h2);
}

h4 {
  margin: 0 0 var(--space-3);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--track-label);
  text-transform: uppercase;
  color: var(--text-subtle);
}

.muted {
  color: var(--text-muted);
  line-height: var(--leading-normal);
  max-width: 46ch;
  font-size: var(--text-sm);
}

.footer-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-5);
  min-height: 44px;
  padding: 0 var(--space-5);
  border-radius: var(--radius-full);
  background: var(--accent);
  color: var(--on-accent);
  font-weight: 600;
  font-size: var(--text-sm);
  text-decoration: none;
  transition: background-color var(--dur) var(--ease);
}

.footer-cta:hover {
  background: var(--accent-hover);
  text-decoration: none;
}

.links {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.links a,
.links :deep(a) {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  color: var(--text-muted);
  font-size: var(--text-sm);
  text-decoration: none;
  transition: color var(--dur) var(--ease);
}

.links a:hover,
.links :deep(a):hover {
  color: var(--accent);
  text-decoration: underline;
}

.bottom-row {
  margin-top: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  color: var(--text-subtle);
  font-size: var(--text-sm);
}

.bottom-row p {
  margin: 0;
}

@media (max-width: 860px) {
  .site-footer {
    min-height: auto;
    padding: var(--space-6) var(--space-3);
  }

  .footer-shell {
    padding: var(--space-5) var(--space-4);
    border-radius: var(--radius-lg);
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--space-5);
  }

  .bottom-row {
    flex-direction: column;
    gap: var(--space-1);
  }
}
</style>
