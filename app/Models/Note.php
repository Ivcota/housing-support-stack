<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'local_housing_contact_id',
        'user_id',
        'note',
    ];


    public function localHousingContact(): BelongsTo
    {
        return $this->belongsTo(LocalHousingContact::class);
    }
}
