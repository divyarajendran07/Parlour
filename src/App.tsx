/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/src/components/Navbar';
import { Hero } from '@/src/components/Hero';
import { ServiceMenu } from '@/src/components/ServiceMenu';
import { BridalPackageBuilder } from '@/src/components/BridalPackageBuilder';
import { TransformationsLookbook } from '@/src/components/TransformationsLookbook';
import { SpecialistsSection } from '@/src/components/SpecialistsSection';
import { TestimonialsAndFaq } from '@/src/components/TestimonialsAndFaq';
import { VisitingAndFooter } from '@/src/components/VisitingAndFooter';
import { BookingModal } from '@/src/components/BookingModal';
import { MyBookingsDrawer } from '@/src/components/MyBookingsDrawer';
import { BeautyQuizModal } from '@/src/components/BeautyQuizModal';
import { BookingRecord } from '@/src/data/parlourData';

const LOCAL_STORAGE_KEY = 'elan_atelier_bookings';

export default function App() {
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [
      {
        id: 'initial-demo-1',
        bookingCode: 'ELAN-5284',
        serviceIds: ['hair-balayage'],
        serviceNames: ['Bespoke Balayage & Gloss Ritual'],
        totalPrice: 245,
        totalDuration: 150,
        specialistId: 'helene-vance',
        specialistName: 'Hélène Vance',
        date: '2026-10-12',
        timeSlot: '11:45',
        clientName: 'Genevieve Duprès',
        clientEmail: 'genevieve@example.com',
        clientPhone: '+33 6 12 34 56 78',
        notes: 'Complimentary herbal tea request',
        createdAt: new Date().toISOString(),
        status: 'Confirmed',
      },
    ];
  });

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMyBookingsDrawerOpen, setIsMyBookingsDrawerOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  const [preselectedSpecialistId, setPreselectedSpecialistId] = useState<string | null>(null);
  const [preselectedServiceIds, setPreselectedServiceIds] = useState<string[] | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookings));
    } catch {
      // Storage unavailable
    }
  }, [bookings]);

  const handleOpenGeneralBooking = () => {
    setPreselectedServiceId(null);
    setPreselectedSpecialistId(null);
    setPreselectedServiceIds(null);
    setIsBookingModalOpen(true);
  };

  const handleBookService = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedSpecialistId(null);
    setPreselectedServiceIds([serviceId]);
    setIsBookingModalOpen(true);
  };

  const handleBookWithSpecialist = (specialistId: string) => {
    setPreselectedServiceId(null);
    setPreselectedSpecialistId(specialistId);
    setPreselectedServiceIds(null);
    setIsBookingModalOpen(true);
  };

  const handleBookCustomPackage = (serviceIds: string[]) => {
    setPreselectedServiceId(null);
    setPreselectedSpecialistId(null);
    setPreselectedServiceIds(serviceIds);
    setIsBookingModalOpen(true);
  };

  const handleBookingComplete = (newBooking: BookingRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b))
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1C1A] selection:bg-[#E5D7C5] selection:text-[#1E1C1A] flex flex-col font-sans">
      {/* Top Bar Navigation (Strict 3-zone contract) */}
      <Navbar
        onOpenBooking={handleOpenGeneralBooking}
        onOpenMyBookings={() => setIsMyBookingsDrawerOpen(true)}
        onOpenQuiz={() => setIsQuizModalOpen(true)}
        bookings={bookings}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenGeneralBooking}
          onOpenQuiz={() => setIsQuizModalOpen(true)}
        />

        {/* 01. Bespoke Treatment Menu with Interactive Filters */}
        <ServiceMenu
          onSelectServiceToBook={handleBookService}
          onOpenBooking={handleOpenGeneralBooking}
        />

        {/* 02. Haute Bridal Sanctuary & Custom Suite Builder */}
        <BridalPackageBuilder onBookCustomPackage={handleBookCustomPackage} />

        {/* 03. Transformation Lookbook & Interactive Comparison Slider */}
        <TransformationsLookbook />

        {/* 04. Master Artisans & Clinicians */}
        <SpecialistsSection onBookWithSpecialist={handleBookWithSpecialist} />

        {/* 05. Guest Journal & Frequently Addressed Inquiries */}
        <TestimonialsAndFaq />
      </main>

      {/* Visiting Information & Quiet Footer */}
      <VisitingAndFooter />

      {/* Interactive Reservation Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedServiceId={preselectedServiceId}
        preselectedSpecialistId={preselectedSpecialistId}
        preselectedServiceIds={preselectedServiceIds}
        onBookingComplete={handleBookingComplete}
      />

      {/* Guest Appointments Slide-Over Drawer */}
      <MyBookingsDrawer
        isOpen={isMyBookingsDrawerOpen}
        onClose={() => setIsMyBookingsDrawerOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onOpenNewBooking={handleOpenGeneralBooking}
      />

      {/* Aesthetic Consultation Quiz Modal */}
      <BeautyQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onSelectServiceToBook={handleBookService}
      />
    </div>
  );
}
