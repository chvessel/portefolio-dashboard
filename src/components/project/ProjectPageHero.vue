<script setup>
defineProps({
  eyebrow: { type: String, default: 'Featured Project' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  accent: { type: String, default: '#7c5cff' },
  bg: { type: String, default: '#0a0912' },
});
</script>

<template>
  <main class="project-hero" :style="{ background: `radial-gradient(1200px 600px at 80% -10%, ${accent}29, transparent), ${bg}` }">
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
    </header>

    <div class="project-hero__window-wrap">
      <slot />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.project-hero {
  min-height: 100vh;
  padding: 72px 5vw 96px;
  box-sizing: border-box;
  font-family: 'Inter', system-ui, sans-serif;

  &__header {
    max-width: 1180px;
    margin: 0 auto 44px;
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
    max-width: 640px;
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

  &__window-wrap {
    display: flex;
    justify-content: center;
    overflow-x: auto;
  }
}
</style>
