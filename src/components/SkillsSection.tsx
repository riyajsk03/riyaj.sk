import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Cpu, Shield, Wrench, Sparkles, Heart, Globe2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { data, theme } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'ai' | 'security'>('all');

  const filteredSkills = activeCategory === 'all'
    ? data.skills
    : data.skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className={`py-20 border-t transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-neutral-950 border-neutral-800 text-neutral-100'
          : 'bg-white border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>03 — Core Skills &amp; Stack</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Competencies &amp; Technical Capabilities
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            {[
              { id: 'all', label: 'All' },
              { id: 'core', label: 'Support & Ops' },
              { id: 'ai', label: 'AI & Automation' },
              { id: 'security', label: 'Security & InfoSec' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeCategory === tab.id
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold'
                    : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Meters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mb-16">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="space-y-1.5 group">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-200 font-medium group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </span>
                <span className="text-amber-400 font-bold">{skill.percentage}%</span>
              </div>
              <div
                className={`h-2.5 rounded-full overflow-hidden border ${
                  theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
                }`}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-500 transition-all duration-1000 ease-out"
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* AI & Emerging Technology Callout */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border mb-14 ${
            theme === 'dark'
              ? 'bg-neutral-900/40 border-cyan-800/30'
              : 'bg-cyan-50/50 border-cyan-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI &amp; Emerging Tech Specialization (Next Wave Academy · 2026)</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mb-6 max-w-2xl">
            Certified across Next Wave Academy AI modules — bridging the gap between customer relationship management and automated generative intelligence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: 'Conversational AI', desc: 'Context-aware prompt chains & ticket resolution', date: 'Mar 2026' },
              { title: 'Agentic AI Workflows', desc: 'Autonomous triage & multi-step tool invocation', date: 'Mar 2026' },
              { title: 'Generative AI Deep Dive', desc: 'Dynamic summarization & macro synthesis', date: 'Mar 2026' },
              { title: 'Robotic Process Automation', desc: 'Repetitive transaction & form automation', date: 'Mar 2026' },
              { title: 'AI Fundamentals', desc: 'Neural paradigms & transformer concepts', date: 'Jan 2026' },
              { title: 'Digital Marketing with AI', desc: 'Audience targeting & campaign optimization', date: 'Jul 2024' },
            ].map((aiItem) => (
              <div
                key={aiItem.title}
                className={`p-3.5 rounded-2xl border text-xs font-mono transition-transform hover:-translate-y-1 ${
                  theme === 'dark'
                    ? 'bg-neutral-950/80 border-neutral-800'
                    : 'bg-white border-neutral-200 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-neutral-200">{aiItem.title}</span>
                  <span className="text-[10px] text-cyan-400 font-semibold">{aiItem.date}</span>
                </div>
                <p className="text-neutral-400 text-[11px] font-sans">{aiItem.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Platforms */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">
            <Wrench className="w-3.5 h-3.5 text-amber-500" />
            <span>Enterprise Tools &amp; Platforms</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.tools.map((tool) => (
              <span
                key={tool}
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-cyan-500/50'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:border-cyan-400'
                }`}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Soft Skills & Interpersonal Competencies */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Soft Skills &amp; Interpersonal Excellence</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.softSkills.map((soft) => (
              <span
                key={soft}
                className={`px-3 py-1.5 rounded-xl border text-xs font-sans font-medium transition-all hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-neutral-900/60 border-neutral-800/80 text-neutral-300 hover:border-neutral-700'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {soft}
              </span>
            ))}
          </div>
        </div>

        {/* Languages Grid */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">
            <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Spoken &amp; Written Languages</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.languages.map((lang) => (
              <div
                key={lang.id}
                className={`p-5 rounded-2xl border transition-all ${
                  theme === 'dark'
                    ? 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'
                    : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'
                }`}
              >
                <div className="text-2xl mb-2">{lang.flag}</div>
                <h4 className="font-display text-lg font-bold">{lang.name}</h4>
                <p className="text-xs font-mono text-cyan-400 mb-2">{lang.level}</p>
                <div className="flex items-center gap-1.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < lang.dots ? 'bg-amber-400' : 'bg-neutral-700'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {lang.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
