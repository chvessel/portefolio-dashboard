<script setup>
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  image: String,
  title: String,
  description: String,
  link: String,
  technologies: {
    type: Array,
    default: () => [],
  },
  considerations: String,
});
</script>

<template>
  <div class="card">
    <div class="card__image-container">
      <img :src="image" :alt="title" class="card__image" />
      <div class="card__image-overlay"></div>
    </div>

    <div class="card__content">
      <h4 class="card__title">{{ title }}</h4>
      <p class="card__description">{{ description }}</p>

      <ul v-if="technologies.length" class="card__tech">
        <li v-for="tech in technologies" :key="tech" class="card__tech-item">{{ tech }}</li>
      </ul>

      <p v-if="considerations" class="card__considerations">
        <span class="card__considerations-label">{{ t('portfolio.considerationsLabel') }}:</span>
        {{ considerations }}
      </p>

      <div class="card__footer">
        <RouterLink v-if="link" :to="link" class="card__link">{{ t('portfolio.viewMore') }}</RouterLink>
        <a v-else class="card__link">{{ t('portfolio.viewMore') }}</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background: #161616;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
  transition: transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  min-height: 100%;
  font-family: sans-serif;

  &:hover {
    transform: translateY(-5px);
  }

  &__image-container {
    position: relative;
    height: 11.25rem;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #161616, transparent);
  }

  &__content {
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &__title {
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }

  &__description {
    color: #818181;
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  &__tech {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    list-style: none;
    margin: 0 0 1rem;
    padding: 0;
  }

  &__tech-item {
    padding: 3px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.04);
    color: #d6d4dd;
    font-size: 0.7rem;
  }

  &__considerations {
    color: #a8a8a8;
    font-size: 0.78rem;
    line-height: 1.5;
    font-style: italic;
    margin-bottom: 1.5rem;
  }

  &__considerations-label {
    color: $color-primary;
    font-style: normal;
    font-weight: 600;
  }

  &__footer {
    margin-top: auto;
   padding-top: 1rem;
  }

  &__link {
    color: $color-primary;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: normal;
    letter-spacing: 1px;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
