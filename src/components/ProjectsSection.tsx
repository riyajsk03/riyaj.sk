import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Code,
  Search,
  ExternalLink,
  Github,
  Tag,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { data, theme, setSelectedProject } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    data.projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set)];
  }, [data.projects]);

  // Filter projects by search query and tag
  const filteredProjects = useMemo(() => {
    return data.projects.filter((project) => {
      const matchesTag =
        selectedTag === 'All' || project.tags.includes(selectedTag);
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTag && matchesSearch;
    });
  }, [data.projects, selectedTag, searchQuery]);

  return (
    <section
      id="projects"
      className={`py-20 border-t transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-neutral-950/40 border-neutral-800 text-neutral-100'
          : 'bg-neutral-50/50 border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
              <Code className="w-3.5 h-3.5" />
              <span>04 — Project Showcase</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Featured Software &amp; Support Systems
            </h2>
          </div>

          <p className="text-xs font-mono text-neutral-400 max-w-sm md:text-right">
            GenZ Vibe Coder solutions bridging frontend web tech with high-throughput customer support workflows.
          </p>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Instant Search Bar */}
            <div
              className={`relative flex-1 rounded-2xl border px-3.5 py-2.5 flex items-center gap-2.5 transition-colors ${
                theme === 'dark'
                  ? 'bg-neutral-900/80 border-neutral-800 focus-within:border-cyan-500'
                  : 'bg-white border-neutral-300 focus-within:border-cyan-500 shadow-sm'
              }`}
            >
              <Search className="w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, keyword, or tech stack..."
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-sans placeholder:text-neutral-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-mono text-neutral-500 hover:text-neutral-300"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results Count Badge */}
            <div className="text-xs font-mono text-neutral-400 self-center">
              Showing <span className="text-cyan-400 font-bold">{filteredProjects.length}</span> of {data.projects.length}
            </div>
          </div>

          {/* Quick Tag Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  selectedTag === tag
                    ? 'bg-cyan-500 text-neutral-950 font-bold shadow-md shadow-cyan-500/20'
                    : theme === 'dark'
                    ? 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900 shadow-sm'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`group rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col ${
                theme === 'dark'
                  ? 'bg-neutral-900/60 border-neutral-800 hover:border-cyan-500/40'
                  : 'bg-white border-neutral-200 hover:border-cyan-500/50 shadow-md'
              }`}
            >
              {/* Project Image Preview */}
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                <img
                  src={project.image}
                  alt={`${project.title} — ${project.tagline || project.category} interface preview`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-neutral-950/80 backdrop-blur-md border border-neutral-700 text-cyan-400 font-semibold">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold mb-1 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-amber-500 font-medium mb-3">
                    {project.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights && (
                    <ul className="space-y-1.5 mb-5 text-xs text-neutral-400 font-sans">
                      {project.highlights.map((hl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-mono">›</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-neutral-800/60">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-neutral-800/60 text-neutral-300 border border-neutral-700/50"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-xl border text-neutral-300 hover:text-white transition-colors ${
                          theme === 'dark'
                            ? 'bg-neutral-800 border-neutral-700 hover:border-neutral-500'
                            : 'bg-neutral-100 border-neutral-300 hover:border-neutral-400'
                        }`}
                        title="View Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className={`px-3 py-2 rounded-xl border text-xs font-mono transition-colors ${
                        theme === 'dark'
                          ? 'bg-neutral-800/80 border-neutral-700 text-neutral-300 hover:text-cyan-400 hover:border-cyan-500'
                          : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:text-cyan-600 hover:border-cyan-500'
                      }`}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="p-12 text-center rounded-3xl border border-dashed border-neutral-800 text-neutral-500 font-mono text-sm">
            No projects matched your search query &quot;{searchQuery}&quot;. Try a different keyword or tag.
          </div>
        )}
      </div>
    </section>
  );
};
