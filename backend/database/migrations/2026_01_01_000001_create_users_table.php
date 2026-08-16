<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('phone')->default('Not Provided');
            $table->string('avatar_letter')->default('A');
            $table->string('plan')->default('Free');
            $table->integer('credits_remaining')->default(50);
            $table->integer('credits_max')->default(50);
            $table->string('plan_validity')->default('September 15, 2026');
            $table->boolean('verified')->default(true);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
