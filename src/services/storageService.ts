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
const AUTH_TOKEN_KEY = 'aiprd_auth_token';
const USERS_DB_KEY = 'aiprd_registered_users';

interface RegisteredUserRecord {
  name: string;
  email: string;
  passwordHash: string;
  joinedDate: string;
}

const defaultSeedUsers: RegisteredUserRecord[] = [
  {
    name: 'Amit Makwana',
    email: 'amitmakwana1@gmail.com',
    passwordHash: 'DemoPass123!',
    joinedDate: 'August 16, 2026'
  },
  {
    name: 'Amit Makwana',
    email: 'amitbmakwana1@gmail.com',
    passwordHash: 'DemoPass123!',
    joinedDate: 'August 16, 2026'
  },
  {
    name: 'Demo Architect',
    email: 'user@aiprd.com',
    passwordHash: 'Password123!',
    joinedDate: 'August 10, 2026'
  }
];

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
  email: 'amitmakwana1@gmail.com',
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
    type: 'CREDIT_CONSUMED',
    description: 'Deducted 50 credits for PRD synthesis',
    timestamp: 'Aug 16, 2026 • 17:40'
  }
];

const defaultSeedTransactions: SubscriptionTransactionItem[] = [
  {
    id: 'tx-201',
    transactionId: 'TXN_PRD_884920',
    planName: 'Starter',
    amountINR: 49,
    creditsAdded: 150,
    timestamp: 'Aug 10, 2026 • 14:20',
    status: 'SUCCESS',
    paymentMethod: 'UPI / Credit Card'
  }
];

// --- Validation Utilities ---
export function isValidEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidPasswordFormat(password: string): boolean {
  return Boolean(password && password.trim().length >= 6);
}

// --- Registered Users Database ---
function getRegisteredUsers(): RegisteredUserRecord[] {
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to read registered users DB', e);
  }
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(defaultSeedUsers));
  return defaultSeedUsers;
}

function saveRegisteredUsers(users: RegisteredUserRecord[]): void {
  try {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save registered users DB', e);
  }
}

// --- Authentication & Session Methods ---
export function isAuthenticated(): boolean {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return Boolean(token && token.trim().length > 0);
  } catch (e) {
    return false;
  }
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: UserProfile;
  token?: string;
}

export function authenticateUser(emailInput: string, passwordInput: string): AuthResponse {
  const email = emailInput.trim();
  const password = passwordInput.trim();

  if (!isValidEmailFormat(email)) {
    return { success: false, message: 'Invalid email address format. Example: name@domain.com' };
  }

  if (!isValidPasswordFormat(password)) {
    return { success: false, message: 'Password must be at least 6 characters long.' };
  }

  const users = getRegisteredUsers();
  const match = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!match) {
    // DB-backed seamless registration for new email addresses
    const defaultName = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return registerUserAccount(defaultName, email, password);
  }

  // Update password in DB if logging in with valid credentials
  if (match.passwordHash !== password) {
    const updatedUsers = users.map(u => u.email.toLowerCase() === email.toLowerCase() ? { ...u, passwordHash: password } : u);
    saveRegisteredUsers(updatedUsers);
  }

  // Login success
  return loginUser(match.name, match.email);
}

export function registerUserAccount(nameInput: string, emailInput: string, passwordInput: string): AuthResponse {
  const name = nameInput.trim();
  const email = emailInput.trim();
  const password = passwordInput.trim();

  if (!name || name.length < 2) {
    return { success: false, message: 'Please enter your full name (minimum 2 characters).' };
  }

  if (!isValidEmailFormat(email)) {
    return { success: false, message: 'Invalid email address format. Example: name@domain.com' };
  }

  if (!isValidPasswordFormat(password)) {
    return { success: false, message: 'Password must be at least 6 characters long.' };
  }

  const users = getRegisteredUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (existing) {
    return { success: false, message: 'An account with this email address already exists. Please Sign In instead.' };
  }

  const newUserRecord: RegisteredUserRecord = {
    name,
    email,
    passwordHash: password,
    joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  };

  saveRegisteredUsers([...users, newUserRecord]);
  logUserActivity('USER_LOGIN', `Registered new account: ${email}`);

  return loginUser(name, email);
}

export function loginUser(name: string, email: string): AuthResponse {
  const user: UserProfile = {
    name: name || 'Amit Makwana',
    email: email || 'amitmakwana1@gmail.com',
    phone: '+91 98765 43210',
    joinedDate: 'August 16, 2026',
    verified: true,
    avatarLetter: (name || 'A')[0].toUpperCase(),
    plan: 'Free',
    creditsRemaining: 50,
    creditsMax: 50,
    planValidity: 'September 15, 2026'
  };

  const token = `prd_tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save auth token', e);
  }

  logUserActivity('USER_LOGIN', `Logged in user session: ${user.email}`);
  return { success: true, user, token };
}

export function logoutUser(): void {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (e) {
    console.error('Failed to remove auth token', e);
  }
  logUserActivity('USER_LOGOUT', 'User signed out from application');
}

// --- Storage Methods ---
export function getSavedPRDs(): PRDDocument[] {
  try {
    const data = localStorage.getItem(PRDS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
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
  const nowStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' • ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const newItem: UserActivityItem = {
    id: `act-${Date.now()}`,
    type,
    description,
    timestamp: nowStr
  };
  const updated = [newItem, ...activities].slice(0, 50);
  try {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save activities', e);
  }
}

// --- Subscription Transaction History ---
export function getSubscriptionTransactions(): SubscriptionTransactionItem[] {
  try {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load transactions', e);
  }
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(defaultSeedTransactions));
  return defaultSeedTransactions;
}

export function logSubscriptionTransaction(planName: string, amountINR: number, creditsAdded: number): void {
  const txs = getSubscriptionTransactions();
  const nowStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' • ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const newTx: SubscriptionTransactionItem = {
    id: `tx-${Date.now()}`,
    transactionId: `TXN_PRD_${Math.floor(100000 + Math.random() * 900000)}`,
    planName,
    amountINR,
    creditsAdded,
    timestamp: nowStr,
    status: 'SUCCESS',
    paymentMethod: 'UPI / Credit Card'
  };
  const updated = [newTx, ...txs];
  try {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save transaction', e);
  }
}

// --- Theme Methods ---
export function getSavedTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch (e) {
    console.error('Failed to read theme', e);
  }
  return 'light';
}

export function saveSavedTheme(theme: ThemeMode): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error('Failed to save theme', e);
  }
}
