import React, { useState } from 'react';
import { Layers, LogOut, ChevronRight, Sun, Moon } from 'lucide-react';
import { UserProfile, ThemeMode } from '../types/prd';

interface NavbarProps {
  user: UserProfile | null;
  isLoggedIn: boolean;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenMenu: () => void;
  onNavigate: (page: string) => void;
  onSignOut: () => void;
  activePage: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  isLoggedIn,
  theme,
  onToggleTheme,
  onNavigate,
  onSignOut,
  activePage
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const getBreadcrumbLabel = (page: string) => {
    switch (page) {
      case 'dashboard': return 'Dashboard Workspace';
      case 'wizard': return 'PRD Builder Canvas';
      case 'editor': return 'PRD Spec Inspector';
      case 'upgrade': return 'Upgrade Plan';
      case 'account': return 'Account Settings';
      case 'about': return 'About Platform';
      default: return 'Workspace';
    }
  };

  return (
    <header className="saas-navbar">
      <div className="container saas-navbar-inner">
        {/* Left: Brand Logo & Breadcrumb Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div 
            className="brand-logo-saas" 
            onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'landing')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <div className="logo-badge-icon" style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={16} />
            </div>
            <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
              PRD Studio
            </span>
          </div>

          {/* Breadcrumb Navigation */}
          {isLoggedIn && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <ChevronRight size={14} />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {getBreadcrumbLabel(activePage)}
              </span>
            </div>
          )}
        </div>

        {/* Public Navigation Links (Only shown when logged out) */}
        {!isLoggedIn && (
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <button onClick={() => onNavigate('landing')} style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Features</button>
            <button onClick={() => onNavigate('landing')} style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>How It Works</button>
            <button onClick={() => onNavigate('landing')} style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>Pricing</button>
            <button onClick={() => onNavigate('about')} style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>About</button>
          </div>
        )}

        {/* Right Controls: Theme Toggle, Credits, Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme Toggle Moon/Sun */}
          <button 
            onClick={onToggleTheme}
            style={{ padding: '8px', borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={15} color="#F59E0B" /> : <Moon size={15} color="var(--primary)" />}
          </button>

          {isLoggedIn && user ? (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Credit Pill */}
              <div 
                onClick={() => onNavigate('upgrade')}
                style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', border: '1px solid var(--border-hover)' }}
                title="Credits Available"
              >
                ⚡ {user.creditsRemaining} Cr
              </div>

              {/* User Avatar Circle */}
              <div 
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--primary)', color: 'white', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                title={user.name}
              >
                {user.avatarLetter}
              </div>

              {/* User Dropdown Menu */}
              {showUserDropdown && (
                <div 
                  className="canvas-card"
                  style={{ position: 'absolute', top: '44px', right: 0, width: '200px', padding: '8px', borderRadius: '12px', zIndex: 200 }}
                >
                  <div style={{ padding: '8px', borderBottom: '1px solid var(--border-color)', marginBottom: '4px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{user.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{user.email}</div>
                  </div>
                  <button onClick={() => { onNavigate('dashboard'); setShowUserDropdown(false); }} style={{ width: '100%', padding: '8px 10px', textAlign: 'left', fontSize: '13px', borderRadius: '6px', color: 'var(--text-primary)' }}>Dashboard</button>
                  <button onClick={() => { onNavigate('account'); setShowUserDropdown(false); }} style={{ width: '100%', padding: '8px 10px', textAlign: 'left', fontSize: '13px', borderRadius: '6px', color: 'var(--text-primary)' }}>Account Settings</button>
                  <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '4px 0' }} />
                  <button onClick={() => { onSignOut(); setShowUserDropdown(false); }} style={{ width: '100%', padding: '8px 10px', textAlign: 'left', fontSize: '13px', borderRadius: '6px', color: '#EF4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => onNavigate('login')} style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', padding: '8px 14px' }}>Log In</button>
              <button className="btn-primary" onClick={() => onNavigate('wizard')} style={{ padding: '8px 16px', fontSize: '13px' }}>Start Building Free</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
