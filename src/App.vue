<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import SiteLogo from '@/components/nav/SiteLogo.vue'
import LanguageSwitch from '@/components/nav/LanguageSwitch.vue'

const { t } = useI18n()
</script>

<template>
  <header class="header">
    <div class="header__row">
      <SiteLogo />

      <nav class="nav">
        <ul class="nav__list">
          <li class="nav__item"><RouterLink to="/" class="nav__link">{{ t('nav.home') }}</RouterLink></li>
          <li class="nav__item"><RouterLink to="/portfolio" class="nav__link">{{ t('nav.portfolio') }}</RouterLink></li>
        </ul>
        <LanguageSwitch />
      </nav>
    </div>
  </header>

  <RouterView />
</template>


<style lang="scss">
html {
  font-size: 20px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

body {
  background-color: #0a0a0a;
  margin: 0;
}

.header {
  padding: 1.25rem 0.3rem;

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3rem;
  }
}
.nav {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 1.25rem;
  font-family: sans-serif;
  letter-spacing: 3px;
  &__list {
    display: flex;
    list-style: none;
    gap: 4rem;
  }
  &__link {
    color: rgb(125, 125, 125);
    text-decoration: none;
    &.router-link-active { color: $color-primary; }
  }
}

@media (max-width: 768px) {
  .header__row {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1.5rem;
  }
  .nav {
    padding: 0;
    gap: 1.5rem;
  }
}
</style>