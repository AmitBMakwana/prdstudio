import React, { useState } from 'react';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import { PlanTier, UserProfile } from '../types/prd';

interface UpgradePageProps {
  user: UserProfile;
  onUpgrade: (credits: number, planName: 'Free' | 'Starter' | 'Pro' | 'Ultimate') => void;
  onNavigate: (page: string) => void;
}

export const UpgradePage: React.FC<UpgradePageProps> = ({ user, onUpgrade, onNavigate }) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanTier | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const plans: PlanTier[] = [
    {
      id: 'free',
      name: 'Free',
      priceINR: 0,
      credits: 50,
      validityDays: 30,
      features: ['50 credits', '1 PRD / 30 days', 'All platforms', 'All tech stacks', 'Markdown + PDF export']
    },
    {
      id: 'starter',
      name: 'Starter',
      priceINR: 49,
      credits: 150,
      validityDays: 30,
      features: ['150 credits', '6 PRDs / 30 days', 'All platforms', 'All tech stacks', 'Markdown + PDF export']
    },
    {
      id: 'pro',
      name: 'Pro',
      priceINR: 99,
      credits: 500,
      validityDays: 30,
      isPopular: true,
      features: ['500 credits', '20 PRDs / 30 days', 'All platforms', 'All tech stacks', 'Markdown + PDF export']
    },
    {
      id: 'ultimate',
      name: 'Ultimate',
      priceINR: 149,
      credits: 1500,
      validityDays: 30,
      features: ['1500 credits', '50 PRDs / 30 days', 'All platforms', 'All tech stacks', 'Markdown + PDF export']
    }
  ];

  const handlePay = () => {
    if (!selectedPlan) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      onUpgrade(selectedPlan.credits, selectedPlan.name as any);
      setTimeout(() => {
        setSuccess(false);
        setSelectedPlan(null);
        onNavigate('dashboard');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
        <span className="credit-pill" style={{ marginBottom: '16px' }}>UPGRADE PLAN</span>
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
          Choose your plan
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
          Unlock instant high-speed PRD generation, extended credit limits, and priority AI compiler synthesis.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '60px' }}>
        {plans.map(p => (
          <div 
            key={p.id}
            className="card"
            style={{
              position: 'relative',
              borderRadius: '24px',
              border: p.isPopular ? '2px solid var(--primary)' : '1px solid var(--border-color)',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {p.isPopular && (
              <span style={{ 
                position: 'absolute', 
                top: '-12px', 
                right: '24px', 
                background: 'var(--primary)', 
                color: 'white', 
                fontSize: '11px', 
                fontWeight: 700, 
                padding: '4px 12px', 
                borderRadius: '12px', 
                textTransform: 'uppercase' 
              }}>
                Most Popular
              </span>
            )}

            <div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>{p.name}</h3>
              <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                ₹{p.priceINR} <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)' }}>/ month</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                {p.credits / 50} PRDs / 30 days
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
                {p.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={16} color="var(--primary)" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={p.isPopular ? 'btn-primary' : 'btn-secondary'}
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              onClick={() => setSelectedPlan(p)}
            >
              {user.plan === p.name ? 'Current Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Gateway Modal */}
      {selectedPlan && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ width: '90%', maxWidth: '440px', padding: '32px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
              Complete Payment – {selectedPlan.name} Plan
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Amount Due: <strong>₹{selectedPlan.priceINR} INR</strong> (1500 credits instant deposit)
            </p>

            {success ? (
              <div style={{ textAlign: 'center', padding: '20px 0', color: '#16A34A' }}>
                <CheckCircle2 size={48} style={{ margin: '0 auto 12px auto' }} />
                <h4 style={{ fontSize: '18px', fontWeight: 800 }}>Payment Successful!</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Added {selectedPlan.credits} credits to your account.</p>
              </div>
            ) : (
              <div>
                <div style={{ background: 'var(--bg-main)', padding: '16px', borderRadius: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CreditCard size={24} color="var(--primary)" />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>Simulated Stripe / Razorpay Checkout</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>256-Bit SSL Encrypted Transaction</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setSelectedPlan(null)}>
                    Cancel
                  </button>
                  <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handlePay} disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : `Pay ₹${selectedPlan.priceINR}`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
