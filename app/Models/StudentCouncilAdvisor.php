<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentCouncilAdvisor extends Model
{
    protected $fillable = [
        'full_name',
        'title',
        'description',
        'image_url',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}

