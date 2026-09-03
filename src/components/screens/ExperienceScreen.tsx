import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Building2,
  MessageSquare
} from 'lucide-react';

interface ExperienceScreenProps {
  onNext: () => void;
  onBack: () => void;
  onNavigate: (index: number) => void;
}

export const ExperienceScreen: React.FC<ExperienceScreenProps> = ({
  onNext,
  onBack,
  onNavigate
}) => {
  const { data, theme } = usePortfolio();
  const { experiences } = data;

  const [selectedExpId, setSelectedExpId] = useState<string>(
    experiences[0]?.id || 'exp-1'
  );

  const activeExp = experiences.find((e) => e.id === selectedExpId) || experiences[0];

  return (
    <div className="w-full flex flex-col justify-between py-1">
      {/* Header */}
      <div className="mb-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold mb-2 bg-[#E15A42]/10 text-[#E15A42] border border-[#E15A42]/30">
          <Briefcase className="w-3.5 h-3.5" />
          <span>WORK HISTORY // STEP 02</span>
        </div>

        <div className="hero-editorial text-[#1D1818] dark:text-white mb-1">
          Work<br />History.
        </div>
        <p className="text-xs sm:text-sm font-normal text-[#1D1818]/80 dark:text-white/80 max-w-lg mb-3">
          2+ Years proven track record across multi-channel BPO, WhatsApp triage, and chat operations.
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3.5">
        {experiences.map((exp) => {
          const isSelected = exp.id === selectedExpId;
          return (
            <button
              key={exp.id}
              onClick={() => setSelectedExpId(exp.id)}
              className={`p-3 rounded-xl border-2 border-[#1D1818] text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#1D1818] text-white shadow-[4px_4px_0_#E15A42]'
                  : 'bg-white dark:bg-[#201b1b] text-[#1D1818] dark:text-white shadow-[3px_3px_0_#1D1818] dark:shadow-[3px_3px_0_#E15A42] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs truncate block">{exp.company}</span>
                <span className="text-[10px] font-mono opacity-70 shrink-0">{exp.period}</span>
              </div>
              <p className={`text-[11px] font-mono truncate ${isSelected ? 'text-[#E15A42]' : 'text-slate-500'}`}>
                {exp.role}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Role Deep-Dive Card */}
      {activeExp && (
        <div className="p-4 sm:p-5 rounded-2xl border-2 border-[#1D1818] bg-[#F8F7F4] dark:bg-[#141212] shadow-[5px_5px_0_#1D1818] dark:shadow-[5px_5px_0_#E15A42] mb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 mb-3 border-b border-[#1D1818]/15">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#1D1818] dark:text-white">
                {activeExp.role}
              </h3>
              <p className="text-xs font-mono font-semibold text-[#E15A42]">
                {activeExp.company} · {activeExp.location}
              </p>
            </div>
            <span className="text-[11px] font-mono opacity-60">
              {activeExp.period}
            </span>
          </div>

          {/* Highlights / Bullets */}
          <div className="space-y-1.5 mb-3">
            {(activeExp.bullets || []).slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#1D1818]/85 dark:text-white/85">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E15A42] mt-1.5 shrink-0" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>

          {/* Metrics & Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#1D1818]/10">
            {(activeExp.metrics || []).map((m, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white dark:bg-[#262121] border border-[#1D1818] text-[#1D1818] dark:text-white shadow-[2px_2px_0_#1D1818]"
              >
                {m.value} {m.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
