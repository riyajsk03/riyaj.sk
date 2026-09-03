import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowRight, ArrowUpRight, Sparkles, Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { TiltCard } from '../TiltCard';
import { InteractiveTearSlip } from '../InteractiveTearSlip';
import { PaperTearDivider } from '../PaperTearDivider';

export const HomePage: React.FC = () => {
  const { data, setActivePage, setIsTerminalOpen } = usePortfolio();

  const highlights = [
    {
      tag: 'CURRENT ROLE',
      title: 'Concentrix CSR',
      desc: 'Managing 80% high-volume WhatsApp chat & email queue concurrency alongside 20% outbound resolution with a consistent 98.5% CSAT record.',
      page: 'experience' as const
    },
    {
      tag: 'SELECTED WORK',
      title: 'Web & Audio Spaces',
      desc: 'Crafting atmospheric web experiences including MEHFIL, Zero Cap ambient lofi, and Dhaba Radio 90s audio archive.',
      page: 'work' as const
    },
    {
      tag: 'CREDENTIALS',
      title: '26 Certifications',
      desc: 'Verified certifications across Concentrix University, Robotic Process Automation, Conversational AI, and Annual InfoSec.',
      page: 'certifications' as const
    }
  ];

  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. Hero Section — Editorial Typography & Generous Whitespace */}
      <section className="space-y-8">
        {/* Availability Status & Terminal Launcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--text-secondary)]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] shadow-[0_0_8px_var(--accent-green)]" />
            <span>Available for Frontline Support &amp; Web Opportunities</span>
          </div>

          <button
            onClick={() => setIsTerminalOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--surface-secondary)] border border-[var(--border)] hover:border-[var(--border-strong)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-[11px]"
            title="Open interactive terminal"
          >
            <TerminalIcon className="w-3 h-3" />
            <span>terminal_cli</span>
          </button>
        </div>

        {/* Eyebrow & Primary Headline matching reference typography */}
        <div className="space-y-3 max-w-3xl">
          <span className="font-eyebrow text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-tertiary)] block">
            Frontline Support &amp; Web Craft
          </span>
          <h1 className="font-display-title text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.05]">
            Riyaj Sk
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-[var(--text-primary)] leading-snug">
            Customer Service Representative specialising in high-concurrency chat &amp; triage — building thoughtful web tools.
          </p>
        </div>

        {/* Narrative Paragraph matching reference body font */}
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed font-normal">
          Based in Bangalore with roots in Murshidabad, West Bengal. I combine disciplined BPO customer empathy, multi-chat speed, and rigorous documentation standards with a passion for clean frontend craftsmanship and emerging AI automation.
        </p>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[var(--text-tertiary)] pt-2 border-t border-[var(--border)]">
          <span>Bangalore, India</span>
          <span>·</span>
          <span>2+ Years Experience</span>
          <span>·</span>
          <span>English · Hindi · Bengali</span>
          <span>·</span>
          <span>Concentrix Service India</span>
        </div>

        {/* Primary Action Row - exact capsule pill buttons from reference */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          <button
            onClick={() => setActivePage('contact')}
            className="btn-primary"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActivePage('work')}
            className="btn-secondary group"
          >
            <span className="btn-circle-icon">
              <ArrowRight className="w-3 h-3" />
            </span>
            <span>View selected work</span>
          </button>
          <button
            onClick={() => setActivePage('about')}
            className="btn-outline"
          >
            <span>Background</span>
          </button>
        </div>
      </section>

      {/* 2. Tactile Paper Tear Divider */}
      <div className="relative py-2 -mx-5 sm:-mx-6">
        <PaperTearDivider position="bottom" />
      </div>

      {/* 3. Interactive Paper Tear Slip Showcase — Tactile Physicality & High Level Animation */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--border)] pb-3">
          <div>
            <span className="text-xs font-mono tracking-wider text-[var(--text-tertiary)] uppercase block">
              Interactive Dispatch
            </span>
            <h2 className="text-xl font-medium text-[var(--text-primary)]">
              Perforated Contact &amp; Hotline Slip
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--text-tertiary)]">
            Pull down or tap to detach
          </span>
        </div>

        {/* The Animated Tearable Paper Component */}
        <div className="pt-2">
          <InteractiveTearSlip />
        </div>
      </section>

      {/* 4. Structured Highlights Grid with 3D Depth Tilt & Interactive Sheen */}
      <section className="space-y-6 pt-8 border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono tracking-wider text-[var(--text-tertiary)] uppercase">
            Areas of Focus · 3D Depth
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <TiltCard
              key={item.title}
              onClick={() => setActivePage(item.page)}
              depthIntensity={8}
              className="editorial-card p-6 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl group"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-wider text-[var(--text-tertiary)] block">
                  {item.tag}
                </span>
                <h2 className="text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-medium text-[var(--text-primary)] group-hover:translate-x-1 transition-transform">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3 text-[var(--text-secondary)]" />
              </div>
            </TiltCard>
          ))}
        </div>
      </section>
    </div>
  );
};
