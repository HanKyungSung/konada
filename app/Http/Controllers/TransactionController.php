<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\TransactionResource;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $transcations = Transaction::paginate(15);

        // return TransactionResource::collection($transcations);

        $transcations = DB::table('transactions')
                            ->join('bids', 'transactions.bid_id', '=', 'bids.id')
                            ->join('posts', 'bids.post_id', '=', 'posts.id')
                            ->select('*', 'bids.user_id as buyer_id')
                            //TODO:get seller_id from post.user_id
                            ->get();

        return response()->json($transcations);
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

        $transcation = $request->isMethod('put')
            ? Transaction::findOrFail($request->id) : new Transaction;

        $transcation->bid_id = $request->input('bid_id');
        $transcation->status = 0;

        if ($transcation->save()) {
            return new TransactionResource($transcation);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $transcation = Transaction::findOrFail($id);

        if ($transcation->delete()) {
            return new TransactionResource($transcation);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $transcation = Transaction::findOrFail($id);
        if ($transcation->delete()) {
            return new TransactionResource($transcation);
        }
    }
}
