<script setup>

</script>

<template>
  <button class="action">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.action {
    border: none;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px 30px;
    background-color: rgb(249, 201, 9);
    font-weight: 600;
    font-size: 18px;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }
  </style>