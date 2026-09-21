import React from 'react';
import { Palette, Printer, Smartphone, PenTool, Type } from 'lucide-react';
import FadeIn from '../components/FadeIn';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

export const ServicesSection: React.FC = () => {
  const services: ServiceItem[] = [
    {
      number: '01',
      name: 'Brand Identity',
      description:
        'Crafting distinct logos, color systems, and brand guidelines that give businesses a clear and memorable voice.',
      icon: Palette,
    },
    {
      number: '02',
      name: 'Print Design',
      description:
        'Designing brochures, packaging, posters, and editorial layouts that look as sharp on paper as they do on screen.',
      icon: Printer,
    },
    {
      number: '03',
      name: 'Digital & Social Design',
      description:
        'Creating scroll-stopping social templates, banners, and digital assets built for engagement across platforms.',
      icon: Smartphone,
    },
    {
      number: '04',
      name: 'Illustration',
      description:
        'Custom illustrations and iconography that add personality and warmth to any brand or product.',
      icon: PenTool,
    },
    {
      number: '05',
      name: 'Typography & Layout',
      description:
        'Thoughtful type pairing and grid-based layouts that balance clarity, hierarchy, and style.',
      icon: Type,
    },
  ];

  return (
    <section
      id="services"
      className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-0"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading: Services */}
        <FadeIn delay={0} y={40} className="text-center mb-16 sm:mb-20 md:mb-28">
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight select-none"
          >
            Services
          </h2>
        </FadeIn>

        {/* 5 Service items in vertical list */}
        <div className="divide-y divide-[rgba(12,12,12,0.15)] border-t border-b border-[rgba(12,12,12,0.15)]">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeIn
                key={service.number}
                delay={index * 0.1}
                y={30}
                className="group py-8 sm:py-10 md:py-12 transition-colors duration-300 hover:bg-[#FFF8F3]"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12">
                  {/* Left: Huge Number */}
                  <div
                    style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                    className="font-black text-[#1A0C05] leading-none select-none tracking-tighter md:w-1/3 flex-shrink-0 group-hover:text-[#FF6418] transition-colors duration-300"
                  >
                    {service.number}
                  </div>

                  {/* Right: Name + Description stacked */}
                  <div className="md:w-2/3 flex flex-col justify-center space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#1A0C05]/5 text-[#1A0C05] group-hover:bg-[#FF6418]/15 group-hover:text-[#FF6418] transition-colors duration-300">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <h3
                        style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                        className="font-medium uppercase tracking-tight text-[#1A0C05]"
                      >
                        {service.name}
                      </h3>
                    </div>

                    <p
                      style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                      className="font-light leading-relaxed max-w-2xl text-[#1A0C05] opacity-65"
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
