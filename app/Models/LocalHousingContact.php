<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocalHousingContact extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'congregation',
    ];


    function user()
    {
        return $this->belongsTo(User::class);
    }

    function survey()
    {
        return $this->hasMany(Survey::class);
    }
}
