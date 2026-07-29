<?php

namespace App\Services;

use App\Models\Project;
use App\Traits\ProjectManageTrait;
use Illuminate\Http\Request;

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

    public function store($data)
    {
        $user = auth()->user();
        $new_data = $this->processData($data);
        $project = Project::create($new_data);
        return $project;
    }

    public function update(Request $request, $id)
    {
        $project = $this->getProjectById($id);

        if (!$project) {
            return null;
        }

        $data = $this->processData($request->all());
        $project->update($data);

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