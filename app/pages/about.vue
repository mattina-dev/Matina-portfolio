<template>
  <div class="resume-page">
    <header class="hero card reveal" style="--d: 0s">
      <a class="download-resume" href="/matina-safaei-resume.pdf" download>
        <i class="mdi mdi-download-circle-outline" /> Download Resume (PDF)
      </a>
      <p class="eyebrow"><i class="mdi mdi-file-account-outline" /> Resume Overview</p>
      <h1>Matina Safaei</h1>
      <p class="role"><i class="mdi mdi-laptop" /> Frontend Engineer | Product-Minded</p>

      <div class="contact-grid">
        <a href="tel:09057056997"><i class="mdi mdi-phone" /> 09057056997</a>
        <a href="mailto:matina.safaei@gmail.com"><i class="mdi mdi-email-outline" /> matina.safaei@gmail.com</a>
        <a href="https://github.com/mattina-dev" target="_blank"><i class="mdi mdi-github" /> github.com/mattina-dev</a>
        <a href="https://www.linkedin.com/in/matina-safaei" target="_blank"><i class="mdi mdi-linkedin" /> linkedin.com/in/matina-safaei</a>
      </div>
    </header>

    <section class="card reveal" style="--d: 0.08s">
      <h2><i class="mdi mdi-account-circle-outline" /> Profile</h2>
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
      <h2><i class="mdi mdi-tools" /> Technical Skills</h2>
      <div class="skills-grid">
        <article>
          <h3><i class="mdi mdi-code-tags" /> Frontend Development</h3>
          <p>Vue.js, Nuxt.js, React.js, Next.js, Angular, TypeScript, JavaScript (ES6+), HTML5, CSS3</p>
        </article>
        <article>
          <h3><i class="mdi mdi-palette-outline" /> State & UI</h3>
          <p>Pinia, Vuex, Vuetify, Bootstrap, Tailwind CSS</p>
        </article>
        <article>
          <h3><i class="mdi mdi-cog-outline" /> Tools & Workflows</h3>
          <p>Git, REST API, GraphQL basics, Figma, Jira, Notion, Slack</p>
        </article>
      </div>
    </section>

    <section class="card reveal" style="--d: 0.24s">
      <h2><i class="mdi mdi-briefcase-outline" /> Experience</h2>
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
      <h2><i class="mdi mdi-school-outline" /> Education</h2>
      <p><strong>B.Sc. Computer Engineering</strong> - Azad University of Karaj, Iran (2023 - Present)</p>
      <p>Relevant coursework: Web Engineering, UI/UX Design, Software Architecture</p>
    </section>

    <section class="card reveal" style="--d: 0.4s">
      <h2><i class="mdi mdi-target" /> Professional Goal</h2>
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
  max-width: 1080px;
  margin: 0 auto;
  padding: 7rem 1rem 2.5rem;
  color: #3f2b16;
}

.card {
  background: linear-gradient(145deg, #fff6ee, #f3e1d2);
  border: 1px solid #e2cdb8;
  border-radius: 20px;
  box-shadow: 0 16px 30px rgba(100, 64, 30, 0.1);
  padding: 1.4rem;
  margin-bottom: 1rem;
}

.reveal {
  opacity: 0;
  transform: translateY(18px);
  animation: rise 0.65s ease forwards;
  animation-delay: var(--d);
}

.hero {
  background: radial-gradient(circle at top right, #f3cead, #fff4e8 65%);
}

.download-resume {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.75rem;
  background: #633b1c;
  color: #fff;
  text-decoration: none;
  padding: 0.6rem 0.9rem;
  border-radius: 12px;
  font-weight: 700;
  transition: transform 0.2s ease, background 0.2s ease;
}

.download-resume:hover {
  transform: translateY(-2px);
  background: #4b2d14;
}

.eyebrow {
  color: #6f4a27;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 0.2rem;
}

.role {
  font-size: 1.15rem;
  color: #6f4a27;
}

h2 {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.7rem;
}

h3 {
  margin-bottom: 0.4rem;
}

.contact-grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.55rem;
}

.contact-grid a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.75rem;
  border-radius: 12px;
  color: #4f3115;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.58);
  transition: transform 0.2s ease, background 0.2s ease;
}

.contact-grid a:hover {
  transform: translateY(-2px);
  background: #fff;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.skills-grid article {
  background: rgba(255, 255, 255, 0.62);
  border-radius: 14px;
  padding: 0.8rem;
}

.timeline {
  border-left: 2px solid #d2ab86;
  padding-left: 1rem;
}

.exp {
  position: relative;
  margin-bottom: 1rem;
}

.exp::before {
  content: '';
  position: absolute;
  left: -1.42rem;
  top: 0.4rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #9c6030;
}

p {
  line-height: 1.65;
}

.date {
  color: #7f5432;
  font-size: 0.95rem;
  font-weight: 600;
}

ul {
  padding-left: 1rem;
}

@keyframes rise {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .contact-grid,
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
