import React, { useState, useEffect } from 'react';
import { PRDDocument, UserProfile, ThemeMode } from './types/prd';
import { 
  getSavedPRDs, savePRD, deletePRD, getUserProfile, 
  saveUserProfile, addCredits, getSavedTheme, saveSavedTheme 
} from './services/storageService';

import { Navbar } from './components/Navbar';
import { SidebarNav } from './components/SidebarNav';
import { MenuModal } from './components/MenuModal';
import { Footer } from './components/Footer';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { WizardPage } from './pages/WizardPage';
import { PrdEditorPage } from './pages/PrdEditorPage';
import { UpgradePage } from './pages/UpgradePage';
import { AccountPage } from './pages/AccountPage';
import { AboutPage } from './pages/AboutPage';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [user, setUser] = useState<UserProfile>(getUserProfile());
  const [prds, setPrds] = useState<PRDDocument[]>(getSavedPRDs());
  const [activePRD, setActivePRD] = useState<PRDDocument | null>(getSavedPRDs()[0] || null);
  const [theme, setTheme] = useState<ThemeMode>(getSavedTheme());
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    saveSavedTheme(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    saveSavedTheme(nextTheme);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPRD = (prd: PRDDocument) => {
    setActivePRD(prd);
    setCurrentPage('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompletePRD = (newPRD: PRDDocument) => {
    const updatedPRDs = savePRD(newPRD);
    setPrds(updatedPRDs);
    setUser(getUserProfile());
    setActivePRD(newPRD);
    setCurrentPage('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveUpdatedPRD = (updatedDoc: PRDDocument) => {
    const updatedPRDs = savePRD(updatedDoc);
    setPrds(updatedPRDs);
    setActivePRD(updatedDoc);
  };

  const handleDeletePRD = (id: string) => {
    const updatedPRDs = deletePRD(id);
    setPrds(updatedPRDs);
    if (activePRD?.id === id) {
      setActivePRD(updatedPRDs[0] || null);
    }
  };

  const handleUpgradeCredits = (credits: number, planName: 'Free' | 'Starter' | 'Pro' | 'Ultimate') => {
    const updatedUser = addCredits(credits, planName);
    setUser(updatedUser);
  };

  const handleLoginSuccess = (newUser: UserProfile) => {
    saveUserProfile(newUser);
    setUser(newUser);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const isAppView = isLoggedIn && ['dashboard', 'wizard', 'editor', 'upgrade', 'account', 'about'].includes(currentPage);

  // Safe PRD document for editor view
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
        <div className="app-layout-grid">
          <SidebarNav
            user={user}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onNavigate={handleNavigate}
            onSignOut={handleSignOut}
            activePage={currentPage}
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
            </main>

            <Footer onNavigate={handleNavigate} />
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
          </main>

          <Footer onNavigate={handleNavigate} />
        </div>
      )}
    </div>
  );
}

export default App;
