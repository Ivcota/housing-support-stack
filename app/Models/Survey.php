<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

    protected $fillable = [
        'address',
        'file_location',
        'status'
    ];


    function localHousingContact()
    {
        return $this->belongsTo(LocalHousingContact::class);
    }
}
