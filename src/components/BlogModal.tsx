import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Calendar, Clock, BookOpen } from 'lucide-react';

export const BlogModal: React.FC = () => {
  const { selectedPost, setSelectedPost } = usePortfolio();

  if (!selectedPost) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-2xl rounded-xl border border-[var(--border-strong)] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col bg-[var(--surface)] text-[var(--text-primary)] font-sans">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface-secondary)]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
              Article &amp; Notes
            </span>
          </div>
          <button
            onClick={() => setSelectedPost(null)}
            className="p-1 rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-tertiary)] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Post Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-tertiary)]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {selectedPost.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {selectedPost.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight text-[var(--text-primary)]">
              {selectedPost.title}
            </h1>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {(selectedPost.tags || []).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-sm text-[11px] font-mono bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--text-secondary)]"
                >
                  #{t}
                </span>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--text-secondary)] text-xs leading-relaxed italic">
              &quot;{selectedPost.excerpt}&quot;
            </div>
          </div>

          {/* Render Markdown/Formatted Content */}
          <div className="text-xs sm:text-sm text-[var(--text-secondary)] space-y-4 leading-relaxed whitespace-pre-line">
            {selectedPost.content}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[var(--border)] flex items-center justify-between bg-[var(--surface-secondary)] text-xs font-mono text-[var(--text-tertiary)]">
          <span>Author: Riyaj Sk</span>
          <button
            onClick={() => setSelectedPost(null)}
            className="btn-secondary text-xs py-1 px-3"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
