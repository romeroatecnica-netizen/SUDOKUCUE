import { ChevronDown, ExternalLink, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import type { TranslationBundle } from '../i18n/types';

interface EditorialSeoSectionProps {
  t: TranslationBundle;
}

const AFFILIATE_URLS = [
  'https://www.amazon.com/s?k=hard+sudoku+puzzle+book+large+print',
  'https://www.amazon.com/s?k=logic+deduction+board+games+friends',
  'https://www.amazon.com/s?k=0.5mm+drafting+mechanical+pencil+set',
  'https://www.amazon.com/s?k=digital+chess+timer+tabletop+countdown',
];

export function EditorialSeoSection({ t }: EditorialSeoSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="no-print w-full max-w-6xl mx-auto px-4 sm:px-6 space-y-12 py-6">
      {/* Editorial Competitive Sudoku & Challenge Guide */}
      <section id="duel-guide" className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
            {t.editorial.guideTitle}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">{t.editorial.guideLead}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.editorial.articles.map((article, idx) => (
            <article
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-3"
            >
              <h3 className="font-display text-lg font-bold text-slate-900">{article.title}</h3>
              {article.body.map((para, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                  {para}
                </p>
              ))}
            </article>
          ))}
        </div>

        {/* Transparent Client-Side Privacy Notice */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-slate-700 leading-relaxed">
            {t.editorial.transparencyNotice}
          </p>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section id="faq" className="space-y-4">
        <h2 className="font-display text-2xl font-bold text-slate-900">{t.editorial.faqTitle}</h2>
        <div className="bg-white border border-[#E2E8F0] rounded-xl divide-y divide-slate-200">
          {t.editorial.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-start hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="font-display text-sm sm:text-base font-semibold text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-150 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{faq.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contextual Affiliate Gear Block */}
      <section aria-labelledby="gear-heading" className="space-y-4">
        <div className="space-y-1">
          <h2 id="gear-heading" className="font-display text-xl font-bold text-slate-900">
            {t.editorial.gearTitle}
          </h2>
          <p className="text-sm text-slate-600">{t.editorial.gearSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.editorial.gearItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="text-xs font-medium text-slate-500">{item.category}</div>
                <h3 className="font-display text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>

              <a
                href={AFFILIATE_URLS[idx] ?? AFFILIATE_URLS[0]}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E40AF] hover:underline whitespace-nowrap"
              >
                <span>{item.cta}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
