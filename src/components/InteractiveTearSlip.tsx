import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors, Check, Copy, ArrowUpRight, RotateCcw, MessageSquare, Mail, Download, Sparkles } from 'lucide-react';
import { playPaperTearSound } from '../utils/sound';
import { usePortfolio } from '../context/PortfolioContext';

interface Particle {
  id: number;
  x: number;
  y: number;
  r: number;
  s: number;
}

export const InteractiveTearSlip: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { setStatusMessage } = usePortfolio();
  const [isTorn, setIsTorn] = useState(false);
  const [isTearing, setIsTearing] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [copied, setCopied] = useState(false);

  // Trigger tear animation
  const handleTear = () => {
    if (isTorn || isTearing) return;
    setIsTearing(true);
    playPaperTearSound();

    // Spawn 14 animated paper fiber particle fragments
    const newParticles: Particle[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 160,
      y: Math.random() * 40 + 10,
      r: (Math.random() - 0.5) * 360,
      s: Math.random() * 0.6 + 0.4
    }));
    setParticles(newParticles);

    setTimeout(() => {
      setIsTorn(true);
      setIsTearing(false);
      setStatusMessage('Contact slip torn off and unlocked!');
    }, 280);
  };

  // Reset tear slip
  const handleReset = () => {
    setIsTorn(false);
    setIsTearing(false);
    setParticles([]);
    setStatusMessage('Perforated slip re-attached');
  };

  // Copy email
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('xriyajsk@gmail.com');
    setCopied(true);
    setStatusMessage('Copied xriyajsk@gmail.com');
    setTimeout(() => setCopied(false), 2000);
  };

  // Download digital vCard
  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Riyaj Sk
TITLE:Customer Service Representative & Web Builder
ORG:Concentrix Service India Pvt. Ltd.
EMAIL:xriyajsk@gmail.com
TEL:+917001402280
URL:https://linkedin.com/in/riyaj-sk
ADR:;;Bangalore;Karnataka;;India
NOTE:Specializing in high-concurrency WhatsApp chat, email triage and web applications.
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Riyaj_Sk_Contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setStatusMessage('Downloaded Riyaj Sk Contact vCard (.vcf)');
  };

  return (
    <div className={`w-full max-w-lg mx-auto select-none ${className}`}>
      {/* Container with 3D perspective and depth */}
      <div className="relative [perspective:1200px]">
        {/* Ambient Glow / Depth Shadow behind the paper */}
        <div className="absolute -inset-2 rounded-2xl bg-gradient-to-b from-black/5 to-black/15 dark:from-white/5 dark:to-white/10 blur-xl -z-10 opacity-70" />

        {/* 1. TOP STUB (Fixed Receipt Header) */}
        <div className="relative rounded-t-xl bg-[var(--surface)] border-x border-t border-[var(--border-strong)] p-5 pb-4 shadow-md overflow-hidden">
          {/* Paper Texture subtle noise / lines */}
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider uppercase text-[var(--text-tertiary)]">
                DISPATCH SLIP #8942-2026
              </span>
            </div>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
              BANGALORE · CSR DESK
            </span>
          </div>

          <div className="pt-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold tracking-tight text-[var(--text-primary)]">
                Riyaj Sk · Direct Hotline
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-mono mt-0.5">
                WhatsApp Chat &amp; Escalation Lead
              </p>
            </div>

            {/* Faux Barcode Graphic */}
            <div className="flex items-center gap-[2px] h-6 opacity-60">
              {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 1, 2, 1, 4, 2].map((w, i) => (
                <div
                  key={i}
                  className="bg-[var(--text-primary)] h-full rounded-[0.5px]"
                  style={{ width: `${w}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 2. PERFORATION SEAM (Interactive Tear Line) */}
        <div className="relative h-6 bg-[var(--surface)] border-x border-[var(--border-strong)] flex items-center justify-center overflow-visible">
          {/* Left punch-hole notch */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--bg)] border-r border-[var(--border-strong)] shadow-inner" />
          
          {/* Dashed perforation line */}
          <div className="w-full mx-4 border-b-2 border-dashed border-[var(--border-strong)] relative flex items-center justify-center">
            {/* Center Tear Action Trigger Pill */}
            {!isTorn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleTear}
                className="absolute px-3 py-1 rounded-full bg-[var(--text-primary)] text-[var(--bg)] text-[10px] font-mono tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer group"
                title="Click or drag to tear slip"
              >
                <Scissors className="w-3 h-3 group-hover:rotate-45 transition-transform" />
                <span>TEAR OFF SLIP</span>
              </motion.button>
            ) : (
              <div className="absolute px-2.5 py-0.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] text-[9px] font-mono text-[var(--accent-green)] flex items-center gap-1">
                <Check className="w-2.5 h-2.5" />
                <span>PERFORATION TORN</span>
              </div>
            )}
          </div>

          {/* Right punch-hole notch */}
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--bg)] border-l border-[var(--border-strong)] shadow-inner" />

          {/* Particle fragments flying off when torn */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, x: 0, y: 0, scale: p.s, rotate: 0 }}
              animate={{
                opacity: 0,
                x: p.x,
                y: p.y + 40,
                scale: 0.2,
                rotate: p.r
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute w-1.5 h-1 bg-[var(--text-secondary)] pointer-events-none rounded-[0.5px]"
            />
          ))}
        </div>

        {/* 3. TEARABLE LOWER SLIP */}
        <AnimatePresence mode="wait">
          {!isTorn ? (
            /* UNTORN STATE: Interactive Draggable & Clickable Paper Piece */
            <motion.div
              key="untorn"
              drag="y"
              dragConstraints={{ top: 0, bottom: 70 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.y > 35 || info.velocity.y > 300) {
                  handleTear();
                }
              }}
              whileHover={{ y: 2 }}
              animate={isTearing ? {
                y: 60,
                rotateZ: -5,
                opacity: 0.6,
                scale: 0.98
              } : {
                y: 0,
                rotateZ: 0,
                opacity: 1,
                scale: 1
              }}
              transition={{ type: 'spring', stiffness: 450, damping: 24 }}
              className="relative rounded-b-xl bg-[var(--surface)] border-x border-b border-[var(--border-strong)] p-5 pt-4 shadow-xl cursor-grab active:cursor-grabbing group"
            >
              {/* Jagged paper tear simulation along top border */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span>Authorized Frontline Support Token</span>
                  <span className="font-mono text-[11px] text-[var(--text-tertiary)]">VERIFIED 2026</span>
                </div>

                <div className="p-3.5 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border)] text-xs text-[var(--text-secondary)] space-y-1">
                  <p className="font-medium text-[var(--text-primary)]">
                    Hold &amp; Pull Down to Detach Contact Slip
                  </p>
                  <p className="text-[11px] text-[var(--text-tertiary)] leading-relaxed">
                    Tearing this slip unlocks direct WhatsApp dispatch, telephone hotline, and instant vCard credentials.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTear();
                    }}
                    className="btn-primary w-full text-xs py-2 gap-2"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Pull Down or Click to Tear</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* TORN STATE: Detached Slip with Realistic Tilt, Shadow & Revealed Actions */
            <motion.div
              key="torn"
              initial={{ opacity: 0, y: 30, rotateZ: 3, scale: 0.96 }}
              animate={{ opacity: 1, y: 16, rotateZ: -1.5, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative rounded-xl bg-[var(--surface)] border border-[var(--border-strong)] p-6 shadow-2xl space-y-5"
              style={{
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              {/* Torn Edge Decorative Cutout at Top */}
              <div className="absolute -top-[10px] left-0 right-0 h-[10px] overflow-hidden">
                <svg viewBox="0 0 500 10" preserveAspectRatio="none" className="w-full h-full text-[var(--surface)] fill-current">
                  <path d="M0,10 L0,2 Q10,8 20,3 L35,8 L50,2 L65,7 L80,2 L100,8 L120,3 L140,7 L160,2 L180,8 L200,3 L220,7 L240,2 L260,8 L280,3 L300,7 L320,2 L340,8 L360,3 L380,7 L400,2 L420,8 L440,3 L460,7 L480,2 L500,8 L500,10 Z" />
                </svg>
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-green)]" />
                  <span className="text-xs font-mono font-medium text-[var(--accent-green)]">
                    SLIP UNLOCKED &amp; DETACHED
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[11px] font-mono text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title="Re-attach paper slip"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Re-attach</span>
                </button>
              </div>

              {/* Revealed Credentials */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[var(--text-tertiary)]">Direct Email:</span>
                  <div className="flex items-center gap-2 font-mono text-[var(--text-primary)]">
                    <span>xriyajsk@gmail.com</span>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1 rounded hover:bg-[var(--surface-secondary)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] cursor-pointer"
                      title="Copy email"
                    >
                      {copied ? <Check className="w-3 h-3 text-[var(--accent-green)]" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[var(--text-tertiary)]">Location:</span>
                  <span className="font-mono text-[var(--text-primary)]">Bangalore, Karnataka (IST)</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[var(--text-tertiary)]">Primary Queues:</span>
                  <span className="font-mono text-[var(--text-primary)]">WhatsApp (80%) · Email (20%)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href="mailto:xriyajsk@gmail.com?subject=CSR%20Opportunity%20Inquiry%20-%20Riyaj%20Sk"
                  className="btn-primary text-xs py-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Draft Email</span>
                </a>

                <button
                  onClick={handleDownloadVCard}
                  className="btn-secondary text-xs py-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save vCard</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
