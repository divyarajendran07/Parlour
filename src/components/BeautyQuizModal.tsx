import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { SERVICES, ServiceItem } from '@/src/data/parlourData';

interface BeautyQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectServiceToBook: (serviceId: string) => void;
}

export const BeautyQuizModal: React.FC<BeautyQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectServiceToBook,
}) => {
  const [step, setStep] = useState(1);
  const [focus, setFocus] = useState<string>('');
  const [condition, setCondition] = useState<string>('');
  const [pace, setPace] = useState<string>('');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setFocus('');
    setCondition('');
    setPace('');
  };

  const getRecommendation = (): ServiceItem => {
    if (focus === 'hair') {
      if (condition === 'frizz' || condition === 'damage') {
        return SERVICES.find((s) => s.id === 'hair-keratin-silk') || SERVICES[0];
      }
      return SERVICES.find((s) => s.id === 'hair-balayage') || SERVICES[0];
    }
    if (focus === 'skin') {
      if (pace === 'luxury') {
        return SERVICES.find((s) => s.id === 'skin-24k-lift') || SERVICES[4];
      }
      return SERVICES.find((s) => s.id === 'skin-hydra-cellular') || SERVICES[4];
    }
    if (focus === 'bridal') {
      return SERVICES.find((s) => s.id === 'bridal-couture-suite') || SERVICES[7];
    }
    if (focus === 'nails-brows') {
      if (condition === 'brows') {
        return SERVICES.find((s) => s.id === 'brows-lash-lift') || SERVICES[12];
      }
      return SERVICES.find((s) => s.id === 'nails-japanese-gel') || SERVICES[10];
    }
    return SERVICES[0];
  };

  const recommendedService = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-2xl border border-[#DDD6CC] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E8E2D8] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8C6239] font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Aesthetic Consultation Finder</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#7A746C] hover:text-[#1E1C1A] hover:bg-[#F2ECE3] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-wider text-[#7A746C] font-mono">
                Step 1 of 3
              </div>
              <h3 className="font-serif text-2xl text-[#1E1C1A]">
                Where is your primary aesthetic focus today?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'hair', title: 'Hair Couture & Colour', desc: 'Balayage, lived-in cuts, keratin' },
                  { id: 'skin', title: 'Cellular Skin Health', desc: 'Hydrafacial, lifting, dermal peels' },
                  { id: 'bridal', title: 'Bridal & Occasion', desc: 'Full wedding day hair & makeup' },
                  { id: 'nails-brows', title: 'Nails & Brow Design', desc: 'Japanese gel, lash lift, shaping' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setFocus(item.id);
                      setStep(2);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      focus === item.id
                        ? 'bg-[#F2ECE3] border-[#8C6239]'
                        : 'bg-[#F4EFEA] border-[#E5DFD4] hover:border-[#C4B9A9]'
                    }`}
                  >
                    <div className="text-sm font-medium text-[#1E1C1A]">{item.title}</div>
                    <div className="text-xs text-[#7A746C] mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-wider text-[#7A746C] font-mono">
                Step 2 of 3
              </div>
              <h3 className="font-serif text-2xl text-[#1E1C1A]">
                What specific outcome or concern matters most?
              </h3>
              <div className="space-y-2.5 pt-2">
                {[
                  { id: 'glow', title: 'Deep Hydration & Radiant Skin Plumping', desc: 'Eradicate dullness and smooth texture' },
                  { id: 'color', title: 'Sunlit Lived-In Dimension', desc: 'Soft grow-out with customized peptide toning' },
                  { id: 'frizz', title: 'Zero Frizz & Smooth Molecular Strength', desc: 'Restores elasticity with bio-protein seal' },
                  { id: 'brows', title: 'Lifted Eyes & Clean Architectural Framing', desc: 'Effortless morning routine without makeup' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setCondition(item.id);
                      setStep(3);
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      condition === item.id
                        ? 'bg-[#F2ECE3] border-[#8C6239]'
                        : 'bg-[#F4EFEA] border-[#E5DFD4] hover:border-[#C4B9A9]'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium text-[#1E1C1A]">{item.title}</div>
                      <div className="text-xs text-[#7A746C] mt-0.5">{item.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8C6239] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-wider text-[#7A746C] font-mono">
                Step 3 of 3
              </div>
              <h3 className="font-serif text-2xl text-[#1E1C1A]">
                What session pace aligns with your schedule?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'express', title: 'Efficient Precision', desc: '45 – 75 minutes of concentrated impact' },
                  { id: 'luxury', title: 'Indulgent Retreat', desc: '90 – 180 minutes including private suite relaxation' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setPace(item.id);
                      setStep(4);
                    }}
                    className="p-4 rounded-xl border bg-[#F4EFEA] border-[#E5DFD4] hover:border-[#8C6239] text-left transition-all cursor-pointer"
                  >
                    <div className="text-sm font-medium text-[#1E1C1A]">{item.title}</div>
                    <div className="text-xs text-[#7A746C] mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="text-center space-y-1">
                <div className="text-xs uppercase tracking-wider text-[#8C6239] font-medium">
                  Your Bespoke Recommendation
                </div>
                <h3 className="font-serif text-2xl text-[#1E1C1A]">
                  {recommendedService.name}
                </h3>
              </div>

              <div className="bg-[#F2ECE3] rounded-xl p-5 border border-[#E0D7C9] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#7A746C]">
                  <span className="font-mono tabular-nums">{recommendedService.durationMinutes} Minutes</span>
                  <span className="font-mono text-base font-semibold text-[#1E1C1A] tabular-nums">
                    ${recommendedService.price}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#4A453F] leading-relaxed">
                  {recommendedService.description}
                </p>
                <div className="text-[11px] text-[#7A746C] pt-2 border-t border-[#E5DFD4]">
                  <span className="font-semibold text-[#8C6239]">Diagnostic Match: </span>
                  Aligned with your desire for {condition || 'targeted radiance'} and tailored botanical formulation.
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3.5 py-3 text-xs text-[#5A554E] hover:text-[#1E1C1A] bg-[#FAF8F5] border border-[#DDD6CC] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectServiceToBook(recommendedService.id);
                  }}
                  className="flex-1 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#1E1C1A] hover:bg-[#34302C] rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Reserve This Recommended Ritual</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
