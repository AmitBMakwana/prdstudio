import React, { useState } from 'react';
import { 
  ArrowLeft, Download, RefreshCw, Edit3, Save, Copy, Check, 
  FileText, Cpu, GitBranch, Palette, Database, Shield, Terminal
} from 'lucide-react';
import { PRDDocument } from '../types/prd';
import { exportAsMarkdown, exportAsJSON, exportAsText, exportAsPDF, copyToClipboard } from '../services/exportService';

interface PrdEditorPageProps {
  prd: PRDDocument;
  onNavigate: (page: string) => void;
  onSavePRD: (updated: PRDDocument) => void;
}

export const PrdEditorPage: React.FC<PrdEditorPageProps> = ({
  prd,
  onNavigate,
  onSavePRD
}) => {
  // Defensive check for sections array
  const sections = (prd && Array.isArray(prd.sections) && prd.sections.length > 0) 
    ? prd.sections 
    : [
        { 
          id: 'prd', 
          title: 'PRD (Product Requirements Document)', 
          iconName: 'FileText', 
          content: prd?.masterPrompt || 'Specification Package details generated successfully.' 
        }
      ];

  const [activeSectionId, setActiveSectionId] = useState<string>(sections[0]?.id || 'prd');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  const activeSection = sections.find(s => s.id === activeSectionId) || sections[0];

  const handleStartEdit = () => {
    setEditedContent(activeSection.content || '');
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedSections = sections.map(sec => {
      if (sec.id === activeSection.id) {
        return { ...sec, content: editedContent };
      }
      return sec;
    });

    const updatedDoc: PRDDocument = {
      ...prd,
      sections: updatedSections
    };

    onSavePRD(updatedDoc);
    setIsEditing(false);
  };

  const handleCopySection = () => {
    copyToClipboard(activeSection.content || '').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCopyMasterPrompt = () => {
    copyToClipboard(prd?.masterPrompt || '').then(() => {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    });
  };

  const sectionIconMap: Record<string, React.ReactNode> = {
    'prd': <FileText size={18} />,
    'trd': <Cpu size={18} />,
    'app-flow': <GitBranch size={18} />,
    'ui-ux': <Palette size={18} />,
    'database-design': <Database size={18} />,
    'security': <Shield size={18} />
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
      {/* Top Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={() => onNavigate('dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}
          >
            <ArrowLeft size={16} /> Dashboard
          </button>
          <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {prd?.title || 'PRD Document'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Master 1-Prompt Button */}
          <button 
            className="btn-primary"
            onClick={handleCopyMasterPrompt}
            style={{ padding: '8px 16px', fontSize: '13px', background: 'var(--primary-gradient)' }}
            title="Copy Master Prompt for Cursor / Claude Code / Antigravity"
          >
            {copiedPrompt ? <Check size={15} /> : <Terminal size={15} />}
            {copiedPrompt ? 'Master Prompt Copied!' : 'Copy Master 1-Prompt'}
          </button>

          {isEditing ? (
            <button className="btn-primary" onClick={handleSaveEdit} style={{ padding: '8px 16px', fontSize: '13px' }}>
              <Save size={16} /> Save Changes
            </button>
          ) : (
            <button className="btn-secondary" onClick={handleStartEdit} style={{ padding: '8px 16px', fontSize: '13px' }}>
              <Edit3 size={16} /> Edit File
            </button>
          )}

          <button className="btn-secondary" onClick={() => setShowExportModal(true)} style={{ padding: '8px 16px', fontSize: '13px' }}>
            <Download size={16} /> Export Specs
          </button>
        </div>
      </div>

      {/* Tech Tags Bar */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
        {(prd?.techTags || []).map((tag, idx) => (
          <span 
            key={idx} 
            style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-color)', 
              padding: '4px 12px', 
              borderRadius: '8px', 
              fontSize: '12px', 
              fontWeight: 600, 
              color: 'var(--text-secondary)' 
            }}
          >
            {tag}
          </span>
        ))}
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
          📅 {prd?.createdAt || 'Aug 16, 2026'}
        </span>
      </div>

      {/* 6 Exact Deep Spec Files Navigation Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'flex-start' }}>
        {/* Left Specification Files Sidebar */}
        <div className="saas-card" style={{ padding: '16px', borderRadius: '16px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px', marginBottom: '12px' }}>
            SPECIFICATION FILES
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {sections.map(sec => {
              const isActive = sec.id === activeSection.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    setIsEditing(false);
                    setActiveSectionId(sec.id);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: isActive ? 700 : 500,
                    background: isActive ? 'var(--primary-light)' : 'transparent',
                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                    textAlign: 'left',
                    border: isActive ? '1px solid var(--border-hover)' : '1px solid transparent'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    {sectionIconMap[sec.id] || <FileText size={16} />}
                  </span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {sec.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Editor / Inspector */}
        <div className="saas-card" style={{ padding: '28px', borderRadius: '16px', minHeight: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ color: 'var(--primary)' }}>
                {sectionIconMap[activeSection.id] || <FileText size={20} />}
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {activeSection.title}
              </h2>
            </div>

            <button 
              onClick={handleCopySection}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              {copied ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
              {copied ? 'Copied File!' : 'Copy File Content'}
            </button>
          </div>

          {/* File Body Content */}
          {isEditing ? (
            <div>
              <textarea
                rows={18}
                value={editedContent}
                onChange={e => setEditedContent(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid var(--primary)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-primary)',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  lineHeight: 1.6
                }}
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '14px', justifyContent: 'flex-end' }}>
                <button className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                <button className="btn-primary" onClick={handleSaveEdit}>Save File Changes</button>
              </div>
            </div>
          ) : (
            <div style={{ 
              background: 'var(--bg-main)', 
              padding: '20px', 
              borderRadius: '12px', 
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              lineHeight: 1.7,
              fontSize: '13px',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace'
            }}>
              {activeSection.content}
            </div>
          )}
        </div>
      </div>

      {/* Export Options Modal */}
      {showExportModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="saas-card" style={{ width: '90%', maxWidth: '450px', padding: '28px', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
              Export Specification Package
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Download complete PRD, TRD, App Flow, UI/UX, DB, & Security files for "{prd?.title}".
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <button 
                className="btn-secondary" 
                onClick={() => { exportAsMarkdown(prd); setShowExportModal(false); }}
                style={{ justifyContent: 'flex-start', padding: '10px 14px' }}
              >
                📄 Markdown (.md) – Recommended for AI Coding Agents
              </button>

              <button 
                className="btn-secondary" 
                onClick={() => { exportAsPDF(prd); setShowExportModal(false); }}
                style={{ justifyContent: 'flex-start', padding: '10px 14px' }}
              >
                📕 PDF Document (.pdf) – Print Specification
              </button>

              <button 
                className="btn-secondary" 
                onClick={() => { exportAsJSON(prd); setShowExportModal(false); }}
                style={{ justifyContent: 'flex-start', padding: '10px 14px' }}
              >
                📦 Structured JSON (.json) – Programmatic Integration
              </button>

              <button 
                className="btn-secondary" 
                onClick={() => { exportAsText(prd); setShowExportModal(false); }}
                style={{ justifyContent: 'flex-start', padding: '10px 14px' }}
              >
                📝 Plain Text (.txt) – Universal Compatibility
              </button>
            </div>

            <button className="btn-secondary" onClick={() => setShowExportModal(false)} style={{ width: '100%', justifyContent: 'center' }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
