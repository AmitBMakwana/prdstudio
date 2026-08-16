import React, { useState } from 'react';
import { 
  ArrowLeft, Download, Copy, Check, Sparkles, FileText, Cpu, GitBranch, 
  Palette, Database, Shield, Terminal, Share2, Printer, RefreshCw, CheckCircle2
} from 'lucide-react';
import { PRDDocument } from '../types/prd';
import { exportPRDDocument, copyToClipboard } from '../services/exportService';

interface PrdEditorPageProps {
  prd: PRDDocument;
  onNavigate: (page: string) => void;
  onSavePRD: (updated: PRDDocument) => void;
}

export const PrdEditorPage: React.FC<PrdEditorPageProps> = ({ prd, onNavigate, onSavePRD }) => {
  const [activeTab, setActiveTab] = useState<string>(prd.sections[0]?.id || 'prd');
  const [copiedSectionId, setCopiedSectionId] = useState<string | null>(null);
  const [selectedAiTool, setSelectedAiTool] = useState<string>('Antigravity');
  const [exportFormat, setExportFormat] = useState<'markdown' | 'pdf' | 'json' | 'txt'>('markdown');

  const currentSection = prd.sections.find(s => s.id === activeTab) || prd.sections[0];

  const handleCopyCurrentSection = () => {
    if (!currentSection) return;
    copyToClipboard(currentSection.content).then(() => {
      setCopiedSectionId(currentSection.id);
      setTimeout(() => setCopiedSectionId(null), 2000);
    });
  };

  const handleCopyMasterPrompt = () => {
    const formattedPrompt = `MASTER 1-PROMPT AI AGENT INSTRUCTION – ${prd.title.toUpperCase()}\nTarget: ${selectedAiTool}\n\n${prd.masterPrompt}`;
    copyToClipboard(formattedPrompt).then(() => {
      setCopiedSectionId('master-prompt');
      setTimeout(() => setCopiedSectionId(null), 2000);
    });
  };

  const handleExport = () => {
    exportPRDDocument(prd, exportFormat);
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '80px' }}>
      
      {/* Top Breadcrumb & Actions Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-secondary" onClick={() => onNavigate('dashboard')} style={{ padding: '8px 14px', fontSize: '13px' }}>
            <ArrowLeft size={16} /> Back to Projects
          </button>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.8px' }}>
              {prd.platformName} · BUILD SPECIFICATION WORKSPACE
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              {prd.title}
            </h1>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select 
            value={exportFormat} 
            onChange={e => setExportFormat(e.target.value as any)}
            style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600 }}
          >
            <option value="markdown">Markdown (.md)</option>
            <option value="pdf">PDF Document (.pdf)</option>
            <option value="json">JSON File (.json)</option>
            <option value="txt">Plain Text (.txt)</option>
          </select>

          <button className="btn-primary" onClick={handleExport} style={{ padding: '8px 18px', fontSize: '13px' }}>
            <Download size={15} /> Export Document
          </button>
        </div>
      </div>

      {/* Main Workspace Layout (Sidebar Navigation + Main Document Viewer) */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Specification Files Navigation List */}
        <div className="canvas-card" style={{ padding: '16px', borderRadius: '20px', cursor: 'default' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.8px', padding: '0 8px 12px 8px', borderBottom: '1px solid var(--border-color)', marginBottom: '12px' }}>
            SPECIFICATION DOCUMENTS ({prd.sections.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {prd.sections.map((sec, idx) => {
              const isActive = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: isActive ? 700 : 500,
                    background: isActive ? 'var(--primary-light)' : 'transparent',
                    color: isActive ? 'var(--primary)' : 'var(--text-primary)',
                    border: 'none',
                    borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {sec.title}
                  </span>
                  <CheckCircle2 size={14} color={isActive ? 'var(--primary)' : '#10B981'} />
                </button>
              );
            })}
          </div>

          {/* Quality Score Breakdown Card (Point 36) */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>QUALITY SCORE</span>
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>96 / 100</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '96%', height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div>
            </div>
          </div>
        </div>

        {/* Right Main Document Inspector Window */}
        <div>
          {/* AI Coding Agent Prompt Box (Point 39) */}
          <div className="canvas-card" style={{ padding: '24px', borderRadius: '20px', marginBottom: '24px', cursor: 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={18} color="var(--primary)" />
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  MASTER AI AGENT BUILD PROMPT
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>Target Agent:</label>
                <select
                  value={selectedAiTool}
                  onChange={e => setSelectedAiTool(e.target.value)}
                  style={{ padding: '4px 10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '12px', fontWeight: 700 }}
                >
                  {['Antigravity', 'Claude Code', 'Cursor', 'Windsurf', 'ChatGPT', 'Gemini', 'Lovable', 'Bolt', 'Replit', 'v0'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>

                <button
                  onClick={handleCopyMasterPrompt}
                  style={{ padding: '6px 14px', borderRadius: '8px', background: 'var(--primary)', color: 'white', fontSize: '12px', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {copiedSectionId === 'master-prompt' ? <Check size={13} /> : <Copy size={13} />}
                  {copiedSectionId === 'master-prompt' ? 'Copied Prompt' : 'Copy Master Prompt →'}
                </button>
              </div>
            </div>

            <pre style={{ background: '#0F172A', color: '#F8FAFC', padding: '16px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.6, overflowX: 'auto', whiteSpace: 'pre-wrap', maxHeight: '180px' }}>
              {`MASTER 1-PROMPT AI AGENT INSTRUCTION – ${prd.title.toUpperCase()}\nTarget: ${selectedAiTool}\n\n${prd.masterPrompt}`}
            </pre>
          </div>

          {/* Document Content Reader */}
          <div className="canvas-card" style={{ padding: '32px', borderRadius: '20px', cursor: 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {currentSection?.title}
              </h2>

              <button
                onClick={handleCopyCurrentSection}
                style={{ padding: '6px 14px', borderRadius: '8px', background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '12px', fontWeight: 700, border: '1px solid var(--border-hover)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {copiedSectionId === currentSection?.id ? <Check size={13} color="#10B981" /> : <Copy size={13} />}
                {copiedSectionId === currentSection?.id ? 'Copied Section' : 'Copy Section'}
              </button>
            </div>

            <div style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
              {currentSection?.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
