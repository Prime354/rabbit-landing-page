import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface RabbitMascot3DProps {
  className?: string;
}

export const RabbitMascot3D: React.FC<RabbitMascot3DProps> = ({ className = '' }) => {
  const [transparentSrc, setTransparentSrc] = useState<string | null>(null);

  useEffect(() => {
    // Process image to remove black background and produce seamless transparent silhouette
    const img = new Image();
    img.src = '/rabbit-3d-bigface.jpg';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const maxVal = Math.max(r, g, b);

          // Deep black background threshold
          if (maxVal < 14) {
            data[i + 3] = 0; // Pure transparent
          } else if (maxVal < 36) {
            // Smooth anti-aliased feathering on fur edges
            data[i + 3] = Math.round(((maxVal - 14) / 22) * 255);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setTransparentSrc(canvas.toDataURL('image/png'));
      } catch (e) {
        console.error('Canvas processing fallback:', e);
      }
    };
  }, []);

  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 1.2, 0, -1.2, 0],
      }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`relative select-none flex flex-col items-center justify-center ${className}`}
    >
      {/* Soft warm carrot & amber ambient glow floating behind character */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-gradient-to-t from-[#FF5E14]/40 via-[#FFA028]/25 to-transparent rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* Floating 3D Big Face Rabbit Mascot with NO background box/border */}
      <div className="relative group w-full flex items-center justify-center">
        <img
          src={transparentSrc || '/rabbit-3d-bigface.jpg'}
          alt="Prime — Cute Big Face 3D Rabbit Mascot holding a Carrot"
          className="w-full h-auto object-contain max-h-[80vh] filter drop-shadow-[0_25px_45px_rgba(20,8,3,0.95)] transform transition-transform duration-500 ease-out group-hover:scale-105"
          style={!transparentSrc ? { mixBlendMode: 'screen' } : undefined}
          draggable={false}
        />
      </div>

      {/* Floating Pill Tag with Carrot Icon */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-2 px-5 py-2 rounded-full bg-[#261106]/90 backdrop-blur-md border border-[#FF7D30]/50 flex items-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
      >
        <span className="text-base animate-bounce">🥕</span>
        <span className="text-xs uppercase tracking-widest font-black text-[#FFF1EB]">
          Prime Mascot
        </span>
      </motion.div>
    </motion.div>
  );
};

export default RabbitMascot3D;
