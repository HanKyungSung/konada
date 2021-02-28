<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    use HasFactory;

    public function post(){
        return $this->belongsTo(Post::class);
    }

    public function transaction(){
        return $this->hasOne(Post::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
