import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  User,
  MessageSquare,
  Sparkles,
  Terminal,
  Layers,
  ArrowRight,
  ShieldCheck,
  Send,
  Headphones,
  CheckCircle2,
  Mail,
  MapPin,
  ExternalLink,
  Camera
} from 'lucide-react';

export const HeroSetup: React.FC = () => {
  const {
    data,
    theme,
    setIsTerminalOpen,
    setIsSetupWizardOpen,
    setIsAdminModalOpen,
    isAdmin
  } = usePortfolio();

  const [activeQueueTab, setActiveQueueTab] = useState<'whatsapp' | 'email' | 'crm'>('whatsapp');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Keyboard shortcut listener for keycaps [T], [P], [S], [B], [C]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const key = e.key.toUpperCase();
      if (['T', 'P', 'S', 'B', 'C', 'D'].includes(key)) {
        setActiveKey(key);
        setTimeout(() => setActiveKey(null), 300);

        if (key === 'T') {
          setIsTerminalOpen(true);
        } else if (key === 'P') {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        } else if (key === 'S') {
          document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        } else if (key === 'B') {
          document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' });
        } else if (key === 'C') {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        } else if (key === 'D') {
          setIsSetupWizardOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsTerminalOpen, setIsSetupWizardOpen]);

  return (
    <section
      id="overview"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
    >
      {/* Ambient background glow & Windows OOBE aesthetic grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[500px] rounded-full blur-3xl opacity-20 ${
            theme === 'dark' ? 'bg-cyan-600/30' : 'bg-cyan-400/25'
          }`}
        />
        <div
          className={`absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-15 ${
            theme === 'dark' ? 'bg-amber-600/30' : 'bg-amber-400/20'
          }`}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Floating Card Container inspired by attached screenshot */}
        <div className="max-w-xl mx-auto relative">
          {/* Layered trapezoid silhouettes at top */}
          <div className="w-48 h-3 mx-auto rounded-t-xl bg-neutral-500/20 mb-[-1px] transform scale-90" />
          <div className="w-64 h-3 mx-auto rounded-t-xl bg-neutral-500/30 mb-[-1px]" />

          {/* Central Card Shell */}
          <div
            id="hero-floating-card"
            className={`relative rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 border shadow-2xl transition-all duration-300 backdrop-blur-2xl ${
              theme === 'dark'
                ? 'bg-neutral-900/90 border-neutral-700/70 text-neutral-100 shadow-cyan-950/20'
                : 'bg-white/95 border-neutral-200 text-neutral-900 shadow-neutral-300/40'
            }`}
          >
            {/* Header Identity */}
            <div className="text-center pt-2 pb-5">
              <div className="relative inline-block mb-3">
                {/* Profile Photo or Sleek Coder Avatar */}
                {data.profile.avatarUrl ? (
                  <img
                    src={data.profile.avatarUrl}
                    alt={data.profile.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mx-auto ring-4 ring-cyan-500/30 shadow-lg"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-cyan-600 via-neutral-800 to-amber-600 p-0.5 mx-auto ring-4 ring-cyan-500/20 shadow-lg flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-neutral-900 flex flex-col items-center justify-center text-cyan-400">
                      <span className="font-mono text-2xl font-bold">RS</span>
                      <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Coder</span>
                    </div>
                  </div>
                )}

                {/* Edit Photo Indicator for Admin */}
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="absolute bottom-0 right-0 p-1.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white shadow-md transition-transform hover:scale-110"
                  title={isAdmin ? 'Change profile photo in Admin Dashboard' : 'Sign in as Admin to upload photo'}
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-1">
                {data.profile.name}
              </h1>
              <p className="text-xs sm:text-sm font-mono text-cyan-400 tracking-wide mb-2">
                {data.profile.role}
              </p>
              <p
                className={`text-xs sm:text-sm max-w-sm mx-auto line-clamp-2 ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                }`}
              >
                {data.profile.subRole}
              </p>

              {/* Meta Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-[11px] font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-500/10 border border-neutral-500/20 text-neutral-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-500" />
                  {data.profile.location}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center gap-1">
                  <Headphones className="w-3 h-3 text-cyan-400" />
                  WhatsApp &amp; CRM Ops
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  26 Certifications
                </span>
              </div>
            </div>

            {/* Interactive Showcase Window / Queue Simulation (inspired by center preview in screenshot) */}
            <div className="relative mt-2 mb-6">
              {/* Vertical pagination dots on the right (matching screenshot) */}
              <div className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-10">
                <button
                  onClick={() => setActiveQueueTab('whatsapp')}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    activeQueueTab === 'whatsapp' ? 'bg-cyan-400 h-4' : 'bg-neutral-500/40'
                  }`}
                  aria-label="WhatsApp Queue"
                />
                <button
                  onClick={() => setActiveQueueTab('email')}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    activeQueueTab === 'email' ? 'bg-cyan-400 h-4' : 'bg-neutral-500/40'
                  }`}
                  aria-label="Email Queue"
                />
                <button
                  onClick={() => setActiveQueueTab('crm')}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    activeQueueTab === 'crm' ? 'bg-cyan-400 h-4' : 'bg-neutral-500/40'
                  }`}
                  aria-label="CRM Log"
                />
              </div>

              {/* Window Box with subtle tab header */}
              <div
                className={`rounded-2xl border overflow-hidden transition-all ${
                  theme === 'dark'
                    ? 'bg-neutral-950/90 border-neutral-800'
                    : 'bg-neutral-50 border-neutral-200 shadow-inner'
                }`}
              >
                {/* Console Bar */}
                <div
                  className={`px-3 py-2 border-b flex items-center justify-between text-xs font-mono ${
                    theme === 'dark'
                      ? 'bg-neutral-900 border-neutral-800 text-neutral-400'
                      : 'bg-neutral-200/70 border-neutral-300 text-neutral-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-[11px] font-medium text-neutral-300">
                      LIVE QUEUE SIMULATOR · CONCENTRIX
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-emerald-400 font-semibold">ACTIVE</span>
                  </div>
                </div>

                {/* Queue Switcher Pills */}
                <div className="p-2 border-b border-neutral-800/40 flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveQueueTab('whatsapp')}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                      activeQueueTab === 'whatsapp'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    💬 WhatsApp (80%)
                  </button>
                  <button
                    onClick={() => setActiveQueueTab('email')}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                      activeQueueTab === 'email'
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    ✉️ Email Triage
                  </button>
                  <button
                    onClick={() => setActiveQueueTab('crm')}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                      activeQueueTab === 'crm'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    📊 CRM &amp; Outbound (20%)
                  </button>
                </div>

                {/* Simulated Content */}
                <div className="p-3.5 sm:p-4 text-xs font-sans space-y-2.5 min-h-[140px] flex flex-col justify-center">
                  {activeQueueTab === 'whatsapp' && (
                    <>
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-full bg-neutral-800 text-neutral-400 shrink-0">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <div className="p-2.5 rounded-xl rounded-tl-none bg-neutral-800/60 border border-neutral-700/50 text-neutral-300 max-w-[82%]">
                          Hello Riyaj, my claim status has been pending for 48 hours. Can you assist?
                        </div>
                      </div>
                      <div className="flex items-start gap-2 justify-end">
                        <div className="p-2.5 rounded-xl rounded-tr-none bg-cyan-950/40 border border-cyan-700/40 text-cyan-200 max-w-[85%] text-right">
                          Checking claim #CX-8821 in Marvin CRM right now. Verified and escalated to priority dispatch. You will receive an SMS confirmation within 15 minutes! ✓
                        </div>
                      </div>
                    </>
                  )}

                  {activeQueueTab === 'email' && (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-lg bg-neutral-800/40 border border-neutral-700/40">
                        <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 mb-1">
                          <span>CASE: #22190-ESCALATION</span>
                          <span className="text-cyan-400 font-semibold">RESOLVED (CSAT: 100%)</span>
                        </div>
                        <p className="text-neutral-200 text-xs">
                          Re: Multi-Channel Patient Care Follow-up &amp; Prescription Routing
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-1">
                          Action: Coordinated with clinical pharmacy desk, updated ConnectCX records, verified HIPAA compliance.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeQueueTab === 'crm' && (
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="flex justify-between py-1 border-b border-neutral-800/60 text-neutral-300">
                        <span>Concurrent Chat Queues:</span>
                        <span className="text-emerald-400 font-bold">4 Live Sessions</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-neutral-800/60 text-neutral-300">
                        <span>Quality &amp; CSAT Benchmark:</span>
                        <span className="text-cyan-400 font-bold">98.5% Target Achieved</span>
                      </div>
                      <div className="flex justify-between py-1 text-neutral-300">
                        <span>Daily Transactions Handled:</span>
                        <span className="text-amber-400 font-bold">150+ Interactions</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Floating Navigation Pill Buttons (User, Chat, Setup) */}
            <div className="flex items-center justify-center gap-3 pt-2 pb-4">
              <a
                href="#experience"
                className={`p-3 rounded-2xl border transition-all duration-200 hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-neutral-800/90 border-neutral-700 text-neutral-200 hover:text-cyan-400 hover:border-cyan-500/50'
                    : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:text-cyan-600 hover:border-cyan-500'
                }`}
                title="View Experiences"
              >
                <User className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className={`p-3 rounded-2xl border transition-all duration-200 hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-neutral-800/90 border-neutral-700 text-neutral-200 hover:text-cyan-400 hover:border-cyan-500/50'
                    : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:text-cyan-600 hover:border-cyan-500'
                }`}
                title="Direct Message / Contact"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsSetupWizardOpen(true)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-mono font-medium transition-all duration-200 hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-cyan-950/60 to-neutral-900 border-cyan-800/50 text-cyan-300 hover:border-cyan-500'
                    : 'bg-cyan-50 border-cyan-300 text-cyan-800 hover:border-cyan-500'
                }`}
                title="Start First-Time Windows Setup"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Start Setup</span>
              </button>
            </div>

            {/* Tactile 3D Keycaps directly inspired by the screenshot [ D ] [ P ] [ S ] */}
            <div className="pt-3 border-t border-neutral-800/50 text-center">
              <div className="flex items-center justify-center gap-2 sm:gap-3 my-2">
                {[
                  { key: 'T', label: 'Terminal', action: () => setIsTerminalOpen(true) },
                  { key: 'P', label: 'Projects', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
                  { key: 'S', label: 'Skills', action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
                  { key: 'B', label: 'Blog', action: () => document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' }) },
                  { key: 'C', label: 'Contact', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={item.action}
                    className={`keycap w-9 h-9 sm:w-11 sm:h-11 text-xs sm:text-sm ${
                      activeKey === item.key ? 'active' : ''
                    } ${
                      theme === 'dark'
                        ? 'bg-neutral-800 text-neutral-200 border border-neutral-700'
                        : 'bg-neutral-200 text-neutral-800 border border-neutral-300'
                    }`}
                    title={`Shortcut: Press '${item.key}' for ${item.label}`}
                  >
                    {item.key}
                  </button>
                ))}
              </div>
              <p className="text-[11px] font-mono text-neutral-500 tracking-wider">
                Click keycap or press on keyboard to navigate
              </p>
            </div>
          </div>

          {/* Layered trapezoid silhouettes at bottom */}
          <div className="w-64 h-3 mx-auto rounded-b-xl bg-neutral-500/30 mt-[-1px]" />
          <div className="w-48 h-3 mx-auto rounded-b-xl bg-neutral-500/20 mt-[-1px] transform scale-90" />
        </div>

        {/* Quick Hero Callout Actions */}
        <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:xriyajsk@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-medium text-sm shadow-md transition-all hover:scale-105"
          >
            <Mail className="w-4 h-4" />
            <span>Email Riyaj Sk</span>
          </a>

          <a
            href={data.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all hover:scale-105 ${
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-700 text-neutral-200 hover:border-cyan-500'
                : 'bg-white border-neutral-300 text-neutral-800 hover:border-cyan-600 shadow-sm'
            }`}
          >
            <span>LinkedIn Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </a>

          <button
            onClick={() => setIsTerminalOpen(true)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-mono transition-all hover:scale-105 ${
              theme === 'dark'
                ? 'bg-cyan-950/20 border-cyan-800/40 text-cyan-400 hover:border-cyan-500'
                : 'bg-cyan-50 border-cyan-300 text-cyan-700 hover:border-cyan-600'
            }`}
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Launch CLI Terminal</span>
          </button>
        </div>
      </div>
    </section>
  );
};
