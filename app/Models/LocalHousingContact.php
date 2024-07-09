<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    function projectHousingContact()
    {
        return $this->belongsTo(ProjectHousingContact::class);
    }

    function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }
}
