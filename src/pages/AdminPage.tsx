import React, { useState, useEffect } from 'react';
import { 
  Users, Shield, Zap, FileText, TrendingUp, DollarSign, Search, Filter, 
  UserCheck, UserX, PlusCircle, Trash2, KeyRound, Activity, CheckCircle2, 
  AlertCircle, RefreshCw, BarChart2, PieChart, Layers, ArrowUpRight, Check
} from 'lucide-react';
import { UserProfile, AdminAnalyticsSummary } from '../types/prd';
import { 
  getRegisteredUsersList, updateUserRole, updateUserStatus, 
  adjustUserCredits, deleteUserAccount, getAdminAnalyticsSummary 
} from '../services/adminService';

interface AdminPageProps {
  currentUser: UserProfile;
  onNavigate: (page: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ currentUser, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'logs' | 'health'>('analytics');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [analytics, setAnalytics] = useState<AdminAnalyticsSummary | null>(null);
  
  // User Management State
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'admin'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Suspended'>('all');
  
  // Modal for granting credits
  const [selectedUserForCredits, setSelectedUserForCredits] = useState<UserProfile | null>(null);
  const [creditAmount, setCreditAmount] = useState<number>(100);
  const [creditActionSuccess, setCreditActionSuccess] = useState(false);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const loadedUsers = getRegisteredUsersList();
    setUsers(loadedUsers);
    setAnalytics(getAdminAnalyticsSummary());
  };

  const handleRoleToggle = (user: UserProfile) => {
    let targetRole: 'user' | 'admin' | 'superadmin' = 'superadmin';
    if (user.role === 'superadmin') targetRole = 'admin';
    else if (user.role === 'admin') targetRole = 'user';
    else targetRole = 'superadmin';

    const updated = updateUserRole(user.email, targetRole);
    setUsers(updated);
    setAnalytics(getAdminAnalyticsSummary());
  };

  const handleStatusToggle = (user: UserProfile) => {
    const targetStatus = user.status === 'Suspended' ? 'Active' : 'Suspended';
    const updated = updateUserStatus(user.email, targetStatus);
    setUsers(updated);
    setAnalytics(getAdminAnalyticsSummary());
  };

  const handleDeleteUser = (email: string) => {
    if (window.confirm(`Are you sure you want to delete user ${email}?`)) {
      const updated = deleteUserAccount(email);
      setUsers(updated);
      setAnalytics(getAdminAnalyticsSummary());
    }
  };

  const handleAddCreditsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForCredits) return;
    const updated = adjustUserCredits(selectedUserForCredits.email, creditAmount);
    setUsers(updated);
    setAnalytics(getAdminAnalyticsSummary());
    setCreditActionSuccess(true);
    setTimeout(() => {
      setCreditActionSuccess(false);
      setSelectedUserForCredits(null);
    }, 1200);
  };

  // Filtered Users List
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '80px', maxWidth: '1200px' }}>
      {/* Admin Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 800 }}>
              🛡️ SYSTEM ADMINISTRATOR MODE
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>v2.4.0 Live Engine</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            Platform Admin Control Panel
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button 
            onClick={refreshData}
            className="btn-secondary" 
            style={{ padding: '9px 16px', fontSize: '13px', borderRadius: '10px' }}
          >
            <RefreshCw size={15} /> Sync Live Data
          </button>
          <button 
            onClick={() => onNavigate('dashboard')}
            className="btn-primary" 
            style={{ padding: '9px 18px', fontSize: '13px', borderRadius: '10px' }}
          >
            Go to User Workspace →
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-color)', marginBottom: '32px', overflowX: 'auto' }}>
        {[
          { id: 'analytics', label: 'Analytics & Overview', icon: BarChart2 },
          { id: 'users', label: `User Directory (${users.length})`, icon: Users },
          { id: 'logs', label: 'System Audit Logs', icon: Activity },
          { id: 'health', label: 'System Health', icon: Shield }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: isActive ? 800 : 600,
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                borderBottom: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={17} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: ANALYTICS OVERVIEW */}
      {activeTab === 'analytics' && analytics && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Top KPI Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>TOTAL USERS</span>
                <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.12)', color: 'var(--primary)' }}>
                  <Users size={20} />
                </div>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {analytics.totalUsers}
              </div>
              <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} /> +18.4% this month
              </div>
            </div>

            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>TOTAL PRDS COMPILED</span>
                <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', color: '#10B981' }}>
                  <FileText size={20} />
                </div>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {analytics.totalPrdsGenerated}
              </div>
              <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} /> +34 PRDs today
              </div>
            </div>

            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>AI CREDITS CONSUMED</span>
                <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.12)', color: '#F59E0B' }}>
                  <Zap size={20} />
                </div>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {analytics.totalCreditsConsumed.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                Across all active models
              </div>
            </div>

            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>ESTIMATED REVENUE</span>
                <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.12)', color: '#EC4899' }}>
                  <DollarSign size={20} />
                </div>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                ₹{analytics.totalRevenueINR.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TrendingUp size={14} /> +22% MRR Growth
              </div>
            </div>
          </div>

          {/* Activity Trends Bar Visualization */}
          <div className="glass-card" style={{ padding: '32px', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Daily Activity & Credit Usage Trends</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>System-wide PRD compilation and AI credit demand for past 7 days.</p>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-light)', padding: '4px 12px', borderRadius: '10px' }}>
                7-Day Window
              </span>
            </div>

            {/* Custom CSS Bar Chart */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '16px', alignItems: 'end', height: '180px', paddingTop: '20px' }}>
              {analytics.dailyTrends.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)' }}>{item.prds} PRDs</div>
                  <div 
                    style={{ 
                      width: '100%', 
                      maxWidth: '44px',
                      height: `${(item.prds / 80) * 100}%`, 
                      background: 'var(--primary-gradient)', 
                      borderRadius: '8px 8px 4px 4px',
                      boxShadow: '0 4px 12px rgba(91, 75, 255, 0.25)',
                      transition: 'height 0.3s ease'
                    }} 
                    title={`${item.prds} PRDs, ${item.credits} Credits`}
                  />
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>{item.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Breakdown Grid: Plan Distribution & Tech Stack Popularity */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            
            {/* Plan Distribution */}
            <div className="glass-card" style={{ padding: '28px', borderRadius: '24px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px' }}>
                Subscription Plan Tier Breakdown
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {analytics.planDistribution.map((item, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      <span>{item.plan} Tier</span>
                      <span>{item.count} Users ({item.percentage}%)</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          width: `${Math.max(item.percentage, 8)}%`, 
                          height: '100%', 
                          background: item.plan === 'Pro' ? 'var(--primary)' : item.plan === 'Ultimate' ? '#EC4899' : item.plan === 'Starter' ? '#0284C7' : '#94A3B8',
                          borderRadius: '4px'
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tech Stacks */}
            <div className="glass-card" style={{ padding: '28px', borderRadius: '24px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px' }}>
                Most Requested Architecture Stacks
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {analytics.topTechStacks.map((stack, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '12px', background: 'var(--bg-main)', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{stack.name}</div>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary)', background: 'var(--primary-light)', padding: '2px 10px', borderRadius: '10px' }}>
                      {stack.count} PRDs ({stack.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: USER DIRECTORY & MANAGEMENT */}
      {activeTab === 'users' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Controls Bar */}
          <div className="glass-card" style={{ padding: '20px', borderRadius: '20px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
            
            {/* Search Box */}
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <Search size={17} style={{ position: 'absolute', left: '14px', top: '13px', color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search user by name or email address..."
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 42px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-primary)',
                  fontSize: '13px'
                }}
              />
            </div>

            {/* Role & Status Filters */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <select
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value as any)}
                style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600 }}
              >
                <option value="all">All Roles</option>
                <option value="user">User Role</option>
                <option value="admin">Admin Role</option>
              </select>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as any)}
                style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600 }}
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active Accounts</option>
                <option value="Suspended">Suspended Accounts</option>
              </select>
            </div>
          </div>

          {/* User Accounts Directory Table */}
          <div className="glass-card" style={{ padding: '0', borderRadius: '24px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>
                    <th style={{ padding: '16px 20px' }}>User Account</th>
                    <th style={{ padding: '16px 20px' }}>Role</th>
                    <th style={{ padding: '16px 20px' }}>Plan</th>
                    <th style={{ padding: '16px 20px' }}>AI Credits</th>
                    <th style={{ padding: '16px 20px' }}>Status</th>
                    <th style={{ padding: '16px 20px' }}>Joined Date</th>
                    <th style={{ padding: '16px 20px', textAlign: 'right' }}>Admin Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.email} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      
                      {/* Name & Email */}
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: u.role === 'admin' ? 'var(--primary)' : 'var(--bg-card-hover)', color: u.role === 'admin' ? 'white' : 'var(--text-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {u.avatarLetter}
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{u.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{u.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td style={{ padding: '16px 20px' }}>
                        <button
                          onClick={() => handleRoleToggle(u)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: 800,
                            border: 'none',
                            cursor: 'pointer',
                            background: u.role === 'admin' ? 'var(--primary-light)' : 'var(--bg-main)',
                            color: u.role === 'admin' ? 'var(--primary)' : 'var(--text-muted)'
                          }}
                          title="Click to toggle User / Admin role"
                        >
                          {u.role === 'admin' ? '🛡️ ADMIN' : '👤 USER'}
                        </button>
                      </td>

                      {/* Plan */}
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{u.plan} Tier</span>
                      </td>

                      {/* Credits */}
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 800, color: u.creditsRemaining < 50 ? '#EF4444' : 'var(--text-primary)' }}>
                            ⚡ {u.creditsRemaining} Cr
                          </span>
                          <button
                            onClick={() => setSelectedUserForCredits(u)}
                            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            title="Grant extra credits"
                          >
                            <PlusCircle size={15} />
                          </button>
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          fontWeight: 800,
                          background: u.status === 'Suspended' ? '#FEF2F2' : '#D1FAE5',
                          color: u.status === 'Suspended' ? '#DC2626' : '#065F46'
                        }}>
                          ● {u.status || 'Active'}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td style={{ padding: '16px 20px', color: 'var(--text-muted)' }}>
                        {u.joinedDate}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <button
                            onClick={() => handleStatusToggle(u)}
                            className="btn-secondary"
                            style={{ padding: '6px 10px', fontSize: '11px', borderRadius: '8px' }}
                            title={u.status === 'Suspended' ? 'Activate Account' : 'Suspend Account'}
                          >
                            {u.status === 'Suspended' ? <UserCheck size={14} color="#10B981" /> : <UserX size={14} color="#EF4444" />}
                          </button>

                          <button
                            onClick={() => handleDeleteUser(u.email)}
                            className="btn-secondary"
                            style={{ padding: '6px 10px', fontSize: '11px', borderRadius: '8px', color: '#EF4444' }}
                            title="Delete User Account"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SYSTEM AUDIT LOGS */}
      {activeTab === 'logs' && analytics && (
        <div className="glass-card" style={{ padding: '32px', borderRadius: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity size={20} color="var(--primary)" /> Real-Time System Event Stream
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {analytics.recentSystemLogs.map((log, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderRadius: '14px', background: 'var(--bg-main)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 800,
                    background: log.type === 'PRD_GENERATED' ? 'rgba(99, 102, 241, 0.15)' : log.type === 'PLAN_UPGRADED' ? '#D1FAE5' : 'var(--bg-card)',
                    color: log.type === 'PRD_GENERATED' ? 'var(--primary)' : log.type === 'PLAN_UPGRADED' ? '#065F46' : 'var(--text-secondary)'
                  }}>
                    {log.type}
                  </span>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{log.description}</div>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{log.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SYSTEM HEALTH */}
      {activeTab === 'health' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '28px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={20} color="#10B981" /> AI Compiler Service Status
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              Structured AI PRD Compiler engine status (PHP Laravel backend + TypeScript engine).
            </p>
            <div style={{ background: '#D1FAE5', color: '#065F46', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              ● 100% Operational (Latency: 42ms)
            </div>
          </div>

          <div className="glass-card" style={{ padding: '28px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={20} color="#10B981" /> Database & Storage Cluster
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              MySQL relational schema engine (DB: aiprd) and Local Encrypted Storage.
            </p>
            <div style={{ background: '#D1FAE5', color: '#065F46', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              ● Healthy (Storage Used: 1.2 GB / 50 GB)
            </div>
          </div>
        </div>
      )}

      {/* Grant AI Credits Modal */}
      {selectedUserForCredits && (
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
          <div className="glass-card" style={{ width: '90%', maxWidth: '440px', padding: '32px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Grant AI Credits
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Add AI credits directly to <strong>{selectedUserForCredits.name}</strong> ({selectedUserForCredits.email}).
            </p>

            {creditActionSuccess ? (
              <div style={{ color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 800, padding: '16px' }}>
                <Check size={20} /> Credits Granted Successfully!
              </div>
            ) : (
              <form onSubmit={handleAddCreditsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Credit Amount to Add
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="5000"
                    value={creditAmount}
                    onChange={e => setCreditAmount(parseInt(e.target.value) || 0)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-main)',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      fontWeight: 700
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button className="btn-secondary" type="button" onClick={() => setSelectedUserForCredits(null)}>
                    Cancel
                  </button>
                  <button className="btn-primary" type="submit">
                    Grant {creditAmount} Credits
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
