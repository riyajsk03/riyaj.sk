import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  ShieldCheck,
  ShieldAlert,
  User,
  Briefcase,
  Cpu,
  Code,
  Award,
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Camera,
  Upload,
  Check,
  X,
  ExternalLink,
  Lock,
  ArrowLeft,
  Database,
  CloudCheck,
  Sparkles,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { Experience, SkillCategory, Project, Certificate, BlogPost } from '../../types';

export const AdminPage: React.FC = () => {
  const {
    data,
    theme,
    isAdmin,
    adminUser,
    isAuthChecking,
    loginWithGoogleFirebase,
    logout,
    setActivePage,
    updateProfile,
    addExperience,
    updateExperience,
    deleteExperience,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    addPost,
    updatePost,
    deletePost,
    resetToDefaults
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'skills' | 'projects' | 'certs' | 'blog'>('profile');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState(data.profile);

  // Modal / Editing states
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isAddingExp, setIsAddingExp] = useState(false);

  const [editingSkill, setEditingSkill] = useState<SkillCategory | null>(null);
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const [editingProj, setEditingProj] = useState<Project | null>(null);
  const [isAddingProj, setIsAddingProj] = useState(false);

  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isAddingCert, setIsAddingCert] = useState(false);

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isAddingPost, setIsAddingPost] = useState(false);

  // Synchronize profile form if data changes
  React.useEffect(() => {
    setProfileForm(data.profile);
  }, [data.profile]);

  const showNotification = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  const handleSignIn = async () => {
    setAuthError(null);
    setIsAuthenticating(true);
    try {
      const res = await loginWithGoogleFirebase();
      if (!res.success && res.error) {
        setAuthError(res.error);
      }
    } catch (e: any) {
      setAuthError(e?.message || 'Authentication error.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Handle Photo File Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setProfileForm((prev) => ({ ...prev, avatarUrl: base64 }));
    };
    reader.readAsDataURL(file);
  };

  // Save Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(profileForm);
    showNotification('Profile and credentials updated in Firebase Firestore!');
  };

  // IF NOT AUTHENTICATED OR NOT RIYAJ SK: Render the dedicated login gate
  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-8 sm:p-10 shadow-2xl relative space-y-6">
          {/* Back button to Home */}
          <button
            onClick={() => setActivePage('home')}
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </button>

          <div className="space-y-3 pt-2">
            <div className="w-12 h-12 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-eyebrow text-[10.5px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.2em] block">
                Administrative Portal
              </span>
              <h1 className="font-display-title text-2xl font-bold text-[var(--text-primary)] mt-1">
                Restricted Admin Page
              </h1>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              This management page is strictly restricted. Only the authorized account owner (<span className="font-mono font-medium text-[var(--text-primary)]">xriyajsk@gmail.com</span>) can authenticate, verify identity, and manage live Firebase data.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-[var(--accent-red-subtle)] border border-[var(--accent-red)]/20 text-[var(--accent-red)] text-xs font-mono flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{authError}</span>
            </div>
          )}

          <div className="pt-2 space-y-3">
            <button
              onClick={handleSignIn}
              disabled={isAuthenticating}
              className="btn-primary w-full py-3 text-sm cursor-pointer disabled:opacity-50"
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
              <span>{isAuthenticating ? 'Verifying with Google...' : 'Sign in with Google (xriyajsk@gmail.com)'}</span>
            </button>

            <div className="pt-2 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-[var(--text-tertiary)]">
                <Database className="w-3.5 h-3.5" />
                <span>Protected by Firebase Firestore Rules &amp; Auth</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED AS xriyajsk@gmail.com - Full Admin Panel Page
  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* Top Banner Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePage('home')}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </button>
            <span className="text-[var(--text-tertiary)]">/</span>
            <span className="font-eyebrow text-[10px] font-bold tracking-[0.18em] text-[var(--accent-green)]">
              Admin Page
            </span>
          </div>

          <h1 className="font-display-title text-3xl font-bold text-[var(--text-primary)]">
            Portfolio Management
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-secondary)] pt-1">
            <span className="flex items-center gap-1 text-[var(--accent-green)] font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified: {adminUser?.email}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-[var(--text-tertiary)]">
              <Database className="w-3 h-3" />
              <span>Synced to Cloud Firestore</span>
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={resetToDefaults}
            className="btn-outline text-xs"
            title="Reset to factory defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={logout}
            className="btn-secondary text-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {saveSuccess && (
        <div className="p-4 rounded-xl bg-[var(--accent-green-subtle)] border border-[var(--accent-green)]/30 text-xs font-mono text-[var(--text-primary)] flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-[var(--accent-green)]" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-[var(--border)]">
        {[
          { id: 'profile', label: 'Photo & Bio', icon: User },
          { id: 'experience', label: `Experience (${data.experiences.length})`, icon: Briefcase },
          { id: 'skills', label: `Skills (${data.skills.length})`, icon: Cpu },
          { id: 'projects', label: `Projects (${data.projects.length})`, icon: Code },
          { id: 'certs', label: `Certifications (${data.certificates.length})`, icon: Award },
          { id: 'blog', label: `Blog (${data.posts.length})`, icon: BookOpen }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[var(--btn-pill-bg)] text-[var(--btn-pill-text)] font-semibold shadow-xs'
                  : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROFILE & PHOTO SETTINGS */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* Profile Photo */}
          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] space-y-4">
            <h3 className="font-display-title text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Camera className="w-4 h-4 text-[var(--text-secondary)]" />
              <span>Profile Avatar</span>
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Photo Preview */}
              <div className="relative">
                {profileForm.avatarUrl ? (
                  <img
                    src={profileForm.avatarUrl}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-[var(--border-strong)] shadow-sm"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[var(--surface)] border border-dashed border-[var(--border-strong)] flex flex-col items-center justify-center text-[var(--text-tertiary)] text-xs">
                    <User className="w-8 h-8 mb-1" />
                    <span>No Photo</span>
                  </div>
                )}
                {profileForm.avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setProfileForm({ ...profileForm, avatarUrl: '' })}
                    className="absolute -top-1 -right-1 p-1 rounded-full bg-[var(--accent-red)] text-white text-xs cursor-pointer shadow-sm"
                    title="Remove Photo"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Upload Controls */}
              <div className="space-y-3 flex-1 w-full text-xs font-mono">
                <div>
                  <label className="text-[var(--text-secondary)] block mb-1">
                    Upload image from device (Stored directly)
                  </label>
                  <label className="btn-secondary text-xs cursor-pointer inline-flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose file...</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="text-[var(--text-secondary)] block mb-1">Or direct image URL</label>
                  <input
                    type="url"
                    value={profileForm.avatarUrl}
                    onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-xs font-sans outline-none focus:border-[var(--text-primary)] transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-[var(--text-secondary)]">Full Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-xs font-sans outline-none focus:border-[var(--text-primary)]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[var(--text-secondary)]">Primary Role</label>
              <input
                type="text"
                value={profileForm.role}
                onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-xs font-sans outline-none focus:border-[var(--text-primary)]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[var(--text-secondary)]">Specialization Sub-role</label>
              <input
                type="text"
                value={profileForm.subRole}
                onChange={(e) => setProfileForm({ ...profileForm, subRole: e.target.value })}
                className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-xs font-sans outline-none focus:border-[var(--text-primary)]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[var(--text-secondary)]">Location</label>
              <input
                type="text"
                value={profileForm.location}
                onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-xs font-sans outline-none focus:border-[var(--text-primary)]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[var(--text-secondary)]">Email Address</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-xs font-sans outline-none focus:border-[var(--text-primary)]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[var(--text-secondary)]">LinkedIn URL</label>
              <input
                type="url"
                value={profileForm.linkedin}
                onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-xs font-sans outline-none focus:border-[var(--text-primary)]"
              />
            </div>
          </div>

          <div className="space-y-1 text-xs font-mono">
            <label className="text-[var(--text-secondary)]">Bio &amp; Narrative</label>
            <textarea
              rows={4}
              value={profileForm.bio}
              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
              className="w-full p-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] text-xs font-sans outline-none focus:border-[var(--text-primary)] resize-none"
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile to Firebase</span>
          </button>
        </form>
      )}

      {/* TAB 2: EXPERIENCE */}
      {activeTab === 'experience' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-eyebrow text-xs text-[var(--text-tertiary)] uppercase">
              Career Timeline ({data.experiences.length})
            </span>
            <button
              onClick={() => {
                setEditingExp(null);
                setIsAddingExp(true);
              }}
              className="btn-secondary text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Experience</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display-title text-base font-bold text-[var(--text-primary)]">
                      {exp.role}
                    </h4>
                    <span className="text-xs text-[var(--text-secondary)] font-medium">@ {exp.company}</span>
                  </div>
                  <div className="text-xs font-mono text-[var(--text-tertiary)]">
                    {exp.period} · {exp.location}
                  </div>
                  <ul className="text-xs text-[var(--text-secondary)] list-disc pl-4 pt-2 space-y-1">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setEditingExp(exp)}
                    className="p-2 rounded-full border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm('Delete this experience entry?')) {
                        await deleteExperience(exp.id);
                        showNotification('Experience removed from Firebase');
                      }
                    }}
                    className="p-2 rounded-full border border-[var(--accent-red)]/30 text-[var(--accent-red)] hover:bg-[var(--accent-red-subtle)] transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add / Edit Experience Dialog */}
          {(isAddingExp || editingExp) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
              <div className="w-full max-w-lg rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6 sm:p-7 space-y-4 text-xs font-mono max-h-[90vh] overflow-y-auto">
                <h4 className="font-display-title text-lg font-bold text-[var(--text-primary)]">
                  {editingExp ? 'Edit Experience' : 'Add Experience'}
                </h4>
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Job Role</label>
                    <input
                      type="text"
                      defaultValue={editingExp?.role || ''}
                      id="exp-role-input"
                      placeholder="e.g. Senior Customer Support Executive"
                      className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none focus:border-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Company</label>
                    <input
                      type="text"
                      defaultValue={editingExp?.company || ''}
                      id="exp-company-input"
                      placeholder="e.g. Concentrix Service India"
                      className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none focus:border-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Location</label>
                    <input
                      type="text"
                      defaultValue={editingExp?.location || ''}
                      id="exp-loc-input"
                      placeholder="e.g. Bangalore, Karnataka"
                      className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none focus:border-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Period</label>
                    <input
                      type="text"
                      defaultValue={editingExp?.period || ''}
                      id="exp-period-input"
                      placeholder="e.g. Aug 2024 — Present"
                      className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none focus:border-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Bullets (one per line)</label>
                    <textarea
                      rows={4}
                      defaultValue={editingExp?.bullets.join('\n') || ''}
                      id="exp-bullets-input"
                      className="w-full p-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] resize-none outline-none focus:border-[var(--text-primary)]"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsAddingExp(false);
                      setEditingExp(null);
                    }}
                    className="btn-outline text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      const role = (document.getElementById('exp-role-input') as HTMLInputElement)?.value;
                      const company = (document.getElementById('exp-company-input') as HTMLInputElement)?.value;
                      const location = (document.getElementById('exp-loc-input') as HTMLInputElement)?.value;
                      const period = (document.getElementById('exp-period-input') as HTMLInputElement)?.value;
                      const bullets = (document.getElementById('exp-bullets-input') as HTMLTextAreaElement)?.value
                        .split('\n')
                        .map((b) => b.trim())
                        .filter(Boolean);

                      if (!role || !company) return;

                      const expData: Experience = {
                        id: editingExp?.id || `exp_${Date.now()}`,
                        role,
                        company,
                        location,
                        period,
                        current: period.toLowerCase().includes('present'),
                        bullets
                      };

                      if (editingExp) {
                        await updateExperience(editingExp.id, expData);
                        showNotification('Experience updated in Firebase');
                      } else {
                        await addExperience(expData);
                        showNotification('Experience created in Firebase');
                      }

                      setIsAddingExp(false);
                      setEditingExp(null);
                    }}
                    className="btn-primary text-xs"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SKILLS */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-eyebrow text-xs text-[var(--text-tertiary)] uppercase">
              Skills Matrix ({data.skills.length})
            </span>
            <button
              onClick={() => {
                setEditingSkill(null);
                setIsAddingSkill(true);
              }}
              className="btn-secondary text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data.skills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-xs text-[var(--text-primary)]">{skill.name}</div>
                  <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase">
                    {skill.category} · {skill.percentage}%
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditingSkill(skill)}
                    className="p-1.5 rounded-full border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm(`Delete skill '${skill.name}'?`)) {
                        await deleteSkill(skill.id);
                        showNotification('Skill deleted');
                      }
                    }}
                    className="p-1.5 rounded-full border border-[var(--accent-red)]/30 text-[var(--accent-red)] hover:bg-[var(--accent-red-subtle)]"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Skill Add / Edit Dialog */}
          {(isAddingSkill || editingSkill) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
              <div className="w-full max-w-md rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6 space-y-4 text-xs font-mono">
                <h4 className="font-display-title text-lg font-bold text-[var(--text-primary)]">
                  {editingSkill ? 'Edit Skill' : 'Add Skill'}
                </h4>
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Skill Name</label>
                    <input
                      type="text"
                      defaultValue={editingSkill?.name || ''}
                      id="skill-name-input"
                      placeholder="e.g. WhatsApp Multi-Chat"
                      className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Proficiency Percentage (1-100)</label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      defaultValue={editingSkill?.percentage || 90}
                      id="skill-percent-input"
                      className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Category</label>
                    <select
                      defaultValue={editingSkill?.category || 'core'}
                      id="skill-cat-input"
                      className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none"
                    >
                      <option value="core">Core Support &amp; BPO</option>
                      <option value="ai">AI &amp; Automation</option>
                      <option value="security">Security &amp; Compliance</option>
                      <option value="soft">Empathy &amp; Soft Skills</option>
                      <option value="tool">Technical Tools</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsAddingSkill(false);
                      setEditingSkill(null);
                    }}
                    className="btn-outline text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      const name = (document.getElementById('skill-name-input') as HTMLInputElement)?.value;
                      const percentage = Number((document.getElementById('skill-percent-input') as HTMLInputElement)?.value) || 90;
                      const category = (document.getElementById('skill-cat-input') as HTMLSelectElement)?.value as any;

                      if (!name) return;

                      const skillData: SkillCategory = {
                        id: editingSkill?.id || `skill_${Date.now()}`,
                        name,
                        percentage,
                        category
                      };

                      if (editingSkill) {
                        await updateSkill(editingSkill.id, skillData);
                        showNotification('Skill updated in Firebase');
                      } else {
                        await addSkill(skillData);
                        showNotification('Skill added to Firebase');
                      }

                      setIsAddingSkill(false);
                      setEditingSkill(null);
                    }}
                    className="btn-primary text-xs"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-eyebrow text-xs text-[var(--text-tertiary)] uppercase">
              Web Applications ({data.projects.length})
            </span>
            <button
              onClick={() => {
                setEditingProj(null);
                setIsAddingProj(true);
              }}
              className="btn-secondary text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display-title text-base font-bold text-[var(--text-primary)]">
                      {proj.title}
                    </h4>
                    {proj.featured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[var(--text-primary)] text-[var(--bg)]">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">{proj.tagline}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono text-[var(--text-tertiary)]">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setEditingProj(proj)}
                    className="p-2 rounded-full border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm(`Delete project '${proj.title}'?`)) {
                        await deleteProject(proj.id);
                        showNotification('Project deleted from Firebase');
                      }
                    }}
                    className="p-2 rounded-full border border-[var(--accent-red)]/30 text-[var(--accent-red)] hover:bg-[var(--accent-red-subtle)]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Project Add / Edit Dialog */}
          {(isAddingProj || editingProj) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
              <div className="w-full max-w-lg rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6 space-y-4 text-xs font-mono max-h-[90vh] overflow-y-auto">
                <h4 className="font-display-title text-lg font-bold text-[var(--text-primary)]">
                  {editingProj ? 'Edit Project' : 'Add Project'}
                </h4>
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Title</label>
                    <input
                      type="text"
                      defaultValue={editingProj?.title || ''}
                      id="proj-title-input"
                      placeholder="e.g. Suroor Ambient Radio"
                      className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Tagline</label>
                    <input
                      type="text"
                      defaultValue={editingProj?.tagline || ''}
                      id="proj-tagline-input"
                      placeholder="Short one-line description"
                      className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Full Description</label>
                    <textarea
                      rows={3}
                      defaultValue={editingProj?.description || ''}
                      id="proj-desc-input"
                      className="w-full p-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] resize-none outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Live Demo URL</label>
                      <input
                        type="url"
                        defaultValue={editingProj?.liveUrl || ''}
                        id="proj-live-input"
                        placeholder="https://..."
                        className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">GitHub / Code URL</label>
                      <input
                        type="url"
                        defaultValue={editingProj?.githubUrl || ''}
                        id="proj-github-input"
                        placeholder="https://github.com/..."
                        className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Tags (comma-separated)</label>
                    <input
                      type="text"
                      defaultValue={editingProj?.tags.join(', ') || ''}
                      id="proj-tags-input"
                      placeholder="React, TypeScript, Tailwind"
                      className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsAddingProj(false);
                      setEditingProj(null);
                    }}
                    className="btn-outline text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      const title = (document.getElementById('proj-title-input') as HTMLInputElement)?.value;
                      const tagline = (document.getElementById('proj-tagline-input') as HTMLInputElement)?.value;
                      const description = (document.getElementById('proj-desc-input') as HTMLTextAreaElement)?.value;
                      const liveUrl = (document.getElementById('proj-live-input') as HTMLInputElement)?.value;
                      const githubUrl = (document.getElementById('proj-github-input') as HTMLInputElement)?.value;
                      const tags = (document.getElementById('proj-tags-input') as HTMLInputElement)?.value
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean);

                      if (!title) return;

                      const projData: Project = {
                        id: editingProj?.id || `proj_${Date.now()}`,
                        title,
                        tagline,
                        description,
                        category: editingProj?.category || 'Web Application',
                        image: editingProj?.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
                        liveUrl,
                        githubUrl,
                        tags,
                        highlights: editingProj?.highlights || ['Built with high responsiveness', 'Clean architecture'],
                        featured: editingProj?.featured ?? true
                      };

                      if (editingProj) {
                        await updateProject(editingProj.id, projData);
                        showNotification('Project updated in Firebase');
                      } else {
                        await addProject(projData);
                        showNotification('Project added to Firebase');
                      }

                      setIsAddingProj(false);
                      setEditingProj(null);
                    }}
                    className="btn-primary text-xs"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: CERTIFICATIONS */}
      {activeTab === 'certs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-eyebrow text-xs text-[var(--text-tertiary)] uppercase">
              Certifications &amp; Credentials ({data.certificates.length})
            </span>
            <button
              onClick={() => {
                setEditingCert(null);
                setIsAddingCert(true);
              }}
              className="btn-secondary text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Credential</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="font-semibold text-xs text-[var(--text-primary)]">{cert.title}</div>
                  <div className="text-[10px] font-mono text-[var(--text-tertiary)]">
                    {cert.issuer} · {cert.date}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setEditingCert(cert)}
                    className="p-1.5 rounded-full border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm(`Delete credential '${cert.title}'?`)) {
                        await deleteCertificate(cert.id);
                        showNotification('Credential deleted');
                      }
                    }}
                    className="p-1.5 rounded-full border border-[var(--accent-red)]/30 text-[var(--accent-red)] hover:bg-[var(--accent-red-subtle)]"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cert Add / Edit Dialog */}
          {(isAddingCert || editingCert) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
              <div className="w-full max-w-md rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6 space-y-4 text-xs font-mono">
                <h4 className="font-display-title text-lg font-bold text-[var(--text-primary)]">
                  {editingCert ? 'Edit Credential' : 'Add Credential'}
                </h4>
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Title</label>
                    <input
                      type="text"
                      defaultValue={editingCert?.title || ''}
                      id="cert-title-input"
                      placeholder="e.g. Prompt Engineering with ChatGPT"
                      className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Issuer</label>
                    <input
                      type="text"
                      defaultValue={editingCert?.issuer || ''}
                      id="cert-issuer-input"
                      placeholder="e.g. Vanderbilt University (Coursera)"
                      className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Date / Year</label>
                    <input
                      type="text"
                      defaultValue={editingCert?.date || ''}
                      id="cert-date-input"
                      placeholder="e.g. 2025"
                      className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Credential URL (optional)</label>
                    <input
                      type="url"
                      defaultValue={editingCert?.credentialUrl || ''}
                      id="cert-url-input"
                      placeholder="https://coursera.org/verify/..."
                      className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsAddingCert(false);
                      setEditingCert(null);
                    }}
                    className="btn-outline text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      const title = (document.getElementById('cert-title-input') as HTMLInputElement)?.value;
                      const issuer = (document.getElementById('cert-issuer-input') as HTMLInputElement)?.value;
                      const date = (document.getElementById('cert-date-input') as HTMLInputElement)?.value;
                      const credentialUrl = (document.getElementById('cert-url-input') as HTMLInputElement)?.value;

                      if (!title || !issuer) return;

                      const certData: Certificate = {
                        id: editingCert?.id || `cert_${Date.now()}`,
                        title,
                        issuer,
                        date,
                        category: editingCert?.category || 'ai',
                        credentialUrl
                      };

                      if (editingCert) {
                        await updateCertificate(editingCert.id, certData);
                        showNotification('Certificate updated in Firebase');
                      } else {
                        await addCertificate(certData);
                        showNotification('Certificate added to Firebase');
                      }

                      setIsAddingCert(false);
                      setEditingCert(null);
                    }}
                    className="btn-primary text-xs"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: BLOG */}
      {activeTab === 'blog' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-eyebrow text-xs text-[var(--text-tertiary)] uppercase">
              Articles &amp; Field Notes ({data.posts.length})
            </span>
            <button
              onClick={() => {
                setEditingPost(null);
                setIsAddingPost(true);
              }}
              className="btn-secondary text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Post</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.posts.map((post) => (
              <div
                key={post.id}
                className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)] flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <h4 className="font-display-title text-base font-bold text-[var(--text-primary)]">
                    {post.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2">{post.excerpt}</p>
                  <div className="text-[10px] font-mono text-[var(--text-tertiary)] pt-1">
                    {post.date} · {post.readTime}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setEditingPost(post)}
                    className="p-2 rounded-full border border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm(`Delete post '${post.title}'?`)) {
                        await deletePost(post.id);
                        showNotification('Post deleted from Firebase');
                      }
                    }}
                    className="p-2 rounded-full border border-[var(--accent-red)]/30 text-[var(--accent-red)] hover:bg-[var(--accent-red-subtle)]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Post Add / Edit Dialog */}
          {(isAddingPost || editingPost) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
              <div className="w-full max-w-xl rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-6 space-y-4 text-xs font-mono max-h-[90vh] overflow-y-auto">
                <h4 className="font-display-title text-lg font-bold text-[var(--text-primary)]">
                  {editingPost ? 'Edit Post' : 'New Post'}
                </h4>
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Title</label>
                    <input
                      type="text"
                      defaultValue={editingPost?.title || ''}
                      id="post-title-input"
                      placeholder="Title of your post"
                      className="w-full p-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Excerpt</label>
                    <textarea
                      rows={2}
                      defaultValue={editingPost?.excerpt || ''}
                      id="post-excerpt-input"
                      className="w-full p-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] resize-none outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--text-secondary)] text-xs block mb-1 font-mono">Content</label>
                    <textarea
                      rows={6}
                      defaultValue={editingPost?.content || ''}
                      id="post-content-input"
                      className="w-full p-3 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] resize-none outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsAddingPost(false);
                      setEditingPost(null);
                    }}
                    className="btn-outline text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      const title = (document.getElementById('post-title-input') as HTMLInputElement)?.value;
                      const excerpt = (document.getElementById('post-excerpt-input') as HTMLTextAreaElement)?.value;
                      const content = (document.getElementById('post-content-input') as HTMLTextAreaElement)?.value;

                      if (!title) return;

                      const postData: BlogPost = {
                        id: editingPost?.id || `post_${Date.now()}`,
                        title,
                        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        excerpt,
                        content,
                        date: editingPost?.date || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                        readTime: '3 min read',
                        tags: editingPost?.tags || ['Support', 'Operations'],
                        published: true
                      };

                      if (editingPost) {
                        await updatePost(editingPost.id, postData);
                        showNotification('Post updated in Firebase');
                      } else {
                        await addPost(postData);
                        showNotification('Post created in Firebase');
                      }

                      setIsAddingPost(false);
                      setEditingPost(null);
                    }}
                    className="btn-primary text-xs"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
