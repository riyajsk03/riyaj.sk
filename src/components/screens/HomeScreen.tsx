import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Sparkles,
  MapPin,
  Mail,
  Phone,
  Camera,
  Upload,
  ArrowRight,
  Terminal,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeScreenProps {
  onNext: () => void;
  onNavigate: (index: number) => void;
}

const GREETINGS = [
  { text: 'Setup Ready', lang: 'English' },
  { text: 'नमस्ते (Hello)', lang: 'Hindi' },
  { text: 'নমস্কার (Welcome)', lang: 'Bengali' },
  { text: 'Hola Coder', lang: 'Spanish' },
  { text: 'Bonjour', lang: 'French' }
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNext, onNavigate }) => {
  const { data, theme, setIsTerminalOpen, updateProfile } = usePortfolio();
  const { profile } = data;

  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [tempPhotoUrl, setTempPhotoUrl] = useState(profile.avatarUrl || '');

  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handlePhotoSave = async () => {
    await updateProfile({
      ...profile,
      avatarUrl: tempPhotoUrl
    });
    setIsPhotoModalOpen(false);
  };

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setTempPhotoUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full flex flex-col justify-between py-1">
      {/* Variation 4 Hero Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold mb-3 bg-[#E15A42]/10 text-[#E15A42] border border-[#E15A42]/30">
          <span className="w-2 h-2 rounded-full bg-[#E15A42] animate-pulse" />
          <span>PHONECONTROL // STEP 01</span>
        </div>

        {/* Dynamic Editorial Headline matching Variation 4 */}
        <div className="hero-editorial text-[#1D1818] dark:text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={GREETINGS[greetingIndex].text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {GREETINGS[greetingIndex].text}.<br />
              Meet Riyaj.
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-sm font-normal text-[#1D1818]/80 dark:text-white/80 max-w-lg leading-relaxed mt-3">
          {profile.bio}
        </p>
      </div>

      {/* Variation 4 Accent Highlight Box */}
      <div className="p-4 sm:p-5 rounded-2xl border-2 border-[#1D1818] bg-[#F8F7F4] dark:bg-[#141212] flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-[5px_5px_0_#1D1818] dark:shadow-[5px_5px_0_#E15A42] mb-5">
        {/* Avatar with custom upload option */}
        <div className="relative group shrink-0">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#E15A42] text-white flex items-center justify-center font-mono font-bold text-xl border-2 border-[#1D1818] shadow-sm">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={`${profile.name} — Profile Avatar`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>RS</span>
            )}
          </div>
          <button
            onClick={() => setIsPhotoModalOpen(true)}
            title="Upload photo"
            className="absolute inset-0 bg-[#1D1818]/70 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity flex items-center justify-center text-white text-[10px] font-mono cursor-pointer"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-base text-[#1D1818] dark:text-white">
              {profile.name}
            </h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#1D1818] text-white">
              VERIFIED
            </span>
          </div>
          <p className="text-xs font-semibold text-[#E15A42] mt-0.5">
            {profile.role}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono opacity-70 mt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#E15A42]" />
              {profile.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {profile.email}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Row in Neo-Brutalist Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
        <div className="p-3 rounded-xl border-2 border-[#1D1818] bg-white dark:bg-[#201b1b] text-center shadow-[3px_3px_0_#1D1818] dark:shadow-[3px_3px_0_#E15A42]">
          <span className="font-mono text-xl font-extrabold text-[#1D1818] dark:text-white block">
            {profile.yearsExperience}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">
            YEARS EXP
          </span>
        </div>

        <div className="p-3 rounded-xl border-2 border-[#1D1818] bg-white dark:bg-[#201b1b] text-center shadow-[3px_3px_0_#1D1818] dark:shadow-[3px_3px_0_#E15A42]">
          <span className="font-mono text-xl font-extrabold text-[#E15A42] block">
            98.5%
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">
            CSAT RATING
          </span>
        </div>

        <div className="p-3 rounded-xl border-2 border-[#1D1818] bg-white dark:bg-[#201b1b] text-center shadow-[3px_3px_0_#1D1818] dark:shadow-[3px_3px_0_#E15A42]">
          <span className="font-mono text-xl font-extrabold text-[#1D1818] dark:text-white block">
            26+
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">
            CERTS
          </span>
        </div>

        <div className="p-3 rounded-xl border-2 border-[#1D1818] bg-white dark:bg-[#201b1b] text-center shadow-[3px_3px_0_#1D1818] dark:shadow-[3px_3px_0_#E15A42]">
          <span className="font-mono text-xl font-extrabold text-[#E15A42] block">
            3-4
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">
            CONCURRENCY
          </span>
        </div>
      </div>

      {/* Photo Upload Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D1818]/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-[#F8F7F4] dark:bg-[#1C1818] rounded-3xl p-6 border-2 border-[#1D1818] shadow-[8px_8px_0_#1D1818]">
            <h3 className="font-bold text-base text-[#1D1818] dark:text-white mb-1">
              Upload Profile Photo
            </h3>
            <p className="text-xs font-mono opacity-70 mb-3">
              Direct image URL or local upload:
            </p>

            <div className="space-y-3">
              <input
                type="text"
                value={tempPhotoUrl}
                onChange={(e) => setTempPhotoUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border-2 border-[#1D1818] bg-white dark:bg-[#262121]"
              />

              <div className="border-2 border-dashed border-[#1D1818] rounded-xl p-3 text-center cursor-pointer relative">
                <Upload className="w-5 h-5 mx-auto mb-1 opacity-60" />
                <span className="text-xs font-mono block">Browse file</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileDrop}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {tempPhotoUrl && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-[#262121] border border-[#1D1818]/20">
                  <img src={tempPhotoUrl} alt="Profile Photo Upload Preview" className="w-8 h-8 rounded object-cover" />
                  <span className="text-xs font-mono">Ready to save</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-mono opacity-70 hover:opacity-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePhotoSave}
                  className="variation4-btn text-xs py-1.5 px-3"
                >
                  Save Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
