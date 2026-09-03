import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { data, theme, setSelectedPost } = usePortfolio();

  const publishedPosts = data.posts.filter((p) => p.published !== false);

  return (
    <section
      id="insights"
      className={`py-20 border-t transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-neutral-950/60 border-neutral-800 text-neutral-100'
          : 'bg-neutral-50/70 border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>06 — Technical Insights &amp; Updates</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Frontline Engineering &amp; Operations
            </h2>
          </div>

          <p className="text-xs font-mono text-neutral-400 max-w-sm md:text-right">
            Articles on managing high-concurrency chat channels, agentic AI transformations, and information security defense.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedPosts.map((post) => (
            <article
              key={post.id}
              className={`rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                theme === 'dark'
                  ? 'bg-neutral-900/60 border-neutral-800 hover:border-cyan-500/40'
                  : 'bg-white border-neutral-200 hover:border-cyan-400 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold mb-2.5 leading-snug hover:text-cyan-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-neutral-800/80 text-cyan-300 border border-neutral-700/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-full py-2 px-3 rounded-xl bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700/60 text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
