import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { IOSAppFrame } from './components/IOSAppFrame';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ExperiencePage } from './components/pages/ExperiencePage';
import { CertificationsPage } from './components/pages/CertificationsPage';
import { WorkPage } from './components/pages/WorkPage';
import { ContactPage } from './components/pages/ContactPage';
import { AdminPage } from './components/pages/AdminPage';
import { AdminAuthModal } from './components/AdminAuthModal';
import { ProjectModal } from './components/ProjectModal';
import { BlogModal } from './components/BlogModal';
import { InteractiveTerminal } from './components/InteractiveTerminal';

const AppContent: React.FC = () => {
  const { activePage, statusMessage, setStatusMessage } = usePortfolio();

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'experience':
        return <ExperiencePage />;
      case 'certifications':
        return <CertificationsPage />;
      case 'work':
        return <WorkPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Toast Notification */}
      {statusMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 px-4 py-3 rounded-full bg-[var(--surface)] border border-[var(--border-strong)] text-[var(--text-primary)] text-xs font-mono shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-green)]" />
          <span>{statusMessage}</span>
          <button
            onClick={() => setStatusMessage(null)}
            className="p-1 hover:bg-[var(--surface-secondary)] rounded-full text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      )}

      {/* Full-Screen Responsive Portfolio Frame */}
      <IOSAppFrame>
        {renderActivePage()}
      </IOSAppFrame>

      {/* Modals */}
      <ProjectModal />
      <AdminAuthModal />
      <BlogModal />
      <InteractiveTerminal />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
