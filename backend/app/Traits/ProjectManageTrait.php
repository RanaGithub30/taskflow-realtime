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

    public function processData($data)
    {
        $user = auth()->user();
        
        $new_data['user_id'] = $user->id;
        $new_data['name'] = $data['projectName'];
        $new_data['description'] = $data['description'];
        $new_data['team'] = $data['team'];
        $new_data['status'] = $data['status'];
        $new_data['budget'] = $data['budget'];
        $new_data['dueDate'] = $data['dueDate'];

        return $new_data;
    }
}