<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Log;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::get();

        return response($posts);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'item_name' => 'required|string',
            'price' => 'required|numeric',
            'location' => 'required|string'
        ]);

        $post = DB::transaction(function() use ($validatedData) {
            $user = \Auth::user();

            $product = Product::create([
                'name' => $validatedData['item_name'],
                'price' => $validatedData['price']
            ]);

            $post = Post::create([
                'status' => Post::STATUS_ACTIVE,
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'location' => $validatedData['location'],
                'product_id' => $product->id,
                'user_id' => $user->id
            ]);

            return $post;
        });

        return response($post);
    }

    public function getPostsByCategory(Request $request)
    {
        $posts = Post::where('category_id',$request->category)->with('category')->get();

        return response($posts);
    }

    public function getPostById(Request $request)
    {
        $post = Post::with('bids')->find($request->id);
        return response($post);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //
    }
}
