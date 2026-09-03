import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Home,
  Briefcase,
  Sparkles,
  FolderGit2,
  Award,
  Mail,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Terminal,
  Shield,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HomeScreen } from './screens/HomeScreen';
import { ExperienceScreen } from './screens/ExperienceScreen';
import { SkillsScreen } from './screens/SkillsScreen';
import { ProjectsScreen } from './screens/ProjectsScreen';
import { CertificationsScreen } from './screens/CertificationsScreen';
import { ContactScreen } from './screens/ContactScreen';

export const SCREENS = [
  { id: 'home', label: 'Home', shortLabel: 'Home', step: '01' },
  { id: 'exp', label: 'Exp', shortLabel: 'Exp', step: '02' },
  { id: 'skills', label: 'Skills', shortLabel: 'Skills', step: '03' },
  { id: 'projects', label: 'Projects', shortLabel: 'Projects', step: '04' },
  { id: 'certs', label: 'Certs', shortLabel: 'Certs', step: '05' },
  { id: 'contact', label: 'Contact', shortLabel: 'Contact', step: '06' }
];

export const PhoneSetupStage: React.FC = () => {
  const {
    theme,
    setTheme,
    toggleTheme,
    setIsTerminalOpen,
    setIsAdminModalOpen,
    isAdmin
  } = usePortfolio();

  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // 4D Subtle Mouse Parallax Tilt (combining with Variation 4's rotateX(5deg) rotateY(-5deg))
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToBack();
      } else if (e.key === 't' || e.key === 'T') {
        setIsTerminalOpen(true);
      } else if (e.key >= '1' && e.key <= '6') {
        const targetIndex = parseInt(e.key, 10) - 1;
        navigateToScreen(targetIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreenIndex]);

  const navigateToScreen = (index: number) => {
    if (index === currentScreenIndex) return;
    setDirection(index > currentScreenIndex ? 1 : -1);
    setCurrentScreenIndex(index);
  };

  const goToNext = () => {
    if (currentScreenIndex < SCREENS.length - 1) {
      setDirection(1);
      setCurrentScreenIndex((prev) => prev + 1);
    } else {
      setDirection(-1);
      setCurrentScreenIndex(0);
    }
  };

  const goToBack = () => {
    if (currentScreenIndex > 0) {
      setDirection(-1);
      setCurrentScreenIndex((prev) => prev - 1);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -2.5;
    const tiltY = ((x - centerX) / centerX) * 2.5;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const currentScreen = SCREENS[currentScreenIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 32 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 32 },
        opacity: { duration: 0.18 }
      }
    })
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative selection:bg-[#E15A42] selection:text-[#F8F7F4] pb-24 md:pb-12"
      style={{
        background: 'var(--bg)',
        color: 'var(--ink)'
      }}
    >
      {/* Top Floating Utility Bar (Theme, Terminal, Admin) */}
      <div className="w-full max-w-[620px] flex items-center justify-between px-2 mb-3 z-30">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E15A42] inline-block animate-pulse" />
          <span className="font-mono text-[11px] font-bold tracking-widest uppercase opacity-70">
            SYSTEM SETUP // STEP {currentScreen.step}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Light / Dark Mode Segmented Switcher */}
          <div className="inline-flex items-center p-0.5 rounded-lg border-2 border-[#1D1818] bg-white dark:bg-[#201b1b] shadow-[2px_2px_0_#1D1818] dark:shadow-[2px_2px_0_#E15A42]">
            <button
              onClick={() => setTheme('light')}
              title="Switch to Light Version"
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-[#1D1818] text-white shadow-xs'
                  : 'text-[#1D1818]/60 hover:text-[#1D1818]'
              }`}
            >
              <Sun className={`w-3 h-3 ${theme === 'light' ? 'text-amber-400' : ''}`} />
              <span>LIGHT</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              title="Switch to Dark Version"
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-[#E15A42] text-white shadow-xs'
                  : 'text-[#1D1818]/60 dark:text-white/60 hover:text-[#1D1818] dark:hover:text-white'
              }`}
            >
              <Moon className="w-3 h-3" />
              <span>DARK</span>
            </button>
          </div>

          <button
            onClick={() => setIsTerminalOpen(true)}
            title="Open Interactive Terminal [T]"
            className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold border border-[#1D1818]/20 hover:border-[#1D1818] hover:bg-[#1D1818] hover:text-white transition-all flex items-center gap-1 cursor-pointer"
          >
            <Terminal className="w-3 h-3 text-[#E15A42]" />
            <span>TERM [T]</span>
          </button>

          <button
            onClick={() => setIsAdminModalOpen(true)}
            title={isAdmin ? 'Admin (Logged In)' : 'Admin Login (xriyajsk@gmail.com)'}
            className={`p-1.5 rounded-md border transition-all cursor-pointer ${
              isAdmin
                ? 'bg-[#E15A42] text-white border-[#E15A42]'
                : 'border-[#1D1818]/20 hover:border-[#1D1818]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Variation 4 Container */}
      <div className="variation4-container">
        {/* Variation 4 Phone Mockup Card with 3D Depth */}
        <div
          ref={stageRef}
          style={{
            transform: `rotateX(${4 + tilt.x}deg) rotateY(${-4 + tilt.y}deg)`,
            transformStyle: 'preserve-3d'
          }}
          className="variation4-phone p-6 sm:p-9"
        >
          {/* Header */}
          <header className="flex items-center justify-between pb-5 mb-5 border-b border-[#1D1818]/10">
            <div className="flex items-center gap-2">
              <span className="font-extrabold font-mono text-base tracking-wider text-[#1D1818] dark:text-white">
                RIYAJ.SK
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#E15A42]/10 text-[#E15A42] font-bold border border-[#E15A42]/30">
                PRO
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="flex items-center gap-3 sm:gap-4 overflow-x-auto">
              {SCREENS.map((s, idx) => {
                const isActive = currentScreenIndex === idx;
                return (
                  <button
                    key={s.id}
                    onClick={() => navigateToScreen(idx)}
                    className={`nav-link-mono transition-colors cursor-pointer relative py-1 ${
                      isActive
                        ? 'text-[#E15A42] font-extrabold'
                        : 'text-[#1D1818]/60 dark:text-white/60 hover:text-[#1D1818] dark:hover:text-white'
                    }`}
                  >
                    <span>{s.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="v4-active-nav-line"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E15A42]"
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </header>

          {/* Main Slide Content */}
          <main className="min-h-[360px] flex flex-col justify-between relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentScreenIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full flex-1"
              >
                {currentScreenIndex === 0 && (
                  <HomeScreen onNext={goToNext} onNavigate={navigateToScreen} />
                )}
                {currentScreenIndex === 1 && (
                  <ExperienceScreen
                    onNext={goToNext}
                    onBack={goToBack}
                    onNavigate={navigateToScreen}
                  />
                )}
                {currentScreenIndex === 2 && (
                  <SkillsScreen
                    onNext={goToNext}
                    onBack={goToBack}
                    onNavigate={navigateToScreen}
                  />
                )}
                {currentScreenIndex === 3 && (
                  <ProjectsScreen
                    onNext={goToNext}
                    onBack={goToBack}
                    onNavigate={navigateToScreen}
                  />
                )}
                {currentScreenIndex === 4 && (
                  <CertificationsScreen
                    onNext={goToNext}
                    onBack={goToBack}
                    onNavigate={navigateToScreen}
                  />
                )}
                {currentScreenIndex === 5 && (
                  <ContactScreen onBack={goToBack} onRestart={() => navigateToScreen(0)} />
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Footer Navigation: Back & Next tactile buttons matching Variation 4 */}
          <footer className="flex items-center justify-between pt-6 mt-6 border-t border-[#1D1818]/10">
            <button
              onClick={goToBack}
              disabled={currentScreenIndex === 0}
              className={`variation4-btn-secondary ${
                currentScreenIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="font-mono text-xs font-bold tracking-widest text-[#1D1818]/50 dark:text-white/50">
              {currentScreen.step} // 06
            </div>

            <button onClick={goToNext} className="variation4-btn">
              <span>{currentScreenIndex === SCREENS.length - 1 ? 'Restart' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </footer>
        </div>
      </div>

      {/* Variation 4 Mobile Navigation Dock with Tab Dots */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-xl border border-[#1D1818]/20 backdrop-blur-md"
        style={{
          background: 'var(--ink)'
        }}
      >
        <button
          onClick={goToBack}
          disabled={currentScreenIndex === 0}
          className="text-white/60 hover:text-white disabled:opacity-20 p-1 cursor-pointer transition-colors"
          title="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 px-1">
          {SCREENS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => navigateToScreen(idx)}
              className="p-1 cursor-pointer transition-transform"
              title={s.label}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  currentScreenIndex === idx
                    ? 'bg-[#E15A42] scale-125 ring-2 ring-[#E15A42]/50'
                    : 'bg-[#F8F7F4] opacity-30 hover:opacity-75'
                }`}
              />
            </button>
          ))}
        </div>

        <button
          onClick={goToNext}
          className="text-[#E15A42] hover:text-white p-1 cursor-pointer transition-colors"
          title="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
