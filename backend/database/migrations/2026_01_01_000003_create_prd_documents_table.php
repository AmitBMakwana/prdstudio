<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('prd_documents', function (Blueprint $table) {
            $table->id();
            $table->string('prd_id')->unique();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->string('platform_name');
            $table->json('wizard_state_json');
            $table->json('tech_tags_json');
            $table->json('sections_json');
            $table->longText('master_prompt');
            $table->integer('version')->default(1);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('prd_documents');
    }
};
