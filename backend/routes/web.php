<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'AI PRD Studio Laravel API Backend',
        'database' => 'MySQL (aiprd)',
        'version' => '1.0.0',
        'status' => 'active'
    ]);
});
