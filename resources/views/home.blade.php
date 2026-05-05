@extends('layouts.app')

@section('content')
<section class="route-tabs reveal">
    <a href="#/home" data-route-link="home">Home</a>
    <a href="#/about-us" data-route-link="about-us">About</a>
    <a href="#/courses" data-route-link="courses">Courses</a>
    <a href="#/events" data-route-link="events">Events</a>
    <a href="#/announcements" data-route-link="announcements">Announcements</a>
    @guest
        <a href="#/auth/login" data-route-link="auth/login">Login</a>
        <a href="#/auth/register" data-route-link="auth/register">Register</a>
    @else
        <a href="#/dashboard" data-route-link="dashboard">Dashboard</a>
        @if(auth()->user()->isAdmin())
            <a href="#/admin" data-route-link="admin">Admin</a>
        @endif
    @endguest
</section>

<section class="route-view" data-route-view="home">
    <section class="hero reveal">
        <div class="hero-grid">
            <div>
                <span class="kicker">KELAJAK MARKAZI 2.0</span>
                <h1>Ta'limni platformaga emas, tajribaga aylantiramiz</h1>
                <p>Har bir o'quvchi uchun portfolio, progress, mentor aloqasi va real natijaga olib boruvchi raqamli yo'l xaritasi.</p>
                <div class="row gap wrap">
                    @guest
                        <a href="#/auth/register" class="btn">Hoziroq Boshlash</a>
                        <a href="#/auth/login" class="btn ghost">Kirish</a>
                    @else
                        <a href="#/dashboard" class="btn">Mening Dashboardim</a>
                    @endguest
                </div>
            </div>
            <div class="hero-panel card glow">
                <h3>Platforma Ritmi</h3>
                <div class="stat-stack">
                    <div><strong>{{ $programs->count() }}</strong><span>Faol yo'nalish</span></div>
                    <div><strong>{{ $events->count() }}</strong><span>Yaqin tadbir</span></div>
                    <div><strong>{{ $announcements->count() }}</strong><span>Yangi e'lon</span></div>
                </div>
            </div>
        </div>
    </section>
</section>

<section class="route-view" data-route-view="about-us">
    <section class="reveal">
        <h2>Biz Haqimizda</h2>
        <div class="grid three feature-grid">
            <article class="card feature">
                <h3>Progress Engine</h3>
                <p>Har bir harakat scorega aylanadi va o'quvchini keyingi bosqichga olib chiqadi.</p>
            </article>
            <article class="card feature">
                <h3>Live Opportunity Feed</h3>
                <p>Dastur, tadbir va e'lonlar bitta oqimda yangilanadi, foydalanuvchi platformada qoladi.</p>
            </article>
            <article class="card feature">
                <h3>Proof-based Portfolio</h3>
                <p>Yutuqlarni havola va sana bilan jamlab, real growth tarixini yaratadi.</p>
            </article>
        </div>
    </section>
</section>

<section class="route-view" data-route-view="courses">
    <section class="reveal">
        <h2>Yo'nalishlar</h2>
        <div class="grid three">
            @forelse($programs as $program)
                <article class="card course-card">
                    <h3>{{ $program->title }}</h3>
                    <p>{{ $program->description }}</p>
                    <small>{{ $program->duration ?? 'Muddat aniqlanadi' }}</small>
                </article>
            @empty
                <p>Hozircha dasturlar yo'q.</p>
            @endforelse
        </div>
    </section>
</section>

<section class="route-view" data-route-view="events">
    <section class="reveal">
        <h2>Tadbirlar Radari</h2>
        <div class="grid two">
            @forelse($events as $event)
                <article class="card event-card">
                    <h3>{{ $event->title }}</h3>
                    <p>{{ $event->description }}</p>
                    <small>{{ $event->event_date->format('Y-m-d') }} | {{ $event->location }}</small>
                </article>
            @empty
                <p>Tadbirlar kiritilmagan.</p>
            @endforelse
        </div>
    </section>
</section>

<section class="route-view" data-route-view="announcements">
    <section class="reveal">
        <h2>Yangiliklar</h2>
        <div class="grid two">
            @forelse($announcements as $announcement)
                <article class="card notice-card">
                    <h3>{{ $announcement->title }} @if($announcement->is_pinned)<span class="pill">TOP</span>@endif</h3>
                    <p>{{ $announcement->body }}</p>
                    <small>{{ optional($announcement->published_at)->format('Y-m-d H:i') }}</small>
                </article>
            @empty
                <p>E'lonlar mavjud emas.</p>
            @endforelse
        </div>
    </section>
</section>

<section class="route-view" data-route-view="not-found">
    <article class="card reveal">
        <h2>Route Topilmadi</h2>
        <p>Bu bo'lim mavjud emas. <a href="#/home">Bosh sahifaga qaytish</a>.</p>
    </article>
</section>
@endsection