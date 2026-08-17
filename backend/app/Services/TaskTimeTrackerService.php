<?php

namespace App\Services;

use App\Models\Project;
use App\Models\Task;
use App\Models\TaskTimeTracker;

class TaskTimeTrackerService
{
    public function start(int $taskId): TaskTimeTracker
    {
        $user = auth()->user();
        $task = Task::where('user_id', $user?->id)->findOrFail($taskId);

        // Tasks store their project foreign key in the existing `project` column.
        $project = Project::where('user_id', $user?->id)->findOrFail($task->project);

        return TaskTimeTracker::create([
            'task_id' => $task->id,
            'user_id' => $user->id,
            'project_id' => $project->id,
            'date' => now()->toDateString(),
            'time_spent' => '00:00:00',
            'interval' => ['started_at' => now()->toIso8601String()],
        ]);
    }

    public function stop(int $entryId): TaskTimeTracker
    {
        $user = auth()->user();
        $entry = TaskTimeTracker::where('user_id', $user?->id)->findOrFail($entryId);

        $seconds = max(0, $entry->created_at->diffInSeconds(now()));
        $stoppedAt = now();

        $entry->update([
            'time_spent' => $this->formatDuration($seconds),
            'interval' => array_merge($entry->interval ?? [], [
                'stopped_at' => $stoppedAt->toIso8601String(),
            ]),
        ]);

        return $entry->fresh();
    }

    private function formatDuration(int $seconds): string
    {
        $hours = intdiv($seconds, 3600);
        $minutes = intdiv($seconds % 3600, 60);
        $remainingSeconds = $seconds % 60;

        return sprintf('%02d:%02d:%02d', $hours, $minutes, $remainingSeconds);
    }
}
