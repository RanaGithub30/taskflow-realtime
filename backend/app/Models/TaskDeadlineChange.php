<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaskDeadlineChange extends Model
{
    protected $guarded = [];

    protected $casts = [
        'old_deadline' => 'date:Y-m-d',
        'new_deadline' => 'date:Y-m-d',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
