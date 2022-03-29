<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'user_id', 'description', 'completed', 'category_id'
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
