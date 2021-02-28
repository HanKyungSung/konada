<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'price', 'post_id'];

    // Relationship
    public function post()
    {
        return $this->hasOne('App\Models\Post', 'id');
    }

    public function uploaded_files()
    {
        return $this->hasMany('App\Models\UploadedFile');
    }
}
