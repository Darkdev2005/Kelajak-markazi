<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('special_courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->unsignedInteger('price')->default(0);
            $table->string('image_url')->nullable();
            $table->text('address');
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('special_courses');
    }
};
