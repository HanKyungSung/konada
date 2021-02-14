<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UploadedFile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'user_id', 'post_id', 'product_id', 'path', 'original_name'];

    // Relationships
    public function post() 
    {
        return $this->belongsTo('App\Models\Post');
    }
}
