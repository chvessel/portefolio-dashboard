<script setup>
import { useI18n } from 'vue-i18n';
import ProjectCard from '@/components/cards/ProjectCard.vue';
import { projects } from '@/data/projects';

const { t } = useI18n();
</script>

<template>
  <main class="portfolio-page">
    <header class="portfolio-page__header">
      <h1 class="portfolio-page__title">
        {{ t('portfolio.titleMain') }} <span class="portfolio-page__title-alt">{{ t('portfolio.titleAlt') }}</span>
      </h1>
      <p class="portfolio-page__description">{{ t('portfolio.description') }}</p>
    </header>

    <div class="portfolio-page__grid">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :title="t(`projects.${project.id}.title`)"
        :description="t(`projects.${project.id}.description`)"
        :considerations="t(`projects.${project.id}.considerations`)"
        :technologies="project.technologies"
        :image="project.image"
        :link="project.link"
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
  }

  &__title-alt {
    color: $color-primary;
  }

  &__description {
    color: #818181;
    margin-top: 1rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
    max-width: 1600px;
    margin: 0 auto;
  }
}
</style>
