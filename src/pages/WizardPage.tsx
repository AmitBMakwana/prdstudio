import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Check, Monitor, Smartphone, Laptop, Wand2, Sparkles, 
  Palette, Type, CheckCircle2, FileText, Cpu, Database, Shield, Zap, Edit3, Settings, Layout, Code
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
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [processingPhase, setProcessingPhase] = useState<string>('Initializing Canvas Engine...');
  const [completedFiles, setCompletedFiles] = useState<string[]>([]);

  // Step 1: Platform Selection
  const [platform, setPlatform] = useState<PlatformId>('webapp');

  // Step 2: Tech Stack Selection
  const [techStack, setTechStack] = useState<TechStackSelection>({
    frontend: 'Next.js',
    backend: 'Laravel (PHP)',
    database: 'MySQL/SQL'
  });

  // Step 3: Visual Style Selection
  const [style, setStyle] = useState<StylePresetId>('Flat');

  // Step 4: Colors & Theme Selection
  const [colorType, setColorType] = useState<ColorPresetType>('solid');
  const [selectedSolidColor, setSelectedSolidColor] = useState<string>('Tailwind Blue');
  const [selectedGradient, setSelectedGradient] = useState<string>('Sunset');
  const [customColors, setCustomColors] = useState<CustomColors>({
    primary: '#4F46E5',
    secondary: '#EC4899',
    accent: '#4F46E5',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#0F172A'
  });
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  // Step 5: Typography Selection
  const [font, setFont] = useState<string>('Lexend');
  const [customFont, setCustomFont] = useState<string>('');

  // Step 6: Project Concept & Description
  const [projectType, setProjectType] = useState<string>('E-commerce');
  const [projectDescription, setProjectDescription] = useState<string>(
    'Online store with product listings, cart, checkout, payment integration, user accounts, order tracking, and admin dashboard.'
  );
  const [guidingNotes, setGuidingNotes] = useState<string>('');

  // Solid Color Palettes (All 18 Brand Palettes requested)
  const solidColors: SolidColorPreset[] = [
    { id: 'spotify', name: 'Spotify Dark', hex: '#1DB954', bgHex: '#121212' },
    { id: 'stripe', name: 'Stripe Indigo', hex: '#635BFF', bgHex: '#F8FAFC' },
    { id: 'tailwind', name: 'Tailwind Blue', hex: '#38BDF8', bgHex: '#0F172A' },
    { id: 'vercel', name: 'Vercel Black', hex: '#000000', bgHex: '#FFFFFF' },
    { id: 'notion', name: 'Notion Gray', hex: '#37352F', bgHex: '#F7F6F3' },
    { id: 'linear', name: 'Linear Purple', hex: '#5E6AD2', bgHex: '#121316' },
    { id: 'figma', name: 'Figma Rainbow', hex: '#F24E1E', bgHex: '#1E1E1E' },
    { id: 'github', name: 'GitHub Dark', hex: '#2DBA4E', bgHex: '#0D1117' },
    { id: 'slack', name: 'Slack Green', hex: '#2EB67D', bgHex: '#4A154B' },
    { id: 'discord', name: 'Discord Blue', hex: '#5865F2', bgHex: '#313338' },
    { id: 'netflix', name: 'Netflix Red', hex: '#E50914', bgHex: '#141414' },
    { id: 'instagram', name: 'Instagram Pink', hex: '#E1306C', bgHex: '#FAFAFA' },
    { id: 'twitter', name: 'Twitter Blue', hex: '#1DA1F2', bgHex: '#15202B' },
    { id: 'youtube', name: 'YouTube Red', hex: '#FF0000', bgHex: '#0F0F0F' },
    { id: 'supabase', name: 'Supabase Green', hex: '#3ECF8E', bgHex: '#1C1C1C' },
    { id: 'framer', name: 'Framer Blue', hex: '#0055FF', bgHex: '#000000' },
    { id: 'clerk', name: 'Clerk Purple', hex: '#6C47FF', bgHex: '#18181B' },
    { id: 'shadcn', name: 'Shadcn Dark', hex: '#F8FAFC', bgHex: '#09090B' }
  ];

  // Gradients requested
  const gradientPresets: GradientColorPreset[] = [
    { id: 'sunset', name: 'Sunset', from: '#F97316', to: '#EC4899' },
    { id: 'ocean', name: 'Ocean', from: '#0EA5E9', to: '#14B8A6' },
    { id: 'purple-dream', name: 'Purple Dream', from: '#8B5CF6', to: '#D946EF' },
    { id: 'mint-fresh', name: 'Mint Fresh', from: '#22C55E', to: '#14B8A6' }
  ];

  // Font Options requested
  const fontOptions: FontOption[] = [
    { id: 'Poppins', name: 'Poppins', category: 'Geometric Sans', family: 'Poppins' },
    { id: 'Inter', name: 'Inter', category: 'Clean Sans', family: 'Inter' },
    { id: 'DM Sans', name: 'DM Sans', category: 'Modern Sans', family: 'DM Sans' },
    { id: 'Plus Jakarta Sans', name: 'Plus Jakarta Sans', category: 'Professional Sans', family: 'Plus Jakarta Sans' },
    { id: 'Space Grotesk', name: 'Space Grotesk', category: 'Tech Mono-Sans', family: 'Space Grotesk' },
    { id: 'Sora', name: 'Sora', category: 'Startup Sans', family: 'Sora' },
    { id: 'Manrope', name: 'Manrope', category: 'Geometric Modern', family: 'Manrope' },
    { id: 'Outfit', name: 'Outfit', category: 'Display Sans', family: 'Outfit' },
    { id: 'Lexend', name: 'Lexend', category: 'Readability Sans', family: 'Lexend' },
    { id: 'Urbanist', name: 'Urbanist', category: 'Geometric Clean', family: 'Urbanist' }
  ];

  // Visual Style Presets requested
  const stylePresets = [
    'Flat', 'Minimal', 'Gradient', 'Glassmorphism', 'Neumorphism', 
    'Corporate', 'Playful', 'Dark-Tech', 'Retro', 'Brutalist', 'Material', 'Custom'
  ];

  // Quick Start Templates requested
  const quickTemplates = [
    {
      id: 'ecommerce',
      title: 'E-commerce Website',
      description: 'Online store with product listings, cart, checkout, payment integration, user accounts, order tracking, and admin dashboard.',
      type: 'E-commerce'
    },
    {
      id: 'saas',
      title: 'SaaS Dashboard',
      description: 'Multi-tenant web application with user authentication, subscription billing, analytics dashboard, settings management, and API access.',
      type: 'SaaS'
    },
    {
      id: 'portfolio',
      title: 'Portfolio / Agency',
      description: 'Professional portfolio showcasing projects, team members, services, client testimonials, contact form, and blog section.',
      type: 'Portfolio'
    },
    {
      id: 'social',
      title: 'Social Platform',
      description: 'Community platform with user profiles, news feed, posts, comments, likes, messaging, notifications, and content moderation.',
      type: 'Social App'
    },
    {
      id: 'admin',
      title: 'Admin Panel',
      description: 'Internal tool with role-based access, data tables, CRUD operations, charts/analytics, user management, and audit logs.',
      type: 'Internal Tool'
    }
  ];

  // Bulletproof AI Pipeline Effect synthesizing the 6 exact spec files
  useEffect(() => {
    if (!isProcessing) return;

    const filePhases = [
      { file: 'PRD', pct: 16, msg: 'Synthesizing PRD (Product Overview & P0/P1 Features)...' },
      { file: 'TRD', pct: 33, msg: 'Synthesizing TRD (Technical Architecture & Next.js + Laravel 11 specs)...' },
      { file: 'APP FLOW', pct: 50, msg: 'Synthesizing APP FLOW (User Journeys & Workflow Diagrams)...' },
      { file: 'UI UX', pct: 66, msg: 'Synthesizing UI UX (Design Tokens & Google Stitch Specs)...' },
      { file: 'DATABASE DESIGN', pct: 83, msg: 'Synthesizing DATABASE DESIGN (MySQL Schemas & ERD Models)...' },
      { file: 'SECURITY', pct: 100, msg: 'Synthesizing SECURITY (Auth, Encryption & OWASP Controls)...' }
    ];

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < filePhases.length) {
        const currentPhase = filePhases[idx];
        if (currentPhase) {
          setProcessingProgress(currentPhase.pct);
          setProcessingPhase(currentPhase.msg);
          setCompletedFiles(prev => [...prev, currentPhase.file]);
        }
        idx++;
      } else {
        clearInterval(interval);
        finishPRDGeneration();
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isProcessing]);

  const handleNextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      const success = consumeCredit(50);
      if (!success) {
        alert('Insufficient Credits! Generating a PRD package requires 50 credits. Please upgrade your plan.');
        onNavigate('upgrade');
        return;
      }
      setIsProcessing(true);
    }
  };

  const finishPRDGeneration = () => {
    const wizardState: WizardState = {
      step: 6,
      platform,
      techStack,
      style,
      colorType,
      selectedSolidColor,
      selectedGradient,
      customColors,
      themeMode,
      font: font === 'Custom' ? customFont || 'Inter' : font,
      projectType,
      projectDescription,
      guidingNotes
    };

    const doc = generatePRDDocument(wizardState);
    onCompletePRD(doc);
  };

  const progressPercentage = Math.round((step / 6) * 100);

  if (isProcessing) {
    return (
      <div className="container animate-fade-in" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div className="canvas-card" style={{ width: '100%', maxWidth: '620px', padding: '40px', borderRadius: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ margin: '0 auto 16px auto', width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={28} />
            </div>
            <h2 className="canvas-title" style={{ fontSize: '24px', marginBottom: '6px' }}>
              Building Your <span className="canvas-title-gradient">Project Canvas</span>
            </h2>
            <p className="canvas-subtitle" style={{ fontSize: '14px' }}>
              {processingPhase}
            </p>
          </div>

          <div className="progress-bar-bg" style={{ height: '8px', borderRadius: '4px', marginBottom: '24px' }}>
            <div className="progress-bar-fill" style={{ width: `${processingProgress}%`, height: '100%', borderRadius: '4px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'var(--bg-main)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            {[
              { id: 'PRD', label: '1. PRD File' },
              { id: 'TRD', label: '2. TRD File' },
              { id: 'APP FLOW', label: '3. APP FLOW File' },
              { id: 'UI UX', label: '4. UI UX File' },
              { id: 'DATABASE DESIGN', label: '5. DATABASE DESIGN' },
              { id: 'SECURITY', label: '6. SECURITY File' }
            ].map(f => {
              const isDone = completedFiles.includes(f.id);
              return (
                <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: isDone ? 'var(--primary)' : 'var(--text-muted)' }}>
                  <CheckCircle2 size={16} color={isDone ? 'var(--primary)' : 'var(--border-color)'} />
                  <span>{f.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '980px', paddingBottom: '60px' }}>
      {/* Centered Hero Title matching reference screenshot */}
      <div style={{ textAlign: 'center', padding: '30px 20px 32px 20px' }}>
        <h1 className="canvas-title">
          Your Project <span className="canvas-title-gradient">Canvas</span>
        </h1>
        <p className="canvas-subtitle" style={{ maxWidth: '640px', margin: '8px auto 0 auto' }}>
          "Every brilliant application begins with a single spark. Shape your vision into a developer-ready architectural spec."
        </p>
      </div>

      {/* Progress Header */}
      <div style={{ marginBottom: '32px', maxWidth: '820px', margin: '0 auto 32px auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Step {step} of 6: {step === 1 ? 'Platform Select' : step === 2 ? 'Tech Stack Select' : step === 3 ? 'Style Select' : step === 4 ? 'Colors & Theme Select' : step === 5 ? 'Choose a Font' : 'Describe Project'}
          </span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)' }}>{progressPercentage}%</span>
        </div>
        <div className="progress-bar-bg" style={{ height: '6px' }}>
          <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }} />
        </div>
      </div>

      {/* STEP 1: Platform Select */}
      {step === 1 && (
        <div className="animate-fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '36px' }}>
            {[
              { id: 'webapp', title: 'Web Application', sub: 'Next.js / React / Vue / Laravel / SaaS', icon: <Zap size={24} color="#3B82F6" />, gradientClass: 'bg-gradient-purple' },
              { id: 'mobileapp', title: 'Mobile App', sub: 'iOS & Android Native / Flutter / React Native', icon: <Smartphone size={24} color="#8B5CF6" />, gradientClass: 'bg-gradient-pink' },
              { id: 'desktopapp', title: 'Desktop App', sub: 'Electron / Tauri / Flutter Desktop / .NET', icon: <Laptop size={24} color="#10B981" />, gradientClass: 'bg-gradient-mint' },
              { id: 'custom', title: 'Custom Tool', sub: 'Browser Extension / CLI Tool / Game Engine', icon: <Wand2 size={24} color="#F59E0B" />, gradientClass: 'bg-gradient-amber' }
            ].map(p => (
              <div 
                key={p.id}
                className="canvas-card"
                onClick={() => setPlatform(p.id as PlatformId)}
                style={{
                  border: platform === p.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  transform: platform === p.id ? 'translateY(-6px)' : 'none',
                  boxShadow: platform === p.id ? 'var(--shadow-card-hover)' : 'var(--shadow-card)'
                }}
              >
                <div className={`canvas-card-header ${p.gradientClass}`}>
                  <div className="canvas-badge-icon">
                    {p.icon}
                  </div>
                </div>
                <div className="canvas-card-body">
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>{p.title}</h3>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.sub}</p>
                  </div>
                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: platform === p.id ? 'var(--primary)' : 'var(--text-muted)' }}>
                      {platform === p.id ? '✓ Selected Canvas' : 'Select Target'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Tech Stack Select (Contextual per Platform) */}
      {step === 2 && (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '36px' }}>
          {platform === 'webapp' && (
            <>
              <div className="canvas-card" style={{ cursor: 'default' }}>
                <div className="canvas-card-header bg-gradient-purple">
                  <div className="canvas-badge-icon"><Monitor size={24} color="#3B82F6" /></div>
                </div>
                <div className="canvas-card-body">
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'center' }}>Frontend Framework</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                    {['React', 'Next.js', 'Vue', 'Angular', 'Svelte', 'HTML/CSS/JS', 'PHP + HTML', 'WordPress', 'Custom'].map(f => (
                      <button key={f} onClick={() => setTechStack({ ...techStack, frontend: f })} style={{ padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, background: techStack.frontend === f ? 'var(--primary)' : 'var(--bg-main)', color: techStack.frontend === f ? 'white' : 'var(--text-primary)', border: '1px solid var(--border-color)' }}>{f}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="canvas-card" style={{ cursor: 'default' }}>
                <div className="canvas-card-header bg-gradient-pink">
                  <div className="canvas-badge-icon"><Cpu size={24} color="#EC4899" /></div>
                </div>
                <div className="canvas-card-body">
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'center' }}>Backend Framework</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                    {['Node.js', 'Python (Django/Flask)', 'Firebase Functions', 'Supabase', 'Laravel (PHP)', 'Ruby on Rails', 'Custom'].map(b => (
                      <button key={b} onClick={() => setTechStack({ ...techStack, backend: b })} style={{ padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, background: techStack.backend === b ? 'var(--primary)' : 'var(--bg-main)', color: techStack.backend === b ? 'white' : 'var(--text-primary)', border: '1px solid var(--border-color)' }}>{b}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="canvas-card" style={{ cursor: 'default' }}>
                <div className="canvas-card-header bg-gradient-mint">
                  <div className="canvas-badge-icon"><Database size={24} color="#10B981" /></div>
                </div>
                <div className="canvas-card-body">
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'center' }}>Database Engine</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                    {['Firestore', 'Supabase DB', 'MongoDB', 'MySQL/SQL', 'PostgreSQL', 'SQLite', 'Custom'].map(d => (
                      <button key={d} onClick={() => setTechStack({ ...techStack, database: d })} style={{ padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, background: techStack.database === d ? 'var(--primary)' : 'var(--bg-main)', color: techStack.database === d ? 'white' : 'var(--text-primary)', border: '1px solid var(--border-color)' }}>{d}</button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {platform === 'mobileapp' && (
            <>
              <div className="canvas-card" style={{ cursor: 'default' }}>
                <div className="canvas-card-header bg-gradient-pink">
                  <div className="canvas-badge-icon"><Smartphone size={24} color="#EC4899" /></div>
                </div>
                <div className="canvas-card-body">
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'center' }}>Mobile Frontend</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                    {['Flutter', 'React Native', 'iOS Native (Swift)', 'Android Native (Kotlin)', 'Custom'].map(f => (
                      <button key={f} onClick={() => setTechStack({ ...techStack, frontend: f })} style={{ padding: '8px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, background: techStack.frontend === f ? 'var(--primary)' : 'var(--bg-main)', color: techStack.frontend === f ? 'white' : 'var(--text-primary)', border: '1px solid var(--border-color)' }}>{f}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="canvas-card" style={{ cursor: 'default' }}>
                <div className="canvas-card-header bg-gradient-mint">
                  <div className="canvas-badge-icon"><Database size={24} color="#10B981" /></div>
                </div>
                <div className="canvas-card-body">
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'center' }}>Backend + Database</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                    {['Firebase', 'Supabase', 'Node.js + SQL', 'PHP + SQL', 'Custom'].map(b => (
                      <button key={b} onClick={() => setTechStack({ ...techStack, backend: b, database: b })} style={{ padding: '8px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, background: techStack.backend === b ? 'var(--primary)' : 'var(--bg-main)', color: techStack.backend === b ? 'white' : 'var(--text-primary)', border: '1px solid var(--border-color)' }}>{b}</button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {(platform === 'desktopapp' || platform === 'custom') && (
            <>
              <div className="canvas-card" style={{ cursor: 'default' }}>
                <div className="canvas-card-header bg-gradient-purple">
                  <div className="canvas-badge-icon"><Laptop size={24} color="#3B82F6" /></div>
                </div>
                <div className="canvas-card-body">
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'center' }}>Desktop / Tool Framework</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                    {['Electron + React', 'Tauri', 'Flutter Desktop', '.NET MAUI', 'Java (JavaFX)', 'CLI / Browser Ext', 'Custom'].map(f => (
                      <button key={f} onClick={() => setTechStack({ ...techStack, frontend: f })} style={{ padding: '8px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, background: techStack.frontend === f ? 'var(--primary)' : 'var(--bg-main)', color: techStack.frontend === f ? 'white' : 'var(--text-primary)', border: '1px solid var(--border-color)' }}>{f}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="canvas-card" style={{ cursor: 'default' }}>
                <div className="canvas-card-header bg-gradient-amber">
                  <div className="canvas-badge-icon"><Database size={24} color="#F59E0B" /></div>
                </div>
                <div className="canvas-card-body">
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'center' }}>Storage & Backend Engine</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
                    {['Firebase', 'SQLite (local)', 'Node.js + SQL', 'Custom Storage'].map(b => (
                      <button key={b} onClick={() => setTechStack({ ...techStack, backend: b, database: b })} style={{ padding: '8px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, background: techStack.backend === b ? 'var(--primary)' : 'var(--bg-main)', color: techStack.backend === b ? 'white' : 'var(--text-primary)', border: '1px solid var(--border-color)' }}>{b}</button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* STEP 3: Style Select (All 13 Presets) */}
      {step === 3 && (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px', marginBottom: '36px' }}>
          {stylePresets.map(s => (
            <div key={s} className="canvas-card" onClick={() => setStyle(s as StylePresetId)} style={{ border: style === s ? '2px solid var(--primary)' : '1px solid var(--border-color)' }}>
              <div className="canvas-card-header bg-gradient-purple" style={{ height: '70px' }}>
                <div className="canvas-badge-icon" style={{ width: '42px', height: '42px', transform: 'translateY(20px)' }}>
                  <Palette size={18} color="var(--primary)" />
                </div>
              </div>
              <div className="canvas-card-body" style={{ textAlign: 'center', padding: '26px 12px 14px 12px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>{s}</h3>
                <span style={{ fontSize: '11px', fontWeight: 700, color: style === s ? 'var(--primary)' : 'var(--text-muted)' }}>
                  {style === s ? '✓ Selected' : 'Select'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* STEP 4: Colors & Theme Select (All 18 Solid Palettes, 4 Gradients, Custom) */}
      {step === 4 && (
        <div className="animate-fade-in" style={{ marginBottom: '36px' }}>
          {/* Palette Type Selector */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
            <button onClick={() => setColorType('solid')} className={colorType === 'solid' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '8px 18px', borderRadius: '20px', fontSize: '13px' }}>
              Solid Brand Palettes ({solidColors.length})
            </button>
            <button onClick={() => setColorType('gradient')} className={colorType === 'gradient' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '8px 18px', borderRadius: '20px', fontSize: '13px' }}>
              Gradient Presets ({gradientPresets.length})
            </button>
            <button onClick={() => setColorType('custom')} className={colorType === 'custom' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '8px 18px', borderRadius: '20px', fontSize: '13px' }}>
              Custom Pick
            </button>
          </div>

          {colorType === 'solid' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '14px' }}>
              {solidColors.map(c => (
                <div key={c.id} className="canvas-card" onClick={() => setSelectedSolidColor(c.name)} style={{ border: selectedSolidColor === c.name ? '2px solid var(--primary)' : '1px solid var(--border-color)' }}>
                  <div className="canvas-card-header" style={{ background: c.hex, height: '60px' }}>
                    <div className="canvas-badge-icon" style={{ width: '36px', height: '36px', transform: 'translateY(18px)' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: c.hex }} />
                    </div>
                  </div>
                  <div className="canvas-card-body" style={{ textAlign: 'center', padding: '24px 8px 12px 8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{c.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {colorType === 'gradient' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {gradientPresets.map(g => (
                <div key={g.id} className="canvas-card" onClick={() => setSelectedGradient(g.name)} style={{ border: selectedGradient === g.name ? '2px solid var(--primary)' : '1px solid var(--border-color)' }}>
                  <div className="canvas-card-header" style={{ background: `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)`, height: '80px' }}>
                    <div className="canvas-badge-icon" style={{ width: '42px', height: '42px', transform: 'translateY(20px)' }}>
                      <Palette size={20} color={g.from} />
                    </div>
                  </div>
                  <div className="canvas-card-body" style={{ textAlign: 'center', padding: '26px 12px 14px 12px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>{g.name}</h3>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{g.from} → {g.to}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {colorType === 'custom' && (
            <div className="canvas-card" style={{ padding: '28px', borderRadius: '20px', cursor: 'default', maxWidth: '600px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>Pick Your Custom Colors</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>Primary Accent</label>
                  <input type="color" value={customColors.primary} onChange={e => setCustomColors({ ...customColors, primary: e.target.value })} style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>Secondary Accent</label>
                  <input type="color" value={customColors.secondary} onChange={e => setCustomColors({ ...customColors, secondary: e.target.value })} style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer' }} />
                </div>
              </div>
            </div>
          )}

          {/* Theme Support Option */}
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginRight: '12px' }}>Theme Support:</label>
            {(['light', 'dark', 'system'] as ThemeMode[]).map(t => (
              <button key={t} onClick={() => setThemeMode(t)} style={{ padding: '6px 14px', borderRadius: '14px', fontSize: '12px', fontWeight: 600, margin: '0 4px', background: themeMode === t ? 'var(--primary)' : 'var(--bg-main)', color: themeMode === t ? 'white' : 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
                {t === 'light' ? 'Light' : t === 'dark' ? 'Dark' : 'System (Both)'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 5: Choose a Font (All 10 Google Fonts) */}
      {step === 5 && (
        <div className="animate-fade-in" style={{ marginBottom: '36px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {fontOptions.map(f => (
              <div key={f.id} className="canvas-card" onClick={() => setFont(f.id)} style={{ border: font === f.id ? '2px solid var(--primary)' : '1px solid var(--border-color)' }}>
                <div className="canvas-card-header bg-gradient-purple" style={{ height: '70px' }}>
                  <div className="canvas-badge-icon" style={{ width: '42px', height: '42px', transform: 'translateY(20px)' }}>
                    <Type size={18} color="var(--primary)" />
                  </div>
                </div>
                <div className="canvas-card-body" style={{ textAlign: 'center', padding: '26px 12px 14px 12px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, fontFamily: `'${f.family}', sans-serif`, color: 'var(--text-primary)', marginBottom: '2px' }}>{f.name}</h3>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{f.category}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Font Field */}
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>Custom Google Font Name (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Roboto, Montserrat..."
              value={customFont}
              onChange={e => { setCustomFont(e.target.value); setFont('Custom'); }}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '13px' }}
            />
          </div>
        </div>
      )}

      {/* STEP 6: Describe Project (Templates & Description) */}
      {step === 6 && (
        <div className="animate-fade-in" style={{ maxWidth: '780px', margin: '0 auto 36px auto' }}>
          {/* Quick Start Templates */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
              Quick Start Templates
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {quickTemplates.map(t => (
                <button
                  key={t.id}
                  onClick={() => {
                    setProjectDescription(t.description);
                    setProjectType(t.type);
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--primary)',
                    cursor: 'pointer'
                  }}
                >
                  ⚡ {t.title}
                </button>
              ))}
            </div>
          </div>

          <div className="canvas-card" style={{ padding: '32px', borderRadius: '24px', cursor: 'default' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Project Type</label>
              <select
                value={projectType}
                onChange={e => setProjectType(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600 }}
              >
                <option value="E-commerce">E-commerce</option>
                <option value="SaaS">SaaS Application</option>
                <option value="Portfolio">Portfolio / Agency</option>
                <option value="Social App">Social Platform</option>
                <option value="Internal Tool">Internal Tool / Admin Panel</option>
              </select>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Project Description *</label>
                <span style={{ fontSize: '11px', color: projectDescription.length >= 30 ? '#10B981' : '#EF4444', fontWeight: 600 }}>{projectDescription.length} chars (30 minimum)</span>
              </div>
              <textarea
                rows={6}
                value={projectDescription}
                onChange={e => setProjectDescription(e.target.value)}
                placeholder="Describe your app concept, target users, main features, workflows..."
                style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '14px', lineHeight: 1.6 }}
              />
            </div>

            <div style={{ marginTop: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>Guiding Notes (Optional)</label>
              <input
                type="text"
                value={guidingNotes}
                onChange={e => setGuidingNotes(e.target.value)}
                placeholder="Any additional architectural rules or guidelines..."
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '13px' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid var(--border-color)', maxWidth: '820px', margin: '0 auto' }}>
        <button className="btn-secondary" onClick={() => { if (step > 1) setStep(step - 1); else onNavigate('dashboard'); }}>
          <ArrowLeft size={16} /> {step === 1 ? 'Back to Dashboard' : 'Previous Step'}
        </button>
        <button className="btn-primary" onClick={handleNextStep} disabled={step === 6 && projectDescription.length < 30}>
          {step === 6 ? 'Generate Project Canvas Spec' : 'Next Step'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
