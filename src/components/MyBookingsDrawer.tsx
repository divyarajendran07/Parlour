import React from 'react';
import { X, Calendar, Clock, Download, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { BookingRecord } from '@/src/data/parlourData';

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  onCancelBooking: (id: string) => void;
  onOpenNewBooking: () => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onOpenNewBooking,
}) => {
  if (!isOpen) return null;

  const downloadIcs = (booking: BookingRecord) => {
    const [year, month, day] = booking.date.split('-');
    const [hour, minute] = booking.timeSlot.split(':');
    const dtStart = `${year}${month}${day}T${hour}${minute}00`;

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

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ELAN Atelier de Beaute//Appointment Reservation//EN',
      'BEGIN:VEVENT',
      `UID:${booking.bookingCode}@elan-atelier.com`,
      `DTSTAMP:${dtStart}Z`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:ÉLAN Atelier: ${booking.serviceNames[0]}`,
      `DESCRIPTION:Appointment #${booking.bookingCode} for ${booking.clientName}. Specialist: ${booking.specialistName}. Treatments: ${booking.serviceNames.join(', ')}.`,
      `LOCATION:ÉLAN Atelier de Beauté, 420 Boulevard Saint-Germain, Paris`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `elan-appointment-${booking.bookingCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#DDD6CC] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#E8E2D8] flex items-center justify-between bg-[#F4EFEA]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#8C6239]" />
              <h2 className="font-serif text-xl text-[#1E1C1A]">My Appointments</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#7A746C] hover:text-[#1E1C1A] hover:bg-[#EAE4DC] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 bg-[#F2ECE3] text-[#8C6239] rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-[#1E1C1A]">No Scheduled Reservations</h3>
                <p className="text-xs text-[#7A746C] max-w-xs mx-auto">
                  You haven't scheduled any rituals yet. Browse our curated treatments to reserve your
                  time at the atelier.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenNewBooking();
                  }}
                  className="mt-3 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#1E1C1A] hover:bg-[#34302C] rounded-lg transition-colors cursor-pointer"
                >
                  Book an Appointment
                </button>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className={`p-4 rounded-xl border transition-all ${
                    booking.status === 'Cancelled'
                      ? 'bg-[#F2ECE3]/60 border-[#DDD5C7] opacity-75'
                      : 'bg-[#F4EFEA] border-[#E2DDD3] shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8] mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#1E1C1A]">
                        {booking.bookingCode}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded ${
                          booking.status === 'Confirmed'
                            ? 'bg-[#E5D7C5] text-[#6F4E2C]'
                            : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#1E1C1A] tabular-nums">
                      ${booking.totalPrice}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#5A554E] mb-3">
                    <div className="flex items-center gap-1.5 font-medium text-[#1E1C1A]">
                      <Calendar className="w-3.5 h-3.5 text-[#8C6239]" />
                      <span>{booking.date} at {booking.timeSlot} ({booking.totalDuration} min)</span>
                    </div>
                    <div className="text-[11px] text-[#7A746C]">
                      Artisan: <span className="text-[#3E3A35] font-medium">{booking.specialistName}</span>
                    </div>
                    <div className="text-[11px] text-[#7A746C]">
                      Treatments: <span className="text-[#3E3A35]">{booking.serviceNames.join(', ')}</span>
                    </div>
                  </div>

                  {booking.status === 'Confirmed' && (
                    <div className="flex items-center justify-between pt-2 border-t border-[#E8E2D8]">
                      <button
                        type="button"
                        onClick={() => downloadIcs(booking)}
                        className="text-xs text-[#8C6239] hover:text-[#6F4E2C] font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Calendar Invite</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Are you sure you wish to cancel reservation ${booking.bookingCode}?`
                            )
                          ) {
                            onCancelBooking(booking.id);
                          }
                        }}
                        className="text-xs text-red-700 hover:text-red-900 font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel Booking</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer Action */}
          {bookings.length > 0 && (
            <div className="p-4 border-t border-[#E8E2D8] bg-[#F4EFEA]">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenNewBooking();
                }}
                className="w-full py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#1E1C1A] hover:bg-[#34302C] rounded-lg transition-colors cursor-pointer text-center"
              >
                Schedule Another Ritual
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
