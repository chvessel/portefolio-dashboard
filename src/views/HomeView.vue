<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ActionButton from '@/components/buttons/ActionButton.vue';
import ProjectCard from '@/components/cards/ProjectCard.vue';
import ContactModal from '@/components/modals/ContactModal.vue';
import { projects } from '@/data/projects';

const { t } = useI18n();

const contactEmail = 'carina@haubro.me';
const contactPhone = '+45 42 74 29 14';
const contactPhoneHref = 'tel:+4542742914';

const featuredIds = ['moneta', 'ghost', 'mediadeck'];
const featuredProjects = projects.filter((p) => featuredIds.includes(p.id));

const isContactModalOpen = ref(false);
</script>

<template>
  <main class="portfolio">

    <section class="hero">
      <div class="hero__container">
        <div class="hero__content">
          <h1 class="hero__title">{{ t('hero.greeting') }}</h1>
          <h2 class="hero__subtitle">{{ t('hero.role') }}</h2>
          <p class="hero__text">{{ t('hero.intro') }}</p>
          <div class="hero__actions">
            <ActionButton>{{ t('hero.readMore') }}</ActionButton>
            <ActionButton href="/cv/Carina-Vessel-CV.pdf" download class="hero__cv-btn">
              {{ t('hero.downloadCv') }}
            </ActionButton>
          </div>
        </div>

        <div class="hero__visual">
          <figure class="hero__figure">
            <img class="hero__img" src="/images/Profile_pic_me.png" alt="profile picture">
            <div class="hero__overlay"></div>
          </figure>
        </div>
      </div>
    </section>

    <section class="portfolio__main">
      <div class="portfolio__container">

        <div class="projects">
          <h3 class="projects__title">{{ t('home.featuredTitle') }}</h3>
          <div class="projects__grid">
            <ProjectCard
              v-for="project in featuredProjects"
              :key="project.id"
              :title="t(`projects.${project.id}.title`)"
              :description="t(`projects.${project.id}.description`)"
              :image="project.image"
              :link="project.link"
            />
          </div>
        </div>

        <aside class="sidebar">
          <div class="sidebar__section">
            <h3 class="sidebar__title">{{ t('home.aboutTitle') }}</h3>
            <p class="sidebar__text">{{ t('home.aboutText') }}</p>
          </div>

          <div class="sidebar__section">
            <h3 class="sidebar__title">{{ t('home.contactTitle') }}</h3>
            <ActionButton class="contact-block__cta" @click="isContactModalOpen = true">
              {{ t('home.contactCta') }}
            </ActionButton>
          </div>
        </aside>

      </div>
    </section>

    <ContactModal
      v-if="isContactModalOpen"
      :email="contactEmail"
      :phone="contactPhone"
      :phone-href="contactPhoneHref"
      @close="isContactModalOpen = false"
    />

  </main>
</template>

<style lang="scss" scoped>
.portfolio {
  background-color: $color-bg;
  min-height: 70vh;
  color: white;

  &__container {
    display: flex;
    gap: 60px;
    padding: 0 4rem 6rem 4rem;
  }
}

.hero {
  padding: 0 4rem 0 4rem;
  min-height: 50vh;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 2rem;
  }

  &__content {
    flex: 0.9;
  }

  &__title {
    margin-top: 0;
    font-size: clamp(2rem, 5vw, 3.75rem);
    font-weight: 600;
    margin-bottom: 1rem;
  }

  &__subtitle {
    color: $color-primary;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  &__text {
    color: $color-text-muted;
    line-height: 1.7;
    margin-bottom: 2rem;
    max-width: 620px;
  }

  &__actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  &__cv-btn {
    background-color: transparent;
    border: 2px solid $color-primary;
    color: $color-primary;

    &:hover {
      background-color: rgba($color-primary, 0.08);
    }
  }

  &__visual {
    flex: 1.6;
  }

  &__figure {
    position: relative;
    border-radius: 50px;
    overflow: hidden;
    max-width: 860px;
    aspect-ratio: 767 / 720;
    margin: 0 0 0 auto;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left top;
    display: block;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background:
      linear-gradient(to bottom,
      $color-bg 0%,
      transparent 15%,
      transparent 85%,
      $color-bg 100%),

      linear-gradient(to right,
      $color-bg 0%,
      transparent 25%);
  }
}

.projects {
  flex: 3;

  &__title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  &__grid {
    display: flex;
    gap: 20px;
    cursor: pointer;
  }
}

.sidebar {
  flex: 1.2;

  &__section {
    margin-bottom: 3rem;
  }

  &__title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  &__text {
    color: $color-text-muted;
    line-height: 1.6;
  }
}

@media (max-width: 1024px) {
  .hero__container,
  .portfolio__container,
  .projects__grid {
    flex-direction: column;
  }

  .portfolio__container,
  .hero {
    padding: 0;
  }

  .hero__figure {
    margin: 0;
  }
}
</style>
