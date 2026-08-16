import React, { useState } from 'react';
import { Shield, Lock, FileText, CheckCircle2, ArrowLeft, Cookie } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (page: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies' | 'security'>('privacy');

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 24px', maxWidth: '1000px' }}>
      <button 
        onClick={() => onNavigate('landing')} 
        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', marginBottom: '24px' }}
      >
        <ArrowLeft size={16} /> Back to Overview
      </button>

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Legal & Compliance Center
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
          Transparency, data protection, and enterprise-grade security standards governing PRD Studio.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', marginBottom: '32px', overflowX: 'auto' }}>
        {[
          { id: 'privacy', label: 'Privacy Policy', icon: Shield },
          { id: 'terms', label: 'Terms of Service', icon: FileText },
          { id: 'cookies', label: 'Cookie Policy', icon: Cookie },
          { id: 'security', label: 'Security & Encryption', icon: Lock }
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: isActive ? 800 : 500,
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={16} /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Content Panels */}
      <div className="glass-card" style={{ padding: '36px', borderRadius: '24px', lineHeight: 1.7, color: 'var(--text-secondary)', fontSize: '14px' }}>
        {activeTab === 'privacy' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>1. Privacy Policy</h2>
            <p style={{ marginBottom: '14px' }}>
              At PRD Studio, accessible from <strong>prdstudio.io</strong>, one of our main priorities is the privacy of our visitors and users. This Privacy Policy document contains types of information that is collected and recorded by PRD Studio and how we use it.
            </p>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: '20px 0 10px 0' }}>Data We Collect & How It Is Handled</h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
              <li><strong>Local Storage Encryption:</strong> Your created PRDs, custom AI API keys, and session settings are saved locally inside your browser environment unless cloud sync is enabled.</li>
              <li><strong>AI Prompt Generation:</strong> When compiling Next.js + Laravel specifications, data is passed securely over TLS 1.3 to AI compilers without retaining your proprietary prompts.</li>
              <li><strong>Account Credentials:</strong> Hashes of passwords and auth tokens are stored using industry-standard bcrypt encryption.</li>
            </ul>
          </div>
        )}

        {activeTab === 'terms' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>2. Terms of Service</h2>
            <p style={{ marginBottom: '14px' }}>
              By accessing PRD Studio, you agree to comply with these terms. PRD Studio grants you a non-exclusive, non-transferable license to generate, export, and utilize PRDs for personal or commercial software development.
            </p>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: '20px 0 10px 0' }}>Intellectual Property & Code Rights</h3>
            <p style={{ marginBottom: '14px' }}>
              All software architecture specifications, database schemas, and AI prompts generated by PRD Studio belong 100% to you. PRD Studio claims no ownership over products designed using our platform.
            </p>
          </div>
        )}

        {activeTab === 'cookies' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>3. Cookie Policy</h2>
            <p style={{ marginBottom: '14px' }}>
              PRD Studio uses essential local cookies and browser local storage strictly for maintaining user authentication state, dark/light theme preferences, and active PRD drafting state.
            </p>
            <p>We do NOT use third-party tracking cookies or sell user data to advertising networks.</p>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>4. Security & Encryption Standards</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '20px' }}>
              <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '14px' }}>
                <CheckCircle2 color="#10B981" size={20} style={{ marginBottom: '8px' }} />
                <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>End-to-End TLS 1.3</div>
                <div style={{ fontSize: '12px' }}>All data transmitted between client and backend is encrypted in transit.</div>
              </div>
              <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '14px' }}>
                <CheckCircle2 color="#10B981" size={20} style={{ marginBottom: '8px' }} />
                <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>SOC2 Type II Ready</div>
                <div style={{ fontSize: '12px' }}>Designed around stringent infrastructure and privacy compliance checks.</div>
              </div>
              <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '14px' }}>
                <CheckCircle2 color="#10B981" size={20} style={{ marginBottom: '8px' }} />
                <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>API Key Isolation</div>
                <div style={{ fontSize: '12px' }}>Custom OpenAI/Anthropic keys are stored locally and never exposed.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
