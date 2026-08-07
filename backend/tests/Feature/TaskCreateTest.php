<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskCreateTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_a_task_via_api(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/v1/tasks', [
            'title' => 'Write API docs',
            'project' => 'Backend',
            'priority' => 'High',
            'status' => 'Pending',
            'deadline' => '2026-08-20',
            'description' => 'Document the new endpoints',
            'progress' => 10,
        ]);

        $response->assertCreated();
        $response->assertJsonPath('title', 'Write API docs');

        $this->assertDatabaseHas('tasks', [
            'user_id' => $user->id,
            'title' => 'Write API docs',
            'project' => 'Backend',
            'priority' => 'High',
            'status' => 'Pending',
            'description' => 'Document the new endpoints',
            'progress' => 10,
        ]);
    }
}
