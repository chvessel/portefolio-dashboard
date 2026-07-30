<script setup>
defineProps({
  eyebrow: { type: String, default: 'Featured Project' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  accent: { type: String, default: '#7c5cff' },
  problemLabel: { type: String, default: 'The problem' },
  problem: { type: String, default: '' },
});
</script>

<template>
  <main class="project-hero">
    <header class="project-hero__header">
      <div class="project-hero__eyebrow">
        <span class="project-hero__eyebrow-dot" :style="{ background: accent }"></span>
        <span>{{ eyebrow }}</span>
      </div>
      <h1 class="project-hero__title">{{ title }}</h1>
      <p class="project-hero__description">{{ description }}</p>
      <div class="project-hero__tags">
        <span v-for="tag in tags" :key="tag" class="project-hero__tag">{{ tag }}</span>
      </div>

      <div v-if="problem" class="project-hero__problem" :style="{ borderColor: `${accent}4d` }">
        <div class="project-hero__problem-label" :style="{ color: accent }">{{ problemLabel }}</div>
        <p class="project-hero__problem-text">{{ problem }}</p>
      </div>
    </header>

    <div class="project-hero__window-wrap">
      <slot />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.project-hero {
  min-height: 100vh;
  padding: 2.4rem 4rem 4.8rem;
  box-sizing: border-box;
  background: $color-bg;
  font-family: 'Inter', system-ui, sans-serif;

  &__header {
    margin: 0 0 44px;
  }

  &__eyebrow {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #9b98a3;
    font-weight: 600;
  }

  &__eyebrow-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  &__title {
    margin: 0 0 14px;
    font-size: 42px;
    line-height: 1.1;
    color: #f5f3f7;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  &__description {
    margin: 0 0 24px;
    max-width: 700px;
    font-size: 16px;
    line-height: 1.6;
    color: #b3b0bb;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__tag {
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.04);
    color: #d6d4dd;
    font-size: 13px;
  }

  &__problem {
    margin-top: 28px;
    max-width: 700px;
    padding: 16px 20px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
  }

  &__problem-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }

  &__problem-text {
    margin: 0;
    font-size: 14.5px;
    line-height: 1.65;
    color: #c7c4cd;
  }

  &__window-wrap {
    display: flex;
    justify-content: flex-start;
    overflow-x: auto;
  }
}

@media (max-width: $breakpoint-tablet) {
  .project-hero {
    padding: 2rem 2.5rem 4rem;
  }
}

@media (max-width: $breakpoint-mobile) {
  .project-hero {
    padding: 1.75rem 1.25rem 3rem;
  }

  .project-hero__title {
    font-size: 30px;
  }

  .project-hero__description {
    font-size: 14.5px;
  }
}
</style>
