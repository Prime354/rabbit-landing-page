import React, { useState } from 'react';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactModal from './components/ContactModal';
import ProjectModal, { ProjectData } from './components/ProjectModal';
import Footer from './components/Footer';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  const handleProjectClick = (project: ProjectData) => {
    setActiveProject(project);
  };

  const closeProject = () => {
    setActiveProject(null);
  };

  return (
    <div
      className="bg-[#1A0C05] text-[#FFF1EB] min-h-screen selection:bg-[#FF6418] selection:text-white"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. HERO SECTION */}
      <HeroSection onContactClick={openContact} />

      {/* 2. MARQUEE SECTION */}
      <MarqueeSection />

      {/* 3. ABOUT SECTION */}
      <AboutSection onContactClick={openContact} />

      {/* 4. SERVICES SECTION */}
      <ServicesSection />

      {/* 5. PROJECTS SECTION */}
      <ProjectsSection onProjectClick={handleProjectClick} />

      {/* FOOTER */}
      <Footer onContactClick={openContact} />

      {/* Modals */}
      <ContactModal isOpen={isContactOpen} onClose={closeContact} />
      <ProjectModal project={activeProject} onClose={closeProject} />
    </div>
  );
};

export default App;
