import React, { useState, useMemo } from 'react';
import { Search, Clock, ArrowRight, Check, Sparkles } from 'lucide-react';
import { SERVICES, ServiceItem } from '@/src/data/parlourData';

interface ServiceMenuProps {
  onSelectServiceToBook: (serviceId: string) => void;
  onOpenBooking: () => void;
}

type CategoryFilter = 'all' | 'hair' | 'skin' | 'bridal' | 'nails' | 'brows';

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All Rituals' },
  { id: 'hair', label: 'Hair Couture' },
  { id: 'skin', label: 'Cellular Skincare' },
  { id: 'bridal', label: 'Bridal Suite' },
  { id: 'nails', label: 'Nail Lounge' },
  { id: 'brows', label: 'Brow & Lash' },
];

export const ServiceMenu: React.FC<ServiceMenuProps> = ({
  onSelectServiceToBook,
  onOpenBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory =
        activeCategory === 'all' || service.category === activeCategory;
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.specialistNote.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="services" className="py-20 bg-[#F4EFEA] border-t border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-[#8C6239] font-medium">
              01. Bespoke Treatment Menu
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] tracking-tight font-normal">
              Curated Rituals for Hair, Dermal Health &amp; Form
            </h2>
            <p className="text-sm sm:text-base text-[#68625A] font-light">
              Each experience begins with an individual consultation and scalp or skin barrier
              diagnosis, using organic botanical formulas tailored to your physiological profile.
            </p>
          </div>

          {/* Quick search input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8C8479] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatments or goals..."
              className="w-full bg-[#FAF8F5] border border-[#DDD6CC] rounded-lg pl-10 pr-4 py-2.5 text-xs text-[#1E1C1A] placeholder-[#9C9488] focus:outline-none focus:ring-1 focus:ring-[#8C6239] focus:border-[#8C6239] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C8479] hover:text-[#1E1C1A]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs (Functional Segmented Buttons per Skill Rules) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1E1C1A] text-white shadow-sm'
                    : 'bg-[#EAE4DC] text-[#5A554E] hover:bg-[#DFD8CE] hover:text-[#1E1C1A]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-[#FAF8F5] rounded-2xl border border-[#DDD6CC] p-8">
            <p className="text-base text-[#5A554E] font-medium">
              No treatments found matching "{searchQuery}"
            </p>
            <p className="text-xs text-[#8C8479] mt-1 mb-4">
              Try exploring another category or clearing your search term.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 text-xs font-medium text-[#1E1C1A] bg-[#EAE4DC] rounded-lg hover:bg-[#DFD8CE]"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Services Grid (3-column desktop baseline) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="bg-[#FAF8F5] rounded-xl border border-[#E2DDD3] p-6 flex flex-col justify-between hover:border-[#C4B9A9] hover:shadow-md transition-all group"
            >
              <div>
                {/* Optional Flagship Image Thumbnail with resilient fallback */}
                {service.image && (
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-5 bg-[#EAE4DC]">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    {service.popular && (
                      <div className="absolute top-2.5 right-2.5 bg-[#FAF8F5]/90 backdrop-blur-sm text-[#8C6239] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded shadow-sm border border-[#E2DDD3]">
                        Guest Favorite
                      </div>
                    )}
                  </div>
                )}

                {/* Card Header: Title & Price */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-xl font-normal text-[#1E1C1A] leading-snug group-hover:text-[#8C6239] transition-colors">
                    {service.name}
                  </h3>
                  <span className="font-mono text-lg font-medium text-[#1E1C1A] tabular-nums shrink-0">
                    ${service.price}
                  </span>
                </div>

                {/* Clean unboxed metadata separator */}
                <div className="flex items-center gap-2 text-xs text-[#7A746C] mt-2 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#8C6239]" />
                    <span className="tabular-nums font-mono">{service.durationMinutes} min</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{service.category} Ritual</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#5A554E] leading-relaxed mb-4 font-light">
                  {service.description}
                </p>

                {/* Specialist Note */}
                <div className="text-[11px] text-[#7A746C] bg-[#F2ECE3] rounded-md px-3 py-2 border border-[#E5DFD4] mb-5">
                  <span className="font-medium text-[#4A453F]">Atelier Note: </span>
                  {service.specialistNote}
                </div>
              </div>

              {/* Card Footer: Action */}
              <div className="pt-2 border-t border-[#EAE4DC] flex items-center justify-between">
                <span className="text-[11px] text-[#8C8479]">Complimentary tea ritual included</span>
                <button
                  type="button"
                  onClick={() => onSelectServiceToBook(service.id)}
                  className="px-3.5 py-2 text-xs font-semibold tracking-wider uppercase text-[#1E1C1A] bg-[#E8E1D5] hover:bg-[#1E1C1A] hover:text-white rounded-md transition-all inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-[0.98]"
                >
                  <span>Reserve</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Custom Combo Bar */}
        <div className="mt-14 bg-[#FAF8F5] rounded-2xl border border-[#DDD6CC] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-wider text-[#8C6239] font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Multi-Treatment Concierge</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl text-[#1E1C1A]">
              Planning a full afternoon retreat or bridal party?
            </h4>
            <p className="text-xs sm:text-sm text-[#68625A] max-w-xl">
              Combine hair styling, clinical facial therapy, and couture nails into a personalized
              itinerary with reserved private suites and organic refreshments.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenBooking}
            className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#1E1C1A] hover:bg-[#34302C] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm"
          >
            Create Bespoke Itinerary
          </button>
        </div>
      </div>
    </section>
  );
};
