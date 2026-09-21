import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface LiveProjectButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
  label?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  onClick,
  href,
  className = '',
  label = 'Live Project',
}) => {
  const content = (
    <>
      <span>{label}</span>
      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );

  const baseClasses = `
    group inline-flex items-center justify-center gap-2
    rounded-full border-2 border-[#FFF1EB]
    text-[#FFF1EB] font-medium uppercase tracking-widest
    px-6 py-2.5 sm:px-10 sm:py-3.5
    text-xs sm:text-sm md:text-base
    transition-all duration-300 hover:bg-[#FF6418]/15 hover:border-[#FFA526]
    cursor-pointer select-none
    ${className}
  `;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClasses}
    >
      {content}
    </button>
  );
};

export default LiveProjectButton;
