<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lesson_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->nullable()->constrained()->nullOnDelete();
            $table->string('weekday');
            $table->string('day_label');
            $table->time('start_time');
            $table->time('end_time');
            $table->string('room')->nullable();
            $table->string('mentor')->nullable();
            $table->unsignedSmallInteger('capacity')->default(24);
            $table->boolean('is_online')->default(false);
            $table->boolean('is_active')->default(true);
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lesson_schedules');
    }
};
