import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Maximize2
} from 'lucide-react';
import { Project } from '../../types';

interface ProjectsScreenProps {
  onNext: () => void;
  onBack: () => void;
  onNavigate: (index: number) => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  onNext,
  onBack,
  onNavigate
}) => {
  const { data, setSelectedProject } = usePortfolio();
  const { projects } = data;

  const [filterCategory, setFilterCategory] = useState<string>('All');
  const categories = ['All', 'AI / Automation', 'Customer Support', 'Full-Stack', 'Security'];

  const filteredProjects =
    filterCategory === 'All'
      ? projects
      : projects.filter((p) => p.category.toLowerCase().includes(filterCategory.toLowerCase()));

  return (
    <div className="w-full flex flex-col justify-between py-1">
      {/* Header */}
      <div className="mb-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold mb-2 bg-[#E15A42]/10 text-[#E15A42] border border-[#E15A42]/30">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>FEATURED WORK // STEP 04</span>
        </div>

        <div className="hero-editorial text-[#1D1818] dark:text-white mb-1">
          Featured<br />Works.
        </div>
        <p className="text-xs sm:text-sm font-normal text-[#1D1818]/80 dark:text-white/80 max-w-lg mb-3">
          AI-driven support agents, healthcare triage workflows, interactive portfolios, and network diagnostics.
        </p>
      </div>

      {/* Filter Tabs in Space Mono */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3">
        {categories.map((cat) => {
          const isActive = filterCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border-2 border-[#1D1818] whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#1D1818] text-white shadow-[2px_2px_0_#E15A42]'
                  : 'bg-white dark:bg-[#201b1b] text-[#1D1818] dark:text-white hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[310px] overflow-y-auto pr-1">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="p-3.5 rounded-2xl border-2 border-[#1D1818] bg-white dark:bg-[#201b1b] shadow-[4px_4px_0_#1D1818] dark:shadow-[4px_4px_0_#E15A42] flex flex-col justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-[#282222] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#E15A42]/15 text-[#E15A42] border border-[#E15A42]/30">
                  {project.category}
                </span>
                <Maximize2 className="w-3.5 h-3.5 opacity-40 hover:opacity-100" />
              </div>
              <h4 className="font-extrabold text-sm text-[#1D1818] dark:text-white mb-1">
                {project.title}
              </h4>
              <p className="text-xs text-[#1D1818]/75 dark:text-white/75 line-clamp-2 leading-relaxed mb-3">
                {project.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1D1818]/10">
              <div className="flex flex-wrap gap-1">
                {(project.tags || []).slice(0, 2).map((t, idx) => (
                  <span key={idx} className="text-[9px] font-mono opacity-60">
                    #{t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {(project.liveUrl || (project as any).demoUrl) && (
                  <a
                    href={project.liveUrl || (project as any).demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded text-xs text-[#E15A42] hover:underline flex items-center gap-1 font-mono font-bold"
                  >
                    <span>Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
