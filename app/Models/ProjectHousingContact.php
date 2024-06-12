<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectHousingContact extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function localHousingContact()
    {
        return $this->hasMany(LocalHousingContact::class);
    }
}
