import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Brand Identity',
    budget: '$3k - $5k',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B600A8', '#7621B0', '#BE4C00', '#D7E2EA'],
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
            className="relative w-full max-w-2xl bg-[#210F06] border border-[#4D240E] rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 shadow-2xl z-10 text-[#FFF1EB] overflow-hidden"
          >
            {/* Decorative background glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#FF6418]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#22C55E]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-[#2E1509] text-[#FFF1EB] hover:text-white hover:bg-[#451F0D] transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#FF6418]/20 border border-[#FF6418] flex items-center justify-center mx-auto text-[#FFA526]">
                  <CheckCircle2 className="w-9 h-9 text-[#FFF1EB]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  Message Sent!
                </h3>
                <p className="text-[#E0CFCA] max-w-md mx-auto text-sm sm:text-base font-light">
                  Thank you for reaching out! Prime will review your project details and get back to you within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="contact-pill-btn px-8 py-3 rounded-full text-white font-medium uppercase text-sm tracking-wider cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E1509] border border-[#4F2510] text-xs uppercase tracking-wider text-[#FFA526]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available for Q3/Q4 Projects 🥕
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    Let&apos;s build something <span className="hero-heading">unforgettable</span>
                  </h2>
                  <p className="text-[#D8C6C0] text-xs sm:text-sm font-light">
                    Have a vision for your brand or print project? Drop a line below or email directly at{' '}
                    <a
                      href="mailto:hello@prime.design"
                      className="text-white underline decoration-[#FF6418] hover:text-[#FFA526] transition-colors"
                    >
                      hello@prime.design
                    </a>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9BAAB7] mb-1.5 font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Elena Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#1A1D24] border border-[#2D323E] rounded-xl px-4 py-3 text-sm text-white placeholder-[#5A6372] focus:outline-none focus:border-[#B600A8] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9BAAB7] mb-1.5 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="elena@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#1A1D24] border border-[#2D323E] rounded-xl px-4 py-3 text-sm text-white placeholder-[#5A6372] focus:outline-none focus:border-[#B600A8] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9BAAB7] mb-1.5 font-medium">
                        Project Type
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-[#1A1D24] border border-[#2D323E] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#B600A8] transition-colors"
                      >
                        <option value="Brand Identity">01 - Brand Identity</option>
                        <option value="Print Design">02 - Print & Editorial</option>
                        <option value="Digital & Social">03 - Digital & Social Assets</option>
                        <option value="Illustration">04 - Custom Illustration</option>
                        <option value="Typography & Layout">05 - Typography & Layout</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9BAAB7] mb-1.5 font-medium">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#1A1D24] border border-[#2D323E] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#B600A8] transition-colors"
                      >
                        <option value="$2k - $3k">$2,000 - $3,000</option>
                        <option value="$3k - $5k">$3,000 - $5,000</option>
                        <option value="$5k - $10k">$5,000 - $10,000</option>
                        <option value="$10k+">$10,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9BAAB7] mb-1.5 font-medium">
                      Project Brief
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tell me a bit about your brand, timeline, and goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#1A1D24] border border-[#2D323E] rounded-xl px-4 py-3 text-sm text-white placeholder-[#5A6372] focus:outline-none focus:border-[#B600A8] transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2 text-xs text-[#8A9AA8]">
                      <Sparkles className="w-4 h-4 text-[#FF8DA1]" />
                      <span>Response time: ~24 hours</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto contact-pill-btn px-8 py-3 rounded-full text-white font-medium uppercase text-xs tracking-widest inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Send Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
