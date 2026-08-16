# PRD Studio — Turn Any Idea Into a Build-Ready PRD

> **From Idea to Build-Ready PRD in Seconds.**  
> PRD Studio transforms your product idea into a complete, structured, developer-ready PRD with product requirements, user flows, UI/UX specifications, technology architecture, database design, security specifications, and AI-ready coding prompts.

---

## 🌟 Executive Overview

PRD Studio is an AI-powered product engineering platform designed for founders, product managers, SaaS builders, and software engineers. Instead of spending weeks manually writing requirements documents, PRD Studio synthesizes a **6-file developer specification package** in approximately 12 to 15 seconds.

### The 6 Specification Files Generated:
1. **01 Product Requirements (PRD)**: Executive summary, target user personas, P0/P1 functional user stories, and acceptance criteria.
2. **02 Technical Architecture (TRD)**: System architecture (Next.js + Laravel 11 PHP API), REST endpoints, caching strategies, and performance guidelines.
3. **03 Application Flow**: Screen progression maps, user journeys, state transitions, and navigation maps.
4. **04 UI/UX & Design Tokens (DESIGN.md)**: Design tokens based on Google Stitch standards, color palettes, typography specs, and wireframes.
5. **05 Database Architecture**: MySQL relational database schemas (`aiprd`), 31 tables, foreign key constraints, indexes, and Eloquent models.
6. **06 Security & OWASP Specifications**: Sanctum token authentication, bcrypt password hashing, PDO prepared statements, XSS & CSRF protection rules.

---

## 🚀 Technology Stack

### Frontend Application
- **Core Framework**: React 18 / Next.js architecture running on Vite 5.
- **Language**: TypeScript 5.
- **Styling**: Vanilla CSS with HSL tailored design tokens, modern dark/light mode engine, Playfair Display typography, and Glassmorphism card surfaces.
- **Icons**: Lucide React.
- **Export Engine**: Markdown (`.md`), PDF (`.pdf`), JSON (`.json`), and Plain Text (`.txt`).

### Backend API Server
- **Framework**: Laravel 11 (PHP 8.2).
- **Authentication**: Laravel Sanctum Token Authentication.
- **Database ORM**: Eloquent ORM.
- **API Server Port**: `http://127.0.0.1:8000`.

### Database System
- **Database Engine**: MySQL 8.0.
- **Database Name**: `aiprd`.
- **Tables**: `users`, `sessions`, `prds`, `prd_sections`, `activities`, `transactions`.

---

## 🛠️ Key Platform Features

### 1. Interactive Landing Page
- Editorial headline typography with Playfair Display italic accents.
- Feature breakdowns, interactive pricing cards (Free, Starter, Pro, Ultimate), accordion FAQs, and real customer testimonials.

### 2. Collapsible Sidebar & Workspace Navigation (`SidebarNav.tsx`)
- **Responsive Width**: Smoothly collapses between **260px (Expanded)** and **76px (Collapsed)**.
- **Categorized Groups**:
  - *Workspace*: `Dashboard`, `PRD Builder`, `My Projects`
  - *Resources*: `Templates`, `AI Tools`, `Documentation`
  - *Account*: `Credits & Usage`, `Upgrade Plan`, `Account & Audit`
- **Active Navigation Indicator**: Soft purple background (`#EEF0FF`), purple text (`#5B4BFF`), left indicator line (`3px solid #5B4BFF`).
- **User Profile & Credit Progress Card**: Displays user avatar, name, plan tier, and live credit balance fill bar (`⚡ 50 / 50 Credits`).

### 3. Dashboard Workspace (`DashboardPage.tsx`)
- **4 KPI Metric Cards**:
  1. 📁 **Projects**: Total count & `+3 this month` badge.
  2. ⚡ **AI Credits**: Credit balance & max allowance.
  3. 📄 **PRDs Generated**: Count of generated spec files.
  4. 🟢 **AI Engine Status**: Live operational status badge (`● Operational (~12s avg)`).
- **Project Canvases List**: Grid and Table views with search filters, platform tags, tech tags, and status indicators (`● Completed`, `● Draft`, `● Generating`).

### 4. PRD Builder & Intelligent Intake (`WizardPage.tsx`)
- **6-Step Horizontal Navigation Bar**: `01 Platform ─── 02 Tech Stack ─── 03 Style ─── 04 Colors ─── 05 Fonts ─── 06 Project Idea`.
- **Step 1 Target Platform**: Web, Mobile, Desktop, Custom Tool with card descriptions.
- **Step 2 Technology Stack**: Contextual framework selections with technology symbols/icons (⚛️ React, ▲ Next.js, 🟩 Vue, 💙 Flutter, 🟢 Node.js, 🟥 Laravel 11, 🐬 MySQL, 🐘 PostgreSQL) + **✦ AI Recommended Stack** badge.
- **Step 3 Visual Design Style**: Minimal, Gradient, Glassmorphism, Neumorphism, Corporate, Dark-Tech with live mini UI preview boxes.
- **Step 4 Brand Colors & Theme**: Palettes (Stripe Indigo, Tailwind Blue, Linear Purple, etc.), custom color picker, live real-time application dashboard preview.
- **Step 5 Typography**: Fonts rendered in actual Google Font typefaces (Inter, Poppins, DM Sans, Space Grotesk, etc.).
- **Step 6 Intelligent AI Intake**: Project Name & Type, 0/5000 character description textarea, 10 quick-start templates, "Improve My Idea" AI prompt enhancer, and pre-generation AI summary review.
- **Animated AI Generation Stage Experience**: Real-time stage progression synthesis (`✓ Requirements`, `✓ Personas`, `✓ App Flows`, `◌ Architecture`, `○ Schema`, `○ Security`, `○ AI Prompt`).

### 5. Full Document Workspace (`PrdEditorPage.tsx`)
- Multi-tab document inspector (`01 PRD`, `02 TRD`, `03 APP FLOW`, `04 UI/UX`, `05 DATABASE`, `06 SECURITY`, `07 AI BUILD PROMPT`).
- PRD Quality Score Breakdown (`96/100`).
- Target AI Agent selector (Antigravity, Claude Code, Cursor, Windsurf, ChatGPT, Gemini, etc.).
- 1-Click Master Prompt exporter + PDF/MD/JSON/TXT exports.

---

## 🔒 Security, Authentication & Exception Diagnostics

### Route Authorization Middleware (`authMiddleware.ts`)
- **Route Guard**: `checkRouteAuth()` validates user authentication token (`prd_tok_...`) before granting access to any workspace page.
- **Protected Pages**: `dashboard`, `wizard`, `editor`, `upgrade`, `account`, `templates`, `aitools`, `docs`.
- **Public Pages**: `landing`, `login`, `about`.
- **Unauthorized Guard**: Unauthenticated access attempts are blocked and redirected to `login` with a security alert.

### Laravel API Security (`backend/routes/api.php`)
- **Sanctum Protection**: All sensitive API endpoints are guarded by `auth:sanctum` middleware.

### Credentials Validation (`storageService.ts` & `LoginPage.tsx`)
- Live email regex pattern validation (`name@domain.com`).
- Password minimum length enforcement (6+ characters).
- Account credential verification against registered user storage.

### Global Exception Boundary & Logging (`loggerService.ts` & `ErrorBoundary.tsx`)
- **React Error Boundary**: Catches unhandled rendering exceptions and presents a clean error fallback screen with diagnostic stack traces and `[Copy Error Diagnostics]` button.
- **Global Event Listeners**: `window.onerror` and `window.unhandledrejection` log uncaught exceptions into `localStorage` (`aiprd_system_logs`).

---

## ⚙️ Local Development Setup

### Prerequisites
- PHP 8.2+ with PDO & OpenSSL extensions.
- Composer 2+.
- Node.js 18+ and npm.
- MySQL 8.0+.

### 1. Backend Setup (Laravel 11)
```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Configure environment
cp .env.example .env

# Generate application key & run migrations
php artisan key:generate
php artisan migrate

# Start Laravel API server on http://127.0.0.1:8000
php artisan serve --port=8000
```

### 2. Frontend Setup (Next.js / React)
```bash
# Navigate to workspace root
cd e:\promptgenerator

# Install npm packages
npm install

# Start Vite dev server on http://localhost:3000
npm run dev

# Build for production
npm run build
```

---

## 📡 API Endpoint Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/v1/healthz` | API Health Check | No |
| `POST` | `/v1/auth/register` | User Account Registration | No |
| `POST` | `/v1/auth/login` | User Login & Sanctum Token Generation | No |
| `GET` | `/v1/auth/me` | Fetch Authenticated Profile | Yes (`auth:sanctum`) |
| `POST` | `/v1/auth/logout` | Revoke Session Token | Yes (`auth:sanctum`) |
| `GET` | `/v1/prds` | List User Project Canvases | Yes (`auth:sanctum`) |
| `POST` | `/v1/prds/generate` | Synthesize 6-File PRD Package | Yes (`auth:sanctum`) |
| `GET` | `/v1/prds/{id}` | Fetch Specific PRD Document | Yes (`auth:sanctum`) |
| `PUT` | `/v1/prds/{id}` | Update Specification Section | Yes (`auth:sanctum`) |
| `DELETE` | `/v1/prds/{id}` | Delete Project Canvas | Yes (`auth:sanctum`) |