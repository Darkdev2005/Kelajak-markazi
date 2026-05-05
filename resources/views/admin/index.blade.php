@extends('layouts.app')

@section('content')
<section>
    <h1>Admin Boshqaruv Paneli</h1>
    <div class="grid four">
        <article class="card"><h3>{{ $stats['users'] }}</h3><p>Foydalanuvchilar</p></article>
        <article class="card"><h3>{{ $stats['programs'] }}</h3><p>Dasturlar</p></article>
        <article class="card"><h3>{{ $stats['events'] }}</h3><p>Tadbirlar</p></article>
        <article class="card"><h3>{{ $stats['applications'] }}</h3><p>Arizalar</p></article>
    </div>
</section>

<section class="grid three">
    <article class="card">
        <h2>Dastur Qo'shish</h2>
        <form method="POST" action="{{ route('admin.programs.store') }}" class="form">
            @csrf
            <label>Nomi</label>
            <input type="text" name="title" required>
            <label>Tavsif</label>
            <textarea name="description" rows="3" required></textarea>
            <label>Muddati</label>
            <input type="text" name="duration" placeholder="6 oy">
            <button class="btn" type="submit">Saqlash</button>
        </form>
    </article>

    <article class="card">
        <h2>Tadbir Qo'shish</h2>
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

    <article class="card">
        <h2>E'lon Joylash</h2>
        <form method="POST" action="{{ route('admin.announcements.store') }}" class="form">
            @csrf
            <label>Sarlavha</label>
            <input type="text" name="title" required>
            <label>Matn</label>
            <textarea name="body" rows="4" required></textarea>
            <label class="row gap"><input type="checkbox" value="1" name="is_pinned"> Muhim e'lon</label>
            <button class="btn" type="submit">Joylash</button>
        </form>
    </article>
</section>

<section>
    <article class="card">
        <h2>Oxirgi Arizalar</h2>
        <table class="table">
            <thead>
            <tr>
                <th>Foydalanuvchi</th>
                <th>Dastur</th>
                <th>Holat</th>
                <th>Yangilash</th>
            </tr>
            </thead>
            <tbody>
            @forelse($latestApplications as $application)
                <tr>
                    <td>{{ $application->user->name }}</td>
                    <td>{{ $application->program->title }}</td>
                    <td>{{ strtoupper($application->status) }}</td>
                    <td>
                        <form method="POST" action="{{ route('admin.applications.status', $application) }}" class="row gap">
                            @csrf
                            @method('PATCH')
                            <select name="status">
                                <option value="new" @selected($application->status === 'new')>NEW</option>
                                <option value="in_review" @selected($application->status === 'in_review')>IN REVIEW</option>
                                <option value="approved" @selected($application->status === 'approved')>APPROVED</option>
                                <option value="rejected" @selected($application->status === 'rejected')>REJECTED</option>
                            </select>
                            <button class="btn ghost" type="submit">Saqlash</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr><td colspan="4">Arizalar topilmadi.</td></tr>
            @endforelse
            </tbody>
        </table>
    </article>
</section>
@endsection