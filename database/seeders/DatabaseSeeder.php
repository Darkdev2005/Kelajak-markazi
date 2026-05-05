<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\Event;
use App\Models\Program;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@kelajak.uz'],
            [
                'name' => 'Kelajak Admin',
                'phone' => '+998900000001',
                'password' => Hash::make('admin12345'),
                'role' => 'admin',
            ]
        );

        User::query()->updateOrCreate(
            ['email' => 'mentor@kelajak.uz'],
            [
                'name' => 'Mentor User',
                'phone' => '+998900000002',
                'password' => Hash::make('mentor12345'),
                'role' => 'mentor',
            ]
        );

        Program::query()->updateOrCreate(
            ['title' => 'IT va Sun\'iy Intellekt'],
            [
                'description' => 'Frontend, backend, data va AI yo\'nalishlarida amaliy kurslar.',
                'duration' => '6 oy',
                'is_active' => true,
            ]
        );

        Program::query()->updateOrCreate(
            ['title' => 'Xorijiy Tillar'],
            [
                'description' => 'Ingliz tili va xalqaro sertifikatlarga tayyorlov dasturi.',
                'duration' => '4 oy',
                'is_active' => true,
            ]
        );

        Event::query()->updateOrCreate(
            ['title' => 'Kelajak Hackathon'],
            [
                'event_date' => now()->addWeeks(2)->toDateString(),
                'location' => 'Toshkent',
                'description' => 'Jamoaviy texnologik tanlov va demo day.',
            ]
        );

        Announcement::query()->updateOrCreate(
            ['title' => 'Platforma beta ishga tushdi'],
            [
                'body' => 'Yangi modullar: portfolio, ariza boshqaruvi va admin panel faol.',
                'is_pinned' => true,
                'published_at' => now(),
            ]
        );
    }
}