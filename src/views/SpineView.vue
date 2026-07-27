<script setup>
import { ref, computed } from 'vue';
import BrowserWindow from '@/components/browser/BrowserWindow.vue';
import ProjectPageHero from '@/components/project/ProjectPageHero.vue';

const activeScreen = ref('browse');
const selectedBookId = ref(null);
const selectedFormat = ref('physical');
const cart = ref([]);

const books = [
  {
    id: 1, title: 'The Glass Orchard', author: 'Wren Castellan', genre: 'Fiction', color: '#2f6f4e',
    formats: {
      physical: { price: '$18.99', extra: 'Ships in 2–3 days · 324 pages' },
      audio: { price: '$14.99', extra: '8h 42m · Narrated by Emma Cole' },
      ebook: { price: '$9.99', extra: 'Instant download · 2.1 MB' },
    },
  },
  {
    id: 2, title: 'Northwind Ledger', author: 'Alistair Poe', genre: 'Mystery', color: '#7a3b2e',
    formats: {
      physical: { price: '$21.50', extra: 'Ships in 2–3 days · 412 pages' },
      audio: { price: '$16.99', extra: '10h 05m · Narrated by James Wolfe' },
      ebook: { price: '$11.49', extra: 'Instant download · 2.6 MB' },
    },
  },
  {
    id: 3, title: 'Salt & Static', author: 'Mireille Dupont', genre: 'Sci-Fi', color: '#274b7a',
    formats: {
      physical: { price: '$19.99', extra: 'Ships in 2–3 days · 288 pages' },
      audio: { price: '$15.49', extra: '7h 58m · Narrated by Nadia Osei' },
      ebook: { price: '$10.49', extra: 'Instant download · 1.9 MB' },
    },
  },
  {
    id: 4, title: 'The Quiet Ledger', author: 'Hana Voss', genre: 'Memoir', color: '#8a6d1f',
    formats: {
      physical: { price: '$17.50', extra: 'Ships in 2–3 days · 256 pages' },
      audio: { price: '$13.99', extra: '6h 20m · Narrated by the author' },
      ebook: { price: '$8.99', extra: 'Instant download · 1.7 MB' },
    },
  },
  {
    id: 5, title: 'Cartography of Rain', author: 'Diego Marin', genre: 'Poetry', color: '#5a2f6b',
    formats: {
      physical: { price: '$14.99', extra: 'Ships in 2–3 days · 128 pages' },
      audio: { price: '$10.99', extra: '2h 40m · Narrated by the author' },
      ebook: { price: '$6.99', extra: 'Instant download · 0.9 MB' },
    },
  },
  {
    id: 6, title: 'The Long Ferment', author: 'Odessa Kane', genre: 'Non-fiction', color: '#7a4b1e',
    formats: {
      physical: { price: '$23.99', extra: 'Ships in 2–3 days · 368 pages' },
      audio: { price: '$18.49', extra: '11h 12m · Narrated by Priya Nair' },
      ebook: { price: '$12.99', extra: 'Instant download · 2.9 MB' },
    },
  },
];

const selectedBook = computed(() => books.find((b) => b.id === selectedBookId.value));
const cartCount = computed(() => cart.value.length);
const cartTotal = computed(() =>
  cart.value.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0).toFixed(2),
);

function openBook(book) {
  selectedBookId.value = book.id;
  selectedFormat.value = 'physical';
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

const formatLabels = { physical: 'Physical', audio: 'Audiobook', ebook: 'E-book' };
</script>

<template>
  <ProjectPageHero
    eyebrow="Featured Project"
    title="Spine — Book Store (Print, Audio &amp; E-books)"
    description="An online bookstore where customers can browse and buy physical books, audiobooks, and e-books from a single shelf, with format-specific previews and checkout flows for each type."
    :tags="['Nuxt.js', 'Vue3.js', 'SCSS', 'REST API']"
    accent="#2f6f4e"
    bg="#0c1410"
  >
    <BrowserWindow :width="1180" :height="800" url="spine.shop" tab-title="Spine">
      <div class="fl">
        <header class="fl__topbar">
          <div class="fl__brand" @click="activeScreen = 'browse'">
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
            <div class="fl__top-link" :class="{ 'fl__top-link--active': activeScreen === 'browse' }" @click="activeScreen = 'browse'">Browse</div>
            <div class="fl__cart-btn" @click="activeScreen = 'cart'">
              <div class="fl__cart-icon"></div>
              <span v-if="cartCount" class="fl__cart-badge">{{ cartCount }}</span>
            </div>
          </nav>
        </header>

        <main class="fl__main">
          <template v-if="activeScreen === 'browse'">
            <div class="fl__hero">
              <div class="fl__hero-eyebrow">New this week</div>
              <div class="fl__hero-title">Stories for every format you love</div>
              <div class="fl__hero-text">Print, audio, or e-book — pick the way you read.</div>
            </div>

            <div class="fl__grid">
              <div v-for="book in books" :key="book.id" class="fl__book-card" @click="openBook(book)">
                <div class="fl__book-cover" :style="{ background: book.color }">
                  <div class="fl__book-cover-title">{{ book.title }}</div>
                </div>
                <div class="fl__book-genre">{{ book.genre }}</div>
                <div class="fl__book-title">{{ book.title }}</div>
                <div class="fl__book-author">{{ book.author }}</div>
                <div class="fl__book-price">{{ book.formats.physical.price }}</div>
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
                  <div class="fl__format-extra">{{ selectedBook.formats[selectedFormat].extra }}</div>
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
    </BrowserWindow>
  </ProjectPageHero>
</template>

<style lang="scss" scoped>
.fl {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #faf6ef;
  font-family: 'Georgia', 'Iowan Old Style', serif;
  overflow: hidden;
  color: #2b2620;

  &__topbar {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 16px 28px;
    border-bottom: 1px solid rgba(47, 111, 78, 0.15);
    background: #fffdf8;
    flex-shrink: 0;
  }

  &__brand { display: flex; align-items: center; gap: 10px; cursor: pointer; }

  &__brand-mark {
    width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(47, 111, 78, 0.12);
    color: #2f6f4e;

    svg { width: 18px; height: 18px; }
  }

  &__brand-name { font-size: 19px; font-weight: 700; color: #22321f; }

  &__search {
    flex: 1; max-width: 360px; display: flex; align-items: center; gap: 8px;
    background: #f1ece0; border: 1px solid rgba(47, 111, 78, 0.15); border-radius: 999px;
    padding: 8px 16px; color: #7a7263; font-size: 13px; font-family: system-ui, sans-serif;
  }

  &__search-icon { width: 13px; height: 13px; border: 1.6px solid #7a7263; border-radius: 50%; flex-shrink: 0; }

  &__top-nav { margin-left: auto; display: flex; align-items: center; gap: 20px; }

  &__top-link {
    font-family: system-ui, sans-serif; font-size: 13.5px; font-weight: 600; color: #5c5647; cursor: pointer;
    &--active { color: #2f6f4e; }
  }

  &__cart-btn { position: relative; cursor: pointer; padding: 6px; }

  &__cart-icon {
    width: 20px; height: 16px; border: 1.6px solid #2b2620; border-radius: 3px; position: relative;
    &::before {
      content: ''; position: absolute; top: -7px; left: 3px; width: 10px; height: 8px;
      border: 1.6px solid #2b2620; border-bottom: none; border-radius: 6px 6px 0 0;
    }
  }

  &__cart-badge {
    position: absolute; top: -4px; right: -6px; background: #2f6f4e; color: #fff;
    font-family: system-ui, sans-serif; font-size: 10px; font-weight: 700;
    width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
  }

  &__main { flex: 1; overflow: auto; padding: 28px 32px; box-sizing: border-box; }

  &__hero { margin-bottom: 24px; }
  &__hero-eyebrow {
    font-family: system-ui, sans-serif; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.1em;
    color: #6fae86; font-weight: 700; margin-bottom: 8px;
  }
  &__hero-title { font-size: 26px; font-weight: 700; color: #22321f; margin-bottom: 6px; }
  &__hero-text { font-size: 14px; color: #7a7263; font-family: system-ui, sans-serif; }

  &__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

  &__book-card { cursor: pointer; }

  &__book-cover {
    height: 150px; border-radius: 8px; margin-bottom: 10px; display: flex; align-items: flex-end;
    padding: 12px; box-sizing: border-box; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  &__book-cover-title {
    color: rgba(255, 255, 255, 0.92); font-size: 13px; font-weight: 700; line-height: 1.3;
  }

  &__book-genre {
    font-family: system-ui, sans-serif; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em;
    color: #6fae86; font-weight: 700; margin-bottom: 4px;
  }

  &__book-title { font-size: 15px; font-weight: 700; color: #22321f; margin-bottom: 2px; }
  &__book-author { font-size: 12.5px; color: #7a7263; margin-bottom: 6px; }
  &__book-price { font-family: system-ui, sans-serif; font-size: 13px; font-weight: 700; color: #2f6f4e; }

  &__back {
    font-family: system-ui, sans-serif; font-size: 13px; color: #6fae86; font-weight: 600;
    cursor: pointer; margin-bottom: 20px;
  }

  &__detail { display: flex; gap: 32px; }

  &__detail-cover {
    width: 220px; height: 320px; border-radius: 10px; flex-shrink: 0; display: flex; align-items: flex-end;
    padding: 18px; box-sizing: border-box; box-shadow: 0 16px 32px rgba(0, 0, 0, 0.18);
  }

  &__detail-info { flex: 1; max-width: 480px; }
  &__detail-title { font-size: 26px; font-weight: 700; color: #22321f; margin: 4px 0 4px; }
  &__detail-author { font-size: 14px; color: #7a7263; margin-bottom: 14px; }
  &__detail-desc { font-size: 14px; line-height: 1.7; color: #4a4436; margin-bottom: 20px; }

  &__format-tabs {
    display: flex; gap: 6px; margin-bottom: 14px; font-family: system-ui, sans-serif;
  }

  &__format-tab {
    padding: 8px 16px; border-radius: 999px; border: 1px solid rgba(47, 111, 78, 0.25);
    font-size: 13px; font-weight: 600; color: #5c5647; cursor: pointer;

    &--active { background: #2f6f4e; border-color: #2f6f4e; color: #fff; }
  }

  &__format-panel {
    background: #f1ece0; border-radius: 10px; padding: 14px 16px; margin-bottom: 16px;
    font-family: system-ui, sans-serif;
  }

  &__format-price { font-size: 20px; font-weight: 700; color: #22321f; }
  &__format-extra { font-size: 12.5px; color: #7a7263; margin-top: 4px; }

  &__add-btn {
    display: inline-block; background: #2f6f4e; color: #fff; font-family: system-ui, sans-serif;
    font-size: 14px; font-weight: 700; padding: 12px 22px; border-radius: 8px; cursor: pointer;
  }

  &__section-title { font-size: 22px; font-weight: 700; color: #22321f; margin-bottom: 18px; }

  &__empty { font-family: system-ui, sans-serif; font-size: 14px; color: #7a7263; }

  &__cart-list { max-width: 480px; font-family: system-ui, sans-serif; }

  &__cart-row {
    display: flex; align-items: center; gap: 10px; padding: 12px 0;
    border-bottom: 1px solid rgba(47, 111, 78, 0.12); font-size: 13.5px;
  }

  &__cart-row-title { flex: 1; font-weight: 600; color: #22321f; }
  &__cart-row-format { color: #7a7263; }
  &__cart-row-price { font-weight: 700; color: #2f6f4e; }

  &__cart-total {
    display: flex; justify-content: space-between; padding: 14px 0; font-weight: 700;
    font-size: 15px; color: #22321f; margin-bottom: 16px;
  }
}
</style>
