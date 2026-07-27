<script setup>
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <RouterLink to="/" class="logo" :aria-label="t('logo.aria')">
    <span class="logo__mark">
      <span class="logo__letter logo__letter--v">V</span>
      <span class="logo__letter logo__letter--c">C</span>
      <span class="logo__letter logo__letter--h">H</span>
    </span>
  </RouterLink>
</template>

<style lang="scss" scoped>
.logo {
  display: inline-flex;
  text-decoration: none;
}

.logo__mark {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  transition: $transition-base;

  .logo:hover & {
    border-color: rgba(249, 201, 9, 0.5);
    transform: translateY(-1px);
  }
}

.logo__letter {
  position: absolute;
  font-weight: 800;
  font-family: $font-main;
  line-height: 1;
  user-select: none;
}

.logo__letter--v {
  top: 6px;
  left: 8px;
  font-size: 22px;
  color: rgba(255, 255, 255, 0.14);
  letter-spacing: -1px;
}

.logo__letter--c {
  bottom: 5px;
  left: 6px;
  font-size: 16px;
  color: $color-white;
}

.logo__letter--h {
  top: 9px;
  right: 6px;
  font-size: 18px;
  color: $color-primary;
  transform: rotate(-6deg);
}
</style>
