import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ContactButton from '../components/ContactButton';
import Magnet from '../components/Magnet';
import RabbitMascot3D from '../components/RabbitMascot3D';

interface HeroSectionProps {
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  return (
    <header
      id="hero"
      className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#1A0C05]"
    >
      {/* Subtle ambient warm carrot glow in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#FF661A]/20 via-[#FFA238]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-0" />

      {/* 1. Navbar */}
      <Navbar onContactClick={onContactClick} />

      {/* 2. Hero Heading (Massive centered h1: Hi, i'm prime) */}
      <div className="w-full overflow-hidden text-center select-none z-0">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 pointer-events-none"
        >
          Hi, i&apos;m prime
        </motion.h1>
      </div>

      {/* 3. Hero Mascot with Magnet effect (Cute Big Face 3D Rabbit holding carrot, no background) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[300px] sm:w-[390px] md:w-[480px] lg:w-[540px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <RabbitMascot3D />
          </Magnet>
        </motion.div>
      </div>

      {/* 4. Bottom bar */}
      <div className="w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
        {/* Left paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          className="text-[#FFF1EB] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] select-none"
        >
          a graphic designer driven by turning bold ideas into unforgettable visual identities
        </motion.p>

        {/* Right Contact button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ContactButton onClick={onContactClick} />
        </motion.div>
      </div>
    </header>
  );
};

export default HeroSection;
