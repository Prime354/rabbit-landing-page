import React, { useEffect, useRef, useState } from 'react';
import { marqueeTiles, MarqueeTile } from '../data/portfolioData';

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  // Row 1: first 11 images, tripled
  const row1Original = marqueeTiles.slice(0, 11);
  const row1Tiles = [...row1Original, ...row1Original, ...row1Original];

  // Row 2: remaining 10 images, tripled
  const row2Original = marqueeTiles.slice(11, 21);
  const row2Tiles = [...row2Original, ...row2Original, ...row2Original];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            // Scroll offset formula from spec:
            // (window.scrollY - sectionTop + window.innerHeight) * 0.3
            const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setScrollOffset(offset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Calculate initial position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const row1Translate = scrollOffset - 200;
  const row2Translate = -(scrollOffset - 200);

  const renderTile = (tile: MarqueeTile, index: number) => (
    <div
      key={`${tile.id}-${index}`}
      className="relative flex-shrink-0 w-[300px] h-[190px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] rounded-2xl overflow-hidden group bg-[#261208] border border-[#47220F]/70 select-none shadow-lg"
    >
      <img
        src={tile.image}
        alt={tile.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Subtle overlay with label */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#180A04]/90 via-[#180A04]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
        <span className="text-[11px] uppercase font-mono tracking-widest text-[#FFA526]">
          {tile.tag} • {tile.category}
        </span>
        <h4 className="text-white font-medium text-base sm:text-lg uppercase tracking-tight">
          {tile.title}
        </h4>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="relative w-full bg-[#1A0C05] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll */}
        <div
          className="flex gap-3 will-change-transform"
          style={{
            transform: `translateX(${row1Translate}px)`,
            willChange: 'transform',
          }}
        >
          {row1Tiles.map((tile, idx) => renderTile(tile, idx))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div
          className="flex gap-3 will-change-transform"
          style={{
            transform: `translateX(${row2Translate}px)`,
            willChange: 'transform',
          }}
        >
          {row2Tiles.map((tile, idx) => renderTile(tile, idx))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
