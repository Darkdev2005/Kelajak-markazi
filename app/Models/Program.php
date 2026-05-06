<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $fillable = [
        'title',
        'description',
        'category',
        'club_type',
        'duration',
        'price',
        'phone',
        'address',
        'location_name',
        'map_url',
        'image_url',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'integer',
        'sort_order' => 'integer',
    ];

    public function applications(): HasMany
    {
        return $this->hasMany(ApplicationRequest::class);
    }

    public function lessonSchedules(): HasMany
    {
        return $this->hasMany(LessonSchedule::class);
    }
}
