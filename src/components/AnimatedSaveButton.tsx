import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Check, Loader2 } from 'lucide-react';

interface AnimatedSaveButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSaving?: boolean;
  isSaved?: boolean;
  label?: string;
  savingLabel?: string;
  savedLabel?: string;
  className?: string;
  disabled?: boolean;
}

export const AnimatedSaveButton: React.FC<AnimatedSaveButtonProps> = ({
  type = 'submit',
  onClick,
  isSaving = false,
  isSaved = false,
  label = 'Save Changes',
  savingLabel = 'Saving to Firestore...',
  savedLabel = 'Saved Successfully!',
  className = '',
  disabled = false
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isSaving}
      whileHover={!disabled && !isSaving ? { scale: 1.02, y: -1 } : undefined}
      whileTap={!disabled && !isSaving ? { scale: 0.98, y: 1 } : undefined}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      className={`relative overflow-hidden cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none transition-all duration-200 ${
        isSaved
          ? 'bg-[var(--accent-green)] text-white shadow-[0_0_20px_rgba(34,197,94,0.35)]'
          : isSaving
          ? 'bg-[var(--surface-secondary)] border border-[var(--border-strong)] text-[var(--text-primary)]'
          : 'btn-primary'
      } ${className}`}
    >
      {/* Background light sheen on hover */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none -translate-x-full"
        animate={isSaving ? { translateX: ['100%', '-100%'] } : undefined}
        transition={isSaving ? { repeat: Infinity, duration: 1.5, ease: 'linear' } : undefined}
      />

      <div className="relative z-10 flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold">
        <AnimatePresence mode="wait" initial={false}>
          {isSaved ? (
            <motion.span
              key="saved"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              className="flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-white stroke-[2.5]" />
              <span>{savedLabel}</span>
            </motion.span>
          ) : isSaving ? (
            <motion.span
              key="saving"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 text-[var(--text-primary)] font-mono"
            >
              <Loader2 className="w-4 h-4 animate-spin text-[var(--accent-green)]" />
              <span>{savingLabel}</span>
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{label}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
};
