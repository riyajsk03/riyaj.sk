import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PageId } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Lock,
  Sun,
  Moon,
  Sparkles,
  User,
  X,
  Plus,
  Compass,
  Briefcase,
  Award,
  Terminal,
  Mail,
  Shield,
  FileCode
} from 'lucide-react';

interface TabConfig {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabConfig[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'work', label: 'Work', icon: Terminal },
  { id: 'contact', label: 'Contact', icon: Mail }
];

export const ChromeBrowserFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    activePage,
    setActivePage,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    theme,
    toggleTheme,
    setIsChromeSetupOpen,
    setIsAdminModalOpen,
    isAdmin
  } = usePortfolio();

  const [isReloading, setIsReloading] = useState(false);

  const handleReload = () => {
    setIsReloading(true);
    setTimeout(() => setIsReloading(false), 500);
  };

  const getPageUrl = (page: PageId) => {
    if (page === 'home') return 'https://riyaj.sk/';
    return `https://riyaj.sk/${page}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {/* Outer Chrome Window */}
      <div className="chrome-window bg-[var(--card)] border border-[var(--line-strong)] rounded-2xl shadow-xl overflow-hidden">
        {/* 1. Chrome Tab Strip */}
        <div className="chrome-tab-strip flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[85%]">
            {/* Window Traffic Lights */}
            <div className="flex items-center gap-1.5 px-3 py-2 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d8a123]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
            </div>

            {/* Browser Tabs */}
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activePage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePage(tab.id)}
                  className={`chrome-tab ${isActive ? 'active' : ''}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-faint)]'}`} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] ml-1" />
                  )}
                </button>
              );
            })}

            {/* New Tab / Setup Trigger Button */}
            <button
              onClick={() => setIsChromeSetupOpen(true)}
              className="p-1.5 rounded-md text-[var(--text-faint)] hover:text-[var(--text)] hover:bg-[var(--bg)] transition-colors shrink-0"
              title="Open First-Time Chrome Setup Wizard"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick theme switcher on tab bar */}
          <div className="flex items-center gap-1 px-3">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--bg)] transition-colors"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 2. Chrome Omnibox & Navigation Bar */}
        <div className="bg-[var(--bg)] border-b border-[var(--line)] px-3 sm:px-4 py-2.5 flex items-center gap-2 sm:gap-3">
          {/* History Controls */}
          <div className="flex items-center gap-1 text-[var(--text-dim)]">
            <button
              onClick={goBack}
              disabled={!canGoBack}
              className="p-1.5 rounded-md hover:bg-[var(--bg-2)] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goForward}
              disabled={!canGoForward}
              className="p-1.5 rounded-md hover:bg-[var(--bg-2)] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Forward"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleReload}
              className="p-1.5 rounded-md hover:bg-[var(--bg-2)] transition-colors"
              title="Reload page"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin text-[var(--accent)]' : ''}`} />
            </button>
            <button
              onClick={() => setActivePage('home')}
              className="p-1.5 rounded-md hover:bg-[var(--bg-2)] transition-colors hidden sm:inline-flex"
              title="Home"
            >
              <Home className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Omnibox URL Bar */}
          <div className="chrome-omni flex-1 min-w-0">
            <Lock className="w-3 h-3 text-[var(--accent)] shrink-0" />
            <span className="truncate select-all">{getPageUrl(activePage)}</span>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* First-time Chrome setup badge */}
            <button
              onClick={() => setIsChromeSetupOpen(true)}
              className="btn btn-ghost py-1 px-2.5 text-xs font-mono hidden md:inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Chrome Setup</span>
            </button>

            {/* Admin button */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="btn btn-ghost py-1 px-2.5 text-xs font-mono"
              title="Admin access"
            >
              <Shield className={`w-3.5 h-3.5 ${isAdmin ? 'text-[var(--accent)]' : 'text-[var(--text-faint)]'}`} />
              <span className="hidden sm:inline">{isAdmin ? 'Admin' : 'Login'}</span>
            </button>
          </div>
        </div>

        {/* 3. Page Content Area with Smooth Animation */}
        <div className="p-5 sm:p-8 md:p-10 min-h-[580px] bg-[var(--bg)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4. Chrome Bottom Status / Footer */}
        <div className="bg-[var(--bg-2)] border-t border-[var(--line)] px-6 py-4 flex flex-wrap items-center justify-between text-xs text-[var(--text-dim)] font-mono gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span>riyaj.sk · Concentrix Customer Service Rep &amp; Builder</span>
          </div>
          <div>
            <span>© {new Date().getFullYear()} Riyaj Sk</span>
          </div>
        </div>
      </div>

      {/* 5. Mobile Sticky Bottom Navigation (Touch optimized, >=44px) */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-40 bg-[var(--card)]/90 backdrop-blur-md border border-[var(--line-strong)] rounded-2xl shadow-2xl p-1.5 flex items-center justify-around">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActivePage(tab.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[48px] min-h-[44px] transition-all ${
                isActive ? 'text-[var(--accent)] bg-[var(--accent-soft)]' : 'text-[var(--text-dim)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-semibold mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
