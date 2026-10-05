import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Check, Send } from 'lucide-react';
import { SALON_INFO } from '@/src/data/parlourData';

export const VisitingAndFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1E1C1A] text-[#FAF8F5] pt-16 pb-12 border-t border-[#34302C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Salon Visit Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#34302C]">
          {/* Brand & Ethos */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-serif text-2xl tracking-wide text-white">
              ÉLAN <span className="text-xs uppercase tracking-[0.25em] font-sans font-medium text-[#C49B71] ml-1.5 align-middle">Atelier</span>
            </div>
            <p className="text-xs text-[#A8A196] leading-relaxed max-w-sm font-light">
              An intimate Paris parlour where trichological precision, restorative cellular facials,
              and couture bridal craftsmanship unite in quiet architectural luxury.
            </p>
            <div className="text-xs text-[#C49B71] pt-2">
              All rituals formulated with bio-organic cruelty-free botanicals.
            </div>
          </div>

          {/* Location & Contact */}
          <div className="lg:col-span-4 space-y-3 text-xs text-[#D8D2C7]">
            <div className="uppercase tracking-[0.2em] text-[#C49B71] font-semibold text-[11px] mb-2">
              Salon Location &amp; Concierge
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C49B71] shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-white">{SALON_INFO.address}</div>
                <div className="text-[#A8A196]">{SALON_INFO.district}</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 pt-1">
              <Phone className="w-4 h-4 text-[#C49B71] shrink-0" />
              <span>{SALON_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#C49B71] shrink-0" />
              <span>{SALON_INFO.email}</span>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="lg:col-span-4 space-y-3">
            <div className="uppercase tracking-[0.2em] text-[#C49B71] font-semibold text-[11px] mb-2 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Visiting Hours</span>
            </div>
            <div className="space-y-2 text-xs">
              {SALON_INFO.hours.map((h, i) => (
                <div key={i} className="flex items-center justify-between text-[#D8D2C7] pb-1 border-b border-[#2C2926]">
                  <span className="text-[#A8A196]">{h.days}</span>
                  <span className="font-mono tabular-nums text-white font-medium">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Private Gazette Newsletter Subscription */}
        <div className="py-10 border-b border-[#34302C] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-serif text-lg text-white">The Atelier Gazette</div>
            <p className="text-xs text-[#A8A196]">
              Seasonal hair trends, clinical skincare insights, and private event suite invitations.
            </p>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-2 text-xs text-[#C49B71] bg-[#2C2926] px-4 py-2.5 rounded-lg border border-[#3E3A35]">
              <Check className="w-4 h-4" />
              <span>You have been subscribed to our private guest dispatches.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="bg-[#2A2724] border border-[#443F3A] rounded-lg px-4 py-2.5 text-xs text-white placeholder-[#8C8479] focus:outline-none focus:border-[#C49B71] w-full md:w-64"
              />
              <button
                type="submit"
                className="px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#1E1C1A] bg-[#C49B71] hover:bg-[#D6AD84] rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <span>Join</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          )}
        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C8479]">
          <div>
            © {new Date().getFullYear()} ÉLAN Atelier de Beauté. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#services" className="hover:text-white transition-colors">
              Treatments
            </a>
            <a href="#bridal" className="hover:text-white transition-colors">
              Bridal Suite
            </a>
            <a href="#transformations" className="hover:text-white transition-colors">
              Lookbook
            </a>
            <a href="#specialists" className="hover:text-white transition-colors">
              Artisans
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
