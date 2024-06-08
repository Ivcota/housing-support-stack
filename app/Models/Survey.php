<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

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
}
