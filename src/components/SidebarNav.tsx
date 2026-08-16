import React from 'react';
import { 
  LayoutDashboard, Wand2, FileText, Layout, Sparkles, CreditCard, 
  User, Sun, Moon, LogOut, Info, Shield, HelpCircle, Layers, ArrowRight, FolderKanban,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { UserProfile, ThemeMode } from '../types/prd';

interface SidebarNavProps {
  user: UserProfile | null;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
  onSignOut: () => void;
  activePage: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  user,
  theme,
  onToggleTheme,
  onNavigate,
  onSignOut,
  activePage,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const navGroups = [
    {
      group: 'Workspace',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'wizard', label: 'PRD Builder', icon: Wand2 },
        { id: 'dashboard', label: 'My Projects', icon: FolderKanban }
      ]
    },
    {
      group: 'Resources',
      items: [
        { id: 'templates', label: 'Templates', icon: Layout },
        { id: 'aitools', label: 'AI Tools', icon: Sparkles },
        { id: 'docs', label: 'Documentation', icon: Info }
      ]
    },
    {
      group: 'Account',
      items: [
        { id: 'account', label: 'Credits & Usage', icon: CreditCard },
        { id: 'upgrade', label: 'Upgrade Plan', icon: Sparkles },
        { id: 'account', label: 'Account & Audit', icon: User }
      ]
    }
  ];

  return (
    <aside 
      className="saas-sidebar" 
      style={{ 
        width: isCollapsed ? '76px' : '260px', 
        minWidth: isCollapsed ? '76px' : '260px',
        borderRight: '1px solid var(--border-color)', 
        background: 'var(--bg-sidebar)', 
        padding: isCollapsed ? '24px 10px' : '24px 16px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        height: '100vh', 
        position: 'sticky', 
        top: 0,
        transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 90
      }}
    >
      <div>
        {/* Brand Header with Collapse Button */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: isCollapsed ? 'center' : 'space-between', 
            padding: isCollapsed ? '0 0 24px 0' : '0 10px 24px 10px', 
            borderBottom: '1px solid var(--border-color)', 
            marginBottom: '20px' 
          }}
        >
          <div 
            onClick={() => onNavigate('dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={18} />
            </div>
            {!isCollapsed && (
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>PRD Studio</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>AI Product Architect</div>
              </div>
            )}
          </div>

          {/* Collapse Toggle Arrow Button */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              style={{
                background: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
            </button>
          )}
        </div>

        {/* Categorized Navigation Groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isCollapsed ? '16px' : '20px' }}>
          {navGroups.map((g, gIdx) => (
            <div key={gIdx}>
              {!isCollapsed ? (
                <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.8px', padding: '0 10px 8px 10px' }}>
                  {g.group}
                </div>
              ) : (
                <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 8px 8px 8px' }} />
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {g.items.map((item, iIdx) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={iIdx}
                      onClick={() => onNavigate(item.id)}
                      title={isCollapsed ? item.label : undefined}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                        gap: '12px',
                        padding: isCollapsed ? '10px' : '10px 12px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: isActive ? 700 : 500,
                        background: isActive ? 'var(--primary-light)' : 'transparent',
                        color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                        border: 'none',
                        borderLeft: (!isCollapsed && isActive) ? '3px solid var(--primary)' : '3px solid transparent',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Icon size={18} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                      {!isCollapsed && <span>{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom User Profile & Credit Progress Card */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
        {user ? (
          isCollapsed ? (
            /* Collapsed Bottom User Avatar Button */
            <div 
              onClick={() => onNavigate('account')}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              title={`${user.name} (${user.creditsRemaining} Cr remaining)`}
            >
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: 'white', fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {user.avatarLetter}
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--primary)', background: 'var(--primary-light)', padding: '2px 6px', borderRadius: '8px' }}>
                ⚡{user.creditsRemaining}
              </span>
            </div>
          ) : (
            /* Expanded Bottom User Card */
            <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', padding: '14px', borderRadius: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--primary)', color: 'white', fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {user.avatarLetter}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 700 }}>{user.plan} Tier</div>
                </div>
              </div>

              {/* Credit Progress Fill Bar */}
              <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  <span>⚡ Credits</span>
                  <span>{user.creditsRemaining} / {user.creditsMax}</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (user.creditsRemaining / user.creditsMax) * 100)}%`, height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('upgrade')} 
                style={{ width: '100%', padding: '6px', fontSize: '12px', fontWeight: 700, background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid var(--border-hover)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
              >
                Upgrade Plan <ArrowRight size={12} />
              </button>
            </div>
          )
        ) : (
          <button className="btn-primary" onClick={() => onNavigate('login')} style={{ width: '100%', justifyContent: 'center' }}>
            Log In
          </button>
        )}
      </div>
    </aside>
  );
};
