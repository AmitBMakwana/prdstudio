import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Check, Monitor, Smartphone, Laptop, Wand2, Sparkles, 
  Palette, Type, CheckCircle2, FileText, Cpu, Database, Shield, Zap, Edit3, Settings, Layout, Code, HelpCircle, AlertCircle
} from 'lucide-react';
import { 
  PlatformId, TechStackSelection, StylePresetId, ColorPresetType, 
  SolidColorPreset, GradientColorPreset, CustomColors, ThemeMode, WizardState, PRDDocument, FontOption 
} from '../types/prd';
import { generatePRDDocument } from '../services/aiEngine';
import { consumeCredit } from '../services/storageService';

interface WizardPageProps {
  onCompletePRD: (prd: PRDDocument) => void;
  onNavigate: (page: string) => void;
}

export const WizardPage: React.FC<WizardPageProps> = ({ onCompletePRD, onNavigate }) => {
  const [step, setStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [generationStageIndex, setGenerationStageIndex] = useState<number>(0);

  // Wizard Form State
  const [platform, setPlatform] = useState<PlatformId>('webapp');
  const [techStack, setTechStack] = useState<TechStackSelection>({
    frontend: 'Next.js',
    backend: 'Node.js',
    database: 'PostgreSQL'
  });
  const [style, setStyle] = useState<StylePresetId>('Minimal');
  const [colorType, setColorType] = useState<ColorPresetType>('solid');
  const [solidColor, setSolidColor] = useState<string>('Stripe Indigo');
  const [gradientColor, setGradientColor] = useState<string>('Sunset');
  const [customColors, setCustomColors] = useState<CustomColors>({
    primary: '#5B4BFF',
    secondary: '#EC4899',
    accent: '#F28C28',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#0F172A'
  });
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [font, setFont] = useState<string>('Inter');
  const [projectName, setProjectName] = useState<string>('AI Fitness Coach');
  const [projectType, setProjectType] = useState<string>('SaaS');
  const [projectDescription, setProjectDescription] = useState<string>(
    'Build an AI-powered fitness coach for busy professionals with personalized workout plans, progress tracking, nutrition guidance, and notification alerts.'
  );

  // Auto-sync stack options when platform changes
  useEffect(() => {
    if (platform === 'mobileapp') {
      setTechStack({ frontend: 'Flutter', backend: 'Firebase', database: 'Firestore' });
    } else if (platform === 'desktopapp') {
      setTechStack({ frontend: 'Electron + React', backend: 'SQLite (local)', database: 'SQLite' });
    } else if (platform === 'webapp') {
      setTechStack({ frontend: 'Next.js', backend: 'Node.js', database: 'PostgreSQL' });
    }
  }, [platform]);

  // AI Action: Improve My Idea
  const handleImproveIdea = () => {
    if (!projectDescription.trim()) return;
    setProjectDescription(
      `Build a multi-tenant ${projectType || 'SaaS'} application named "${projectName || 'My Software'}" targeting busy professionals. The system includes user authentication (Sanctum token sessions), interactive dashboard analytics, automated AI content synthesis, role-based access control, MySQL database persistence (DB: aiprd), and export capabilities to PDF and Markdown.`
    );
  };

  // Quick Start Template Selection
  const applyTemplate = (tplDesc: string, name: string) => {
    setProjectName(name);
    setProjectDescription(tplDesc);
  };

  // Generation Pipeline Stages
  const generationStages = [
    '✓ Understanding product requirements & personas...',
    '✓ Defining P0/P1 functional user stories...',
    '✓ Creating screen progression maps & app flows...',
    '◌ Designing architecture & REST API routes...',
    '○ Creating MySQL database schema (DB: aiprd)...',
    '○ Building security controls & Sanctum token auth...',
    '○ Preparing Master AI Agent Build Prompt...'
  ];

  // Final Generation Trigger
  const handleStartGeneration = () => {
    setShowConfirmModal(false);
    setIsProcessing(true);

    let stageIdx = 0;
    const interval = setInterval(() => {
      stageIdx++;
      if (stageIdx < generationStages.length) {
        setGenerationStageIndex(stageIdx);
      } else {
        clearInterval(interval);
        // Deduct 50 credits
        consumeCredit(50);

        // Compile state
        const state: WizardState = {
          step: 6,
          platform,
          techStack,
          style,
          colorType,
          selectedSolidColor: solidColor,
          selectedGradient: gradientColor,
          customColors,
          themeMode,
          font,
          projectDescription,
          projectName,
          projectType
        };

        const generatedPRD = generatePRDDocument(state);
        setIsProcessing(false);
        onCompletePRD(generatedPRD);
      }
    }, 400);
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '80px' }}>
      
      {/* Compact Builder Header (Point 1) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.8px', marginBottom: '4px' }}>
            PRD STUDIO · PRD BUILDER WORKSPACE
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            Create Your Project <span style={{ color: 'var(--accent-orange)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>Specification</span>
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>✓ Auto-saved 2s ago</span>
          <button className="btn-secondary" onClick={() => onNavigate('dashboard')} style={{ padding: '8px 16px', fontSize: '13px' }}>
            Cancel
          </button>
        </div>
      </div>

      {/* 6-Step Top Horizontal Progress Navigation Bar (Point 13) */}
      <div className="canvas-card" style={{ padding: '16px 24px', borderRadius: '16px', marginBottom: '32px', cursor: 'default' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          {[
            { num: '01', label: 'Platform' },
            { num: '02', label: 'Tech Stack' },
            { num: '03', label: 'Style' },
            { num: '04', label: 'Colors' },
            { num: '05', label: 'Fonts' },
            { num: '06', label: 'Project Idea' }
          ].map((s, idx) => {
            const stepNum = idx + 1;
            const isDone = step > stepNum;
            const isCurrent = step === stepNum;
            return (
              <div 
                key={idx} 
                onClick={() => setStep(stepNum)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', opacity: isCurrent || isDone ? 1 : 0.5 }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: isDone ? '#10B981' : isCurrent ? 'var(--primary)' : 'var(--bg-main)',
                  color: isDone || isCurrent ? 'white' : 'var(--text-muted)',
                  fontWeight: 800,
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: isCurrent ? '2px solid var(--primary-light)' : 'none'
                }}>
                  {isDone ? '✓' : s.num}
                </div>
                <span style={{ fontSize: '13px', fontWeight: isCurrent ? 800 : 600, color: isCurrent ? 'var(--primary)' : 'var(--text-primary)' }}>
                  {s.label}
                </span>
                {idx < 5 && <span style={{ color: 'var(--border-color)', margin: '0 4px' }}>─</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* PROCESSING STATE: ANIMATED AI GENERATION EXPERIENCE (Point 35) */}
      {isProcessing ? (
        <div className="canvas-card" style={{ padding: '60px 32px', textAlign: 'center', maxWidth: '720px', margin: '0 auto', cursor: 'default' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
            <Sparkles size={32} className="animate-spin" />
          </div>

          <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Generating Your Product Specification
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
            ✦ PRD Studio AI is synthesizing requirements, app flows, database schemas, and AI prompts...
          </p>

          <div style={{ background: 'var(--bg-main)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'left', marginBottom: '24px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '16px' }}>
              {generationStages[generationStageIndex]}
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${((generationStageIndex + 1) / generationStages.length) * 100}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s ease' }}></div>
            </div>
          </div>

          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estimated completion: ~15 seconds</span>
        </div>
      ) : (
        /* STEP CONTENT SWITCHER */
        <div>
          {/* STEP 1: PLATFORM SELECT (Point 14 & 15) */}
          {step === 1 && (
            <div className="canvas-card" style={{ padding: '32px', cursor: 'default' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>Step 1: Target Platform</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Select the primary deployment platform for your application.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                {[
                  { id: 'webapp', title: 'Web Application', desc: 'Browser-based SaaS, web apps, or web portals.', icon: Monitor },
                  { id: 'mobileapp', title: 'Mobile App', desc: 'Native or cross-platform iOS and Android app.', icon: Smartphone },
                  { id: 'desktopapp', title: 'Desktop App', desc: 'Desktop software for Windows, macOS, or Linux.', icon: Laptop },
                  { id: 'custom', title: 'Custom Tool', desc: 'Browser extensions, CLI tools, games, or utilities.', icon: Code }
                ].map(p => {
                  const Icon = p.icon;
                  const isSel = platform === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setPlatform(p.id as PlatformId)}
                      style={{
                        padding: '24px',
                        borderRadius: '16px',
                        border: isSel ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        background: isSel ? 'var(--primary-light)' : 'var(--bg-card)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: isSel ? 'var(--primary)' : 'var(--bg-main)', color: isSel ? 'white' : 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                        <Icon size={20} />
                      </div>
                      <h4 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>{p.title}</h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }}>{p.desc}</p>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: isSel ? 'var(--primary)' : 'var(--text-muted)' }}>
                        {isSel ? '✓ Selected Platform' : 'Click to Select'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: TECH STACK SELECT (Point 16, 17, 18) */}
          {step === 2 && (
            <div className="canvas-card" style={{ padding: '32px', cursor: 'default' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>Step 2: Technology Stack</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Configure frontend, backend, and database architecture for {platform.toUpperCase()}.</p>
                </div>

                {/* AI Recommended Stack Badge (Point 18) */}
                <div style={{ background: 'var(--primary-light)', border: '1px solid var(--border-hover)', padding: '10px 16px', borderRadius: '12px', fontSize: '12px', color: 'var(--primary)', fontWeight: 700 }}>
                  ✦ AI Recommended Stack: Next.js + Laravel 11 + PostgreSQL
                </div>
              </div>

              {/* Frontend Frameworks */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>FRONTEND FRAMEWORK</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {(platform === 'mobileapp' ? ['Flutter', 'React Native', 'iOS (Swift)', 'Android (Kotlin)'] :
                    platform === 'desktopapp' ? ['Electron + React', 'Tauri', 'Flutter Desktop', '.NET MAUI'] :
                    ['React', 'Next.js', 'Vue', 'Angular', 'Svelte', 'HTML/CSS/JS', 'Laravel (Blade)', 'WordPress']
                  ).map(fe => {
                    const symbol = fe.includes('React Native') ? '⚛️' : fe.includes('React') ? '⚛️' : fe.includes('Next') ? '▲' : fe.includes('Vue') ? '🟩' : fe.includes('Angular') ? '🅰️' : fe.includes('Svelte') ? '🟧' : fe.includes('Flutter') ? '💙' : fe.includes('Swift') ? '🍎' : fe.includes('Kotlin') ? '🤖' : fe.includes('Tauri') ? '🦀' : fe.includes('.NET') ? '🟣' : fe.includes('WordPress') ? '📝' : '🌐';
                    return (
                      <button
                        key={fe}
                        onClick={() => setTechStack(prev => ({ ...prev, frontend: fe }))}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 600,
                          background: techStack.frontend === fe ? 'var(--primary)' : 'var(--bg-main)',
                          color: techStack.frontend === fe ? 'white' : 'var(--text-primary)',
                          border: '1px solid var(--border-color)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>{symbol}</span>
                        <span>{techStack.frontend === fe ? `✓ ${fe}` : fe}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Backend Engines */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>BACKEND API ENGINE</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Node.js', 'Laravel 11 (PHP)', 'Python (Django/Flask)', 'Firebase Functions', 'Supabase', 'Ruby on Rails'].map(be => {
                    const symbol = be.includes('Node') ? '🟢' : be.includes('Laravel') ? '🟥' : be.includes('Python') ? '🐍' : be.includes('Firebase') ? '🔥' : be.includes('Supabase') ? '⚡' : '💎';
                    return (
                      <button
                        key={be}
                        onClick={() => setTechStack(prev => ({ ...prev, backend: be }))}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 600,
                          background: techStack.backend === be ? 'var(--primary)' : 'var(--bg-main)',
                          color: techStack.backend === be ? 'white' : 'var(--text-primary)',
                          border: '1px solid var(--border-color)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>{symbol}</span>
                        <span>{techStack.backend === be ? `✓ ${be}` : be}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Database Engines */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>DATABASE SYSTEM</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['MySQL/SQL', 'PostgreSQL', 'Supabase', 'MongoDB', 'Firestore', 'SQLite'].map(db => {
                    const symbol = db.includes('MySQL') ? '🐬' : db.includes('PostgreSQL') ? '🐘' : db.includes('Supabase') ? '⚡' : db.includes('MongoDB') ? '🍃' : db.includes('Firestore') ? '🔥' : '📦';
                    return (
                      <button
                        key={db}
                        onClick={() => setTechStack(prev => ({ ...prev, database: db }))}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 600,
                          background: techStack.database === db ? 'var(--primary)' : 'var(--bg-main)',
                          color: techStack.database === db ? 'white' : 'var(--text-primary)',
                          border: '1px solid var(--border-color)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>{symbol}</span>
                        <span>{techStack.database === db ? `✓ ${db}` : db}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: STYLE SELECT WITH MINI UI PREVIEWS (Point 19 & 20) */}
          {step === 3 && (
            <div className="canvas-card" style={{ padding: '32px', cursor: 'default' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>Step 3: Visual Design Style</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Choose the design language for component wireframes and DESIGN.md tokens.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                {[
                  { id: 'Minimal', label: 'Minimal', desc: 'Clean, spacious, content-focused.' },
                  { id: 'Gradient', label: 'Gradient', desc: 'Vibrant, colorful, modern.' },
                  { id: 'Glassmorphism', label: 'Glassmorphism', desc: 'Translucent depth with blurs.' },
                  { id: 'Neumorphism', label: 'Neumorphism', desc: 'Soft tactile shadow surfaces.' },
                  { id: 'Corporate', label: 'Corporate', desc: 'Professional, reliable, enterprise.' },
                  { id: 'Dark-Tech', label: 'Dark-Tech', desc: 'Developer-focused dark interface.' }
                ].map(s => {
                  const isSel = style === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setStyle(s.id as StylePresetId)}
                      style={{
                        padding: '20px',
                        borderRadius: '16px',
                        border: isSel ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        background: isSel ? 'var(--primary-light)' : 'var(--bg-card)',
                        cursor: 'pointer'
                      }}
                    >
                      {/* Style Mini UI Preview Box */}
                      <div style={{ height: '60px', background: 'var(--bg-main)', borderRadius: '10px', border: '1px solid var(--border-color)', padding: '8px', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ width: '40%', height: '8px', background: 'var(--primary)', borderRadius: '4px' }}></div>
                        <div style={{ width: '80%', height: '6px', background: 'var(--border-color)', borderRadius: '3px' }}></div>
                        <div style={{ width: '60%', height: '6px', background: 'var(--border-color)', borderRadius: '3px' }}></div>
                      </div>

                      <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>{s.label}</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{s.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: COLORS & THEME WITH LIVE PREVIEW (Point 23, 24, 25) */}
          {step === 4 && (
            <div className="canvas-card" style={{ padding: '32px', cursor: 'default' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>Step 4: Brand Colors & Theme</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Pick brand color presets and live theme mode.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>PALETTE SELECTION</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
                    {['Stripe Indigo', 'Tailwind Blue', 'Linear Purple', 'Supabase Green', 'Framer Blue', 'Shadcn Dark'].map(p => (
                      <button
                        key={p}
                        onClick={() => setSolidColor(p)}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 600,
                          background: solidColor === p ? 'var(--primary)' : 'var(--bg-main)',
                          color: solidColor === p ? 'white' : 'var(--text-primary)',
                          border: '1px solid var(--border-color)',
                          cursor: 'pointer'
                        }}
                      >
                        {solidColor === p ? `✓ ${p}` : p}
                      </button>
                    ))}
                  </div>

                  <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>THEME MODE</div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {(['light', 'dark', 'system'] as ThemeMode[]).map(t => (
                      <button
                        key={t}
                        onClick={() => setThemeMode(t)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 700,
                          background: themeMode === t ? 'var(--primary)' : 'var(--bg-main)',
                          color: themeMode === t ? 'white' : 'var(--text-primary)',
                          border: '1px solid var(--border-color)',
                          cursor: 'pointer'
                        }}
                      >
                        {t.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Color Application Preview Box (Point 23) */}
                <div style={{ background: themeMode === 'dark' ? '#0F172A' : '#FFFFFF', border: '1px solid var(--border-color)', padding: '24px', borderRadius: '20px', color: themeMode === 'dark' ? '#F8FAFC' : '#0F172A' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '12px' }}>
                    LIVE APPLICATION PREVIEW
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Project Dashboard</h4>
                  <p style={{ fontSize: '12px', opacity: 0.7, marginBottom: '16px' }}>Real-time preview of brand tokens and theme.</p>
                  <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>Primary Action Button</button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: TYPOGRAPHY (Point 26, 27, 28) */}
          {step === 5 && (
            <div className="canvas-card" style={{ padding: '32px', cursor: 'default' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>Step 5: Typography Selection</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Choose a Google Font rendered in its actual typeface.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {['Inter', 'Poppins', 'DM Sans', 'Plus Jakarta Sans', 'Space Grotesk', 'Sora', 'Manrope', 'Outfit', 'Lexend'].map(f => (
                  <div
                    key={f}
                    onClick={() => setFont(f)}
                    style={{
                      padding: '20px',
                      borderRadius: '14px',
                      border: font === f ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      background: font === f ? 'var(--primary-light)' : 'var(--bg-card)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontFamily: f, fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {f}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Sample: Quick brown fox</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: INTELLIGENT AI INTAKE & SUMMARY (Points 29-34) */}
          {step === 6 && (
            <div className="canvas-card" style={{ padding: '32px', cursor: 'default' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>Step 6: Tell Us What You're Building</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Describe your product idea in plain language. AI will turn it into a 6-file build specification.</p>

              {/* Project Title & Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>PROJECT NAME</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>PROJECT TYPE</label>
                  <select
                    value={projectType}
                    onChange={e => setProjectType(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '14px' }}
                  >
                    <option value="SaaS">SaaS Application</option>
                    <option value="E-commerce">E-commerce Marketplace</option>
                    <option value="Portfolio">Portfolio / Agency</option>
                    <option value="Social">Social Platform</option>
                    <option value="Admin">Admin Panel</option>
                  </select>
                </div>
              </div>

              {/* Description Textarea & AI Action Button */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>PROJECT DESCRIPTION</label>
                  <button 
                    type="button" 
                    onClick={handleImproveIdea}
                    style={{ background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid var(--border-hover)', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Sparkles size={12} /> ✦ Improve My Idea
                  </button>
                </div>
                <textarea
                  rows={5}
                  value={projectDescription}
                  onChange={e => setProjectDescription(e.target.value)}
                  style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '14px', lineHeight: 1.6 }}
                />
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'right', marginTop: '4px' }}>
                  {projectDescription.length} / 5000 characters (min 30 required)
                </div>
              </div>

              {/* Quick Start Templates */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>QUICK-START TEMPLATES</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    { name: 'E-commerce Website', desc: 'Online store with products, cart, checkout, and admin panel.' },
                    { name: 'SaaS Dashboard', desc: 'Multi-tenant web app with user accounts and subscription billing.' },
                    { name: 'Social Platform', desc: 'Community platform with user profiles, posts, feed, and likes.' },
                    { name: 'Admin Panel', desc: 'Internal tool with data tables, CRUD operations, and audit logs.' }
                  ].map((tpl, idx) => (
                    <button
                      key={idx}
                      onClick={() => applyTemplate(tpl.desc, tpl.name)}
                      style={{ padding: '8px 14px', borderRadius: '10px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}
                    >
                      + {tpl.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Pre-Generation Summary Box (Point 34) */}
              <div style={{ background: 'var(--primary-light)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-hover)', marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '8px' }}>
                  ✦ AI GENERATION CONFIRMATION SUMMARY
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  Generating <strong>{projectName}</strong> ({platform.toUpperCase()}) with <strong>{techStack.frontend} + {techStack.backend} + {techStack.database}</strong> in <strong>{style}</strong> style.<br />
                  Estimated consumption: <strong>⚡ 50 Credits required</strong> (Your balance: 50 Cr).
                </div>
              </div>
            </div>
          )}

          {/* BUILDER BOTTOM NAVIGATION BUTTONS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
            <button
              onClick={() => setStep(prev => Math.max(1, prev - 1))}
              disabled={step === 1}
              className="btn-secondary"
              style={{ padding: '12px 24px', opacity: step === 1 ? 0.4 : 1 }}
            >
              <ArrowLeft size={16} /> Back
            </button>

            {step < 6 ? (
              <button
                onClick={() => setStep(prev => Math.min(6, prev + 1))}
                className="btn-primary"
                style={{ padding: '12px 28px' }}
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleStartGeneration}
                disabled={projectDescription.length < 30}
                className="btn-primary"
                style={{ padding: '14px 32px', fontSize: '15px' }}
              >
                <Sparkles size={18} /> Generate PRD Package (50 Cr) →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
