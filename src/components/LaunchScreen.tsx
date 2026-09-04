import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, ArrowRight, ShieldCheck } from 'lucide-react';

interface LaunchScreenProps {
  onComplete?: () => void;
}

export const LaunchScreen: React.FC<LaunchScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing runtime environment...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if user already completed launch in this browser session
    const hasLaunched = sessionStorage.getItem('portfolio_launch_completed');
    if (hasLaunched) {
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            sessionStorage.setItem('portfolio_launch_completed', 'true');
            if (onComplete) onComplete();
          }, 450);
          return 100;
        }

        // Variable increments to simulate realistic loading phases
        let next = prev + Math.floor(Math.random() * 9) + 4;
        if (next > 100) next = 100;

        if (next < 30) {
          setStatusText('Loading design tokens & typography...');
        } else if (next < 60) {
          setStatusText('Mounting projects, skills & experience...');
        } else if (next < 85) {
          setStatusText('Synchronizing real-time Firebase Firestore...');
        } else if (next < 100) {
          setStatusText('Finalizing interface components...');
        } else {
          setStatusText('Ready · Welcome to Riyaj Sk Portfolio');
        }

        return next;
      });
    }, 55);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setProgress(100);
    setStatusText('Entering portfolio...');
    setTimeout(() => {
      setIsDone(true);
      sessionStorage.setItem('portfolio_launch_completed', 'true');
      if (onComplete) onComplete();
    }, 200);
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="launch-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text-primary)] px-6 overflow-hidden select-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[var(--text-primary)]/4 blur-3xl pointer-events-none -translate-y-12" />

          {/* Centerpiece Content */}
          <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center space-y-8">
            {/* Animated Logo Monogram Badge */}
            <div className="relative">
              {/* Outer pulsing ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className="absolute -inset-2 rounded-3xl bg-[var(--text-primary)]/10 blur-sm pointer-events-none"
              />

              {/* Main Badge */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-20 h-20 rounded-2xl bg-[var(--surface)] border border-[var(--border-strong)] shadow-2xl flex items-center justify-center relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-tr from-[var(--text-primary)]/5 to-transparent pointer-events-none"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <span className="font-display-title text-2xl font-black tracking-tight text-[var(--text-primary)]">
                  RS
                </span>
                <span className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
              </motion.div>
            </div>

            {/* Typography & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="space-y-2"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] text-[10.5px] font-mono text-[var(--text-secondary)] uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-[var(--accent-green)] animate-spin" />
                <span>Riyaj Sk · Portfolio Launch</span>
              </div>
              <h1 className="font-display-title text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                Customer Support &amp; Web Builder
              </h1>
            </motion.div>

            {/* Progress Bar & Status */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="w-full space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                <span className="flex items-center gap-1.5 truncate max-w-[280px]">
                  <Terminal className="w-3 h-3 text-[var(--text-tertiary)] shrink-0" />
                  <span className="truncate">{statusText}</span>
                </span>
                <span className="font-semibold text-[var(--text-primary)] tabular-nums shrink-0 ml-2">
                  {progress}%
                </span>
              </div>

              {/* Bar Container */}
              <div className="w-full h-2 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] overflow-hidden p-0.5">
                <motion.div
                  className="h-full rounded-full bg-[var(--text-primary)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-[var(--text-tertiary)] font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[var(--accent-green)]" />
                  <span>Verified Security</span>
                </span>
                <button
                  onClick={handleSkip}
                  className="hover:text-[var(--text-primary)] transition-colors cursor-pointer flex items-center gap-1 group py-1 px-2 -mr-2 rounded"
                >
                  <span>Enter</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
