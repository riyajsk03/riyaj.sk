import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Terminal,
  Sun,
  Moon,
  Lock,
  Unlock,
  Sliders,
  Menu,
  X,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    data,
    theme,
    toggleTheme,
    isAdmin,
    setIsTerminalOpen,
    setIsSetupWizardOpen,
    setIsAdminModalOpen
  } = usePortfolio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Insights', href: '#insights' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-neutral-950/80 border-neutral-800/80 text-neutral-200'
          : 'bg-white/85 border-neutral-200 text-neutral-800 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Status */}
        <div className="flex items-center gap-3">
          <a
            href="#overview"
            className="group flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-amber-500 flex items-center justify-center text-white font-mono text-sm shadow-sm group-hover:scale-105 transition-transform">
              R
            </span>
            <span className="group-hover:text-cyan-400 transition-colors">
              {data.profile.name}
            </span>
          </a>

          <div
            className={`hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono border ${
              theme === 'dark'
                ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-400'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{data.profile.status}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors duration-150 hover:text-cyan-500 ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Windows OOBE Setup Mode Button */}
          <button
            id="nav-setup-btn"
            onClick={() => setIsSetupWizardOpen(true)}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all duration-200 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-700 text-cyan-300 hover:border-cyan-500/60'
                : 'bg-neutral-100 border-neutral-300 text-cyan-700 hover:border-cyan-500'
            }`}
            title="Launch Windows Setup OOBE Simulation"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Setup OOBE</span>
          </button>

          {/* Interactive Terminal Toggle */}
          <button
            id="nav-terminal-btn"
            onClick={() => setIsTerminalOpen(true)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono border transition-all duration-200 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:border-neutral-500'
                : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:border-neutral-400'
            }`}
            title="Open Interactive Terminal ($ riyaj --help)"
          >
            <Terminal className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Terminal</span>
          </button>

          {/* Theme Switcher */}
          <button
            id="nav-theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`p-2 rounded-lg border transition-all duration-200 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-700 text-amber-400 hover:bg-neutral-800'
                : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Admin Auth / Dashboard Button */}
          <button
            id="nav-admin-btn"
            onClick={() => setIsAdminModalOpen(true)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all duration-200 hover:scale-105 ${
              isAdmin
                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 font-semibold'
                : theme === 'dark'
                ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                : 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-neutral-900'
            }`}
            title={isAdmin ? 'Admin Dashboard (Logged in)' : 'Admin Login (Google)'}
          >
            {isAdmin ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Admin</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-neutral-700/50 text-neutral-400 hover:text-neutral-200"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-4 py-4 space-y-3 font-medium text-sm transition-colors ${
            theme === 'dark'
              ? 'bg-neutral-950 border-neutral-800'
              : 'bg-white border-neutral-200'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 px-3 rounded-md hover:bg-neutral-800/30 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-neutral-800 flex items-center gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSetupWizardOpen(true);
              }}
              className="flex-1 py-2 px-3 rounded-lg text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Windows Setup OOBE</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
