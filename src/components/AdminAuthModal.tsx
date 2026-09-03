import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Shield, ArrowRight, LogOut, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminAuthModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    isAdmin,
    adminUser,
    loginWithGoogleFirebase,
    logout,
    setActivePage
  } = usePortfolio();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (!isAdminModalOpen) return null;

  const handleContinueWithGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await loginWithGoogleFirebase();
      if (!res.success) {
        setError(res.error || 'Authentication failed. Please verify with xriyajsk@gmail.com.');
      } else {
        setIsAdminModalOpen(false);
        setActivePage('admin');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToAdminPage = () => {
    setIsAdminModalOpen(false);
    setActivePage('admin');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="w-full max-w-sm rounded-2xl bg-[var(--surface)] border border-[var(--border-strong)] shadow-2xl p-6 sm:p-7 relative"
        >
          {/* Close button */}
          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {isAdmin ? (
            <div className="text-center py-2 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] mx-auto flex items-center justify-center text-[var(--accent-green)]">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display-title text-xl font-bold text-[var(--text-primary)]">
                  Admin Verified
                </h3>
                <p className="text-xs font-mono text-[var(--text-secondary)]">
                  {adminUser?.email || 'xriyajsk@gmail.com'}
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={handleGoToAdminPage}
                  className="btn-primary w-full cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Open Admin Page</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={logout}
                  className="btn-outline w-full text-xs text-[var(--accent-red)] border-[var(--accent-red)]/30 hover:bg-[var(--accent-red-subtle)] cursor-pointer flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-2 space-y-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 font-eyebrow text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.18em]">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Administrative Access</span>
                </div>
                <h3 className="font-display-title text-2xl font-bold text-[var(--text-primary)]">
                  Admin Sign In
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Only the portfolio owner (<span className="font-mono text-[var(--text-primary)] font-medium">xriyajsk@gmail.com</span>) can access the management page and update Firebase Firestore.
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-[var(--accent-red-subtle)] border border-[var(--accent-red)]/20 text-[var(--accent-red)] text-xs font-mono leading-relaxed">
                  {error}
                </div>
              )}

              {/* Continue with Google Button */}
              <div className="pt-1 space-y-2">
                <button
                  onClick={handleContinueWithGoogle}
                  disabled={loading}
                  className="btn-primary w-full py-2.5 cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{loading ? 'Verifying with Google...' : 'Continue with Google'}</span>
                </button>

                <button
                  onClick={handleGoToAdminPage}
                  className="btn-outline w-full text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Open Admin Page directly
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
