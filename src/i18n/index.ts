import { ar } from './locales/ar';
import { de } from './locales/de';
import { en } from './locales/en';
import { es } from './locales/es';
import { fr } from './locales/fr';
import { hi } from './locales/hi';
import { ja } from './locales/ja';
import { pt } from './locales/pt';
import { ru } from './locales/ru';
import { zh } from './locales/zh';
import { SUPPORTED_LANGS, type LangCode, type TranslationBundle } from './types';

const TRANSLATIONS: Record<LangCode, TranslationBundle> = {
  en,
  es,
  fr,
  de,
  pt,
  ar,
  hi,
  ru,
  zh,
  ja,
};

export function isSupportedLang(code: string | null | undefined): code is LangCode {
  if (!code) return false;
  return SUPPORTED_LANGS.some((l) => l.code === code);
}

export function getTranslations(lang: LangCode): TranslationBundle {
  return TRANSLATIONS[lang] ?? TRANSLATIONS.en;
}

export function detectInitialLang(storedLang?: LangCode, challengeLang?: LangCode): LangCode {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang')?.toLowerCase();
    if (isSupportedLang(urlLang)) {
      return urlLang;
    }
  }

  if (storedLang && isSupportedLang(storedLang)) {
    return storedLang;
  }

  if (typeof navigator !== 'undefined') {
    const candidates = navigator.languages && navigator.languages.length > 0 ? navigator.languages : [navigator.language];
    for (const raw of candidates) {
      if (!raw) continue;
      const base = raw.toLowerCase().split('-')[0];
      if (isSupportedLang(base)) {
        return base;
      }
    }
  }

  if (challengeLang && isSupportedLang(challengeLang)) {
    return challengeLang;
  }

  return 'en';
}

export function formatMessage(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}
