import React from 'react';
import { Info, FileText, Cpu, GitBranch, Palette, Database, Shield, Terminal } from 'lucide-react';

export const DocumentationPage: React.FC = () => {
  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
      <div style={{ textAlign: 'center', padding: '16px 20px 24px 20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.8px', marginBottom: '6px' }}>
          PRD STUDIO · ARCHITECTURAL DOCUMENTATION
        </div>
        <h1 className="canvas-title">
          Platform <span className="canvas-title-gradient">Documentation</span>
        </h1>
        <p className="canvas-subtitle" style={{ maxWidth: '640px', margin: '6px auto 0 auto' }}>
          "Comprehensive documentation covering the 6 deep specification files and AI prompt synthesis engine."
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {[
          { title: '01 Product Requirements (PRD)', desc: 'Executive summary, target personas, P0/P1 feature specs, user stories, and acceptance criteria.', icon: FileText },
          { title: '02 Technical Architecture (TRD)', desc: 'Next.js + Laravel 11 PHP API architecture, REST endpoints, performance rules, and caching.', icon: Cpu },
          { title: '03 Application Flow', desc: 'Screen progression maps, navigation journeys, authentication flows, and state transitions.', icon: GitBranch },
          { title: '04 UI/UX & DESIGN.md', desc: 'Design tokens based on Google Stitch standards, color palettes, typography, and wireframes.', icon: Palette },
          { title: '05 Database Architecture', desc: 'MySQL relational schemas (DB: aiprd), tables, columns, indexes, foreign keys, and Eloquent models.', icon: Database },
          { title: '06 Security & OWASP', desc: 'Sanctum token authentication, bcrypt hashing, PDO prepared statements, XSS & CSRF protection.', icon: Shield }
        ].map((doc, idx) => {
          const Icon = doc.icon;
          return (
            <div key={idx} className="canvas-card" style={{ padding: '28px', borderRadius: '20px', cursor: 'default' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Icon size={20} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>{doc.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{doc.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
