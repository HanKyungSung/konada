<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class AuthController extends Controller
{
	public function register(Request $request)
	{
		$validatedData = $request->validate([
			'name' => 'required|max:25',
			'username' => 'required|max:10',
			'address' => '',
			'phone_number' => 'numeric',
			'email' => 'required|email|unique:users',
			'password' => 'required|confirmed',
		]);
		// TODO: complete the validation.

		$validatedData['password'] = bcrypt($request->password);

		$user = User::create($validatedData);

		$accessToken = $user->createToken('authToken')->accessToken;
		$userInfo = $user;
		$userInfo -> token = $accessToken; 

		return response($userInfo);
	}

	public function login(Request $request)
	{
		$loginData = $request->validate([
			'email' => 'required|email',
			'password' => 'required',
		]);

		if(!auth()->attempt($loginData)){
			return response(['message'=>'Invalid credentials']);
		}

		$accessToken = auth()->user()->createToken('authToken')->accessToken;
		$userInfo = auth()->user();
		$userInfo -> token = $accessToken;

		return response($userInfo);
	}
}