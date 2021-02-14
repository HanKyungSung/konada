<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    public const STATUS_ACTIVE = 'active';

    public const STATUS_PENDING = 'pending';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'product_id', 'status', 'title', 'description', 'location'];

    // Relationships
    public function product()
    {
        return $this->hasOne('App\Models\Product', 'id', 'product_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }
    
    public function uploaded_files()
    {
        return $this->hasMany('App\Models\UploadedFile');
    }
}
