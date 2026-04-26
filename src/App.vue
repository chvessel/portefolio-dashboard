<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__item"><RouterLink to="/" class="nav__link">Home</RouterLink></li>
        <li class="nav__item"><RouterLink to="/about" class="nav__link">About</RouterLink></li>
        <li class="nav__item"><RouterLink to="/portfolio" class="nav__link">Portfolio</RouterLink></li>
        <li class="nav__item"><RouterLink to="/contact" class="nav__link">Contact</RouterLink></li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>


<style lang="scss">
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
  padding: 20px 5px; 
}
.nav {
  display: flex;
  justify-content: flex-end;
  margin-right: 3rem;
  padding:20px 20px ;
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
    &.router-link-active { color: #f9c909; } 
  }
}
</style>