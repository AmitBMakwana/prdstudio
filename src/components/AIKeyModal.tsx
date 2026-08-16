import React, { useState, useEffect } from 'react';
import { Key, X, CheckCircle2, Cpu, HelpCircle, Shield } from 'lucide-react';

interface AIKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIKeyModal: React.FC<AIKeyModalProps> = ({ isOpen, onClose }) => {
  const [provider, setProvider] = useState<'builtin' | 'openai' | 'anthropic' | 'gemini'>('builtin');
  const [apiKey, setApiKey] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    const savedProv = localStorage.getItem('ai_provider') || 'builtin';
    const savedKey = localStorage.getItem('ai_api_key') || '';
    setProvider(savedProv as any);
    setApiKey(savedKey);
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('ai_provider', provider);
    localStorage.setItem('ai_api_key', apiKey);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="saas-card" style={{ width: '90%', maxWidth: '540px', padding: '32px', borderRadius: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '8px', borderRadius: '10px' }}>
              <Key size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>AI Provider & API Key Settings</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Configure how PRDs and coding prompts are synthesized.</p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        {/* Verification Explanation */}
        <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', padding: '14px', borderRadius: '12px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HelpCircle size={15} color="var(--primary)" /> How are PRDs generated?
          </div>
          By default, AI PRD Studio uses our <strong>Built-in Structured AI PRD Compiler engine</strong> (PHP Laravel backend + TypeScript engine). You can optionally enter your own API key below to route requests directly through OpenAI, Anthropic, or Gemini!
        </div>

        {/* Provider Selection */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Select AI Synthesis Engine
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { id: 'builtin', name: 'Built-in AI Compiler', sub: 'Zero setup required' },
              { id: 'openai', name: 'OpenAI GPT-4o', sub: 'Custom OpenAI API key' },
              { id: 'anthropic', name: 'Claude 3.5 Sonnet', sub: 'Anthropic API key' },
              { id: 'gemini', name: 'Google Gemini Pro', sub: 'Gemini API key' }
            ].map(p => (
              <div
                key={p.id}
                onClick={() => setProvider(p.id as any)}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: provider === p.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  background: provider === p.id ? 'var(--primary-light)' : 'var(--bg-main)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* API Key Input */}
        {provider !== 'builtin' && (
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              Enter {provider.toUpperCase()} API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder={provider === 'openai' ? 'sk-...' : provider === 'anthropic' ? 'sk-ant-...' : 'AIzaSy...'}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-main)',
                color: 'var(--text-primary)',
                fontSize: '13px'
              }}
            />
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Shield size={12} /> Your key is stored securely in your local browser environment.
            </div>
          </div>
        )}

        {savedSuccess ? (
          <div style={{ color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700, padding: '10px' }}>
            <CheckCircle2 size={18} /> Settings Saved Successfully!
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>Save AI Settings</button>
          </div>
        )}
      </div>
    </div>
  );
};
