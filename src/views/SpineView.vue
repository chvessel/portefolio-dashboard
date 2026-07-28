<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ProjectPageHero from '@/components/project/ProjectPageHero.vue';
import AppFrame from '@/components/project/AppFrame.vue';

const { t } = useI18n();

const activeScreen = ref('browse');
const activeCategory = ref('all');
const selectedBookId = ref(null);
const selectedFormat = ref('physical');
const cart = ref([]);

const books = [
  {
    id: 1, title: 'The Glass Orchard', author: 'Wren Castellan', genre: 'Fiction', color: '#2f6f4e',
    formats: {
      physical: { price: '$18.99', pages: 324, shipping: 'Ships in 2–3 days' },
      audio: { price: '$14.99', duration: '8h 42m', narrator: 'Emma Cole' },
      ebook: { price: '$9.99', fileSize: '2.1 MB' },
    },
  },
  {
    id: 2, title: 'Northwind Ledger', author: 'Alistair Poe', genre: 'Mystery', color: '#7a3b2e',
    formats: {
      physical: { price: '$21.50', pages: 412, shipping: 'Ships in 2–3 days' },
      audio: { price: '$16.99', duration: '10h 05m', narrator: 'James Wolfe' },
      ebook: { price: '$11.49', fileSize: '2.6 MB' },
    },
  },
  {
    id: 3, title: 'Salt & Static', author: 'Mireille Dupont', genre: 'Sci-Fi', color: '#274b7a',
    formats: {
      physical: { price: '$19.99', pages: 288, shipping: 'Ships in 2–3 days' },
      audio: { price: '$15.49', duration: '7h 58m', narrator: 'Nadia Osei' },
      ebook: { price: '$10.49', fileSize: '1.9 MB' },
    },
  },
  {
    id: 4, title: 'The Quiet Ledger', author: 'Hana Voss', genre: 'Memoir', color: '#8a6d1f',
    formats: {
      physical: { price: '$17.50', pages: 256, shipping: 'Ships in 2–3 days' },
      audio: { price: '$13.99', duration: '6h 20m', narrator: 'the author' },
      ebook: { price: '$8.99', fileSize: '1.7 MB' },
    },
  },
  {
    id: 5, title: 'Cartography of Rain', author: 'Diego Marin', genre: 'Poetry', color: '#5a2f6b',
    formats: {
      physical: { price: '$14.99', pages: 128, shipping: 'Ships in 2–3 days' },
      audio: { price: '$10.99', duration: '2h 40m', narrator: 'the author' },
      ebook: { price: '$6.99', fileSize: '0.9 MB' },
    },
  },
  {
    id: 6, title: 'The Long Ferment', author: 'Odessa Kane', genre: 'Non-fiction', color: '#7a4b1e',
    formats: {
      physical: { price: '$23.99', pages: 368, shipping: 'Ships in 2–3 days' },
      audio: { price: '$18.49', duration: '11h 12m', narrator: 'Priya Nair' },
      ebook: { price: '$12.99', fileSize: '2.9 MB' },
    },
  },
];

const formatLabels = { physical: 'Physical', audio: 'Audiobook', ebook: 'E-book' };
const categoryLabels = { all: 'All Books', physical: 'Physical Books', audio: 'Audiobooks', ebook: 'E-books' };
const cardFormatKey = computed(() => (activeCategory.value === 'all' ? 'physical' : activeCategory.value));

const selectedBook = computed(() => books.find((b) => b.id === selectedBookId.value));
const cartCount = computed(() => cart.value.length);
const cartTotal = computed(() =>
  cart.value.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0).toFixed(2),
);

const formatExtra = computed(() => {
  if (!selectedBook.value) return '';
  const f = selectedBook.value.formats[selectedFormat.value];
  if (selectedFormat.value === 'physical') return `${f.shipping} · ${f.pages} pages`;
  if (selectedFormat.value === 'audio') return `${f.duration} · Narrated by ${f.narrator}`;
  return `Instant download · ${f.fileSize}`;
});

function browseCategory(category) {
  activeCategory.value = category;
  activeScreen.value = 'browse';
}

function openBook(book) {
  selectedBookId.value = book.id;
  selectedFormat.value = activeCategory.value === 'all' ? 'physical' : activeCategory.value;
  activeScreen.value = 'detail';
}

function addToCart() {
  const book = selectedBook.value;
  const format = book.formats[selectedFormat.value];
  cart.value.push({
    title: book.title,
    format: selectedFormat.value,
    price: format.price,
  });
}
</script>

<template>
  <ProjectPageHero
    :eyebrow="t('portfolio.featuredProject')"
    :title="t('projects.spine.title')"
    :description="t('projects.spine.description')"
    :problem-label="t('portfolio.problemLabel')"
    :problem="t('projects.spine.problem')"
    :tags="['Nuxt.js', 'Vue3.js', 'SCSS', 'REST API']"
    accent="#34d399"
  >
    <AppFrame :max-width="1320">
      <div class="fl">
        <header class="fl__topbar">
          <div class="fl__brand" @click="browseCategory('all')">
            <div class="fl__brand-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="15" width="18" height="4" rx="1" />
                <rect x="4" y="10" width="16" height="4" rx="1" />
                <rect x="5" y="5" width="14" height="4" rx="1" />
              </svg>
            </div>
            <div class="fl__brand-name">Spine</div>
          </div>

          <div class="fl__search"><div class="fl__search-icon"></div><span>Search titles, authors, genres</span></div>

          <nav class="fl__top-nav">
            <div class="fl__top-link" :class="{ 'fl__top-link--active': activeCategory === 'all' }" @click="browseCategory('all')">All</div>
            <div class="fl__top-link" :class="{ 'fl__top-link--active': activeCategory === 'physical' }" @click="browseCategory('physical')">Physical Books</div>
            <div class="fl__top-link" :class="{ 'fl__top-link--active': activeCategory === 'audio' }" @click="browseCategory('audio')">Audiobooks</div>
            <div class="fl__top-link" :class="{ 'fl__top-link--active': activeCategory === 'ebook' }" @click="browseCategory('ebook')">E-books</div>
            <div class="fl__cart-btn" @click="activeScreen = 'cart'">
              <div class="fl__cart-icon"></div>
              <span v-if="cartCount" class="fl__cart-badge">{{ cartCount }}</span>
            </div>
          </nav>
        </header>

        <main class="fl__main">
          <template v-if="activeScreen === 'browse'">
            <div class="fl__hero">
              <div class="fl__hero-eyebrow">{{ categoryLabels[activeCategory] }}</div>
              <div class="fl__hero-title">Stories for every format you love</div>
              <div class="fl__hero-text">Print, audio, or e-book — pick the way you read.</div>
            </div>

            <!-- Audiobooks: row/list layout with narrator + duration + play affordance -->
            <div v-if="activeCategory === 'audio'" class="fl__audio-list">
              <div v-for="book in books" :key="book.id" class="fl__audio-row" @click="openBook(book)">
                <div class="fl__audio-cover" :style="{ background: book.color }"></div>
                <div class="fl__audio-play">▶</div>
                <div class="fl__audio-info">
                  <div class="fl__audio-title">{{ book.title }}</div>
                  <div class="fl__audio-author">{{ book.author }} · Narrated by {{ book.formats.audio.narrator }}</div>
                </div>
                <div class="fl__audio-duration">{{ book.formats.audio.duration }}</div>
                <div class="fl__audio-price">{{ book.formats.audio.price }}</div>
              </div>
            </div>

            <!-- E-books: dense grid emphasizing instant download -->
            <div v-else-if="activeCategory === 'ebook'" class="fl__ebook-grid">
              <div v-for="book in books" :key="book.id" class="fl__ebook-card" @click="openBook(book)">
                <div class="fl__ebook-cover" :style="{ background: book.color }">
                  <div class="fl__book-cover-title">{{ book.title }}</div>
                </div>
                <div class="fl__ebook-badge">Instant download</div>
                <div class="fl__ebook-title">{{ book.title }}</div>
                <div class="fl__ebook-author">{{ book.author }}</div>
                <div class="fl__ebook-meta">{{ book.formats.ebook.fileSize }} · {{ book.formats.ebook.price }}</div>
              </div>
            </div>

            <!-- All / Physical: classic cover grid -->
            <div v-else class="fl__grid">
              <div v-for="book in books" :key="book.id" class="fl__book-card" @click="openBook(book)">
                <div class="fl__book-cover" :style="{ background: book.color }">
                  <div class="fl__book-cover-title">{{ book.title }}</div>
                </div>
                <div class="fl__book-genre">{{ book.genre }}</div>
                <div class="fl__book-title">{{ book.title }}</div>
                <div class="fl__book-author">{{ book.author }}</div>
                <div class="fl__book-footer">
                  <span v-if="activeCategory === 'physical'" class="fl__book-tag">{{ book.formats.physical.pages }} pages</span>
                  <span class="fl__book-price">{{ book.formats[cardFormatKey].price }}</span>
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="activeScreen === 'detail' && selectedBook">
            <div class="fl__back" @click="activeScreen = 'browse'">← Back to browsing</div>

            <div class="fl__detail">
              <div class="fl__detail-cover" :style="{ background: selectedBook.color }">
                <div class="fl__book-cover-title">{{ selectedBook.title }}</div>
              </div>

              <div class="fl__detail-info">
                <div class="fl__book-genre">{{ selectedBook.genre }}</div>
                <h2 class="fl__detail-title">{{ selectedBook.title }}</h2>
                <div class="fl__detail-author">by {{ selectedBook.author }}</div>
                <p class="fl__detail-desc">
                  A quietly gripping story that moves between memory and present day, praised for its
                  precise, unhurried prose and characters that stay with you long after the last page.
                </p>

                <div class="fl__format-tabs">
                  <div
                    v-for="(label, key) in formatLabels"
                    :key="key"
                    class="fl__format-tab"
                    :class="{ 'fl__format-tab--active': selectedFormat === key }"
                    @click="selectedFormat = key"
                  >
                    {{ label }}
                  </div>
                </div>

                <div class="fl__format-panel">
                  <div class="fl__format-price">{{ selectedBook.formats[selectedFormat].price }}</div>
                  <div class="fl__format-extra">{{ formatExtra }}</div>
                </div>

                <div class="fl__add-btn" @click="addToCart">Add to cart — {{ selectedBook.formats[selectedFormat].price }}</div>
              </div>
            </div>
          </template>

          <template v-else-if="activeScreen === 'cart'">
            <h2 class="fl__section-title">Your cart</h2>

            <div v-if="!cart.length" class="fl__empty">Your cart is empty — browse the shelf to find your next read.</div>

            <div v-else class="fl__cart-list">
              <div v-for="(item, i) in cart" :key="i" class="fl__cart-row">
                <div class="fl__cart-row-title">{{ item.title }}</div>
                <div class="fl__cart-row-format">{{ formatLabels[item.format] }}</div>
                <div class="fl__cart-row-price">{{ item.price }}</div>
              </div>
              <div class="fl__cart-total">
                <span>Total</span>
                <span>${{ cartTotal }}</span>
              </div>
              <div class="fl__add-btn">Checkout</div>
            </div>
          </template>
        </main>
      </div>
    </AppFrame>
  </ProjectPageHero>
</template>

<style lang="scss" scoped>
.fl {
  min-height: 760px;
  display: flex;
  flex-direction: column;
  background: #131316;
  font-family: 'Inter', system-ui, sans-serif;
  overflow: hidden;
  color: #f2f1f5;

  &__topbar {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 16px 28px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: #18181c;
    flex-shrink: 0;
  }

  &__brand { display: flex; align-items: center; gap: 10px; cursor: pointer; }

  &__brand-mark {
    width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(52, 211, 153, 0.14);
    color: #34d399;

    svg { width: 18px; height: 18px; }
  }

  &__brand-name { font-size: 16px; font-weight: 700; color: #f2f1f5; }

  &__search {
    flex: 1; max-width: 360px; display: flex; align-items: center; gap: 8px;
    background: #1f1f24; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 9px;
    padding: 8px 14px; color: #8f8d99; font-size: 13px;
  }

  &__search-icon { width: 13px; height: 13px; border: 1.6px solid #8f8d99; border-radius: 50%; flex-shrink: 0; }

  &__top-nav { margin-left: auto; display: flex; align-items: center; gap: 4px; }

  &__top-link {
    font-size: 13.5px; font-weight: 600; color: #8f8d99; cursor: pointer;
    padding: 7px 12px; border-radius: 8px; transition: $transition-base;
    &--active { color: #0e0d0a; background: #34d399; }
    &:not(&--active):hover { color: #f2f1f5; }
  }

  &__cart-btn { position: relative; cursor: pointer; padding: 6px; margin-left: 6px; }

  &__cart-icon {
    width: 20px; height: 16px; border: 1.6px solid #f2f1f5; border-radius: 3px; position: relative;
    &::before {
      content: ''; position: absolute; top: -7px; left: 3px; width: 10px; height: 8px;
      border: 1.6px solid #f2f1f5; border-bottom: none; border-radius: 6px 6px 0 0;
    }
  }

  &__cart-badge {
    position: absolute; top: -4px; right: -6px; background: #34d399; color: #0e0d0a;
    font-size: 10px; font-weight: 700;
    width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  }

  &__main { flex: 1; overflow: auto; padding: 28px 32px; box-sizing: border-box; }

  &__hero { margin-bottom: 24px; }
  &__hero-eyebrow {
    font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.1em;
    color: #34d399; font-weight: 700; margin-bottom: 8px;
  }
  &__hero-title { font-size: 26px; font-weight: 700; color: #f2f1f5; margin-bottom: 6px; }
  &__hero-text { font-size: 14px; color: #8f8d99; }

  // --- Classic grid (All / Physical) ---
  &__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }

  &__book-card {
    cursor: pointer; background: #1c1c22; border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px; padding: 14px; transition: $transition-base;
    &:hover { transform: translateY(-4px); border-color: rgba(52, 211, 153, 0.3); }
  }

  &__book-cover {
    height: 150px; border-radius: 10px; margin-bottom: 12px; display: flex; align-items: flex-end;
    padding: 12px; box-sizing: border-box;
  }

  &__book-cover-title {
    color: rgba(255, 255, 255, 0.92); font-size: 13px; font-weight: 700; line-height: 1.3;
  }

  &__book-genre {
    font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em;
    color: #34d399; font-weight: 700; margin-bottom: 4px;
  }

  &__book-title { font-size: 15px; font-weight: 700; color: #f2f1f5; margin-bottom: 2px; }
  &__book-author { font-size: 12.5px; color: #8f8d99; margin-bottom: 10px; }
  &__book-footer { display: flex; align-items: center; justify-content: space-between; }
  &__book-tag {
    font-size: 10.5px; color: #8f8d99; padding: 3px 8px; border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
  }
  &__book-price { font-size: 13px; font-weight: 700; color: #34d399; margin-left: auto; }

  // --- Audiobooks: row list ---
  &__audio-list { display: flex; flex-direction: column; gap: 10px; }

  &__audio-row {
    display: flex; align-items: center; gap: 14px; padding: 12px 16px;
    background: #1c1c22; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px;
    cursor: pointer; transition: $transition-base;
    &:hover { border-color: rgba(52, 211, 153, 0.3); background: #202027; }
  }

  &__audio-cover { width: 44px; height: 44px; border-radius: 8px; flex-shrink: 0; }

  &__audio-play {
    width: 32px; height: 32px; border-radius: 50%; background: rgba(52, 211, 153, 0.14); color: #34d399;
    display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0;
  }

  &__audio-info { flex: 1; min-width: 0; }
  &__audio-title { font-size: 14px; font-weight: 700; color: #f2f1f5; margin-bottom: 2px; }
  &__audio-author { font-size: 12px; color: #8f8d99; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  &__audio-duration { font-size: 12.5px; color: #8f8d99; flex-shrink: 0; }
  &__audio-price { font-size: 13px; font-weight: 700; color: #34d399; flex-shrink: 0; width: 60px; text-align: right; }

  // --- E-books: dense grid ---
  &__ebook-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

  &__ebook-card {
    cursor: pointer; background: #1c1c22; border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 14px; padding: 12px; transition: $transition-base;
    &:hover { transform: translateY(-4px); border-color: rgba(52, 211, 153, 0.3); }
  }

  &__ebook-cover {
    height: 110px; border-radius: 8px; margin-bottom: 10px; display: flex; align-items: flex-end;
    padding: 8px; box-sizing: border-box;

    .fl__book-cover-title { font-size: 11px; }
  }

  &__ebook-badge {
    display: inline-block; font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
    color: #34d399; background: rgba(52, 211, 153, 0.12); padding: 2px 7px; border-radius: 999px; margin-bottom: 6px;
  }

  &__ebook-title { font-size: 13px; font-weight: 700; color: #f2f1f5; margin-bottom: 2px; line-height: 1.3; }
  &__ebook-author { font-size: 11px; color: #8f8d99; margin-bottom: 6px; }
  &__ebook-meta { font-size: 11px; color: #34d399; font-weight: 600; }

  // --- Detail / cart ---
  &__back {
    font-size: 13px; color: #34d399; font-weight: 600;
    cursor: pointer; margin-bottom: 20px;
  }

  &__detail { display: flex; gap: 32px; }

  &__detail-cover {
    width: 220px; height: 320px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: flex-end;
    padding: 18px; box-sizing: border-box; box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5);
  }

  &__detail-info { flex: 1; max-width: 480px; }
  &__detail-title { font-size: 26px; font-weight: 700; color: #f2f1f5; margin: 4px 0 4px; }
  &__detail-author { font-size: 14px; color: #8f8d99; margin-bottom: 14px; }
  &__detail-desc { font-size: 14px; line-height: 1.7; color: #c2c0ca; margin-bottom: 20px; }

  &__format-tabs {
    display: flex; gap: 6px; margin-bottom: 14px;
  }

  &__format-tab {
    padding: 8px 16px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 13px; font-weight: 600; color: #8f8d99; cursor: pointer; transition: $transition-base;

    &--active { background: #34d399; border-color: #34d399; color: #0e0d0a; }
  }

  &__format-panel {
    background: #1c1c22; border-radius: 12px; padding: 14px 16px; margin-bottom: 16px;
  }

  &__format-price { font-size: 20px; font-weight: 700; color: #f2f1f5; }
  &__format-extra { font-size: 12.5px; color: #8f8d99; margin-top: 4px; }

  &__add-btn {
    display: inline-block; background: #34d399; color: #0e0d0a;
    font-size: 14px; font-weight: 700; padding: 12px 22px; border-radius: 10px; cursor: pointer;
    transition: $transition-base;
    &:hover { transform: translateY(-2px); }
  }

  &__section-title { font-size: 22px; font-weight: 700; color: #f2f1f5; margin-bottom: 18px; }

  &__empty { font-size: 14px; color: #8f8d99; }

  &__cart-list { max-width: 480px; }

  &__cart-row {
    display: flex; align-items: center; gap: 10px; padding: 12px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-size: 13.5px;
  }

  &__cart-row-title { flex: 1; font-weight: 600; color: #f2f1f5; }
  &__cart-row-format { color: #8f8d99; }
  &__cart-row-price { font-weight: 700; color: #34d399; }

  &__cart-total {
    display: flex; justify-content: space-between; padding: 14px 0; font-weight: 700;
    font-size: 15px; color: #f2f1f5; margin-bottom: 16px;
  }
}
</style>
