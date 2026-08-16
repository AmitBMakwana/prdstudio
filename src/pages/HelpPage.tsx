import React, { useState } from 'react';
import { HelpCircle, Mail, MessageSquare, CheckCircle2, Search, ArrowRight, ShieldCheck, LifeBuoy } from 'lucide-react';

interface HelpPageProps {
  onNavigate: (page: string) => void;
}

export const HelpPage: React.FC<HelpPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const faqs = [
    {
      q: 'How does PRD Studio compile Next.js and Laravel architecture?',
      a: 'PRD Studio combines user high-level requirements with structured software design templates to output database schemas, REST API endpoints, security rules, and clean prompt instructions for AI IDEs.'
    },
    {
      q: 'Can I export my PRD to Markdown, PDF, or JSON?',
      a: 'Yes! The PRD Spec Inspector allows 1-click downloads in clean GFM Markdown, raw JSON for automated CI/CD pipelines, or PDF document formats.'
    },
    {
      q: 'How do AI credits work?',
      a: 'Each PRD compilation or full specification update consumes 1 AI Credit. Your account comes with initial credits, and additional credits can be added anytime.'
    },
    {
      q: 'Can I use custom OpenAI, Anthropic, or Gemini API keys?',
      a: 'Absolutely! Open the AI Provider settings modal in the header/sidebar to enter your personal sk-... API keys for zero-credit compilation.'
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 24px', maxWidth: '1080px' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '48px 36px', borderRadius: '32px', textAlign: 'center', marginBottom: '40px', background: 'linear-gradient(135deg, rgba(91,75,255,0.06) 0%, rgba(124,58,237,0.06) 100%)' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
          <LifeBuoy size={24} />
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
          Help Center & Support
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 24px auto' }}>
          Find answers to common questions, view system status, or get in touch with our engineering team.
        </p>

        {/* Search Input */}
        <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search FAQs, API endpoints, troubleshooting..."
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* Grid: FAQs & Contact Form */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        
        {/* Left Column: FAQs */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HelpCircle size={20} color="var(--primary)" /> Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredFaqs.map((faq, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '20px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Contact & System Status */}
        <div>
          {/* System Status Card */}
          <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', marginBottom: '24px', background: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)' }}>System Operational Status</div>
              <span style={{ background: '#D1FAE5', color: '#065F46', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>
                100% Operational
              </span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              All AI compilers, API routes, and DB migration engines running smoothly.
            </div>
          </div>

          {/* Contact Support Form */}
          <div className="glass-card" style={{ padding: '28px', borderRadius: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={18} color="var(--primary)" /> Contact Support Team
            </h2>

            {contactSubmitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={40} color="#10B981" style={{ margin: '0 auto 12px auto' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>Message Sent!</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Our support team will get back to your email within 24 hours.</p>
                <button className="btn-secondary" style={{ marginTop: '16px' }} onClick={() => setContactSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="Issue description or question"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-main)',
                      fontSize: '13px',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Describe how we can help..."
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-main)',
                      fontSize: '13px',
                      color: 'var(--text-primary)',
                      resize: 'none'
                    }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                  Submit Inquiry <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
