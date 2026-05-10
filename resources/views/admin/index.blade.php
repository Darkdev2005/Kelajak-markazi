@extends('layouts.app')

@section('content')
@php($section = $activeSection ?? 'programs')
<section class="dashboard-hero card glow reveal">
    <div>
        <span class="eyebrow">Admin markaz</span>
        <h1>Boshqaruv paneli</h1>
        <p>Dastur, maxsus katalog, dars jadvali, tadbir, yangilik, ariza va murojaatlar to'liq shu yerdan boshqariladi.</p>
    </div>
    <div class="grid three compact">
        <article class="mini-card"><strong>{{ $stats['users'] }}</strong><span>Foydalanuvchi</span></article>
        <article class="mini-card"><strong>{{ $stats['programs'] }}</strong><span>Dastur</span></article>
        <article class="mini-card"><strong>{{ $stats['lessons'] }}</strong><span>Dars sloti</span></article>
        <article class="mini-card"><strong>{{ $stats['special_courses'] }}</strong><span>Maxsus katalog</span></article>
        <article class="mini-card"><strong>{{ $stats['leadership_members'] }}</strong><span>Rahbariyat</span></article>
        <article class="mini-card"><strong>{{ $stats['events'] }}</strong><span>Tadbir</span></article>
        <article class="mini-card"><strong>{{ $stats['announcements'] }}</strong><span>Yangilik</span></article>
        <article class="mini-card"><strong>{{ $stats['student_council_members'] ?? 0 }}</strong><span>O'quvchilar kengashi</span></article>
        <article class="mini-card"><strong>{{ $stats['contacts'] }}</strong><span>Yangi murojaat</span></article>
    </div>
</section>

<section class="admin-tabs reveal">
    <a href="{{ route('admin.index', ['section' => 'programs']) }}" class="{{ $section === 'programs' ? 'active' : '' }}">Dasturlar</a>
    <a href="{{ route('admin.index', ['section' => 'special']) }}" class="{{ $section === 'special' ? 'active' : '' }}">Maxsus katalog</a>
    <a href="{{ route('admin.index', ['section' => 'lessons']) }}" class="{{ $section === 'lessons' ? 'active' : '' }}">Dars jadvali</a>
    <a href="{{ route('admin.index', ['section' => 'events']) }}" class="{{ $section === 'events' ? 'active' : '' }}">Tadbirlar</a>
    <a href="{{ route('admin.index', ['section' => 'announcements']) }}" class="{{ $section === 'announcements' ? 'active' : '' }}">Yangiliklar</a>
    <a href="{{ route('admin.index', ['section' => 'leadership']) }}" class="{{ $section === 'leadership' ? 'active' : '' }}">Rahbariyat</a>
    <a href="{{ route('admin.index', ['section' => 'student-council']) }}" class="{{ $section === 'student-council' ? 'active' : '' }}">O'quvchilar kengashi</a>
    <a href="{{ route('admin.index', ['section' => 'requests']) }}" class="{{ $section === 'requests' ? 'active' : '' }}">Arizalar</a>
    <a href="{{ route('admin.index', ['section' => 'contacts']) }}" class="{{ $section === 'contacts' ? 'active' : '' }}">Murojaatlar</a>
</section>

@if(in_array($section, ['programs', 'events', 'special', 'announcements'], true))
<section class="grid three section-block reveal">
    @if($section === 'programs')
    <article class="card">
        <h2>To'garak qo'shish</h2>
        <form method="POST" action="{{ route('admin.programs.store') }}" class="form" enctype="multipart/form-data">
            @csrf
            <label>Nomi</label>
            <input type="text" name="title" required placeholder="Matematika">
            <div class="grid two compact">
                <div>
                    <label>Yo'nalish</label>
                    <input type="text" name="category" placeholder="Umumta'lim fanlari">
                </div>
                <div>
                    <label>To'garak turi</label>
                    <input type="text" name="club_type" placeholder="Qo'shimcha ta'lim">
                </div>
            </div>
            <label>Tavsif</label>
            <textarea name="description" rows="3" required placeholder="Dars mazmuni va afzalliklari"></textarea>
            <div class="grid two compact">
                <div>
                    <label>Narx</label>
                    <input type="number" name="price" min="0" value="330000">
                </div>
                <div>
                    <label>Muddati</label>
                    <input type="text" name="duration" placeholder="6 oy">
                </div>
                <div>
                    <label>Telefon</label>
                    <input type="text" name="phone" placeholder="+998 90 123 45 67">
                </div>
                <div>
                    <label>Tartib</label>
                    <input type="number" name="sort_order" min="0" value="0">
                </div>
            </div>
            <label>Manzil</label>
            <textarea name="address" rows="2" placeholder="Viloyat, tuman, ko'cha va bino"></textarea>
            <label>Joylashuv nomi</label>
            <input type="text" name="location_name" placeholder="Maktab yoki markaz nomi">
            <label>Xarita havolasi</label>
            <input type="url" name="map_url" placeholder="https://maps.google.com/...">
            <label>Rasm yuklash</label>
            <input type="file" name="image" accept="image/*">
            <label>Yoki rasm yo'li/URL</label>
            <input type="text" name="image_url" placeholder="images/programs/math.jpg">
            <label class="row gap"><input type="checkbox" value="1" name="is_active" checked> Saytda ko'rinsin</label>
            <button class="btn" type="submit">To'garakni saqlash</button>
        </form>
    </article>
    @endif

    @if($section === 'events')
    <article class="card">
        <h2>Tadbir qo'shish</h2>
        <form method="POST" action="{{ route('admin.events.store') }}" class="form">
            @csrf
            <label>Nomi</label>
            <input type="text" name="title" required>
            <label>Sana</label>
            <input type="date" name="event_date" required>
            <label>Manzil</label>
            <input type="text" name="location" required>
            <label>Tavsif</label>
            <textarea name="description" rows="3"></textarea>
            <button class="btn" type="submit">Saqlash</button>
        </form>
    </article>
    @endif

    @if($section === 'special')
    <article class="card">
        <h2>Maxsus katalog qo'shish</h2>
        <form method="POST" action="{{ route('admin.special-courses.store') }}" class="form">
            @csrf
            <label>Nomi</label>
            <input type="text" name="title" required placeholder="Fizika">
            <label>Toifa</label>
            <input type="text" name="category" required placeholder="Umumta'lim fanlari">
            <div class="grid two compact">
                <div>
                    <label>Narx</label>
                    <input type="number" name="price" min="0" value="200000" required>
                </div>
                <div>
                    <label>Tartib</label>
                    <input type="number" name="sort_order" min="0" value="0">
                </div>
            </div>
            <label>Rasm yo'li yoki URL</label>
            <input type="text" name="image_url" placeholder="images/special-physics.svg">
            <label>Manzil</label>
            <textarea name="address" rows="2" required></textarea>
            <label>Tavsif</label>
            <textarea name="description" rows="3"></textarea>
            <label class="row gap"><input type="checkbox" value="1" name="is_active" checked> Saytda ko'rinsin</label>
            <button class="btn" type="submit">Katalogga qo'shish</button>
        </form>
    </article>
    @endif

    @if($section === 'announcements')
    <article class="card">
        <h2>Yangilik joylash</h2>
        <form method="POST" action="{{ route('admin.announcements.store') }}" class="form" enctype="multipart/form-data">
            @csrf
            <label>Sarlavha</label>
            <input type="text" name="title" required>
            <label>Matn</label>
            <textarea name="body" rows="4" required></textarea>
            <label>Rasm yuklash</label>
            <input type="file" name="image" accept="image/*">
            <label>Yoki rasm yo'li/URL</label>
            <input type="text" name="image_url" placeholder="images/announcements/news.jpg">
            <label class="row gap"><input type="checkbox" value="1" name="is_pinned"> Muhim yangilik</label>
            <button class="btn" type="submit">Joylash</button>
        </form>
    </article>
    @endif
</section>
@endif

@if($section === 'student-council')
<section class="grid two section-block reveal" id="admin-student-council">
    <article class="card">
        <h2>O'quvchilar kengashi maslahatchisi</h2>
        <form method="POST" action="{{ route('admin.student-council-advisor.upsert') }}" class="form" enctype="multipart/form-data">
            @csrf
            <label>Ism familiya</label>
            <input type="text" name="full_name" value="{{ $studentCouncilAdvisor->full_name ?? '' }}" required>
            <label>Lavozim</label>
            <input type="text" name="title" value="{{ $studentCouncilAdvisor->title ?? 'Maslahatchi haqida' }}">
            <label>Ma'lumot</label>
            <textarea name="description" rows="4">{{ $studentCouncilAdvisor->description ?? '' }}</textarea>
            <div class="grid two compact">
                <div>
                    <label>Rasm yuklash</label>
                    <input type="file" name="image" accept="image/*">
                </div>
                <div>
                    <label>Yoki rasm yo'li/URL</label>
                    <input type="text" name="image_url" value="{{ $studentCouncilAdvisor->image_url ?? '' }}" placeholder="images/student-council/advisor.jpg">
                </div>
            </div>
            <label class="row gap"><input type="checkbox" value="1" name="is_active" @checked(($studentCouncilAdvisor->is_active ?? true))> Saytda ko'rinsin</label>
            <button class="btn" type="submit">Maslahatchini saqlash</button>
        </form>
    </article>

    <article class="card">
        <h2>O'quvchilar kengashi a'zosini qo'shish</h2>
        <form method="POST" action="{{ route('admin.student-council-members.store') }}" class="form" enctype="multipart/form-data">
            @csrf
            <label>Ism familiya</label>
            <input type="text" name="full_name" required>
            <label>Qilgan ishlari</label>
            <textarea name="achievement" rows="4" required></textarea>
            <div class="grid two compact">
                <div>
                    <label>Rasm yuklash</label>
                    <input type="file" name="image" accept="image/*">
                </div>
                <div>
                    <label>Tartib</label>
                    <input type="number" name="sort_order" min="0" value="0">
                </div>
            </div>
            <label>Yoki rasm yo'li/URL</label>
            <input type="text" name="image_url" placeholder="images/student-council/member.jpg">
            <label class="row gap"><input type="checkbox" value="1" name="is_active" checked> Saytda ko'rinsin</label>
            <button class="btn" type="submit">Saqlash</button>
        </form>
    </article>

    <article class="card">
        <h2>O'quvchilar kengashini boshqarish</h2>
        <div class="resource-list">
            @forelse($studentCouncilMembers as $member)
                <details class="resource-item">
                    <summary>
                        <span>
                            <strong>{{ $member->full_name }}</strong>
                            <small>{{ \Illuminate\Support\Str::limit($member->achievement, 80) }}</small>
                        </span>
                        <em>{{ $member->is_active ? 'Faol' : 'Yopiq' }}</em>
                    </summary>
                    @if($member->image_url)
                        <img class="admin-preview" src="{{ \Illuminate\Support\Str::startsWith($member->image_url, ['http://', 'https://']) ? $member->image_url : asset($member->image_url) }}" alt="{{ $member->full_name }}">
                    @endif
                    <form method="POST" action="{{ route('admin.student-council-members.update', $member) }}" class="form edit-form" enctype="multipart/form-data">
                        @csrf
                        @method('PATCH')
                        <label>Ism familiya</label>
                        <input type="text" name="full_name" value="{{ $member->full_name }}" required>
                        <label>Qilgan ishlari</label>
                        <textarea name="achievement" rows="4" required>{{ $member->achievement }}</textarea>
                        <div class="grid two compact">
                            <div>
                                <label>Yangi rasm yuklash</label>
                                <input type="file" name="image" accept="image/*">
                            </div>
                            <div>
                                <label>Tartib</label>
                                <input type="number" name="sort_order" min="0" value="{{ $member->sort_order }}">
                            </div>
                        </div>
                        <label>Rasm yo'li yoki URL</label>
                        <input type="text" name="image_url" value="{{ $member->image_url }}">
                        <label class="row gap"><input type="checkbox" value="1" name="is_active" @checked($member->is_active)> Saytda ko'rinsin</label>
                        <button class="btn" type="submit">Yangilash</button>
                    </form>
                    <form method="POST" action="{{ route('admin.student-council-members.destroy', $member) }}" class="delete-form">
                        @csrf
                        @method('DELETE')
                        <button class="btn danger" type="submit">O'chirish</button>
                    </form>
                </details>
            @empty
                <p>O'quvchilar kengashi ma'lumotlari yo'q.</p>
            @endforelse
        </div>
    </article>
</section>
@endif

@if($section === 'leadership')
<section class="grid two section-block reveal" id="admin-leadership">
    <article class="card">
        <h2>Rahbariyat qo'shish</h2>
        <form method="POST" action="{{ route('admin.leadership-members.store') }}" class="form" enctype="multipart/form-data">
            @csrf
            <label>F.I.Sh</label>
            <input type="text" name="name" required placeholder="Ism Familiya">
            <label>Lavozim</label>
            <input type="text" name="position" required placeholder="Maktab direktori">
            <label>Xodim ma'lumoti</label>
            <textarea name="employee_info" rows="4" placeholder="Qisqacha ma'lumot"></textarea>
            <label>Mehnat faoliyati</label>
            <textarea name="work_activity" rows="5" placeholder="Mehnat faoliyati ma'lumoti"></textarea>
            <div class="grid two compact">
                <div>
                    <label>Rasm yuklash</label>
                    <input type="file" name="image" accept="image/*">
                </div>
                <div>
                    <label>Tartib</label>
                    <input type="number" name="sort_order" min="0" value="0">
                </div>
            </div>
            <label>Yoki rasm yo'li/URL</label>
            <input type="text" name="image_url" placeholder="images/leadership/director.jpg">
            <label class="row gap"><input type="checkbox" value="1" name="is_active" checked> Saytda ko'rinsin</label>
            <button class="btn" type="submit">Rahbariyatga qo'shish</button>
        </form>
    </article>

    <article class="card">
        <h2>Rahbariyatni boshqarish</h2>
        <div class="resource-list">
            @forelse($leadershipMembers as $member)
                <details class="resource-item">
                    <summary>
                        <span>
                            <strong>{{ $member->name }}</strong>
                            <small>{{ $member->position }}</small>
                        </span>
                        <em>{{ $member->is_active ? 'Faol' : 'Yopiq' }}</em>
                    </summary>
                    @if($member->image_url)
                        <img class="admin-preview" src="{{ \Illuminate\Support\Str::startsWith($member->image_url, ['http://', 'https://']) ? $member->image_url : asset($member->image_url) }}" alt="{{ $member->name }}">
                    @endif
                    <form method="POST" action="{{ route('admin.leadership-members.update', $member) }}" class="form edit-form" enctype="multipart/form-data">
                        @csrf
                        @method('PATCH')
                        <label>F.I.Sh</label>
                        <input type="text" name="name" value="{{ $member->name }}" required>
                        <label>Lavozim</label>
                        <input type="text" name="position" value="{{ $member->position }}" required>
                        <label>Xodim ma'lumoti</label>
                        <textarea name="employee_info" rows="4">{{ $member->bio }}</textarea>
                        <label>Mehnat faoliyati</label>
                        <textarea name="work_activity" rows="5">{{ $member->objective }}</textarea>
                        <div class="grid two compact">
                            <div>
                                <label>Yangi rasm yuklash</label>
                                <input type="file" name="image" accept="image/*">
                            </div>
                            <div>
                                <label>Tartib</label>
                                <input type="number" name="sort_order" min="0" value="{{ $member->sort_order }}">
                            </div>
                        </div>
                        <label>Rasm yo'li yoki URL</label>
                        <input type="text" name="image_url" value="{{ $member->image_url }}">
                        <label class="row gap"><input type="checkbox" value="1" name="is_active" @checked($member->is_active)> Saytda ko'rinsin</label>
                        <button class="btn" type="submit">Yangilash</button>
                    </form>
                    <form method="POST" action="{{ route('admin.leadership-members.destroy', $member) }}" class="delete-form">
                        @csrf
                        @method('DELETE')
                        <button class="btn danger" type="submit">O'chirish</button>
                    </form>
                </details>
            @empty
                <p>Rahbariyat yozuvlari yo'q.</p>
            @endforelse
        </div>
    </article>
</section>
@endif

@if($section === 'lessons')
<section class="grid two section-block reveal" id="admin-lessons">
    <article class="card">
        <h2>Dars jadvali qo'shish</h2>
        <form method="POST" action="{{ route('admin.lesson-schedules.store') }}" class="form">
            @csrf
            <label>Dastur</label>
            <select name="program_id">
                <option value="">Erkin mashg'ulot</option>
                @foreach($programs as $program)
                    <option value="{{ $program->id }}">{{ $program->title }}</option>
                @endforeach
            </select>
            <div class="grid two compact">
                <div>
                    <label>Hafta kuni</label>
                    <input type="text" name="weekday" required placeholder="monday">
                </div>
                <div>
                    <label>Ko'rinish nomi</label>
                    <input type="text" name="day_label" required placeholder="Dushanba">
                </div>
                <div>
                    <label>Boshlanish</label>
                    <input type="time" name="start_time" required>
                </div>
                <div>
                    <label>Tugash</label>
                    <input type="time" name="end_time" required>
                </div>
            </div>
            <label>Xona</label>
            <input type="text" name="room" placeholder="A-204">
            <label>O'qituvchi</label>
            <input type="text" name="mentor">
            <div class="grid two compact">
                <div>
                    <label>Sig'im</label>
                    <input type="number" name="capacity" min="1" value="24" required>
                </div>
                <div>
                    <label>Tartib</label>
                    <input type="number" name="sort_order" min="0" value="0">
                </div>
            </div>
            <label class="row gap"><input type="checkbox" value="1" name="is_online"> Online dars</label>
            <button class="btn" type="submit">Jadvalga qo'shish</button>
        </form>
    </article>

    <article class="card">
        <h2>Jadvalni boshqarish</h2>
        <div class="resource-list">
            @forelse($lessonSchedules as $slot)
                <details class="resource-item">
                    <summary>
                        <span>
                            <strong>{{ $slot->day_label }} В· {{ $slot->start_time->format('H:i') }}</strong>
                            <small>{{ $slot->program?->title ?? 'Erkin mashg\'ulot' }} В· {{ $slot->mentor ?? "O'qituvchi belgilanmagan" }}</small>
                        </span>
                        <em>{{ $slot->is_active ? 'Faol' : 'Yopiq' }}</em>
                    </summary>
                    <form method="POST" action="{{ route('admin.lesson-schedules.update', $slot) }}" class="form edit-form">
                        @csrf
                        @method('PATCH')
                        <label>Dastur</label>
                        <select name="program_id">
                            <option value="">Erkin mashg'ulot</option>
                            @foreach($programs as $program)
                                <option value="{{ $program->id }}" @selected($slot->program_id === $program->id)>{{ $program->title }}</option>
                            @endforeach
                        </select>
                        <div class="grid two compact">
                            <div>
                                <label>Hafta kuni</label>
                                <input type="text" name="weekday" value="{{ $slot->weekday }}" required>
                            </div>
                            <div>
                                <label>Ko'rinish nomi</label>
                                <input type="text" name="day_label" value="{{ $slot->day_label }}" required>
                            </div>
                            <div>
                                <label>Boshlanish</label>
                                <input type="time" name="start_time" value="{{ $slot->start_time->format('H:i') }}" required>
                            </div>
                            <div>
                                <label>Tugash</label>
                                <input type="time" name="end_time" value="{{ $slot->end_time->format('H:i') }}" required>
                            </div>
                        </div>
                        <label>Xona</label>
                        <input type="text" name="room" value="{{ $slot->room }}">
                        <label>O'qituvchi</label>
                        <input type="text" name="mentor" value="{{ $slot->mentor }}">
                        <div class="grid two compact">
                            <div>
                                <label>Sig'im</label>
                                <input type="number" name="capacity" min="1" value="{{ $slot->capacity }}" required>
                            </div>
                            <div>
                                <label>Tartib</label>
                                <input type="number" name="sort_order" min="0" value="{{ $slot->sort_order }}">
                            </div>
                        </div>
                        <label class="row gap"><input type="checkbox" value="1" name="is_online" @checked($slot->is_online)> Online dars</label>
                        <label class="row gap"><input type="checkbox" value="1" name="is_active" @checked($slot->is_active)> Saytda ko'rinsin</label>
                        <div class="admin-actions">
                            <button class="btn" type="submit">Yangilash</button>
                        </div>
                    </form>
                    <form method="POST" action="{{ route('admin.lesson-schedules.destroy', $slot) }}" class="delete-form">
                        @csrf
                        @method('DELETE')
                        <button class="btn danger" type="submit">O'chirish</button>
                    </form>
                </details>
            @empty
                <p>Jadval slotlari yo'q.</p>
            @endforelse
        </div>
    </article>
</section>
@endif

@if($section === 'special')
<section class="section-block reveal" id="admin-special">
    <div class="section-head">
        <span class="eyebrow">Maxsus katalog</span>
        <h2>Ayrim toifadagi o'quvchilar kartochkalari</h2>
        <p>Bu yerdagi yozuvlar asosiy sahifadagi rasmli katalogda narx, toifa va manzil bilan ko'rinadi.</p>
    </div>
    <div class="grid two">
        @forelse($specialCourses as $course)
            <details class="card resource-item">
                <summary>
                    <span>
                        <strong>{{ $course->title }}</strong>
                        <small>{{ number_format($course->price, 0, '.', ' ') }} so'm В· {{ $course->category }}</small>
                    </span>
                    <em>{{ $course->is_active ? 'Faol' : 'Yopiq' }}</em>
                </summary>
                <form method="POST" action="{{ route('admin.special-courses.update', $course) }}" class="form edit-form">
                    @csrf
                    @method('PATCH')
                    <label>Nomi</label>
                    <input type="text" name="title" value="{{ $course->title }}" required>
                    <label>Toifa</label>
                    <input type="text" name="category" value="{{ $course->category }}" required>
                    <div class="grid two compact">
                        <div>
                            <label>Narx</label>
                            <input type="number" name="price" min="0" value="{{ $course->price }}" required>
                        </div>
                        <div>
                            <label>Tartib</label>
                            <input type="number" name="sort_order" min="0" value="{{ $course->sort_order }}">
                        </div>
                    </div>
                    <label>Rasm yo'li yoki URL</label>
                    <input type="text" name="image_url" value="{{ $course->image_url }}">
                    <label>Manzil</label>
                    <textarea name="address" rows="3" required>{{ $course->address }}</textarea>
                    <label>Tavsif</label>
                    <textarea name="description" rows="4">{{ $course->description }}</textarea>
                    <label class="row gap"><input type="checkbox" value="1" name="is_active" @checked($course->is_active)> Saytda ko'rinsin</label>
                    <button class="btn" type="submit">Yangilash</button>
                </form>
                <form method="POST" action="{{ route('admin.special-courses.destroy', $course) }}" class="delete-form">
                    @csrf
                    @method('DELETE')
                    <button class="btn danger" type="submit">O'chirish</button>
                </form>
            </details>
        @empty
            <article class="empty-state">Maxsus katalog yozuvlari yo'q.</article>
        @endforelse
    </div>
</section>
@endif

@if($section === 'programs')
<section class="section-block reveal" id="admin-programs">
    <div class="section-head">
        <span class="eyebrow">To'garaklar</span>
        <h2>To'garak katalogini tahrirlash</h2>
        <p>Dasturlarni tahrirlash endi to'garak katalogini ham boshqaradi: rasm, narx, telefon, manzil va xarita shu yerdan kiritiladi.</p>
    </div>
    <div class="grid two">
        @forelse($programs as $program)
            <details class="card resource-item">
                <summary>
                    <span>
                        <strong>{{ $program->title }}</strong>
                        <small>{{ number_format($program->price ?? 0, 0, '.', ' ') }} so'm В· {{ $program->category ?? 'Yo\'nalish kiritilmagan' }}</small>
                    </span>
                    <em>{{ $program->is_active ? 'Faol' : 'Yopiq' }}</em>
                </summary>
                @if($program->image_url)
                    <img class="admin-preview" src="{{ \Illuminate\Support\Str::startsWith($program->image_url, ['http://', 'https://']) ? $program->image_url : asset($program->image_url) }}" alt="{{ $program->title }}">
                @endif
                <form method="POST" action="{{ route('admin.programs.update', $program) }}" class="form edit-form" enctype="multipart/form-data">
                    @csrf
                    @method('PATCH')
                    <label>Nomi</label>
                    <input type="text" name="title" value="{{ $program->title }}" required>
                    <div class="grid two compact">
                        <div>
                            <label>Yo'nalish</label>
                            <input type="text" name="category" value="{{ $program->category }}">
                        </div>
                        <div>
                            <label>To'garak turi</label>
                            <input type="text" name="club_type" value="{{ $program->club_type }}">
                        </div>
                    </div>
                    <label>Tavsif</label>
                    <textarea name="description" rows="4" required>{{ $program->description }}</textarea>
                    <div class="grid two compact">
                        <div>
                            <label>Narx</label>
                            <input type="number" name="price" min="0" value="{{ $program->price ?? 0 }}">
                        </div>
                        <div>
                            <label>Muddati</label>
                            <input type="text" name="duration" value="{{ $program->duration }}">
                        </div>
                        <div>
                            <label>Telefon</label>
                            <input type="text" name="phone" value="{{ $program->phone }}">
                        </div>
                        <div>
                            <label>Tartib</label>
                            <input type="number" name="sort_order" min="0" value="{{ $program->sort_order ?? 0 }}">
                        </div>
                    </div>
                    <label>Manzil</label>
                    <textarea name="address" rows="3">{{ $program->address }}</textarea>
                    <label>Joylashuv nomi</label>
                    <input type="text" name="location_name" value="{{ $program->location_name }}">
                    <label>Xarita havolasi</label>
                    <input type="url" name="map_url" value="{{ $program->map_url }}">
                    <label>Yangi rasm yuklash</label>
                    <input type="file" name="image" accept="image/*">
                    <label>Rasm yo'li yoki URL</label>
                    <input type="text" name="image_url" value="{{ $program->image_url }}">
                    <label class="row gap"><input type="checkbox" value="1" name="is_active" @checked($program->is_active)> Saytda ko'rinsin</label>
                    <button class="btn" type="submit">Yangilash</button>
                </form>
                <form method="POST" action="{{ route('admin.programs.destroy', $program) }}" class="delete-form">
                    @csrf
                    @method('DELETE')
                    <button class="btn danger" type="submit">O'chirish</button>
                </form>
            </details>
        @empty
            <article class="empty-state">Dasturlar yo'q.</article>
        @endforelse
    </div>
</section>
@endif

@if(in_array($section, ['events', 'announcements'], true))
<section class="grid two section-block reveal" id="admin-events">
    @if($section === 'events')
    <article class="card">
        <h2>Tadbirlarni tahrirlash</h2>
        <div class="resource-list">
            @forelse($events as $event)
                <details class="resource-item">
                    <summary>
                        <span>
                            <strong>{{ $event->title }}</strong>
                            <small>{{ $event->event_date->format('d.m.Y') }} В· {{ $event->location }}</small>
                        </span>
                    </summary>
                    <form method="POST" action="{{ route('admin.events.update', $event) }}" class="form edit-form">
                        @csrf
                        @method('PATCH')
                        <label>Nomi</label>
                        <input type="text" name="title" value="{{ $event->title }}" required>
                        <label>Sana</label>
                        <input type="date" name="event_date" value="{{ $event->event_date->format('Y-m-d') }}" required>
                        <label>Manzil</label>
                        <input type="text" name="location" value="{{ $event->location }}" required>
                        <label>Tavsif</label>
                        <textarea name="description" rows="3">{{ $event->description }}</textarea>
                        <button class="btn" type="submit">Yangilash</button>
                    </form>
                    <form method="POST" action="{{ route('admin.events.destroy', $event) }}" class="delete-form">
                        @csrf
                        @method('DELETE')
                        <button class="btn danger" type="submit">O'chirish</button>
                    </form>
                </details>
            @empty
                <p>Tadbirlar yo'q.</p>
            @endforelse
        </div>
    </article>
    @endif

    @if($section === 'announcements')
    <article class="card" id="admin-announcements">
        <h2>Yangiliklarni tahrirlash</h2>
        <div class="resource-list">
            @forelse($announcements as $announcement)
                <details class="resource-item">
                    <summary>
                        <span>
                            <strong>{{ $announcement->title }}</strong>
                            <small>{{ $announcement->published_at?->format('d.m.Y H:i') ?? 'Draft' }}</small>
                        </span>
                        <em>{{ $announcement->is_pinned ? 'Muhim' : 'Oddiy' }}</em>
                    </summary>
                    @if($announcement->image_url)
                        <img class="admin-preview" src="{{ \Illuminate\Support\Str::startsWith($announcement->image_url, ['http://', 'https://']) ? $announcement->image_url : asset($announcement->image_url) }}" alt="{{ $announcement->title }}">
                    @endif
                    <form method="POST" action="{{ route('admin.announcements.update', $announcement) }}" class="form edit-form" enctype="multipart/form-data">
                        @csrf
                        @method('PATCH')
                        <label>Sarlavha</label>
                        <input type="text" name="title" value="{{ $announcement->title }}" required>
                        <label>Matn</label>
                        <textarea name="body" rows="4" required>{{ $announcement->body }}</textarea>
                        <label>Yangi rasm yuklash</label>
                        <input type="file" name="image" accept="image/*">
                        <label>Rasm yo'li yoki URL</label>
                        <input type="text" name="image_url" value="{{ $announcement->image_url }}">
                        <label>Chop etilgan vaqt</label>
                        <input type="datetime-local" name="published_at" value="{{ $announcement->published_at?->format('Y-m-d\TH:i') }}">
                        <label class="row gap"><input type="checkbox" value="1" name="is_pinned" @checked($announcement->is_pinned)> Muhim yangilik</label>
                        <button class="btn" type="submit">Yangilash</button>
                    </form>
                    <form method="POST" action="{{ route('admin.announcements.destroy', $announcement) }}" class="delete-form">
                        @csrf
                        @method('DELETE')
                        <button class="btn danger" type="submit">O'chirish</button>
                    </form>
                </details>
            @empty
                <p>Yangiliklar yo'q.</p>
            @endforelse
        </div>
    </article>
    @endif
</section>
@endif

@if(in_array($section, ['requests', 'contacts'], true))
<section class="grid two section-block reveal" id="admin-requests">
    @if($section === 'requests')
    <article class="card">
        <h2>Arizalar</h2>
        <table class="table">
            <thead>
            <tr>
                <th>Foydalanuvchi</th>
                <th>Dastur</th>
                <th>Holat</th>
                <th>Amal</th>
            </tr>
            </thead>
            <tbody>
            @forelse($latestApplications as $application)
                <tr>
                    <td>{{ $application->user->name }}</td>
                    <td>{{ $application->program->title }}</td>
                    <td>{{ strtoupper($application->status) }}</td>
                    <td>
                        <form method="POST" action="{{ route('admin.applications.status', $application) }}" class="row gap inline-admin-form">
                            @csrf
                            @method('PATCH')
                            <select name="status">
                                <option value="new" @selected($application->status === 'new')>NEW</option>
                                <option value="in_review" @selected($application->status === 'in_review')>IN REVIEW</option>
                                <option value="approved" @selected($application->status === 'approved')>APPROVED</option>
                                <option value="rejected" @selected($application->status === 'rejected')>REJECTED</option>
                            </select>
                            <button class="btn ghost" type="submit">OK</button>
                        </form>
                        <form method="POST" action="{{ route('admin.applications.destroy', $application) }}" class="delete-form compact-delete">
                            @csrf
                            @method('DELETE')
                            <button class="btn danger" type="submit">O'chirish</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr><td colspan="4">Arizalar topilmadi.</td></tr>
            @endforelse
            </tbody>
        </table>
    </article>
    @endif

    @if($section === 'contacts')
    <article class="card" id="admin-contacts">
        <h2>Murojaatlar</h2>
        <table class="table">
            <thead>
            <tr>
                <th>Kontakt</th>
                <th>Xabar</th>
                <th>Status</th>
                <th>Amal</th>
            </tr>
            </thead>
            <tbody>
            @forelse($contactMessages as $message)
                <tr>
                    <td>
                        <strong>{{ $message->name }}</strong><br>
                        <small>{{ $message->phone }}</small><br>
                        <small>{{ $message->email }}</small>
                    </td>
                    <td>
                        <strong>{{ $message->subject }}</strong><br>
                        <small>{{ $message->message }}</small>
                    </td>
                    <td>{{ strtoupper($message->status) }}</td>
                    <td>
                        <form method="POST" action="{{ route('admin.contacts.status', $message) }}" class="row gap inline-admin-form">
                            @csrf
                            @method('PATCH')
                            <select name="status">
                                <option value="new" @selected($message->status === 'new')>NEW</option>
                                <option value="contacted" @selected($message->status === 'contacted')>CONTACTED</option>
                                <option value="resolved" @selected($message->status === 'resolved')>RESOLVED</option>
                                <option value="archived" @selected($message->status === 'archived')>ARCHIVED</option>
                            </select>
                            <button class="btn ghost" type="submit">OK</button>
                        </form>
                        <form method="POST" action="{{ route('admin.contacts.destroy', $message) }}" class="delete-form compact-delete">
                            @csrf
                            @method('DELETE')
                            <button class="btn danger" type="submit">O'chirish</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr><td colspan="4">Murojaatlar yo'q.</td></tr>
            @endforelse
            </tbody>
        </table>
    </article>
    @endif
</section>
@endif
@endsection

