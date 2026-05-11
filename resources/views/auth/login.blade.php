@extends('layouts.app')

@section('content')
<section class="auth-wrap">
    <h1>Tizimga kirish</h1>
    <form method="POST" action="{{ route('login.store') }}" class="card form">
        @csrf
        <input type="hidden" name="next" value="{{ old('next', $next ?? '') }}">
        <label>Email</label>
        <input type="email" name="email" required value="{{ old('email') }}">

        <label>Parol</label>
        <input type="password" name="password" required>

        <label class="row gap"><input type="checkbox" name="remember"> Eslab qolish</label>

        <button class="btn" type="submit">Kirish</button>
    </form>
    <p style="margin-top:12px;">
        Akkountingiz yo'qmi?
        <a href="{{ route('register', ['next' => $next]) }}">Ro'yxatdan o'tish</a>
    </p>
</section>
@endsection
