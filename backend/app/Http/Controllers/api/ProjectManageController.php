<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ProjectService;

class ProjectManageController extends Controller
{

    protected $projectService;

    public function __construct(ProjectService $projectService)
    {
        /** service container */
        $this->projectService = $projectService;
    }

    public function index()
    {
        $projects = $this->projectService->index();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $project = $this->projectService->store($request->all());
        return response()->json($project);
    }

    public function show($id)
    {
        $project = $this->projectService->show($id);
        return response()->json($project);
    }

    public function update(Request $request, $id)
    {
        $project = $this->projectService->update($request, $id);
        return response()->json($project);
    }

    public function destroy($id)
    {
        $this->projectService->destroy($id);
        return response()->json(['message' => 'Project deleted successfully']);
    }
}