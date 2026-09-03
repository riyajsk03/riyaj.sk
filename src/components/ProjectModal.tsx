import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, ArrowUpRight, Github, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProjectModal: React.FC = () => {
  const { selectedProject, setSelectedProject } = usePortfolio();

  if (!selectedProject) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="w-full max-w-2xl rounded-xl border border-[var(--border-strong)] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col bg-[var(--surface)] text-[var(--text-primary)]"
        >
          {/* Modal Header Bar */}
          <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface-secondary)]">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
                {selectedProject.category}
              </span>
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className="p-1 rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-[var(--surface-secondary)] border border-[var(--border)]">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                {selectedProject.title}
              </h2>
              <p className="text-xs font-mono text-[var(--text-secondary)]">
                {selectedProject.tagline}
              </p>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-1">
                {selectedProject.description}
              </p>
            </div>

            {/* Highlights */}
            {selectedProject.highlights && (
              <div className="p-5 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border)] space-y-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] block">
                  Key Capabilities
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                  {selectedProject.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--accent-green)] mt-0.5"><Check className="w-3.5 h-3.5" /></span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] block">
                Technologies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(selectedProject.tags || []).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-sm text-xs font-mono bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border)]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="px-6 py-4 border-t border-[var(--border)] flex items-center justify-end gap-3 bg-[var(--surface-secondary)]">
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            )}
            {selectedProject.liveUrl && (
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>Launch live site</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
