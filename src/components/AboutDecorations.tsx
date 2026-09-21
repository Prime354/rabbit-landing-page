import React from 'react';
import { motion } from 'framer-motion';

// Top-left: Color palette / paint swatch fan icon
export const ColorSwatchFan: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      animate={{ rotate: [-2, 3, -2], y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className={`select-none pointer-events-none filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] ${className}`}
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <defs>
          <filter id="swatchShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>
        {/* Fan strip 1: Magenta / Pink */}
        <g transform="rotate(-35 100 160)" filter="url(#swatchShadow)">
          <rect x="82" y="25" width="36" height="135" rx="10" fill="#B600A8" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="86" y="32" width="28" height="40" rx="4" fill="#FF8DA1" />
          <rect x="86" y="78" width="28" height="28" rx="4" fill="#E600D4" />
          <circle cx="100" cy="148" r="4" fill="#FFFFFF" />
        </g>
        {/* Fan strip 2: Violet / Blue */}
        <g transform="rotate(-10 100 160)" filter="url(#swatchShadow)">
          <rect x="82" y="20" width="36" height="140" rx="10" fill="#7621B0" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="86" y="28" width="28" height="40" rx="4" fill="#BBCCD7" />
          <rect x="86" y="74" width="28" height="28" rx="4" fill="#4B0082" />
          <circle cx="100" cy="148" r="4" fill="#FFFFFF" />
        </g>
        {/* Fan strip 3: Orange / Gold */}
        <g transform="rotate(18 100 160)" filter="url(#swatchShadow)">
          <rect x="82" y="25" width="36" height="135" rx="10" fill="#BE4C00" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="86" y="32" width="28" height="40" rx="4" fill="#FFB03A" />
          <rect x="86" y="78" width="28" height="28" rx="4" fill="#E65100" />
          <circle cx="100" cy="148" r="4" fill="#FFFFFF" />
        </g>
        {/* Swatch Pivot Screw */}
        <circle cx="100" cy="148" r="7" fill="#E0E0E0" stroke="#444" strokeWidth="2" />
        <circle cx="100" cy="148" r="3" fill="#666" />
      </svg>
    </motion.div>
  );
};

// Bottom-left: Pencil or paintbrush 3D icon
export const DesignPencilIcon: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      animate={{ rotate: [4, -4, 4], y: [0, 8, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      className={`select-none pointer-events-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] ${className}`}
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <g transform="rotate(38 100 100)">
          {/* Pencil Body with multi-facet shading */}
          <rect x="82" y="40" width="12" height="110" fill="#FFC83B" />
          <rect x="94" y="40" width="12" height="110" fill="#FFA500" />
          <rect x="106" y="40" width="12" height="110" fill="#E08500" />
          
          {/* Metal ferrule */}
          <rect x="82" y="145" width="36" height="20" fill="#C5CCD6" stroke="#939DA8" strokeWidth="1.5" />
          <line x1="82" y1="152" x2="118" y2="152" stroke="#687380" strokeWidth="1.5" />
          <line x1="82" y1="158" x2="118" y2="158" stroke="#687380" strokeWidth="1.5" />

          {/* Eraser */}
          <path d="M82 165 C82 178 118 178 118 165 Z" fill="#FF8DA1" />

          {/* Sharpened wood cone */}
          <polygon points="82,40 118,40 100,10" fill="#E8D1A7" stroke="#D1B683" strokeWidth="1" />
          {/* Graphite tip */}
          <polygon points="94,20 106,20 100,10" fill="#2D3139" />

          {/* Golden embossed branding line */}
          <line x1="90" y1="60" x2="90" y2="120" stroke="#FFF5CC" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        </g>
      </svg>
    </motion.div>
  );
};

// Top-right: Ruler + grid/layout icon
export const LayoutGridRuler: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      animate={{ rotate: [-3, 3, -3], y: [0, -5, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      className={`select-none pointer-events-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] ${className}`}
    >
      <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Drafting layout grid board */}
        <rect x="25" y="25" width="160" height="120" rx="14" fill="#181B22" stroke="#373D4D" strokeWidth="2.5" />
        
        {/* Subtle cyan blueprint lines */}
        <line x1="45" y1="25" x2="45" y2="145" stroke="#00F0FF" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
        <line x1="85" y1="25" x2="85" y2="145" stroke="#00F0FF" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
        <line x1="125" y1="25" x2="125" y2="145" stroke="#00F0FF" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
        <line x1="165" y1="25" x2="165" y2="145" stroke="#00F0FF" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
        <line x1="25" y1="65" x2="185" y2="65" stroke="#00F0FF" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
        <line x1="25" y1="105" x2="185" y2="105" stroke="#00F0FF" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />

        {/* Framing bounding boxes */}
        <rect x="45" y="45" width="55" height="40" rx="4" fill="#B600A8" fillOpacity="0.2" stroke="#B600A8" strokeWidth="1.5" />
        <rect x="110" y="45" width="55" height="60" rx="4" fill="#7621B0" fillOpacity="0.2" stroke="#7621B0" strokeWidth="1.5" />

        {/* Angled Triangular Ruler */}
        <g transform="rotate(18 120 110)">
          <polygon points="60,150 180,150 60,70" fill="#E8EDF2" stroke="#9FB0C0" strokeWidth="2" />
          <polygon points="75,140 145,140 75,95" fill="#181B22" />
          {/* Measurement tick marks */}
          <line x1="70" y1="150" x2="70" y2="144" stroke="#485361" strokeWidth="1.5" />
          <line x1="80" y1="150" x2="80" y2="146" stroke="#485361" strokeWidth="1" />
          <line x1="90" y1="150" x2="90" y2="144" stroke="#485361" strokeWidth="1.5" />
          <line x1="100" y1="150" x2="100" y2="146" stroke="#485361" strokeWidth="1" />
          <line x1="110" y1="150" x2="110" y2="144" stroke="#485361" strokeWidth="1.5" />
          <line x1="120" y1="150" x2="120" y2="146" stroke="#485361" strokeWidth="1" />
          <line x1="130" y1="150" x2="130" y2="144" stroke="#485361" strokeWidth="1.5" />
          <line x1="140" y1="150" x2="140" y2="146" stroke="#485361" strokeWidth="1" />
          <line x1="150" y1="150" x2="150" y2="144" stroke="#485361" strokeWidth="1.5" />
        </g>
      </svg>
    </motion.div>
  );
};

// Bottom-right: Stack of sticker/badge shapes
export const BadgeStickers: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      animate={{ rotate: [2, -3, 2], y: [0, -6, 0] }}
      transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
      className={`select-none pointer-events-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] ${className}`}
    >
      <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Badge 1 (bottom): Neon Starburst badge */}
        <g transform="rotate(-15 70 120)">
          <path
            d="M70 70 L78 85 L95 80 L92 98 L108 104 L98 118 L108 132 L92 138 L95 156 L78 151 L70 166 L62 151 L45 156 L48 138 L32 132 L42 118 L32 104 L48 98 L45 80 L62 85 Z"
            fill="#FF4081"
            stroke="#FFFFFF"
            strokeWidth="3"
          />
          <text x="70" y="123" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900" fontFamily="sans-serif">
            BOLD
          </text>
        </g>

        {/* Badge 2 (middle): Pill Sticker */}
        <g transform="rotate(16 130 90)">
          <rect x="80" y="70" width="105" height="48" rx="24" fill="#BBCCD7" stroke="#FFFFFF" strokeWidth="3" />
          <circle cx="98" cy="94" r="8" fill="#B600A8" />
          <text x="140" y="99" textAnchor="middle" fill="#0C0C0C" fontSize="13" fontWeight="900" fontFamily="sans-serif">
            STUDIO
          </text>
        </g>

        {/* Badge 3 (top): Holographic Smiley/Heart Sticker */}
        <g transform="rotate(-4 120 140)">
          <circle cx="120" cy="140" r="32" fill="#BE4C00" stroke="#FFFFFF" strokeWidth="3.5" />
          <circle cx="120" cy="140" r="26" fill="#FFA726" />
          {/* Cute face on sticker */}
          <circle cx="111" cy="134" r="3.5" fill="#18011F" />
          <circle cx="129" cy="134" r="3.5" fill="#18011F" />
          <path d="M112 145 C116 153 124 153 128 145" stroke="#18011F" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    </motion.div>
  );
};
