<script setup>
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <RouterLink to="/" class="logo" :aria-label="t('logo.aria')">
    <span class="logo__mark">C<span class="logo__accent">H</span>V</span>
  </RouterLink>
</template>

<style lang="scss" scoped>
.logo {
  display: inline-flex;
  text-decoration: none;
}

.logo__mark {
  font-family: $font-main;
  font-size: 34px;
  font-weight: $font-weight-thin;
  letter-spacing: 7px;
  color: $color-white;
  transition: $transition-base;

  .logo:hover & {
    letter-spacing: 9px;
  }
}

.logo__accent {
  color: $color-primary;
  font-weight: $font-weight-medium;
}

@media (max-width: 768px) {
  .logo__mark {
    font-size: 26px;
    letter-spacing: 5px;
  }
}
</style>
