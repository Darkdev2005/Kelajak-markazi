<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('programs', function (Blueprint $table) {
            $table->string('category')->nullable()->after('description');
            $table->string('club_type')->nullable()->after('category');
            $table->unsignedInteger('price')->default(0)->after('duration');
            $table->string('phone', 40)->nullable()->after('price');
            $table->text('address')->nullable()->after('phone');
            $table->string('location_name')->nullable()->after('address');
            $table->string('map_url', 500)->nullable()->after('location_name');
            $table->string('image_url')->nullable()->after('map_url');
            $table->unsignedSmallInteger('sort_order')->default(0)->after('is_active');
        });
    }

    public function down(): void
    {
        Schema::table('programs', function (Blueprint $table) {
            $table->dropColumn([
                'category',
                'club_type',
                'price',
                'phone',
                'address',
                'location_name',
                'map_url',
                'image_url',
                'sort_order',
            ]);
        });
    }
};
