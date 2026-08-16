<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscription_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_id')->unique();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('plan_name');
            $table->decimal('amount_inr', 10, 2);
            $table->integer('credits_added');
            $table->string('status')->default('SUCCESS');
            $table->string('payment_method')->default('Stripe / Simulated UPI');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscription_transactions');
    }
};
