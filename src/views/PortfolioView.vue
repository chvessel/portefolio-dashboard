<script setup>
import ProjectCard from '@/components/cards/ProjectCard.vue';
</script>

<template>
  <main class="portfolio-page">
    <header class="portfolio-page__header">
      <h1 class="portfolio-page__title">My <span class="portfolio-page__title--alt">work</span></h1>
      <p class="portfolio-page__description">A collection of projects where I've combined design and code.</p>
    </header>

    <div class="portfolio-page__grid">
      <ProjectCard
        title="DataNest — AI Marketing Assistant"
        description="AI-powered analytics workspace for marketing teams to track conversions and catch invalid traffic."
        image="/images/datanest-preview.svg"
        link="/portfolio/datanest"
      />
      <ProjectCard
        title="Finance Dashboard"
        description="Comprehensive financial overview featuring real-time data visualization."
        image="/images/project_one.jpg"
      />
      <ProjectCard 
        title="AI Chatbot" 
        description="Intelligent conversational interface built with natural language processing."
        image="/images/project_two.jpg"
      />
      <ProjectCard 
        title="Bakery Insight" 
        description="Specialized analytics platform for tracking bakery production."
        image="/images/project_three.jpg"
      />
      <ProjectCard 
        title="E-commerce App" 
        description="Full-stack shopping experience with secure checkout."
        image="/images/project1.jpg"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.portfolio-page {
  background-color: #0d0d0d;
  padding: 4rem;
  color: white;

  &__header {
    text-align: center;
    margin-bottom: 4rem;
  }

  &__title {
    font-size: 3.5rem;
    &--alt { color: #f9c909; }
  }

  &__description { 
    color: #818181; 
    margin-top: 1rem; 
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>