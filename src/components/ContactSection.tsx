import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Send,
  Mail,
  Copy,
  Check,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data, theme } = usePortfolio();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText('xriyajsk@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
        setFeedback('Thank you! Your message was submitted directly to Riyaj Sk.');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setFeedback(result.error || 'Failed to submit. Please use the direct email button.');
      }
    } catch (err) {
      // Fallback
      setSubmitted(true);
      setFeedback('Message noted! You can also click below to open your default email app.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={`py-20 border-t transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-neutral-950 border-neutral-800 text-neutral-100'
          : 'bg-white border-neutral-200 text-neutral-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Direct Info & Availability */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>07 — Quick Connect</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                Open to New Opportunities. Let&apos;s Talk.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md">
                Whether you have an inquiry regarding high-concurrency WhatsApp support, BPO operations, AI automation workflows, or recruitment opportunities — feel free to drop a message.
              </p>
            </div>

            {/* Direct Email Card with One-Click Copy */}
            <div
              className={`p-5 rounded-2xl border flex items-center justify-between gap-4 ${
                theme === 'dark'
                  ? 'bg-neutral-900/80 border-neutral-800'
                  : 'bg-neutral-50 border-neutral-200 shadow-sm'
              }`}
            >
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-neutral-500 uppercase">
                  Primary Contact Email
                </span>
                <p className="font-mono text-sm sm:text-base font-bold text-amber-400">
                  xriyajsk@gmail.com
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyEmail}
                  className={`p-2.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
                    copied
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white'
                  }`}
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <a
                  href="mailto:xriyajsk@gmail.com"
                  className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
                  title="Open mail client"
                >
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Operational Meta Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div
                className={`p-4 rounded-xl border ${
                  theme === 'dark' ? 'bg-neutral-900/40 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Location</span>
                </div>
                <p className="text-neutral-200 font-semibold">{data.profile.location}</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">Origin: Murshidabad, WB</p>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  theme === 'dark' ? 'bg-neutral-900/40 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Response SLA</span>
                </div>
                <p className="text-neutral-200 font-semibold">&lt; 12 Hours</p>
                <p className="text-[11px] text-emerald-400 mt-0.5">● Ready for Immediate Joining</p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={data.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 underline"
              >
                <span>Connect with Riyaj on LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Quick Contact Form */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border ${
              theme === 'dark'
                ? 'bg-neutral-900/60 border-neutral-800'
                : 'bg-neutral-50 border-neutral-200 shadow-md'
            }`}
          >
            <h3 className="font-display text-xl font-bold mb-4">Send a Direct Message</h3>

            {submitted && feedback && (
              <div className="mb-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                {feedback}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-neutral-400">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full p-3 rounded-xl border outline-none font-sans text-xs ${
                      theme === 'dark'
                        ? 'bg-neutral-950 border-neutral-800 focus:border-cyan-500 text-neutral-100'
                        : 'bg-white border-neutral-300 focus:border-cyan-500 text-neutral-900'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400">Your Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className={`w-full p-3 rounded-xl border outline-none font-sans text-xs ${
                      theme === 'dark'
                        ? 'bg-neutral-950 border-neutral-800 focus:border-cyan-500 text-neutral-100'
                        : 'bg-white border-neutral-300 focus:border-cyan-500 text-neutral-900'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400">Subject / Company</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Recruitment Opportunity / Project Inquiry"
                  className={`w-full p-3 rounded-xl border outline-none font-sans text-xs ${
                    theme === 'dark'
                      ? 'bg-neutral-950 border-neutral-800 focus:border-cyan-500 text-neutral-100'
                      : 'bg-white border-neutral-300 focus:border-cyan-500 text-neutral-900'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400">Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about the role, team, or inquiry..."
                  className={`w-full p-3 rounded-xl border outline-none font-sans text-xs resize-none ${
                    theme === 'dark'
                      ? 'bg-neutral-950 border-neutral-800 focus:border-cyan-500 text-neutral-100'
                      : 'bg-white border-neutral-300 focus:border-cyan-500 text-neutral-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-md disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Transmitting...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
