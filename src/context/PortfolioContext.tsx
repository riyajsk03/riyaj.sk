import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  PortfolioData,
  Profile,
  Experience,
  SkillCategory,
  Project,
  Certificate,
  BlogPost,
  AdminUser,
  ThemeMode,
  PageId
} from '../types';
import { initialPortfolioData } from '../initialData';
import {
  db,
  auth,
  googleProvider,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from '../lib/firebase';

interface PortfolioContextType {
  data: PortfolioData;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  // Navigation
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  canGoBack: boolean;
  canGoForward: boolean;
  goBack: () => void;
  goForward: () => void;
  // First time setup / wizard
  isChromeSetupOpen: boolean;
  setIsChromeSetupOpen: (open: boolean) => void;
  chromeSetupStep: number;
  setChromeSetupStep: (step: number) => void;
  // Auth state
  adminUser: AdminUser | null;
  isAdmin: boolean;
  isAuthChecking: boolean;
  // Modals & previews
  isTerminalOpen: boolean;
  setIsTerminalOpen: (open: boolean) => void;
  isSetupWizardOpen: boolean;
  setIsSetupWizardOpen: (open: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  selectedProject: Project | null;
  setSelectedProject: (p: Project | null) => void;
  selectedPost: BlogPost | null;
  setSelectedPost: (p: BlogPost | null) => void;
  // CRUD operations
  updateProfile: (profile: Profile) => Promise<boolean>;
  addExperience: (exp: Experience) => Promise<boolean>;
  updateExperience: (id: string, exp: Experience) => Promise<boolean>;
  deleteExperience: (id: string) => Promise<boolean>;
  addSkill: (skill: SkillCategory) => Promise<boolean>;
  updateSkill: (id: string, skill: SkillCategory) => Promise<boolean>;
  deleteSkill: (id: string) => Promise<boolean>;
  addProject: (proj: Project) => Promise<boolean>;
  updateProject: (id: string, proj: Project) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  addCertificate: (cert: Certificate) => Promise<boolean>;
  updateCertificate: (id: string, cert: Certificate) => Promise<boolean>;
  deleteCertificate: (id: string) => Promise<boolean>;
  addPost: (post: BlogPost) => Promise<boolean>;
  updatePost: (id: string, post: BlogPost) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
  // Auth Actions
  loginWithGoogleFirebase: () => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (email: string, name?: string, picture?: string) => boolean;
  logout: () => Promise<void>;
  resetToDefaults: () => Promise<void>;
  statusMessage: string | null;
  setStatusMessage: (msg: string | null) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'riyaj_portfolio_data_v2';
const ADMIN_STORAGE_KEY = 'riyaj_admin_session';
const AUTHORIZED_ADMIN_EMAIL = 'xriyajsk@gmail.com';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load localStorage', e);
    }
    return initialPortfolioData;
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme_mode');
    return (saved as ThemeMode) || 'light';
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (saved) {
        const u = JSON.parse(saved);
        if (u.email?.toLowerCase() === AUTHORIZED_ADMIN_EMAIL) return u;
      }
    } catch (e) {
      console.warn('Failed to parse admin session', e);
    }
    return null;
  });

  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSetupWizardOpen, setIsSetupWizardOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [statusMessage, setStatusMessageState] = useState<string | null>(null);
  const statusTimerRef = useRef<any>(null);

  // Keep pop-up notifications visible for 3 seconds before auto-dismissing
  const setStatusMessage = useCallback((msg: string | null) => {
    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
      statusTimerRef.current = null;
    }
    setStatusMessageState(msg);
    if (msg) {
      statusTimerRef.current = setTimeout(() => {
        setStatusMessageState(null);
        statusTimerRef.current = null;
      }, 3000);
    }
  }, []);

  // Multi-page navigation state
  const [activePage, setActivePageState] = useState<PageId>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'about', 'experience', 'certifications', 'work', 'contact', 'admin'].includes(hash)) {
        return hash;
      }
    }
    return 'home';
  });

  const [historyStack, setHistoryStack] = useState<PageId[]>(['home']);
  const [historyIdx, setHistoryIdx] = useState<number>(0);

  const setActivePage = (page: PageId) => {
    setActivePageState(page);
    window.location.hash = page;
    setHistoryStack((prev) => {
      const sliced = prev.slice(0, historyIdx + 1);
      return [...sliced, page];
    });
    setHistoryIdx((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const canGoBack = historyIdx > 0;
  const canGoForward = historyIdx < historyStack.length - 1;

  const goBack = () => {
    if (canGoBack) {
      const nextIdx = historyIdx - 1;
      setHistoryIdx(nextIdx);
      const page = historyStack[nextIdx];
      setActivePageState(page);
      window.location.hash = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goForward = () => {
    if (canGoForward) {
      const nextIdx = historyIdx + 1;
      setHistoryIdx(nextIdx);
      const page = historyStack[nextIdx];
      setActivePageState(page);
      window.location.hash = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Listen to popstate / hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'about', 'experience', 'certifications', 'work', 'contact', 'admin'].includes(hash)) {
        setActivePageState(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Chrome first-time setup wizard
  const [isChromeSetupOpen, setIsChromeSetupOpen] = useState(false);
  const [chromeSetupStep, setChromeSetupStep] = useState(1);

  // Sync theme with HTML class and data-theme attribute
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('theme_mode', theme);
  }, [theme]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthChecking(false);
      if (user && user.email?.toLowerCase() === AUTHORIZED_ADMIN_EMAIL) {
        const admin: AdminUser = {
          email: AUTHORIZED_ADMIN_EMAIL,
          name: user.displayName || 'Riyaj Sk',
          picture: user.photoURL || '',
          isAdmin: true,
          token: user.uid
        };
        setAdminUser(admin);
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(admin));
      } else if (user) {
        // Logged in with unauthorized email
        setAdminUser(null);
        localStorage.removeItem(ADMIN_STORAGE_KEY);
      }
    });
    return () => unsubscribe();
  }, []);

  // Real-time Firestore synchronization for portfolio data
  useEffect(() => {
    const docRef = doc(db, 'portfolio', 'main');

    // Subscribe to live Firestore changes
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const cloudData = snapshot.data() as PortfolioData;
          setData(cloudData);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cloudData));
        } else {
          // Document does not exist yet; populate initial data if admin or locally
          getDoc(docRef).catch(console.error);
        }
      },
      (error) => {
        console.warn('Firestore real-time subscription error, using local/server fallback:', error);
      }
    );

    // Fallback/initial server check
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setData((current) => {
            // Only update if current data is equal to default and server has fresher data
            return current === initialPortfolioData ? res.data : current;
          });
        }
      })
      .catch((err) => {
        console.log('Server portfolio sync note:', err);
      });

    return () => unsubscribe();
  }, []);

  // Helper to persist data to Firestore, LocalStorage, and Express Server fallback
  const persistData = async (newData: PortfolioData): Promise<boolean> => {
    setData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('LocalStorage error', e);
    }

    // Persist to Firebase Firestore if admin authenticated
    try {
      const docRef = doc(db, 'portfolio', 'main');
      await setDoc(docRef, newData, { merge: true });
    } catch (firestoreErr) {
      console.warn('Firestore write warning:', firestoreErr);
    }

    // Also sync to local backend file for container persistence
    if (adminUser && adminUser.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL) {
      try {
        await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            adminEmail: adminUser.email,
            data: newData
          })
        });
      } catch (serverErr) {
        console.warn('Server fallback sync note:', serverErr);
      }
    }

    return true;
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Dedicated Firebase Google Auth with strict email verification
  const loginWithGoogleFirebase = async (): Promise<{ success: boolean; error?: string; isUnauthorizedDomain?: boolean }> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userEmail = user.email?.toLowerCase();

      if (userEmail === AUTHORIZED_ADMIN_EMAIL) {
        const admin: AdminUser = {
          email: AUTHORIZED_ADMIN_EMAIL,
          name: user.displayName || 'Riyaj Sk',
          picture: user.photoURL || '',
          isAdmin: true,
          token: user.uid
        };
        setAdminUser(admin);
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(admin));
        setStatusMessage('Verified as Administrator: xriyajsk@gmail.com');
        return { success: true };
      } else {
        // Sign out immediately if email does not match
        await signOut(auth);
        setAdminUser(null);
        localStorage.removeItem(ADMIN_STORAGE_KEY);
        return {
          success: false,
          error: `Access Denied: Account '${user.email}' is not authorized. Only ${AUTHORIZED_ADMIN_EMAIL} can access the admin panel.`
        };
      }
    } catch (err: any) {
      console.error('Firebase Auth error:', err);
      // Popup blocked or closed by user
      if (err?.code === 'auth/popup-closed-by-user') {
        return { success: false, error: 'Sign in was cancelled.' };
      }
      if (err?.code === 'auth/unauthorized-domain') {
        const hostname = typeof window !== 'undefined' ? window.location.hostname : 'riyajsk.vercel.app';
        return {
          success: false,
          isUnauthorizedDomain: true,
          error: `Firebase: Error (auth/unauthorized-domain). The domain '${hostname}' has not been added to your Firebase Authorized Domains list yet.`
        };
      }
      return { success: false, error: err?.message || 'Authentication failed.' };
    }
  };

  const loginWithGoogle = (email: string, name = 'Riyaj Sk', picture?: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === AUTHORIZED_ADMIN_EMAIL) {
      const user: AdminUser = {
        email: AUTHORIZED_ADMIN_EMAIL,
        name,
        picture: picture || '',
        isAdmin: true,
        token: `g_auth_${Date.now()}`
      };
      setAdminUser(user);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(user));
      setStatusMessage('Signed in as Administrator (xriyajsk@gmail.com)');
      return true;
    }
    return false;
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Sign out error', e);
    }
    setAdminUser(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    setStatusMessage('Logged out from admin session');
  };

  const resetToDefaults = async () => {
    if (!adminUser) return;
    await persistData(initialPortfolioData);
    setStatusMessage('Portfolio reset to initial values in Firebase & local storage');
  };

  // CRUD Implementations
  const updateProfile = async (profile: Profile) => {
    const newData = { ...data, profile };
    return persistData(newData);
  };

  const addExperience = async (exp: Experience) => {
    const newData = { ...data, experiences: [exp, ...data.experiences] };
    return persistData(newData);
  };

  const updateExperience = async (id: string, exp: Experience) => {
    const newData = {
      ...data,
      experiences: data.experiences.map((item) => (item.id === id ? exp : item))
    };
    return persistData(newData);
  };

  const deleteExperience = async (id: string) => {
    const newData = {
      ...data,
      experiences: data.experiences.filter((item) => item.id !== id)
    };
    return persistData(newData);
  };

  const addSkill = async (skill: SkillCategory) => {
    const newData = { ...data, skills: [...data.skills, skill] };
    return persistData(newData);
  };

  const updateSkill = async (id: string, skill: SkillCategory) => {
    const newData = {
      ...data,
      skills: data.skills.map((s) => (s.id === id ? skill : s))
    };
    return persistData(newData);
  };

  const deleteSkill = async (id: string) => {
    const newData = {
      ...data,
      skills: data.skills.filter((s) => s.id !== id)
    };
    return persistData(newData);
  };

  const addProject = async (proj: Project) => {
    const newData = { ...data, projects: [proj, ...data.projects] };
    return persistData(newData);
  };

  const updateProject = async (id: string, proj: Project) => {
    const newData = {
      ...data,
      projects: data.projects.map((p) => (p.id === id ? proj : p))
    };
    return persistData(newData);
  };

  const deleteProject = async (id: string) => {
    const newData = {
      ...data,
      projects: data.projects.filter((p) => p.id !== id)
    };
    return persistData(newData);
  };

  const addCertificate = async (cert: Certificate) => {
    const newData = { ...data, certificates: [cert, ...data.certificates] };
    return persistData(newData);
  };

  const updateCertificate = async (id: string, cert: Certificate) => {
    const newData = {
      ...data,
      certificates: data.certificates.map((c) => (c.id === id ? cert : c))
    };
    return persistData(newData);
  };

  const deleteCertificate = async (id: string) => {
    const newData = {
      ...data,
      certificates: data.certificates.filter((c) => c.id !== id)
    };
    return persistData(newData);
  };

  const addPost = async (post: BlogPost) => {
    const newData = { ...data, posts: [post, ...data.posts] };
    return persistData(newData);
  };

  const updatePost = async (id: string, post: BlogPost) => {
    const newData = {
      ...data,
      posts: data.posts.map((p) => (p.id === id ? post : p))
    };
    return persistData(newData);
  };

  const deletePost = async (id: string) => {
    const newData = {
      ...data,
      posts: data.posts.filter((p) => p.id !== id)
    };
    return persistData(newData);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        theme,
        setTheme,
        toggleTheme,
        activePage,
        setActivePage,
        canGoBack,
        canGoForward,
        goBack,
        goForward,
        isChromeSetupOpen,
        setIsChromeSetupOpen,
        chromeSetupStep,
        setChromeSetupStep,
        adminUser,
        isAdmin: !!(adminUser && adminUser.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL),
        isAuthChecking,
        isTerminalOpen,
        setIsTerminalOpen,
        isSetupWizardOpen,
        setIsSetupWizardOpen,
        isAdminModalOpen,
        setIsAdminModalOpen,
        selectedProject,
        setSelectedProject,
        selectedPost,
        setSelectedPost,
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
        loginWithGoogleFirebase,
        loginWithGoogle,
        logout,
        resetToDefaults,
        statusMessage,
        setStatusMessage
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
