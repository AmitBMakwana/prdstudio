import React, { useState } from 'react';
import { 
  User, ShieldCheck, Mail, Phone, Calendar, Sparkles, CreditCard, Clock, Activity, CheckCircle, ArrowRight 
} from 'lucide-react';
import { UserProfile } from '../types/prd';
import { getUserActivities, getSubscriptionTransactions } from '../services/storageService';

interface AccountPageProps {
  user: UserProfile;
  onNavigate: (page: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ user, onNavigate }) => {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'audit' | 'transactions'>('profile');
  const activities = getUserActivities();
  const transactions = getSubscriptionTransactions();

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
      {/* Centered Hero Header */}
      <div style={{ textAlign: 'center', padding: '20px 20px 30px 20px' }}>
        <h1 className="canvas-title">
          Account & <span className="canvas-title-gradient">Audit Center</span>
        </h1>
        <p className="canvas-subtitle" style={{ maxWidth: '600px', margin: '8px auto 0 auto' }}>
          "Manage your profile credentials, inspect activity audit logs, and view your subscription transaction history."
        </p>
      </div>

      {/* Sub-Tabs Bar */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
        <button
          onClick={() => setActiveSubTab('profile')}
          className={activeSubTab === 'profile' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '10px 20px', borderRadius: '20px' }}
        >
          <User size={16} /> User Profile
        </button>
        <button
          onClick={() => setActiveSubTab('audit')}
          className={activeSubTab === 'audit' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '10px 20px', borderRadius: '20px' }}
        >
          <Activity size={16} /> User Activity Audit ({activities.length})
        </button>
        <button
          onClick={() => setActiveSubTab('transactions')}
          className={activeSubTab === 'transactions' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '10px 20px', borderRadius: '20px' }}
        >
          <CreditCard size={16} /> Subscription Transactions ({transactions.length})
        </button>
      </div>

      {/* SUB-TAB 1: Profile */}
      {activeSubTab === 'profile' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          <div className="canvas-card" style={{ padding: '32px', cursor: 'default' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary)', color: 'white', fontWeight: 800, fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {user.avatarLetter}
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>{user.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#10B981', fontWeight: 600 }}>
                  <ShieldCheck size={16} /> Google OAuth Verified
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '20px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>FULL NAME</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>EMAIL ADDRESS</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{user.email}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>PHONE NUMBER</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{user.phone}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>JOINED DATE</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{user.joinedDate}</div>
              </div>
            </div>
          </div>

          <div className="canvas-card" style={{ padding: '32px', cursor: 'default' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px' }}>Plan & Credit Balance</h3>
            
            <div style={{ background: 'var(--bg-main)', padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>CURRENT PLAN</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>{user.plan} Tier</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Valid until {user.planValidity}</div>
            </div>

            <div style={{ background: 'var(--bg-main)', padding: '20px', borderRadius: '16px', marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>CREDITS AVAILABLE</div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)' }}>{user.creditsRemaining} <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)' }}>Cr</span></div>
            </div>

            <button className="btn-primary" onClick={() => onNavigate('upgrade')} style={{ width: '100%', justifyContent: 'center' }}>
              Upgrade Subscription Plan
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: User Activity Audit Trail */}
      {activeSubTab === 'audit' && (
        <div className="canvas-card" style={{ padding: '32px', cursor: 'default' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px' }}>
            User Activity & Audit Trail ({activities.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activities.map(act => (
              <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px', background: 'var(--bg-main)', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Activity size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>{act.description}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Event Type: <strong>{act.type}</strong> • {act.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Subscription Transactions History */}
      {activeSubTab === 'transactions' && (
        <div className="canvas-card" style={{ padding: '32px', cursor: 'default', overflowX: 'auto' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px' }}>
            Upgrade Plan Transaction History ({transactions.length})
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Transaction ID</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Plan Tier</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Amount (INR)</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Credits Added</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Payment Status</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(txn => (
                <tr key={txn.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--text-primary)' }}>{txn.transactionId}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--text-primary)' }}>{txn.planName}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>₹{txn.amountINR}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--primary)' }}>+{txn.creditsAdded} Cr</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: '#D1FAE5', color: '#065F46', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>
                      ✓ {txn.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>{txn.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
