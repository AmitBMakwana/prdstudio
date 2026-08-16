import { PRDDocument, PRDSection, WizardState } from '../types/prd';

export function generatePRDDocument(state: WizardState): PRDDocument {
  const title = extractProjectTitle(state.projectDescription);
  const platformName = getPlatformFullName(state.platform);

  const techTags = [
    strtoupper(state.platform),
    state.techStack.frontend,
    state.techStack.backend,
    state.techStack.database,
    state.style,
    state.font
  ];

  // Synthesize EXACTLY the 6 Deep Specification Files requested by the user
  const sections: PRDSection[] = [
    {
      id: 'prd',
      title: 'PRD (Product Requirements Document)',
      iconName: 'FileText',
      content: `# PRD: ${title}

## 1. Executive Summary & Vision
- **Product Name**: ${title}
- **Target Platform**: ${platformName}
- **Primary Goal**: Deliver an end-to-end, production-grade application for ${state.projectType || 'Software Application'}.
- **Core Value Proposition**: High performance, responsive layout, sub-second API execution, and modern component state management.

## 2. Problem Statement & User Personas
- **The Problem**: End users require a seamless, intuitive digital experience for ${state.projectDescription}.
- **Target Personas**: Software developers, product managers, and end-users seeking efficiency and speed.

## 3. P0 (Must Have) & P1 (High Priority) Feature Specs

### [P0] Core User Workflows & Buttons
- **Authentication & User Onboarding**:
  - Sign Up / Login Form with validation.
  - Session persistence and bearer token headers.
- **Main Interactive Dashboard**:
  - Filterable content grid with status badges.
  - Action buttons: Create, Edit, View Specs, Export, Delete.
- **Form Input & Data Submission**:
  - Real-time input validation, character counters, and loading state animations.

### [P1] Secondary Features & Multi-Format Exporters
- **Multi-Format Export**: 1-Click download as Markdown (.md), PDF Document (.pdf), JSON (.json), and TXT (.txt).
- **Theme Support**: Seamless light and dark mode toggling.
`
    },
    {
      id: 'trd',
      title: 'TRD (Technical Requirements Document)',
      iconName: 'Cpu',
      content: `# TRD: Technical Requirements Document – ${title}

## 1. System Architecture & Tech Stack
- **Frontend Framework**: ${state.techStack.frontend} (React / TypeScript)
- **Backend API Engine**: ${state.techStack.backend} (PHP 8.2 REST API)
- **Database Engine**: ${state.techStack.database} (Database Name: aiprd)
- **Design System Tokens**: Google Stitch DESIGN.md Standard

## 2. Server Infrastructure & Endpoints
- **Frontend App**: Deployed on port 3000 (Next.js / React Vite server).
- **Laravel API Server**: Deployed on port 8000 (Laravel 11 Artisan server).
- **Communication Protocol**: Asynchronous REST JSON APIs with CORS support.

## 3. Component Architecture & State Management
- Local state management using React hooks (\`useState\`, \`useEffect\`).
- Service abstraction layer (\`apiService.ts\` and \`storageService.ts\`).
`
    },
    {
      id: 'app-flow',
      title: 'APP FLOW (App Workflows & User Journeys)',
      iconName: 'GitBranch',
      content: `# APP FLOW: User Journeys & Route Progression – ${title}

## 1. Screen Route Map
- \`/\` -> Public Landing Page (Hero, Features, Pricing, FAQ)
- \`/login\` -> Authentication Screen (Login / Register Tab Switcher)
- \`/dashboard\` -> Primary User Workspace & PRD List
- \`/wizard\` -> 6-Step Interactive PRD Builder
- \`/editor\` -> Multi-Tab Spec Inspection & Export View
- \`/upgrade\` -> Plan Tier Upgrade & Credit Purchase
- \`/account\` -> Profile & Account Settings

## 2. Step-by-Step User Flow
1. User lands on \`/\` -> Clicks "Start Building Free" -> Navigates to \`/wizard\`.
2. User selects Platform (Step 1) -> Tech Stack (Step 2) -> Style (Step 3) -> Colors (Step 4) -> Font (Step 5) -> Enters Description (Step 6).
3. User clicks "Generate PRD Spec" -> System deducts 50 credits -> Displays animated build pipeline -> Redirects to \`/editor\`.
4. User inspects PRD, TRD, APP FLOW, UI UX, DATABASE DESIGN, SECURITY tabs -> Clicks "Copy Master 1-Prompt".
`
    },
    {
      id: 'ui-ux',
      title: 'UI UX (Design System, Tokens & Wireframes)',
      iconName: 'Palette',
      content: `# UI UX: Design Specs & Tokens – ${title}

## 1. Style & Theme Calibration
- **Visual Style**: ${state.style} Aesthetic
- **Color Theme**: ${state.colorType.toUpperCase()} Palette (${state.selectedSolidColor || state.selectedGradient})
- **Primary Accent**: ${state.customColors.primary || '#2563EB'}
- **Secondary Accent**: ${state.customColors.secondary || '#EC4899'}
- **Surface Color**: ${state.customColors.surface || '#FFFFFF'}
- **Typography Font**: ${state.font} (Google Fonts)

## 2. UI Component Specifications
- **Buttons**: \`1px solid var(--border-color)\`, border-radius \`10px\`, hover elevation \`-1px\`.
- **Card Surfaces**: Clean 1px sharp borders, padding \`24px\`, subtle drop shadow.
- **Navbar**: Sticky header with logo badge, active route highlight, and avatar profile menu.
`
    },
    {
      id: 'database-design',
      title: 'DATABASE DESIGN (MySQL Schemas & ERD)',
      iconName: 'Database',
      content: `# DATABASE DESIGN: Relational Schemas – ${title}

## 1. Database Connection Specs
- **Database Engine**: ${state.techStack.database}
- **Database Name**: \`aiprd\`
- **ORM Engine**: Laravel Eloquent ORM

## 2. Database Tables & Relational Schemas

### Table 1: \`users\`
- \`id\` (BIGINT UNSIGNED, Primary Key, Auto Increment)
- \`name\` (VARCHAR 255, NOT NULL)
- \`email\` (VARCHAR 255, UNIQUE, NOT NULL)
- \`password\` (VARCHAR 255, NOT NULL)
- \`phone\` (VARCHAR 255, NULLABLE)
- \`credits_remaining\` (INT, DEFAULT 50)
- \`plan\` (VARCHAR 50, DEFAULT 'Free')
- \`created_at\`, \`updated_at\` (TIMESTAMP)

### Table 2: \`prd_documents\`
- \`id\` (BIGINT UNSIGNED, Primary Key, Auto Increment)
- \`prd_id\` (VARCHAR 100, UNIQUE, NOT NULL)
- \`user_id\` (BIGINT UNSIGNED, Foreign Key -> \`users.id\`)
- \`title\` (VARCHAR 255, NOT NULL)
- \`platform_name\` (VARCHAR 100, NOT NULL)
- \`wizard_state_json\` (LONGTEXT / JSON, NOT NULL)
- \`tech_tags_json\` (LONGTEXT / JSON, NOT NULL)
- \`sections_json\` (LONGTEXT / JSON, NOT NULL)
- \`master_prompt\` (LONGTEXT, NOT NULL)
- \`created_at\`, \`updated_at\` (TIMESTAMP)
`
    },
    {
      id: 'security',
      title: 'SECURITY (Auth, Encryption & OWASP)',
      iconName: 'Shield',
      content: `# SECURITY: Security Protocols & Controls – ${title}

## 1. Authentication & Session Security
- **Token Engine**: Laravel Sanctum HTTP Bearer Tokens.
- **Password Encryption**: bcrypt hashing algorithm (cost factor 12).
- **Session Expiration**: Automatic token refresh and secure HTTP-only cookies.

## 2. OWASP Protection Controls
- **SQL Injection Prevention**: PDO prepared statements via Laravel Eloquent ORM.
- **XSS Prevention**: HTML input sanitization and React auto-escaping.
- **CSRF Protection**: Token verification middleware on POST/PUT/DELETE requests.
- **API Rate Limiting**: 60 requests per minute per IP address.
`
    }
  ];

  const masterPrompt = `MASTER 1-PROMPT AI AGENT INSTRUCTION – ${title.toUpperCase()}

Target AI Coding Tools: Cursor, Claude Code, Antigravity, OpenCode, Windsurf

BUILD THIS COMPLETE SYSTEM FROM SCRATCH IN ONE PROMPT:

1. APPLICATION OVERVIEW:
Build a production application named "${title}" for ${platformName}.
Project Concept: ${state.projectDescription}

2. EXACT TECH STACK:
- Frontend: ${state.techStack.frontend} (React / TypeScript)
- Backend: ${state.techStack.backend} (PHP 8.2 REST API)
- Database: ${state.techStack.database} (Database Name: aiprd)
- Design System: ${state.style} style with ${state.font} typography and accent ${state.customColors.primary || '#2563EB'}.

3. REQUIRED MODULES & BUTTONS FROM SCRATCH:
- Authentication: Sign Up, Login, Token Session persistence.
- Dashboard: Filterable cards, Create PRD button, Edit button, Multi-format Export modal (MD, PDF, JSON, TXT), Delete action.
- Wizard: 6-step builder for Platform, Stack, Style, Colors, Font, and Description.
- Database: MySQL tables (users, projects, prd_documents) with Eloquent ORM relationships.
- Security: Password hashing, CORS, CSRF, and SQL injection protection.

Implement all components, routes, database migrations, models, controllers, and styling cleanly with no missing imports!`;

  return {
    id: 'prd-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    title,
    createdAt: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    updatedAt: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
    wizardState: state,
    platformName,
    techTags,
    sections,
    masterPrompt
  };
}

function extractProjectTitle(description: string): string {
  const clean = description.trim();
  if (!clean) return 'AI Software Project';
  const words = clean.split(/\s+/).slice(0, 4);
  const raw = words.join(' ');
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function getPlatformFullName(platform: string): string {
  switch (platform) {
    case 'webapp': return 'Website / Web Application';
    case 'mobileapp': return 'Mobile Application (iOS/Android)';
    case 'desktopapp': return 'Desktop Application (Windows/Mac)';
    case 'custom': return 'Custom Extension / CLI / Game';
    default: return 'Software Application';
  }
}

function strtoupper(str: string): string {
  return str ? str.toUpperCase() : '';
}
