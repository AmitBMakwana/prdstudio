import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, Check, CheckCircle2, ChevronDown, ChevronUp, Zap, 
  FileText, Cpu, GitBranch, Palette, Database, Shield, Terminal, Star, Layers,
  Lock, Key, Users, RefreshCw, Copy, CheckSquare, Eye, ExternalLink, HelpCircle
} from 'lucide-react';
import { AiToolIcon } from '../components/AiToolIcon';

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onSelectPlan: (plan: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onSelectPlan }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [activeTabPreview, setActiveTabPreview] = useState<string>('prd');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCopyDemoPrompt = () => {
    const promptText = `MASTER 1-PROMPT AI AGENT INSTRUCTION – AI FITNESS COACH\nTarget: Antigravity / Cursor / Claude Code\n\nYou are a senior full-stack engineer. Build the following application according to the provided product specification.\n\nArchitecture: Next.js (Frontend) + Laravel 11 PHP API (Backend) + MySQL (DB: aiprd)\nDesign: Google Stitch DESIGN.md tokens with Playfair Display typography.\nFeatures: 42 Features, 18 Screens, 7 User Roles, 31 Database Tables, 48 API Endpoints.\nSecurity: Sanctum token auth, bcrypt hashing, XSS & SQL injection controls.`;
    navigator.clipboard.writeText(promptText).then(() => {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    });
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '0', color: 'var(--text-primary)' }}>
      
      {/* 5. HERO SECTION */}
      <section style={{ padding: '100px 20px 60px 20px', textAlign: 'center', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          {/* Eyebrow Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            padding: '8px 20px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 800,
            marginBottom: '28px',
            border: '1px solid var(--border-hover)',
            letterSpacing: '0.8px'
          }}>
            ✦ AI-POWERED PRODUCT PLANNING
          </div>

          {/* Main Headline */}
          <h1 className="canvas-title" style={{ fontSize: 'clamp(44px, 6vw, 72px)', lineHeight: 1.05, marginBottom: '20px' }}>
            Turn Any Idea Into a Build-Ready PRD. <br />
            <span className="canvas-title-gradient">In Seconds. Not Hours.</span>
          </h1>

          {/* Supporting Text */}
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '740px', margin: '0 auto 40px auto' }}>
            Transform a simple product idea into a complete product specification with requirements, user flows, UI/UX, technology architecture, database design, security requirements, and AI-ready coding prompts.
          </p>

          {/* Primary & Secondary CTAs */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
            <button 
              className="btn-primary" 
              onClick={() => onNavigate('wizard')}
              style={{ height: '52px', padding: '0 32px', fontSize: '16px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(91, 75, 255, 0.25)' }}
            >
              Create Your First PRD →
            </button>
            <a 
              href="#how-it-works"
              className="btn-secondary" 
              style={{ height: '52px', padding: '0 28px', fontSize: '16px', borderRadius: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
            >
              See How It Works
            </a>
          </div>

          {/* Trust Text */}
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
            No credit card required · Start free · Built for founders, PMs, engineers & AI builders
          </p>
        </div>
      </section>

      {/* 7. HERO PRODUCT PREVIEW (SaaS Application Window Mockup) */}
      <section className="container" style={{ maxWidth: '1140px', marginBottom: '120px' }}>
        <div style={{ position: 'relative' }}>
          
          {/* Subtle Floating Badges around hero window */}
          <div style={{ position: 'absolute', top: '-18px', left: '20px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 10 }}>
            <CheckCircle2 size={16} color="#10B981" /> 42 Requirements Generated
          </div>
          <div style={{ position: 'absolute', bottom: '-18px', right: '30px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 10 }}>
            <Zap size={16} color="var(--accent-orange)" /> AI Build Prompt Ready
          </div>

          {/* Main Application Window */}
          <div className="canvas-card" style={{ padding: '0', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 70px rgba(20, 20, 50, 0.12)', border: '1px solid var(--border-color)' }}>
            
            {/* Window Top Titlebar */}
            <div style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56', display: 'inline-block' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F', display: 'inline-block' }}></span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginLeft: '12px' }}>PRD Studio · AI Fitness Coach Spec</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#D1FAE5', color: '#065F46', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>
                  ● PRD Generated
                </span>
                <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>
                  Score: 96/100
                </span>
              </div>
            </div>

            {/* Window Tabs Header */}
            <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', padding: '0 24px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
              {[
                { id: 'prd', label: '📄 01 PRD (Requirements)' },
                { id: 'trd', label: '⚙️ 02 TRD (Architecture)' },
                { id: 'flow', label: '🔀 03 APP FLOW' },
                { id: 'ui', label: '🎨 04 UI/UX (DESIGN.md)' },
                { id: 'db', label: '🗄️ 05 DATABASE' },
                { id: 'security', label: '🛡️ 06 SECURITY' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabPreview(tab.id)}
                  style={{
                    padding: '14px 18px',
                    fontSize: '13px',
                    fontWeight: 700,
                    border: 'none',
                    background: 'transparent',
                    borderBottom: activeTabPreview === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                    color: activeTabPreview === tab.id ? 'var(--primary)' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Window Main Content Area */}
            <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', background: 'var(--bg-card)' }}>
              
              {/* Left Column: Document Preview */}
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  Project: AI Fitness Coach
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                  Complete production specification package generated for Next.js, Laravel 11 API, and MySQL (DB: aiprd).
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--bg-main)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>✓ Product Overview & Vision</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>✓ 42 Functional Requirements (P0 / P1)</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>✓ 18 Screen Wireframes & Route Map</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>✓ 31 MySQL Database Tables (Eloquent ORM)</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>✓ OWASP Security & Sanctum Token Auth</div>
                </div>
              </div>

              {/* Right Column: Quality Score Breakdown Box */}
              <div style={{ background: 'var(--bg-main)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>PRD QUALITY SCORE</span>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>96 / 100</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Product Requirements', pct: '98%' },
                    { label: 'Technical Architecture', pct: '94%' },
                    { label: 'UI/UX Specification', pct: '97%' },
                    { label: 'Database Design', pct: '95%' },
                    { label: 'Security & Auth', pct: '92%' }
                  ].map((m, idx) => (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        <span>{m.label}</span>
                        <span>{m.pct}</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: m.pct, height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Window Footer Toolbar */}
            <div style={{ background: 'var(--bg-main)', borderTop: '1px solid var(--border-color)', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Exportable as Markdown (.md), PDF (.pdf), and Master AI Prompt</span>
              <button className="btn-primary" onClick={() => onNavigate('wizard')} style={{ padding: '8px 20px', fontSize: '13px' }}>
                Ready to Build →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PRODUCT FLOW SECTION (Process Timeline 01 -> 02 -> 03 -> 04) */}
      <section id="how-it-works" style={{ padding: '100px 20px', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1240px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '1px', marginBottom: '14px' }}>
            FROM IDEA TO IMPLEMENTATION
          </div>

          <h2 className="canvas-title" style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', marginBottom: '60px' }}>
            One Idea. <span className="canvas-title-gradient">Everything Your Team Needs to Build.</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', textAlign: 'left', position: 'relative' }}>
            {[
              { num: '01', title: 'Describe', desc: 'Tell PRD Studio what you want to build in plain language.' },
              { num: '02', title: 'Configure', desc: 'Choose your target platform, technology stack, style, and colors.' },
              { num: '03', title: 'Generate', desc: 'AI analyzes your requirements and creates the 6-file specification package.' },
              { num: '04', title: 'Build', desc: 'Export your PRD package or copy the Master AI prompt directly into your AI dev tool.' }
            ].map((step, idx) => (
              <div key={idx} className="canvas-card" style={{ padding: '32px', borderRadius: '20px', cursor: 'default' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>{step.num}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. PROBLEM & FEATURES SECTION (2 x 3 Grid) */}
      <section id="features" style={{ padding: '100px 20px' }}>
        <div className="container" style={{ maxWidth: '1240px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '1px', marginBottom: '14px' }}>
            BUILDING SOFTWARE SHOULD START WITH CLARITY
          </div>

          <h2 className="canvas-title" style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', marginBottom: '20px' }}>
            Great Ideas Don't Fail Because They're Bad Ideas. <br />
            <span className="canvas-title-gradient">They Fail Because They're Not Clearly Defined.</span>
          </h2>

          <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '780px', margin: '0 auto 60px auto' }}>
            A product idea is only the beginning. Before writing code, teams need to understand the product, users, features, workflows, interface, architecture, database, APIs, security, testing and deployment requirements.
          </p>

          {/* 2 x 3 Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px', textAlign: 'left' }}>
            {[
              { title: 'What are you building?', desc: 'Features, target personas, and core business requirements defined from scratch.' },
              { title: 'Who will use it?', desc: 'User roles, permission scopes, and authentication session flows.' },
              { title: 'How will users interact?', desc: 'Step-by-step application flows, screen journeys, and route mapping.' },
              { title: 'How should it look?', desc: 'UI/UX component design system based on Google Stitch DESIGN.md tokens.' },
              { title: 'How should it work?', desc: 'Next.js + Laravel 11 PHP API architecture and MySQL database design (DB: aiprd).' },
              { title: 'What does "done" mean?', desc: 'Acceptance criteria, OWASP security protocols, testing, and AI build prompts.' }
            ].map((prob, idx) => (
              <div key={idx} className="canvas-card" style={{ padding: '32px', borderRadius: '20px', cursor: 'default' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <CheckCircle2 size={20} />
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{prob.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{prob.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. SIX DELIVERABLES & TEMPLATES SECTION */}
      <section id="templates" style={{ padding: '100px 20px', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1240px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '1px', marginBottom: '14px' }}>
            ONE IDEA → SIX BUILD-READY DOCUMENTS
          </div>

          <h2 className="canvas-title" style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', marginBottom: '20px' }}>
            Describe Your Idea. <span className="canvas-title-gradient">We Structure Everything Else.</span>
          </h2>

          <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '780px', margin: '0 auto 60px auto' }}>
            PRD Studio doesn't stop at a basic product requirements document. It creates a complete technical foundation for your application.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px', textAlign: 'left' }}>
            {[
              { num: '01 PRD', title: 'Product Requirements Document', desc: 'Complete product vision, target personas, P0/P1 feature specs, and user stories.', tags: ['Requirements', 'Features', 'User Stories'], icon: <FileText size={22} color="#3B82F6" /> },
              { num: '02 TRD', title: 'Technical Requirements Document', desc: 'Next.js + Laravel 11 architecture, REST API route schemas, and caching rules.', tags: ['Architecture', 'APIs', 'Performance'], icon: <Cpu size={22} color="#8B5CF6" /> },
              { num: '03 APP FLOW', title: 'Application Flow', desc: 'Interactive screen progression maps, navigation journeys, and state transitions.', tags: ['User Flows', 'Navigation', 'Logic'], icon: <GitBranch size={22} color="#10B981" /> },
              { num: '04 UI/UX', title: 'UI/UX Specification', desc: 'Google Stitch DESIGN.md visual standards, typography, colors, and accessibility.', tags: ['Layouts', 'DESIGN.md', 'Tokens'], icon: <Palette size={22} color="#EC4899" /> },
              { num: '05 DATABASE', title: 'Database Design', desc: 'MySQL relational schemas (DB: aiprd), tables, columns, indexes, and Eloquent models.', tags: ['Schemas', 'Relationships', 'Indexes'], icon: <Database size={22} color="#F59E0B" /> },
              { num: '06 SECURITY', title: 'Security Specification', desc: 'Sanctum token auth, bcrypt password hashing, PDO SQL injection control, and audit logs.', tags: ['Auth', 'RBAC', 'OWASP'], icon: <Shield size={22} color="#6366F1" /> }
            ].map((doc, idx) => (
              <div key={idx} className="canvas-card" style={{ padding: '32px', borderRadius: '24px', cursor: 'default' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ padding: '10px', borderRadius: '12px', background: 'var(--bg-main)', border: '1px solid var(--border-color)' }}>
                    {doc.icon}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)' }}>{doc.num}</span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{doc.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>{doc.desc}</p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {doc.tags.map((tag, tIdx) => (
                    <span key={tIdx} style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 700 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. BEFORE → AFTER TRANSFORMATION SECTION */}
      <section style={{ padding: '100px 20px' }}>
        <div className="container" style={{ maxWidth: '1100px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '1px', marginBottom: '14px' }}>
            FROM A THOUGHT TO A SPECIFICATION
          </div>

          <h2 className="canvas-title" style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', marginBottom: '60px' }}>
            Start With One Sentence. <span className="canvas-title-gradient">Build With Complete Precision.</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center' }}>
            {/* Left: Your Idea */}
            <div className="canvas-card" style={{ padding: '36px', borderRadius: '24px', textAlign: 'left', cursor: 'default' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '14px' }}>YOUR IDEA</div>
              <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: 1.6 }}>
                "I want to build an AI-powered fitness coach for busy professionals."
              </p>
            </div>

            {/* Center: AI Transformation Badge */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--primary-gradient)',
                color: 'white',
                padding: '14px 28px',
                borderRadius: '24px',
                fontWeight: 800,
                fontSize: '14px',
                boxShadow: '0 10px 25px rgba(91, 75, 255, 0.3)'
              }}>
                ✦ AI ANALYSIS ✦
              </div>
            </div>

            {/* Right: PRD Studio Output */}
            <div className="canvas-card" style={{ padding: '36px', borderRadius: '24px', textAlign: 'left', cursor: 'default', background: 'var(--primary-light)', border: '2px solid var(--primary)' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '14px' }}>BUILD-READY OUTPUT</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                <div>✓ 42 Features</div>
                <div>✓ 18 Screens</div>
                <div>✓ 7 User Roles</div>
                <div>✓ 31 DB Tables</div>
                <div>✓ 48 API Routes</div>
                <div>✓ UI System</div>
                <div>✓ Security Specs</div>
                <div>✓ 96/100 Quality</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14 & 15. AI CODING TOOLS & AI PROMPT PREVIEW SECTION */}
      <section id="ai-tools" style={{ padding: '100px 20px', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1100px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '1px', marginBottom: '14px' }}>
            BUILT FOR THE AI DEVELOPMENT ERA
          </div>

          <h2 className="canvas-title" style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', marginBottom: '20px' }}>
            One Specification. <span className="canvas-title-gradient">Any AI Coding Tool.</span>
          </h2>

          <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '780px', margin: '0 auto 40px auto' }}>
            Generate optimized implementation prompts for your favorite AI coding tools. Don't just plan your application—give your AI coding agent everything it needs to build it.
          </p>

          {/* Tool Badges Grid */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '50px' }}>
            {['Antigravity', 'Claude Code', 'ChatGPT', 'Gemini', 'Cursor', 'Windsurf', 'Lovable', 'Bolt', 'Replit', 'v0'].map((tool, idx) => (
              <span key={idx} style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', padding: '8px 16px', borderRadius: '14px', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <AiToolIcon name={tool} size={16} showBackground={false} /> {tool}
              </span>
            ))}
          </div>

          {/* Monospace IDE Code Preview Box */}
          <div className="canvas-card" style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'left', padding: '28px', borderRadius: '24px', cursor: 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Terminal size={20} color="var(--primary)" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>AI BUILD PROMPT</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Target: Antigravity / Cursor / Claude Code</div>
                </div>
              </div>
              <button 
                onClick={handleCopyDemoPrompt}
                style={{ padding: '8px 18px', borderRadius: '10px', background: 'var(--primary)', color: 'white', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
              >
                {copiedPrompt ? '✓ Copied Prompt' : 'Copy Prompt →'}
              </button>
            </div>

            <pre style={{ background: '#0F172A', color: '#F8FAFC', padding: '20px', borderRadius: '14px', fontFamily: 'monospace', fontSize: '13px', lineHeight: 1.6, overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
{`MASTER 1-PROMPT AI AGENT INSTRUCTION – AI FITNESS COACH

You are a senior full-stack engineer. Build the following application according to the provided product specification.

Architecture: Next.js (Frontend) + Laravel 11 PHP API (Backend) + MySQL (DB: aiprd)
Design: Google Stitch DESIGN.md tokens with Playfair Display typography.
Features: 42 Features, 18 Screens, 7 User Roles, 31 Database Tables, 48 API Endpoints.
Security: Sanctum token auth, bcrypt hashing, XSS & SQL injection controls.`}
            </pre>
          </div>
        </div>
      </section>

      {/* 16. TRADITIONAL VS PRD STUDIO COMPARISON */}
      <section style={{ padding: '100px 20px' }}>
        <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
          <h2 className="canvas-title" style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', marginBottom: '50px' }}>
            Stop Starting Every Project From a <span className="canvas-title-gradient">Blank Document.</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', textAlign: 'left' }}>
            {/* Traditional Planning */}
            <div className="canvas-card" style={{ padding: '36px', borderRadius: '24px', cursor: 'default' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '20px' }}>Traditional Planning</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <li>❌ Blank document paralysis</li>
                <li>❌ Manual research & writing</li>
                <li>❌ Fragmented technical notes</li>
                <li>❌ Manually defined database schemas</li>
                <li>❌ Easy to miss crucial security rules</li>
                <li>❌ No AI-ready build prompts</li>
              </ul>
            </div>

            {/* PRD Studio */}
            <div className="canvas-card" style={{ padding: '36px', borderRadius: '24px', cursor: 'default', background: 'var(--primary-light)', border: '2px solid var(--primary)' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)', marginBottom: '20px' }}>PRD Studio Engine</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                <li>✓ Start with your raw idea</li>
                <li>✓ AI-assisted structural analysis</li>
                <li>✓ Unified 6-file specification suite</li>
                <li>✓ Generated MySQL database schemas</li>
                <li>✓ Built-in OWASP security controls</li>
                <li>✓ 1-Click Master AI Agent Build Prompts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 17 & 18. PRICING & CREDIT EXPLANATION SECTION */}
      <section id="pricing" style={{ padding: '100px 20px', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '1200px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '1px', marginBottom: '14px' }}>
            SIMPLE, TRANSPARENT PRICING
          </div>
          <h2 className="canvas-title" style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', marginBottom: '16px' }}>
            Choose Your <span className="canvas-title-gradient">Plan</span>
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '60px' }}>
            Start free. Upgrade when your projects grow. No hidden fees. Cancel anytime.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', textAlign: 'left', marginBottom: '40px' }}>
            {[
              { name: 'Free', price: '₹0', credits: '50 AI Credits / month', features: ['Basic PRD generation', 'Core templates', 'Markdown export', 'Basic editor'], popular: false },
              { name: 'Starter', price: '₹49', credits: '150 AI Credits / month', features: ['Everything in Free', 'Advanced generation', 'PDF & DOCX export', 'More templates'], popular: false },
              { name: 'Pro', price: '₹99', credits: '500 AI Credits / month', features: ['Everything in Starter', 'Full 6-file PRD suite', 'UI/UX & DESIGN.md', 'Database design', 'Security specs', 'AI coding prompts', 'Version history'], popular: true },
              { name: 'Ultimate', price: '₹149', credits: '1,500 AI Credits / month', features: ['Everything in Pro', 'Highest limits', 'Priority generation', 'Unlimited saved projects', 'Advanced exports'], popular: false }
            ].map((p, idx) => (
              <div key={idx} className="canvas-card" style={{ padding: '32px', borderRadius: '24px', border: p.popular ? '2px solid var(--primary)' : '1px solid var(--border-color)', position: 'relative' }}>
                {p.popular && (
                  <span style={{ position: 'absolute', top: '-14px', right: '24px', background: 'var(--primary)', color: 'white', fontSize: '11px', fontWeight: 800, padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase' }}>
                    MOST POPULAR
                  </span>
                )}
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>{p.name}</h3>
                <div style={{ fontSize: '40px', fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0' }}>{p.price} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>/ month</span></div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)', marginBottom: '20px' }}>⚡ {p.credits}</div>
                <button className={p.popular ? 'btn-primary' : 'btn-secondary'} onClick={() => onNavigate('wizard')} style={{ width: '100%', justifyContent: 'center', height: '44px', marginBottom: '20px', borderRadius: '10px' }}>
                  {p.name === 'Free' ? 'Start Free' : `Choose ${p.name}`}
                </button>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {p.features.map((f, fIdx) => (
                    <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>✓ {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--bg-main)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', maxWidth: '680px', margin: '0 auto', fontSize: '14px', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>How AI Credits Work:</strong> Credits are used when PRD Studio performs AI generation tasks (50 credits per 6-file PRD package generation, section regeneration, and prompt synthesis).
          </div>
        </div>
      </section>

      {/* 19. FAQ SECTION */}
      <section id="faq" style={{ padding: '100px 20px' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="canvas-title" style={{ fontSize: '42px' }}>
              Frequently Asked <span className="canvas-title-gradient">Questions</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { q: 'What is PRD Studio?', a: 'PRD Studio is an AI-powered product planning platform that turns an idea into a structured, developer-ready specification.' },
              { q: 'What does PRD Studio generate?', a: 'It generates 6 complete build-ready files: PRD, TRD, Application Flow, UI/UX specification, Database Design (MySQL aiprd), Security specification, and Master AI coding prompts.' },
              { q: 'Do I need technical knowledge?', a: 'No. You can describe your idea in plain language and configure technical preferences when needed.' },
              { q: 'Which technologies can I choose?', a: 'PRD Studio supports Next.js, React, Vue, Angular, Svelte, Node.js, Python, Laravel, Flutter, React Native, Electron, Tauri, MySQL, PostgreSQL, Supabase, and SQLite.' },
              { q: 'Can I export my PRD?', a: 'Yes! Export formats include Markdown (.md), PDF Document (.pdf), JSON (.json), and Plain Text (.txt).' },
              { q: 'Can I use the output with AI coding tools?', a: 'Yes. PRD Studio generates optimized master prompts for Antigravity, Claude Code, Cursor, Windsurf, ChatGPT, and Gemini.' },
              { q: 'Can I edit the generated PRD?', a: 'Yes. Generated documents are editable section-by-section inside the built-in PRD Spec Inspector.' },
              { q: 'How do AI credits work?', a: 'Generating a complete PRD package consumes 50 AI credits from your monthly credit allowance.' },
              { q: 'Is my project private?', a: 'Yes. All project specifications are private and securely stored.' }
            ].map((faq, idx) => (
              <div key={idx} className="canvas-card" onClick={() => toggleFaq(idx)} style={{ padding: '20px 24px', borderRadius: '16px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)' }}>
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                {openFaq === idx && (
                  <p style={{ marginTop: '14px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 20. FINAL CTA */}
      <section style={{ padding: '100px 20px', textAlign: 'center', background: 'var(--primary-light)', borderTop: '1px solid var(--border-hover)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '1px', marginBottom: '14px' }}>
            YOUR NEXT PRODUCT STARTS HERE
          </div>

          <h2 className="canvas-title" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '20px' }}>
            Your Idea Is Ready. <span className="canvas-title-gradient">Now Give It a Plan.</span>
          </h2>

          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '36px' }}>
            Turn your idea into a complete, structured specification that your team — or your AI coding agent — can actually build from.
          </p>

          <button 
            className="btn-primary" 
            onClick={() => onNavigate('wizard')}
            style={{ height: '52px', padding: '0 36px', fontSize: '16px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(91, 75, 255, 0.3)' }}
          >
            Create Your First PRD →
          </button>

          <div style={{ marginTop: '18px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>
            Start free. No credit card required.
          </div>
        </div>
      </section>

      {/* 21. LARGE SAAS FOOTER */}
      <footer style={{ background: '#0F172A', color: '#F8FAFC', padding: '80px 20px 40px 20px' }}>
        <div className="container" style={{ maxWidth: '1240px' }}>
          
          {/* Footer Top Row - Explicit 5 Columns Single Row Design */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '2.2fr 1fr 1fr 1fr 1fr', 
            gap: '24px', 
            paddingBottom: '60px', 
            borderBottom: '1px solid #1E293B',
            alignItems: 'start'
          }}>
            
            {/* Brand Column */}
            <div style={{ paddingRight: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={18} />
                </div>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>PRD Studio</span>
              </div>
              <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '20px' }}>
                AI-powered product planning for modern software teams. From idea to build-ready specification in seconds.
              </p>
              <button className="btn-primary" onClick={() => onNavigate('wizard')} style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '8px' }}>
                Create Your First PRD →
              </button>
            </div>

            {/* Column 1: PRODUCT */}
            <div>
              <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', marginBottom: '16px', letterSpacing: '0.5px' }}>PRODUCT</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#CBD5E1' }}>
                <li><a href="#features" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Features</a></li>
                <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} style={{ color: 'inherit', textDecoration: 'none' }}>How It Works</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('aitools'); }} style={{ color: 'inherit', textDecoration: 'none' }}>AI Tools</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('templates'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Templates</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('upgrade'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</a></li>
              </ul>
            </div>

            {/* Column 2: RESOURCES */}
            <div>
              <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', marginBottom: '16px', letterSpacing: '0.5px' }}>RESOURCES</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#CBD5E1' }}>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('docs'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Documentation</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('templates'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Examples</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Help Center</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('docs'); }} style={{ color: 'inherit', textDecoration: 'none' }}>REST API</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('docs'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Blog</a></li>
              </ul>
            </div>

            {/* Column 3: COMPANY */}
            <div>
              <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', marginBottom: '16px', letterSpacing: '0.5px' }}>COMPANY</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#CBD5E1' }}>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} style={{ color: 'inherit', textDecoration: 'none' }}>About</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Careers</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('docs'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Roadmap</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('help'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Status</a></li>
              </ul>
            </div>

            {/* Column 4: LEGAL */}
            <div>
              <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', marginBottom: '16px', letterSpacing: '0.5px' }}>LEGAL</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#CBD5E1' }}>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('legal'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('legal'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('legal'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Cookie Policy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('legal'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Security</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div style={{ paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: '#64748B' }}>
            <div>© 2026 PRD Studio. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <span onClick={() => onNavigate('legal')} style={{ cursor: 'pointer' }}>Privacy</span>
              <span onClick={() => onNavigate('legal')} style={{ cursor: 'pointer' }}>Terms</span>
              <span onClick={() => onNavigate('legal')} style={{ cursor: 'pointer' }}>Security</span>
            </div>
            <div>Secure • Developer-focused • AI-powered</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
