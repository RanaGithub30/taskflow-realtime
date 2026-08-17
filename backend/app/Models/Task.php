<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function deadlineChanges()
    {
        return $this->hasMany(TaskDeadlineChange::class)->latest();
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project');
    }
}