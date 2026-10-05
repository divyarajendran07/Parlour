import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, Heart } from 'lucide-react';
import { PARLOUR_IMAGES } from '@/src/data/parlourData';

interface BridalPackageBuilderProps {
  onBookCustomPackage: (serviceIds: string[]) => void;
}

interface PackageOption {
  id: string;
  name: string;
  subtitle: string;
  durationMinutes: number;
  price: number;
  recommended: boolean;
}

const BRIDAL_OPTIONS: PackageOption[] = [
  {
    id: 'bridal-couture-suite',
    name: 'Haute Bridal Hair & Airbrush Complexion',
    subtitle: 'High-fashion bridal styling, veil setting, waterproof airbrush & silk lashes.',
    durationMinutes: 180,
    price: 360,
    recommended: true,
  },
  {
    id: 'skin-hydra-cellular',
    name: 'Pre-Wedding Cellular Hydrafacial Infusion',
    subtitle: 'Deep dermal hydration and barrier prep 48 hours prior for luminous glass skin.',
    durationMinutes: 75,
    price: 185,
    recommended: true,
  },
  {
    id: 'nails-japanese-gel',
    name: 'Japanese Couture Gel Manicure & Hand Care',
    subtitle: 'Zero-damage cuticle architecture with subtle pearlescent or French finish.',
    durationMinutes: 75,
    price: 85,
    recommended: false,
  },
  {
    id: 'brows-lash-lift',
    name: 'Keratin Lash Infusion & HD Brow Architecture',
    subtitle: 'Curled root lift and subtle tinting eliminating the need for heavy mascaras.',
    durationMinutes: 60,
    price: 110,
    recommended: false,
  },
  {
    id: 'bridal-bridesmaid-glow',
    name: 'Bridal Party & Maid of Honor Styling',
    subtitle: 'Coordinated modern chignon or relaxed wave with luminous soft glam makeup.',
    durationMinutes: 90,
    price: 160,
    recommended: false,
  },
];

export const BridalPackageBuilder: React.FC<BridalPackageBuilderProps> = ({
  onBookCustomPackage,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'bridal-couture-suite',
    'skin-hydra-cellular',
  ]);

  const toggleOption = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedOptions = BRIDAL_OPTIONS.filter((opt) => selectedIds.includes(opt.id));
  const totalPrice = selectedOptions.reduce((acc, curr) => acc + curr.price, 0);
  const totalMinutes = selectedOptions.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const handleBook = () => {
    if (selectedIds.length > 0) {
      onBookCustomPackage(selectedIds);
    }
  };

  return (
    <section id="bridal" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C6239] font-medium">
            <Heart className="w-3.5 h-3.5 fill-[#8C6239]/20" />
            <span>02. Haute Bridal Sanctuary</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] tracking-tight font-normal">
            Curate Your Bespoke Wedding Day Suite
          </h2>
          <p className="text-sm sm:text-base text-[#68625A] font-light">
            Designed for discerning brides who require seamless timelines, private acoustic lounges,
            and flawless camera longevity from morning vow prep to midnight dances.
          </p>
        </div>

        {/* 2-Column interactive builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Image & Experience Perks */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-[#E8E2D8] bg-[#EAE4DC]">
              <img
                src={PARLOUR_IMAGES.bridal}
                alt="Bridal styling preview at ÉLAN Atelier"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="font-serif text-lg">Priya Sen · Lead Bridal Art Director</div>
                <div className="text-xs text-white/80">
                  Featured in Vogue Weddings &amp; Harper's Bazaar Bride
                </div>
              </div>
            </div>

            {/* Suite Amenities */}
            <div className="bg-[#F4EFEA] rounded-xl p-5 border border-[#E5DFD4] space-y-3">
              <div className="text-xs uppercase tracking-wider text-[#8C6239] font-semibold">
                Every Bridal Suite Booking Includes:
              </div>
              <ul className="text-xs text-[#5A554E] space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#8C6239] shrink-0 mt-0.5" />
                  <span>Private VIP dressing chamber with full-length natural illumination mirrors</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#8C6239] shrink-0 mt-0.5" />
                  <span>Complimentary organic chilled botanical elixir &amp; fresh macarons</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#8C6239] shrink-0 mt-0.5" />
                  <span>Touch-up kit with matching lip pigment, blotting linens &amp; veil pins</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Selection & Live Calculator */}
          <div className="lg:col-span-7 bg-[#F4EFEA] rounded-2xl p-6 sm:p-8 border border-[#E5DFD4] shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#E0D9CE] mb-6">
              <h3 className="font-serif text-xl text-[#1E1C1A]">Select Your Suite Components</h3>
              <span className="text-xs text-[#7A746C] tabular-nums font-mono">
                {selectedIds.length} of {BRIDAL_OPTIONS.length} selected
              </span>
            </div>

            <div className="space-y-3.5 mb-8">
              {BRIDAL_OPTIONS.map((opt) => {
                const isChecked = selectedIds.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleOption(opt.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      isChecked
                        ? 'bg-[#FAF8F5] border-[#8C6239] shadow-xs'
                        : 'bg-[#EDE7DE] border-[#DDD5C7] hover:border-[#C4B9A9]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-[#8C6239] border-[#8C6239] text-white'
                            : 'border-[#A3998C] bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#1E1C1A] flex items-center gap-2">
                          <span>{opt.name}</span>
                          {opt.recommended && (
                            <span className="text-[10px] text-[#8C6239] font-semibold uppercase tracking-wider bg-[#F0E8DC] px-2 py-0.5 rounded">
                              Core Ritual
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#68625A] mt-1 font-light leading-relaxed">
                          {opt.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-mono text-sm font-semibold text-[#1E1C1A] tabular-nums">
                        ${opt.price}
                      </div>
                      <div className="text-[11px] text-[#8C8479] tabular-nums font-mono">
                        {opt.durationMinutes} min
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Summary Bar */}
            <div className="bg-[#FAF8F5] rounded-xl p-5 border border-[#E5DFD4] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE4DC]">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#7A746C]">
                    Estimated Itinerary Duration
                  </div>
                  <div className="font-mono text-base font-medium text-[#1E1C1A] mt-0.5 tabular-nums">
                    {hours > 0 ? `${hours} hrs ` : ''}
                    {minutes > 0 ? `${minutes} min` : ''}
                    {totalMinutes === 0 ? '0 min' : ''}
                  </div>
                </div>

                <div className="sm:text-right">
                  <div className="text-xs uppercase tracking-wider text-[#7A746C]">
                    Curated Suite Investment
                  </div>
                  <div className="font-mono text-2xl font-bold text-[#1E1C1A] mt-0.5 tabular-nums">
                    ${totalPrice}
                  </div>
                </div>
              </div>

              {selectedIds.length >= 2 && (
                <div className="flex items-center gap-2 text-xs text-[#8C6239] font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    Bespoke Suite Perk Unlocked: Complimentary Japanese Scalp Mist &amp; Champagne
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={handleBook}
                disabled={selectedIds.length === 0}
                className="w-full py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1E1C1A] hover:bg-[#34302C] disabled:bg-[#8C8479] disabled:cursor-not-allowed rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
              >
                <span>Book This Curated Bridal Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
