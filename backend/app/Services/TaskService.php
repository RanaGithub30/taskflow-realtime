<?php

namespace App\Services;

use App\Models\Task;

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
}
