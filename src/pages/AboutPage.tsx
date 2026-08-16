import React from 'react';
import { Sparkles, Code, Cpu, Shield } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container animate-fade-in" style={{ maxWidth: '800px', paddingBottom: '60px' }}>
      <div className="saas-card" style={{ padding: '40px', borderRadius: '24px', marginBottom: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            About PRD Studio
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
            Turn any software idea into a developer-ready PRD in seconds.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '24px 0' }} />

        <div style={{ lineHeight: 1.7, fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          <p style={{ marginBottom: '16px' }}>
            <strong>PRD Studio</strong> is an enterprise-grade AI SaaS platform designed for modern engineering teams, product managers, and software architects. Our mission is to eliminate fragmented guesswork and unorganized specs by converting raw product concepts into production-grade, developer-ready Product Requirements Documents.
          </p>
          <p>
            Every generated PRD package contains 10 structured engineering sections including Product Overview, Functional Requirements, UI/UX Specs, Design Tokens, Next.js & Laravel 11 Architecture, MySQL Database Schemas, REST API Specifications, Security Controls, QA Test Suite, DevOps Configs, and a Master AI Coding Prompt optimized for Cursor, Claude Code, Antigravity, OpenCode, and Windsurf.
          </p>
        </div>

        {/* Platform Info Card */}
        <div style={{ background: 'var(--bg-main)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
            ⚡ Platform Specifications
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>
            <div>Core Engine: <strong>Laravel 11 REST API Backend + Next.js / React Frontend</strong></div>
            <div>Database Layer: <strong>MySQL (Database: aiprd)</strong></div>
            <div>Design System: <strong>Google Stitch DESIGN.md Standard</strong></div>
            <div>Version: <strong>v1.0.0 Enterprise Build</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};
