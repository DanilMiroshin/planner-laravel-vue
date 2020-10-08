<?php

namespace App;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'user_id', 'description', 'completed'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
