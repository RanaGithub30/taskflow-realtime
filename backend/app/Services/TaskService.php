<?php

namespace App\Services;

use App\Models\Task;
use App\Models\TaskDeadlineChange;

class TaskService
{
    public function index(): \Illuminate\Database\Eloquent\Collection
    {
        $user = auth()->user();

        return Task::where('user_id', $user?->id)->latest()->get();
    }

    public function store(array $data): Task
    {
        $user = auth()->user();

        return Task::create([
            'user_id' => $user?->id,
            'title' => $data['title'],
            'project' => $data['project'] ?? null,
            'priority' => $data['priority'] ?? null,
            'status' => $data['status'] ?? null,
            'deadline' => $data['deadline'] ?? null,
            'description' => $data['description'] ?? null,
            'progress' => $data['progress'] ?? 0,
        ]);
    }

    public function destroy(int $taskId): void
    {
        $user = auth()->user();

        Task::where('user_id', $user?->id)
            ->whereKey($taskId)
            ->firstOrFail()
            ->delete();
    }

    public function update(int $taskId, array $data): Task
    {
        $user = auth()->user();
        $task = Task::where('user_id', $user?->id)
            ->whereKey($taskId)
            ->firstOrFail();

        $task->update($data);

        return $task->fresh();
    }

    public function updateDeadline(int $taskId, string $deadline): array
    {
        $user = auth()->user();
        $task = Task::where('user_id', $user?->id)
            ->whereKey($taskId)
            ->firstOrFail();
        $oldDeadline = $task->deadline;

        if ($oldDeadline !== $deadline) {
            $task->update(['deadline' => $deadline]);
            $change = TaskDeadlineChange::create([
                'task_id' => $task->id,
                'user_id' => $user->id,
                'old_deadline' => $oldDeadline,
                'new_deadline' => $deadline,
            ]);
        }

        return [
            'task' => $task->fresh(),
            'deadline_change' => $change ?? null,
        ];
    }

    public function deadlineHistory(): \Illuminate\Database\Eloquent\Collection
    {
        $user = auth()->user();

        return TaskDeadlineChange::with('task:id,title')
            ->where('user_id', $user?->id)
            ->latest()
            ->get();
    }
}
