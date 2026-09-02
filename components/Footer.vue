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
            <i class="mdi mdi-download-outline" /> Download Resume (PDF)
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
  background: radial-gradient(circle at top right, #f7e7da, #fdf6f0 62%);
  color: #4c3118;
}

.footer-shell {
  width: min(100%, 1080px);
  padding: 2.4rem 1.2rem;
  border: 1px solid #e3cdb7;
  border-radius: 20px;
  background: rgba(255, 252, 248, 0.82);
  box-shadow: 0 16px 32px rgba(108, 73, 44, 0.12);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 1.4rem;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9a6740;
  font-weight: 700;
  font-size: 0.78rem;
  margin-bottom: 0.35rem;
}

h3 {
  margin: 0 0 0.6rem;
  font-size: clamp(1.2rem, 3vw, 1.7rem);
}

h4 {
  margin: 0 0 0.55rem;
  color: #6b4323;
}

.muted {
  color: #705034;
  line-height: 1.7;
  max-width: 45ch;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

a {
  color: #4a2f18;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.bottom-row {
  margin-top: 1.5rem;
  padding-top: 0.9rem;
  border-top: 1px solid #ead8c6;
  display: flex;
  justify-content: space-between;
  gap: 0.9rem;
  color: #7d5a3c;
  font-size: 0.88rem;
}

@media (max-width: 860px) {
  .site-footer {
    min-height: auto;
    padding: 1rem 0;
  }

  .footer-shell {
    padding: 1.2rem 0.9rem;
    border-radius: 14px;
  }

  .footer-grid {
    grid-template-columns: 1fr;
  }

  .bottom-row {
    flex-direction: column;
  }
}
</style>
