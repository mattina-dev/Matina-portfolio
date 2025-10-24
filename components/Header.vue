<template>
    <header class="hero">
        <div class="hero-text">
            <h1>Matina safaei</h1>
            <p>Frontend Developer specializing in Vue.js, Nuxt 3, and modern UI/UX design.</p>
        </div>
        <div class="hero-image">
            <!-- You can put your image here later -->
            <img src="../assets/photo_2025-10-03_19-00-38-Photoroom.png" alt="Matina Photo" />
        </div>
    </header>
</template>

<script setup></script>

<style scoped>
.hero {
    display: flex;
    align-items: center;
    /* vertically center content */
    justify-content: space-between;
    /* space between text and image */
    height: 100vh;
    /* full viewport height */
    padding: 0rem 4rem;
    background-color: #f5f5f5;
}

.hero-text {
    max-width: 50%;
}

.hero-text h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: rgb(139, 69, 19);
}

.hero-text p {
    font-size: 1.5rem;
    color: #555;
}

.hero-image {
  position: relative;
  max-width: 45%;
  height: auto;
}

.hero-image::before {
  content: '';
  position: absolute;

  width: 110%;
  height: 200%;
  bottom: 0%;
  background: linear-gradient(90deg, rgba(139, 69, 19, 0.5), rgba(210,180,140,0));
  transform: rotate(-180deg);
  z-index: 0;
  border-radius: 1rem;
}

.hero-image img {
  position: relative;
  width: 100%;
  height: auto;
  z-index: 1;
  border-radius: 1rem;
  object-fit: cover;
}
</style>