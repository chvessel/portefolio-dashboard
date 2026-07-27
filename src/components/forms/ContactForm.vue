<script setup>

</script>

<template>
  <section class="contact__form-wrapper">
        <form class="contact-form">
          <div class="contact-form__group">
            <label class="contact-form__label">Name</label>
            <input type="text" class="contact-form__input" placeholder="Name">
          </div>
          <div class="contact-form__group">
            <label class="contact-form__label">Email</label>
            <input type="email" class="contact-form__input" placeholder="Email">
          </div>
          <div class="contact-form__group">
            <label class="contact-form__label">Message</label>
            <textarea class="contact-form__input contact-form__input--textarea"></textarea>
          </div>
          <ActionButton>Send message</ActionButton>
        </form>
      </section>
</template>

<style lang="scss" scoped>
.contact-form {

    &__group { 
      margin-bottom: 1.5rem; 
    }

    &__label { 
      display: block; 
      margin-bottom: 8px; 
      color: #ccc; 
      font-size: 0.9rem; 
    }

    &__input {
      width: 100%;
      background: #0d0d0d;
      border: 1px solid #333;
      padding: 12px;
      color: white;
      border-radius: 8px;
      outline: none;
      
      &:focus { 
        border-color: #f9c909; 
      }

      &--textarea {
        height: 150px; 
        resize: none; 
      }
    }
  }

</style>