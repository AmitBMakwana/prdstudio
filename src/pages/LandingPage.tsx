import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Zap, Code, Layout, Cpu, 
  Terminal, ShieldCheck, Database, Layers, Check, FileText, CheckCircle
} from 'lucide-react';
import { PlanTier } from '../types/prd';

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onSelectPlan: (plan: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onSelectPlan }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'schema' | 'api' | 'prompt'>('overview');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const pricingPlans: PlanTier[] = [
    {
      id: 'free',
      name: 'Free',
      priceINR: 0,
      credits: 50,
      validityDays: 30,
      features: ['50 credits included', '1 Complete Developer PRD', 'Next.js + Laravel + MySQL Stack', 'Markdown & PDF export']
    },
    {
      id: 'starter',
      name: 'Starter',
      priceINR: 49,
      credits: 150,
      validityDays: 30,
      features: ['150 credits included', '3 Complete Developer PRDs', 'All Tech Stacks & Presets', 'Markdown, PDF, DOCX, JSON export']
    },
    {
      id: 'pro',
      name: 'Pro',
      priceINR: 99,
      credits: 500,
      validityDays: 30,
      isPopular: true,
      features: ['500 credits included', '10 Complete Developer PRDs', 'Google Stitch DESIGN.md System', 'Priority AI Compiler Synthesis']
    },
    {
      id: 'ultimate',
      name: 'Ultimate',
      priceINR: 149,
      credits: 1500,
      validityDays: 30,
      features: ['1500 credits included', '30 Complete Developer PRDs', 'Full API Access & Webhooks', 'Dedicated Architecture Support']
    }
  ];

  const faqs = [
    {
      q: 'How does PRD Studio generate developer-ready specs?',
      a: 'Our structured compiler analyzes your 6 wizard inputs (Platform, Stack, Style, Palette, Font, Description) and synthesizes 10 developer-ready PRD sections: Overview, Features, UI/UX Specs, Next.js/Laravel/MySQL Architecture, DB Schemas, API Routes, Security, QA, DevOps, and Master AI Prompts.'
    },
    {
      q: 'Can I use custom OpenAI, Anthropic, or Gemini API keys?',
      a: 'Yes! Click the "AI Key" button in the top navigation to enter your own OpenAI key (gpt-4o), Anthropic key (claude-3-5-sonnet), or Gemini key, or use our built-in compiler service.'
    },
    {
      q: 'Which database and backend tech stack is supported?',
      a: 'We feature Laravel 11 REST API with MySQL (database: aiprd), Next.js, React, Node.js, Python, Supabase, Postgres, and custom tech choices.'
    },
    {
      q: 'What export formats are supported?',
      a: 'Instant 1-click exports are available for Markdown (.md), PDF Document (.pdf), Structured JSON (.json), and Plain Text (.txt).'
    }
  ];

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '60px' }}>
      {/* Clean Production Hero */}
      <section style={{ textAlign: 'center', padding: '70px 20px 50px 20px', maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          background: 'var(--primary-light)', 
          color: 'var(--primary)', 
          padding: '6px 16px', 
          borderRadius: '20px', 
          fontSize: '13px', 
          fontWeight: 600,
          marginBottom: '20px',
          border: '1px solid rgba(37, 99, 235, 0.2)'
        }}>
          <Sparkles size={14} /> AI-Powered PRD Generation for Engineering Teams
        </div>

        <h1 style={{ 
          fontSize: 'clamp(36px, 5.5vw, 64px)', 
          fontWeight: 800, 
          letterSpacing: '-1.5px', 
          lineHeight: 1.1,
          marginBottom: '20px',
          color: 'var(--text-primary)'
        }}>
          Turn Raw Product Ideas Into <br />
          <span style={{ color: 'var(--primary)' }}>Developer-Ready Specs</span>
        </h1>

        <p style={{ 
          fontSize: '18px', 
          color: 'var(--text-secondary)', 
          lineHeight: 1.6, 
          maxWidth: '750px',
          margin: '0 auto 32px auto'
        }}>
          Generate 10 structured PRD sections, exact Next.js + Laravel 11 + MySQL database schemas, and AI coding prompts in 30 seconds.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
          <button className="btn-primary" onClick={() => onNavigate('wizard')} style={{ padding: '14px 28px', fontSize: '15px' }}>
            Start Building Free <ArrowRight size={18} />
          </button>
          <button className="btn-secondary" onClick={() => onNavigate('dashboard')} style={{ padding: '14px 24px', fontSize: '15px' }}>
            View Demo Dashboard
          </button>
        </div>

        {/* Clean Interactive Product Window Showcase Mockup */}
        <div className="saas-card" style={{ padding: 0, overflow: 'hidden', textAlign: 'left', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }}>
          {/* Mockup Header */}
          <div style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Online store with product — PRD Spec Package</div>
            </div>

            {/* Mockup Tabs */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: 'overview', label: 'Product Overview' },
                { id: 'schema', label: 'MySQL Schema' },
                { id: 'api', label: 'Laravel API' },
                { id: 'prompt', label: 'AI Master Prompt' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: activeTab === t.id ? 'var(--primary-light)' : 'transparent',
                    color: activeTab === t.id ? 'var(--primary)' : 'var(--text-muted)'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mockup Body Content */}
          <div style={{ padding: '24px', fontFamily: activeTab === 'overview' ? 'inherit' : 'monospace', fontSize: '13px', lineHeight: 1.6, color: 'var(--text-primary)', minHeight: '180px' }}>
            {activeTab === 'overview' && (
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Product Requirements Document – E-Commerce Store</h4>
                <p style={{ color: 'var(--text-secondary)' }}>
                  A production application featuring Next.js for frontend presentation, Laravel 11 API with Eloquent ORM for business logic, and MySQL (database: aiprd) for persistent data storage. Sub-second API response times and Google Stitch DESIGN.md system integration.
                </p>
              </div>
            )}

            {activeTab === 'schema' && (
              <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>
{`Table: users (id, name, email, password, phone, credits_remaining, plan)
Table: projects (id, user_id, title, platform, tech_stack_json, status)
Table: prd_documents (id, prd_id, user_id, title, platform_name, wizard_state_json, tech_tags_json, sections_json, master_prompt)`}
              </pre>
            )}

            {activeTab === 'api' && (
              <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>
{`POST /api/v1/auth/register -> { name, email, password } -> Sanctum Token
POST /api/v1/prds/generate -> WizardState JSON -> { prd: PRDDocument }
GET  /api/v1/prds/{id}     -> Return complete 10-section PRD package`}
              </pre>
            )}

            {activeTab === 'prompt' && (
              <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>
{`MASTER AI AGENT PROMPT – E-COMMERCE STORE
Target Agents: Cursor, Claude Code, Antigravity, OpenCode, Windsurf
Stack: Next.js (Frontend) + Laravel 11 (Backend API) + MySQL (DB: aiprd)
Design System: Google Stitch DESIGN.md Tokens.`}
              </pre>
            )}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="container" style={{ padding: '50px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
            Engineered For Software Architecture
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
            From napkin sketches to production-ready database schemas and code prompts.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {[
            { title: 'Next.js & Laravel 11 Stack', desc: 'Exact Next.js frontend presentation connected to Laravel Sanctum API controllers and MySQL database tables.', icon: <Cpu color="var(--primary)" size={24} /> },
            { title: 'Google Stitch Design System', desc: 'Native integration with .stitch/DESIGN.md tokens, typography scales, color calibrations, and anti-slop rules.', icon: <Sparkles color="var(--primary)" size={24} /> },
            { title: 'MySQL Database aiprd', desc: 'Auto-generated Eloquent models, MySQL migrations, foreign key constraints, and relational schemas.', icon: <Database color="var(--primary)" size={24} /> },
            { title: 'Multi-Format Export', desc: '1-click download as Markdown (.md), PDF Document (.pdf), Structured JSON (.json), or Plain Text (.txt).', icon: <FileText color="var(--primary)" size={24} /> }
          ].map((item, i) => (
            <div key={i} className="saas-card" style={{ padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>{item.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container" style={{ padding: '50px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
            Simple, Transparent Pricing
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>1 PRD Package = 50 Credits. Upgrade anytime.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id} 
              className="saas-card" 
              style={{ 
                position: 'relative', 
                border: plan.isPopular ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {plan.isPopular && (
                <span style={{ 
                  position: 'absolute', 
                  top: '-12px', 
                  right: '20px', 
                  background: 'var(--primary)', 
                  color: 'white', 
                  fontSize: '11px', 
                  fontWeight: 700, 
                  padding: '3px 10px', 
                  borderRadius: '12px', 
                  textTransform: 'uppercase' 
                }}>
                  Most Popular
                </span>
              )}
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>{plan.name}</h3>
                <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '4px' }}>
                  ₹{plan.priceINR} <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)' }}>/ month</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  {plan.credits / 50} PRDs / 30 days
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  {plan.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={15} color="var(--primary)" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                className={plan.isPopular ? 'btn-primary' : 'btn-secondary'} 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  onSelectPlan(plan.name);
                  onNavigate('upgrade');
                }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="container" style={{ padding: '50px 0', maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>Frequently Asked Questions</h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>Everything you need to know about PRD Studio.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, index) => (
            <div key={index} className="saas-card" style={{ padding: '20px', cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === index ? null : index)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, fontSize: '15px' }}>
                <span>{faq.q}</span>
                {openFaq === index ? <ChevronUp size={18} color="var(--primary)" /> : <ChevronDown size={18} />}
              </div>
              {openFaq === index && (
                <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container" style={{ padding: '40px 0' }}>
        <div className="saas-card" style={{ 
          background: 'var(--primary-light)', 
          border: '1px solid rgba(37, 99, 235, 0.2)',
          textAlign: 'center', 
          padding: '48px 24px',
          borderRadius: '20px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
            Start Building Production PRDs Today
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px auto' }}>
            Turn your raw product concept into a developer-ready PRD package in under 30 seconds.
          </p>
          <button className="btn-primary" onClick={() => onNavigate('wizard')} style={{ padding: '14px 28px', fontSize: '15px' }}>
            Generate Free PRD Now <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};
