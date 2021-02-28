<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\UploadedFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            'item_name' => 'required|string',
            'price' => 'required|numeric',
            'post_id' => 'required|exists:posts,id'
        ]);


        $product = DB::transaction(function () use ($request, $validatedData){

            $user = \Auth::user();

            $product = Product::create([
                'name' => $validatedData['item_name'],
                'price' => $validatedData['price'],
                'post_id' => $validatedData['post_id']
            ]);

            $path = $request->file('file')->store('files', ['disk' => 'public_uploads']);
            $originalFileName = $request->file('file')->getClientOriginalName();

            $uploadedFile = UploadedFile::create([
                'user_id' => $user->id,
                'post_id' => $validatedData['post_id'],
                'product_id' => $product->id,
                'path' => $path,
                'original_name' => $originalFileName
            ]);

            return $product;
        });
        
        $product->uploaded_files;

        return $product;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Product $product)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        $productId = $validatedData['product_id'];

        $product = Product::find($productId);
        $product->delete();

        return $productId;
    }
}
