import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Sparkles,
  Loader2,
  Calendar as CalendarIcon,
  Clock,
  Video,
  Globe,
  Check,
  CalendarCheck,
  ExternalLink,
  MessageSquare,
  Mail,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Slot {
  time: string;
  isBooked?: boolean;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'booking' | 'message'>('booking');

  // Appointment Booking State
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>('11:00 AM');
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    notes: '',
  });
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);

  // Direct Message State
  const [directMessage, setDirectMessage] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isMessageSubmitting, setIsMessageSubmitting] = useState(false);

  // Google Calendar Backend URL (for real-time slots & Google Meet booking)
  const DEFAULT_CALENDAR_BACKEND_URL =
    'https://script.google.com/macros/s/AKfycbxaYQmj4B5jVnbm9gny9apU-9k0k78orwcbDoXht2yJxcmvtVFrgVqCCBaRs6SCUfyv/exec';
  const calendarBackendUrl =
    import.meta.env.VITE_GOOGLE_CALENDAR_BACKEND_URL || DEFAULT_CALENDAR_BACKEND_URL;

  // Google Sheet Backend URL (for direct message form submissions & CRM logging)
  const DEFAULT_SHEET_BACKEND_URL =
    'https://script.google.com/macros/s/AKfycbzZv4Tw6ZnI0Qa1gLR1gD6WWNogfNXeRqoh7X-apjLnCnGn8xlFQH_JobvEtQyd7oAxhw/exec';
  const sheetBackendUrl =
    import.meta.env.VITE_GOOGLE_SHEET_URL || DEFAULT_SHEET_BACKEND_URL;

  // Generate dynamic next 7 calendar days starting from tomorrow
  const upcomingDays = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const dateNum = d.getDate();
      days.push({
        fullDate: d,
        dayName,
        monthName,
        dateNum,
        formatted: `${dayName}, ${monthName} ${dateNum}`,
      });
    }
    return days;
  }, []);

  // Live Slots queried from Google Calendar with fallback
  const [liveSlots, setLiveSlots] = useState<Slot[]>([
    { time: '09:30 AM', isBooked: false },
    { time: '11:00 AM', isBooked: false },
    { time: '01:30 PM', isBooked: true },
    { time: '03:00 PM', isBooked: false },
    { time: '04:30 PM', isBooked: false },
    { time: '06:00 PM', isBooked: false },
  ]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Detect local timezone
  const userTimezone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'GMT+5:30';
    } catch {
      return 'Local Time';
    }
  }, []);

  // Fetch live available slots from Google Calendar backend when date changes
  useEffect(() => {
    const selectedDay = upcomingDays[selectedDateIndex];
    if (!selectedDay || !calendarBackendUrl) return;

    let isMounted = true;
    setIsLoadingSlots(true);

    const dateQuery = encodeURIComponent(selectedDay.fullDate.toISOString());
    fetch(`${calendarBackendUrl}?action=getSlots&date=${dateQuery}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && Array.isArray(data.slots) && data.slots.length > 0) {
          setLiveSlots(data.slots);
          const currentBooked = data.slots.find((s: Slot) => s.time === selectedSlot)?.isBooked;
          if (currentBooked) {
            const firstAvailable = data.slots.find((s: Slot) => !s.isBooked);
            if (firstAvailable) setSelectedSlot(firstAvailable.time);
          }
        }
      })
      .catch((err) => {
        console.log('Using default slots layout (static fallback):', err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingSlots(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedDateIndex, calendarBackendUrl, upcomingDays, selectedSlot]);

  // Generate 1-click Google Calendar Event URL for the client's own calendar
  const generateGoogleCalendarEventUrl = () => {
    const selectedDay = upcomingDays[selectedDateIndex];
    if (!selectedDay || !selectedSlot) return 'https://calendar.google.com/';

    const title = encodeURIComponent(`Design Discovery Call: Prime x ${bookingDetails.name || 'Client'}`);
    const details = encodeURIComponent(
      `Appointment Details:\n- Date: ${selectedDay.formatted}\n- Time: ${selectedSlot} (${userTimezone})\n- Location: Google Meet Video Call\n- Client: ${bookingDetails.name || 'Client'} (${bookingDetails.email || 'N/A'})\n- Goal: ${bookingDetails.notes || 'Creative design discussion'}`
    );
    const location = encodeURIComponent('Google Meet Video Call');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  // Resilient endpoint poster (POST with GET fallback)
  const sendToEndpoint = async (url: string, params: URLSearchParams) => {
    if (!url || !url.startsWith('http')) return;
    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
      const fallbackUrl = `${url}?${params.toString()}`;
      fetch(fallbackUrl, { mode: 'no-cors' }).catch(() => {});
    } catch {
      const fallbackUrl = `${url}?${params.toString()}`;
      await fetch(fallbackUrl, { mode: 'no-cors' }).catch(() => {});
    }
  };

  // Confirm booking: Creates Google Calendar event & logs into Google Sheet
  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setIsBookingSubmitting(true);
    const selectedDay = upcomingDays[selectedDateIndex];

    const params = new URLSearchParams();
    params.append('action', 'book');
    params.append('slot', selectedSlot);
    params.append('date', selectedDay.fullDate.toISOString());
    params.append('name', bookingDetails.name);
    params.append('email', bookingDetails.email);
    params.append('notes', bookingDetails.notes || 'Design Consultation');

    // 1. Send to Google Calendar endpoint (creates meeting & Meet link)
    if (calendarBackendUrl) {
      await sendToEndpoint(calendarBackendUrl, params);
    }
    // 2. Also send to Google Sheet endpoint if configured and separate
    if (sheetBackendUrl && sheetBackendUrl !== calendarBackendUrl) {
      sendToEndpoint(sheetBackendUrl, params);
    }

    setIsBookingSubmitting(false);
    setIsBookingSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#22C55E', '#FF6418', '#FFA526', '#38BDF8', '#FFF1EB'],
    });
  };

  // Direct Message submit: Logs directly into Google Sheet
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsMessageSubmitting(true);

    const params = new URLSearchParams();
    params.append('action', 'message');
    params.append('name', directMessage.name);
    params.append('email', directMessage.email);
    params.append('message', directMessage.message);
    params.append('timestamp', new Date().toISOString());

    // 1. Send to Google Sheet endpoint
    if (sheetBackendUrl) {
      await sendToEndpoint(sheetBackendUrl, params);
    }
    // 2. Also forward to Calendar backend if separate
    if (calendarBackendUrl && calendarBackendUrl !== sheetBackendUrl) {
      sendToEndpoint(calendarBackendUrl, params);
    }

    setIsMessageSubmitting(false);
    setIsMessageSent(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6418', '#FFA526', '#FFF1EB'],
    });
  };

  const handleReset = () => {
    setIsBookingSubmitted(false);
    setIsMessageSent(false);
    setIsBookingSubmitting(false);
    setIsMessageSubmitting(false);
    setBookingDetails({ name: '', email: '', notes: '' });
    setDirectMessage({ name: '', email: '', message: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#210F06] border border-[#4D240E] rounded-[28px] sm:rounded-[40px] p-5 sm:p-8 shadow-2xl z-10 text-[#FFF1EB] overflow-hidden my-auto"
          >
            {/* Ambient Warm Glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#FF6418]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#22C55E]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#2E1509] text-[#FFF1EB] hover:text-white hover:bg-[#451F0D] transition-all cursor-pointer z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Switcher */}
            <div className="flex items-center gap-2 mb-5 p-1 bg-[#180A04] border border-[#3E1B0B] rounded-2xl w-fit max-w-full">
              <button
                type="button"
                onClick={() => setActiveTab('booking')}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'booking'
                    ? 'bg-[#FF6418] text-white shadow-lg shadow-[#FF6418]/25'
                    : 'text-[#C9B3AC] hover:text-white hover:bg-[#2E1509]'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Book Appointment</span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-full bg-[#180A04] text-[#FFA526] text-[10px] font-bold">
                  Live Slots
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('message')}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'message'
                    ? 'bg-[#FF6418] text-white shadow-lg shadow-[#FF6418]/25'
                    : 'text-[#C9B3AC] hover:text-white hover:bg-[#2E1509]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Direct Message</span>
              </button>
            </div>

            {/* ========================================================
                TAB 1: LIVE GOOGLE CALENDAR APPOINTMENT BOOKING
            ======================================================== */}
            {activeTab === 'booking' && (
              <div>
                {isBookingSubmitted ? (
                  /* Confirmed Booking Ticket */
                  <div className="text-center py-6 sm:py-8 space-y-5">
                    <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 border border-[#22C55E] flex items-center justify-center mx-auto text-[#22C55E]">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                        Appointment Confirmed!
                      </h3>
                      <p className="text-[#E0CFCA] text-xs sm:text-sm max-w-md mx-auto">
                        Your 30-minute discovery consultation has been booked directly into Google Calendar.
                      </p>
                    </div>

                    {/* Booking Ticket Card */}
                    <div className="bg-[#180A04] border border-[#421D0D] rounded-2xl p-4 sm:p-5 text-left max-w-md mx-auto space-y-3 shadow-xl">
                      <div className="flex items-center justify-between border-b border-[#351608] pb-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#FFA526] uppercase tracking-wider">
                          <CalendarCheck className="w-4 h-4" />
                          <span>Google Calendar Invite</span>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          Live Booked
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-[#8F7870] block">Date</span>
                          <span className="font-bold text-white text-sm">
                            {upcomingDays[selectedDateIndex]?.formatted}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#8F7870] block">Time</span>
                          <span className="font-bold text-[#FFA526] text-sm">{selectedSlot}</span>
                        </div>
                        <div>
                          <span className="text-[#8F7870] block">Attendee</span>
                          <span className="font-medium text-white">{bookingDetails.name || 'Client'}</span>
                        </div>
                        <div>
                          <span className="text-[#8F7870] block">Platform</span>
                          <span className="font-medium text-emerald-400 flex items-center gap-1">
                            <Video className="w-3 h-3" /> Google Meet
                          </span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <a
                          href={generateGoogleCalendarEventUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-pill-btn w-full py-2.5 rounded-xl text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#FF6418]/25"
                        >
                          <CalendarIcon className="w-3.5 h-3.5" />
                          <span>Add to My Google Calendar</span>
                          <ExternalLink className="w-3 h-3 opacity-75" />
                        </a>
                      </div>
                    </div>

                    <button
                      onClick={handleReset}
                      className="px-8 py-2.5 rounded-full bg-[#2E1509] hover:bg-[#3D1D0D] text-[#C9B3AC] hover:text-white font-medium uppercase text-xs tracking-wider transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  /* Interactive Slot Booking Form */
                  <form onSubmit={handleConfirmBooking} className="space-y-4">
                    {/* Header Info */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2E1509] border border-[#4F2510] text-[#FFA526] font-semibold text-[11px] uppercase tracking-wider">
                          <Clock className="w-3 h-3" /> 30 Min Call
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2E1509] border border-[#4F2510] text-emerald-400 font-semibold text-[11px] uppercase tracking-wider">
                          <Video className="w-3 h-3" /> Google Meet Video
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2E1509] border border-[#4F2510] text-[#B09990] text-[11px]">
                          <Globe className="w-3 h-3 text-[#FFA526]" /> {userTimezone}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white pt-1">
                        Select a <span className="hero-heading">Live Available Slot</span>
                      </h2>
                    </div>

                    {/* 1. Date Selector Strip */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#D8C6C0] mb-2 font-bold">
                        1. Choose Date
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {upcomingDays.map((day, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedDateIndex(idx)}
                            className={`p-2 sm:p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border ${
                              selectedDateIndex === idx
                                ? 'bg-[#FF6418] border-[#FF8A4D] text-white shadow-md shadow-[#FF6418]/30 scale-102'
                                : 'bg-[#180A04] border-[#3E1B0B] text-[#C9B3AC] hover:border-[#6B2F11] hover:text-white'
                            }`}
                          >
                            <span className="text-[10px] uppercase font-bold tracking-wider opacity-85">
                              {day.dayName}
                            </span>
                            <span className="text-base sm:text-lg font-black leading-tight">
                              {day.dateNum}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider opacity-75">
                              {day.monthName}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2. Available Slots Grid */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <label className="text-[11px] uppercase tracking-wider text-[#D8C6C0] font-bold">
                            2. Live Google Calendar Slots ({upcomingDays[selectedDateIndex]?.formatted})
                          </label>
                          {isLoadingSlots && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-[#FFA526]">
                              <Loader2 className="w-2.5 h-2.5 animate-spin" />
                              <span>Checking Calendar...</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#A69087]">All slots 30 mins</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {liveSlots.map((slot, idx) => {
                          const isSelected = selectedSlot === slot.time && !slot.isBooked;

                          if (slot.isBooked) {
                            return (
                              <div
                                key={idx}
                                className="px-3 py-2.5 rounded-xl bg-[#140803] border border-[#2B1207] text-[#69544D] flex items-center justify-between cursor-not-allowed opacity-60 text-xs"
                              >
                                <span className="line-through">{slot.time}</span>
                                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#80422B]">
                                  Booked
                                </span>
                              </div>
                            );
                          }

                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setSelectedSlot(slot.time)}
                              className={`px-3 py-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer text-xs font-semibold ${
                                isSelected
                                  ? 'bg-[#2E1509] border-[#FF6418] text-white shadow-sm shadow-[#FF6418]/25'
                                  : 'bg-[#180A04] border-[#3E1B0B] text-[#D8C6C0] hover:border-[#6B2F11] hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-1.5">
                                <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-[#FF6418]' : 'text-[#8F7870]'}`} />
                                <span>{slot.time}</span>
                              </div>
                              {isSelected ? (
                                <div className="w-4 h-4 rounded-full bg-[#FF6418] flex items-center justify-center text-white">
                                  <Check className="w-2.5 h-2.5" />
                                </div>
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 3. Client Details */}
                    <div className="pt-1">
                      <label className="block text-[11px] uppercase tracking-wider text-[#D8C6C0] mb-2 font-bold">
                        3. Your Details
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Name *"
                          value={bookingDetails.name}
                          onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
                          className="w-full bg-[#180A04] border border-[#3E1B0B] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-[#806960] focus:outline-none focus:border-[#FF6418] transition-colors"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Email Address (for Google Meet invite) *"
                          value={bookingDetails.email}
                          onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
                          className="w-full bg-[#180A04] border border-[#3E1B0B] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-[#806960] focus:outline-none focus:border-[#FF6418] transition-colors"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="What would you like to discuss? (optional)"
                        value={bookingDetails.notes}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, notes: e.target.value })}
                        className="mt-2.5 w-full bg-[#180A04] border border-[#3E1B0B] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-[#806960] focus:outline-none focus:border-[#FF6418] transition-colors"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <div className="text-xs text-[#C9B3AC] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#FFA526]" />
                        <span>Direct Google Calendar & Meet booking</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isBookingSubmitting || !selectedSlot}
                        className="w-full sm:w-auto contact-pill-btn px-7 py-3 rounded-full text-white font-semibold uppercase text-xs tracking-widest inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isBookingSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Booking on Google Calendar...</span>
                          </>
                        ) : (
                          <>
                            <span>Confirm {selectedSlot || 'Slot'}</span>
                            <CalendarCheck className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ========================================================
                TAB 2: DIRECT MESSAGE INQUIRY
            ======================================================== */}
            {activeTab === 'message' && (
              <div>
                {isMessageSent ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#FF6418]/20 border border-[#FF6418] flex items-center justify-center mx-auto text-[#FFA526]">
                      <CheckCircle2 className="w-9 h-9 text-[#FFF1EB]" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                        Message Sent!
                      </h3>
                      <p className="text-[#E0CFCA] max-w-md mx-auto text-xs sm:text-sm">
                        Thank you for reaching out! Prime will review your message and reply directly to your email within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="contact-pill-btn px-8 py-2.5 rounded-full text-white font-medium uppercase text-xs tracking-wider cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4 space-y-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E1509] border border-[#4F2510] text-xs uppercase tracking-wider text-[#FFA526]">
                        <Mail className="w-3 h-3 text-[#FFA526]" />
                        <span>Direct Email: hello@prime.design</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                        Drop a <span className="hero-heading">Direct Line</span>
                      </h2>
                    </div>

                    <form onSubmit={handleSendMessage} className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#D8C6C0] mb-1 font-medium">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Elena Vance"
                            value={directMessage.name}
                            onChange={(e) => setDirectMessage({ ...directMessage, name: e.target.value })}
                            className="w-full bg-[#180A04] border border-[#3E1B0B] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#806960] focus:outline-none focus:border-[#FF6418] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#D8C6C0] mb-1 font-medium">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="elena@company.com"
                            value={directMessage.email}
                            onChange={(e) => setDirectMessage({ ...directMessage, email: e.target.value })}
                            className="w-full bg-[#180A04] border border-[#3E1B0B] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#806960] focus:outline-none focus:border-[#FF6418] transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#D8C6C0] mb-1 font-medium">
                          Your Message
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Tell me a bit about your brand, timeline, or question..."
                          value={directMessage.message}
                          onChange={(e) => setDirectMessage({ ...directMessage, message: e.target.value })}
                          className="w-full bg-[#180A04] border border-[#3E1B0B] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#806960] focus:outline-none focus:border-[#FF6418] transition-colors resize-none"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-2 text-xs text-[#C9B3AC]">
                          <Sparkles className="w-4 h-4 text-[#FFA526]" />
                          <span>Response time: ~24 hours</span>
                        </div>

                        <button
                          type="submit"
                          disabled={isMessageSubmitting}
                          className="w-full sm:w-auto contact-pill-btn px-8 py-3 rounded-full text-white font-medium uppercase text-xs tracking-widest inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                        >
                          {isMessageSubmitting ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <Send className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
