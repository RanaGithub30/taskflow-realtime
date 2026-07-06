<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Http\Requests\RegisterRequest;

class UserAuthManageController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        return $this->authService->register($request);
    }

    public function login(Request $request)
    {
        return $this->authService->login($request);
    }

    // public function logout(Request $request)
    // {
    //     return $this->authService->logout($request);
    // }

    // public function getUser(Request $request)
    // {
    //     return $this->authService->getUser($request);
    // }
}