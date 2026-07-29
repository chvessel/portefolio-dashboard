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
const ratings = ref({});
const tbrIds = ref([]);

const books = [
  {
    id: 1, title: 'The Glass Orchard', author: 'Wren Castellan', genre: 'Fiction', color: '#2f6f4e',
    hook: 'Mara found the letter three days after the funeral — and wished she hadn’t.',
    progress: 42,
    formats: {
      physical: { price: '$18.99', pages: 324, shipping: 'Ships in 2–3 days' },
      audio: { price: '$14.99', duration: '8h 42m', narrator: 'Emma Cole' },
      ebook: { price: '$9.99', fileSize: '2.1 MB' },
    },
  },
  {
    id: 2, title: 'Northwind Ledger', author: 'Alistair Poe', genre: 'Mystery', color: '#7a3b2e',
    hook: 'Every account balanced except one: the day her business partner disappeared.',
    formats: {
      physical: { price: '$21.50', pages: 412, shipping: 'Ships in 2–3 days' },
      audio: { price: '$16.99', duration: '10h 05m', narrator: 'James Wolfe' },
      ebook: { price: '$11.49', fileSize: '2.6 MB' },
    },
  },
  {
    id: 3, title: 'Salt & Static', author: 'Mireille Dupont', genre: 'Sci-Fi', color: '#274b7a',
    hook: 'The signal from the wreck was seventeen years old. It was still transmitting.',
    formats: {
      physical: { price: '$19.99', pages: 288, shipping: 'Ships in 2–3 days' },
      audio: { price: '$15.49', duration: '7h 58m', narrator: 'Nadia Osei' },
      ebook: { price: '$10.49', fileSize: '1.9 MB' },
    },
  },
  {
    id: 4, title: 'The Quiet Ledger', author: 'Hana Voss', genre: 'Memoir', color: '#8a6d1f',
    hook: 'I kept every receipt from the year I disappeared. Here’s why.',
    formats: {
      physical: { price: '$17.50', pages: 256, shipping: 'Ships in 2–3 days' },
      audio: { price: '$13.99', duration: '6h 20m', narrator: 'the author' },
      ebook: { price: '$8.99', fileSize: '1.7 MB' },
    },
  },
  {
    id: 5, title: 'Cartography of Rain', author: 'Diego Marin', genre: 'Poetry', color: '#5a2f6b',
    hook: 'A map of every city she left, and the one she never did.',
    formats: {
      physical: { price: '$14.99', pages: 128, shipping: 'Ships in 2–3 days' },
      audio: { price: '$10.99', duration: '2h 40m', narrator: 'the author' },
      ebook: { price: '$6.99', fileSize: '0.9 MB' },
    },
  },
  {
    id: 6, title: 'The Long Ferment', author: 'Odessa Kane', genre: 'Non-fiction', color: '#7a4b1e',
    hook: 'What a 200-year-old vineyard taught one journalist about starting over.',
    formats: {
      physical: { price: '$23.99', pages: 368, shipping: 'Ships in 2–3 days' },
      audio: { price: '$18.49', duration: '11h 12m', narrator: 'Priya Nair' },
      ebook: { price: '$12.99', fileSize: '2.9 MB' },
    },
  },
  {
    id: 7, title: 'Underglass', author: 'Petra Lindqvist', genre: 'Fiction', color: '#1f6f6a',
    hook: 'The greenhouse had been sealed for a decade. Something inside was still growing.',
    formats: {
      physical: { price: '$20.50', pages: 296, shipping: 'Ships in 2–3 days' },
      audio: { price: '$15.99', duration: '8h 10m', narrator: 'Claire Dunmore' },
      ebook: { price: '$10.99', fileSize: '2.0 MB' },
    },
  },
  {
    id: 8, title: 'The Drift Protocol', author: 'Kaito Reyes', genre: 'Sci-Fi', color: '#3a2f7a',
    hook: 'The AI didn’t malfunction. It made a choice.',
    formats: {
      physical: { price: '$22.99', pages: 344, shipping: 'Ships in 2–3 days' },
      audio: { price: '$17.49', duration: '9h 36m', narrator: 'Marcus Bell' },
      ebook: { price: '$11.99', fileSize: '2.4 MB' },
    },
  },
  {
    id: 9, title: 'Nine Doors on Vesper Street', author: 'Rosalind Ferro', genre: 'Mystery', color: '#6b2f3a',
    hook: 'Every tenant on the fourth floor swears the ninth door doesn’t exist.',
    formats: {
      physical: { price: '$18.50', pages: 302, shipping: 'Ships in 2–3 days' },
      audio: { price: '$14.49', duration: '7h 20m', narrator: 'Sophie Laurent' },
      ebook: { price: '$9.49', fileSize: '1.8 MB' },
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

const currentlyReading = computed(() => books.find((b) => b.progress));

const similarBooks = computed(() => {
  if (!selectedBook.value) return [];
  return books
    .filter((b) => b.genre === selectedBook.value.genre && b.id !== selectedBook.value.id)
    .slice(0, 3);
});

const formatExtra = computed(() => {
  if (!selectedBook.value) return '';
  const f = selectedBook.value.formats[selectedFormat.value];
  if (selectedFormat.value === 'physical') return `${f.shipping} · ${f.pages} pages`;
  if (selectedFormat.value === 'audio') return `${f.duration} · Narrated by ${f.narrator}`;
  return `Instant download · ${f.fileSize}`;
});

const spineHeights = [232, 208, 246, 200, 220, 238, 214, 244, 206];

function coverStyle(book) {
  const c = book.color;
  const patterns = {
    Fiction: `radial-gradient(circle at 25% 15%, rgba(255,255,255,0.22), transparent 55%)`,
    Mystery: `radial-gradient(circle at 50% 105%, transparent 30%, rgba(0,0,0,0.6) 100%)`,
    'Sci-Fi': `radial-gradient(1.5px 1.5px at 18% 24%, #fff 100%, transparent 100%), radial-gradient(1.5px 1.5px at 72% 58%, #fff 100%, transparent 100%), radial-gradient(1px 1px at 42% 78%, #fff 100%, transparent 100%), radial-gradient(1px 1px at 85% 18%, #fff 100%, transparent 100%), radial-gradient(1px 1px at 60% 12%, #fff 100%, transparent 100%)`,
    Memoir: `repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 13px)`,
    Poetry: `repeating-linear-gradient(115deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 26px)`,
    'Non-fiction': `linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)`,
  };
  return {
    backgroundColor: c,
    backgroundImage: patterns[book.genre] || 'none',
    backgroundSize: book.genre === 'Non-fiction' ? '22px 22px' : '',
  };
}

function browseCategory(category) {
  activeCategory.value = category;
  activeScreen.value = 'browse';
}

function openBook(book) {
  selectedBookId.value = book.id;
  selectedFormat.value = ['physical', 'audio', 'ebook'].includes(activeCategory.value) ? activeCategory.value : 'physical';
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

function setRating(bookId, value) {
  ratings.value = { ...ratings.value, [bookId]: value };
}

function isTbr(bookId) {
  return tbrIds.value.includes(bookId);
}

function toggleTbr(bookId) {
  tbrIds.value = isTbr(bookId) ? tbrIds.value.filter((id) => id !== bookId) : [...tbrIds.value, bookId];
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

            <div v-if="currentlyReading" class="fl__continue" @click="openBook(currentlyReading)">
              <div class="fl__continue-cover" :style="coverStyle(currentlyReading)"></div>
              <div class="fl__continue-info">
                <div class="fl__continue-label">Currently reading</div>
                <div class="fl__continue-title">{{ currentlyReading.title }}</div>
                <div class="fl__continue-bar"><div class="fl__continue-fill" :style="{ width: currentlyReading.progress + '%' }"></div></div>
                <div class="fl__continue-pct">{{ currentlyReading.progress }}% done</div>
              </div>
              <div class="fl__continue-btn">Continue</div>
            </div>

            <!-- Audiobooks: row/list layout with narrator + duration + play affordance -->
            <div v-if="activeCategory === 'audio'" class="fl__audio-list">
              <div v-for="book in books" :key="book.id" class="fl__audio-row" @click="openBook(book)">
                <div class="fl__audio-cover" :style="coverStyle(book)"></div>
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
                <div class="fl__ebook-cover" :style="coverStyle(book)">
                  <div class="fl__book-cover-title fl__book-cover-title--sm">{{ book.title }}</div>
                </div>
                <div class="fl__ebook-badge">Instant download</div>
                <div class="fl__ebook-title">{{ book.title }}</div>
                <div class="fl__ebook-author">{{ book.author }}</div>
                <div class="fl__ebook-meta">{{ book.formats.ebook.fileSize }} · {{ book.formats.ebook.price }}</div>
              </div>
            </div>

            <!-- Physical: bookshelf layout -->
            <div v-else-if="activeCategory === 'physical'" class="fl__shelf">
              <div class="fl__shelf-row">
                <div
                  v-for="(book, i) in books"
                  :key="book.id"
                  class="fl__spine"
                  :style="{ ...coverStyle(book), height: spineHeights[i % spineHeights.length] + 'px' }"
                  @click="openBook(book)"
                >
                  <span v-if="isTbr(book.id)" class="fl__spine-tbr">🔖</span>
                  <span class="fl__spine-title">{{ book.title }}</span>
                </div>
              </div>
              <div class="fl__shelf-ledge"></div>
            </div>

            <!-- All: classic cover grid -->
            <div v-else class="fl__grid">
              <div v-for="book in books" :key="book.id" class="fl__book-card" @click="openBook(book)">
                <div class="fl__book-cover" :style="coverStyle(book)">
                  <span v-if="isTbr(book.id)" class="fl__book-tbr">🔖</span>
                  <div class="fl__book-cover-title">{{ book.title }}</div>
                </div>
                <div class="fl__book-genre">{{ book.genre }}</div>
                <div class="fl__book-title">{{ book.title }}</div>
                <div class="fl__book-author">{{ book.author }}</div>
                <div class="fl__book-footer">
                  <span class="fl__book-price">{{ book.formats[cardFormatKey].price }}</span>
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="activeScreen === 'detail' && selectedBook">
            <div class="fl__back" @click="activeScreen = 'browse'">← Back to browsing</div>

            <div class="fl__detail">
              <div class="fl__detail-cover" :style="coverStyle(selectedBook)">
                <div class="fl__book-cover-title">{{ selectedBook.title }}</div>
              </div>

              <div class="fl__detail-info">
                <div class="fl__book-genre">{{ selectedBook.genre }}</div>
                <h2 class="fl__detail-title">{{ selectedBook.title }}</h2>
                <div class="fl__detail-author">by {{ selectedBook.author }}</div>

                <div v-if="selectedBook.progress" class="fl__detail-progress">
                  <div class="fl__continue-bar"><div class="fl__continue-fill" :style="{ width: selectedBook.progress + '%' }"></div></div>
                  <div class="fl__continue-pct">{{ selectedBook.progress }}% done — currently reading</div>
                </div>

                <p class="fl__detail-desc">{{ selectedBook.hook }}</p>

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

                <div class="fl__actions-row">
                  <div class="fl__add-btn" @click="addToCart">Add to cart — {{ selectedBook.formats[selectedFormat].price }}</div>
                  <div class="fl__tbr-btn" :class="{ 'fl__tbr-btn--active': isTbr(selectedBook.id) }" @click="toggleTbr(selectedBook.id)">
                    {{ isTbr(selectedBook.id) ? '✓ On your TBR' : '+ Add to TBR' }}
                  </div>
                </div>

                <div class="fl__rating">
                  <span class="fl__rating-label">Your rating</span>
                  <span class="fl__rating-icons">
                    <svg
                      v-for="n in 6" :key="n"
                      class="fl__rating-icon" viewBox="0 0 20 24" width="17" height="20"
                      @click="setRating(selectedBook.id, n)"
                    >
                      <rect x="2" y="2" width="16" height="20" rx="2" :fill="(ratings[selectedBook.id] || 0) >= n ? '#34d399' : 'none'" stroke="#34d399" stroke-width="1.6" />
                      <line x1="7" y1="2" x2="7" y2="22" stroke="#34d399" stroke-width="1" opacity="0.5" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div v-if="similarBooks.length" class="fl__similar">
              <div class="fl__similar-title">You might also like</div>
              <div class="fl__similar-grid">
                <div v-for="book in similarBooks" :key="book.id" class="fl__similar-card" @click="openBook(book)">
                  <div class="fl__similar-cover" :style="coverStyle(book)"></div>
                  <div class="fl__similar-info">
                    <div class="fl__similar-book-title">{{ book.title }}</div>
                    <div class="fl__similar-book-author">{{ book.author }}</div>
                  </div>
                </div>
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
  background: linear-gradient(160deg, #050505 0%, #1c1c1c 100%);
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

  &__hero { margin-bottom: 20px; }
  &__hero-eyebrow {
    font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.1em;
    color: #34d399; font-weight: 700; margin-bottom: 8px;
  }
  &__hero-title { font-size: 26px; font-weight: 700; color: #f2f1f5; margin-bottom: 6px; }
  &__hero-text { font-size: 14px; color: #8f8d99; }

  // --- Currently reading banner ---
  &__continue {
    display: flex; align-items: center; gap: 16px; padding: 14px 18px; margin-bottom: 24px;
    background: #1c1c22; border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 14px;
    cursor: pointer; transition: $transition-base;
    &:hover { border-color: rgba(52, 211, 153, 0.5); }
  }
  &__continue-cover { width: 44px; height: 60px; border-radius: 6px; flex-shrink: 0; }
  &__continue-info { flex: 1; min-width: 0; }
  &__continue-label { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em; color: #34d399; font-weight: 700; margin-bottom: 4px; }
  &__continue-title { font-size: 14px; font-weight: 700; color: #f2f1f5; margin-bottom: 8px; }
  &__continue-bar { height: 5px; border-radius: 3px; background: rgba(255, 255, 255, 0.08); overflow: hidden; max-width: 280px; }
  &__continue-fill { height: 100%; background: #34d399; }
  &__continue-pct { font-size: 11.5px; color: #8f8d99; margin-top: 6px; }
  &__continue-btn {
    flex-shrink: 0; background: #34d399; color: #0e0d0a; font-size: 13px; font-weight: 700;
    padding: 9px 18px; border-radius: 8px;
  }

  // --- Classic grid (All) ---
  &__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }

  &__book-card {
    cursor: pointer; background: #1c1c22; border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px; padding: 14px; transition: $transition-base;
    &:hover { transform: translateY(-4px); border-color: rgba(52, 211, 153, 0.3); }
  }

  &__book-cover {
    position: relative; height: 150px; border-radius: 10px; margin-bottom: 12px; display: flex; align-items: flex-end;
    padding: 12px; box-sizing: border-box;
  }

  &__book-tbr { position: absolute; top: 8px; right: 8px; font-size: 14px; }

  &__book-cover-title {
    color: rgba(255, 255, 255, 0.92); font-size: 13px; font-weight: 700; line-height: 1.3;

    &--sm { font-size: 11px; }
  }

  &__book-genre {
    font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.08em;
    color: #34d399; font-weight: 700; margin-bottom: 4px;
  }

  &__book-title { font-size: 15px; font-weight: 700; color: #f2f1f5; margin-bottom: 2px; }
  &__book-author { font-size: 12.5px; color: #8f8d99; margin-bottom: 10px; }
  &__book-footer { display: flex; align-items: center; }
  &__book-price { font-size: 13px; font-weight: 700; color: #34d399; margin-left: auto; }

  // --- Bookshelf (Physical) ---
  &__shelf { padding-top: 10px; }
  &__shelf-row {
    display: flex; align-items: flex-end; justify-content: center; gap: 8px;
    padding: 0 12px 0; flex-wrap: wrap;
  }
  &__spine {
    position: relative; width: 62px; border-radius: 5px 5px 2px 2px; cursor: pointer;
    display: flex; align-items: flex-end; justify-content: center; padding-bottom: 16px;
    box-shadow: inset -8px 0 14px rgba(0, 0, 0, 0.28), 0 8px 14px rgba(0, 0, 0, 0.4);
    transition: $transition-base;
    &:hover { transform: translateY(-10px); }
  }
  &__spine-title {
    writing-mode: vertical-rl; transform: rotate(180deg);
    font-size: 11.5px; font-weight: 700; color: rgba(255, 255, 255, 0.94);
    letter-spacing: 0.02em; white-space: nowrap; max-height: calc(100% - 16px);
    overflow: hidden; text-overflow: ellipsis;
  }
  &__spine-tbr { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); font-size: 13px; }
  &__shelf-ledge {
    height: 18px; margin: 0 4px; border-radius: 0 0 8px 8px;
    background: linear-gradient(180deg, #2a1f14, #17110a);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.45);
  }

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
  &__ebook-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

  &__ebook-card {
    cursor: pointer; background: #1c1c22; border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 14px; padding: 12px; transition: $transition-base;
    &:hover { transform: translateY(-4px); border-color: rgba(52, 211, 153, 0.3); }
  }

  &__ebook-cover {
    height: 110px; border-radius: 8px; margin-bottom: 10px; display: flex; align-items: flex-end;
    padding: 8px; box-sizing: border-box;
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

  &__detail { display: flex; gap: 36px; align-items: flex-start; margin-bottom: 40px; }

  &__detail-cover {
    width: 220px; height: 320px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: flex-end;
    padding: 18px; box-sizing: border-box; box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5);
  }

  &__detail-info { flex: 1; max-width: 600px; }
  &__detail-title { font-size: 26px; font-weight: 700; color: #f2f1f5; margin: 4px 0 4px; }
  &__detail-author { font-size: 14px; color: #8f8d99; margin-bottom: 16px; }

  &__detail-progress { margin-bottom: 16px; }

  &__detail-desc {
    font-size: 17px; line-height: 1.85; color: #d6d4dd; margin-bottom: 26px;
    max-width: 560px; font-weight: 500;
  }

  &__format-tabs {
    display: flex; gap: 6px; margin-bottom: 14px;
  }

  &__format-tab {
    padding: 8px 16px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 13px; font-weight: 600; color: #8f8d99; cursor: pointer; transition: $transition-base;

    &--active { background: #34d399; border-color: #34d399; color: #0e0d0a; }
  }

  &__format-panel {
    background: #1c1c22; border-radius: 12px; padding: 14px 16px; margin-bottom: 18px;
  }

  &__format-price { font-size: 20px; font-weight: 700; color: #f2f1f5; }
  &__format-extra { font-size: 12.5px; color: #8f8d99; margin-top: 4px; }

  &__actions-row { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }

  &__add-btn {
    display: inline-block; background: #34d399; color: #0e0d0a;
    font-size: 14px; font-weight: 700; padding: 12px 22px; border-radius: 10px; cursor: pointer;
    transition: $transition-base;
    &:hover { transform: translateY(-2px); }
  }

  &__tbr-btn {
    display: inline-block; padding: 12px 20px; border-radius: 10px; cursor: pointer;
    font-size: 14px; font-weight: 700; border: 1px solid rgba(255, 255, 255, 0.14); color: #d6d4dd;
    transition: $transition-base;
    &--active { border-color: #34d399; color: #34d399; }
  }

  &__rating { display: flex; align-items: center; gap: 12px; }
  &__rating-label { font-size: 12.5px; color: #8f8d99; }
  &__rating-icons { display: flex; gap: 4px; }
  &__rating-icon { cursor: pointer; }

  &__similar { border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 24px; }
  &__similar-title { font-size: 16px; font-weight: 700; color: #f2f1f5; margin-bottom: 16px; }
  &__similar-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 700px; }
  &__similar-card {
    display: flex; align-items: center; gap: 12px; cursor: pointer; padding: 10px;
    border-radius: 12px; transition: $transition-base;
    &:hover { background: #1c1c22; }
  }
  &__similar-cover { width: 40px; height: 56px; border-radius: 6px; flex-shrink: 0; }
  &__similar-info { min-width: 0; }
  &__similar-book-title {
    font-size: 12.5px; font-weight: 700; color: #f2f1f5; overflow: hidden; text-overflow: ellipsis;
    white-space: nowrap; margin-bottom: 2px;
  }
  &__similar-book-author { font-size: 11px; color: #8f8d99; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

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
