import React, { useState } from 'react';
import { 
  Plus, ExternalLink, Trash2, Sparkles, Calendar, ShieldCheck, 
  Search, FileText, CheckCircle, ArrowRight, Zap, Code, Database, Cpu, 
  Layers, Terminal, LayoutGrid, List, Copy, Check, Filter
} from 'lucide-react';
import { PRDDocument, UserProfile } from '../types/prd';
import { copyToClipboard } from '../services/exportService';

interface DashboardPageProps {
  user: UserProfile;
  prds: PRDDocument[];
  onNavigate: (page: string) => void;
  onOpenPRD: (prd: PRDDocument) => void;
  onDeletePRD: (id: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  prds,
  onNavigate,
  onOpenPRD,
  onDeletePRD
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const filteredPRDs = prds.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.platformName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.techTags && p.techTags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesPlatform = 
      platformFilter === 'all' || 
      (p.wizardState && p.wizardState.platform === platformFilter);

    return matchesSearch && matchesPlatform;
  });

  const handleCopyPrompt = (e: React.MouseEvent, prd: PRDDocument) => {
    e.stopPropagation();
    copyToClipboard(prd.masterPrompt || '').then(() => {
      setCopiedPromptId(prd.id);
      setTimeout(() => setCopiedPromptId(null), 2000);
    });
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
      {/* Centered Hero Header */}
      <div style={{ textAlign: 'center', padding: '16px 20px 24px 20px' }}>
        <h1 className="canvas-title">
          Your Project <span className="canvas-title-gradient">Canvas</span>
        </h1>
        <p className="canvas-subtitle" style={{ maxWidth: '640px', margin: '6px auto 0 auto' }}>
          "Every brilliant application begins with a single spark. Shape your vision into a developer-ready architectural spec."
        </p>
      </div>

      {/* Top Metrics Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {/* Metric 1: Total Canvases */}
        <div className="canvas-card" style={{ padding: '20px', cursor: 'default', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>TOTAL CANVASES</span>
            <div style={{ background: 'var(--primary-light)', padding: '6px', borderRadius: '8px', color: 'var(--primary)' }}>
              <Layers size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {prds.length} <span style={{ fontSize: '13px', color: '#10B981', fontWeight: 700 }}>+100% Active</span>
          </div>
        </div>

        {/* Metric 2: Credits Remaining */}
        <div className="canvas-card" style={{ padding: '20px', cursor: 'default', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>CREDIT BALANCE</span>
            <div style={{ background: 'var(--primary-light)', padding: '6px', borderRadius: '8px', color: 'var(--primary)' }}>
              <Zap size={18} />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {user.creditsRemaining} <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>/ {user.creditsMax} Cr</span>
          </div>
        </div>

        {/* Metric 3: Active Plan */}
        <div className="canvas-card" style={{ padding: '20px', cursor: 'default', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>ACTIVE PLAN</span>
            <span style={{ background: '#DBEAFE', color: '#1E40AF', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 700 }}>
              {user.plan}
            </span>
          </div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Expires: {user.planValidity}
          </div>
        </div>

        {/* Metric 4: Database Engine */}
        <div className="canvas-card" style={{ padding: '20px', cursor: 'default', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>DATABASE SERVICE</span>
            <span style={{ color: '#10B981', fontSize: '12px', fontWeight: 700 }}>🟢 ONLINE</span>
          </div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
            MySQL (Database: aiprd)
          </div>
        </div>
      </div>

      {/* Control Bar: Search Input, Platform Filters & New PRD Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        {/* Left: Search Bar & Platform Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
          {/* Live Search Input */}
          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by title or stack..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                fontSize: '13px'
              }}
            />
          </div>

          {/* Platform Filter Pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Canvases' },
              { id: 'webapp', label: 'Web' },
              { id: 'mobileapp', label: 'Mobile' },
              { id: 'desktopapp', label: 'Desktop' },
              { id: 'custom', label: 'Custom' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setPlatformFilter(f.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: platformFilter === f.id ? 'var(--primary)' : 'var(--bg-card)',
                  color: platformFilter === f.id ? 'white' : 'var(--text-secondary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: View Switcher & New PRD Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2px' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{ padding: '6px 10px', borderRadius: '10px', background: viewMode === 'grid' ? 'var(--primary-light)' : 'transparent', color: viewMode === 'grid' ? 'var(--primary)' : 'var(--text-muted)' }}
              title="Grid Canvas View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{ padding: '6px 10px', borderRadius: '10px', background: viewMode === 'table' ? 'var(--primary-light)' : 'transparent', color: viewMode === 'table' ? 'var(--primary)' : 'var(--text-muted)' }}
              title="List Table View"
            >
              <List size={16} />
            </button>
          </div>

          <button 
            className="btn-primary" 
            onClick={() => onNavigate('wizard')}
            style={{ padding: '10px 22px', fontSize: '14px' }}
          >
            <Plus size={18} /> New Project Canvas
          </button>
        </div>
      </div>

      {/* Main Content Area: Grid View vs Table View */}
      {filteredPRDs.length === 0 ? (
        <div className="canvas-card" style={{ textAlign: 'center', padding: '60px 20px', cursor: 'default' }}>
          <FileText size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px auto' }} />
          <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>No Specification Canvases Found</h4>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            {searchQuery ? `No results matching "${searchQuery}".` : 'Create your first developer-ready architectural spec package.'}
          </p>
          <button className="btn-primary" onClick={() => onNavigate('wizard')}>
            <Plus size={18} /> Create New Canvas Spec
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID CANVAS CARDS VIEW matching reference screenshot styling */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredPRDs.map((prd, index) => {
            const gradientClasses = ['bg-gradient-purple', 'bg-gradient-pink', 'bg-gradient-mint', 'bg-gradient-amber'];
            const gradientClass = gradientClasses[index % gradientClasses.length];
            return (
              <div 
                key={prd.id} 
                className="canvas-card" 
                onClick={() => onOpenPRD(prd)}
              >
                {/* Pastel Header Banner with Floating Circular Badge */}
                <div className={`canvas-card-header ${gradientClass}`}>
                  <div className="canvas-badge-icon">
                    <Zap size={24} color="var(--primary)" />
                  </div>
                </div>

                {/* White Content Body */}
                <div className="canvas-card-body">
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                      {prd.platformName}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.3 }}>
                      {prd.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '14px' }}>
                      Next.js + Laravel 11 + MySQL (DB: aiprd) developer specification package.
                    </p>

                    {/* Tech Tags Badges */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {(prd.techTags || []).slice(1, 4).map((t, idx) => (
                        <span key={idx} style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      📅 {prd.createdAt}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* Copy Master Prompt Button */}
                      <button
                        onClick={(e) => handleCopyPrompt(e, prd)}
                        style={{ padding: '6px 10px', borderRadius: '8px', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                        title="Copy Master Prompt for Cursor/Claude"
                      >
                        {copiedPromptId === prd.id ? <Check size={13} color="#10B981" /> : <Terminal size={13} />}
                        {copiedPromptId === prd.id ? 'Copied' : 'Prompt'}
                      </button>

                      {/* Inspect Specs Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPRD(prd);
                        }}
                        style={{ padding: '6px 14px', borderRadius: '8px', background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '12px', fontWeight: 700, border: '1px solid var(--border-hover)' }}
                      >
                        Inspect Specs
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete canvas spec "${prd.title}"?`)) onDeletePRD(prd.id);
                        }}
                        style={{ padding: '6px 8px', borderRadius: '8px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#EF4444', fontSize: '12px' }}
                        title="Delete Canvas"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE LIST VIEW */
        <div className="canvas-card" style={{ padding: '24px', cursor: 'default', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Project Title</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Target Platform</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Tech Stack</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Created Date</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPRDs.map(prd => (
                <tr key={prd.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--text-primary)', cursor: 'pointer' }} onClick={() => onOpenPRD(prd)}>
                    {prd.title}
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>
                    <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '6px', fontWeight: 600, fontSize: '11px' }}>
                      {prd.platformName}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                    {(prd.techTags || []).slice(1, 4).join(' • ')}
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                    {prd.createdAt}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button className="btn-primary" onClick={() => onOpenPRD(prd)} style={{ padding: '4px 12px', fontSize: '12px' }}>
                        Inspect Specs
                      </button>
                      <button onClick={() => { if (confirm(`Delete "${prd.title}"?`)) onDeletePRD(prd.id); }} style={{ padding: '4px 8px', borderRadius: '6px', background: '#FEF2F2', color: '#EF4444', border: '1px solid #FCA5A5' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
