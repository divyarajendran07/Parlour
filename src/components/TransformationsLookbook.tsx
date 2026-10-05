import React, { useState } from 'react';
import { ArrowLeftRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { PARLOUR_IMAGES } from '@/src/data/parlourData';

interface TransformationCase {
  id: string;
  title: string;
  client: string;
  specialist: string;
  treatment: string;
  timeTaken: string;
  narrative: string;
  beforeLabel: string;
  afterLabel: string;
  results: string[];
  image: string;
}

const CASES: TransformationCase[] = [
  {
    id: 'case-balayage',
    title: 'Lived-In Caramel Balayage & Glaze',
    client: 'Genevieve D.',
    specialist: 'Hélène Vance',
    treatment: 'Bespoke Balayage & Gloss Ritual',
    timeTaken: '2.5 Hours',
    narrative: 'Transitioned from a harsh demarcation line and oxidized brass into a seamless, sunlit dimensional dimension tailored to natural root growth.',
    beforeLabel: 'Initial Condition: Flat, brassy undertones with over-processed ends',
    afterLabel: 'Result: Seamless micro-weave dimension with peptide gloss finish',
    results: ['Zero bleach compromise', 'Seamless 4-month grow-out', 'Mirror gloss sheen'],
    image: PARLOUR_IMAGES.hair,
  },
  {
    id: 'case-skin',
    title: 'Cellular Hydrafacial Barrier Awakening',
    client: 'Sophia C.',
    specialist: 'Dr. Camille Laurent',
    treatment: 'Cellular Luminous Hydrafacial',
    timeTaken: '75 Minutes',
    narrative: 'Restored compromised skin barrier following seasonal winter desiccation, utilizing vortex botanical hydration and microcurrent facial sculpting.',
    beforeLabel: 'Initial Condition: Superficial dehydration lines and redness',
    afterLabel: 'Result: Plump, light-reflective surface with firm jawline contour',
    results: ['+62% measured hydration', 'Calmed follicular redness', 'Zero downtime'],
    image: PARLOUR_IMAGES.facial,
  },
  {
    id: 'case-bridal',
    title: 'Architectural Bridal Chignon & Soft Glam',
    client: 'Claire W.',
    specialist: 'Priya Sen',
    treatment: 'Haute Bridal Hair & Airbrush Complexion',
    timeTaken: '3 Hours',
    narrative: 'Crafted an airy, structured textured chignon built to withstand a full 14-hour wedding ceremony alongside sweat-resistant airbrush skin.',
    beforeLabel: 'Initial Condition: Fine straight texture requiring anchor security',
    afterLabel: 'Result: Featherweight architectural silhouette with micro-veil pins',
    results: ['14-hour weather stability', 'High-definition photo ready', 'Natural silk lashes'],
    image: PARLOUR_IMAGES.bridal,
  },
];

export const TransformationsLookbook: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage

  const currentCase = CASES[activeCaseIndex];

  return (
    <section id="transformations" className="py-20 bg-[#F4EFEA] border-t border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[#8C6239] font-medium">
            03. Transformation Lookbook
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] tracking-tight font-normal">
            Real Craftsmanship &amp; Measurable Radiance
          </h2>
          <p className="text-sm sm:text-base text-[#68625A] font-light">
            Every appointment is treated as an individualized art commission. Explore the architectural
            discipline behind our guest results.
          </p>
        </div>

        {/* Story Selector Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {CASES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveCaseIndex(index);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeCaseIndex === index
                  ? 'bg-[#1E1C1A] text-white shadow-sm'
                  : 'bg-[#EAE4DC] text-[#5A554E] hover:bg-[#DFD8CE]'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#FAF8F5] rounded-2xl border border-[#DDD6CC] p-6 sm:p-10 shadow-sm">
          {/* Interactive Visual Slider */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-inner border border-[#E2DDD3] select-none bg-[#EAE4DC]">
              <img
                src={currentCase.image}
                alt={currentCase.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Split Overlay using clip-path */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={currentCase.image}
                  alt="Transformation perspective"
                  className="w-full h-full object-cover filter brightness-105 contrast-105 saturate-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#1E1C1A]/80 backdrop-blur-xs text-white text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded">
                  Finished Radiance
                </div>
              </div>

              {/* Unsplit tag on the right */}
              <div className="absolute top-4 right-4 bg-[#1E1C1A]/60 backdrop-blur-xs text-white text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded pointer-events-none">
                Consultation Baseline
              </div>

              {/* Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-[#C4B9A9] flex items-center justify-center text-[#1E1C1A]">
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Slider Input overlay */}
              <input
                type="range"
                min="5"
                max="95"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                aria-label="Drag to compare before and after transformation"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#7A746C] px-1">
              <span>← Slide to inspect finish details</span>
              <span className="font-mono tabular-nums">{sliderPosition}% view ratio</span>
            </div>
          </div>

          {/* Narrative & Concrete Outcomes */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8C6239] font-medium tracking-wide">
                <span>Guest: {currentCase.client}</span>
                <span aria-hidden="true">·</span>
                <span>Artisan: {currentCase.specialist}</span>
                <span aria-hidden="true">·</span>
                <span>Session: {currentCase.timeTaken}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1C1A] mt-2 mb-3">
                {currentCase.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5A554E] leading-relaxed font-light">
                {currentCase.narrative}
              </p>
            </div>

            {/* Condition & Approach details */}
            <div className="space-y-3 bg-[#F4EFEA] p-4 rounded-xl border border-[#E5DFD4] text-xs">
              <div>
                <div className="font-medium text-[#7A746C] uppercase tracking-wider text-[10px]">
                  Baseline Assessment
                </div>
                <div className="text-[#3E3A35] mt-0.5">{currentCase.beforeLabel}</div>
              </div>
              <div className="pt-2 border-t border-[#E8E2D8]">
                <div className="font-medium text-[#8C6239] uppercase tracking-wider text-[10px]">
                  Completed Ritual Outcome
                </div>
                <div className="text-[#1E1C1A] mt-0.5">{currentCase.afterLabel}</div>
              </div>
            </div>

            {/* Quantified Outcomes */}
            <div>
              <div className="text-xs uppercase tracking-wider text-[#7A746C] font-semibold mb-2.5">
                Key Protocol Deliverables
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A453F]">
                {currentCase.results.map((res, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8C6239] shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
