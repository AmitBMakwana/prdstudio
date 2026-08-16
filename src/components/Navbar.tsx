import React, { useState } from 'react';
import { 
  Layers, LogOut, ChevronRight, Sun, Moon, Sparkles, Menu, X, 
  PanelLeftClose, PanelLeft, LayoutDashboard, User, Shield
} from 'lucide-react';
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
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  isLoggedIn,
  theme,
  onToggleTheme,
  onOpenMenu,
  onNavigate,
  onSignOut,
  activePage,
  isSidebarCollapsed = false,
  onToggleSidebar
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const getBreadcrumbLabel = (page: string) => {
    switch (page) {
      case 'dashboard': return 'Dashboard Workspace';
      case 'wizard': return 'PRD Builder Canvas';
      case 'editor': return 'PRD Spec Inspector';
      case 'templates': return 'Templates Library';
      case 'aitools': return 'AI Coding Tools';
      case 'docs': return 'Documentation';
      case 'upgrade': return 'Upgrade Plan';
      case 'account': return 'Account Settings';
      case 'about': return 'About Platform';
      case 'admin': return 'Admin Control Panel';
      default: return 'Workspace';
    }
  };

  const handleNavSection = (sectionId: string) => {
    if (activePage !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="saas-navbar">
      <div className="container saas-navbar-inner">
        {/* Left: Mobile Toggle & Sidebar Toggle / Clean Page Header Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Sidebar Collapse Toggle Icon Button */}
              {onToggleSidebar && (
                <button
                  onClick={onToggleSidebar}
                  style={{
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                  title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                >
                  {isSidebarCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
                </button>
              )}

              {/* Clean Active Page Title */}
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                {getBreadcrumbLabel(activePage)}
              </div>
            </div>
          ) : (
            /* Logged out: Display Brand Logo */
            <div 
              className="brand-logo-saas" 
              onClick={() => onNavigate('landing')}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <div className="logo-badge-icon" style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={18} />
              </div>
              <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
                PRD Studio
              </span>
            </div>
          )}
        </div>

        {/* Public Desktop Navigation Links (Only shown when logged out) */}
        {!isLoggedIn && (
          <div className="desktop-nav-links" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <a href="#features" onClick={(e) => { e.preventDefault(); handleNavSection('features'); }} style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none' }}>Features</a>
            <a href="#how-it-works" onClick={(e) => { e.preventDefault(); handleNavSection('how-it-works'); }} style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none' }}>How It Works</a>
            <a href="#ai-tools" onClick={(e) => { e.preventDefault(); handleNavSection('ai-tools'); }} style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none' }}>AI Tools</a>
            <a href="#templates" onClick={(e) => { e.preventDefault(); handleNavSection('templates'); }} style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none' }}>Templates</a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); handleNavSection('pricing'); }} style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none' }}>Pricing</a>
            <a href="#faq" onClick={(e) => { e.preventDefault(); handleNavSection('faq'); }} style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none' }}>FAQ</a>
          </div>
        )}

        {/* Right Controls: Theme Toggle, User Dropdown / Sign In / Start Building Free */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme Toggle Sun / Moon */}
          <button 
            onClick={onToggleTheme}
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} color="#F59E0B" /> : <Moon size={16} color="var(--primary)" />}
          </button>

          {isLoggedIn && user ? (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Credit Pill */}
              <div 
                onClick={() => onNavigate('upgrade')}
                style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', border: '1px solid var(--border-hover)' }}
                title="Credits Available"
              >
                ⚡ {user.creditsRemaining} Cr
              </div>

              {/* User Avatar Circle */}
              <div 
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: 'white', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                title={user.name}
              >
                {user.avatarLetter}
              </div>

              {/* Dropdown Menu */}
              {showUserDropdown && (
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: '48px', 
                    right: 0, 
                    width: '220px', 
                    padding: '8px', 
                    borderRadius: '16px', 
                    zIndex: 200, 
                    cursor: 'default',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-card)'
                  }}
                >
                  <div style={{ padding: '8px 10px 10px 10px', borderBottom: '1px solid var(--border-color)', marginBottom: '6px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>{user.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{user.email}</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <button 
                      onClick={() => { onNavigate('dashboard'); setShowUserDropdown(false); }} 
                      style={{ 
                        width: '100%', 
                        padding: '9px 12px', 
                        textAlign: 'left', 
                        fontSize: '13px', 
                        borderRadius: '10px', 
                        color: 'var(--text-primary)', 
                        background: 'transparent', 
                        border: 'none', 
                        outline: 'none', 
                        boxShadow: 'none', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        fontWeight: 600,
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <LayoutDashboard size={15} color="var(--primary)" /> Dashboard Workspace
                    </button>

                    <button 
                      onClick={() => { onNavigate('account'); setShowUserDropdown(false); }} 
                      style={{ 
                        width: '100%', 
                        padding: '9px 12px', 
                        textAlign: 'left', 
                        fontSize: '13px', 
                        borderRadius: '10px', 
                        color: 'var(--text-primary)', 
                        background: 'transparent', 
                        border: 'none', 
                        outline: 'none', 
                        boxShadow: 'none', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        fontWeight: 600,
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <User size={15} color="var(--text-muted)" /> Account & Audit Logs
                    </button>

                    <button 
                      onClick={() => { onNavigate('admin'); setShowUserDropdown(false); }} 
                      style={{ 
                        width: '100%', 
                        padding: '9px 12px', 
                        textAlign: 'left', 
                        fontSize: '13px', 
                        borderRadius: '10px', 
                        color: 'var(--primary)', 
                        background: 'transparent', 
                        border: 'none', 
                        outline: 'none', 
                        boxShadow: 'none', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        fontWeight: 700,
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary-light)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <Shield size={15} color="var(--primary)" /> Admin Control Panel
                    </button>

                    <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '4px 0' }} />

                    <button 
                      onClick={() => { onSignOut(); setShowUserDropdown(false); }} 
                      style={{ 
                        width: '100%', 
                        padding: '9px 12px', 
                        textAlign: 'left', 
                        fontSize: '13px', 
                        borderRadius: '10px', 
                        color: '#EF4444', 
                        background: 'transparent', 
                        border: 'none', 
                        outline: 'none', 
                        boxShadow: 'none', 
                        cursor: 'pointer', 
                        fontWeight: 600, 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#FEF2F2'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                onClick={() => onNavigate('login')} 
                style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', padding: '8px 14px', background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                Sign In
              </button>
              <button 
                className="btn-primary" 
                onClick={() => onNavigate('wizard')} 
                style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '12px' }}
              >
                Start Building Free →
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
