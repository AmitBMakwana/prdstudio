import { 
  PRDDocument, UserProfile, ThemeMode, WizardState, 
  UserActivityItem, SubscriptionTransactionItem 
} from '../types/prd';
import { generatePRDDocument } from './aiEngine';

const PRDS_KEY = 'aiprd_prds';
const USER_KEY = 'aiprd_user_profile';
const THEME_KEY = 'aiprd_theme_mode';
const ACTIVITIES_KEY = 'aiprd_activities';
const TRANSACTIONS_KEY = 'aiprd_transactions';

const defaultDemoState: WizardState = {
  step: 6,
  platform: 'webapp',
  techStack: {
    frontend: 'Next.js',
    backend: 'Laravel',
    database: 'MySQL/SQL'
  },
  style: 'Flat',
  colorType: 'solid',
  selectedSolidColor: 'Tailwind Blue',
  selectedGradient: 'Sunset',
  customColors: {
    primary: '#4F46E5',
    secondary: '#EC4899',
    accent: '#4F46E5',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#0F172A'
  },
  themeMode: 'light',
  font: 'Lexend',
  projectType: 'E-commerce',
  projectDescription: 'Online store with product listings, cart, checkout, payment integration, user accounts, order tracking, and admin dashboard.'
};

const defaultUserProfile: UserProfile = {
  name: 'Amit Makwana',
  email: 'amit.makwana@aiprd.com',
  phone: '+91 98765 43210',
  joinedDate: 'August 10, 2026',
  verified: true,
  avatarLetter: 'A',
  plan: 'Free',
  creditsRemaining: 50,
  creditsMax: 50,
  planValidity: 'September 15, 2026'
};

const defaultSeedActivities: UserActivityItem[] = [
  {
    id: 'act-101',
    type: 'PRD_GENERATED',
    description: 'Synthesized PRD Canvas Spec: "Online store with product listings"',
    timestamp: 'Aug 16, 2026 • 17:42'
  },
  {
    id: 'act-100',
    type: 'PROFILE_UPDATED',
    description: 'Verified Google OAuth authentication profile',
    timestamp: 'Aug 10, 2026 • 10:15'
  }
];

const defaultSeedTransactions: SubscriptionTransactionItem[] = [
  {
    id: 'txn-101',
    transactionId: 'TXN-20260810-9182',
    planName: 'Free Welcome Tier',
    amountINR: 0,
    creditsAdded: 50,
    status: 'SUCCESS',
    paymentMethod: 'System Welcome Bonus',
    timestamp: 'Aug 10, 2026'
  }
];

// --- PRD Document Methods ---
export function getSavedPRDs(): PRDDocument[] {
  try {
    const data = localStorage.getItem(PRDS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].sections && Array.isArray(parsed[0].sections)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load PRDs from localStorage', e);
  }

  const demoPRD = generatePRDDocument(defaultDemoState);
  demoPRD.title = 'Online store with product';
  savePRDs([demoPRD]);
  return [demoPRD];
}

export function savePRDs(prds: PRDDocument[]): void {
  try {
    localStorage.setItem(PRDS_KEY, JSON.stringify(prds));
  } catch (e) {
    console.error('Failed to save PRDs to localStorage', e);
  }
}

export function savePRD(prd: PRDDocument): PRDDocument[] {
  const current = getSavedPRDs();
  const index = current.findIndex(p => p.id === prd.id);
  let updated: PRDDocument[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = prd;
  } else {
    updated = [prd, ...current];
    logUserActivity('PRD_GENERATED', `Synthesized PRD Canvas Spec: "${prd.title}"`);
  }
  savePRDs(updated);
  return updated;
}

export function deletePRD(id: string): PRDDocument[] {
  const current = getSavedPRDs();
  const target = current.find(p => p.id === id);
  const updated = current.filter(p => p.id !== id);
  savePRDs(updated);
  if (target) {
    logUserActivity('PRD_DELETED', `Deleted PRD Canvas Spec: "${target.title}"`);
  }
  return updated;
}

// --- User Profile Methods ---
export function getUserProfile(): UserProfile {
  try {
    const data = localStorage.getItem(USER_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load UserProfile from localStorage', e);
  }
  saveUserProfile(defaultUserProfile);
  return defaultUserProfile;
}

export function saveUserProfile(user: UserProfile): void {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save UserProfile to localStorage', e);
  }
}

export function consumeCredit(amount: number = 50): boolean {
  const user = getUserProfile();
  if (user.creditsRemaining < amount) {
    return false;
  }
  user.creditsRemaining -= amount;
  saveUserProfile(user);
  logUserActivity('CREDIT_CONSUMED', `Deducted ${amount} credits for PRD package synthesis (Remaining: ${user.creditsRemaining} Cr)`);
  return true;
}

export function addCredits(credits: number, planName: 'Free' | 'Starter' | 'Pro' | 'Ultimate'): UserProfile {
  const user = getUserProfile();
  user.creditsRemaining += credits;
  user.creditsMax += credits;
  user.plan = planName;
  saveUserProfile(user);

  let amountINR = 0;
  if (planName === 'Starter') amountINR = 49;
  if (planName === 'Pro') amountINR = 99;
  if (planName === 'Ultimate') amountINR = 149;

  logSubscriptionTransaction(planName, amountINR, credits);
  logUserActivity('PLAN_UPGRADED', `Subscribed to ${planName} Plan (+${credits} Credits Added)`);

  return user;
}

// --- User Activity & Audit Trail Methods ---
export function getUserActivities(): UserActivityItem[] {
  try {
    const data = localStorage.getItem(ACTIVITIES_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load Activities from localStorage', e);
  }
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(defaultSeedActivities));
  return defaultSeedActivities;
}

export function logUserActivity(type: UserActivityItem['type'], description: string): void {
  const activities = getUserActivities();
  const newActivity: UserActivityItem = {
    id: 'act-' + Date.now(),
    type,
    description,
    timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  };
  const updated = [newActivity, ...activities];
  try {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save UserActivity', e);
  }
}

// --- Subscription Transaction History Methods ---
export function getSubscriptionTransactions(): SubscriptionTransactionItem[] {
  try {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load Transactions from localStorage', e);
  }
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(defaultSeedTransactions));
  return defaultSeedTransactions;
}

export function logSubscriptionTransaction(planName: string, amountINR: number, creditsAdded: number): void {
  const transactions = getSubscriptionTransactions();
  const newTxn: SubscriptionTransactionItem = {
    id: 'txn-' + Date.now(),
    transactionId: 'TXN-' + new Date().getFullYear() + String(new Date().getMonth() + 1).padStart(2, '0') + String(new Date().getDate()).padStart(2, '0') + '-' + Math.floor(1000 + Math.random() * 9000),
    planName,
    amountINR,
    creditsAdded,
    status: 'SUCCESS',
    paymentMethod: 'Stripe / Simulated UPI',
    timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
  const updated = [newTxn, ...transactions];
  try {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save SubscriptionTransaction', e);
  }
}

// --- Theme Preference Methods ---
export function getSavedTheme(): ThemeMode {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    if (theme === 'dark' || theme === 'light' || theme === 'system') {
      return theme;
    }
  } catch (e) {
    console.error('Failed to load theme from localStorage', e);
  }
  return 'light';
}

export function saveSavedTheme(theme: ThemeMode): void {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    console.error('Failed to save theme to localStorage', e);
  }
}
