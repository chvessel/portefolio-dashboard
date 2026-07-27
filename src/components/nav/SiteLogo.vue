<script setup>
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <RouterLink to="/" class="logo" :aria-label="t('logo.aria')">
    <img src="/images/portfolio-logo.svg" alt="CHV" class="logo__mark" />
  </RouterLink>
</template>

<style lang="scss" scoped>
.logo {
  display: inline-flex;
  text-decoration: none;
}

.logo__mark {
  display: block;
  width: 6.5rem;
  height: 6.5rem;
  transition: $transition-base;

  .logo:hover & {
    transform: scale(1.06);
  }
}

@media (max-width: 768px) {
  .logo__mark {
    width: 4.5rem;
    height: 4.5rem;
  }
}
</style>
