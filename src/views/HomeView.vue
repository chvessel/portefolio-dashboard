<script setup>
import ActionButton from '@/components/buttons/ActionButton.vue';
import ProjectCard from '@/components/cards/ProjectCard.vue';
</script>

<template>
  <main class="portfolio">
    
    <section class="hero">
      <div class="hero__container">
        <div class="hero__content">
          <h1 class="hero__title">Hi, i'm Matt Delane</h1>
          <h2 class="hero__subtitle">Frontend Developer</h2>
          <p class="hero__text">
            Here is some text about my work and passion as a Frontend Developer. 
            Here is some text about my work and passion as a Frontend Developer.
          </p>
          <div class="hero__actions">
            <ActionButton>Read more</ActionButton>
          </div>
        </div>

        <div class="hero__visual">
          <figure class="hero__figure">
            <img class="hero__img" src="/images/profile_pic_placeholder.jpg" alt="profile picture">
            <div class="hero__overlay"></div>
          </figure>
        </div>
      </div>
    </section>

    <section class="portfolio__main">
      <div class="portfolio__container">
        
        <div class="projects">
          <h3 class="projects__title">Featured Projects</h3>
          <div class="projects__grid">

            <ProjectCard 
             title="Finance overview"
              description="A comprehensive financial overview featuring real-time data visualization, 
              expense tracking, and interactive charts to monitor personal or business wealth."
              image="/images/project_one.jpg" />

            <ProjectCard
            title="AI chatbot"
            description="An intelligent conversational interface built with natural language 
            processing to provide instant customer support and automated task handling." 
              image="/images/project_two.jpg"/>

            <ProjectCard 
            title="Bakery insight viewboard"
              description="A specialized analytics platform for bakeries, tracking daily sales trends, 
              inventory levels, and production efficiency in a clean, visual layout."
              image="/images/project_three.jpg"/>
          </div>
        </div>

        <aside class="sidebar">
          <div class="sidebar__section">
            <h3 class="sidebar__title">About Me</h3>
            <p class="sidebar__text">
              I build modern and responsive web applications with a focus on 
              user experience and clean code.
            </p>
          </div>
          
          <div class="sidebar__section">
            <h3 class="sidebar__title">Contact Me</h3>
            <form class="contact-form">
              <div class="contact-form__placeholder">Formular placeholder</div>
            </form>
          </div>
        </aside>

      </div>
    </section>

  </main>
</template>

<style lang="scss" scoped>
$color-bg: #0a0a0a;
$color-primary: #f9c909;
$color-text-muted: #818181;

.portfolio {
  background-color: $color-bg;
  min-height: 70vh;
  color: white;

  &__container {
    display: flex;
    gap: 60px;
    padding: 0 4rem 6rem 4rem;
  }
}

.hero {
  padding: 0 4rem 0 4rem;
  min-height: 50vh;
  display: flex;
  align-items: center;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 2rem;
  }

  &__content {
    flex: 1;
  }

  &__title {
    margin-top: 0;
    font-size: clamp(32px, 5vw, 60px);
    font-weight: 600;
    margin-bottom: 1rem;
  }

  &__subtitle {
    color: $color-primary;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  &__text {
    color: $color-text-muted;
    line-height: 1.7;
    margin-bottom: 2rem;
    max-width: 500px;
  }

  &__figure {
    position: relative;
    border-radius: 50px;
    overflow: hidden;
    max-width: 600px;
    margin: 0;
  }

  &__img {
    width: 100%;
    display: block;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: 
      linear-gradient(to bottom, 
      $color-bg 0%, 
      transparent 15%, 
      transparent 85%, 
      $color-bg 100%),
      
      linear-gradient(to right, 
      $color-bg 0%, 
      transparent 35%);
  }
}

.projects {
  flex: 3;

  &__title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  &__grid {
    display: flex;
    gap: 20px;
    cursor: pointer;
  }
}

.sidebar {
  flex: 1.2;

  &__section {
    margin-bottom: 3rem;
  }

  &__title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  &__text {
    color: $color-text-muted;
    line-height: 1.6;
  }
}

.contact-form {
  &__placeholder {
    border: 1px dashed #333;
    padding: 2rem;
    text-align: center;
    color: #444;
    border-radius: 12px;
  }
}

@media (max-width: 1024px) {
  .hero__container, 
  .portfolio__container, 
  .projects__grid {
    flex-direction: column;
  }

  .portfolio__container,
  .hero {
    padding: 0;
  }
}
</style>