import React, { useState } from 'react';
import { Calendar, Clock, Menu, X, Sparkles } from 'lucide-react';
import { BookingRecord } from '@/src/data/parlourData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenMyBookings: () => void;
  onOpenQuiz: () => void;
  bookings: BookingRecord[];
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenMyBookings,
  onOpenQuiz,
  bookings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeBookingsCount = bookings.filter((b) => b.status === 'Confirmed').length;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand title, single element wordmark */}
        <a
          href="#"
          className="font-serif text-2xl md:text-3xl font-normal tracking-wide text-[#1E1C1A] hover:opacity-90 transition-opacity"
        >
          ÉLAN <span className="text-xs uppercase tracking-[0.25em] font-sans font-medium text-[#8C6239] ml-1.5 align-middle">Atelier</span>
        </a>

        {/* Zone 2: 4-6 nav links, 1-2 word labels, single line */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium uppercase tracking-[0.16em] text-[#5A554E]">
          <a
            href="#services"
            className="hover:text-[#1E1C1A] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#8C6239] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Services
          </a>
          <a
            href="#bridal"
            className="hover:text-[#1E1C1A] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#8C6239] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Bridal Suite
          </a>
          <a
            href="#transformations"
            className="hover:text-[#1E1C1A] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#8C6239] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Lookbook
          </a>
          <a
            href="#specialists"
            className="hover:text-[#1E1C1A] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#8C6239] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Artisans
          </a>
          <button
            type="button"
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 text-[#8C6239] hover:text-[#6F4E2C] transition-colors py-1 cursor-pointer font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ritual Finder</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMyBookings}
            className="relative px-3.5 py-2 text-xs font-medium tracking-wide text-[#3E3A35] hover:text-[#1E1C1A] hover:bg-[#F2ECE3] transition-colors rounded-lg border border-[#DDD6CC] flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            aria-label="View current appointments"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">My Bookings</span>
            {activeBookingsCount > 0 && (
              <span className="ml-1 w-4 h-4 rounded-full bg-[#8C6239] text-white text-[10px] flex items-center justify-center font-mono">
                {activeBookingsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs font-medium tracking-wider uppercase text-white bg-[#1E1C1A] rounded-lg hover:bg-[#34302C] active:scale-[0.98] transition-all whitespace-nowrap shadow-sm cursor-pointer"
          >
            Book Appointment
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A453F] hover:text-[#1E1C1A] hover:bg-[#F2ECE3] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E2D8] bg-[#FAF8F5] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-150">
          <div className="flex flex-col space-y-3 text-sm font-medium tracking-wide text-[#4A453F]">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#1E1C1A]"
            >
              Services Menu
            </a>
            <a
              href="#bridal"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#1E1C1A]"
            >
              Bridal &amp; Occasion Suite
            </a>
            <a
              href="#transformations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#1E1C1A]"
            >
              Lookbook &amp; Transformations
            </a>
            <a
              href="#specialists"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#1E1C1A]"
            >
              Master Specialists
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="text-left py-1 text-[#8C6239] font-medium flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Aesthetic Consultation Quiz</span>
            </button>
          </div>
          <div className="pt-3 border-t border-[#E8E2D8] flex items-center justify-between text-xs text-[#7A746C]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8C6239]" /> Open Today · 09:00 — 20:00
            </span>
            <span>Paris 7e</span>
          </div>
        </div>
      )}
    </header>
  );
};
