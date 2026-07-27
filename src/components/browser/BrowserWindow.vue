<script setup>
import { computed } from 'vue';

const props = defineProps({
  url: { type: String, default: 'example.com' },
  tabTitle: { type: String, default: 'New Tab' },
  width: { type: [Number, String], default: 900 },
  height: { type: [Number, String], default: 600 },
});

const sizeStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}));
</script>

<template>
  <div class="browser-window" :style="sizeStyle">
    <div class="browser-window__tabbar">
      <div class="browser-window__lights">
        <span class="browser-window__light browser-window__light--red"></span>
        <span class="browser-window__light browser-window__light--yellow"></span>
        <span class="browser-window__light browser-window__light--green"></span>
      </div>
      <div class="browser-window__tab browser-window__tab--active">
        <span class="browser-window__tab-dot"></span>
        <span class="browser-window__tab-title">{{ tabTitle }}</span>
      </div>
    </div>

    <div class="browser-window__toolbar">
      <span class="browser-window__icon-dot"></span>
      <div class="browser-window__url">
        <span class="browser-window__url-dot"></span>
        <span class="browser-window__url-text">{{ url }}</span>
      </div>
      <span class="browser-window__icon-dot"></span>
    </div>

    <div class="browser-window__body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.browser-window {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
  background: #35363a;
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.35),
    0 0 0 1px rgba(0, 0, 0, 0.1);

  &__tabbar {
    display: flex;
    align-items: center;
    height: 44px;
    background: #202124;
    padding-right: 8px;
    flex-shrink: 0;
  }

  &__lights {
    display: flex;
    gap: 8px;
    padding: 0 14px;
  }

  &__light {
    width: 12px;
    height: 12px;
    border-radius: 50%;

    &--red { background: #ff5f57; }
    &--yellow { background: #febc2e; }
    &--green { background: #28c840; }
  }

  &__tab {
    height: 34px;
    align-self: flex-end;
    padding: 0 12px;
    margin-left: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 120px;
    max-width: 220px;
    font-size: 12px;
    color: #9aa0a6;
    border-radius: 8px 8px 0 0;

    &--active {
      background: #35363a;
      color: #e8eaed;
    }
  }

  &__tab-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #5f6368;
    flex-shrink: 0;
  }

  &__tab-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__toolbar {
    height: 40px;
    background: #35363a;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 14px;
    flex-shrink: 0;
  }

  &__icon-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #9aa0a6;
    opacity: 0.4;
    flex-shrink: 0;
  }

  &__url {
    flex: 1;
    height: 30px;
    border-radius: 15px;
    background: #282a2d;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 14px;
    margin: 0 6px;
  }

  &__url-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #9aa0a6;
    opacity: 0.4;
    flex-shrink: 0;
  }

  &__url-text {
    flex: 1;
    color: #e8eaed;
    font-size: 13px;
  }

  &__body {
    flex: 1;
    background: #fff;
    overflow: auto;
    min-height: 0;
  }
}
</style>
