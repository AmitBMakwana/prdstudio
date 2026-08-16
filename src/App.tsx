import React, { useState, useEffect } from 'react';
import { PRDDocument, UserProfile, ThemeMode } from './types/prd';
import { 
  getSavedPRDs, savePRD, deletePRD, getUserProfile, 
  saveUserProfile, addCredits, getSavedTheme, saveSavedTheme,
  isAuthenticated, logoutUser 
} from './services/storageService';
import { checkRouteAuth } from './middleware/authMiddleware';

import { Navbar } from './components/Navbar';
import { SidebarNav } from './components/SidebarNav';
import { MenuModal } from './components/MenuModal';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { WizardPage } from './pages/WizardPage';
import { PrdEditorPage } from './pages/PrdEditorPage';
import { UpgradePage } from './pages/UpgradePage';
import { AccountPage } from './pages/AccountPage';
import { AboutPage } from './pages/AboutPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { AiToolsPage } from './pages/AiToolsPage';
import { DocumentationPage } from './pages/DocumentationPage';
import { LegalPage } from './pages/LegalPage';
import { HelpPage } from './pages/HelpPage';
import { AdminPage } from './pages/AdminPage';
import { AdminLoginPage } from './pages/AdminLoginPage';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isAuthenticated());
  const [currentPage, setCurrentPage] = useState<string>(isAuthenticated() ? 'dashboard' : 'landing');
  const [user, setUser] = useState<UserProfile>(getUserProfile());
  const [prds, setPrds] = useState<PRDDocument[]>([]);
  const [activePRD, setActivePRD] = useState<PRDDocument | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeMode>(getSavedTheme());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const loadedPrds = getSavedPRDs();
    setPrds(loadedPrds);
    if (loadedPrds.length > 0) {
      setActivePRD(loadedPrds[0]);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveSavedTheme(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  const handleNavigate = (page: string) => {
    const authCheck = checkRouteAuth(page);
    if (!authCheck.authorized) {
      alert(authCheck.reason);
      setCurrentPage(authCheck.redirectPage || 'login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentPage(authCheck.redirectPage || page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompletePRD = (newPRD: PRDDocument) => {
    savePRD(newPRD);
    const updated = getSavedPRDs();
    setPrds(updated);
    setActivePRD(newPRD);
    setUser(getUserProfile());
    setCurrentPage('editor');
  };

  const handleSaveUpdatedPRD = (updatedPRD: PRDDocument) => {
    savePRD(updatedPRD);
    setPrds(getSavedPRDs());
    setActivePRD(updatedPRD);
  };

  const handleDeletePRD = (id: string) => {
    deletePRD(id);
    const updated = getSavedPRDs();
    setPrds(updated);
    if (activePRD?.id === id) {
      setActivePRD(updated.length > 0 ? updated[0] : null);
    }
  };

  const handleOpenPRD = (prd: PRDDocument) => {
    setActivePRD(prd);
    setCurrentPage('editor');
  };

  const handleUpgradeCredits = (credits: number, planName: 'Free' | 'Starter' | 'Pro' | 'Ultimate') => {
    addCredits(credits, planName);
    setUser(getUserProfile());
    alert(`Successfully upgraded to ${planName}! ${credits} AI credits added.`);
    setCurrentPage('dashboard');
  };

  const handleLoginSuccess = (newUser: UserProfile) => {
    saveUserProfile(newUser);
    setUser(newUser);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleSignOut = () => {
    logoutUser();
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const isAppView = isLoggedIn && ['dashboard', 'wizard', 'editor', 'upgrade', 'account', 'about', 'templates', 'aitools', 'docs', 'legal', 'help', 'admin'].includes(currentPage);

  const currentEditorPRD = activePRD || prds[0] || null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Menu Overlay Drawer */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user}
        onNavigate={handleNavigate}
        onSignOut={handleSignOut}
      />

      {isAppView ? (
        /* App Layout Grid with Left Sidebar */
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
          <SidebarNav
            user={user}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onNavigate={handleNavigate}
            onSignOut={handleSignOut}
            activePage={currentPage}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleSidebar}
          />

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
            <Navbar
              user={user}
              isLoggedIn={isLoggedIn}
              theme={theme}
              onToggleTheme={handleToggleTheme}
              onOpenMenu={() => setIsMenuOpen(true)}
              onNavigate={handleNavigate}
              onSignOut={handleSignOut}
              activePage={currentPage}
              isSidebarCollapsed={isSidebarCollapsed}
              onToggleSidebar={handleToggleSidebar}
            />

            <main style={{ flex: 1, padding: '20px 0' }}>
              {currentPage === 'dashboard' && (
                <DashboardPage
                  user={user}
                  prds={prds}
                  onNavigate={handleNavigate}
                  onOpenPRD={handleOpenPRD}
                  onDeletePRD={handleDeletePRD}
                />
              )}

              {currentPage === 'wizard' && (
                <WizardPage
                  onCompletePRD={handleCompletePRD}
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'editor' && (
                currentEditorPRD ? (
                  <PrdEditorPage
                    key={currentEditorPRD.id}
                    prd={currentEditorPRD}
                    onNavigate={handleNavigate}
                    onSavePRD={handleSaveUpdatedPRD}
                  />
                ) : (
                  <DashboardPage
                    user={user}
                    prds={prds}
                    onNavigate={handleNavigate}
                    onOpenPRD={handleOpenPRD}
                    onDeletePRD={handleDeletePRD}
                  />
                )
              )}

              {currentPage === 'templates' && (
                <TemplatesPage onNavigate={handleNavigate} />
              )}

              {currentPage === 'aitools' && (
                <AiToolsPage onNavigate={handleNavigate} />
              )}

              {currentPage === 'docs' && (
                <DocumentationPage />
              )}

              {currentPage === 'upgrade' && (
                <UpgradePage
                  user={user}
                  onUpgrade={handleUpgradeCredits}
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'account' && (
                <AccountPage
                  user={user}
                  onNavigate={handleNavigate}
                />
              )}

              {currentPage === 'about' && (
                <AboutPage />
              )}

              {currentPage === 'legal' && (
                <LegalPage onNavigate={handleNavigate} />
              )}

              {currentPage === 'help' && (
                <HelpPage onNavigate={handleNavigate} />
              )}

              {currentPage === 'admin' && (
                <AdminPage currentUser={user} onNavigate={handleNavigate} />
              )}
            </main>
          </div>
        </div>
      ) : (
        /* Standalone View (Landing & Login Pages) */
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar
            user={user}
            isLoggedIn={isLoggedIn}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onOpenMenu={() => setIsMenuOpen(true)}
            onNavigate={handleNavigate}
            onSignOut={handleSignOut}
            activePage={currentPage}
          />

          <main style={{ flex: 1 }}>
            {currentPage === 'landing' && (
              <LandingPage
                onNavigate={handleNavigate}
                onSelectPlan={(plan) => handleNavigate('upgrade')}
              />
            )}

            {currentPage === 'login' && (
              <LoginPage
                onLoginSuccess={handleLoginSuccess}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'legal' && (
              <LegalPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'help' && (
              <HelpPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'admin-login' && (
              <AdminLoginPage
                onLoginSuccess={handleLoginSuccess}
                onNavigate={handleNavigate}
              />
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
