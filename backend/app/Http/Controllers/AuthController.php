<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'avatar_letter' => strtoupper(substr($validated['name'], 0, 1)),
            'plan' => 'Free',
            'credits_remaining' => 50,
            'credits_max' => 50,
            'plan_validity' => 'September 15, 2026',
            'verified' => true,
        ]);

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'token' => 'demo-token-' . $user->id,
        ], 201);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            // Auto-create demo user if logging in as demo
            $user = User::create([
                'name' => 'Amit Makwana',
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'avatar_letter' => 'A',
                'plan' => 'Free',
                'credits_remaining' => 50,
                'credits_max' => 50,
                'plan_validity' => 'September 15, 2026',
                'verified' => true,
            ]);
        }

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'token' => 'demo-token-' . $user->id,
        ]);
    }

    public function me(Request $request)
    {
        $user = User::first() ?? User::create([
            'name' => 'Amit Makwana',
            'email' => 'amitmakwana1@gmail.com',
            'password' => Hash::make('password'),
            'avatar_letter' => 'A',
            'plan' => 'Free',
            'credits_remaining' => 50,
            'credits_max' => 50,
            'plan_validity' => 'September 15, 2026',
            'verified' => true,
        ]);

        return response()->json([
            'status' => 'success',
            'user' => $user,
        ]);
    }
}
