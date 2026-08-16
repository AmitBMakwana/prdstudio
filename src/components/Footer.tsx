import React from 'react';
import { Layers } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer style={{ borderTop: '1px solid var(--border-color)', marginTop: '60px', padding: '48px 0 24px 0', background: 'var(--bg-card)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', marginBottom: '36px' }}>
          {/* Brand Info Column */}
          <div>
            <div className="brand-logo-saas" style={{ marginBottom: '12px' }}>
              <div className="logo-badge-icon">
                <Layers size={16} />
              </div>
              <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                PRD Studio
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '280px' }}>
              AI-powered PRD generation SaaS for modern software engineering teams.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px', color: 'var(--text-primary)' }}>
              Product
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <li><button onClick={() => onNavigate('landing')} style={{ color: 'inherit' }}>Features</button></li>
              <li><button onClick={() => onNavigate('dashboard')} style={{ color: 'inherit' }}>Dashboard</button></li>
              <li><button onClick={() => onNavigate('wizard')} style={{ color: 'inherit' }}>PRD Builder</button></li>
              <li><button onClick={() => onNavigate('upgrade')} style={{ color: 'inherit' }}>Pricing</button></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px', color: 'var(--text-primary)' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <li><button onClick={() => onNavigate('about')} style={{ color: 'inherit' }}>About Us</button></li>
              <li><a href="#" style={{ color: 'inherit' }}>Contact Support</a></li>
              <li><a href="#" style={{ color: 'inherit' }}>Documentation</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px', color: 'var(--text-primary)' }}>
              Legal & Security
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <li><a href="#" style={{ color: 'inherit' }}>Privacy Policy</a></li>
              <li><a href="#" style={{ color: 'inherit' }}>Terms of Service</a></li>
              <li><a href="#" style={{ color: 'inherit' }}>Security Standards</a></li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <div>© 2026 PRD Studio. All rights reserved.</div>
          <div>Enterprise AI Architecture Suite</div>
        </div>
      </div>
    </footer>
  );
};
