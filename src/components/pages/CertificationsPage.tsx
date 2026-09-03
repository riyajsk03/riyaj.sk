import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Check } from 'lucide-react';
import { TiltCard } from '../TiltCard';

export const CertificationsPage: React.FC = () => {
  const { data } = usePortfolio();

  const aiTraining = [
    { title: 'AI Fundamentals', date: 'Jan 2026', provider: 'NextWave' },
    { title: 'Robotic Process Automation (RPA)', date: 'Mar 2026', provider: 'NextWave' },
    { title: 'Conversational AI Architecture', date: 'Mar 2026', provider: 'NextWave' },
    { title: 'Generative AI Applications', date: 'Mar 2026', provider: 'NextWave' },
    { title: 'Agentic AI Workflow Design', date: 'Mar 2026', provider: 'NextWave' },
    { title: 'Digital Marketing with AI', date: 'Jul 2024', provider: 'IIDE' },
  ];

  const securityCerts = [
    { title: 'Fraud, Waste & Abuse Compliance (2024)', date: 'Jan 2026' },
    { title: 'Fraud, Waste & Abuse Compliance (2026)', date: 'Feb 2026' },
    { title: 'Global Security – Social Engineering Prevention', date: 'Jan 2026' },
    { title: 'Annual InfoSec & Data Privacy Standards', date: 'Jan 2026' },
  ];

  const toolsCerts = [
    { title: 'ConnectCX – User Operations & Queues', date: 'Nov 2025' },
    { title: 'WorkforceCX WFM Scheduling & Shift Management', date: 'Jan 2026' },
    { title: 'Diversity, Equity & Workplace Inclusion', date: 'Jan 2026' },
    { title: 'Excel Essential Training (Office 365)', date: 'Feb 2026' },
  ];

  const languages = [
    {
      lang: 'English',
      level: 'Professional Working Proficiency',
      detail: 'Full fluency in written chat support, corporate email triage, and verbal phone resolution.'
    },
    {
      lang: 'Hindi',
      level: 'Native Fluency',
      detail: 'Daily fluent communication with customers across North, Central, and Western India.'
    },
    {
      lang: 'Bengali',
      level: 'Mother Tongue',
      detail: 'Native bilingual mastery in conversational nuance, cultural context, and written syntax.'
    }
  ];

  return (
    <div className="space-y-16 md:space-y-20">
      {/* 1. Page Header */}
      <section className="space-y-3 max-w-3xl">
        <span className="font-eyebrow text-[11px] font-bold tracking-[0.18em] text-[var(--text-tertiary)] uppercase block">
          Credentials &amp; Standards
        </span>
        <h1 className="font-display-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.08]">
          Certifications &amp; Training
        </h1>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
          Formal credentials in enterprise security, compliance, customer support operations, and emerging AI.
        </p>
      </section>

      {/* 2. Overview Stat Card — Restrained, Monochromatic */}
      <section className="editorial-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
              Concentrix University &amp; External Programs
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-medium text-[var(--text-primary)]">
            26 Verified Professional Certifications
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Covering annual InfoSec, customer privacy, operational WFM, and applied generative automation.
          </p>
        </div>

        <div className="text-4xl sm:text-5xl font-mono font-semibold text-[var(--text-primary)] shrink-0 border-l border-[var(--border)] sm:pl-8">
          26
        </div>
      </section>

      {/* 3. Emerging AI & Automation Grid */}
      <section className="space-y-6 pt-6 border-t border-[var(--border)]">
        <span className="text-xs font-mono tracking-wider text-[var(--text-tertiary)] uppercase block">
          Applied AI &amp; Automation Training
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiTraining.map((ai) => (
            <TiltCard
              key={ai.title}
              depthIntensity={8}
              className="editorial-card p-5 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[var(--text-tertiary)] block">
                  {ai.provider}
                </span>
                <h3 className="text-sm font-medium text-[var(--text-primary)] leading-snug">
                  {ai.title}
                </h3>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[var(--border)] text-xs font-mono text-[var(--text-tertiary)]">
                <span>Verified</span>
                <span>{ai.date}</span>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 4. Security & Enterprise Compliance Grids */}
      <section className="space-y-6 pt-6 border-t border-[var(--border)]">
        <span className="text-xs font-mono tracking-wider text-[var(--text-tertiary)] uppercase block">
          Enterprise Systems &amp; Compliance Standards
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Security */}
          <div className="editorial-card p-6 space-y-4">
            <h3 className="text-sm font-medium text-[var(--text-primary)] pb-2 border-b border-[var(--border)]">
              Security &amp; Regulatory Compliance
            </h3>
            <ul className="space-y-3">
              {securityCerts.map((c) => (
                <li key={c.title} className="flex items-start justify-between gap-3 text-xs leading-relaxed">
                  <span className="text-[var(--text-secondary)]">{c.title}</span>
                  <span className="font-mono text-[var(--text-tertiary)] shrink-0">{c.date}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Culture */}
          <div className="editorial-card p-6 space-y-4">
            <h3 className="text-sm font-medium text-[var(--text-primary)] pb-2 border-b border-[var(--border)]">
              Operations &amp; Workforce Management
            </h3>
            <ul className="space-y-3">
              {toolsCerts.map((c) => (
                <li key={c.title} className="flex items-start justify-between gap-3 text-xs leading-relaxed">
                  <span className="text-[var(--text-secondary)]">{c.title}</span>
                  <span className="font-mono text-[var(--text-tertiary)] shrink-0">{c.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Multilingual Fluency */}
      <section className="space-y-6 pt-6 border-t border-[var(--border)]">
        <span className="text-xs font-mono tracking-wider text-[var(--text-tertiary)] uppercase block">
          Language Proficiencies
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {languages.map((l) => (
            <div key={l.lang} className="editorial-card p-6 space-y-3">
              <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-2">
                <span className="text-base font-medium text-[var(--text-primary)]">{l.lang}</span>
                <span className="text-[11px] font-mono text-[var(--accent-green)]">Verified</span>
              </div>
              <div className="text-xs font-mono text-[var(--text-secondary)]">{l.level}</div>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                {l.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
