import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '../Breadcrumbs';

export const AboutPage: React.FC = () => {
  const { setActivePage } = usePortfolio();

  return (
    <div className="space-y-12 md:space-y-16">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'About' }]} />

      {/* 2. Header & Lead */}
      <section className="space-y-3 max-w-3xl">
        <span className="font-eyebrow text-[11px] font-bold tracking-[0.18em] text-[var(--text-tertiary)] uppercase block">
          Background &amp; Profile
        </span>
        <h1 className="font-display-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.08]">
          Frontline Support &amp; Creative Builder
        </h1>
        <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed font-normal">
          I bridge customer empathy and operational discipline with modern web development.
        </p>
      </section>

      {/* 3. Narrative & Editorial Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-4 border-t border-[var(--border)]">
        {/* Left Column: Narrative */}
        <div className="lg:col-span-8 space-y-6 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          <p>
            My work in customer service began with a foundational principle: every interaction is an opportunity to transform user friction into long-term trust. Over the past two years in high-velocity BPO operations, I have managed frontline communication across demanding omnichannel environments.
          </p>
          <p>
            At <strong className="text-[var(--text-primary)] font-medium">Concentrix Bangalore</strong>, I specialize in WhatsApp chat and email support. Operating at a steady 80% chat volume alongside 20% outbound voice resolution, I consistently maintain a 98.5% customer satisfaction rate while keeping first-response times tightly controlled.
          </p>
          <p>
            Originally from <strong className="text-[var(--text-primary)] font-medium">Murshidabad, West Bengal</strong>, I relocated to Bangalore to expand my professional horizon. Beyond customer service, I actively build web applications, explore Robotic Process Automation, and experiment with audio interfaces like MEHFIL and Zero Cap.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActivePage('experience')}
              className="btn-primary"
            >
              <span>Work experience</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActivePage('work')}
              className="btn-secondary flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore projects</span>
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="btn-secondary"
            >
              <span>Contact me</span>
            </button>
          </div>
        </div>

        {/* Right Column: Key Metrics */}
        <div className="lg:col-span-4 space-y-6">
          <div className="editorial-card p-6 space-y-5">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] block">
              Quick Facts
            </span>

            <div className="space-y-4 text-sm">
              <div className="border-b border-[var(--border)] pb-3">
                <div className="text-2xl font-semibold text-[var(--text-primary)]">2+ Years</div>
                <div className="text-xs text-[var(--text-secondary)] mt-0.5">BPO &amp; Customer Support</div>
              </div>

              <div className="border-b border-[var(--border)] pb-3">
                <div className="text-2xl font-semibold text-[var(--accent-green)]">98.5%</div>
                <div className="text-xs text-[var(--text-secondary)] mt-0.5">Target CSAT Achievement</div>
              </div>

              <div>
                <div className="text-2xl font-semibold text-[var(--text-primary)]">WB → BLR</div>
                <div className="text-xs text-[var(--text-secondary)] mt-0.5">Murshidabad to Bangalore</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Support Principles */}
      <section className="space-y-6 pt-8 border-t border-[var(--border)]">
        <span className="text-xs font-mono tracking-wider text-[var(--text-tertiary)] uppercase block">
          Operating Principles
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="editorial-card p-6 space-y-2.5">
            <div className="text-xs font-mono text-[var(--text-tertiary)]">01</div>
            <h3 className="text-base font-medium text-[var(--text-primary)]">Concurrency with Clarity</h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Handling 3–4 concurrent chat queues simultaneously without sacrificing personalized precision or empathetic tone.
            </p>
          </div>

          <div className="editorial-card p-6 space-y-2.5">
            <div className="text-xs font-mono text-[var(--text-tertiary)]">02</div>
            <h3 className="text-base font-medium text-[var(--text-primary)]">Root-Cause Resolution</h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Going beyond scripted responses to understand user intent, minimizing repeat contacts and ticket escalations.
            </p>
          </div>

          <div className="editorial-card p-6 space-y-2.5">
            <div className="text-xs font-mono text-[var(--text-tertiary)]">03</div>
            <h3 className="text-base font-medium text-[var(--text-primary)]">System Documentation</h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Maintaining thorough, accurate CRM records across Infobip, Avaya, and internal knowledge bases for team alignment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
