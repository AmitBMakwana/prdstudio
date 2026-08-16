import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, AlertCircle, Sparkles, ArrowRight, Shield } from 'lucide-react';
import { UserProfile } from '../types/prd';
import { authenticateSuperAdmin } from '../services/adminService';

interface AdminLoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onNavigate: (page: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [email, setEmail] = useState('superadmin@prdstudio.io');
  const [password, setPassword] = useState('SuperAdmin2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const res = authenticateSuperAdmin(email, password);
    if (!res.success) {
      setErrorMessage(res.message || 'SuperAdmin authentication failed.');
      return;
    }

    if (res.user) {
      onLoginSuccess(res.user);
      onNavigate('admin');
    }
  };

  const autoFillSuperAdmin = () => {
    setEmail('superadmin@prdstudio.io');
    setPassword('SuperAdmin2026!');
    setErrorMessage(null);
  };

  return (
    <div className="animate-fade-in" style={{ minHeight: '88vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15) 0%, transparent 70%)' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '460px', padding: '40px', borderRadius: '32px', border: '1px solid var(--primary)' }}>
        
        {/* SuperAdmin Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--primary-gradient)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', boxShadow: '0 10px 25px rgba(91, 75, 255, 0.3)' }}>
            <ShieldCheck size={30} />
          </div>
          <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '4px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            RESTRICTED PORTAL
          </span>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px', marginBottom: '6px' }}>
            SuperAdmin Login
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Database-backed SuperAdmin authentication for PRD Studio management.
          </p>
        </div>

        {/* Demo SuperAdmin Quick Fill Pill */}
        <button
          type="button"
          onClick={autoFillSuperAdmin}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            background: 'var(--bg-main)',
            color: 'var(--primary)',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            border: '1px solid var(--border-color)',
            cursor: 'pointer'
          }}
        >
          <Sparkles size={15} /> Auto-fill SuperAdmin Credentials (superadmin@prdstudio.io)
        </button>

        {/* Error Alert Box */}
        {errorMessage && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', padding: '12px 16px', borderRadius: '14px', color: '#DC2626', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
              SuperAdmin Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={e => { setEmail(e.target.value); setErrorMessage(null); }}
                placeholder="superadmin@prdstudio.io"
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 44px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-primary)',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
              SuperAdmin Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => { setPassword(e.target.value); setErrorMessage(null); }}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '14px 44px 14px 44px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-primary)',
                  fontSize: '14px'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '14px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '15px', fontSize: '15px' }}
          >
            Authenticate SuperAdmin Portal <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Standard user?{' '}
          <button
            onClick={() => onNavigate('login')}
            style={{ color: 'var(--primary)', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            User Login Screen →
          </button>
        </div>
      </div>
    </div>
  );
};
