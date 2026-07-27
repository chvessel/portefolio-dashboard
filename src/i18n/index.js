import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import da from './locales/da.json';

const STORAGE_KEY = 'preferred-locale';

function detectDefaultLocale() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'da') return stored;
  return navigator.language?.toLowerCase().startsWith('da') ? 'da' : 'en';
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: detectDefaultLocale(),
  fallbackLocale: 'en',
  messages: { en, da },
});

export function setLocale(locale) {
  i18n.global.locale.value = locale;
  localStorage.setItem(STORAGE_KEY, locale);
  document.documentElement.setAttribute('lang', locale);
}

setLocale(i18n.global.locale.value);

export default i18n;
