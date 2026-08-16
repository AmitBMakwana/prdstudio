# 🚀 PRD Studio - AI PRD Generation SaaS Platform

**PRD Studio** is an enterprise-grade, full-stack AI-powered SaaS application designed to help product managers, developers, and founders generate, edit, compile, and export comprehensive Product Requirement Documents (PRDs) in seconds.

Built with a **React 18 + Vite** frontend and a robust **Laravel 11 PHP API** backend connected to a **MySQL** database (`aiprd`), PRD Studio provides an intuitive multi-step wizard, live section editing, multi-format export capabilities, and scalable credit management.

---

## 📸 Overview & Features

### 🌟 Key Highlights
- 🪄 **Multi-Step PRD Generator Wizard**:
  - **Platform Selection**: Web App, Mobile App, Desktop App, Chrome Extension, CLI Tool.
  - **Tech Stack Specification**: Frontend, backend, database, and infrastructure choices.
  - **Design Style & Typography**: Modern, Minimalist, Corporate, Glassmorphism styles + custom fonts (Inter, Roboto, Outfit, JetBrains Mono, etc.).
  - **Color Palette Customization**: Solid, Gradient, and Custom hex palettes.
- 📝 **Live Interactive PRD Editor**:
  - Full inline section editing (Overview, User Personas, Features, Tech Architecture, Security, Milestones).
  - AI Section Regeneration and manual section additions.
  - One-click copy, formatted raw view, and interactive section jump list.
- 📥 **Multi-Format Document Export**:
  - Instant high-fidelity **PDF** generation.
  - Formatted **Markdown** export (`.md`).
  - Self-contained **HTML** document download (`.html`).
  - Raw **JSON** data export (`.json`).
- ⚡ **Multi-LLM AI Engine Integration**:
  - Support for **Google Gemini API**, **OpenAI GPT-4**, **Claude 3.5**, and **DeepSeek**.
  - In-app custom API key modal with secure local storage fallback.
- 📊 **Dashboard & Project Management**:
  - Real-time document activity metrics, project status badges, quick search filtering, and deletion controls.
- 💳 **Credit & Subscription Billing**:
  - Tiered plan system (Free, Starter, Pro, Ultimate).
  - Real-time credit deductions per PRD compilation.
  - Simulated payment workflow with celebratory confetti feedback.
- 👤 **Account & User Profile Hub**:
  - Profile preferences, theme selection, security settings, and detailed activity log history.
- 🌓 **Design System**:
  - Premium Dark & Light mode toggle with responsive glassmorphism UI.
- 🛡️ **Laravel RESTful API Backend**:
  - Token-based Sanctum authentication endpoints.
  - MySQL database persistence for users, projects, PRDs, user activities, and subscription transactions.

---

## 🏗️ Tech Stack

### **Frontend**
- **Framework**: React 18 (TypeScript)
- **Bundler & Dev Server**: Vite
- **Icons**: Lucide React
- **Export Utility Libraries**: `jspdf`, `html2canvas`, `canvas-confetti`
- **Styling**: Vanilla CSS (Tailored Design System tokens & responsive media queries)

### **Backend**
- **Framework**: Laravel 11 (PHP 8.2+)
- **Authentication**: Laravel Sanctum
- **Database**: MySQL (Database name: `aiprd`)
- **API Standard**: RESTful JSON API (`/api/v1/`)

---

## 📁 Repository Structure

```
prdstudio/
├── src/                          # React Frontend Application
│   ├── assets/                   # Static images, logos, media
│   ├── components/               # Reusable UI Components
│   │   ├── AIKeyModal.tsx        # Custom API key config modal
│   │   ├── ErrorBoundary.tsx     # React error boundary fallback
│   │   ├── Footer.tsx            # Global footer component
│   │   ├── MenuModal.tsx         # Mobile navigation drawer
│   │   ├── Navbar.tsx            # Navigation header & user status
│   │   └── SidebarNav.tsx        # App layout sidebar navigation
│   ├── pages/                    # Main Application Views
│   │   ├── AboutPage.tsx         # Product overview & team info
│   │   ├── AccountPage.tsx       # User profile & API settings
│   │   ├── DashboardPage.tsx     # Project dashboard & search
│   │   ├── LandingPage.tsx       # Public marketing landing page
│   │   ├── LoginPage.tsx         # User authentication & registration
│   │   ├── PrdEditorPage.tsx     # Interactive PRD editor & exporter
│   │   ├── UpgradePage.tsx       # Subscription plan & credits page
│   │   └── WizardPage.tsx        # Multi-step PRD creation wizard
│   ├── services/                 # Client Services & API Handlers
│   │   ├── aiEngine.ts           # LLM Prompt Compiler & AI Generator
│   │   ├── apiService.ts         # Axios/Fetch integration with Laravel API
│   │   ├── exportService.ts      # PDF, Markdown, HTML, JSON exporters
│   │   └── storageService.ts     # LocalStorage fallback & cache
│   ├── types/                    # TypeScript interfaces & types
│   │   └── prd.ts                # PRD schemas & data contracts
│   ├── App.tsx                   # Main App router & global state
│   ├── main.tsx                  # React DOM root entry point
│   └── index.css                 # Global design tokens & styling
├── backend/                      # Laravel 11 API Backend
│   ├── app/
│   │   ├── Http/Controllers/     # AuthController, PrdController
│   │   ├── Models/               # User, PrdDocument, SubscriptionTransaction, etc.
│   │   └── Services/             # PrdCompilerService
│   ├── config/                   # App, Database, CORS configurations
│   ├── database/
│   │   ├── migrations/           # Database schema migrations
│   │   └── seeders/              # Database seeders
│   ├── routes/                   # API routes (`api.php`)
│   ├── composer.json             # PHP dependencies
│   └── artisan                   # Laravel CLI tool
├── index.html                    # Single Page App HTML container
├── package.json                  # Frontend dependencies & scripts
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite bundler configuration
└── README.md                     # Project documentation
```

---

## ⚙️ Prerequisites

Before running the project locally, ensure you have the following installed on your machine:

1. **Node.js** (v18.0 or v20.0+) & **npm** (v9.0+) -> [Download Node.js](https://nodejs.org/)
2. **PHP** (v8.2 or higher) & **Composer** -> [Download PHP](https://www.php.net/) | [Download Composer](https://getcomposer.org/)
3. **MySQL Database Server** (v8.0+) (via XAMPP, WAMP, DBngin, Docker, or native MySQL) -> [Download MySQL](https://dev.mysql.com/downloads/)

---

## 🚀 How to Run the Project (Step-by-Step)

### 1️⃣ Database Setup

Create a new MySQL database named `aiprd`:

```sql
CREATE DATABASE aiprd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

### 2️⃣ Backend Setup (Laravel API)

1. Open your terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install PHP dependencies via Composer:
   ```bash
   composer install
   ```

3. Create the `.env` environment configuration file:
   *(If `.env` does not exist, copy from `.env.example` or create it)*:
   ```bash
   cp .env.example .env
   ```

4. Configure your MySQL database credentials inside `backend/.env`:
   ```env
   APP_NAME="PRD Studio API"
   APP_ENV=local
   APP_KEY=
   APP_DEBUG=true
   APP_URL=http://localhost:8000

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=aiprd
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. Generate the Laravel application encryption key:
   ```bash
   php artisan key:generate
   ```

6. Run the database migrations to create the required tables:
   ```bash
   php artisan migrate
   ```

   *(Optional)* Run seeders to populate initial demo data:
   ```bash
   php artisan db:seed
   ```

7. Start the Laravel backend development server:
   ```bash
   php artisan serve --port=8000
   ```
   > 🟢 Backend API will be live at: `http://127.0.0.1:8000/api/v1`  
   > 🧪 Health check endpoint: `http://127.0.0.1:8000/api/v1/healthz`

---

### 3️⃣ Frontend Setup (React + Vite)

1. Open a new terminal window and navigate to the project root directory:
   ```bash
   cd promptgenerator
   ```

2. Install Node modules:
   ```bash
   npm install
   ```

3. Start the Vite frontend development server:
   ```bash
   npm run dev
   ```

4. Open your web browser and navigate to:
   > 🌐 `http://localhost:5173`

---

## 📡 API Endpoints Reference

Base URL: `http://localhost:8000/api/v1`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user profile |
| `POST` | `/auth/login` | Authenticate user & issue token |
| `GET` | `/auth/me` | Fetch authenticated user data |
| `GET` | `/prds` | List all saved PRDs for current user |
| `POST` | `/prds/generate` | Generate a new PRD document |
| `GET` | `/prds/{id}` | Retrieve specific PRD by ID |
| `PUT` | `/prds/{id}` | Update section or metadata of a PRD |
| `DELETE` | `/prds/{id}` | Delete a PRD document |
| `GET` | `/healthz` | Backend API status and health check |

---

## 🔑 AI Key Setup

You can use the built-in AI Engine with fallback template compilation out-of-the-box. To use your own API Key:
1. Click the **API Key** button in the navigation header or top menu.
2. Select your provider (**Google Gemini**, **OpenAI**, **Claude**, or **DeepSeek**).
3. Input your secret API key and click **Save Key**.

---

## 🛠️ Build & Deployment

To build the frontend for production:

```bash
npm run build
```

This command generates an optimized production bundle inside the `dist/` directory, ready to be served by any web server (Nginx, Apache, Vercel, Netlify).

---

## 🔗 Repository Information

- **GitHub Repository**: [https://github.com/AmitBMakwana/prdstudio.git](https://github.com/AmitBMakwana/prdstudio.git)
- **License**: MIT License

---

Made with ❤️ by [Amit B Makwana](https://github.com/AmitBMakwana)