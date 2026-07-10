<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\UserAuthManageController;
use App\Http\Controllers\api\ProjectManageController;

Route::prefix('v1')->group(function () {
    Route::post('/register', [UserAuthManageController::class, 'register']);
    Route::post('/login', [UserAuthManageController::class, 'login']);
    // Route::get('/auth/user', [UserAuthManageController::class, 'getUserDetails']);
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
        Route::prefix('projects')
        ->middleware('auth:sanctum')
        ->controller(ProjectManageController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/{project}', 'show');
            Route::put('/{project}', 'update');
            Route::delete('/{project}', 'destroy');
        });
    });
});