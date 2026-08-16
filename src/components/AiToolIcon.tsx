import React from 'react';

interface AiToolIconProps {
  name: string;
  size?: number;
  showBackground?: boolean;
}

export const AiToolIcon: React.FC<AiToolIconProps> = ({ name, size = 20, showBackground = true }) => {
  const normalized = name.toLowerCase();

  const renderSvg = () => {
    if (normalized.includes('antigravity')) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path fill="url(#antigravity-grad-real)" d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"/>
          <defs>
            <linearGradient id="antigravity-grad-real" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1"/>
              <stop offset="0.5" stopColor="#8B5CF6"/>
              <stop offset="1" stopColor="#EC4899"/>
            </linearGradient>
          </defs>
        </svg>
      );
    }

    if (normalized.includes('claude')) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#D97706">
          <path d="M13.8 2.2L12 8.4L10.2 2.2H6.6L9.6 11.2L3 13.8V17.4L10.8 14.4L10.2 21.8H13.8L13.2 14.4L21 17.4V13.8L14.4 11.2L17.4 2.2H13.8Z"/>
        </svg>
      );
    }

    if (normalized.includes('cursor')) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#0284C7">
          <path d="M4 3L20 12L12.5 14.5L10 21L4 3Z"/>
        </svg>
      );
    }

    if (normalized.includes('windsurf')) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2.5" strokeLinecap="round">
          <path d="M2 12C5 8 9 8 12 12C15 16 19 16 22 12"/>
          <path d="M2 6C5 2 9 2 12 6C15 10 19 10 22 6"/>
          <path d="M2 18C5 14 9 14 12 18C15 22 19 22 22 18"/>
        </svg>
      );
    }

    if (normalized.includes('chatgpt') || normalized.includes('openai')) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#10B981">
          <path d="M22.28 9.87a5.98 5.98 0 0 0-.52-4.93 6.04 6.04 0 0 0-6.47-2.88 6.02 6.02 0 0 0-4.57-2.06c-2.5 0-4.7 1.54-5.54 3.86a6.04 6.04 0 0 0-3.95 2.87 5.98 5.98 0 0 0 .52 6.55 6.04 6.04 0 0 0 .52 4.93 6.04 6.04 0 0 0 6.47 2.88 6.04 6.04 0 0 0 4.57 2.06c2.5 0 4.7-1.54 5.54-3.86a6.04 6.04 0 0 0 3.95-2.87 5.98 5.98 0 0 0-.52-6.55zM12.7 20.35a4.42 4.42 0 0 1-2.92-1.09l.15-.09 4.85-2.8a.79.79 0 0 0 .39-.68v-4.88l1.46.84a.1.1 0 0 1 .05.08v5.61c0 1.66-1.35 3.01-3.98 3.01zm-7.66-4.42a4.4 4.4 0 0 1-.54-3.07l.15.09 4.85 2.8a.79.79 0 0 0 .79 0l4.23-2.44v1.68a.1.1 0 0 1-.04.09l-4.86 2.81c-1.44.83-3.23.58-4.58-.96zm-1.1-7.92c.67-1.5 2.14-2.5 3.82-2.58l-.01.17v5.6a.79.79 0 0 0 .39.68l4.23 2.44-1.46.84a.1.1 0 0 1-.1 0L6.05 12.3c-1.44-.83-2.12-2.43-2.12-4.29zm13.1-2.11a4.42 4.42 0 0 1 2.92 1.09l-.15.09-4.85 2.8a.79.79 0 0 0-.39.68v4.88l-1.46-.84a.1.1 0 0 1-.05-.08V8.9c0-1.66 1.35-3.01 3.98-3.01zm4.18 5.76c0 1.66-.88 3.19-2.32 4.02l-.15-.09-4.85-2.8a.79.79 0 0 0-.79 0l-4.23 2.44v-1.68a.1.1 0 0 1 .04-.09l4.86-2.81c1.44-.83 3.23-.58 4.58.96.58.9.86 1.98.86 3.05zm-6.28-4.3l-4.23 2.44-4.23-2.44 4.23-2.44 4.23 2.44z"/>
        </svg>
      );
    }

    if (normalized.includes('gemini')) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path fill="url(#gemini-grad-real)" d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z"/>
          <defs>
            <linearGradient id="gemini-grad-real" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1A73E8"/>
              <stop offset="0.5" stopColor="#8AB4F8"/>
              <stop offset="1" stopColor="#D93025"/>
            </linearGradient>
          </defs>
        </svg>
      );
    }

    if (normalized.includes('lovable')) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="url(#lovable-grad-real)">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          <defs>
            <linearGradient id="lovable-grad-real" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EC4899"/>
              <stop offset="1" stopColor="#F43F5E"/>
            </linearGradient>
          </defs>
        </svg>
      );
    }

    if (normalized.includes('bolt')) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#F59E0B">
          <path d="M11 21L13 13H7L13 3L11 11H17L11 21Z"/>
        </svg>
      );
    }

    if (normalized.includes('replit')) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#EA580C">
          <path d="M2 2H12V8H6V14H2V2ZM12 8H22V14H16V22H12V8ZM6 14H12V22H6V14Z"/>
        </svg>
      );
    }

    if (normalized.includes('v0')) {
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L24 22H0L12 1Z"/>
        </svg>
      );
    }

    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    );
  };

  const getBgColor = () => {
    if (normalized.includes('antigravity')) return 'rgba(99, 102, 241, 0.12)';
    if (normalized.includes('claude')) return 'rgba(217, 119, 6, 0.12)';
    if (normalized.includes('cursor')) return 'rgba(2, 132, 199, 0.12)';
    if (normalized.includes('windsurf')) return 'rgba(8, 145, 178, 0.12)';
    if (normalized.includes('chatgpt')) return 'rgba(16, 185, 129, 0.12)';
    if (normalized.includes('gemini')) return 'rgba(139, 92, 246, 0.12)';
    if (normalized.includes('lovable')) return 'rgba(236, 72, 153, 0.12)';
    if (normalized.includes('bolt')) return 'rgba(245, 158, 11, 0.12)';
    if (normalized.includes('replit')) return 'rgba(234, 88, 12, 0.12)';
    if (normalized.includes('v0')) return 'rgba(71, 85, 105, 0.12)';
    return 'var(--primary-light)';
  };

  if (!showBackground) {
    return renderSvg();
  }

  return (
    <div 
      style={{
        width: `${size + 16}px`,
        height: `${size + 16}px`,
        borderRadius: '12px',
        background: getBgColor(),
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
      title={name}
    >
      {renderSvg()}
    </div>
  );
};
