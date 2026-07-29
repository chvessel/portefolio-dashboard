<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  phoneHref: { type: String, required: true },
});

const emit = defineEmits(['close']);

function onKeydown(e) {
  if (e.key === 'Escape') emit('close');
}

onMounted(() => document.addEventListener('keydown', onKeydown));
onUnmounted(() => document.removeEventListener('keydown', onKeydown));
</script>

<template>
  <Teleport to="body">
    <div class="modal__backdrop" @click.self="emit('close')">
      <div class="modal__dialog" role="dialog" aria-modal="true" :aria-label="t('home.contactTitle')">
        <button type="button" class="modal__close" :aria-label="t('home.close')" @click="emit('close')">
          &times;
        </button>

        <h3 class="modal__title">{{ t('home.contactTitle') }}</h3>
        <p class="modal__pitch">{{ t('home.contactPitch') }}</p>

        <ul class="modal__details">
          <li class="modal__row">
            <span class="modal__label">{{ t('home.emailLabel') }}</span>
            <a :href="`mailto:${email}`" class="modal__value">{{ email }}</a>
          </li>
          <li class="modal__row">
            <span class="modal__label">{{ t('home.phoneLabel') }}</span>
            <a :href="phoneHref" class="modal__value">{{ phone }}</a>
          </li>
        </ul>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal {
  &__backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    z-index: 100;
  }

  &__dialog {
    position: relative;
    background: $color-card-bg;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: $radius-lg;
    padding: 2.5rem;
    max-width: 440px;
    width: 100%;
    color: white;

    @media (max-width: $breakpoint-mobile) {
      padding: 1.75rem;
    }
  }

  &__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: #818181;
    font-size: 1.6rem;
    line-height: 1;
    cursor: pointer;
    transition: $transition-base;

    &:hover {
      color: white;
    }
  }

  &__title {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  &__pitch {
    color: #b0b0b0;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  &__details {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  &__row {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  &__label {
    color: $color-primary;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &__value {
    color: white;
    font-size: 1.05rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
