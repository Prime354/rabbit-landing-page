import React from 'react';
import { motion } from 'framer-motion';

interface RabbitMascotProps {
  className?: string;
}

export const RabbitMascot: React.FC<RabbitMascotProps> = ({ className = '' }) => {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className={`relative select-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Soft ethereal ambient glow behind mascot */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#B600A8]/25 via-[#7621B0]/15 to-transparent rounded-full blur-3xl scale-95 pointer-events-none -z-10" />

      <svg
        viewBox="0 0 500 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl overflow-visible"
      >
        <defs>
          {/* Fur Gradients */}
          <linearGradient id="furGradient" x1="250" y1="100" x2="250" y2="480" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F5F3ED" />
            <stop offset="100%" stopColor="#E2DED4" />
          </linearGradient>

          <linearGradient id="furShadow" x1="180" y1="200" x2="320" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ECE6D8" />
            <stop offset="100%" stopColor="#D5CBB9" />
          </linearGradient>

          {/* Ear Inner Pink Gradient */}
          <linearGradient id="earInner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFA6B8" />
            <stop offset="100%" stopColor="#FFC5CE" />
          </linearGradient>

          {/* Beret Gradient */}
          <linearGradient id="beretGradient" x1="150" y1="120" x2="350" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E600D4" />
            <stop offset="35%" stopColor="#B600A8" />
            <stop offset="75%" stopColor="#7621B0" />
            <stop offset="100%" stopColor="#4A1075" />
          </linearGradient>

          {/* Paintbrush Wood Gradient */}
          <linearGradient id="woodGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D89254" />
            <stop offset="50%" stopColor="#B46E33" />
            <stop offset="100%" stopColor="#8A4A19" />
          </linearGradient>

          {/* Glowing Paint Tip */}
          <linearGradient id="paintTip" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#7621B0" />
          </linearGradient>

          {/* Soft Drop Shadow Filter */}
          <filter id="softGaze" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* --- EARS --- */}
        {/* Left Ear Outer */}
        <path
          d="M175 220 C135 150 110 50 160 20 C200 -5 225 60 215 170 Z"
          fill="url(#furGradient)"
          stroke="#D0C7B6"
          strokeWidth="2"
        />
        {/* Left Ear Inner */}
        <path
          d="M170 190 C145 130 130 65 162 42 C188 25 198 80 195 160 Z"
          fill="url(#earInner)"
          opacity="0.85"
        />

        {/* Right Ear Outer (playful tilt) */}
        <path
          d="M320 220 C365 140 395 40 345 15 C305 -5 275 60 290 170 Z"
          fill="url(#furGradient)"
          stroke="#D0C7B6"
          strokeWidth="2"
        />
        {/* Right Ear Inner */}
        <path
          d="M325 190 C355 130 370 60 338 38 C312 20 300 80 305 160 Z"
          fill="url(#earInner)"
          opacity="0.85"
        />

        {/* --- BODY / TORSO --- */}
        <ellipse cx="250" cy="440" rx="145" ry="115" fill="url(#furShadow)" />
        <ellipse cx="250" cy="430" rx="135" ry="105" fill="url(#furGradient)" />

        {/* Artist Apron / Collar accent */}
        <path
          d="M185 410 C215 440 285 440 315 410 C300 480 200 480 185 410 Z"
          fill="#1C212D"
          stroke="#363F52"
          strokeWidth="2"
        />
        <circle cx="250" cy="445" r="4" fill="#B600A8" />
        <circle cx="250" cy="465" r="4" fill="#FF8DA1" />

        {/* --- HEAD --- */}
        <ellipse cx="250" cy="275" rx="140" ry="125" fill="url(#furGradient)" />

        {/* --- ARTIST BERET --- */}
        <g filter="url(#softGaze)">
          {/* Beret main puff */}
          <path
            d="M140 190 C120 120 210 90 310 95 C380 100 410 145 365 185 C320 220 180 225 140 190 Z"
            fill="url(#beretGradient)"
          />
          {/* Beret top stem / tassel */}
          <path
            d="M265 95 C265 80 275 75 275 68 C275 64 268 64 268 68 C265 75 258 85 260 96 Z"
            fill="#FFA6B8"
          />
          {/* Beret band rim */}
          <path
            d="M148 185 C200 170 300 170 355 180 C340 195 295 198 160 194 Z"
            fill="#58147E"
          />
          {/* Cute designer enamel pin on beret */}
          <circle cx="180" cy="175" r="8" fill="#FFCF00" stroke="#FFFFFF" strokeWidth="2" />
          <polygon points="180,170 182,174 187,175 183,178 184,182 180,180 176,182 177,178 173,175 178,174" fill="#B600A8" />
        </g>

        {/* --- CHEEKS (Kawaii Blush) --- */}
        <ellipse cx="170" cy="315" rx="22" ry="12" fill="#FFAAA6" opacity="0.65" />
        <ellipse cx="330" cy="315" rx="22" ry="12" fill="#FFAAA6" opacity="0.65" />

        {/* --- BIG FRIENDLY EYES --- */}
        {/* Left Eye */}
        <g>
          <ellipse cx="195" cy="275" rx="16" ry="22" fill="#181A20" />
          {/* Big highlight */}
          <circle cx="190" cy="265" r="7" fill="#FFFFFF" />
          {/* Mini highlight */}
          <circle cx="201" cy="285" r="3" fill="#FFFFFF" />
          {/* Eye shine reflection */}
          <ellipse cx="195" cy="290" rx="9" ry="3" fill="#3D4457" opacity="0.4" />
        </g>

        {/* Right Eye */}
        <g>
          <ellipse cx="305" cy="275" rx="16" ry="22" fill="#181A20" />
          {/* Big highlight */}
          <circle cx="300" cy="265" r="7" fill="#FFFFFF" />
          {/* Mini highlight */}
          <circle cx="311" cy="285" r="3" fill="#FFFFFF" />
          {/* Eye shine reflection */}
          <ellipse cx="305" cy="290" rx="9" ry="3" fill="#3D4457" opacity="0.4" />
        </g>

        {/* --- NOSE & SMILE --- */}
        {/* Little pink button nose */}
        <path
          d="M244 296 C244 292 256 292 256 296 C256 301 251 306 250 306 C249 306 244 301 244 296 Z"
          fill="#FF7E98"
        />
        {/* W-mouth smile */}
        <path
          d="M236 308 C241 316 248 316 250 310 C252 316 259 316 264 308"
          stroke="#403838"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Cute whiskers */}
        <line x1="140" y1="305" x2="110" y2="300" stroke="#C2B8A8" strokeWidth="2" strokeLinecap="round" />
        <line x1="142" y1="315" x2="108" y2="320" stroke="#C2B8A8" strokeWidth="2" strokeLinecap="round" />
        <line x1="360" y1="305" x2="390" y2="300" stroke="#C2B8A8" strokeWidth="2" strokeLinecap="round" />
        <line x1="358" y1="315" x2="392" y2="320" stroke="#C2B8A8" strokeWidth="2" strokeLinecap="round" />

        {/* --- HANDS & PAINTBRUSH --- */}
        {/* Left cute paw resting */}
        <ellipse cx="165" cy="385" rx="24" ry="18" fill="url(#furGradient)" stroke="#D0C7B6" strokeWidth="1.5" />

        {/* Paintbrush being held by right paw */}
        <g transform="rotate(-28 350 380)">
          {/* Brush Handle */}
          <rect x="340" y="240" width="12" height="180" rx="6" fill="url(#woodGradient)" />
          {/* Silver Ferrule */}
          <rect x="338" y="222" width="16" height="24" rx="2" fill="#D0D7DE" stroke="#8C959F" strokeWidth="1" />
          {/* Bristles */}
          <path
            d="M338 222 C338 200 346 185 346 185 C346 185 354 200 354 222 Z"
            fill="#333333"
          />
          {/* Glowing paint on tip */}
          <path
            d="M341 200 C344 190 346 185 346 185 C346 185 348 190 351 200 C349 205 343 205 341 200 Z"
            fill="url(#paintTip)"
          />
          {/* Paint droplet */}
          <circle cx="346" cy="176" r="3.5" fill="#00F0FF" />
        </g>

        {/* Right paw holding brush */}
        <ellipse cx="330" cy="380" rx="25" ry="20" fill="url(#furGradient)" stroke="#D0C7B6" strokeWidth="1.5" />
        <line x1="324" y1="375" x2="324" y2="388" stroke="#D0C7B6" strokeWidth="2" strokeLinecap="round" />
        <line x1="335" y1="375" x2="335" y2="388" stroke="#D0C7B6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
};

export default RabbitMascot;
