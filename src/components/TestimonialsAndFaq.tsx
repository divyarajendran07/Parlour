import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/src/data/parlourData';

const FAQS = [
  {
    question: 'What is included in the initial trichology or skin consultation?',
    answer:
      'Every appointment includes 15 minutes of non-invasive diagnostic assessment. For hair and scalp treatments, we examine follicular micro-circulation and density. For skin rituals, we evaluate moisture barrier integrity and lipid balance to calibrate custom botanical actives.',
  },
  {
    question: 'Do you require patch testing for color, keratin, or lash lifts?',
    answer:
      'Yes. If you have not visited ÉLAN Atelier in the past 12 months or have known dermal sensitivities, we invite you for a 5-minute complimentary patch test at least 48 hours prior to chemical color or lifting rituals.',
  },
  {
    question: 'How far in advance should I reserve a bridal or occasion suite?',
    answer:
      'We recommend reserving wedding suites 3 to 6 months in advance, especially for weekend dates between May and October. A trial session is scheduled 4 to 6 weeks before your celebration to finalize hair transitions and airbrush palette notes.',
  },
  {
    question: 'What is your cancellation and rescheduling protocol?',
    answer:
      'Because each artisan commits dedicated private suite time, we request at least 24 hours notice for standard appointments and 72 hours for curated multi-service bridal suites. Rescheduling online or via concierge is complimentary within these windows.',
  },
  {
    question: 'Is valet parking and private arrival available?',
    answer:
      'Yes. Complimentary valet is available directly in front of 420 Boulevard Saint-Germain. For guests desiring discreet arrival or VIP acoustic privacy, our team coordinates direct elevator access to our 2nd-floor salon suite.',
  },
];

export const TestimonialsAndFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[#8C6239] font-medium">
            05. Guest Journal &amp; Verifications
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] tracking-tight font-normal">
            Refined Experiences, Shared by Our Guests
          </h2>
          <p className="text-sm sm:text-base text-[#68625A] font-light">
            Read verified feedback from patrons across editorial styling, restorative skin therapy,
            and wedding mornings.
          </p>
        </div>

        {/* Testimonials Grid (attributable, concrete outcomes per Section 1H) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.id}
              className="bg-[#F4EFEA] rounded-2xl p-7 border border-[#E5DFD4] flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center gap-1 text-[#8C6239] mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#8C6239]" />
                  ))}
                  <span className="text-[11px] text-[#7A746C] ml-2 font-mono tabular-nums">
                    5.0 Verified Guest
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#4A453F] leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E2D8]">
                <div className="font-medium text-xs text-[#1E1C1A]">{t.author}</div>
                <div className="text-[11px] text-[#7A746C]">{t.role}</div>
                <div className="text-[11px] text-[#8C6239] mt-1 font-medium">
                  Treatment: {t.treatment}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1C1A]">
              Frequently Addressed Inquiries
            </h3>
            <p className="text-xs sm:text-sm text-[#68625A]">
              Clear protocols regarding consultations, preparation, and suite etiquette.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#F4EFEA] rounded-xl border border-[#E5DFD4] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-medium text-xs sm:text-sm text-[#1E1C1A]">
                      {faq.question}
                    </span>
                    <span className="p-1 text-[#8C6239] shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#5A554E] leading-relaxed border-t border-[#EAE4DC] animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
