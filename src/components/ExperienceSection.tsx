import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, Calendar, MapPin, CheckCircle, TrendingUp } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { data, theme } = usePortfolio();

  return (
    <section
      id="experience"
      className={`py-20 border-t transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-neutral-950/60 border-neutral-800 text-neutral-100'
          : 'bg-neutral-50/70 border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5 justify-center sm:justify-start">
              <Briefcase className="w-3.5 h-3.5" />
              <span>02 — Work Experience</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Professional Work History
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-400 max-w-xs text-center sm:text-right">
            2+ Years proven expertise across multi-channel BPO, healthcare support, and operations.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative border-l-2 border-neutral-800 ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-12">
          {data.experiences.map((exp, idx) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform duration-200 group-hover:scale-125 ${
                  exp.current
                    ? 'bg-cyan-500 border-cyan-300 shadow-lg shadow-cyan-500/50'
                    : 'bg-neutral-800 border-neutral-600'
                }`}
              />

              {/* Card Shell */}
              <div
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
                  theme === 'dark'
                    ? 'bg-neutral-900/60 border-neutral-800 hover:border-cyan-500/40'
                    : 'bg-white border-neutral-200 hover:border-cyan-400 shadow-sm'
                }`}
              >
                {/* Role and Organization */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-xl font-bold">{exp.role}</h3>
                      {exp.current && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                          Current Role
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-amber-500 mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Metrics Highlights if any */}
                {exp.metrics && exp.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-4">
                    {exp.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className={`p-2.5 rounded-xl border text-xs font-mono ${
                          theme === 'dark'
                            ? 'bg-neutral-950/60 border-neutral-800/80'
                            : 'bg-neutral-50 border-neutral-200'
                        }`}
                      >
                        <span className="text-[10px] text-neutral-500 block uppercase">
                          {m.label}
                        </span>
                        <span className="text-sm font-bold text-cyan-400">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bullet Points */}
                <ul className="space-y-2 mt-3 text-xs sm:text-sm text-neutral-400">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
