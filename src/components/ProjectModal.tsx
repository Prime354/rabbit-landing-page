import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

export interface ProjectData {
  number: string;
  category: string;
  name: string;
  clientType: string;
  year: string;
  role: string;
  description: string;
  palette: string[];
  deliverables: string[];
  images: {
    top: string;
    bottom: string;
    right: string;
  };
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#210F06] border border-[#4D240E] rounded-[32px] sm:rounded-[44px] shadow-2xl z-10 text-[#FFF1EB] overflow-y-auto"
          >
            {/* Header / Sticky bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between p-6 sm:p-8 bg-[#210F06]/95 backdrop-blur-md border-b border-[#3B1C0E]">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-2xl sm:text-4xl font-black text-[#FFA526]">{project.number}</span>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#D8C6C0]">{project.category} ({project.clientType})</span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">{project.name}</h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-[#2E1509] text-[#FFF1EB] hover:text-white hover:bg-[#451F0D] transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Meta details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#161921] border border-[#222735]">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[#7E8B99]">Client Type</span>
                  <span className="text-sm font-medium text-white">{project.clientType}</span>
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[#7E8B99]">Timeline</span>
                  <span className="text-sm font-medium text-white">{project.year}</span>
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[#7E8B99]">Role</span>
                  <span className="text-sm font-medium text-white">{project.role}</span>
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[#7E8B99]">Category</span>
                  <span className="text-sm font-medium text-white">{project.category}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#9BAAB7] mb-2 font-medium">Project Overview</h4>
                <p className="text-base sm:text-lg text-[#C7D5E0] font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Deliverables & Palette */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[#161921] border border-[#222735]">
                  <h4 className="text-xs uppercase tracking-widest text-[#9BAAB7] mb-3 font-medium">Deliverables</h4>
                  <ul className="space-y-2">
                    {project.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-[#BAC8D4]">
                        <Check className="w-4 h-4 text-[#B600A8] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#161921] border border-[#222735]">
                  <h4 className="text-xs uppercase tracking-widest text-[#9BAAB7] mb-3 font-medium">Brand Palette</h4>
                  <div className="flex flex-wrap gap-3">
                    {project.palette.map((hex, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1.5">
                        <div
                          className="w-12 h-12 rounded-xl border border-white/20 shadow-md"
                          style={{ backgroundColor: hex }}
                        />
                        <span className="text-[11px] font-mono text-[#8C9AA8]">{hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image Showcase */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs uppercase tracking-widest text-[#9BAAB7] font-medium">Gallery Showcase</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <img
                    src={project.images.top}
                    alt={`${project.name} primary preview`}
                    className="w-full h-64 sm:h-80 object-cover rounded-2xl border border-[#262B38]"
                  />
                  <img
                    src={project.images.bottom}
                    alt={`${project.name} secondary detail`}
                    className="w-full h-64 sm:h-80 object-cover rounded-2xl border border-[#262B38]"
                  />
                  <img
                    src={project.images.right}
                    alt={`${project.name} comprehensive showcase`}
                    className="w-full h-72 sm:h-96 object-cover rounded-2xl border border-[#262B38] sm:col-span-2"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
