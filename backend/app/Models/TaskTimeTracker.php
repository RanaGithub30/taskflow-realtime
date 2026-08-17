<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskTimeTracker extends Model
{
    use HasFactory;

    protected $table = 'task_time_tracker';

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'interval' => 'array',
        ];
    }

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
