<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PrdController;

Route::prefix('v1')->group(function () {
    // Auth Routes
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // PRD CRUD Routes
    Route::get('/prds', [PrdController::class, 'index']);
    Route::post('/prds/generate', [PrdController::class, 'generate']);
    Route::get('/prds/{id}', [PrdController::class, 'show']);
    Route::put('/prds/{id}', [PrdController::class, 'updateSection']);
    Route::delete('/prds/{id}', [PrdController::class, 'destroy']);

    // Health check endpoint
    Route::get('/healthz', function () {
        return response()->json([
            'status' => 'ok',
            'service' => 'Laravel 11 API Backend (MySQL aiprd)',
            'timestamp' => now()->toIso8601String(),
        ]);
    });
});
