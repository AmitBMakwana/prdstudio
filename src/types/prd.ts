export type PlatformId = 'webapp' | 'mobileapp' | 'desktopapp' | 'custom';

export interface TechStackSelection {
  frontend: string;
  backend: string;
  database: string;
}

export type StylePresetId = 
  | 'Minimal'
  | 'Gradient'
  | 'Glassmorphism'
  | 'Neumorphism'
  | 'Corporate'
  | 'Playful'
  | 'Dark-Tech'
  | 'Retro'
  | 'Brutalist'
  | 'Material'
  | 'Flat'
  | 'Custom';

export type ColorPresetType = 'solid' | 'gradient' | 'custom';

export interface SolidColorPreset {
  id: string;
  name: string;
  hex: string;
  bgHex: string;
}

export interface GradientColorPreset {
  id: string;
  name: string;
  from: string;
  to: string;
}

export interface CustomColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface FontOption {
  id: string;
  name: string;
  category: string;
  family: string;
}

export interface QuickStartTemplate {
  id: string;
  title: string;
  description: string;
  type: string;
  platform: PlatformId;
  defaultStack: TechStackSelection;
  defaultStyle: StylePresetId;
}

export interface WizardState {
  step: number;
  platform: PlatformId;
  techStack: TechStackSelection;
  customTechStack?: {
    frontend?: string;
    backend?: string;
    database?: string;
  };
  style: StylePresetId;
  customStyle?: string;
  colorType: ColorPresetType;
  selectedSolidColor: string;
  selectedGradient: string;
  customColors: CustomColors;
  themeMode: ThemeMode;
  font: string;
  projectName?: string;
  projectType: string;
  projectDescription: string;
  guidingNotes?: string;
}

export interface PRDSection {
  id: string;
  title: string;
  iconName: string;
  content: string;
}

export interface PRDDocument {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  wizardState: WizardState;
  platformName: string;
  techTags: string[];
  sections: PRDSection[];
  masterPrompt: string;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  verified: boolean;
  avatarLetter: string;
  plan: 'Free' | 'Starter' | 'Pro' | 'Ultimate';
  creditsRemaining: number;
  creditsMax: number;
  planValidity: string;
  role?: 'user' | 'admin';
  status?: 'Active' | 'Suspended';
  lastLogin?: string;
}

export interface UserActivityItem {
  id: string;
  type: 'PRD_GENERATED' | 'PLAN_UPGRADED' | 'CREDIT_CONSUMED' | 'PROFILE_UPDATED' | 'PRD_DELETED' | 'USER_LOGIN' | 'USER_LOGOUT' | 'ADMIN_ACTION';
  description: string;
  timestamp: string;
  userEmail?: string;
}

export interface SubscriptionTransactionItem {
  id: string;
  transactionId: string;
  planName: string;
  amountINR: number;
  creditsAdded: number;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  paymentMethod: string;
  timestamp: string;
}

export interface PlanTier {
  id: string;
  name: string;
  priceINR: number;
  credits: number;
  validityDays: number;
  features: string[];
  isPopular?: boolean;
}

export interface AdminAnalyticsSummary {
  totalUsers: number;
  activeUsers: number;
  totalPrdsGenerated: number;
  totalCreditsConsumed: number;
  totalRevenueINR: number;
  dailyTrends: { date: string; users: number; prds: number; credits: number }[];
  planDistribution: { plan: string; count: number; percentage: number }[];
  topTechStacks: { name: string; count: number; percentage: number }[];
  recentSystemLogs: UserActivityItem[];
}

