import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Award,
  Search,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface CertificationsScreenProps {
  onNext: () => void;
  onBack: () => void;
  onNavigate: (index: number) => void;
}

export const CertificationsScreen: React.FC<CertificationsScreenProps> = ({
  onNext,
  onBack,
  onNavigate
}) => {
  const { data, setSelectedPost } = usePortfolio();
  const { certificates, posts } = data;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssuer, setSelectedIssuer] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'certs' | 'insights'>('certs');

  const issuers = ['All', 'IBM', 'Cisco', 'Google', 'HP'];

  const filteredCerts = certificates.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIssuer =
      selectedIssuer === 'All' ||
      cert.issuer.toLowerCase().includes(selectedIssuer.toLowerCase());
    return matchesSearch && matchesIssuer;
  });

  return (
    <div className="w-full flex flex-col justify-between py-1">
      {/* Header */}
      <div className="mb-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold mb-2 bg-[#E15A42]/10 text-[#E15A42] border border-[#E15A42]/30">
          <Award className="w-3.5 h-3.5" />
          <span>VERIFIED CREDENTIALS // STEP 05</span>
        </div>

        <div className="hero-editorial text-[#1D1818] dark:text-white mb-1">
          Verified<br />Badges.
        </div>
        <p className="text-xs sm:text-sm font-normal text-[#1D1818]/80 dark:text-white/80 max-w-lg mb-3">
          26+ industry accreditations across Cybersecurity, AI workflows, Enterprise Operations, and Technical Support.
        </p>
      </div>

      {/* Mode Switch & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('certs')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border-2 border-[#1D1818] transition-all cursor-pointer ${
              activeTab === 'certs'
                ? 'bg-[#1D1818] text-white shadow-[2px_2px_0_#E15A42]'
                : 'bg-white dark:bg-[#201b1b] text-[#1D1818] dark:text-white'
            }`}
          >
            Certificates (26)
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border-2 border-[#1D1818] transition-all cursor-pointer ${
              activeTab === 'insights'
                ? 'bg-[#1D1818] text-white shadow-[2px_2px_0_#E15A42]'
                : 'bg-white dark:bg-[#201b1b] text-[#1D1818] dark:text-white'
            }`}
          >
            Articles ({posts.length})
          </button>
        </div>

        {activeTab === 'certs' && (
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              placeholder="Search certs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1 text-xs font-mono rounded-lg border-2 border-[#1D1818] bg-white dark:bg-[#201b1b] outline-none"
            />
          </div>
        )}
      </div>

      {/* Content Area */}
      {activeTab === 'certs' ? (
        <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1">
          {filteredCerts.slice(0, 10).map((cert) => (
            <div
              key={cert.id}
              className="p-2.5 sm:p-3 rounded-xl border-2 border-[#1D1818] bg-white dark:bg-[#201b1b] shadow-[3px_3px_0_#1D1818] dark:shadow-[3px_3px_0_#E15A42] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-[#E15A42]/15 text-[#E15A42] border border-[#E15A42]/30 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  {(cert.issuer || '').slice(0, 2).toUpperCase()}
                </div>
                <div className="truncate">
                  <h5 className="font-bold text-xs text-[#1D1818] dark:text-white truncate">
                    {cert.title}
                  </h5>
                  <span className="text-[10px] font-mono opacity-60">
                    {cert.issuer} · {cert.date || (cert as any).issueDate || '2024'}
                  </span>
                </div>
              </div>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-1 rounded text-[10px] font-mono font-bold border border-[#1D1818] bg-[#F8F7F4] dark:bg-[#282222] hover:bg-[#E15A42] hover:text-white transition-colors shrink-0 flex items-center gap-1"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="p-3 rounded-xl border-2 border-[#1D1818] bg-white dark:bg-[#201b1b] shadow-[3px_3px_0_#1D1818] dark:shadow-[3px_3px_0_#E15A42] cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1D1818] text-white">
                  {(post.tags && post.tags[0]) || 'TECH'}
                </span>
                <span className="text-[10px] font-mono opacity-60">{post.readTime}</span>
              </div>
              <h5 className="font-bold text-xs text-[#1D1818] dark:text-white mb-1">
                {post.title}
              </h5>
              <p className="text-[11px] text-[#1D1818]/70 dark:text-white/70 line-clamp-2">
                {post.excerpt || (post as any).summary || ''}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
