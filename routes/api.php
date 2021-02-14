<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GoogleOAuthController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::middleware('auth:api')->get('/user', [UserController::class, 'show']);
Route::middleware('auth:api')->put('/user/update', [UserController::class, 'update']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::prefix('/user/profile/{userId}')->group(function() {
  Route::post('/show', [ProfileController::class, 'show']);
  Route::post('/edit', [ProfileController::class, 'edit']);
});

Route::get('/user/login', [GoogleOAuthController::class, 'obtainOAuthToken']);
Route::get('/auth/google/callback', [GoogleOAuthController::class, 'handleOAuthServerRes']);

Route::get('/transactions',[TransactionController::class, 'index']);
Route::get('/transactions/{id}', [TransactionController::class, 'show']);
Route::put('/transactions/{id}',[TransactionController::class, 'update']);
Route::delete('/transactions/{id}',[TransactionController::class, 'destroy']);
Route::post('/transactions',[TransactionController::class, 'store']);

// Post
// Route::middleware('auth:api')->get('/posts', [PostController::class, 'show']);
// Route::middleware('auth:api')->post('/post', [PostController::class, 'creaetPost']);
Route::get('/posts', [PostController::class, 'getPostListByCategory']);
Route::get('/post/{id}', [PostController::class, 'getPostById']);
Route::post('/post', [PostController::class, 'creaetPost']);
Route::put('/post/{id}', [PostController::class, 'updatePostById']);
Route::delete('/post/{id}', [PostController::class, 'deletePostById']);
