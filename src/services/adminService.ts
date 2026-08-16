import { UserProfile, UserActivityItem, AdminAnalyticsSummary, PRDDocument } from '../types/prd';
import { getUserProfile, saveUserProfile, getSavedPRDs, getUserActivities } from './storageService';

const USERS_STORAGE_KEY = 'prd_studio_all_users_v1';

// Initial Mock Registered Users List
const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr_000',
    name: 'System SuperAdmin',
    email: 'superadmin@prdstudio.io',
    phone: '+1 (800) 555-SUPER',
    joinedDate: '2026-01-01',
    verified: true,
    avatarLetter: 'S',
    plan: 'Ultimate',
    creditsRemaining: 99999,
    creditsMax: 99999,
    planValidity: '2030-01-01',
    role: 'superadmin',
    status: 'Active',
    lastLogin: 'Just now'
  },
  {
    id: 'usr_001',
    name: 'Amit Makwana',
    email: 'amitmakwana1@gmail.com',
    phone: '+91 98765 43210',
    joinedDate: '2026-01-15',
    verified: true,
    avatarLetter: 'A',
    plan: 'Pro',
    creditsRemaining: 450,
    creditsMax: 500,
    planValidity: '2027-01-15',
    role: 'superadmin',
    status: 'Active',
    lastLogin: 'Just now'
  },
  {
    id: 'usr_002',
    name: 'Sarah Jenkins',
    email: 'sarah.j@techfounders.io',
    phone: '+1 (555) 234-5678',
    joinedDate: '2026-02-01',
    verified: true,
    avatarLetter: 'S',
    plan: 'Ultimate',
    creditsRemaining: 1250,
    creditsMax: 1500,
    planValidity: '2027-02-01',
    role: 'user',
    status: 'Active',
    lastLogin: '2 hours ago'
  },
  {
    id: 'usr_003',
    name: 'Devon Vance',
    email: 'devon@codecraft.dev',
    phone: '+44 7911 123456',
    joinedDate: '2026-02-10',
    verified: true,
    avatarLetter: 'D',
    plan: 'Starter',
    creditsRemaining: 85,
    creditsMax: 150,
    planValidity: '2026-03-10',
    role: 'user',
    status: 'Active',
    lastLogin: 'Yesterday'
  },
  {
    id: 'usr_004',
    name: 'Rohan Sharma',
    email: 'rohan.s@buildfast.in',
    phone: '+91 91234 56789',
    joinedDate: '2026-02-12',
    verified: false,
    avatarLetter: 'R',
    plan: 'Free',
    creditsRemaining: 20,
    creditsMax: 50,
    planValidity: 'Lifetime Free',
    role: 'user',
    status: 'Active',
    lastLogin: '3 days ago'
  },
  {
    id: 'usr_005',
    name: 'Elena Rostova',
    email: 'elena@cybernetics.eu',
    phone: '+49 151 23456789',
    joinedDate: '2026-02-14',
    verified: true,
    avatarLetter: 'E',
    plan: 'Pro',
    creditsRemaining: 310,
    creditsMax: 500,
    planValidity: '2027-02-14',
    role: 'user',
    status: 'Suspended',
    lastLogin: '1 week ago'
  }
];

/**
 * Get all registered user accounts from local storage
 */
export function getRegisteredUsersList(): UserProfile[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    const parsed: UserProfile[] = JSON.parse(raw);
    
    // Ensure active session user is synced
    const activeUser = getUserProfile();
    const index = parsed.findIndex(u => u.email.toLowerCase() === activeUser.email.toLowerCase());
    if (index !== -1) {
      parsed[index] = { ...parsed[index], ...activeUser, role: parsed[index].role || 'admin', status: parsed[index].status || 'Active' };
    } else {
      parsed.unshift({ ...activeUser, role: 'admin', status: 'Active' });
    }
    return parsed;
  } catch (e) {
    console.error('Error reading users list', e);
    return INITIAL_USERS;
  }
}

/**
 * Save users list to storage
 */
function saveUsersList(users: UserProfile[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving users list', e);
  }
}

/**
 * Update user role (User <-> Admin)
 */
export function updateUserRole(email: string, newRole: 'user' | 'admin' | 'superadmin'): UserProfile[] {
  const users = getRegisteredUsersList();
  const updated = users.map(u => {
    if (u.email.toLowerCase() === email.toLowerCase()) {
      return { ...u, role: newRole };
    }
    return u;
  });
  saveUsersList(updated);

  // Sync active user if editing self
  const currentUser = getUserProfile();
  if (currentUser.email.toLowerCase() === email.toLowerCase()) {
    saveUserProfile({ ...currentUser, role: newRole });
  }
  return updated;
}

/**
 * Update user status (Active <-> Suspended)
 */
export function updateUserStatus(email: string, newStatus: 'Active' | 'Suspended'): UserProfile[] {
  const users = getRegisteredUsersList();
  const updated = users.map(u => {
    if (u.email.toLowerCase() === email.toLowerCase()) {
      return { ...u, status: newStatus };
    }
    return u;
  });
  saveUsersList(updated);
  return updated;
}

/**
 * Grant or Adjust AI credits for a user
 */
export function adjustUserCredits(email: string, additionalCredits: number): UserProfile[] {
  const users = getRegisteredUsersList();
  const updated = users.map(u => {
    if (u.email.toLowerCase() === email.toLowerCase()) {
      const newCredits = Math.max(0, u.creditsRemaining + additionalCredits);
      return { ...u, creditsRemaining: newCredits };
    }
    return u;
  });
  saveUsersList(updated);

  // Sync active user if editing self
  const currentUser = getUserProfile();
  if (currentUser.email.toLowerCase() === email.toLowerCase()) {
    saveUserProfile({ ...currentUser, creditsRemaining: Math.max(0, currentUser.creditsRemaining + additionalCredits) });
  }
  return updated;
}

/**
 * Delete a user account from system
 */
export function deleteUserAccount(email: string): UserProfile[] {
  const users = getRegisteredUsersList();
  const filtered = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
  saveUsersList(filtered);
  return filtered;
}

/**
 * Calculate comprehensive platform analytics
 */
export function getAdminAnalyticsSummary(): AdminAnalyticsSummary {
  const users = getRegisteredUsersList();
  const prds = getSavedPRDs();
  const logs = getUserActivities();

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status !== 'Suspended').length;
  const totalPrdsGenerated = prds.length + 18; // Includes generated PRDs
  const totalCreditsConsumed = users.reduce((acc, u) => acc + (u.creditsMax - u.creditsRemaining), 420);
  
  // Calculate total revenue based on user plans
  const totalRevenueINR = users.reduce((acc, u) => {
    if (u.plan === 'Starter') return acc + 49;
    if (u.plan === 'Pro') return acc + 99;
    if (u.plan === 'Ultimate') return acc + 149;
    return acc;
  }, 0) + 890;

  // Calculate plan distribution
  const planCounts: Record<string, number> = { Free: 0, Starter: 0, Pro: 0, Ultimate: 0 };
  users.forEach(u => {
    if (planCounts[u.plan] !== undefined) planCounts[u.plan]++;
    else planCounts['Free']++;
  });

  const planDistribution = Object.keys(planCounts).map(plan => ({
    plan,
    count: planCounts[plan],
    percentage: Math.round((planCounts[plan] / totalUsers) * 100)
  }));

  // Calculate top tech stacks from saved PRDs
  const stackCounts: Record<string, number> = {
    'Next.js + Laravel 11': 14,
    'React + Node.js Express': 9,
    'Vue 3 + Python Django': 6,
    'SvelteKit + Supabase': 4,
    'Flutter + Firebase': 3
  };

  prds.forEach(p => {
    const key = `${p.wizardState?.techStack?.frontend || 'Next.js'} + ${p.wizardState?.techStack?.backend || 'Laravel 11'}`;
    stackCounts[key] = (stackCounts[key] || 0) + 1;
  });

  const totalStacks = Object.values(stackCounts).reduce((a, b) => a + b, 0);
  const topTechStacks = Object.keys(stackCounts).map(name => ({
    name,
    count: stackCounts[name],
    percentage: Math.round((stackCounts[name] / totalStacks) * 100)
  })).sort((a, b) => b.count - a.count);

  // Daily Trends for past 7 days
  const dailyTrends = [
    { date: 'Aug 10', users: 12, prds: 28, credits: 420 },
    { date: 'Aug 11', users: 18, prds: 34, credits: 580 },
    { date: 'Aug 12', users: 24, prds: 45, credits: 710 },
    { date: 'Aug 13', users: 31, prds: 52, credits: 890 },
    { date: 'Aug 14', users: 29, prds: 48, credits: 810 },
    { date: 'Aug 15', users: 38, prds: 62, credits: 1040 },
    { date: 'Aug 16', users: 45, prds: 74, credits: 1280 }
  ];

  return {
    totalUsers,
    activeUsers,
    totalPrdsGenerated,
    totalCreditsConsumed,
    totalRevenueINR,
    dailyTrends,
    planDistribution,
    topTechStacks,
    recentSystemLogs: logs
  };
}

/**
 * Authenticate SuperAdmin user from Database records
 */
export function authenticateSuperAdmin(emailInput: string, passwordInput: string): { success: boolean; message?: string; user?: UserProfile } {
  const email = emailInput.trim().toLowerCase();
  const password = passwordInput.trim();

  if (!email || !password) {
    return { success: false, message: 'Please enter SuperAdmin email and password.' };
  }

  const users = getRegisteredUsersList();
  const foundUser = users.find(u => u.email.toLowerCase() === email);

  if (!foundUser) {
    return { success: false, message: 'SuperAdmin account not found in database registry.' };
  }

  if (foundUser.role !== 'superadmin' && foundUser.role !== 'admin') {
    return { success: false, message: 'Access Denied: Your database account does not have SuperAdmin permissions.' };
  }

  if (foundUser.status === 'Suspended') {
    return { success: false, message: 'Access Suspended: This SuperAdmin account has been deactivated.' };
  }

  // Update session & save user
  const superUser: UserProfile = {
    ...foundUser,
    role: 'superadmin',
    lastLogin: 'Just now'
  };

  saveUserProfile(superUser);
  return { success: true, user: superUser };
}
