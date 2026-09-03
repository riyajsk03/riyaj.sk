import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  Layers,
  Headphones,
  ShieldCheck,
  Radio,
  ExternalLink,
  ChevronRight,
  Globe
} from 'lucide-react';

export const ChromeSetupWizard: React.FC = () => {
  const {
    isChromeSetupOpen,
    setIsChromeSetupOpen,
    chromeSetupStep,
    setChromeSetupStep,
    setActivePage
  } = usePortfolio();

  const [loadingBar, setLoadingBar] = useState(0);

  // Animate mini loading progress when step changes
  useEffect(() => {
    if (isChromeSetupOpen) {
      setLoadingBar(0);
      const timer = setTimeout(() => {
        setLoadingBar(chromeSetupStep * 20);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [chromeSetupStep, isChromeSetupOpen]);

  if (!isChromeSetupOpen) return null;

  const handleNext = () => {
    if (chromeSetupStep < 5) {
      setChromeSetupStep(chromeSetupStep + 1);
    } else {
      setIsChromeSetupOpen(false);
      setActivePage('home');
    }
  };

  const handleBack = () => {
    if (chromeSetupStep > 1) {
      setChromeSetupStep(chromeSetupStep - 1);
    }
  };

  const handleFinish = (targetPage: 'home' | 'work' | 'experience' = 'home') => {
    setIsChromeSetupOpen(false);
    setActivePage(targetPage);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl bg-[var(--card)] border border-[var(--line-strong)] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Chrome Setup Top Header */}
          <div className="bg-[var(--bg-2)] px-6 py-4 border-b border-[var(--line)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Chrome Logo Inspired 4-Color Accent Dot */}
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[var(--card)] border border-[var(--line)] shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
              </div>
              <div>
                <h2 className="text-xs sm:text-sm font-extrabold text-[var(--text)] tracking-tight">
                  Welcome to Chrome · Setup Wizard
                </h2>
                <span className="text-[11px] font-mono text-[var(--text-faint)]">
                  Step {chromeSetupStep} of 5 · Configuring Riyaj Sk
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsChromeSetupOpen(false)}
              className="text-[var(--text-faint)] hover:text-[var(--text)] p-1 rounded-md transition-colors"
              title="Skip setup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Loading Progress Bar */}
          <div className="w-full h-1 bg-[var(--line)]">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-500 ease-out"
              style={{ width: `${loadingBar}%` }}
            />
          </div>

          {/* Step Body Content */}
          <div className="p-6 sm:p-8 flex-1 min-h-[360px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {/* STEP 1: IDENTITY */}
              {chromeSetupStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[var(--text)] text-[var(--bg)] font-mono font-bold text-xl flex items-center justify-center shadow-md">
                    RS
                  </div>

                  <div>
                    <span className="font-mono text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">
                      Initialization 01
                    </span>
                    <h3 className="text-2xl font-extrabold text-[var(--text)] tracking-tight mt-1">
                      Personalizing your browser profile
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-dim)] mt-2 leading-relaxed">
                      Setting up credentials for <strong>Riyaj Sk</strong>: Customer Service Representative specialising in high-concurrency WhatsApp chat, email, and BPO operations.
                    </p>
                  </div>

                  <div className="space-y-2 pt-1 font-mono text-xs text-[var(--text-dim)] bg-[var(--bg-2)] p-4 rounded-xl border border-[var(--line)]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>Profile verified: Customer Service Rep (Concentrix)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>Roots: Murshidabad, West Bengal → Base: Bangalore</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>Languages: English · Hindi · Bengali</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: EXPERIENCE */}
              {chromeSetupStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div>
                    <span className="font-mono text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">
                      Operations Sync 02
                    </span>
                    <h3 className="text-2xl font-extrabold text-[var(--text)] tracking-tight mt-1">
                      Loading BPO Support Channels
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-dim)] mt-2 leading-relaxed">
                      Connecting verified work history from Concentrix Service India &amp; Multi-Service Center.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--bg-2)] space-y-1">
                      <div className="font-mono text-xs font-bold text-[var(--accent)]">80% CONCURRENCY</div>
                      <div className="text-sm font-bold text-[var(--text)]">WhatsApp &amp; Email Queues</div>
                      <p className="text-xs text-[var(--text-dim)]">Managing multi-chat windows with fast, empathetic triage.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--bg-2)] space-y-1">
                      <div className="font-mono text-xs font-bold text-[var(--accent)]">98.5% CSAT</div>
                      <div className="text-sm font-bold text-[var(--text)]">Customer Satisfaction</div>
                      <p className="text-xs text-[var(--text-dim)]">Consistently exceeding resolution speed and quality benchmarks.</p>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-[var(--text-faint)] flex items-center gap-2">
                    <Headphones className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Tools connected: Infobip, Avaya, Marvin, Resolve Jiffy, MS Excel</span>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: SKILLS & CERTIFICATIONS */}
              {chromeSetupStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div>
                    <span className="font-mono text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">
                      Calibration 03
                    </span>
                    <h3 className="text-2xl font-extrabold text-[var(--text)] tracking-tight mt-1">
                      Calibrating Skills &amp; AI Stack
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-dim)] mt-2 leading-relaxed">
                      Syncing 26 verified certificates (23 from Concentrix University) and hands-on AI training.
                    </p>
                  </div>

                  <div className="space-y-3 bg-[var(--bg-2)] p-4 rounded-xl border border-[var(--line)]">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-[var(--text)]">
                        <span>WhatsApp Chat &amp; Email Support</span>
                        <span className="font-mono text-[var(--accent)]">99%</span>
                      </div>
                      <div className="meter"><i style={{ width: '99%' }} /></div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-[var(--text)]">
                        <span>CRM &amp; BPO Platforms</span>
                        <span className="font-mono text-[var(--accent)]">97%</span>
                      </div>
                      <div className="meter"><i style={{ width: '97%' }} /></div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-[var(--text)]">
                        <span>Data Entry &amp; Technical Troubleshooting</span>
                        <span className="font-mono text-[var(--accent)]">98%</span>
                      </div>
                      <div className="meter"><i style={{ width: '98%' }} /></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['RPA', 'Conversational AI', 'Generative AI', 'Agentic AI', 'InfoSec 2026', 'DEI'].map((c) => (
                      <span key={c} className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-[var(--card)] border border-[var(--line)] text-[var(--text-dim)]">
                        ✓ {c}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: PROJECTS */}
              {chromeSetupStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div>
                    <span className="font-mono text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">
                      Mounting 04
                    </span>
                    <h3 className="text-2xl font-extrabold text-[var(--text)] tracking-tight mt-1">
                      Mounting Projects &amp; Audio Radios
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-dim)] mt-2 leading-relaxed">
                      Indexing web applications, ambient lofi experiments, and terminal projects.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--bg-2)] flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-[var(--text)]">MEHFIL</div>
                        <div className="text-xs text-[var(--text-dim)]">Ambient music &amp; chat web app with 4 worlds</div>
                      </div>
                      <span className="font-mono text-[11px] text-[var(--accent)] font-semibold">xmehfil.vercel.app</span>
                    </div>

                    <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--bg-2)] flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-[var(--text)]">Zero Cap</div>
                        <div className="text-xs text-[var(--text-dim)]">Lo-fi ambient internet radio single-page experience</div>
                      </div>
                      <span className="font-mono text-[11px] text-[var(--text-faint)]">Audio Radio</span>
                    </div>

                    <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--bg-2)] flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-[var(--text)]">Dhaba Radio</div>
                        <div className="text-xs text-[var(--text-dim)]">90s Hindi web radio concept with YouTube audio stream</div>
                      </div>
                      <span className="font-mono text-[11px] text-[var(--text-faint)]">90s Culture</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: READY */}
              {chromeSetupStep === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6 text-center py-2"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] mx-auto flex items-center justify-center">
                    <Sparkles className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="font-mono text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">
                      Setup Complete
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight mt-1">
                      Your Chrome experience is ready!
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-dim)] mt-2 max-w-md mx-auto leading-relaxed">
                      All profiles, support metrics, 26 certifications, and web radios have been calibrated and loaded into the browser frame.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => handleFinish('home')}
                      className="btn btn-primary w-full sm:w-auto text-xs"
                    >
                      <span>Launch Full Chrome Browser</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleFinish('work')}
                      className="btn btn-ghost w-full sm:w-auto text-xs"
                    >
                      <span>Explore Projects directly</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Step Actions Navigation */}
            {chromeSetupStep < 5 && (
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-[var(--line)]">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onClick={() => setChromeSetupStep(s)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        chromeSetupStep === s
                          ? 'bg-[var(--accent)] scale-125'
                          : 'bg-[var(--line-strong)] hover:bg-[var(--text-faint)]'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {chromeSetupStep > 1 && (
                    <button
                      onClick={handleBack}
                      className="btn btn-ghost py-1.5 px-3 text-xs"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  )}

                  <button
                    onClick={handleNext}
                    className="btn btn-primary py-1.5 px-4 text-xs"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
