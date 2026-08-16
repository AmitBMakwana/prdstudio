import React, { useState } from 'react';
import { ArrowRight, Lock, Mail, User, CheckCircle2, KeyRound, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { UserProfile } from '../types/prd';
import { authenticateUser, registerUserAccount, isValidEmailFormat, isValidPasswordFormat } from '../services/storageService';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onNavigate: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (isRegister) {
      const res = registerUserAccount(name, email, password);
      if (!res.success) {
        setErrorMessage(res.message || 'Registration failed. Please check your details.');
        return;
      }
      if (res.user) onLoginSuccess(res.user);
    } else {
      const res = authenticateUser(email, password);
      if (!res.success) {
        setErrorMessage(res.message || 'Authentication failed. Please verify your credentials.');
        return;
      }
      if (res.user) onLoginSuccess(res.user);
    }
  };

  return (
    <div className="animate-fade-in" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '480px', padding: '40px', borderRadius: '32px', border: '1px solid var(--border-hover)' }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div className="logo-icon-box" style={{ width: '48px', height: '48px', margin: '0 auto 12px auto' }}>
            <KeyRound size={26} />
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
            {isRegister ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            {isRegister ? 'Sign up to start generating Next.js + Laravel PRDs' : 'Log in to manage your AI PRD Studio session'}
          </p>
        </div>

        {/* Validation Error Alert Box */}
        {errorMessage && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', padding: '12px 16px', borderRadius: '14px', color: '#DC2626', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {isRegister && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => { setName(e.target.value); setErrorMessage(null); }}
                  placeholder="John Doe"
                  required
                  autoComplete="name"
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
          )}

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
              <input 
                type="email" 
                value={email} 
                onChange={e => { setEmail(e.target.value); setErrorMessage(null); }}
                placeholder="you@example.com"
                required
                autoComplete="email"
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
            {email && !isValidEmailFormat(email) && (
              <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 600, marginTop: '4px', display: 'block' }}>
                ⚠️ Invalid email format (e.g., name@domain.com)
              </span>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Password
              </label>
              {!isRegister && (
                <button 
                  type="button" 
                  onClick={() => setShowForgot(true)}
                  style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={e => { setPassword(e.target.value); setErrorMessage(null); }}
                placeholder="••••••••"
                required
                autoComplete={isRegister ? "new-password" : "current-password"}
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
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {password && !isValidPasswordFormat(password) && (
              <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 600, marginTop: '4px', display: 'block' }}>
                ⚠️ Password must be at least 6 characters long
              </span>
            )}
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '16px', fontSize: '16px' }}
          >
            {isRegister ? 'Create Free Account' : 'Sign In To Dashboard'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '28px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            onClick={() => { setIsRegister(!isRegister); setErrorMessage(null); }} 
            style={{ color: 'var(--primary)', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {isRegister ? 'Sign In' : 'Sign Up Free'}
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="glass-card" style={{ width: '90%', maxWidth: '420px', padding: '36px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>Reset Your Password</h3>
            {forgotSubmitted ? (
              <div>
                <div style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontWeight: 700 }}>
                  <CheckCircle2 size={24} /> Reset instructions sent to {email}!
                </div>
                <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setShowForgot(false)}>
                  Close
                </button>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
                  Enter your registered email address to receive password reset instructions.
                </p>
                <input 
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-main)',
                    marginBottom: '20px',
                    color: 'var(--text-primary)'
                  }}
                />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowForgot(false)}>
                    Cancel
                  </button>
                  <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setForgotSubmitted(true)}>
                    Send Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
