<script setup>
import { useI18n } from 'vue-i18n';
import { setLocale } from '@/i18n';

const { locale, t } = useI18n();
</script>

<template>
  <div class="lang-switch" role="group" :aria-label="t('language.label')">
    <button
      type="button"
      class="lang-switch__btn"
      :class="{ 'lang-switch__btn--active': locale === 'da' }"
      @click="setLocale('da')"
    >
      DA
    </button>
    <span class="lang-switch__divider">/</span>
    <button
      type="button"
      class="lang-switch__btn"
      :class="{ 'lang-switch__btn--active': locale === 'en' }"
      @click="setLocale('en')"
    >
      EN
    </button>
  </div>
</template>

<style lang="scss" scoped>
.lang-switch {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.lang-switch__btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 2px;
  color: rgb(125, 125, 125);
  font-family: $font-main;
  font-weight: $font-weight-semibold;
  letter-spacing: 1px;
  transition: $transition-base;

  &:hover {
    color: $color-white;
  }

  &--active {
    color: $color-primary;
  }
}

.lang-switch__divider {
  color: rgba(255, 255, 255, 0.2);
}
</style>
