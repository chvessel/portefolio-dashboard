<script setup>
import ActionButton from '@/components/buttons/ActionButton.vue';
</script>

<template>
  <main class="contact">
    <div class="contact__container">
      <section class="contact__info">
        <h1 class="contact__title">Get in <span class="contact__title--alt">Touch</span></h1>
        <p class="contact__text">Have a project in mind? Let's talk about how I can help you.</p>
        
        <div class="contact__details">
          <div class="contact__item">
            <span class="contact__label">Email</span>
            <p>matt@example.com</p>
          </div>
          <div class="contact__item">
            <span class="contact__label">Location</span>
            <p>Kerteminde, Denmark</p>
          </div>
        </div>
      </section>

      <section class="contact__form-wrapper">
        <form class="contact-form">
          <div class="contact-form__group">
            <label class="contact-form__label">Name</label>
            <input type="text" class="contact-form__input" placeholder="Your Name">
          </div>
          <div class="contact-form__group">
            <label class="contact-form__label">Email</label>
            <input type="email" class="contact-form__input" placeholder="Your Email">
          </div>
          <div class="contact-form__group">
            <label class="contact-form__label">Message</label>
            <textarea class="contact-form__input contact-form__input--textarea" placeholder="How can I help?"></textarea>
          </div>
          <ActionButton>Send Message</ActionButton>
        </form>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.contact {
  background-color: #0d0d0d;
  padding: 6rem 4rem;
  color: white;
  min-height: 90vh;

  &__container {
    display: flex;
    gap: 100px;
    max-width: 1100px;
    margin: 0 auto;
  }

  &__info { flex: 1; }

  &__title {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    &--alt { color: #f9c909; }
  }

  &__text { color: #818181; margin-bottom: 3rem; }

  &__label { display: block; color: #f9c909; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 5px; }

  &__item { margin-bottom: 2rem; }

  &__form-wrapper { flex: 1.5; background: #161616; padding: 3rem; border-radius: 20px; }

  .contact-form {
    &__group { margin-bottom: 1.5rem; }
    &__label { display: block; margin-bottom: 8px; color: #ccc; font-size: 0.9rem; }
    &__input {
      width: 100%;
      background: #0d0d0d;
      border: 1px solid #333;
      padding: 12px;
      color: white;
      border-radius: 8px;
      outline: none;
      &:focus { border-color: #f9c909; }
      &--textarea { height: 150px; resize: none; }
    }
  }
}
</style>