import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PageId } from '../types';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  page?: PageId;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { setActivePage } = usePortfolio();

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://riyajsk.vercel.app/'
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: item.page ? `https://riyajsk.vercel.app/${item.page}` : 'https://riyajsk.vercel.app/'
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <nav aria-label="Breadcrumb" className="w-full pb-2">
        <ol className="flex items-center flex-wrap gap-1.5 text-xs text-[var(--text-tertiary)] font-mono">
          <li className="flex items-center">
            <button
              onClick={() => setActivePage('home')}
              className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer py-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 opacity-40 shrink-0" />
                {item.page && !isLast ? (
                  <button
                    onClick={() => setActivePage(item.page!)}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer py-1"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span
                    className={`truncate ${isLast ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-secondary)]'}`}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
