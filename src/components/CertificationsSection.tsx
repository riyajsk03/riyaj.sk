import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, ShieldCheck, Search, CheckCircle2, ExternalLink } from 'lucide-react';
import { Certificate } from '../types';

export const CertificationsSection: React.FC = () => {
  const { data, theme } = usePortfolio();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [certSearch, setCertSearch] = useState('');

  const tabs = [
    { id: 'all', label: 'All (26)' },
    { id: 'ai', label: 'AI & Technology' },
    { id: 'security', label: 'Security & Compliance' },
    { id: 'workplace', label: 'Workplace Culture' },
    { id: 'tools', label: 'Tools & CRM' },
    { id: 'professional', label: 'Professional Dev' },
    { id: 'external', label: 'External Diplomas' }
  ];

  const filteredCerts = useMemo(() => {
    return data.certificates.filter((cert) => {
      const matchesTab = activeTab === 'all' || cert.category === activeTab;
      const matchesSearch =
        cert.title.toLowerCase().includes(certSearch.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(certSearch.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [data.certificates, activeTab, certSearch]);

  return (
    <section
      id="certifications"
      className={`py-20 border-t transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-neutral-950 border-neutral-800 text-neutral-100'
          : 'bg-white border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>05 — Verified Credentials</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Certifications &amp; Accreditations
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5">
              <span className="font-display text-2xl font-bold text-amber-400">26</span>
              <span className="text-[11px] font-mono text-neutral-400 leading-tight">
                Verified<br />Certificates
              </span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-2.5">
              <span className="font-display text-2xl font-bold text-cyan-400">23</span>
              <span className="text-[11px] font-mono text-neutral-400 leading-tight">
                Concentrix<br />University
              </span>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5 text-xs font-mono w-full sm:w-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    activeTab === tab.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                      : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div
              className={`relative rounded-xl border px-3 py-1.5 flex items-center gap-2 text-xs font-mono w-full sm:w-64 ${
                theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-neutral-500" />
              <input
                type="text"
                value={certSearch}
                onChange={(e) => setCertSearch(e.target.value)}
                placeholder="Filter credentials..."
                className="w-full bg-transparent border-none outline-none"
              />
            </div>
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className={`p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-neutral-900/60 border-neutral-800/90 hover:border-cyan-500/40'
                  : 'bg-white border-neutral-200 hover:border-cyan-400 shadow-sm'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-400 border border-neutral-700/60">
                    {cert.category.toUpperCase()}
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 font-medium">
                    {cert.date}
                  </span>
                </div>
                <h4 className="font-display text-sm font-bold text-neutral-200 leading-snug pt-1">
                  {cert.title}
                </h4>
              </div>

              <div className="pt-3 mt-2 border-t border-neutral-800/60 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="truncate max-w-[180px]">{cert.issuer}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
