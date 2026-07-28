<script setup>
defineProps({
  maxWidth: { type: [Number, String], default: 1320 },
});
</script>

<template>
  <div class="app-frame" :style="{ maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.app-frame {
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  box-shadow:
    0 40px 100px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.06);
}
</style>
