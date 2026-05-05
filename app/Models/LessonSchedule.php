<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LessonSchedule extends Model
{
    protected $fillable = [
        'program_id',
        'weekday',
        'day_label',
        'start_time',
        'end_time',
        'room',
        'mentor',
        'capacity',
        'is_online',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_online' => 'boolean',
        'is_active' => 'boolean',
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
    ];

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }
}
