import React from 'react';
import { ArrowRight, Sparkles, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { PARLOUR_IMAGES } from '@/src/data/parlourData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenQuiz }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Left copy, Right imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Copy Block */}
          <div className="lg:col-span-6 space-y-6">
            {/* Clean unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C6239] font-medium">
              <span>Maison de Beauté</span>
              <span aria-hidden="true">·</span>
              <span>Boulevard Saint-Germain</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2014</span>
            </div>

            {/* Headline with balanced wrapping */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1E1C1A] leading-[1.08] tracking-tight font-normal text-balance">
              Artisanal Hair Couture &amp; Cellular Radiance
            </h1>

            {/* Subtitle with measure limits */}
            <p className="text-base sm:text-lg text-[#5A554E] leading-relaxed max-w-xl font-light">
              An architectural beauty sanctuary dedicated to lived-in color, Japanese scalp rituals,
              clinical cellular facials, and high-fashion bridal styling. Formulated exclusively with
              bio-fermented, cruelty-free botanicals.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1E1C1A] rounded-lg hover:bg-[#38332E] active:scale-[0.98] transition-all inline-flex items-center gap-2 group cursor-pointer shadow-md"
              >
                <span>Reserve Appointment</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onOpenQuiz}
                className="px-5 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#3E3A35] bg-[#F2ECE3] hover:bg-[#EAE2D7] rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer border border-[#DDD6CC]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8C6239]" />
                <span>Consultation Quiz</span>
              </button>
            </div>

            {/* Claim-to-Proof Adjacency: Clean unboxed trust markers */}
            <div className="pt-6 border-t border-[#E8E2D8] grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="font-serif text-2xl lg:text-3xl text-[#1E1C1A] font-medium tabular-nums">
                  14k+
                </div>
                <div className="text-xs text-[#7A746C] tracking-wide mt-0.5">
                  Client Transformations
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl lg:text-3xl text-[#1E1C1A] font-medium tabular-nums">
                  100%
                </div>
                <div className="text-xs text-[#7A746C] tracking-wide mt-0.5">
                  Clean &amp; Cruelty-Free
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl lg:text-3xl text-[#1E1C1A] font-medium tabular-nums">
                  4.98
                </div>
                <div className="text-xs text-[#7A746C] tracking-wide mt-0.5">
                  Editorial Client Rating
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Anchor: 16:9 or 4:3 high-fidelity image asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[16/11] shadow-xl border border-[#E8E2D8] bg-[#EFE9DF]">
              <img
                src={PARLOUR_IMAGES.hero}
                alt="Élan Atelier luxury salon interior with fluted wood stations and warm travertine arches"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              {/* Subtle ambient gradient overlay for elegance */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

              {/* In-image quiet caption anchor */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/95 text-xs backdrop-blur-md bg-black/35 px-4 py-2.5 rounded-lg border border-white/15">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E5D7C5]" />
                  <span className="font-medium tracking-wide">Boulevard Saint-Germain, Suite 2</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/80">
                  <Clock className="w-3.5 h-3.5 text-[#E5D7C5]" />
                  <span>Open today until 20:00</span>
                </div>
              </div>
            </div>

            {/* Floating verification card (anti-slop: clean, non-clashing, single elevation) */}
            <div className="absolute -bottom-5 -left-4 sm:left-6 bg-[#FAF8F5] border border-[#DDD6CC] rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 max-w-xs">
              <div className="w-9 h-9 rounded-lg bg-[#F0E8DC] text-[#8C6239] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-medium text-[#1E1C1A]">Vidal Sassoon &amp; Paris Board Certified</div>
                <div className="text-[#7A746C] text-[11px]">Private acoustic treatment suites</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
