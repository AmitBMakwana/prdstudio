import React from 'react';
import { Sparkles, Cpu, Terminal, Zap, Bot, Heart, Repeat, Rocket, Code } from 'lucide-react';

interface AiToolIconProps {
  name: string;
  size?: number;
  showBackground?: boolean;
}

export const AiToolIcon: React.FC<AiToolIconProps> = ({ name, size = 18, showBackground = true }) => {
  const normalized = name.toLowerCase();

  const getToolMeta = () => {
    if (normalized.includes('antigravity')) {
      return { icon: Sparkles, color: '#6366F1', bg: 'rgba(99, 102, 241, 0.12)', label: 'Antigravity' };
    }
    if (normalized.includes('claude')) {
      return { icon: Cpu, color: '#D97706', bg: 'rgba(217, 119, 6, 0.12)', label: 'Claude' };
    }
    if (normalized.includes('cursor')) {
      return { icon: Terminal, color: '#0284C7', bg: 'rgba(2, 132, 199, 0.12)', label: 'Cursor' };
    }
    if (normalized.includes('windsurf')) {
      return { icon: Zap, color: '#0891B2', bg: 'rgba(8, 145, 178, 0.12)', label: 'Windsurf' };
    }
    if (normalized.includes('chatgpt') || normalized.includes('openai')) {
      return { icon: Bot, color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)', label: 'ChatGPT' };
    }
    if (normalized.includes('gemini')) {
      return { icon: Sparkles, color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.12)', label: 'Gemini' };
    }
    if (normalized.includes('lovable')) {
      return { icon: Heart, color: '#EC4899', bg: 'rgba(236, 72, 153, 0.12)', label: 'Lovable' };
    }
    if (normalized.includes('bolt')) {
      return { icon: Zap, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)', label: 'Bolt' };
    }
    if (normalized.includes('replit')) {
      return { icon: Repeat, color: '#EA580C', bg: 'rgba(234, 88, 12, 0.12)', label: 'Replit' };
    }
    if (normalized.includes('v0')) {
      return { icon: Rocket, color: '#475569', bg: 'rgba(71, 85, 105, 0.12)', label: 'v0' };
    }
    return { icon: Code, color: 'var(--primary)', bg: 'var(--primary-light)', label: name };
  };

  const meta = getToolMeta();
  const IconComponent = meta.icon;

  if (!showBackground) {
    return <IconComponent size={size} color={meta.color} />;
  }

  return (
    <div 
      style={{
        width: `${size + 14}px`,
        height: `${size + 14}px`,
        borderRadius: '10px',
        background: meta.bg,
        color: meta.color,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
      title={name}
    >
      <IconComponent size={size} color={meta.color} />
    </div>
  );
};
