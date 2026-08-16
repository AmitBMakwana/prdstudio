import React from 'react';
import { 
  LayoutDashboard, Sparkles, CreditCard, User, Info, LogOut, Layers 
} from 'lucide-react';
import { UserProfile, ThemeMode } from '../types/prd';

interface SidebarNavProps {
  user: UserProfile;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
  onSignOut: () => void;
  activePage: string;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  user,
  onNavigate,
  onSignOut,
  activePage
}) => {
  return (
    <aside className="left-sidebar">
      <div>
        {/* Brand Header */}
        <div 
          className="brand-logo-redesigned" 
          onClick={() => onNavigate('dashboard')}
          style={{ cursor: 'pointer', marginBottom: '24px' }}
        >
          <div className="logo-badge-icon">
            <Layers size={18} />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800 }}>
            PRD Studio
          </span>
        </div>

        {/* User Profile Card Summary */}
        <div 
          onClick={() => onNavigate('account')}
          style={{
            background: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '10px 12px',
            marginBottom: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--primary)',
            color: 'white',
            fontWeight: 800,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {user.avatarLetter}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {user.name}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600 }}>
              ⚡ {user.creditsRemaining} Credits Available
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button 
            className={`sidebar-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </button>

          <button 
            className={`sidebar-item ${activePage === 'wizard' ? 'active' : ''}`}
            onClick={() => onNavigate('wizard')}
          >
            <Sparkles size={16} />
            PRD Builder
          </button>

          <button 
            className={`sidebar-item ${activePage === 'upgrade' ? 'active' : ''}`}
            onClick={() => onNavigate('upgrade')}
          >
            <CreditCard size={16} />
            Upgrade Plan
          </button>

          <button 
            className={`sidebar-item ${activePage === 'account' ? 'active' : ''}`}
            onClick={() => onNavigate('account')}
          >
            <User size={16} />
            Account & Profile
          </button>

          <button 
            className={`sidebar-item ${activePage === 'about' ? 'active' : ''}`}
            onClick={() => onNavigate('about')}
          >
            <Info size={16} />
            About Us
          </button>
        </div>
      </div>

      {/* Bottom Action: Sign Out Button */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
        <button 
          className="sidebar-item signout"
          onClick={onSignOut}
        >
          <LogOut size={16} />
          Sign Out User
        </button>
      </div>
    </aside>
  );
};
