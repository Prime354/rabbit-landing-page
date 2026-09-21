import React from 'react';
import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import {
  ColorSwatchFan,
  DesignPencilIcon,
  LayoutGridRuler,
  BadgeStickers,
} from '../components/AboutDecorations';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const aboutText =
    "With more than five years of experience in visual design, i focus on branding, print, and digital design, i truly enjoy working with businesses that aim to stand out and tell their story visually. Let's create something unforgettable together!";

  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#1A0C05] flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* 4 Decorative Corner Icons with FadeIn */}
      {/* Top-Left: Color Swatch Fan */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none z-10">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <ColorSwatchFan />
        </FadeIn>
      </div>

      {/* Bottom-Left: Pencil / Brush */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none z-10">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <DesignPencilIcon />
        </FadeIn>
      </div>

      {/* Top-Right: Ruler + Grid Blueprint */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none z-10">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <LayoutGridRuler />
        </FadeIn>
      </div>

      {/* Bottom-Right: Sticker Badges Stack */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none z-10">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <BadgeStickers />
        </FadeIn>
      </div>

      {/* Central Content */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight select-none"
          >
            About me
          </h2>
        </FadeIn>

        {/* Gap between heading & text: gap-10 sm:gap-14 md:gap-16 */}
        <div className="h-10 sm:h-14 md:h-16" />

        {/* Animated Character-by-Character Paragraph */}
        <div className="max-w-[560px] px-4">
          <AnimatedText
            text={aboutText}
            className="text-[#FFF1EB] font-medium leading-relaxed"
          />
        </div>

        {/* Gap between text block & button: gap-16 sm:gap-20 md:gap-24 */}
        <div className="h-16 sm:h-20 md:h-24" />

        {/* Contact button below */}
        <FadeIn delay={0.2} y={20}>
          <ContactButton onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
