<?php

namespace App\Http\Controllers;

use App\Models\PrdDocument;
use App\Models\User;
use App\Services\PrdCompilerService;
use Illuminate\Http\Request;

class PrdController extends Controller
{
    protected $compilerService;

    public function __construct(PrdCompilerService $compilerService)
    {
        $this->compilerService = $compilerService;
    }

    public function index()
    {
        $user = User::first();
        if (!$user) {
            return response()->json(['data' => []]);
        }

        $prds = PrdDocument::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'data' => $prds,
            'total' => $prds->count(),
        ]);
    }

    public function generate(Request $request)
    {
        $user = User::first();
        if (!$user) {
            $user = User::create([
                'name' => 'Amit Makwana',
                'email' => 'amitmakwana1@gmail.com',
                'password' => bcrypt('password'),
                'avatar_letter' => 'A',
                'plan' => 'Free',
                'credits_remaining' => 50,
                'credits_max' => 50,
                'plan_validity' => 'September 15, 2026',
                'verified' => true,
            ]);
        }

        if ($user->credits_remaining >= 50) {
            $user->credits_remaining -= 50;
            $user->save();
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Insufficient credits remaining (50 credits required per PRD).'
            ], 403);
        }

        $wizardState = $request->all();
        $generatedData = $this->compilerService->generate($wizardState);

        $prd = PrdDocument::create([
            'prd_id' => $generatedData['prd_id'],
            'user_id' => $user->id,
            'title' => $generatedData['title'],
            'platform_name' => $generatedData['platform_name'],
            'wizard_state_json' => $generatedData['wizard_state_json'],
            'tech_tags_json' => $generatedData['tech_tags_json'],
            'sections_json' => $generatedData['sections_json'],
            'master_prompt' => $generatedData['master_prompt'],
            'version' => 1,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $prd,
            'credits_remaining' => $user->credits_remaining,
        ], 201);
    }

    public function show($id)
    {
        $prd = PrdDocument::where('prd_id', $id)->orWhere('id', $id)->first();

        if (!$prd) {
            return response()->json(['status' => 'error', 'message' => 'PRD not found'], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $prd,
        ]);
    }

    public function updateSection(Request $request, $id)
    {
        $prd = PrdDocument::where('prd_id', $id)->orWhere('id', $id)->first();

        if (!$prd) {
            return response()->json(['status' => 'error', 'message' => 'PRD not found'], 404);
        }

        $sections = $request->input('sections');
        $prd->sections_json = $sections;
        $prd->save();

        return response()->json([
            'status' => 'success',
            'data' => $prd,
        ]);
    }

    public function destroy($id)
    {
        $prd = PrdDocument::where('prd_id', $id)->orWhere('id', $id)->first();

        if ($prd) {
            $prd->delete();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'PRD deleted successfully',
        ]);
    }
}
