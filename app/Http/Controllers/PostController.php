<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Product;
use Illuminate\Http\File;
use App\Models\UploadedFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::with(['product', 'uploaded_files:post_id,path'])->orderBy('id', 'desc')->get();

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
        // push with out file upload.
        $validatedData = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'product_id' => 'required|exists:products,id',
            'location' => 'required|string'
        ]);

        $post = DB::transaction(function () use ($request, $validatedData){

            $user = \Auth::user();

            $post = Post::create([
                'status' => Post::STATUS_ACTIVE,
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'location' => $validatedData['location'],
                'product_id' => $validatedData['product_id'],
                'user_id' => $user->id
            ]);

            $path = $request->file('file')->store('files', ['disk' => 'public_uploads']);
            $originalFileName = $request->file('file')->getClientOriginalName();

            $uploadedFile = UploadedFile::create([
                'user_id' => $user->id,
                'post_id' => $post->id,
                'product_id' => $validatedData['product_id'],
                'path' => $path,
                'original_name' => $originalFileName
            ]);

            return $post;
        });

        // eager load
        $post->product;
        $post->uploaded_files;

        return response($post);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        //
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
