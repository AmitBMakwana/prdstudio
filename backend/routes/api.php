<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PrdController;

Route::prefix('v1')->group(function () {
    // Public Unauthenticated Routes
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // Public Health Check Endpoint
    Route::get('/healthz', function () {
        return response()->json([
            'status' => 'ok',
            'service' => 'Laravel 11 API Backend (MySQL aiprd)',
            'timestamp' => now()->toIso8601String(),
        ]);
    });

    // Protected Authenticated Routes (Requires Sanctum Token Middleware)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        // PRD CRUD & Synthesis Endpoints
        Route::get('/prds', [PrdController::class, 'index']);
        Route::post('/prds/generate', [PrdController::class, 'generate']);
        Route::get('/prds/{id}', [PrdController::class, 'show']);
        Route::put('/prds/{id}', [PrdController::class, 'updateSection']);
        Route::delete('/prds/{id}', [PrdController::class, 'destroy']);
    });
});
