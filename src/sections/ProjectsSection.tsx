import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';
import { projectsData } from '../data/portfolioData';
import { ProjectData } from '../components/ProjectModal';

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onProjectClick: (project: ProjectData) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onProjectClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scale calculation from spec:
  // targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] sm:h-[90vh] md:h-[95vh] flex items-start justify-center"
    >
      <motion.div
        style={{
          scale,
          top: `calc(5rem + ${index * 28}px)`,
        }}
        className="sticky w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#FFF1EB]/80 bg-[#221007] p-4 sm:p-6 md:p-8 shadow-[0_20px_50px_rgba(20,8,3,0.85)] z-10 overflow-hidden"
      >
        {/* Card Layout: Top row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-[#FFF1EB]/20">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Number (huge, same style as services) */}
            <span
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
              className="font-black text-[#FFF1EB] leading-none select-none tracking-tighter"
            >
              {project.number}
            </span>

            {/* Category label and project name */}
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#FFA526] font-medium">
                {project.category} ({project.clientType})
              </span>
              <h3
                style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.2rem)' }}
                className="font-medium uppercase tracking-tight text-white"
              >
                {project.name}
              </h3>
            </div>
          </div>

          {/* Live Project ghost button */}
          <div className="self-start sm:self-auto">
            <LiveProjectButton
              onClick={() => onProjectClick(project)}
              label="Live Project"
            />
          </div>
        </div>

        {/* Card Layout: Bottom row - Two-column image grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 pt-5 sm:pt-6">
          {/* Left column (40% width / 5 cols) has 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-3 sm:gap-4">
            {/* Left top image: clamp(130px, 16vw, 230px) */}
            <div
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
              className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-[#16181F] border border-[#262B38]"
            >
              <img
                src={project.images.top}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Left bottom image: clamp(160px, 22vw, 340px) */}
            <div
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
              className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-[#16181F] border border-[#262B38]"
            >
              <img
                src={project.images.bottom}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right column (60% width / 7 cols) has 1 tall image */}
          <div className="md:col-span-7 flex">
            <div
              style={{ minHeight: 'clamp(260px, 36vw, 580px)' }}
              className="w-full h-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden bg-[#16181F] border border-[#262B38]"
            >
              <img
                src={project.images.right}
                alt={`${project.name} preview 3`}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onProjectClick: (project: ProjectData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onProjectClick }) => {
  return (
    <section
      id="projects"
      className="relative w-full bg-[#1A0C05] text-[#FFF1EB] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-28 md:pt-36 pb-32 px-4 sm:px-6 md:px-10 z-10"
    >
      {/* Heading: Project (singular) using .hero-heading gradient */}
      <FadeIn delay={0} y={40} className="text-center mb-16 sm:mb-20 md:mb-28">
        <h2
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          className="hero-heading font-black uppercase leading-none tracking-tight select-none"
        >
          Project
        </h2>
      </FadeIn>

      {/* 3 Sticky-Stacking Project Cards */}
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={projectsData.length}
            onProjectClick={onProjectClick}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
