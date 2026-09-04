import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Award, Sparkles, Mail, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../Breadcrumbs';

export const ExperiencePage: React.FC = () => {
  const { data, setActivePage } = usePortfolio();

  const coreSkills = [
    { name: 'WhatsApp Chat & Email Support', pct: 99 },
    { name: 'CRM Systems (Infobip, Avaya, Marvin)', pct: 97 },
    { name: 'Data Entry & Digital Documentation', pct: 98 },
    { name: 'Technical Troubleshooting & Hardware', pct: 96 },
    { name: 'MS Office & Excel (365)', pct: 97 },
    { name: 'Data Analytics Fundamentals', pct: 95 }
  ];

  return (
    <div className="space-y-12 md:space-y-16">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Experience & Skills' }]} />

      {/* 2. Page Header */}
      <section className="space-y-4 max-w-3xl">
        <span className="font-eyebrow text-[11px] font-bold tracking-[0.18em] text-[var(--text-tertiary)] uppercase block">
          Career Timeline
        </span>
        <h1 className="font-display-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.08]">
          Work Experience &amp; Skills
        </h1>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
          Detailed breakdown of customer service operations, operational roles, and technical tools.
        </p>
      </section>

      {/* 2. Experience Timeline — Editorial, Clean Dividers */}
      <section className="space-y-10 pt-4 border-t border-[var(--border)]">
        {/* Concentrix Role */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[var(--border)] pb-3">
            <div>
              <h2 className="text-xl font-medium text-[var(--text-primary)]">
                Customer Service Representative
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Concentrix Service India Pvt. Ltd. · Bangalore, Karnataka
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--text-tertiary)] shrink-0">
              Aug 2025 — Present
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border)] space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] block">
                Digital Queue Focus (80%)
              </span>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Handling concurrent live WhatsApp chats and email inquiries with rapid first response, structured macros, and accurate CRM tagging.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border)] space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] block">
                Outbound Resolution (20%)
              </span>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Conducting direct telephone outreach for escalated matters, post-resolution customer check-ins, and complex inquiries to maintain 98.5% CSAT.
              </p>
            </div>
          </div>

          <ul className="space-y-2 pt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed list-disc list-inside marker:text-[var(--text-tertiary)]">
            <li>Consistently achieved quality score audits meeting and exceeding internal SLA benchmarks.</li>
            <li>Collaborated with tier-2 product and operational teams to streamline recurring inquiry paths.</li>
            <li>Maintained meticulous record-keeping across enterprise CRM systems (Infobip and Avaya).</li>
          </ul>
        </div>

        {/* Multi-Service Center Role */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[var(--border)] pb-3">
            <div>
              <h2 className="text-xl font-medium text-[var(--text-primary)]">
                Operations &amp; Technical Assistant
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Multi-Service Center · West Bengal
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--text-tertiary)] shrink-0">
              Jan 2023 — Jan 2025 · 2 yrs
            </span>
          </div>

          <ul className="space-y-2 pt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed list-disc list-inside marker:text-[var(--text-tertiary)]">
            <li>Managed citizen digital documentation, public portal filings, and administrative submissions.</li>
            <li>Provided on-site technical troubleshooting, hardware setup, CCTV installation, and system maintenance.</li>
            <li>Handled daily point-of-sale customer billing, ledger updates, and operational logistics.</li>
          </ul>
        </div>
      </section>

      {/* 3. Core Competencies & Metrics — Restrained Monochromatic Progress */}
      <section className="space-y-6 pt-8 border-t border-[var(--border)]">
        <span className="text-xs font-mono tracking-wider text-[var(--text-tertiary)] uppercase block">
          Skill Distribution &amp; Operational Metrics
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
          {coreSkills.map((s) => (
            <div key={s.name} className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm font-medium text-[var(--text-primary)]">
                <span>{s.name}</span>
                <span className="font-mono text-[var(--text-secondary)]">{s.pct}%</span>
              </div>
              <div className="minimal-meter">
                <div
                  className="minimal-meter-fill"
                  style={{ width: `${s.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Supported Platforms & Software — Restrained Typography */}
      <section className="space-y-4 pt-8 border-t border-[var(--border)]">
        <span className="text-xs font-mono tracking-wider text-[var(--text-tertiary)] uppercase block">
          Enterprise Tools &amp; Environment
        </span>

        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {data.tools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1.5 rounded-md bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--text-secondary)]"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* 5. Internal Links & Next Steps */}
      <section className="p-6 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Explore Credentials &amp; Creative Work
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            View 26 verified certifications across AI and cybersecurity, or check interactive web applications.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActivePage('certifications')}
            className="btn-primary text-xs cursor-pointer flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Certifications</span>
          </button>
          <button
            onClick={() => setActivePage('work')}
            className="btn-secondary text-xs cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Web Work</span>
          </button>
        </div>
      </section>
    </div>
  );
};
