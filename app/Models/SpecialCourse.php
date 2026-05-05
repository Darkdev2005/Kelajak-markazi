<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpecialCourse extends Model
{
    protected $fillable = [
        'title',
        'category',
        'price',
        'image_url',
        'address',
        'description',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'integer',
    ];
}
