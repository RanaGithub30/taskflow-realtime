<?php

namespace Tests\Feature;

use App\Models\Task;
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

    public function test_user_can_delete_their_own_task_via_api(): void
    {
        $user = User::factory()->create();
        $task = Task::create([
            'user_id' => $user->id,
            'title' => 'Remove this task',
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->deleteJson("/api/v1/tasks/{$task->id}");

        $response->assertOk()
            ->assertJsonPath('message', 'Task deleted successfully.');
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    public function test_user_can_update_their_own_task_via_api(): void
    {
        $user = User::factory()->create();
        $task = Task::create([
            'user_id' => $user->id,
            'title' => 'Original task',
            'status' => 'Pending',
        ]);

        $response = $this->actingAs($user, 'sanctum')->putJson("/api/v1/tasks/{$task->id}", [
            'title' => 'Updated task',
            'project' => 'Frontend',
            'priority' => 'High',
            'status' => 'In Progress',
            'deadline' => '2026-08-20',
            'progress' => 50,
        ]);

        $response->assertOk()
            ->assertJsonPath('title', 'Updated task')
            ->assertJsonPath('status', 'In Progress');
        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Updated task',
            'progress' => 50,
        ]);
    }

    public function test_user_cannot_delete_another_users_task(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $task = Task::create([
            'user_id' => $owner->id,
            'title' => 'Private task',
        ]);

        $this->actingAs($otherUser, 'sanctum')
            ->deleteJson("/api/v1/tasks/{$task->id}")
            ->assertNotFound();

        $this->assertDatabaseHas('tasks', ['id' => $task->id]);
    }
}
