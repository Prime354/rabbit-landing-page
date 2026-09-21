import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder for exact layout dimensions */}
      <span className="opacity-0 select-none pointer-events-none">{char}</span>
      {/* Scroll-animated visible character */}
      <motion.span style={{ opacity }} className="absolute inset-0 select-none">
        {char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  // Calculate total characters count for uniform distribution
  const totalChars = text.length;

  let globalCharIndex = 0;

  return (
    <p ref={containerRef} className={`text-center leading-relaxed ${className}`}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const startIndex = globalCharIndex;
        globalCharIndex += wordChars.length + 1; // account for space

        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {wordChars.map((char, charIdx) => {
              const currentGlobalIndex = startIndex + charIdx;
              const start = currentGlobalIndex / totalChars;
              const end = Math.min(1, start + 1 / totalChars);

              return (
                <Character
                  key={charIdx}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
            {/* Trailing space between words */}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
