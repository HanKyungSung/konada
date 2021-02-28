<?php

namespace App\Http\Controllers;

use App\Models\Category;
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
            'location' => 'required|string'
        ]);

        $post = DB::transaction(function () use ($request, $validatedData){

            $user = \Auth::user();

            $post = Post::create([
                'status' => Post::STATUS_ACTIVE,
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'location' => $validatedData['location'],
                // 'product_id' => $validatedData['product_id'],
                'user_id' => $user->id
            ]);

            // $path = $request->file('file')->store('files', ['disk' => 'public_uploads']);
            // $originalFileName = $request->file('file')->getClientOriginalName();

            // $uploadedFile = UploadedFile::create([
            //     'user_id' => $user->id,
            //     'post_id' => $post->id,
            //     'product_id' => $validatedData['product_id'],
            //     'path' => $path,
            //     'original_name' => $originalFileName
            // ]);

            return $post;
        });

        // eager load
        // $post->product;
        // $post->uploaded_files;

        return response($post);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Post $post)
    {
        $validatedData = $request->validate([
            'post_id' => 'required|exists:posts,id'
        ]);

        $postId = $validatedData['post_id'];

        $post = Post::find($postId);
        $post->delete();

        return $postId;
    }

    //TODO:HENDRIK: Seperate item create post and create product procedure
    public function creaetPost(Request $request)
    {
        // $validatedData = $request->validate([
        //     'title'       => 'required|string',
        //     'description' => 'required|string',
        //     // 'item_name' => 'required|string',
        //     // 'price' => 'required|numeric',
        //     // 'location' => 'required|string'
        // ]);

        // $post = DB::posts(function () use ($validatedData) {
        //     $user = \Auth::user();

        //     // $product = Product::create([
        //     //     'name' => $validatedData['item_name'],
        //     //     'price' => $validatedData['price']
        //     // ]);

        //     $post = Post::create([
        //         'status'      => Post::STATUS_ACTIVE,
        //         'title'       => $validatedData['title'],
        //         'description' => $validatedData['description'],
        //         'user_id'     => 1,
        //         // 'user_id'     => $user->id,
        //         // 'location' => $validatedData['location'],
        //         // 'product_id' => $product->id,
        //     ]);

        //     return $post;
        // });

        // return response($post);

        $user          = \Auth::user();
        $validatedData = $request->validate([
            'title'       => 'required|string',
            'description' => 'required|string',
        ]);

        $res = DB::table('posts')
            ->insert(
                [
                    'user_id' => 1,
                    'category_id' => 1,
                    'status' => 0,
                    'title' => $validatedData['title'],
                    'description' => $validatedData['description']
                ]
            );

        if ($res) {
            $data = [
                'status' => 200,
                'msg'    => 'create post success',
            ];
        } else {
            $data = [
                'status' => 404,
                'msg'    => 'create post failed',
            ];
        }
        return response()->json($data);
    }

    public function updatePostById(Request $request, $postId)
    {
        $user          = \Auth::user();
        $validatedData = $request->validate([
            'title'       => 'required|string',
            'description' => 'required|string',
        ]);

        $res = DB::table('posts')
            // ->where('user_id', $user->id)
            ->where('id', $postId)
            ->update(
                [
                    'category_id' => 1,
                    'status' => 0,
                    'title' => $validatedData['title'],
                    'description' => $validatedData['description']
                ]
            );

        if ($res) {
            $data = [
                'status' => 200,
                'msg'    => 'update post success',
            ];
        } else {
            $data = [
                'status' => 404,
                'msg'    => 'update post failed',
            ];
        }
        return response()->json($data);
    }

    public function getPostListByCategory(Request $request)
    {
        $posts = Post::where('category_id', $request->category)->with('category')->get();

        return response($posts);
    }

    public function getPostById(Request $request)
    {
        $post = Post::with('bids')->find($request->id);
        return response($post);
    }

    public function deletePostById($postId)
    {
        $res = Post::findOrFail($postId);
        $res->bids()->delete();
        $res->delete();

        if ($res) {
            $data = [
                'status' => 200,
                'msg'    => 'delete post success',
            ];
        } else {
            $data = [
                'status' => 404,
                'msg'    => 'delete post failed',
            ];
        }
        return response()->json($data);
    }
}
