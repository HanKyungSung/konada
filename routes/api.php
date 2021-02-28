<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GoogleOAuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
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

Route::prefix('/user/profile/{userId}')->group(function () {
 Route::post('/show', [ProfileController::class, 'show']);
 Route::post('/edit', [ProfileController::class, 'edit']);
});

Route::get('/user/login', [GoogleOAuthController::class, 'obtainOAuthToken']);
Route::get('/auth/google/callback', [GoogleOAuthController::class, 'handleOAuthServerRes']);

Route::prefix('transactions')->group(function () {
 Route::get('/', [TransactionController::class, 'index']);
 Route::get('{transaction:transaction_id}', [TransactionController::class, 'getTransactionDetail']);
 Route::put('{transaction:transaction_id}/update', [TransactionController::class, 'update']);
 Route::delete('{transaction:transaction_id}/delete', [TransactionController::class, 'deleteTransaction']);
 Route::post('{transaction:transaction_id}/create', [TransactionController::class, 'store']);
});

// Post
// Route::middleware('auth:api')->get('/posts', [PostController::class, 'show']);
// Route::middleware('auth:api')->post('/post', [PostController::class, 'creaetPost']);
Route::get('/posts', [PostController::class, 'getPostListByCategory']);
// Route::get('/post/{id}', [PostController::class, 'getPostById']);
// Route::post('/post', [PostController::class, 'creaetPost']);
Route::put('/post/{id}', [PostController::class, 'updatePostById']);
Route::delete('/post/{id}', [PostController::class, 'deletePostById']);
// Route::middleware('auth:api')->post('/post', [PostController::class, 'store']);

Route::prefix('product')->middleware('auth:api')->group(function () {
 Route::post('/', [ProductController::class, 'store']);
 Route::delete('/', [ProductController::class, 'destroy']);
});

Route::prefix('post')->middleware('auth:api')->group(function () {
 Route::get('/index', [PostController::class, 'index']);
 Route::post('/', [PostController::class, 'store']);
});
