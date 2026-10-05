import React from 'react';
import { ArrowRight, Award } from 'lucide-react';
import { SPECIALISTS, Specialist } from '@/src/data/parlourData';

interface SpecialistsSectionProps {
  onBookWithSpecialist: (specialistId: string) => void;
}

export const SpecialistsSection: React.FC<SpecialistsSectionProps> = ({
  onBookWithSpecialist,
}) => {
  return (
    <section id="specialists" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-[#8C6239] font-medium">
              04. Master Artisans &amp; Clinicians
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] tracking-tight font-normal">
              Direct Direction from Recognized Industry Educators
            </h2>
            <p className="text-sm sm:text-base text-[#68625A] font-light">
              Our team consists of European-trained trichologists, editorial colorists, and certified
              medical estheticians dedicated to individualized care without rushed assembly lines.
            </p>
          </div>
          <div className="text-xs text-[#7A746C] flex items-center gap-1.5 shrink-0">
            <Award className="w-4 h-4 text-[#8C6239]" />
            <span>Continuous International Masterclasses</span>
          </div>
        </div>

        {/* Specialists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIALISTS.map((specialist) => (
            <div
              key={specialist.id}
              className="bg-[#F4EFEA] rounded-2xl border border-[#E5DFD4] p-6 flex flex-col justify-between hover:border-[#C4B9A9] hover:shadow-md transition-all group"
            >
              <div>
                {/* Monogram Badge & Experience */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#E8DFD3] border border-[#DDD5C7] flex items-center justify-center font-serif text-lg font-medium text-[#1E1C1A]">
                    {specialist.initials}
                  </div>
                  <div className="text-[11px] text-[#8C6239] font-medium tracking-wide uppercase">
                    {specialist.experience}
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="font-serif text-xl text-[#1E1C1A] group-hover:text-[#8C6239] transition-colors">
                  {specialist.name}
                </h3>
                <div className="text-xs text-[#7A746C] mt-1 mb-3">
                  {specialist.role}
                </div>

                {/* Bio */}
                <p className="text-xs text-[#5A554E] leading-relaxed mb-4 font-light">
                  {specialist.bio}
                </p>

                {/* Specialties (clean unboxed text per Section 1A) */}
                <div className="pt-3 border-t border-[#EAE4DC] mb-5">
                  <div className="text-[10px] uppercase tracking-wider text-[#8C8479] font-semibold mb-1.5">
                    Core Specializations
                  </div>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-[#4A453F]">
                    {specialist.specialties.map((item, index) => (
                      <span key={index} className="inline-flex items-center">
                        <span>{item}</span>
                        {index < specialist.specialties.length - 1 && (
                          <span className="text-[#A8A196] ml-2" aria-hidden="true">
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                type="button"
                onClick={() => onBookWithSpecialist(specialist.id)}
                className="w-full py-2.5 text-xs font-semibold tracking-wider uppercase text-[#1E1C1A] bg-[#FAF8F5] hover:bg-[#1E1C1A] hover:text-white border border-[#DDD5C7] rounded-lg transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
              >
                <span>Book With {specialist.name.split(' ')[0]}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
