import React from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onContactClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact', isContact: true },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { label: string; href: string; isContact?: boolean }
  ) => {
    if (item.isContact && onContactClick) {
      e.preventDefault();
      onContactClick();
      return;
    }
    const target = document.querySelector(item.href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0 }}
      className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 z-30 select-none"
    >
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={(e) => handleNavClick(e, item)}
          className="text-[#FFF1EB] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-all duration-200 hover:text-[#FFA238] hover:opacity-90 cursor-pointer"
        >
          {item.label}
        </a>
      ))}
    </motion.nav>
  );
};

export default Navbar;
