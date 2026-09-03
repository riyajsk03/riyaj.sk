import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Sparkles,
  MapPin,
  Headphones,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

export const SetupWizardModal: React.FC = () => {
  const { data, theme, isSetupWizardOpen, setIsSetupWizardOpen } = usePortfolio();
  const [currentStep, setCurrentStep] = useState(0);

  if (!isSetupWizardOpen) return null;

  const steps = [
    {
      title: "Let's set up your connection to Riyaj Sk",
      subtitle: 'Step 1 of 4: Identity & Regional Localization',
      render: () => (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>PRIMARY OPERATIONAL BASE</span>
            </div>
            <p className="text-sm text-neutral-200 font-semibold">
              Bangalore, Karnataka &amp; West Bengal, India
            </p>
            <p className="text-xs text-neutral-400">
              Originating from Murshidabad, West Bengal. Currently delivering mission-critical multi-channel support and customer success operations out of Bangalore.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg border border-neutral-800 bg-neutral-900/40">
              <span className="text-neutral-500 block">Experience</span>
              <span className="text-cyan-300 font-bold text-base">2+ Years</span>
            </div>
            <div className="p-3 rounded-lg border border-neutral-800 bg-neutral-900/40">
              <span className="text-neutral-500 block">Languages</span>
              <span className="text-amber-300 font-bold text-base">3 Fluent</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Channel Concurrency & Allocation',
      subtitle: 'Step 2 of 4: Multi-Queue Support Architecture',
      render: () => (
        <div className="space-y-4">
          <p className="text-xs text-neutral-400">
            Configuring high-throughput communication queues to manage simultaneous customer inquiries without latency:
          </p>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-emerald-400 font-medium">WhatsApp &amp; Email Support</span>
                <span className="text-neutral-200 font-bold">80% High Concurrency</span>
              </div>
              <div className="h-3 rounded-full bg-neutral-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[80%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-amber-400 font-medium">Outbound Calls &amp; Escalation Closures</span>
                <span className="text-neutral-200 font-bold">20% Case Resolution</span>
              </div>
              <div className="h-3 rounded-full bg-neutral-800 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[20%]" />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200">
              ✓ Multi-queue synchronization configured. Benchmark CSAT maintained at 98.5%.
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'AI & Developer Core Stack',
      subtitle: 'Step 3 of 4: Emerging Tech & Next Wave Academy Modules',
      render: () => (
        <div className="space-y-3">
          <p className="text-xs text-neutral-400">
            Verifying verified certifications and practical tool competencies:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {[
              { label: 'Conversational AI', status: 'Verified · Mar 2026' },
              { label: 'Agentic AI', status: 'Verified · Mar 2026' },
              { label: 'Generative AI', status: 'Verified · Mar 2026' },
              { label: 'RPA Automation', status: 'Verified · Mar 2026' },
              { label: 'ConnectCX / Marvin', status: 'Active CRM Suite' },
              { label: 'TypeScript & Vite', status: 'Frontend Stack' },
            ].map((item) => (
              <div key={item.label} className="p-2 rounded bg-neutral-900 border border-neutral-800">
                <p className="text-neutral-200 font-semibold">{item.label}</p>
                <p className="text-[10px] text-cyan-400">{item.status}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'First-Time Setup Complete!',
      subtitle: 'Step 4 of 4: System Initialized',
      render: () => (
        <div className="space-y-4 text-center py-2">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-base font-bold text-neutral-100">Ready to Explore</h4>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1">
              Riyaj Sk is fully loaded and open for new opportunities in Customer Support, Technical Operations, and AI-assisted workflows.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setIsSetupWizardOpen(false);
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-colors"
            >
              Browse Projects
            </button>
            <button
              onClick={() => {
                setIsSetupWizardOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-medium text-xs transition-colors"
            >
              Contact Riyaj
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div
        id="setup-wizard-window"
        className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 font-sans ${
          theme === 'dark'
            ? 'bg-neutral-950 border-neutral-800 text-neutral-100'
            : 'bg-white border-neutral-200 text-neutral-900'
        }`}
      >
        {/* Setup Window Titlebar */}
        <div className="px-6 py-4 border-b border-neutral-800/60 flex items-center justify-between bg-neutral-900/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Windows Setup OOBE · Riyaj Sk
            </span>
          </div>
          <button
            onClick={() => setIsSetupWizardOpen(false)}
            className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="px-6 pt-4 flex items-center gap-1.5">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? 'bg-cyan-400'
                  : idx < currentStep
                  ? 'bg-cyan-700'
                  : 'bg-neutral-800'
              }`}
            />
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-4">
          <div>
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
              {steps[currentStep].subtitle}
            </span>
            <h3 className="font-display text-xl font-bold mt-1">
              {steps[currentStep].title}
            </h3>
          </div>

          <div className="py-2">{steps[currentStep].render()}</div>
        </div>

        {/* Footer Navigation Controls */}
        <div className="px-6 py-4 border-t border-neutral-800/60 flex items-center justify-between bg-neutral-900/30">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className={`flex items-center gap-1 text-xs font-mono px-3 py-2 rounded-lg transition-colors ${
              currentStep === 0
                ? 'opacity-40 cursor-not-allowed text-neutral-500'
                : 'hover:bg-neutral-800 text-neutral-300'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
              className="flex items-center gap-1.5 text-xs font-mono font-medium px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-all hover:scale-105"
            >
              <span>Next Step</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setIsSetupWizardOpen(false)}
              className="flex items-center gap-1.5 text-xs font-mono font-medium px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all hover:scale-105"
            >
              <span>Finish Setup</span>
              <CheckCircle className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
