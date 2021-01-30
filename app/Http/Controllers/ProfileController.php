<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $user = User::findOrFail($user);

        return response();
    }

    public function edit(Request $request)
    {
        
        return response($request);
    }
}
