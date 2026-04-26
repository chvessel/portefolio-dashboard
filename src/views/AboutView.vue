<script setup>
import ActionButton from '@/components/buttons/ActionButton.vue';
</script>

<template>
  <main class="about">
    <div class="about__container">
      <section class="about__content">
        <h1 class="about__title">About <span class="about__title--alt">Me</span></h1>
        <div class="about__body">
          <p class="about__text">
            I am a passionate Frontend Developer based in Denmark, specialized in building 
            performant and aesthetic web applications. My journey started with a curiosity 
            for design and evolved into a deep love for Vue.js and modern CSS.
          </p>
          <p class="about__text">
            I believe that great software is built at the intersection of rigorous logic 
            and intuitive design. When I'm not coding, I'm usually exploring new 
            technologies or refining my craft in UI/UX design.
          </p>
        </div>
        <div class="about__skills">
          <h3 class="about__subtitle">Core Skills</h3>
          <ul class="about__skill-list">
            <li>Vue 3 & Vite</li>
            <li>SCSS / BEM</li>
            <li>TypeScript</li>
            <li>UI/UX Design</li>
          </ul>
        </div>
        <ActionButton>Download CV</ActionButton>
      </section>

      <section class="about__visual">
        <figure class="about__figure">
          <img src="/images/profile_pic_placeholder.jpg" alt="Matt" class="about__img">
          <div class="about__overlay"></div>
        </figure>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.about {
  background-color: #0d0d0d;
  min-height: 90vh;
  padding: 4rem;
  color: white;

  &__container {
    display: flex;
    gap: 80px;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  &__content { flex: 1.5; }

  &__title {
    font-size: 3rem;
    margin-bottom: 2rem;
    &--alt { color: #f9c909; }
  }

  &__text {
    color: #818181;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  &__subtitle { margin: 2rem 0 1rem; color: #f9c909; }

  &__skill-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    list-style: none;
    margin-bottom: 2rem;
    color: #ccc;
    li::before { content: "→ "; color: #f9c909; }
  }

  &__visual { flex: 1; }

  &__figure {
    position: relative;
    border-radius: 30px;
    overflow: hidden;
  }

  &__img { width: 100%; display: block; filter: grayscale(50%); }

  &__overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(to bottom, #0d0d0d 0%, transparent 15%, transparent 85%, #0d0d0d 100%);
  }
}
</style>
