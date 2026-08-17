<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TaskTimeTrackerService;
use Illuminate\Http\JsonResponse;

class TaskTimeTrackerController extends Controller
{
    public function __construct(private TaskTimeTrackerService $taskTimeTrackerService)
    {
    }

    public function start(int $task): JsonResponse
    {
        return response()->json($this->taskTimeTrackerService->start($task), 201);
    }

    public function stop(int $entry): JsonResponse
    {
        return response()->json($this->taskTimeTrackerService->stop($entry));
    }
}
