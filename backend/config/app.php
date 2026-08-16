<?php

return [
    'name' => env('APP_NAME', 'AI PRD Studio'),
    'env' => env('APP_ENV', 'local'),
    'debug' => (bool) env('APP_DEBUG', true),
    'url' => env('APP_URL', 'http://localhost:8000'),
    'timezone' => env('APP_TIMEZONE', 'UTC'),
    'locale' => 'en',
    'fallback_locale' => 'en',
    'faker_locale' => 'en_US',
    'cipher' => 'AES-256-CBC',
    'key' => env('APP_KEY', 'base64:Xk9PZ1JvYm90aWNzQ0xJQWlQUkRTdHVkaW9LZXkxMjM0NTY='),
];
