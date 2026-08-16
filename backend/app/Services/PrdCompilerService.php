<?php

namespace App\Services;

class PrdCompilerService
{
    public function generate(array $wizardState): array
    {
        $platform = $wizardState['platform'] ?? 'webapp';
        $frontend = $wizardState['techStack']['frontend'] ?? 'Next.js';
        $backend = $wizardState['techStack']['backend'] ?? 'Laravel (PHP)';
        $database = $wizardState['techStack']['database'] ?? 'MySQL/SQL';
        $style = $wizardState['style'] ?? 'Flat';
        $font = $wizardState['font'] ?? 'Lexend';
        $desc = $wizardState['projectDescription'] ?? 'Online store with product listings, cart, checkout, payment integration, user accounts, order tracking, and admin dashboard.';

        $title = $this->extractTitle($desc);
        $platformName = $this->getPlatformName($platform);

        $techTags = [
            strtoupper($platform),
            $frontend,
            $backend,
            $database,
            $style,
            $font
        ];

        // Synthesize the 6 Exact Deep Specification Files
        $sections = [
            [
                'id' => 'prd',
                'title' => 'PRD (Product Requirements Document)',
                'iconName' => 'FileText',
                'content' => "# PRD: {$title}\n\n" .
                    "## 1. Executive Summary & Vision\n" .
                    "- **Product Name**: {$title}\n" .
                    "- **Target Platform**: {$platformName}\n" .
                    "- **Primary Goal**: Deliver an end-to-end, production-grade application for " . ($wizardState['projectType'] ?? 'Software Application') . ".\n" .
                    "- **Core Value Proposition**: Sub-second execution, responsive design, modular component state management, and enterprise-grade security.\n\n" .
                    "## 2. Problem Statement & User Personas\n" .
                    "- **The Problem**: Users need an efficient, high-speed solution for {$desc}.\n" .
                    "- **Target Personas**: End-users, software administrators, and engineering managers.\n\n" .
                    "## 3. P0 & P1 Feature Specifications (Scratch to Buttons)\n" .
                    "### [P0] Core Workflows\n" .
                    "- **Authentication**: Sign Up, Login, Password Reset, Sanctum Token Session.\n" .
                    "- **Primary Canvas Dashboard**: Filterable cards, status badges, action buttons (Create, Edit, Delete, Export).\n" .
                    "- **6-Step PRD Builder**: Step-by-step interactive selection with live progress indicators.\n\n" .
                    "### [P1] Multi-Format Exporter\n" .
                    "- **Download Formats**: Markdown (.md), PDF Document (.pdf), JSON (.json), and Plain Text (.txt).\n"
            ],
            [
                'id' => 'trd',
                'title' => 'TRD (Technical Requirements Document)',
                'iconName' => 'Cpu',
                'content' => "# TRD: Technical Requirements Document – {$title}\n\n" .
                    "## 1. Architecture Stack\n" .
                    "- **Frontend**: {$frontend} (TypeScript / React)\n" .
                    "- **Backend API**: {$backend} (REST API Engine)\n" .
                    "- **Database**: {$database} (Database Name: aiprd)\n\n" .
                    "## 2. API Endpoints\n" .
                    "- `POST /api/v1/auth/register` -> User Registration\n" .
                    "- `POST /api/v1/auth/login` -> Bearer Token Login\n" .
                    "- `GET /api/v1/prds` -> Retrieve User PRD Documents\n" .
                    "- `POST /api/v1/prds/generate` -> Create & Store PRD Canvas Spec\n" .
                    "- `GET /api/v1/user/activities` -> User Audit Log Feed\n" .
                    "- `GET /api/v1/user/transactions` -> Subscription Transaction History\n"
            ],
            [
                'id' => 'app-flow',
                'title' => 'APP FLOW (User Journeys & Workflow Diagrams)',
                'iconName' => 'GitBranch',
                'content' => "# APP FLOW: User Journeys – {$title}\n\n" .
                    "## 1. Route Progression Map\n" .
                    "- `/` -> Public Landing Page\n" .
                    "- `/login` -> Authentication & Registration\n" .
                    "- `/dashboard` -> Main User Workspace & PRD List\n" .
                    "- `/wizard` -> 6-Step Interactive Builder\n" .
                    "- `/editor` -> Multi-Tab Spec Inspector\n" .
                    "- `/upgrade` -> Subscription Plan Upgrade\n" .
                    "- `/account` -> Profile & Audit Logs\n\n" .
                    "## 2. Step-by-Step User Journey\n" .
                    "1. User lands on `/` -> Clicks 'Start Building Free'.\n" .
                    "2. Completes 6-Step Wizard -> Clicks 'Generate Spec'.\n" .
                    "3. 50 Credits deducted -> Displays animated synthesis pipeline -> Navigates to `/editor`.\n"
            ],
            [
                'id' => 'ui-ux',
                'title' => 'UI UX (Design System, Tokens & Wireframes)',
                'iconName' => 'Palette',
                'content' => "# UI UX: Design Specs & Tokens – {$title}\n\n" .
                    "## 1. Theme Specs\n" .
                    "- **Visual Style**: {$style} Aesthetic\n" .
                    "- **Typography**: {$font} (Google Fonts)\n" .
                    "- **Primary Color**: " . ($wizardState['customColors']['primary'] ?? '#4F46E5') . "\n" .
                    "- **Theme Mode**: " . strtoupper($wizardState['themeMode'] ?? 'light') . "\n\n" .
                    "## 2. Component Guidelines\n" .
                    "- **Buttons**: 12px border radius, hover elevation.\n" .
                    "- **Cards**: Pastel gradient top banners with 56px floating circular icon badges.\n"
            ],
            [
                'id' => 'database-design',
                'title' => 'DATABASE DESIGN (MySQL Schemas & ERD)',
                'iconName' => 'Database',
                'content' => "# DATABASE DESIGN: Relational Schemas – {$title}\n\n" .
                    "## Connection Specs\n" .
                    "- **Database Engine**: {$database}\n" .
                    "- **Database Name**: `aiprd`\n" .
                    "- **ORM**: Laravel Eloquent\n\n" .
                    "## Tables\n" .
                    "- `users`: id, name, email, password, phone, plan, credits_remaining, plan_validity, timestamps\n" .
                    "- `prd_documents`: id, prd_id, user_id, title, platform_name, wizard_state_json, tech_tags_json, sections_json, master_prompt, timestamps\n" .
                    "- `user_activities`: id, user_id, type, description, metadata_json, timestamps\n" .
                    "- `subscription_transactions`: id, transaction_id, user_id, plan_name, amount_inr, credits_added, status, payment_method, timestamps\n"
            ],
            [
                'id' => 'security',
                'title' => 'SECURITY (Auth, Encryption & OWASP)',
                'iconName' => 'Shield',
                'content' => "# SECURITY: Security Controls – {$title}\n\n" .
                    "## 1. Authentication\n" .
                    "- Laravel Sanctum HTTP Bearer Tokens.\n" .
                    "- Password Encryption via bcrypt (cost 12).\n\n" .
                    "## 2. OWASP Protections\n" .
                    "- PDO Prepared Statements against SQL Injection.\n" .
                    "- HTML Escaping against XSS attacks.\n" .
                    "- CSRF Protection & API Rate Limiting.\n"
            ]
        ];

        $masterPrompt = "MASTER 1-PROMPT AI AGENT INSTRUCTION – " . strtoupper($title) . "\n\n" .
            "Build this complete system in one single prompt:\n" .
            "1. App Name: {$title}\n" .
            "2. Platform: {$platformName}\n" .
            "3. Tech Stack: {$frontend} (Frontend), {$backend} (Backend API), {$database} (Database: aiprd)\n" .
            "4. Design Style: {$style} style with {$font} typography.\n" .
            "5. Included Modules: Authentication, Dashboard, 6-Step PRD Builder, 6 Spec Files Inspector, Exporter (.md/.pdf/.json/.txt), User Activities Audit Log, Subscription Transactions History Table.";

        return [
            'prd_id' => 'prd-' . time() . '-' . substr(md5(uniqid()), 0, 6),
            'title' => $title,
            'platform_name' => $platformName,
            'wizard_state_json' => $wizardState,
            'tech_tags_json' => $techTags,
            'sections_json' => $sections,
            'master_prompt' => $masterPrompt,
            'version' => 1
        ];
    }

    private function extractTitle(string $desc): string
    {
        $clean = trim($desc);
        if (empty($clean)) return 'AI Software Project';
        $words = array_slice(explode(' ', $clean), 0, 4);
        return ucfirst(implode(' ', $words));
    }

    private function getPlatformName(string $platform): string
    {
        return match ($platform) {
            'webapp' => 'Website / Web Application',
            'mobileapp' => 'Mobile Application (iOS/Android)',
            'desktopapp' => 'Desktop Application (Electron/Tauri)',
            'custom' => 'Custom Extension / CLI / Game',
            default => 'Software Application'
        };
    }
}
