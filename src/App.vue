<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import SiteLogo from '@/components/nav/SiteLogo.vue'
import LanguageSwitch from '@/components/nav/LanguageSwitch.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
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

  <div v-if="route.path !== '/'" class="back-bar">
    <button type="button" class="back-bar__btn" @click="router.back()">
      <span class="back-bar__arrow">←</span>{{ t('nav.back') }}
    </button>
  </div>

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
  font-size: 1.4rem;
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

.back-bar {
  padding: 0 5rem;
  margin-bottom: 1.5rem;

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    cursor: pointer;
    color: rgb(150, 150, 150);
    font-family: sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 0.5rem 1.15rem;
    transition: $transition-base;

    &:hover {
      color: $color-white;
      background: rgba(255, 255, 255, 0.07);
      border-color: rgba(255, 255, 255, 0.18);

      .back-bar__arrow {
        transform: translateX(-3px);
      }
    }
  }

  &__arrow {
    font-size: 1rem;
    transition: transform 0.2s ease;
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
  .back-bar {
    padding: 0 1.5rem;
  }
}
</style>