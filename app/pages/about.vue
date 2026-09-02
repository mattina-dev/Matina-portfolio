<template>
  <div class="resume-page">
    <header class="hero card reveal" style="--d: 0s">
      <a class="download-resume" href="/matina-safaei-resume.pdf" download>
        <i class="mdi mdi-download-circle-outline" aria-hidden="true" /> Download Resume (PDF)
      </a>
      <p class="eyebrow"><i class="mdi mdi-file-account-outline" aria-hidden="true" /> Resume Overview</p>
      <h1>Matina Safaei</h1>
      <p class="role"><i class="mdi mdi-laptop" aria-hidden="true" /> Frontend Engineer | Product-Minded</p>

      <div class="contact-grid">
        <a href="tel:09057056997"><i class="mdi mdi-phone" aria-hidden="true" /> 09057056997</a>
        <a href="mailto:matina.safaei@gmail.com"><i class="mdi mdi-email-outline" aria-hidden="true" /> matina.safaei@gmail.com</a>
        <a href="https://github.com/mattina-dev" target="_blank" rel="noopener noreferrer"><i class="mdi mdi-github" aria-hidden="true" /> github.com/mattina-dev</a>
        <a href="https://www.linkedin.com/in/matina-safaei" target="_blank" rel="noopener noreferrer"><i class="mdi mdi-linkedin" aria-hidden="true" /> linkedin.com/in/matina-safaei</a>
      </div>
    </header>

    <section class="card reveal" style="--d: 0.08s">
      <h2><i class="mdi mdi-account-circle-outline" aria-hidden="true" /> Profile</h2>
      <p>
        Frontend Engineer with 3+ years of hands-on experience building modern web applications
        with Vue.js and TypeScript. I focus on product impact, not just implementation speed.
      </p>
      <p>
        I translate product goals into clean interfaces, scalable component systems, and measurable
        user improvements. My workflow combines UX awareness, engineering discipline, and close
        collaboration with design and backend teams.
      </p>
    </section>

    <section class="card reveal" style="--d: 0.16s">
      <h2><i class="mdi mdi-tools" aria-hidden="true" /> Technical Skills</h2>
      <div class="skills-grid">
        <article>
          <h3><i class="mdi mdi-code-tags" aria-hidden="true" /> Frontend Development</h3>
          <p>Vue.js, Nuxt.js, React.js, Next.js, Angular, TypeScript, JavaScript (ES6+), HTML5, CSS3</p>
        </article>
        <article>
          <h3><i class="mdi mdi-palette-outline" aria-hidden="true" /> State & UI</h3>
          <p>Pinia, Vuex, Vuetify, Bootstrap, Tailwind CSS</p>
        </article>
        <article>
          <h3><i class="mdi mdi-cog-outline" aria-hidden="true" /> Tools & Workflows</h3>
          <p>Git, REST API, GraphQL basics, Figma, Jira, Notion, Slack</p>
        </article>
      </div>
    </section>

    <section class="card reveal" style="--d: 0.24s">
      <h2><i class="mdi mdi-briefcase-outline" aria-hidden="true" /> Experience</h2>
      <div class="timeline">
        <article class="exp">
          <h3>Frontend Developer - Eivan Online, Karaj, Iran</h3>
          <p class="date">Apr 2025 - Sep 2025</p>
          <ul>
            <li>Developed scalable, mobile-friendly web applications with Vue.js and TypeScript.</li>
            <li>Ensured visual consistency and responsive design across multiple devices.</li>
            <li>Supported rapid product iterations using Vuex, Tailwind, and REST APIs.</li>
          </ul>
        </article>
        <article class="exp">
          <h3>Frontend Developer - Majara.io</h3>
          <p class="date">Aug 2024 - Apr 2025</p>
          <ul>
            <li>Refactored and modernized the admin panel to improve clarity and usability.</li>
            <li>Cleaned legacy Vue.js code and optimized component performance.</li>
            <li>Collaborated with UI/UX designers to align visuals with brand identity.</li>
          </ul>
        </article>
        <article class="exp">
          <h3>Frontend Developer - Gama Train (Amsterdam HQ)</h3>
          <p class="date">Apr 2024 - Aug 2024</p>
          <ul>
            <li>Built modern Vue.js applications with TypeScript and responsive behavior.</li>
            <li>Worked in Agile sprints across time zones.</li>
            <li>Implemented reusable components and API integrations with Pinia + REST.</li>
          </ul>
        </article>
        <article class="exp">
          <h3>Frontend Developer - Cyclical Waves, Karaj, Iran</h3>
          <p class="date">Jan 2023 - Jun 2024</p>
          <ul>
            <li>Developed high-performance interactive web applications with Vue.js and TypeScript.</li>
            <li>Integrated real-time cryptocurrency APIs for live market data visualization.</li>
            <li>Applied UX best practices to improve accessibility and navigation.</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="card reveal" style="--d: 0.32s">
      <h2><i class="mdi mdi-school-outline" aria-hidden="true" /> Education</h2>
      <p><strong>B.Sc. Computer Engineering</strong> - Azad University of Karaj, Iran (2023 - Present)</p>
      <p>Relevant coursework: Web Engineering, UI/UX Design, Software Architecture</p>
    </section>

    <section class="card reveal" style="--d: 0.4s">
      <h2><i class="mdi mdi-target" aria-hidden="true" /> Professional Goal</h2>
      <p>
        Seeking a long-term Frontend Engineer role to deepen Vue.js and TypeScript expertise,
        contribute through the full product lifecycle from design to deployment, and grow toward
        a product-centric role.
      </p>
    </section>
  </div>
</template>

<style scoped>
.resume-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-4) var(--space-7);
  color: var(--text);
}

.card {
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  padding: var(--space-5);
  margin-bottom: var(--space-4);
}

.reveal {
  opacity: 0;
  transform: translateY(18px);
  animation: rise 0.65s var(--ease) forwards;
  animation-delay: var(--d);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    animation: none;
  }
}

@keyframes rise {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero {
  position: relative;
  background: var(--bg-elev);
}

.hero h1 {
  font-size: var(--text-h1);
  margin: var(--space-2) 0;
}

.role {
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin: 0 0 var(--space-4);
}

.download-resume {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 44px;
  padding: 0 var(--space-5);
  border-radius: var(--radius-full);
  background: var(--accent);
  color: var(--on-accent);
  font-weight: 600;
  font-size: var(--text-sm);
  text-decoration: none;
  float: right;
  transition: background-color var(--dur) var(--ease);
}

.download-resume:hover {
  background: var(--accent-hover);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-2);
  margin-top: var(--space-4);
  clear: both;
}

.contact-grid a {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 44px;
  color: var(--text-muted);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: color var(--dur) var(--ease);
}

.contact-grid a:hover {
  color: var(--accent);
  text-decoration: underline;
}

h2 {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-h2);
  margin: 0 0 var(--space-4);
  color: var(--text);
}

h3 {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-h3);
  margin: 0 0 var(--space-1);
  color: var(--text);
}

p {
  color: var(--text-muted);
  line-height: var(--leading-normal);
  margin: 0 0 var(--space-3);
}

p:last-child {
  margin-bottom: 0;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-4);
}

.skills-grid article {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--space-4);
  background: var(--bg);
}

.skills-grid p {
  font-size: var(--text-sm);
  margin: 0;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.exp {
  border-left: 2px solid var(--border);
  padding-left: var(--space-4);
}

.exp h3 {
  font-size: 1rem;
}

.date {
  font-family: var(--font-mono);
  font-size: var(--text-label);
  color: var(--accent);
  font-weight: 600;
  margin: 0 0 var(--space-2);
}

.exp ul {
  margin: 0;
  padding-left: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.exp li {
  color: var(--text-muted);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

strong {
  color: var(--text);
}

@media (max-width: 720px) {
  .resume-page {
    padding: 5.5rem var(--space-3) var(--space-6);
  }

  .card {
    padding: var(--space-4);
  }

  .download-resume {
    float: none;
    width: 100%;
    justify-content: center;
    margin-bottom: var(--space-4);
  }
}
</style>
