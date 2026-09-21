import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import ContactButton from './ContactButton';

interface FooterProps {
  onContactClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative w-full bg-[#1A0C05] text-[#FFF1EB] px-6 md:px-12 py-16 sm:py-20 border-t border-[#3B1C0E] overflow-hidden select-none">
      {/* Subtle bottom carrot glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#FF6418]/15 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-10">
        {/* Callout */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#261208] border border-[#4D230F] text-xs uppercase tracking-widest text-[#FFA526]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Have an idea in mind? 🥕</span>
          </div>
          <h3 className="hero-heading font-black uppercase text-3xl sm:text-5xl md:text-6xl tracking-tight leading-none">
            Let&apos;s Create Something Unforgettable
          </h3>
          <p className="text-[#E0CFCA] text-sm sm:text-base font-light max-w-lg mx-auto">
            Available for brand identities, bespoke print collateral, and digital systems worldwide.
          </p>
        </div>

        {/* Contact CTA */}
        <div>
          <ContactButton onClick={onContactClick} label="Get In Touch" />
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium uppercase tracking-widest text-[#FFF1EB]">
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFA526] hover:underline underline-offset-4 decoration-[#FF6418] transition-colors"
          >
            Dribbble
          </a>
          <a
            href="https://behance.net"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFA526] hover:underline underline-offset-4 decoration-[#FF6418] transition-colors"
          >
            Behance
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFA526] hover:underline underline-offset-4 decoration-[#FF6418] transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFA526] hover:underline underline-offset-4 decoration-[#FF6418] transition-colors"
          >
            LinkedIn
          </a>
        </div>

        {/* Bottom copyright & Back to top */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between pt-10 border-t border-[#3B1C0E] text-xs text-[#BAA399] gap-4">
          <p>© {new Date().getFullYear()} Prime — Graphic Designer. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 hover:text-[#FFA526] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <div className="p-1.5 rounded-full bg-[#261208] group-hover:bg-[#3D1D0C] transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
