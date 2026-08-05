<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Invite;
use App\Models\Team;

class InviteController extends Controller
{
    public function generate(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'team_id' => 'nullable|integer|exists:teams,id',
            'name' => 'nullable|string|max:255',
            'details' => 'nullable|string',
        ]);

        if (!$request->filled('team_id') && !$request->filled('name')) {
            return response()->json(['message' => 'Please select an existing team or provide a new team name.'], 422);
        }

        if ($request->filled('team_id')) {
            $team = Team::find($request->input('team_id'));
            if (!$team || $team->owner_id !== $user->id) {
                return response()->json(['message' => 'Selected team is not available.'], 403);
            }
        } else {
            $team = Team::firstOrCreate([
                'owner_id' => $user->id,
                'name' => $request->input('name'),
            ], [
                'details' => $request->input('details'),
            ]);
        }

        $token = bin2hex(random_bytes(16));

        $invite = Invite::create([
            'token' => $token,
            'inviter_id' => $user->id,
            'team' => $team->name,
            'team_id' => $team->id,
            'expires_at' => now()->addDays(7),
        ]);

        $frontend = env('FRONTEND_URL', 'http://localhost:5173');
        $url = rtrim($frontend, '/') . '/team?invite=' . $token;

        return response()->json(['data' => ['token' => $token, 'invite_url' => $url]]);
    }

    public function validateInvite($token)
    {
        $invite = Invite::with('team', 'inviter')->where('token', $token)->first();

        if (!$invite) {
            return response()->json(['message' => 'Invite is no longer valid.'], 404);
        }

        if ($invite->used_by_user_id) {
            return response()->json(['message' => 'Invite is no longer valid.'], 400);
        }

        if ($invite->expires_at && now()->gt($invite->expires_at)) {
            return response()->json(['message' => 'Invite is no longer valid.'], 400);
        }

        $team = $invite->team()->first();
        if (!$team) {
            return response()->json(['message' => 'Invite is no longer valid.'], 400);
        }

        $inviter = $invite->inviter ? ['id' => $invite->inviter->id, 'name' => $invite->inviter->name] : null;
        return response()->json(['data' => ['team' => $team->name, 'team_id' => $team->id, 'inviter' => $inviter]]);
    }

    public function accept(Request $request)
    {
        $user = $request->user();
        $token = $request->input('token');

        $invite = Invite::with('team')->where('token', $token)->first();
        if (!$invite) {
            return response()->json(['message' => 'Invalid token'], 404);
        }
        if ($invite->used_by_user_id) {
            return response()->json(['message' => 'Invalid token'], 400);
        }
        if ($invite->expires_at && now()->gt($invite->expires_at)) {
            return response()->json(['message' => 'Invite expired'], 400);
        }

        $team = $invite->team()->first();
        if (!$team) {
            return response()->json(['message' => 'Team no longer exists'], 400);
        }

        // Attach user to the team (many-to-many). Use syncWithoutDetaching to keep existing memberships.
        $user->teams()->syncWithoutDetaching([$team->id]);

        $invite->used_by_user_id = $user->id;
        $invite->used_at = now();
        $invite->save();

        return response()->json(['data' => ['user' => $user, 'message' => 'Invite accepted']]);
    }
}
