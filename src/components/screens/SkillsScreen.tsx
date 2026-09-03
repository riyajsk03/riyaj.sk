import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Sparkles,
  ShieldCheck,
  Headphones,
  Wrench,
  Cpu
} from 'lucide-react';

interface SkillsScreenProps {
  onNext: () => void;
  onBack: () => void;
  onNavigate: (index: number) => void;
}

export const SkillsScreen: React.FC<SkillsScreenProps> = ({
  onNext,
  onBack,
  onNavigate
}) => {
  const { data } = usePortfolio();
  const { skills } = data;

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Stack' },
    { id: 'core', label: 'Operations & CRM' },
    { id: 'ai', label: 'GenAI & Prompts' },
    { id: 'security', label: 'Cybersecurity' },
    { id: 'tool', label: 'Developer Tools' }
  ];

  const filteredSkills =
    activeCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <div className="w-full flex flex-col justify-between py-1">
      {/* Header */}
      <div className="mb-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold mb-2 bg-[#E15A42]/10 text-[#E15A42] border border-[#E15A42]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SKILLS ARSENAL // STEP 03</span>
        </div>

        <div className="hero-editorial text-[#1D1818] dark:text-white mb-1">
          Skills<br />Arsenal.
        </div>
        <p className="text-xs sm:text-sm font-normal text-[#1D1818]/80 dark:text-white/80 max-w-lg mb-3">
          Multi-channel chat triage, generative AI prompt workflows, cybersecurity defense, and modern development.
        </p>
      </div>

      {/* Category Pills in Space Mono */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3">
        {categories.map((c) => {
          const isActive = activeCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border-2 border-[#1D1818] whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#1D1818] text-white shadow-[2px_2px_0_#E15A42]'
                  : 'bg-white dark:bg-[#201b1b] text-[#1D1818] dark:text-white hover:bg-slate-50'
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="p-3 rounded-xl border-2 border-[#1D1818] bg-white dark:bg-[#201b1b] shadow-[3px_3px_0_#1D1818] dark:shadow-[3px_3px_0_#E15A42] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-[#1D1818] dark:text-white">
                {skill.name}
              </span>
              <span className="text-[11px] font-mono font-extrabold text-[#E15A42]">
                {skill.percentage ?? (skill as any).level ?? 90}%
              </span>
            </div>

            {/* Custom 2px bordered progress meter */}
            <div className="w-full h-2 rounded-full border border-[#1D1818] bg-[#F8F7F4] dark:bg-[#141212] overflow-hidden">
              <div
                className="h-full bg-[#E15A42]"
                style={{ width: `${skill.percentage ?? (skill as any).level ?? 90}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
