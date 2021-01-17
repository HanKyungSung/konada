<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\ApiAuthController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    Route::post('/logout', [ApiAuthController::class, 'logout'])->name('logout.api');
});

Route::group(['middleware' => ['cors', 'json.response']], function () {
    // public routes
    Route::post('/login', [ApiAuthController::class, 'login'])->name('login.api');
    Route::post('/register', [ApiAuthController::class, 'register'])->name('register.api');
});