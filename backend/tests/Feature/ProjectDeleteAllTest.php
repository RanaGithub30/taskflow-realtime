<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectDeleteAllTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_delete_all_their_projects(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        Project::create([
            'user_id' => $user->id,
            'name' => 'Project One',
            'description' => 'First',
            'team' => 'Backend',
            'status' => 'Planning',
            'budget' => 100,
            'dueDate' => '2026-07-01',
        ]);

        Project::create([
            'user_id' => $user->id,
            'name' => 'Project Two',
            'description' => 'Second',
            'team' => 'Frontend',
            'status' => 'Active',
            'budget' => 200,
            'dueDate' => '2026-07-02',
        ]);

        Project::create([
            'user_id' => $otherUser->id,
            'name' => 'Other User Project',
            'description' => 'Should stay',
            'team' => 'QA',
            'status' => 'Review',
            'budget' => 300,
            'dueDate' => '2026-07-03',
        ]);

        $response = $this->actingAs($user, 'sanctum')->deleteJson('/api/v1/projects/all');

        $response->assertOk();
        $this->assertDatabaseHas('projects', ['user_id' => $otherUser->id, 'name' => 'Other User Project']);
        $this->assertDatabaseCount('projects', 1);
    }
}
