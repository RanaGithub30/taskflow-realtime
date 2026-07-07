<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\UserAuthManageController;

Route::prefix('v1')->group(function () {
    Route::post('/register', [UserAuthManageController::class, 'register']);
    Route::post('/login', [UserAuthManageController::class, 'login']);
    Route::get('/user', [UserAuthManageController::class, 'getUser']);
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');