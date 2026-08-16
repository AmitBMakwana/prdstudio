<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\PrdDocument;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::create([
            'name' => 'Amit Makwana',
            'email' => 'amitmakwana1@gmail.com',
            'password' => Hash::make('password123'),
            'phone' => 'Not Provided',
            'avatar_letter' => 'A',
            'plan' => 'Free',
            'credits_remaining' => 50,
            'credits_max' => 50,
            'plan_validity' => 'September 15, 2026',
            'verified' => true,
        ]);

        PrdDocument::create([
            'prd_id' => 'prd-demo-001',
            'user_id' => $user->id,
            'title' => 'Online store with product',
            'platform_name' => 'Website / Web Application',
            'wizard_state_json' => [
                'step' => 6,
                'platform' => 'webapp',
                'techStack' => [
                    'frontend' => 'Next.js',
                    'backend' => 'Laravel',
                    'database' => 'MySQL/SQL'
                ],
                'style' => 'Flat',
                'colorType' => 'solid',
                'selectedSolidColor' => 'Tailwind Blue',
                'selectedGradient' => 'Sunset',
                'customColors' => [
                    'primary' => '#3B82F6',
                    'secondary' => '#EC4899',
                    'accent' => '#3B82F6',
                    'background' => '#F8FAFC',
                    'surface' => '#FFFFFF',
                    'text' => '#0F172A'
                ],
                'themeMode' => 'light',
                'font' => 'Lexend',
                'projectType' => 'E-commerce',
                'projectDescription' => 'Online store with product listings, cart, checkout, payment integration, user accounts, order tracking, and admin dashboard.',
                'guidingNotes' => 'High performance e-commerce platform with sub-second page loads.'
            ],
            'tech_tags_json' => ['WEBAPP', 'Next.js', 'Laravel', 'MySQL/SQL', 'Flat', 'Lexend'],
            'sections_json' => [
                [
                    'id' => 'product-overview',
                    'title' => 'Product Overview',
                    'iconName' => 'FileText',
                    'content' => "Product Requirements Document – Online store with product\n\n1. Problem Statement\nGrowing demand for automated e-commerce workflows built with Next.js, Laravel API, and MySQL.\n\n2. Solution Summary\nA production application featuring Next.js for frontend presentation, Laravel 11 API with Eloquent ORM for business logic, and MySQL (database: aiprd) for persistent data storage."
                ]
            ],
            'master_prompt' => 'MASTER AI AGENT PROMPT – ONLINE STORE WITH PRODUCT\nStack: Next.js + Laravel 11 + MySQL (DB: aiprd)\nDesign: Google Stitch DESIGN.md Tokens.',
            'version' => 1,
        ]);
    }
}
