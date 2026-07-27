<script setup>
import { computed } from 'vue';

const props = defineProps({
  href: { type: String, default: null },
  download: { type: [Boolean, String], default: false },
  target: { type: String, default: null },
});

const tag = computed(() => (props.href ? 'a' : 'button'));
</script>

<template>
  <component
    :is="tag"
    class="action"
    :href="href || undefined"
    :download="href && download ? download : undefined"
    :target="target || undefined"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
  >
    <slot></slot>
  </component>
</template>

<style lang="scss" scoped>
.action {
    display: inline-block;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    padding: 0.65rem 1.9rem;
    background-color: $color-primary;
    font-weight: 600;
    font-size: 1.15rem;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }
  </style>
