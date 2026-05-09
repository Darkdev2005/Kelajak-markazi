<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('leadership_members')) {
            return;
        }

        Schema::create('leadership_members', function (Blueprint $table) {
            $table->id();
            $table->string('name', 180);
            $table->string('position', 220);
            $table->string('organization', 220)->nullable();
            $table->text('bio')->nullable();
            $table->text('objective')->nullable();
            $table->string('image_url', 255)->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        // No-op: do not drop table in ensure migration.
    }
};

