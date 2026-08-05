<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\UserAuthManageController;
use App\Http\Controllers\api\ProjectManageController;
use App\Http\Controllers\api\InviteController;
use App\Http\Controllers\api\TeamManageController;

Route::prefix('v1')->group(function () {
    Route::post('/register', [UserAuthManageController::class, 'register']);
    Route::post('/login', [UserAuthManageController::class, 'login']);
    // Route::get('/auth/user', [UserAuthManageController::class, 'getUserDetails']);
    // Public invite validation
    Route::get('/invite/validate/{token}', [InviteController::class, 'validateInvite']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('v1')->group(function () {
        Route::prefix('auth')
        ->middleware('auth:sanctum')
        ->controller(UserAuthManageController::class)
        ->group(function () {
            Route::get('/user', 'getUserDetails');
        });
    });
    
    Route::prefix('v1')->group(function () {
        // Invite endpoints (generate + accept) require auth
        Route::post('/invite', [InviteController::class, 'generate']);
        Route::post('/invite/accept', [InviteController::class, 'accept']);

        Route::get('/teams', [TeamManageController::class, 'index']);
        Route::post('/teams', [TeamManageController::class, 'store']);
        Route::get('/teams/{team}/members', [TeamManageController::class, 'members']);

        Route::prefix('projects')
        ->middleware('auth:sanctum')
        ->controller(ProjectManageController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/{project}', 'show');
            Route::put('/{project}', 'update');
            Route::delete('/all', 'destroyAll');
            Route::delete('/{project}', 'destroy');
        });
    });
});