import React from 'react';

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  className = '',
  label = 'Contact Me',
}) => {
  return (
    <button
      id="contact-button"
      onClick={onClick}
      type="button"
      className={`
        inline-flex items-center justify-center
        rounded-full
        text-white font-medium uppercase tracking-widest
        px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
        text-xs sm:text-sm md:text-base
        contact-pill-btn cursor-pointer select-none
        ${className}
      `}
    >
      <span>{label}</span>
    </button>
  );
};

export default ContactButton;
