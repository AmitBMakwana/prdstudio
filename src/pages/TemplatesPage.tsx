import React from 'react';
import { Layout, Plus, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TemplatesPageProps {
  onNavigate: (page: string) => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ onNavigate }) => {
  const templates = [
    { title: 'E-commerce Website', desc: 'Online store with product listings, cart, checkout, payment integration, user accounts, and admin dashboard.', tags: ['E-commerce', 'Web', 'Stripe'] },
    { title: 'SaaS Dashboard', desc: 'Multi-tenant web application with user authentication, subscription billing, analytics, and settings.', tags: ['SaaS', 'Billing', 'Analytics'] },
    { title: 'Marketplace Platform', desc: 'Two-sided marketplace connecting buyers and sellers with search, messaging, and reviews.', tags: ['Marketplace', 'Social', 'Search'] },
    { title: 'CRM & Sales System', desc: 'Customer relationship management tool with deal pipeline, contacts, tasks, and reports.', tags: ['CRM', 'Enterprise', 'Pipeline'] },
    { title: 'Learning Management (LMS)', desc: 'Online course platform with video lessons, quizzes, certificates, and student tracking.', tags: ['LMS', 'Education', 'Video'] },
    { title: 'Social Community App', desc: 'Community platform with user profiles, news feed, posts, comments, likes, and messaging.', tags: ['Social', 'Feed', 'Mobile'] },
    { title: 'Portfolio / Agency', desc: 'Professional portfolio showcasing projects, team members, testimonials, and contact form.', tags: ['Portfolio', 'Agency', 'SEO'] },
    { title: 'Admin Panel & Internal Tool', desc: 'Internal operations tool with role-based access, data tables, CRUD operations, and audit logs.', tags: ['Internal', 'Admin', 'CRUD'] }
  ];

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
      <div style={{ textAlign: 'center', padding: '16px 20px 24px 20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.8px', marginBottom: '6px' }}>
          PRD STUDIO · TEMPLATES LIBRARY
        </div>
        <h1 className="canvas-title">
          Ready-to-Use <span className="canvas-title-gradient">PRD Templates</span>
        </h1>
        <p className="canvas-subtitle" style={{ maxWidth: '640px', margin: '6px auto 0 auto' }}>
          "Kickstart your software specification package with production-ready architecture templates."
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {templates.map((tpl, idx) => (
          <div key={idx} className="canvas-card" style={{ padding: '28px', borderRadius: '20px', cursor: 'default' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Layout size={20} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>{tpl.title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>{tpl.desc}</p>
            
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {tpl.tags.map((tag, tIdx) => (
                <span key={tIdx} style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {tag}
                </span>
              ))}
            </div>

            <button className="btn-primary" onClick={() => onNavigate('wizard')} style={{ width: '100%', justifyContent: 'center', fontSize: '13px' }}>
              <Sparkles size={15} /> Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
