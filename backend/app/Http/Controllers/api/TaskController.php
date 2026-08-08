<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TaskService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function __construct(private TaskService $taskService)
    {
    }

    public function index(): JsonResponse
    {
        $tasks = $this->taskService->index();

        return response()->json($tasks, 200);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'project' => ['nullable', 'string', 'max:255'],
            'priority' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'string', 'max:255'],
            'deadline' => ['nullable', 'date'],
            'description' => ['nullable', 'string'],
            'progress' => ['nullable', 'integer', 'min:0', 'max:100'],
        ]);

        $task = $this->taskService->store($validated);

        return response()->json($task, 201);
    }

    public function destroy(int $task): JsonResponse
    {
        $this->taskService->destroy($task);

        return response()->json([
            'message' => 'Task deleted successfully.',
        ]);
    }

    public function update(Request $request, int $task): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'project' => ['nullable', 'string', 'max:255'],
            'priority' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'string', 'max:255'],
            'deadline' => ['nullable', 'date'],
            'description' => ['nullable', 'string'],
            'progress' => ['nullable', 'integer', 'min:0', 'max:100'],
        ]);

        return response()->json($this->taskService->update($task, $validated));
    }

    public function updateDeadline(Request $request, int $task): JsonResponse
    {
        $validated = $request->validate([
            'deadline' => ['required', 'date', 'after_or_equal:today'],
        ]);

        return response()->json($this->taskService->updateDeadline($task, $validated['deadline']));
    }

    public function deadlineHistory(): JsonResponse
    {
        return response()->json($this->taskService->deadlineHistory());
    }
}
