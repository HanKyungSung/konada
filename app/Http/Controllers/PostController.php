<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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
                    'user_id' => 1, //TODO:HENDRIK change valid user Id
                    'category_id' => 1, //TODO:HENDRIK change valid user Id
                    'status' => 0,
                    'title' => $validatedData['title'],
                    'description' => $validatedData['description'],
                    'created_at' => Carbon::now()
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
                    'description' => $validatedData['description'],
                    'updated_at' => Carbon::now()
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

    public function createBid(Request $request)
    {
        $user          = \Auth::user();
        // $userId = $user->id;
        // $postId = $request->postId;
        $validatedData = $request->validate([
            'content' => 'required|string',
            'price' => 'required|numeric|between:0,99.99'
        ]);

        $res = DB::table('bids')
            ->insert(
                [
                    'user_id' => 1, //TODO:HENDRIK change valid user Id
                    'post_id' => 5, //TODO:HENDRIK change valid user Id
                    'status' => 0,
                    'content' => $validatedData['content'],
                    'price' => $validatedData['price'],
                    'created_at' => Carbon::now()
                ]
            );
        if ($res) {
            $data = [
                'status' => 200,
                'msg'    => 'create bid success',
            ];
        } else {
            $data = [
                'status' => 404,
                'msg'    => 'create bid failed',
            ];
        }
        return response()->json($data);
    }

    public function updateBidById(Request $request, $bidId)
    {
        $user          = \Auth::user();
        // $userId = $user->id;
        // $postId = $request->postId;
        $validatedData = $request->validate([
            'content' => 'required|string',
            'price' => 'required|numeric|between:0,999.99'
        ]);

        $res = DB::table('bids')
            ->where('id', $bidId)
            ->update(
                [
                    'user_id' => 1, //TODO:HENDRIK change valid user Id
                    'post_id' => 5, //TODO:HENDRIK change valid user Id
                    'status' => 0,
                    'content' => $validatedData['content'],
                    'price' => $validatedData['price'],
                    'updated_at' => Carbon::now()
                ]
            );
        if ($res) {
            $data = [
                'status' => 200,
                'msg'    => 'update bid success',
            ];
        } else {
            $data = [
                'status' => 404,
                'msg'    => 'update bid failed',
            ];
        }
        return response()->json($data);
    }
}
