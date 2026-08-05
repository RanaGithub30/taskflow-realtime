<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Team;

class TeamManageController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        // Return teams the user owns or is a member of
        $teams = Team::withCount(['members as member_count'])
            ->where(function($q) use ($user) {
                $q->where('owner_id', $user->id);
            })->orWhereHas('members', function($q) use ($user) {
                $q->where('users.id', $user->id);
            })->orderBy('name')->get();
        return response()->json(['data' => $teams]);
    }

    public function members(Request $request, Team $team)
    {
        $user = $request->user();

        $isAuthorized = $team->owner_id === $user->id || $team->members()->where('users.id', $user->id)->exists();
        if (! $isAuthorized) {
            return response()->json(['message' => 'Unauthorized access to team members'], 403);
        }

        $members = $team->members()->get(['id', 'name', 'email']);
        return response()->json(['data' => $members]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'name' => 'required|string|max:255',
            'details' => 'nullable|string',
        ]);

        $team = Team::create([
            'owner_id' => $user->id,
            'name' => $request->input('name'),
            'details' => $request->input('details'),
        ]);

        return response()->json(['data' => $team], 201);
    }
}
