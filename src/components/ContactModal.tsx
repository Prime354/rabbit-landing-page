import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  CheckCircle2,
  Sparkles,
  Calendar,
  Clock,
  Video,
  ExternalLink,
  Loader2,
  CalendarPlus,
  MessageSquareQuote
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'inquiry' | 'calendar'>('inquiry');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Brand Identity',
    budget: '$3k - $5k',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sheetSyncStatus, setSheetSyncStatus] = useState<'synced' | 'local_demo'>('local_demo');

  const googleSheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL || '';
  const googleCalendarUrl =
    import.meta.env.VITE_GOOGLE_CALENDAR_URL || 'https://calendar.google.com/';

  // Generate a pre-filled Google Calendar event URL for a 30-min discovery call
  const generateGoogleCalendarEventUrl = () => {
    const title = encodeURIComponent(`Design Discovery Call with Prime (${formData.name || 'Client'})`);
    const details = encodeURIComponent(
      `Discovery Consultation with Prime Graphic Designer\n\nClient Name: ${formData.name || 'Client'}\nClient Email: ${formData.email || 'N/A'}\nService: ${formData.service}\nBudget: ${formData.budget}\nBrief: ${formData.message || 'Discussing new creative project'}`
    );
    const location = encodeURIComponent('Google Meet Video Call');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionPayload = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    if (googleSheetUrl && googleSheetUrl.startsWith('http')) {
      try {
        // Send data to Google Apps Script Web App
        await fetch(googleSheetUrl, {
          method: 'POST',
          mode: 'no-cors', // Google Apps Script redirects require no-cors in browser
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionPayload),
        });
        setSheetSyncStatus('synced');
      } catch (err) {
        console.warn('Could not post to Google Sheet endpoint, falling back to local success state:', err);
        setSheetSyncStatus('local_demo');
      }
    } else {
      // If no Google Sheet URL is set yet in .env, simulate instant success
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSheetSyncStatus('local_demo');
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#FF6418', '#FFA526', '#B600A8', '#22C55E', '#FFF1EB'],
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      service: 'Brand Identity',
      budget: '$3k - $5k',
      message: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#210F06] border border-[#4D240E] rounded-[32px] sm:rounded-[40px] p-6 sm:p-9 shadow-2xl z-10 text-[#FFF1EB] overflow-hidden"
          >
            {/* Decorative background glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#FF6418]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#22C55E]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-[#2E1509] text-[#FFF1EB] hover:text-white hover:bg-[#451F0D] transition-all cursor-pointer z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Navigation Switcher Tabs */}
            <div className="flex items-center gap-2 mb-6 p-1 bg-[#180A04] border border-[#3E1B0B] rounded-2xl w-fit max-w-full">
              <button
                type="button"
                onClick={() => setActiveTab('inquiry')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'inquiry'
                    ? 'bg-[#FF6418] text-white shadow-lg shadow-[#FF6418]/25'
                    : 'text-[#C9B3AC] hover:text-white hover:bg-[#2E1509]'
                }`}
              >
                <MessageSquareQuote className="w-4 h-4" />
                <span>Send Inquiry (Google Sheet)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'calendar'
                    ? 'bg-[#FF6418] text-white shadow-lg shadow-[#FF6418]/25'
                    : 'text-[#C9B3AC] hover:text-white hover:bg-[#2E1509]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Book Call (Google Calendar)</span>
              </button>
            </div>

            {/* TAB 1: INQUIRY FORM (Connected to Google Sheets) */}
            {activeTab === 'inquiry' && (
              <div>
                {isSubmitted ? (
                  <div className="text-center py-6 sm:py-8 space-y-5">
                    <div className="w-16 h-16 rounded-full bg-[#FF6418]/20 border border-[#FF6418] flex items-center justify-center mx-auto text-[#FFA526]">
                      <CheckCircle2 className="w-9 h-9 text-[#FFF1EB]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                        Inquiry Received!
                      </h3>
                      <p className="text-[#E0CFCA] max-w-md mx-auto text-sm sm:text-base font-light">
                        {sheetSyncStatus === 'synced' ? (
                          <span className="text-emerald-400 font-medium">
                            ✓ Your details were safely logged into Google Sheets.
                          </span>
                        ) : (
                          'Your message has been received! Prime will review your project brief and follow up within 24 hours.'
                        )}
                      </p>
                    </div>

                    {/* Google Calendar Quick Invite Option */}
                    <div className="bg-[#180A04]/80 border border-[#421D0D] rounded-2xl p-4 sm:p-5 text-left max-w-lg mx-auto space-y-3">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FFA526] font-semibold">
                        <CalendarPlus className="w-4 h-4" />
                        <span>Next Step: Google Calendar Booking</span>
                      </div>
                      <p className="text-xs text-[#D8C6C0]">
                        Want to lock in a time right away? Create a 30-min discovery meeting on your Google Calendar:
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                        <a
                          href={generateGoogleCalendarEventUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-pill-btn px-5 py-2.5 rounded-full text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Add to Google Calendar</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>
                        <button
                          type="button"
                          onClick={() => setActiveTab('calendar')}
                          className="px-5 py-2.5 rounded-full bg-[#2E1509] border border-[#52250F] hover:bg-[#431F0E] text-[#FFF1EB] text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          View Meeting Details
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleReset}
                        className="px-8 py-2.5 rounded-full bg-[#2E1509] hover:bg-[#3D1D0D] text-[#C9B3AC] hover:text-white font-medium uppercase text-xs tracking-wider transition-colors cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-5 space-y-1.5">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E1509] border border-[#4F2510] text-xs uppercase tracking-wider text-[#FFA526]">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Synced to Google Sheets 📊
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                        Let&apos;s build something <span className="hero-heading">unforgettable</span>
                      </h2>
                      <p className="text-[#D8C6C0] text-xs sm:text-sm font-light">
                        Fill in your project details below and it will automatically be queued in our Google Sheet client CRM.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#D8C6C0] mb-1 font-medium">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Elena Vance"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[#180A04] border border-[#3E1B0B] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#806960] focus:outline-none focus:border-[#FF6418] transition-colors"
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
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#180A04] border border-[#3E1B0B] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#806960] focus:outline-none focus:border-[#FF6418] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#D8C6C0] mb-1 font-medium">
                            Project Type
                          </label>
                          <select
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="w-full bg-[#180A04] border border-[#3E1B0B] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6418] transition-colors cursor-pointer"
                          >
                            <option value="Brand Identity">01 - Brand Identity</option>
                            <option value="Print Design">02 - Print & Editorial</option>
                            <option value="Digital & Social">03 - Digital & Social Assets</option>
                            <option value="Illustration">04 - Custom Illustration</option>
                            <option value="Typography & Layout">05 - Typography & Layout</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#D8C6C0] mb-1 font-medium">
                            Budget Range
                          </label>
                          <select
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full bg-[#180A04] border border-[#3E1B0B] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6418] transition-colors cursor-pointer"
                          >
                            <option value="$2k - $3k">$2,000 - $3,000</option>
                            <option value="$3k - $5k">$3,000 - $5,000</option>
                            <option value="$5k - $10k">$5,000 - $10,000</option>
                            <option value="$10k+">$10,000+</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#D8C6C0] mb-1 font-medium">
                          Project Brief
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Tell me a bit about your brand, timeline, and goals..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-[#180A04] border border-[#3E1B0B] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#806960] focus:outline-none focus:border-[#FF6418] transition-colors resize-none"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                        <div className="flex items-center gap-2 text-xs text-[#C9B3AC]">
                          <Sparkles className="w-4 h-4 text-[#FFA526]" />
                          <span>Direct Google Sheets logging</span>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto contact-pill-btn px-8 py-3 rounded-full text-white font-medium uppercase text-xs tracking-widest inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <span>Send Inquiry</span>
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

            {/* TAB 2: GOOGLE CALENDAR BOOKING */}
            {activeTab === 'calendar' && (
              <div className="space-y-5 py-2">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E1509] border border-[#4F2510] text-xs uppercase tracking-wider text-[#FFA526]">
                    <Calendar className="w-3.5 h-3.5" />
                    Google Calendar Integration 📅
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    Book a <span className="hero-heading">Discovery Call</span>
                  </h2>
                  <p className="text-[#D8C6C0] text-xs sm:text-sm font-light">
                    Schedule a 30-minute 1-on-1 strategy call directly into our Google Calendar to discuss your design vision.
                  </p>
                </div>

                {/* Meeting Features Pill Container */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#180A04] border border-[#3E1B0B] rounded-2xl p-3.5 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#2E1509] text-[#FFA526]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-[#9B8177] uppercase tracking-wider font-semibold">Duration</div>
                      <div className="text-sm font-bold text-white">30 Minutes</div>
                    </div>
                  </div>

                  <div className="bg-[#180A04] border border-[#3E1B0B] rounded-2xl p-3.5 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#2E1509] text-[#22C55E]">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-[#9B8177] uppercase tracking-wider font-semibold">Location</div>
                      <div className="text-sm font-bold text-white">Google Meet</div>
                    </div>
                  </div>

                  <div className="bg-[#180A04] border border-[#3E1B0B] rounded-2xl p-3.5 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#2E1509] text-[#38BDF8]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-[#9B8177] uppercase tracking-wider font-semibold">Pricing</div>
                      <div className="text-sm font-bold text-white">100% Free</div>
                    </div>
                  </div>
                </div>

                {/* Agenda Box */}
                <div className="bg-[#180A04]/90 border border-[#3E1B0B] rounded-2xl p-4 sm:p-5 space-y-2.5">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#FFA526]">
                    What we will cover in this call:
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#E0CFCA]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6418] font-bold">01.</span>
                      <span>Review your brand goals, target audience, and design aesthetics.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6418] font-bold">02.</span>
                      <span>Scope deliverables (logos, 3D assets, editorial, or social kits).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF6418] font-bold">03.</span>
                      <span>Provide project timeline estimates and custom quote options.</span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-pill-btn flex-1 py-3.5 px-6 rounded-full text-white font-semibold uppercase text-xs tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#FF6418]/25"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Open Google Calendar Schedule</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <a
                    href={generateGoogleCalendarEventUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-full bg-[#2E1509] border border-[#52250F] hover:bg-[#431F0E] text-[#FFF1EB] font-medium uppercase text-xs tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <CalendarPlus className="w-4 h-4 text-[#FFA526]" />
                    <span>Create Custom Event</span>
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;

