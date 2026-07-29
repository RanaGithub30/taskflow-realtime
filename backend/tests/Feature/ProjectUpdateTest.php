<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_project_can_be_updated_via_put_request(): void
    {
        $user = User::factory()->create();
        $project = Project::create([
            'user_id' => $user->id,
            'name' => 'Old project',
            'description' => 'Old description',
            'team' => 'Old team',
            'status' => 'Planning',
            'budget' => 1000,
            'dueDate' => '2026-07-01',
        ]);

        $response = $this->actingAs($user, 'sanctum')->putJson("/api/v1/projects/{$project->id}", [
            'projectName' => 'Updated project',
            'description' => 'Updated description',
            'team' => 'Backend',
            'status' => 'Active',
            'budget' => '2500',
            'dueDate' => '2026-08-01',
        ]);

        $response->assertOk();

        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'name' => 'Updated project',
            'description' => 'Updated description',
            'team' => 'Backend',
            'status' => 'Active',
            'budget' => '2500.00',
            'dueDate' => '2026-08-01',
        ]);
    }
}
