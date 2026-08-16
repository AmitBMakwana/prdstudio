import React from 'react';
import { X, LayoutDashboard, Sparkles, CreditCard, User, Info, LogOut, Shield } from 'lucide-react';
import { UserProfile } from '../types/prd';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onNavigate: (page: string) => void;
  onSignOut: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  user,
  onNavigate,
  onSignOut
}) => {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '30px'
      }}
      onClick={onClose}
    >
      <div 
        className="card animate-fade-in"
        style={{
          width: '90%',
          maxWidth: '850px',
          background: 'var(--bg-card)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar inside Modal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div className="brand-logo">
            <span className="tech">You</span>
            <span className="b">B</span>
            <span className="tech">Tech</span>
          </div>

          <button 
            onClick={onClose}
            style={{ 
              background: 'var(--bg-card-hover)', 
              padding: '8px', 
              borderRadius: '50%',
              color: 'var(--text-secondary)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* User Card Info Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div className="avatar-badge" style={{ width: '48px', height: '48px', fontSize: '20px' }}>
            {user.avatarLetter}
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {user.name}
            </div>
            <div className="credit-pill" style={{ marginTop: '4px' }}>
              <Sparkles size={13} /> {user.creditsRemaining} credits
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '20px 0' }} />

        {/* Menu Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={() => { onNavigate('dashboard'); onClose(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 18px',
              borderRadius: '12px',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontSize: '16px',
              fontWeight: 600,
              textAlign: 'left'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <LayoutDashboard size={20} color="var(--text-secondary)" />
            Dashboard
          </button>

          <button 
            onClick={() => { onNavigate('wizard'); onClose(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 18px',
              borderRadius: '12px',
              background: 'transparent',
              color: 'var(--primary)',
              fontSize: '16px',
              fontWeight: 600,
              textAlign: 'left'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-light)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Sparkles size={20} color="var(--primary)" />
            New PRD
          </button>

          <button 
            onClick={() => { onNavigate('upgrade'); onClose(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 18px',
              borderRadius: '12px',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontSize: '16px',
              fontWeight: 600,
              textAlign: 'left'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <CreditCard size={20} color="var(--text-secondary)" />
            Upgrade Plan
          </button>

          <button 
            onClick={() => { onNavigate('account'); onClose(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 18px',
              borderRadius: '12px',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontSize: '16px',
              fontWeight: 600,
              textAlign: 'left'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <User size={20} color="var(--text-secondary)" />
            Account
          </button>

          <button 
            onClick={() => { onNavigate('about'); onClose(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 18px',
              borderRadius: '12px',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontSize: '16px',
              fontWeight: 600,
              textAlign: 'left'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Info size={20} color="var(--text-secondary)" />
            About Us
          </button>

          <button 
            onClick={() => { onNavigate('admin'); onClose(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 18px',
              borderRadius: '12px',
              background: 'transparent',
              color: 'var(--primary)',
              fontSize: '16px',
              fontWeight: 700,
              textAlign: 'left'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-light)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Shield size={20} color="var(--primary)" />
            Admin Panel
          </button>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '8px 0' }} />

          <button 
            onClick={() => { onSignOut(); onClose(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 18px',
              borderRadius: '12px',
              background: 'transparent',
              color: '#EF4444',
              fontSize: '16px',
              fontWeight: 600,
              textAlign: 'left'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#FEF2F2'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={20} color="#EF4444" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
