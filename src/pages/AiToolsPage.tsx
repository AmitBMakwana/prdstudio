import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../services/exportService';
import { AiToolIcon } from '../components/AiToolIcon';

interface AiToolsPageProps {
  onNavigate: (page: string) => void;
}

export const AiToolsPage: React.FC<AiToolsPageProps> = ({ onNavigate }) => {
  const [copiedTool, setCopiedTool] = useState<string | null>(null);

  const tools = [
    { name: 'Antigravity', desc: 'Google Deepmind autonomous agentic assistant. Accepts Master 1-Prompt build instructions for full-stack execution.' },
    { name: 'Claude Code', desc: 'Anthropic CLI AI agent. Built for terminal-driven full-stack application creation.' },
    { name: 'Cursor IDE', desc: 'AI-first code editor with inline agent execution and multi-file code synthesis.' },
    { name: 'Windsurf', desc: 'Codeium agentic IDE. Executes complex project specifications in real time.' },
    { name: 'ChatGPT Plus', desc: 'OpenAI GPT-4o architecture and full-stack coding prompt runner.' },
    { name: 'Gemini Advanced', desc: 'Google 1.5 Pro 2M token context window runner for full specification packages.' },
    { name: 'Lovable', desc: 'AI web app builder creating full-stack web applications from product specs.' },
    { name: 'Bolt.new', desc: 'Browser-based AI web builder for fast React & Next.js prototype deployment.' },
    { name: 'Replit Agent', desc: 'Autonomous coding agent for cloud sandbox creation and database setup.' },
    { name: 'v0 by Vercel', desc: 'Generative UI system producing Next.js components aligned with DESIGN.md.' }
  ];

  const handleCopyPrompt = (name: string) => {
    const promptText = `MASTER 1-PROMPT AI AGENT INSTRUCTION – TARGET: ${name.toUpperCase()}\n\nYou are a senior full-stack engineer. Build the following application according to the provided product specification.\n\nArchitecture: Next.js (Frontend) + Laravel 11 PHP API (Backend) + MySQL (DB: aiprd)\nDesign: Google Stitch DESIGN.md tokens with Playfair Display typography.\nFeatures: 42 Features, 18 Screens, 7 User Roles, 31 Database Tables, 48 API Endpoints.\nSecurity: Sanctum token auth, bcrypt hashing, XSS & SQL injection controls.`;
    copyToClipboard(promptText).then(() => {
      setCopiedTool(name);
      setTimeout(() => setCopiedTool(null), 2000);
    });
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
      <div style={{ textAlign: 'center', padding: '16px 20px 24px 20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.8px', marginBottom: '6px' }}>
          PRD STUDIO · AI CODING AGENT ECOSYSTEM
        </div>
        <h1 className="canvas-title">
          Compatible <span className="canvas-title-gradient">AI Coding Tools</span>
        </h1>
        <p className="canvas-subtitle" style={{ maxWidth: '640px', margin: '6px auto 0 auto' }}>
          Generate 1-click Master Prompts optimized for your favorite AI coding environments.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {tools.map((t, idx) => (
          <div key={idx} className="canvas-card" style={{ padding: '28px', borderRadius: '20px', cursor: 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <AiToolIcon name={t.name} size={22} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10B981', background: '#D1FAE5', padding: '2px 10px', borderRadius: '10px' }}>
                ● Verified Compatible
              </span>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>{t.name}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>{t.desc}</p>

            <button 
              className="btn-primary" 
              onClick={() => handleCopyPrompt(t.name)}
              style={{ width: '100%', justifyContent: 'center', fontSize: '13px' }}
            >
              {copiedTool === t.name ? <Check size={15} /> : <Copy size={15} />}
              {copiedTool === t.name ? 'Prompt Copied!' : `Copy Prompt for ${t.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
