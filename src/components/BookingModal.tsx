import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Check, ArrowRight, ArrowLeft, Download, ShieldCheck } from 'lucide-react';
import { SERVICES, SPECIALISTS, BookingRecord, ServiceItem } from '@/src/data/parlourData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string | null;
  preselectedSpecialistId?: string | null;
  preselectedServiceIds?: string[] | null;
  onBookingComplete: (booking: BookingRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedSpecialistId,
  preselectedServiceIds,
  onBookingComplete,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  // Client Details Form
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Initialize dates for next 14 days
  const availableDates = React.useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
      const month = d.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = d.getDate();
      list.push({ iso, weekday, month, dayNum });
    }
    return list;
  }, []);

  const timeSlots = [
    { label: 'Morning', slots: ['09:30', '10:30', '11:45'] },
    { label: 'Afternoon', slots: ['13:00', '14:30', '15:45'] },
    { label: 'Evening', slots: ['17:00', '18:15', '19:30'] },
  ];

  // Sync initial preselection
  useEffect(() => {
    if (isOpen) {
      if (preselectedServiceIds && preselectedServiceIds.length > 0) {
        setSelectedServiceIds(preselectedServiceIds);
      } else if (preselectedServiceId) {
        setSelectedServiceIds([preselectedServiceId]);
      } else if (selectedServiceIds.length === 0) {
        setSelectedServiceIds([SERVICES[0].id]);
      }

      if (preselectedSpecialistId) {
        setSelectedSpecialistId(preselectedSpecialistId);
      }

      if (!selectedDate && availableDates.length > 0) {
        setSelectedDate(availableDates[0].iso);
      }
      if (!selectedTimeSlot) {
        setSelectedTimeSlot('11:45');
      }
    }
  }, [isOpen, preselectedServiceId, preselectedSpecialistId, preselectedServiceIds, availableDates]);

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectedServices = SERVICES.filter((s) => selectedServiceIds.includes(s.id));
  const totalPrice = selectedServices.reduce((acc, curr) => acc + curr.price, 0);
  const totalMinutes = selectedServices.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  const selectedSpecialist =
    selectedSpecialistId === 'any'
      ? { name: 'Any Available Master Specialist', role: 'First Available Artisan' }
      : SPECIALISTS.find((s) => s.id === selectedSpecialistId) || {
          name: 'Atelier Specialist',
          role: 'Master Stylist',
        };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!clientName.trim() || clientName.trim().length < 2) {
      errs.clientName = 'Full name is required (minimum 2 characters)';
    }
    if (!clientEmail.trim() || !clientEmail.includes('@') || !clientEmail.includes('.')) {
      errs.clientEmail = 'Please provide a valid email address';
    }
    const cleanPhone = clientPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      errs.clientPhone = 'Please provide a valid phone number (minimum 8 digits)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmBooking = () => {
    if (!validateForm()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `ELAN-${randomSuffix}`;

    const newBooking: BookingRecord = {
      id: `book-${Date.now()}`,
      bookingCode,
      serviceIds: selectedServiceIds,
      serviceNames: selectedServices.map((s) => s.name),
      totalPrice,
      totalDuration: totalMinutes,
      specialistId: selectedSpecialistId,
      specialistName: selectedSpecialist.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
    };

    setConfirmedBooking(newBooking);
    onBookingComplete(newBooking);
    setStep(5);
  };

  const downloadIcsCalendar = (booking: BookingRecord) => {
    const [year, month, day] = booking.date.split('-');
    const [hour, minute] = booking.timeSlot.split(':');

    const dtStart = `${year}${month}${day}T${hour}${minute}00`;
    // Add duration
    const endDateObj = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute) + booking.totalDuration
    );
    const endYear = endDateObj.getFullYear();
    const endMonth = String(endDateObj.getMonth() + 1).padStart(2, '0');
    const endDay = String(endDateObj.getDate()).padStart(2, '0');
    const endHour = String(endDateObj.getHours()).padStart(2, '0');
    const endMin = String(endDateObj.getMinutes()).padStart(2, '0');
    const dtEnd = `${endYear}${endMonth}${endDay}T${endHour}${endMin}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ELAN Atelier de Beaute//Appointment Reservation//EN',
      'BEGIN:VEVENT',
      `UID:${booking.bookingCode}@elan-atelier.com`,
      `DTSTAMP:${dtStart}Z`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:ÉLAN Atelier: ${booking.serviceNames[0]} & Rituals`,
      `DESCRIPTION:Appointment confirmation #${booking.bookingCode} for ${booking.clientName}. Specialist: ${booking.specialistName}. Treatments: ${booking.serviceNames.join(', ')}. Total: $${booking.totalPrice}. Concierge: +33 1 44 28 90 20.`,
      `LOCATION:ÉLAN Atelier de Beauté, 420 Boulevard Saint-Germain, Paris`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `elan-appointment-${booking.bookingCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-2xl border border-[#DDD6CC] shadow-2xl max-w-2xl w-full my-8 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-[#E8E2D8] flex items-center justify-between bg-[#F4EFEA] shrink-0">
          <div>
            <div className="font-serif text-lg text-[#1E1C1A]">Reservation Concierge</div>
            <div className="text-[11px] text-[#7A746C] tracking-wide">
              {step <= 4 ? `Step ${step} of 4: ${['Select Treatments', 'Specialist Choice', 'Date & Time', 'Guest Information'][step - 1]}` : 'Reservation Confirmed'}
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-[#7A746C] hover:text-[#1E1C1A] hover:bg-[#EAE4DC] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: Select Treatments */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-[#1E1C1A]">Choose Desired Rituals</h3>
                <span className="text-xs text-[#7A746C] tabular-nums font-mono">
                  {selectedServiceIds.length} selected
                </span>
              </div>
              <p className="text-xs text-[#68625A]">
                You can select multiple services to schedule a seamless contiguous salon visit.
              </p>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {SERVICES.map((s) => {
                  const isChecked = selectedServiceIds.includes(s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-[#F2ECE3] border-[#8C6239]'
                          : 'bg-[#F4EFEA] border-[#E5DFD4] hover:border-[#C4B9A9]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked
                              ? 'bg-[#8C6239] border-[#8C6239] text-white'
                              : 'border-[#A3998C] bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-medium text-[#1E1C1A]">
                            {s.name}
                          </div>
                          <div className="text-[11px] text-[#7A746C] capitalize">
                            {s.category} · {s.durationMinutes} min
                          </div>
                        </div>
                      </div>
                      <div className="font-mono text-xs sm:text-sm font-semibold text-[#1E1C1A] tabular-nums shrink-0">
                        ${s.price}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Running Tally */}
              <div className="bg-[#EDE7DE] rounded-xl p-3.5 flex items-center justify-between text-xs border border-[#DDD5C7]">
                <div className="flex items-center gap-2 text-[#4A453F]">
                  <Clock className="w-4 h-4 text-[#8C6239]" />
                  <span>Total Duration: </span>
                  <span className="font-mono font-medium tabular-nums">{totalMinutes} min</span>
                </div>
                <div className="flex items-center gap-2 text-[#1E1C1A]">
                  <span>Total Estimate:</span>
                  <span className="font-mono font-bold text-sm tabular-nums">${totalPrice}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Specialist Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[#1E1C1A]">Select Your Preferred Artisan</h3>
              <p className="text-xs text-[#68625A]">
                Choose a specific director or select "Any Available Specialist" for the greatest time slot flexibility.
              </p>

              <div className="space-y-2.5">
                {/* Any specialist option */}
                <div
                  onClick={() => setSelectedSpecialistId('any')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedSpecialistId === 'any'
                      ? 'bg-[#F2ECE3] border-[#8C6239]'
                      : 'bg-[#F4EFEA] border-[#E5DFD4] hover:border-[#C4B9A9]'
                  }`}
                >
                  <div>
                    <div className="text-sm font-medium text-[#1E1C1A]">
                      Any Available Master Artisan
                    </div>
                    <div className="text-xs text-[#7A746C]">
                      Recommended for maximum calendar flexibility
                    </div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedSpecialistId === 'any'
                        ? 'border-[#8C6239] bg-[#8C6239]'
                        : 'border-[#A3998C]'
                    }`}
                  >
                    {selectedSpecialistId === 'any' && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </div>

                {SPECIALISTS.map((sp) => {
                  const isSelected = selectedSpecialistId === sp.id;
                  return (
                    <div
                      key={sp.id}
                      onClick={() => setSelectedSpecialistId(sp.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#F2ECE3] border-[#8C6239]'
                          : 'bg-[#F4EFEA] border-[#E5DFD4] hover:border-[#C4B9A9]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#E8DFD3] border border-[#DDD5C7] flex items-center justify-center font-serif text-sm font-medium text-[#1E1C1A]">
                          {sp.initials}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#1E1C1A]">{sp.name}</div>
                          <div className="text-xs text-[#7A746C]">{sp.role} · {sp.experience}</div>
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#8C6239] bg-[#8C6239]' : 'border-[#A3998C]'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Picker */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-xl text-[#1E1C1A]">Choose Date &amp; Arrival Time</h3>
                <p className="text-xs text-[#68625A] mt-1">
                  Selected Artisan: <span className="font-medium text-[#1E1C1A]">{selectedSpecialist.name}</span>
                </p>
              </div>

              {/* Date Horizontal Carousel */}
              <div>
                <div className="text-xs uppercase tracking-wider text-[#7A746C] font-semibold mb-2.5">
                  Available Dates (Next 14 Days)
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {availableDates.map((d) => {
                    const isSelected = selectedDate === d.iso;
                    return (
                      <button
                        key={d.iso}
                        type="button"
                        onClick={() => setSelectedDate(d.iso)}
                        className={`min-w-16 p-2.5 rounded-xl border text-center transition-all cursor-pointer shrink-0 ${
                          isSelected
                            ? 'bg-[#1E1C1A] text-white border-[#1E1C1A] shadow-sm'
                            : 'bg-[#F4EFEA] text-[#4A453F] border-[#E5DFD4] hover:bg-[#EAE4DC]'
                        }`}
                      >
                        <div className="text-[10px] uppercase tracking-wider">{d.weekday}</div>
                        <div className="text-lg font-mono font-bold tabular-nums my-0.5">{d.dayNum}</div>
                        <div className="text-[10px]">{d.month}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-4 pt-2">
                <div className="text-xs uppercase tracking-wider text-[#7A746C] font-semibold">
                  Select Appointment Time Slot
                </div>
                <div className="space-y-3">
                  {timeSlots.map((group) => (
                    <div key={group.label} className="space-y-1.5">
                      <div className="text-[11px] text-[#8C8479] font-medium">{group.label}</div>
                      <div className="grid grid-cols-3 gap-2">
                        {group.slots.map((time) => {
                          const isSelected = selectedTimeSlot === time;
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTimeSlot(time)}
                              className={`py-2 px-3 text-xs font-mono font-medium rounded-lg border text-center transition-all cursor-pointer tabular-nums ${
                                isSelected
                                  ? 'bg-[#8C6239] text-white border-[#8C6239]'
                                  : 'bg-[#F4EFEA] text-[#3E3A35] border-[#E5DFD4] hover:border-[#C4B9A9]'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Guest Information */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-xl text-[#1E1C1A]">Guest Contact &amp; Preferences</h3>
                <p className="text-xs text-[#68625A] mt-1">
                  We will send your formal digital confirmation and preparation directions here.
                </p>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#4A453F] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Genevieve Duprès"
                    className="w-full bg-[#FAF8F5] border border-[#DDD6CC] rounded-lg px-3.5 py-2.5 text-xs text-[#1E1C1A] placeholder-[#9C9488] focus:outline-none focus:ring-1 focus:ring-[#8C6239] focus:border-[#8C6239]"
                  />
                  {errors.clientName && (
                    <div className="text-[11px] text-red-700 mt-1">{errors.clientName}</div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#4A453F] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="genevieve@example.com"
                      className="w-full bg-[#FAF8F5] border border-[#DDD6CC] rounded-lg px-3.5 py-2.5 text-xs text-[#1E1C1A] placeholder-[#9C9488] focus:outline-none focus:ring-1 focus:ring-[#8C6239] focus:border-[#8C6239]"
                    />
                    {errors.clientEmail && (
                      <div className="text-[11px] text-red-700 mt-1">{errors.clientEmail}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4A453F] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full bg-[#FAF8F5] border border-[#DDD6CC] rounded-lg px-3.5 py-2.5 text-xs text-[#1E1C1A] placeholder-[#9C9488] focus:outline-none focus:ring-1 focus:ring-[#8C6239] focus:border-[#8C6239]"
                    />
                    {errors.clientPhone && (
                      <div className="text-[11px] text-red-700 mt-1">{errors.clientPhone}</div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A453F] mb-1">
                    Special Requests, Allergies or Hair/Skin History (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Sensitive to essential oils; preparing for an evening reception."
                    className="w-full bg-[#FAF8F5] border border-[#DDD6CC] rounded-lg px-3.5 py-2 text-xs text-[#1E1C1A] placeholder-[#9C9488] focus:outline-none focus:ring-1 focus:ring-[#8C6239] focus:border-[#8C6239]"
                  />
                </div>
              </div>

              {/* Policy & Trust Note */}
              <div className="flex items-start gap-2.5 p-3.5 bg-[#F2ECE3] rounded-xl border border-[#E5DFD4] text-xs text-[#5A554E]">
                <ShieldCheck className="w-4 h-4 text-[#8C6239] shrink-0 mt-0.5" />
                <span>
                  No immediate pre-payment charged online. Payment is settled at the parlour reception
                  after your service. Complimentary rescheduling permitted up to 24 hours prior.
                </span>
              </div>
            </div>
          )}

          {/* STEP 5: Booking Confirmation View */}
          {step === 5 && confirmedBooking && (
            <div className="space-y-6 text-center py-4 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-[#EAE2D7] text-[#8C6239] rounded-full flex items-center justify-center mx-auto border border-[#DDD5C7]">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <div className="text-xs uppercase tracking-widest text-[#8C6239] font-semibold">
                  Reservation Confirmed
                </div>
                <h3 className="font-serif text-3xl text-[#1E1C1A]">
                  We look forward to welcoming you, {confirmedBooking.clientName.split(' ')[0]}
                </h3>
                <p className="text-xs text-[#68625A]">
                  Confirmation reference:{' '}
                  <span className="font-mono font-bold text-[#1E1C1A]">
                    {confirmedBooking.bookingCode}
                  </span>
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#F4EFEA] rounded-xl p-5 border border-[#E5DFD4] text-left space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs pb-3 border-b border-[#E8E2D8]">
                  <div>
                    <span className="text-[#7A746C] block">Appointment Date</span>
                    <span className="font-medium text-[#1E1C1A]">{confirmedBooking.date}</span>
                  </div>
                  <div>
                    <span className="text-[#7A746C] block">Scheduled Time</span>
                    <span className="font-medium text-[#1E1C1A] font-mono tabular-nums">
                      {confirmedBooking.timeSlot} ({confirmedBooking.totalDuration} min)
                    </span>
                  </div>
                </div>

                <div className="text-xs pb-3 border-b border-[#E8E2D8]">
                  <span className="text-[#7A746C] block">Artisan</span>
                  <span className="font-medium text-[#1E1C1A]">{confirmedBooking.specialistName}</span>
                </div>

                <div className="text-xs pb-3 border-b border-[#E8E2D8]">
                  <span className="text-[#7A746C] block mb-1">Reserved Treatments</span>
                  <ul className="list-disc list-inside text-[#3E3A35] space-y-0.5">
                    {confirmedBooking.serviceNames.map((n, idx) => (
                      <li key={idx}>{n}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#7A746C]">Total Anticipated Investment</span>
                  <span className="font-mono font-bold text-base text-[#1E1C1A] tabular-nums">
                    ${confirmedBooking.totalPrice}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => downloadIcsCalendar(confirmedBooking)}
                  className="w-full sm:flex-1 py-3 text-xs font-medium tracking-wide text-[#3E3A35] bg-[#FAF8F5] hover:bg-[#EAE4DC] border border-[#DDD6CC] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#8C6239]" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:flex-1 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#1E1C1A] hover:bg-[#34302C] rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Return to Salon
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Navigation Footer */}
        {step < 5 && (
          <div className="px-6 py-4 border-t border-[#E8E2D8] bg-[#F4EFEA] flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-3.5 py-2 text-xs font-medium text-[#5A554E] hover:text-[#1E1C1A] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#7A746C] hidden sm:inline">
                Est: <span className="font-mono font-semibold text-[#1E1C1A]">${totalPrice}</span>
              </span>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={selectedServiceIds.length === 0}
                  className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1E1C1A] hover:bg-[#34302C] disabled:bg-[#8C8479] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#8C6239] hover:bg-[#74502E] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.98]"
                >
                  <span>Confirm Reservation</span>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
