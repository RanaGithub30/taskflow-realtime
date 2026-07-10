<?php

namespace App\Traits;

use App\Models\Project;

trait ProjectManageTrait{
    public function getAllProjects()
    {
        $user = auth()->user();
        return Project::where('user_id', $user->id)->get();
    }

    public function getProjectById($id)
    {
        $user = auth()->user();
        $project = Project::where('id', $id)->where('user_id', $user->id)->first();

        if (!$project) {
            return null;
        }

        return $project;
    }
}