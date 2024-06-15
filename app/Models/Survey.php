<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Survey extends Model
{
    use HasFactory;
    use Searchable;

    protected $fillable = [
        'local_housing_contact_id',
        'address',
        'file_location',
        'status'
    ];


    function localHousingContact()
    {
        return $this->belongsTo(LocalHousingContact::class);
    }

    function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
