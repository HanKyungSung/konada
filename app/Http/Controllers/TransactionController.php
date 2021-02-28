<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\TransactionResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (
                $request
                ->user()
                ->unique_id == $request->route('transaction')
                ->user_id
            ) {
                return $next($request);
            } else {
                return response("Not Authorized", 419);
            }
        });
    }

    public function index()
    {
        $user_id = Auth::user()->unique_id;
        $transcations = Transaction::where('user_id', $user_id)
                        ->join('bids', 'transactions.bid_id', '=', 'bids.id')
                        ->join('posts', 'bids.post_id', '=', 'posts.id')
                        ->select('*', 'bids.user_id as buyer_id')
                        //TODO:get seller_id from post.user_id
                        ->paginate(15)
                        ->get();

        return response()->json(['status' => 200, 'message'=>'request successfully processed', 'data' => $transcations]);
    }

    public function store(Request $request, Transaction $transaction)
    {
        // $transcation = $request->isMethod('post')
        //     ? Transaction::findOrFail($request->id) : new Transaction;

        $transaction->bid_id = $request->input('bid_id');
        $transaction->status = 1;

        if ($transaction->save()) {
            return new TransactionResource($transaction);
        }
        //TODO: Exception handling the result of gettng data from DB 
    }

  
    public function getTransactionDetail(Request $request, Transaction $transaction)
    {
        $user_id = Auth::user()->unique_id;
        $result = $transaction::where($request->id)->user($user_id);

        return response()->json(['status' => 200, 'message'=>'request successfully processed', 'data' => $result]);
    }

    public function update(Request $request, $id)
    {
        // TODO:HENDRIK: Need to discuss about updating contents. Notice to buyer / get agreement by buyer etc
    }

    public function deleteTransaction($id)
    {
        $transcation = Transaction::findOrFail($id);
        if ($transcation->delete()) {
            return response()->json([
                'status' => 200,
                'message' => 'Transaction deleted'
            ]);
        }
    }
}
