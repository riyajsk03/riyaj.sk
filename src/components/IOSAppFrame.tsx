import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PageId } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  User,
  Briefcase,
  Award,
  Sparkles,
  Sun,
  Moon,
  Shield,
  ArrowUpRight,
  Mail
} from 'lucide-react';

interface TabItem {
  id: PageId;
  label: string;
  icon: React.ElementType;
}

const TABS: TabItem[] = [
  { id: 'home', label: 'Overview', icon: Compass },
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'certifications', label: 'Certs', icon: Award },
  { id: 'work', label: 'Work', icon: Sparkles },
  { id: 'contact', label: 'Contact', icon: Mail }
];

export const IOSAppFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    activePage,
    setActivePage,
    theme,
    toggleTheme,
    isAdmin
  } = usePortfolio();

  return (
    <div className="min-h-screen w-full flex flex-col bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-200 selection:bg-[var(--text-primary)] selection:text-[var(--bg)]">
      {/* 1. Refined Minimal Header */}
      <header className="sticky top-0 z-40 w-full editorial-glass border-b border-[var(--border)] shadow-xs">
        <div className="w-full max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* Brand Identity / Name */}
          <button
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] shrink-0 shadow-[0_0_8px_var(--accent-green)]" title="Available for support and collaboration" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-[var(--text-primary)] group-hover:opacity-80 transition-opacity">
                Riyaj Sk
              </span>
              <span className="text-[11px] font-mono text-[var(--text-tertiary)] hidden sm:block">
                Customer Support · Web Builder
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {TABS.map((tab) => {
              const isActive = activePage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePage(tab.id)}
                  className={`text-xs font-medium transition-colors cursor-pointer flex flex-col items-center relative py-1 ${
                    isActive
                      ? 'text-[var(--text-primary)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive ? (
                    <motion.div
                      layoutId="activeTabUnderline"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)] mt-1"
                    />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-transparent mt-1" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Utilities (Theme Toggle, Contact & Admin Page Link) */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              aria-label="Toggle color theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setActivePage('contact')}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--btn-pill-bg)] text-[var(--btn-pill-text)] text-xs font-semibold hover:opacity-90 shadow-xs transition-all cursor-pointer"
            >
              <span>Contact</span>
            </button>

            <button
              onClick={() => setActivePage('admin')}
              className={`px-3 py-1.5 rounded-full border border-[var(--border-strong)] text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activePage === 'admin'
                  ? 'bg-[var(--btn-pill-bg)] text-[var(--btn-pill-text)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]'
              }`}
              title="Admin Portal (Riyaj Sk)"
            >
              <Shield className={`w-3.5 h-3.5 ${isAdmin ? 'text-[var(--accent-green)]' : ''}`} />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Editorial Content Container with safe bottom offset on mobile */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-5 sm:px-6 pt-10 pb-32 md:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Footer with Deep Internal Links & SEO Sources */}
      <footer className="w-full border-t border-[var(--border)] py-10 text-xs text-[var(--text-tertiary)] hidden md:block">
        <div className="max-w-5xl mx-auto px-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="font-mono">
              © {new Date().getFullYear()} Riyaj Sk · Bangalore, India · Customer Service Rep &amp; Web Builder
            </div>

            {/* Internal Navigation Links for SEO */}
            <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
              <button onClick={() => setActivePage('home')} className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
                Overview
              </button>
              <button onClick={() => setActivePage('about')} className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
                About
              </button>
              <button onClick={() => setActivePage('experience')} className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
                Experience
              </button>
              <button onClick={() => setActivePage('certifications')} className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
                Certs
              </button>
              <button onClick={() => setActivePage('work')} className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
                Work
              </button>
              <button onClick={() => setActivePage('contact')} className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">
                Contact
              </button>
            </nav>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[var(--border)] text-[11px] font-mono">
            <div className="flex items-center gap-3">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener"
                className="hover:text-[var(--text-primary)] transition-colors"
              >
                sitemap.xml
              </a>
              <span>·</span>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener"
                className="hover:text-[var(--text-primary)] transition-colors"
              >
                robots.txt
              </a>
              <span>·</span>
              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener"
                className="hover:text-[var(--text-primary)] transition-colors"
              >
                llms.txt
              </a>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setActivePage('admin')}
                className="hover:text-[var(--text-primary)] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Shield className="w-3 h-3" />
                <span>Admin</span>
              </button>
              <a
                href="https://linkedin.com/in/riyaj-sk-409605335"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-0.5"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://github.com/xriyajsk"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-0.5"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* 4. PINNED BOTTOM MENU FOR MOBILE VIEW (Elevated Depth, Spring Animations & Fixed Anchoring) */}
      <nav
        id="mobile-pinned-bottom-menu"
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] backdrop-blur-2xl shadow-[0_-12px_32px_rgba(0,0,0,0.18)] dark:shadow-[0_-12px_36px_rgba(0,0,0,0.7)] px-2 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex items-center justify-between max-w-md mx-auto">
          {TABS.map((tab) => {
            const isActive = activePage === tab.id;
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.88 }}
                onClick={() => setActivePage(tab.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-colors cursor-pointer flex-1 min-w-0 ${
                  isActive
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {/* Active Backdrop Pill with Spring Elevation */}
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveDockPill"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    className="absolute inset-0 bg-[var(--surface-secondary)] border border-[var(--border-strong)] rounded-xl -z-10 shadow-xs"
                  />
                )}

                <div className="relative">
                  <IconComponent
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive ? 'scale-110 text-[var(--text-primary)]' : 'opacity-70'
                    }`}
                  />
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] shadow-[0_0_6px_var(--accent-green)]" />
                  )}
                </div>

                <span
                  className={`text-[10px] mt-1 tracking-tight truncate max-w-full ${
                    isActive ? 'font-semibold text-[var(--text-primary)]' : 'font-medium text-[var(--text-tertiary)]'
                  }`}
                >
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
