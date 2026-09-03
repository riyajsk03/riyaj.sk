import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal, Lock, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, theme, setIsTerminalOpen, setIsSetupWizardOpen, setIsAdminModalOpen, isAdmin } = usePortfolio();

  return (
    <footer
      className={`border-t py-12 transition-colors duration-300 font-mono text-xs ${
        theme === 'dark'
          ? 'bg-neutral-950 border-neutral-800 text-neutral-400'
          : 'bg-white border-neutral-200 text-neutral-600'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-amber-500 flex items-center justify-center text-white font-bold text-xs">
            R
          </div>
          <div>
            <span className="font-bold text-neutral-200">{data.profile.name}</span>
            <span className="mx-2 text-neutral-600">|</span>
            <span>Customer Service Representative &amp; Coder</span>
          </div>
        </div>

        {/* Quick Nav / Tactile Shortcuts */}
        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={() => setIsSetupWizardOpen(true)}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Setup OOBE</span>
          </button>

          <button
            onClick={() => setIsTerminalOpen(true)}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Terminal className="w-3.5 h-3.5 text-amber-500" />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Lock className="w-3.5 h-3.5 text-neutral-400" />
            <span>{isAdmin ? 'Admin Panel' : 'Admin'}</span>
          </button>
        </div>

        <div className="text-center sm:text-right text-neutral-500 text-[11px]">
          <p>© {new Date().getFullYear()} Riyaj Sk. All rights reserved.</p>
          <p className="mt-0.5">Built with modern React, Vite &amp; Tailwind</p>
        </div>
      </div>
    </footer>
  );
};
