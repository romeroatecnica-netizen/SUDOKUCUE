import { SUPPORTED_LANGS, type LangCode, type TranslationBundle } from '../i18n/types';

export const CANONICAL_ORIGIN = 'https://sudokucue.bastelar.com';

export function getCanonicalUrl(lang: LangCode): string {
  return lang === 'en' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}/?lang=${lang}`;
}

function setMetaTag(selector: string, attrName: 'name' | 'property', attrVal: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrVal);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLinkTag(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function applySeoMetadata(lang: LangCode, t: TranslationBundle) {
  if (typeof document === 'undefined') return;

  const localeMeta = SUPPORTED_LANGS.find((l) => l.code === lang) ?? SUPPORTED_LANGS[0];
  const canonicalUrl = getCanonicalUrl(lang);

  document.documentElement.lang = localeMeta.code;
  document.documentElement.dir = localeMeta.dir;
  document.title = t.seo.title;

  setMetaTag('meta[name="description"]', 'name', 'description', t.seo.description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', t.seo.title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', t.seo.description);
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', t.seo.title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', t.seo.description);

  // Strict single canonical pointing exclusively to CANONICAL_ORIGIN
  setLinkTag('canonical', canonicalUrl);
  setLinkTag('alternate', `${CANONICAL_ORIGIN}/`, 'x-default');
  for (const item of SUPPORTED_LANGS) {
    setLinkTag('alternate', getCanonicalUrl(item.code), item.code);
  }

  // Dynamic JSON-LD (WebApplication + HowTo + FAQPage)
  const jsonLdPayload = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'SudokuCue — Competitive Sudoku Challenge & WhatsApp Duel Game',
        url: canonicalUrl,
        inLanguage: localeMeta.code,
        applicationCategory: 'GameApplication',
        genre: 'Logic Puzzle, Sudoku',
        operatingSystem: 'All',
        description: t.seo.description,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'HowTo',
        name: t.seo.howToName,
        step: t.seo.howToSteps.map((step) => ({
          '@type': 'HowToStep',
          name: step.name,
          text: step.text,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: t.editorial.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  };

  let scriptEl = document.getElementById('sudokucue-jsonld') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'sudokucue-jsonld';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(jsonLdPayload);
}
