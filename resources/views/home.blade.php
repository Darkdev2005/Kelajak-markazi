@extends('layouts.landing')

@php
    $landingPayload = [
        'logoUrl' => asset('images/kelajak-logo.png'),
        'navLogoUrl' => asset('images/kelajak-logo.png'),
        'heroImageUrl' => asset('images/kelajak-hero-student.webp'),
        'loginUrl' => route('login'),
        'registerUrl' => route('register'),
        'dashboardUrl' => route('dashboard'),
        'isAuthenticated' => auth()->check(),
        'stats' => $statistics,
        'features' => [
            [
                'title' => 'Admin boshqaruvi',
                'text' => 'Dastur, dars jadvali, e\'lon va murojaatlar bitta paneldan nazorat qilinadi.',
                'accent' => 'Platforma',
            ],
            [
                'title' => 'O\'quvchi profili',
                'text' => 'Arizalar, portfolio, qiziqishlar va faoliyat tarixi shaxsiy dashboardda jamlanadi.',
                'accent' => 'Progress',
            ],
            [
                'title' => 'Maxsus katalog',
                'text' => 'Ayrim toifadagi o\'quvchilar uchun narx, manzil va yo\'nalishlar alohida ko\'rinadi.',
                'accent' => 'Imkoniyat',
            ],
        ],
        'directions' => collect($directions)->map(fn ($direction) => [
            'title' => $direction['title'],
            'text' => $direction['text'],
            'meta' => $direction['meta'],
        ])->values(),
        'programs' => $programs->take(6)->map(fn ($program) => [
            'title' => $program->title,
            'description' => $program->description,
            'duration' => $program->duration ?? 'Moslashuvchan',
        ])->values(),
        'clubs' => $programs->map(function ($program) {
            $imageUrl = $program->image_url
                ? (\Illuminate\Support\Str::startsWith($program->image_url, ['http://', 'https://']) ? $program->image_url : asset($program->image_url))
                : asset('images/special-physics.svg');

            return [
                'id' => $program->id,
                'title' => $program->title,
                'description' => $program->description,
                'category' => $program->category ?: 'Umumta\'lim fanlari',
                'clubType' => $program->club_type ?: 'Qo\'shimcha ta\'lim',
                'price' => (int) ($program->price ?? 0),
                'priceText' => number_format((int) ($program->price ?? 0), 0, '.', ' ') . ' so\'m',
                'phone' => $program->phone ?: '+998 (71) 217-18-71',
                'address' => $program->address ?: 'Samarqand viloyati, Kelajak markazi',
                'locationName' => $program->location_name ?: $program->address ?: 'Kelajak Markazi',
                'mapUrl' => $program->map_url ?: 'https://maps.google.com/?q=' . urlencode($program->address ?: 'Samarqand Kelajak Markazi'),
                'imageUrl' => $imageUrl,
            ];
        })->values(),
        'specialCourses' => $specialCourses->take(5)->map(function ($course) {
            $imageUrl = $course->image_url
                ? (\Illuminate\Support\Str::startsWith($course->image_url, ['http://', 'https://']) ? $course->image_url : asset($course->image_url))
                : asset('images/special-school.svg');

            return [
                'title' => $course->title,
                'category' => $course->category,
                'price' => number_format($course->price, 0, '.', ' ') . ' so\'m',
                'imageUrl' => $imageUrl,
                'address' => $course->address,
                'description' => $course->description,
            ];
        })->values(),
        'lessonSchedules' => $lessonSchedules->map(fn ($slot) => [
            'programId' => $slot->program_id,
            'title' => $slot->program?->title ?? 'Erkin mashg\'ulot',
            'time' => $slot->day_label . ' · ' . $slot->start_time->format('H:i'),
            'dayLabel' => $slot->day_label,
            'startTime' => $slot->start_time->format('H:i'),
            'endTime' => $slot->end_time->format('H:i'),
            'mentor' => $slot->mentor ?? 'Mentor belgilanadi',
            'room' => $slot->room,
            'capacity' => $slot->capacity,
            'isOnline' => (bool) $slot->is_online,
        ])->values(),
    ];
@endphp

@section('content')
<div id="premium-kelajak-root">
    <div class="hidden">
        <h1>Kelajak Markazi</h1>
        <p>Ayrim toifadagi o'quvchilar uchun</p>
        @foreach($specialCourses as $course)
            <span>{{ $course->title }}</span>
            <span>{{ number_format($course->price, 0, '.', ' ') }} so'm</span>
            <span>{{ $course->image_url }}</span>
        @endforeach
    </div>
</div>

<script>
    window.__KELAJAK_DATA__ = @json($landingPayload);
</script>
@endsection
