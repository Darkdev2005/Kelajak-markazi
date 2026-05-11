@extends('layouts.app')

@section('content')
@php($currentTab = $activeTab ?? 'overview')

<section class="admin-tabs reveal">
    <a href="{{ route('dashboard', ['tab' => 'overview']) }}" class="{{ $currentTab === 'overview' ? 'active' : '' }}">Umumiy</a>
    <a href="{{ route('dashboard', ['tab' => 'applications']) }}" class="{{ $currentTab === 'applications' ? 'active' : '' }}">Arizalar</a>
    <a href="{{ route('dashboard', ['tab' => 'portfolio']) }}" class="{{ $currentTab === 'portfolio' ? 'active' : '' }}">Portfolio</a>
    <a href="{{ route('dashboard', ['tab' => 'schedule']) }}" class="{{ $currentTab === 'schedule' ? 'active' : '' }}">Dars jadvali</a>
</section>

@if($currentTab === 'overview')
<section class="dashboard-hero card glow reveal">
    <div>
        <span class="kicker">SHAXSIY MAYDON</span>
        <h1>{{ $user->name }}, bugungi progressni yopamiz</h1>
        <p>{{ $user->email }} | Rol: {{ strtoupper($user->role) }}</p>
    </div>
    <div class="grid three compact">
        <article class="mini-card">
            <strong>{{ $streakDays }} kun</strong>
            <span>Faollik streak</span>
        </article>
        <article class="mini-card">
            <strong>{{ $engagementScore }}%</strong>
            <span>Engagement score</span>
        </article>
        <article class="mini-card">
            <strong>{{ $level }}</strong>
            <span>Joriy daraja</span>
        </article>
    </div>
</section>

<section class="grid two reveal">
    <article class="card">
        <h2>Keyingi Bosqich</h2>
        <div class="progress-wrap">
            <div class="progress-bar"><span style="width: {{ $engagementScore }}%"></span></div>
            <small>100% ga chiqish uchun yana {{ max(0, 100 - $engagementScore) }} ball kerak</small>
        </div>

        <h3>Kunlik Missiyalar</h3>
        <div class="mission-list">
            @foreach($missions as $mission)
                <div class="mission-item {{ $mission['done'] ? 'done' : '' }}">
                    <span>{{ $mission['done'] ? 'Bajarildi' : 'Kutilmoqda' }}</span>
                    <strong>{{ $mission['title'] }}</strong>
                </div>
            @endforeach
        </div>
    </article>

    <article class="card countdown-card">
        <h2>Yaqin Event Countdown</h2>
        @if($nextEvent)
            <h3>{{ $nextEvent->title }}</h3>
            <p>{{ $nextEvent->location }} | {{ $nextEvent->event_date->format('Y-m-d') }}</p>
            <div class="countdown" data-event-date="{{ $nextEvent->event_date->format('Y-m-d') }}">
                <div><strong data-days>0</strong><span>Kun</span></div>
                <div><strong data-hours>0</strong><span>Soat</span></div>
                <div><strong data-minutes>0</strong><span>Daqiqa</span></div>
            </div>
        @else
            <p>Hozircha upcoming event yo'q.</p>
        @endif
    </article>
</section>
@endif

@if($currentTab === 'applications')
<section class="grid two reveal">
    <article class="card">
        <h2>Yangi Ariza</h2>
        <form method="POST" action="{{ route('applications.store') }}" class="form">
            @csrf
            <label>Dastur</label>
            <select name="program_id" required>
                <option value="">Tanlang</option>
                @foreach($programs as $program)
                    <option value="{{ $program->id }}">{{ $program->title }}</option>
                @endforeach
            </select>
            <label>Izoh</label>
            <textarea name="note" rows="3" placeholder="Qiziqishingiz yoki tajribangiz"></textarea>
            <button type="submit" class="btn">Ariza yuborish</button>
        </form>
    </article>

    <article class="card">
        <h2>Mening Arizalarim</h2>
        <table class="table">
            <thead>
            <tr><th>Dastur</th><th>Holat</th><th>Sana</th></tr>
            </thead>
            <tbody>
            @forelse($applications as $app)
                <tr>
                    <td>{{ $app->program->title }}</td>
                    <td>{{ strtoupper($app->status) }}</td>
                    <td>{{ $app->created_at->format('Y-m-d') }}</td>
                </tr>
            @empty
                <tr><td colspan="3">Arizalar yo'q.</td></tr>
            @endforelse
            </tbody>
        </table>
    </article>
</section>
@endif

@if($currentTab === 'portfolio')
<section class="grid two reveal">
    <article class="card">
        <h2>Portfolio Qo'shish</h2>
        <form method="POST" action="{{ route('portfolio.store') }}" class="form">
            @csrf
            <label>Sarlavha</label>
            <input type="text" name="title" required>
            <label>Tavsif</label>
            <textarea name="description" rows="3"></textarea>
            <label>Dalil havolasi</label>
            <input type="url" name="proof_url" placeholder="https://...">
            <label>Sana</label>
            <input type="date" name="achieved_at">
            <button type="submit" class="btn">Qo'shish</button>
        </form>
    </article>

    <article class="card">
        <h2>Portfolio</h2>
        @forelse($portfolioItems as $item)
            <div class="list-item">
                <strong>{{ $item->title }}</strong>
                <p>{{ $item->description }}</p>
                <small>{{ $item->achieved_at?->format('Y-m-d') }} @if($item->proof_url)| <a href="{{ $item->proof_url }}" target="_blank">Havola</a>@endif</small>
            </div>
        @empty
            <p>Portfolio bo'sh.</p>
        @endforelse
    </article>
</section>
@endif

@if($currentTab === 'schedule')
<section class="grid two reveal">
    <article class="card">
        <h2>Mening yaqin jadvalim</h2>
        @forelse($lessonSchedules as $slot)
            <div class="list-item">
                <strong>{{ $slot->program?->title ?? 'Erkin mashg\'ulot' }}</strong>
                <p>{{ $slot->day_label }} | {{ $slot->start_time->format('H:i') }} - {{ $slot->end_time->format('H:i') }} | {{ $slot->room ?? 'Online' }}</p>
            </div>
        @empty
            <p>Dars jadvali topilmadi.</p>
        @endforelse
    </article>

    <article class="card">
        <h2>Tadbirlar</h2>
        @forelse($events as $event)
            <div class="list-item">
                <strong>{{ $event->title }}</strong>
                <p>{{ $event->event_date->format('Y-m-d') }} | {{ $event->location }}</p>
            </div>
        @empty
            <p>Tadbirlar topilmadi.</p>
        @endforelse
    </article>
</section>
@endif
@endsection
