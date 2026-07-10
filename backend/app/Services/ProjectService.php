<?php

namespace App\Services;

use App\Models\Project;
use App\Traits\ProjectManageTrait;

class ProjectService
{
    use ProjectManageTrait;
    public function index()
    {
        $projects = $this->getAllProjects();
        return $projects;
    }

    public function show($id)
    {
        $project = $this->getProjectById($id);
        return $project;
    }

    public function store(Request $request)
    {
        $project = Project::create($request->all());
        return $project;
    }

    public function update(Request $request, $id)
    {
        $project = $this->getProjectById($id);
        $project->update($request->all());
        return $project;
    }

    public function destroy($id)
    {
        $project = $this->getProjectById($id);

        if (!$project) {
            return null;
        }
        
        $project->delete();
    }
}