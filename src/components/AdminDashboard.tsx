import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  ShieldCheck,
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
  ExternalLink
} from 'lucide-react';
import { Experience, SkillCategory, Project, Certificate, BlogPost } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    data,
    theme,
    isAdmin,
    adminUser,
    logout,
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

  if (!isAdmin) return null;

  const showNotification = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(null), 3000);
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
    showNotification('Profile and photo updated successfully!');
  };

  return (
    <div
      id="admin-dashboard-container"
      className={`my-16 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 border-2 border-cyan-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all ${
        theme === 'dark'
          ? 'bg-neutral-900/90 text-neutral-100 shadow-cyan-950/40'
          : 'bg-white text-neutral-900 shadow-xl'
      }`}
    >
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-bold">Admin Content Dashboard</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-400 font-semibold">
                Authorized
              </span>
            </div>
            <p className="text-xs font-mono text-neutral-400">
              Active Administrator: <span className="text-amber-400 font-semibold">{adminUser?.email}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={logout}
            className="px-3.5 py-1.5 rounded-xl border border-rose-500/40 hover:bg-rose-500/10 text-rose-400 text-xs font-mono transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {saveSuccess && (
        <div className="my-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 pt-6 pb-4 border-b border-neutral-800 text-xs font-mono">
        {[
          { id: 'profile', label: 'Photo & Profile', icon: User },
          { id: 'experience', label: `Experience (${data.experiences.length})`, icon: Briefcase },
          { id: 'skills', label: `Skills (${data.skills.length})`, icon: Cpu },
          { id: 'projects', label: `Projects (${data.projects.length})`, icon: Code },
          { id: 'certs', label: `Certifications (${data.certificates.length})`, icon: Award },
          { id: 'blog', label: `Blog (${data.posts.length})`, icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/20'
                  : 'bg-neutral-800/40 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
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
        <form onSubmit={handleSaveProfile} className="pt-6 space-y-6">
          {/* Profile Photo Change Option */}
          <div className="p-5 rounded-2xl border border-neutral-800 bg-neutral-950/40 space-y-4">
            <h3 className="font-display text-base font-bold text-cyan-400 flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span>Profile Photo Change Option</span>
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Photo Preview */}
              <div className="relative">
                {profileForm.avatarUrl ? (
                  <img
                    src={profileForm.avatarUrl}
                    alt="Profile Photo Preview"
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-cyan-500 shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-neutral-800 border-2 border-dashed border-neutral-600 flex flex-col items-center justify-center text-neutral-400 text-xs">
                    <User className="w-8 h-8 text-neutral-500 mb-1" />
                    <span>No Photo</span>
                  </div>
                )}
                {profileForm.avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setProfileForm({ ...profileForm, avatarUrl: '' })}
                    className="absolute -top-1 -right-1 p-1 rounded-full bg-rose-600 text-white text-xs"
                    title="Remove Photo"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Upload Controls */}
              <div className="space-y-3 flex-1 w-full text-xs font-mono">
                <div>
                  <label className="text-neutral-400 block mb-1">
                    Upload Photo from Computer (Instant preview)
                  </label>
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 cursor-pointer border border-neutral-700 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Choose Photo File...</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Or Paste Direct Image URL</label>
                  <input
                    type="url"
                    value={profileForm.avatarUrl}
                    onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-sans outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-neutral-400">Full Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-950 text-xs font-sans outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400">Primary Role</label>
              <input
                type="text"
                value={profileForm.role}
                onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-950 text-xs font-sans outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-neutral-400">Sub-Role / Tagline</label>
              <input
                type="text"
                value={profileForm.subRole}
                onChange={(e) => setProfileForm({ ...profileForm, subRole: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-950 text-xs font-sans outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-neutral-400">Bio Description</label>
              <textarea
                rows={3}
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-950 text-xs font-sans outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400">Location</label>
              <input
                type="text"
                value={profileForm.location}
                onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-950 text-xs font-sans outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400">Status Badge</label>
              <input
                type="text"
                value={profileForm.status}
                onChange={(e) => setProfileForm({ ...profileForm, status: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-950 text-xs font-sans outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400">Email Address</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-950 text-xs font-sans outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400">LinkedIn Profile URL</label>
              <input
                type="url"
                value={profileForm.linkedin}
                onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-950 text-xs font-sans outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="py-3 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-semibold flex items-center gap-2 transition-all hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile &amp; Photo</span>
          </button>
        </form>
      )}

      {/* TAB 2: EXPERIENCES */}
      {activeTab === 'experience' && (
        <div className="pt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-base font-bold">Manage Work History</h3>
            <button
              onClick={() => setIsAddingExp(true)}
              className="py-1.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Experience</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-4 rounded-2xl border border-neutral-800 bg-neutral-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-bold text-sm text-neutral-200">{exp.role}</h4>
                  <p className="text-xs font-mono text-amber-400">{exp.company} · {exp.location}</p>
                  <p className="text-[11px] font-mono text-neutral-500">{exp.period}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingExp(exp)}
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete experience at ${exp.company}?`)) {
                        deleteExperience(exp.id);
                        showNotification('Experience deleted.');
                      }
                    }}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs"
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
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <div className="w-full max-w-lg rounded-3xl border border-neutral-800 bg-neutral-950 p-6 space-y-4 text-xs font-mono max-h-[90vh] overflow-y-auto">
                <h4 className="font-bold text-base text-cyan-400">
                  {editingExp ? 'Edit Experience' : 'Add New Experience'}
                </h4>
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Job Role</label>
                    <input
                      type="text"
                      defaultValue={editingExp?.role || ''}
                      id="exp-role-input"
                      placeholder="e.g. Senior Customer Success Rep"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Company</label>
                    <input
                      type="text"
                      defaultValue={editingExp?.company || ''}
                      id="exp-company-input"
                      placeholder="Company Name"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Location</label>
                    <input
                      type="text"
                      defaultValue={editingExp?.location || ''}
                      id="exp-loc-input"
                      placeholder="e.g. Bangalore, Karnataka"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Period</label>
                    <input
                      type="text"
                      defaultValue={editingExp?.period || ''}
                      id="exp-period-input"
                      placeholder="e.g. Aug 2025 — Present"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Bullet Highlights (one per line)</label>
                    <textarea
                      rows={4}
                      defaultValue={editingExp?.bullets.join('\n') || ''}
                      id="exp-bullets-input"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsAddingExp(false);
                      setEditingExp(null);
                    }}
                    className="px-4 py-2 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const role = (document.getElementById('exp-role-input') as HTMLInputElement).value;
                      const company = (document.getElementById('exp-company-input') as HTMLInputElement).value;
                      const location = (document.getElementById('exp-loc-input') as HTMLInputElement).value;
                      const period = (document.getElementById('exp-period-input') as HTMLInputElement).value;
                      const bulletsRaw = (document.getElementById('exp-bullets-input') as HTMLTextAreaElement).value;
                      const bullets = bulletsRaw.split('\n').filter((b) => b.trim().length > 0);

                      if (editingExp) {
                        updateExperience(editingExp.id, {
                          ...editingExp,
                          role,
                          company,
                          location,
                          period,
                          bullets
                        });
                        showNotification('Experience updated!');
                      } else {
                        addExperience({
                          id: `exp-${Date.now()}`,
                          role,
                          company,
                          location,
                          period,
                          current: period.toLowerCase().includes('present'),
                          bullets
                        });
                        showNotification('Experience added!');
                      }
                      setIsAddingExp(false);
                      setEditingExp(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold"
                  >
                    Save Experience
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SKILLS */}
      {activeTab === 'skills' && (
        <div className="pt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-base font-bold">Manage Skills &amp; Percentages</h3>
            <button
              onClick={() => setIsAddingSkill(true)}
              className="py-1.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            {data.skills.map((skill) => (
              <div
                key={skill.id}
                className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/40 flex items-center justify-between"
              >
                <div>
                  <p className="text-neutral-200 font-bold">{skill.name}</p>
                  <p className="text-[10px] text-cyan-400">
                    Category: {skill.category.toUpperCase()} · {skill.percentage}%
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditingSkill(skill)}
                    className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => {
                      deleteSkill(skill.id);
                      showNotification('Skill removed.');
                    }}
                    className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add / Edit Skill Modal */}
          {(isAddingSkill || editingSkill) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-950 p-6 space-y-4 text-xs font-mono">
                <h4 className="font-bold text-base text-cyan-400">
                  {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                </h4>
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Skill Name</label>
                    <input
                      type="text"
                      defaultValue={editingSkill?.name || ''}
                      id="skill-name-input"
                      placeholder="e.g. Next.js & API Integration"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Proficiency Percentage (0-100)</label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      defaultValue={editingSkill?.percentage || 95}
                      id="skill-pct-input"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Category</label>
                    <select
                      id="skill-cat-input"
                      defaultValue={editingSkill?.category || 'core'}
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white font-mono"
                    >
                      <option value="core">Core Support &amp; Ops</option>
                      <option value="ai">AI &amp; Automation</option>
                      <option value="security">Security &amp; Compliance</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsAddingSkill(false);
                      setEditingSkill(null);
                    }}
                    className="px-4 py-2 rounded-xl border border-neutral-800 text-neutral-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const name = (document.getElementById('skill-name-input') as HTMLInputElement).value;
                      const pct = parseInt((document.getElementById('skill-pct-input') as HTMLInputElement).value, 10);
                      const cat = (document.getElementById('skill-cat-input') as HTMLSelectElement).value as any;

                      if (editingSkill) {
                        updateSkill(editingSkill.id, {
                          ...editingSkill,
                          name,
                          percentage: pct,
                          category: cat
                        });
                        showNotification('Skill updated!');
                      } else {
                        addSkill({
                          id: `sk-${Date.now()}`,
                          name,
                          percentage: pct,
                          category: cat
                        });
                        showNotification('Skill added!');
                      }
                      setIsAddingSkill(false);
                      setEditingSkill(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold"
                  >
                    Save Skill
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="pt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-base font-bold">Manage Project Showcase</h3>
            <button
              onClick={() => setIsAddingProj(true)}
              className="py-1.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-2xl border border-neutral-800 bg-neutral-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-bold text-sm text-neutral-200">{proj.title}</h4>
                  <p className="text-xs font-mono text-amber-400">{proj.tagline}</p>
                  <p className="text-[11px] font-mono text-neutral-500">Tags: {proj.tags.join(', ')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingProj(proj)}
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete project "${proj.title}"?`)) {
                        deleteProject(proj.id);
                        showNotification('Project deleted.');
                      }
                    }}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add / Edit Project Modal */}
          {(isAddingProj || editingProj) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <div className="w-full max-w-lg rounded-3xl border border-neutral-800 bg-neutral-950 p-6 space-y-4 text-xs font-mono max-h-[90vh] overflow-y-auto">
                <h4 className="font-bold text-base text-cyan-400">
                  {editingProj ? 'Edit Project' : 'Add New Project'}
                </h4>
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Title</label>
                    <input
                      type="text"
                      defaultValue={editingProj?.title || ''}
                      id="proj-title-input"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Tagline</label>
                    <input
                      type="text"
                      defaultValue={editingProj?.tagline || ''}
                      id="proj-tagline-input"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Description</label>
                    <textarea
                      rows={3}
                      defaultValue={editingProj?.description || ''}
                      id="proj-desc-input"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Tags (comma separated)</label>
                    <input
                      type="text"
                      defaultValue={editingProj?.tags.join(', ') || 'React, TypeScript, AI'}
                      id="proj-tags-input"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Image URL</label>
                    <input
                      type="url"
                      defaultValue={editingProj?.image || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df'}
                      id="proj-img-input"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Live Demo URL</label>
                    <input
                      type="url"
                      defaultValue={editingProj?.liveUrl || ''}
                      id="proj-live-input"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">GitHub URL</label>
                    <input
                      type="url"
                      defaultValue={editingProj?.githubUrl || ''}
                      id="proj-git-input"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsAddingProj(false);
                      setEditingProj(null);
                    }}
                    className="px-4 py-2 rounded-xl border border-neutral-800 text-neutral-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const title = (document.getElementById('proj-title-input') as HTMLInputElement).value;
                      const tagline = (document.getElementById('proj-tagline-input') as HTMLInputElement).value;
                      const description = (document.getElementById('proj-desc-input') as HTMLTextAreaElement).value;
                      const tagsRaw = (document.getElementById('proj-tags-input') as HTMLInputElement).value;
                      const tags = tagsRaw.split(',').map((t) => t.trim()).filter(Boolean);
                      const image = (document.getElementById('proj-img-input') as HTMLInputElement).value;
                      const liveUrl = (document.getElementById('proj-live-input') as HTMLInputElement).value;
                      const githubUrl = (document.getElementById('proj-git-input') as HTMLInputElement).value;

                      if (editingProj) {
                        updateProject(editingProj.id, {
                          ...editingProj,
                          title,
                          tagline,
                          description,
                          tags,
                          image,
                          liveUrl,
                          githubUrl
                        });
                        showNotification('Project updated!');
                      } else {
                        addProject({
                          id: `proj-${Date.now()}`,
                          title,
                          tagline,
                          description,
                          tags,
                          category: 'Support Tech',
                          image,
                          liveUrl,
                          githubUrl,
                          highlights: ['High throughput optimization', 'Integrated real-time triage']
                        });
                        showNotification('Project added!');
                      }
                      setIsAddingProj(false);
                      setEditingProj(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold"
                  >
                    Save Project
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: CERTIFICATES */}
      {activeTab === 'certs' && (
        <div className="pt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-base font-bold">Manage Certificates ({data.certificates.length})</h3>
            <button
              onClick={() => setIsAddingCert(true)}
              className="py-1.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Certificate</span>
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
            {data.certificates.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-xl border border-neutral-800 bg-neutral-950/40 flex items-center justify-between text-xs font-mono"
              >
                <div>
                  <span className="font-bold text-neutral-200">{c.title}</span>
                  <span className="text-neutral-500 block text-[11px]">{c.issuer} · {c.date}</span>
                </div>
                <button
                  onClick={() => {
                    deleteCertificate(c.id);
                    showNotification('Certificate deleted.');
                  }}
                  className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Certificate Modal */}
          {isAddingCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-950 p-6 space-y-4 text-xs font-mono">
                <h4 className="font-bold text-base text-cyan-400">Add New Certificate</h4>
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Certificate Title</label>
                    <input
                      type="text"
                      id="cert-title-input"
                      placeholder="e.g. Advanced AI System Architecture"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Issuer Organization</label>
                    <input
                      type="text"
                      id="cert-issuer-input"
                      defaultValue="Concentrix University"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Completion Date</label>
                    <input
                      type="text"
                      id="cert-date-input"
                      defaultValue="Mar 2026"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Category</label>
                    <select
                      id="cert-cat-input"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white font-mono"
                    >
                      <option value="ai">AI &amp; Technology</option>
                      <option value="security">Security &amp; Compliance</option>
                      <option value="workplace">Workplace &amp; Culture</option>
                      <option value="tools">Tools &amp; Systems</option>
                      <option value="professional">Professional Development</option>
                      <option value="external">External &amp; Academic</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsAddingCert(false)}
                    className="px-4 py-2 rounded-xl border border-neutral-800 text-neutral-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const title = (document.getElementById('cert-title-input') as HTMLInputElement).value;
                      const issuer = (document.getElementById('cert-issuer-input') as HTMLInputElement).value;
                      const date = (document.getElementById('cert-date-input') as HTMLInputElement).value;
                      const cat = (document.getElementById('cert-cat-input') as HTMLSelectElement).value as any;

                      addCertificate({
                        id: `cert-${Date.now()}`,
                        title,
                        issuer,
                        date,
                        category: cat
                      });
                      showNotification('Certificate added!');
                      setIsAddingCert(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold"
                  >
                    Save Certificate
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: BLOG */}
      {activeTab === 'blog' && (
        <div className="pt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-base font-bold">Manage Technical Blog Posts</h3>
            <button
              onClick={() => setIsAddingPost(true)}
              className="py-1.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Post</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.posts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-2xl border border-neutral-800 bg-neutral-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-bold text-sm text-neutral-200">{post.title}</h4>
                  <p className="text-xs font-mono text-cyan-400">{post.date} · {post.readTime}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (confirm(`Delete post "${post.title}"?`)) {
                        deletePost(post.id);
                        showNotification('Post deleted.');
                      }
                    }}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Blog Post Modal */}
          {isAddingPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <div className="w-full max-w-lg rounded-3xl border border-neutral-800 bg-neutral-950 p-6 space-y-4 text-xs font-mono max-h-[90vh] overflow-y-auto">
                <h4 className="font-bold text-base text-cyan-400">Publish New Technical Post</h4>
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Title</label>
                    <input
                      type="text"
                      id="post-title-input"
                      placeholder="e.g. Scaling Real-Time CRM Webhooks"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Excerpt / Short Summary</label>
                    <textarea
                      rows={2}
                      id="post-excerpt-input"
                      placeholder="Brief overview..."
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Full Content / Article</label>
                    <textarea
                      rows={6}
                      id="post-content-input"
                      placeholder="Write your article details..."
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white resize-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs block mb-1 font-mono">Tags (comma separated)</label>
                    <input
                      type="text"
                      defaultValue="AI, Support Ops, BPO"
                      id="post-tags-input"
                      className="w-full p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsAddingPost(false)}
                    className="px-4 py-2 rounded-xl border border-neutral-800 text-neutral-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const title = (document.getElementById('post-title-input') as HTMLInputElement).value;
                      const excerpt = (document.getElementById('post-excerpt-input') as HTMLTextAreaElement).value;
                      const content = (document.getElementById('post-content-input') as HTMLTextAreaElement).value;
                      const tagsRaw = (document.getElementById('post-tags-input') as HTMLInputElement).value;
                      const tags = tagsRaw.split(',').map((t) => t.trim()).filter(Boolean);

                      addPost({
                        id: `post-${Date.now()}`,
                        title,
                        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        excerpt,
                        content,
                        date: 'Mar 2026',
                        readTime: '4 min read',
                        tags,
                        published: true
                      });
                      showNotification('Blog post published!');
                      setIsAddingPost(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold"
                  >
                    Publish Post
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reset & Backup Controls */}
      <div className="mt-10 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <p className="text-neutral-500">
          All modifications persist to server storage &amp; localStorage automatically.
        </p>

        <button
          onClick={() => {
            if (confirm('Reset all portfolio details back to default factory state?')) {
              resetToDefaults();
              setProfileForm(data.profile);
              showNotification('Reset to defaults.');
            }
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-800 text-neutral-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Factory Defaults</span>
        </button>
      </div>
    </div>
  );
};
