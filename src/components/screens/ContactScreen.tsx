import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Linkedin,
  Github,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface ContactScreenProps {
  onBack: () => void;
  onRestart: () => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ onBack, onRestart }) => {
  const { data, theme, setStatusMessage, setIsAdminModalOpen } = usePortfolio();
  const { profile } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setStatusMessage(`Copied ${type === 'email' ? 'Email' : 'Phone'} to clipboard!`);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setStatusMessage('Message transmitted successfully! Riyaj will respond promptly.');
    }, 800);
  };

  return (
    <div className="w-full flex flex-col justify-between py-1">
      {/* Variation 4 Headline */}
      <div className="mb-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold mb-2 bg-[#E15A42]/10 text-[#E15A42] border border-[#E15A42]/30">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>SETUP FINISHED // STEP 06</span>
        </div>

        <div className="hero-editorial text-[#1D1818] dark:text-white">
          Setup<br />Complete.
        </div>
        <p className="text-xs sm:text-sm font-normal text-[#1D1818]/80 dark:text-white/80 max-w-lg mt-2">
          Windows setup-inspired portfolio for Riyaj Sk. Features interactive terminal, projects, and Google Auth dashboard.
        </p>
      </div>

      {/* Variation 4 Admin Dashboard Feature Highlight Box */}
      <div className="p-3.5 sm:p-4 rounded-2xl border-2 border-[#1D1818] bg-[#F8F7F4] dark:bg-[#141212] flex items-center justify-between gap-3 shadow-[4px_4px_0_#1D1818] dark:shadow-[4px_4px_0_#E15A42] mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E15A42] flex items-center justify-center text-white shrink-0 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-sm text-[#1D1818] dark:text-white">Admin Dashboard</div>
            <div className="text-[11px] font-mono opacity-60">Secure Access Authorized</div>
          </div>
        </div>
        <button
          onClick={() => setIsAdminModalOpen(true)}
          className="px-3.5 py-1.5 text-xs font-mono font-bold bg-[#1D1818] text-white rounded-xl hover:bg-[#E15A42] transition-colors cursor-pointer"
        >
          Login
        </button>
      </div>

      {/* Contact Channels and Quick Form in Neo-Brutalist Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-2">
        {/* Quick Channels */}
        <div className="space-y-2.5">
          <div
            onClick={() => handleCopy(profile.email, 'email')}
            className="p-3 rounded-xl border-2 border-[#1D1818] bg-white dark:bg-[#201b1b] flex items-center justify-between gap-2 shadow-[3px_3px_0_#1D1818] dark:shadow-[3px_3px_0_#E15A42] cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Mail className="w-4 h-4 text-[#E15A42] shrink-0" />
              <div className="truncate">
                <span className="text-[10px] font-mono uppercase opacity-50 block">EMAIL</span>
                <span className="text-xs font-mono font-bold text-[#1D1818] dark:text-white truncate block">
                  {profile.email}
                </span>
              </div>
            </div>
            <button className="p-1 rounded text-xs font-mono opacity-70">
              {copiedType === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div
            onClick={() => handleCopy('+919733470763', 'phone')}
            className="p-3 rounded-xl border-2 border-[#1D1818] bg-white dark:bg-[#201b1b] flex items-center justify-between gap-2 shadow-[3px_3px_0_#1D1818] dark:shadow-[3px_3px_0_#E15A42] cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Phone className="w-4 h-4 text-[#E15A42] shrink-0" />
              <div className="truncate">
                <span className="text-[10px] font-mono uppercase opacity-50 block">PHONE / WHATSAPP</span>
                <span className="text-xs font-mono font-bold text-[#1D1818] dark:text-white truncate block">
                  +91 9733470763
                </span>
              </div>
            </div>
            <button className="p-1 rounded text-xs font-mono opacity-70">
              {copiedType === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex-1 p-2 rounded-xl border-2 border-[#1D1818] bg-white dark:bg-[#201b1b] flex items-center justify-center gap-1.5 text-xs font-mono font-bold hover:bg-[#E15A42] hover:text-white transition-colors shadow-[2px_2px_0_#1D1818]"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex-1 p-2 rounded-xl border-2 border-[#1D1818] bg-white dark:bg-[#201b1b] flex items-center justify-center gap-1.5 text-xs font-mono font-bold hover:bg-[#E15A42] hover:text-white transition-colors shadow-[2px_2px_0_#1D1818]"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Dispatch Form */}
        <div className="p-3.5 rounded-2xl border-2 border-[#1D1818] bg-white dark:bg-[#201b1b] shadow-[4px_4px_0_#1D1818] dark:shadow-[4px_4px_0_#E15A42]">
          {isSubmitted ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <h4 className="font-bold text-sm text-[#1D1818] dark:text-white">Message Transmitted!</h4>
              <p className="text-xs font-mono opacity-70 mt-1">Riyaj will get back to you shortly.</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-3 text-xs font-mono font-bold underline text-[#E15A42]"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border-2 border-[#1D1818] bg-[#F8F7F4] dark:bg-[#262121] outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border-2 border-[#1D1818] bg-[#F8F7F4] dark:bg-[#262121] outline-none"
                />
              </div>
              <div>
                <textarea
                  rows={2}
                  required
                  placeholder="Hi Riyaj, I'd like to discuss a role/project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border-2 border-[#1D1818] bg-[#F8F7F4] dark:bg-[#262121] outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full variation4-btn py-1.5 text-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
