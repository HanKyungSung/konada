<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    use HasFactory;

    public const STATUS_OPEN = 'open';
    public const STATUS_CLOSE = 'close';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['status', 'user_id', 'written_on', 'content', 'price', 'post_id'];

    public function post(){
        return $this->belongsTo(Post::class);
    }
}
