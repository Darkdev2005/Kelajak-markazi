<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentCouncilMember extends Model
{
    protected $fillable = [
        'full_name',
        'achievement',
        'image_url',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}

