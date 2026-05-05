@extends('layouts.app')

@section('content')
<section class="auth-wrap">
    <h1>Ro'yxatdan o'tish</h1>
    <form method="POST" action="{{ route('register.store') }}" class="card form">
        @csrf
        <label>Ism familiya</label>
        <input type="text" name="name" required value="{{ old('name') }}">

        <label>Email</label>
        <input type="email" name="email" required value="{{ old('email') }}">

        <label>Telefon</label>
        <input type="text" name="phone" value="{{ old('phone') }}">

        <label>Roli</label>
        <select name="role" required>
            <option value="student" @selected(old('role') === 'student')>O'quvchi</option>
            <option value="mentor" @selected(old('role') === 'mentor')>Mentor</option>
        </select>

        <label>Parol</label>
        <input type="password" name="password" required>

        <label>Parolni tasdiqlang</label>
        <input type="password" name="password_confirmation" required>

        <button class="btn" type="submit">Ro'yxatdan o'tish</button>
    </form>
</section>
@endsection