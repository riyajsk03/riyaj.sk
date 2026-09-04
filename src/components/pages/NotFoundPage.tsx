import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Compass, Briefcase, Award, Sparkles, Mail, Terminal, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../Breadcrumbs';

export const NotFoundPage: React.FC = () => {
  const { setActivePage, setIsTerminalOpen } = usePortfolio();

  const suggestedPages = [
    { id: 'home' as const, label: 'Overview', desc: 'Return to the main profile and hero introduction', icon: Compass },
    { id: 'work' as const, label: 'Work & Projects', desc: 'Explore MEHFIL, Zero Cap, and support tooling', icon: Sparkles },
    { id: 'experience' as const, label: 'Experience & Skills', desc: 'Concentrix CSR timeline, triage metrics and tools', icon: Briefcase },
    { id: 'certifications' as const, label: 'Certifications', desc: '26 verified credentials across AI, security and WFM', icon: Award },
    { id: 'contact' as const, label: 'Contact', desc: 'Direct message channels and collaboration inquiries', icon: Mail },
  ];

  return (
    <div className="space-y-12 max-w-3xl mx-auto">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs items={[{ label: '404 Not Found' }]} />

      {/* 2. One Clear Heading & Lead */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] text-xs font-mono text-[var(--accent-red,#ef4444)]">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span>HTTP 404 · RESOURCE_NOT_FOUND</span>
        </div>

        <h1 className="font-display-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.08]">
          404 — Page Not Found
        </h1>

        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
          The requested path could not be located or has moved to a new destination. You can navigate directly to any of the primary sections below, or inspect the environment via the interactive terminal.
        </p>
      </section>

      {/* 3. Suggested Destination Hub */}
      <section className="space-y-4 pt-4 border-t border-[var(--border)]">
        <h2 className="text-xs font-mono tracking-wider text-[var(--text-tertiary)] uppercase">
          Suggested Destinations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestedPages.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className="p-4 rounded-xl editorial-card flex items-start gap-3.5 text-left group hover:border-[var(--border-strong)] transition-all cursor-pointer shadow-xs"
              >
                <div className="p-2 rounded-lg bg-[var(--surface-secondary)] text-[var(--text-primary)] group-hover:bg-[var(--accent-green)] group-hover:text-black transition-colors shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-[var(--text-primary)]">
                    <span>{item.label}</span>
                    <ArrowRight className="w-3 h-3 text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Terminal Fallback Banner */}
      <section className="p-5 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] shrink-0">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">
              Looking for developer details?
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Launch the in-browser interactive terminal to run commands like <code className="font-mono text-[var(--text-primary)]">help</code> or <code className="font-mono text-[var(--text-primary)]">cat riyaj.md</code>.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsTerminalOpen(true)}
          className="btn-primary text-xs shrink-0 cursor-pointer"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Launch terminal_cli</span>
        </button>
      </section>
    </div>
  );
};
