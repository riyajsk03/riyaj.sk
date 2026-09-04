import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, ArrowUpRight, Copy, Check, Send, Sparkles } from 'lucide-react';
import { InteractiveTearSlip } from '../InteractiveTearSlip';
import { Breadcrumbs } from '../Breadcrumbs';

export const ContactPage: React.FC = () => {
  const { data, setStatusMessage } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('xriyajsk@gmail.com');
    setCopied(true);
    setStatusMessage('Copied xriyajsk@gmail.com to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    const mailtoUrl = `mailto:xriyajsk@gmail.com?subject=Inquiry from ${encodeURIComponent(name)}&body=${body}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
    setStatusMessage('Mail client opened');
  };

  return (
    <div className="space-y-12 md:space-y-16">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      {/* 2. Header */}
      <section className="space-y-3 max-w-3xl">
        <span className="font-eyebrow text-[11px] font-bold tracking-[0.18em] text-[var(--text-tertiary)] uppercase block">
          Direct Inquiries
        </span>
        <h1 className="font-display-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.08]">
          Get in Touch &amp; Connect
        </h1>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
          Available for frontline customer support positions, technical operations, and web development collaboration.
        </p>
      </section>

      {/* 3. Interactive Tear-Off Slip Hero on Contact Page */}
      <section className="pt-2">
        <InteractiveTearSlip />
      </section>

      {/* 4. Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-8 border-t border-[var(--border)] items-start">
        {/* Left Column: Direct Communication */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-medium text-[var(--text-primary)]">
              Immediate Contact Channels
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Based in Bangalore, India. I review all inquiries directly and aim to respond within 24 hours.
            </p>
          </div>

          <div className="space-y-3">
            {/* Email Contact Row */}
            <div className="flex items-center gap-2">
              <a
                href="mailto:xriyajsk@gmail.com"
                className="btn-primary flex-1 justify-between"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span>xriyajsk@gmail.com</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="btn-secondary px-3"
                title="Copy email to clipboard"
                aria-label="Copy email"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[var(--accent-green)]" /> : <Copy className="w-3.5 h-3.5 text-[var(--text-secondary)]" />}
              </button>
            </div>

            {/* LinkedIn Link */}
            <div>
              <a
                href={data.profile.linkedin || 'https://linkedin.com/in/riyaj-sk'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-between"
              >
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
              </a>
            </div>
          </div>

          {/* Availability Status Card */}
          <div className="editorial-card p-5 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-green)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] shadow-[0_0_6px_var(--accent-green)]" />
              <span className="uppercase tracking-wider">Actively Interviewing</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Open to on-site roles in Bangalore as well as remote/hybrid chat, email, and technical customer service positions across India.
            </p>
          </div>
        </div>

        {/* Right Column: Message Form with Depth */}
        <div className="lg:col-span-6">
          <div className="editorial-card p-6 sm:p-8 shadow-md">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] mx-auto" />
                <h3 className="text-lg font-medium text-[var(--text-primary)]">Message Prepared</h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
                  Your mail client has been opened with your inquiry addressed to <strong>xriyajsk@gmail.com</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary text-xs mt-2"
                >
                  Compose another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-medium text-[var(--text-primary)]">
                    Send a Direct Message
                  </h3>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    Fill out the fields below to launch a direct email draft.
                  </p>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="block text-xs font-mono text-[var(--text-secondary)]">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-md px-3 py-2 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none focus:border-[var(--border-strong)] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-[var(--text-secondary)]">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@organization.com"
                    className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-md px-3 py-2 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none focus:border-[var(--border-strong)] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-[var(--text-secondary)]">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Details about your customer support or builder opportunity..."
                    className="w-full bg-[var(--surface-secondary)] border border-[var(--border)] rounded-md px-3 py-2 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none focus:border-[var(--border-strong)] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-xs py-2.5 mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
