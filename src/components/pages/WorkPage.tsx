import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Search, ArrowRight, ArrowUpRight, Briefcase, Mail } from 'lucide-react';
import { TiltCard } from '../TiltCard';
import { Breadcrumbs } from '../Breadcrumbs';

export const WorkPage: React.FC = () => {
  const { data, setSelectedProject, setActivePage } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('all');

  const tags = ['all', 'ai-assisted', 'react', 'firebase', 'music', 'radio', 'crm'];

  const filteredProjects = useMemo(() => {
    return data.projects.filter((p) => {
      const tagsStr = (p.tags || []).join(' ').toLowerCase();
      const matchesTag =
        activeTag === 'all' ||
        tagsStr.includes(activeTag.toLowerCase()) ||
        p.category.toLowerCase().includes(activeTag.toLowerCase());

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        tagsStr.includes(q);

      return matchesTag && matchesSearch;
    });
  }, [data.projects, activeTag, searchQuery]);

  return (
    <div className="space-y-12 md:space-y-16">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Work & Projects' }]} />

      {/* 2. Header */}
      <section className="space-y-3 max-w-3xl">
        <span className="font-eyebrow text-[11px] font-bold tracking-[0.18em] text-[var(--text-tertiary)] uppercase block">
          Selected Projects
        </span>
        <h1 className="font-display-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.08]">
          Web Applications &amp; Audio Spaces
        </h1>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
          A showcase of ambient web radios, creative audio environments, and operational support tools.
        </p>
      </section>

      {/* 2. Filter & Search Controls — Monochromatic & Clean */}
      <section className="space-y-4 pt-4 border-t border-[var(--border)]">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-[var(--text-tertiary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, stack, or tag..."
              className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-full pl-9 pr-8 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none focus:border-[var(--border-strong)] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              >
                esc
              </button>
            )}
          </div>

          {/* Tag Filter Pills matching reference capsule design */}
          <div className="flex flex-wrap gap-1.5 items-center">
            {tags.map((tag) => {
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[var(--btn-pill-bg)] text-[var(--btn-pill-text)] shadow-xs font-semibold'
                      : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] border border-[var(--border)]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Project Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <TiltCard
            key={project.id}
            onClick={() => setSelectedProject(project)}
            depthIntensity={7}
            className="editorial-card overflow-hidden flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-2xl"
          >
            {/* Project Image */}
            <div className="aspect-[16/10] w-full overflow-hidden bg-[var(--surface-secondary)] relative border-b border-[var(--border)]">
              <img
                src={project.image}
                alt={`${project.title} — ${project.tagline || project.category} interface screenshot`}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-md bg-[var(--bg)]/90 backdrop-blur-xs text-[var(--text-primary)] text-[10px] font-mono tracking-wider uppercase border border-[var(--border)]">
                {project.category}
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="text-xl font-medium text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors">
                    {project.title}
                  </h2>
                </div>
                <p className="text-xs font-mono text-[var(--text-secondary)]">
                  {project.tagline}
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed pt-1">
                  {project.description}
                </p>
              </div>

              {/* Tags and Action Bar */}
              <div className="space-y-4 pt-3 border-t border-[var(--border)]">
                <div className="flex flex-wrap gap-1.5">
                  {(project.tags || []).slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-sm bg-[var(--surface-secondary)] text-[10px] font-mono text-[var(--text-tertiary)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-medium pt-1">
                  <span className="text-[var(--text-primary)] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>View project breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                  </span>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <span>Live</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </section>

      {filteredProjects.length === 0 && (
        <div className="editorial-card p-12 text-center text-xs font-mono text-[var(--text-tertiary)]">
          No projects match the selected query.
        </div>
      )}

      {/* 4. Internal Links & Connect */}
      <section className="p-6 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Interested in building together or hiring?
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Read professional background and timeline, or reach out directly for full-time customer service roles.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActivePage('experience')}
            className="btn-primary text-xs cursor-pointer flex items-center gap-1.5"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience</span>
          </button>
          <button
            onClick={() => setActivePage('contact')}
            className="btn-secondary text-xs cursor-pointer flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
        </div>
      </section>
    </div>
  );
};
