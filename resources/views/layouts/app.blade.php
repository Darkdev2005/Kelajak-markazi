<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelajak Markazi</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('platform.css') }}">
</head>
<body>
<div class="bg-orb orb-a"></div>
<div class="bg-orb orb-b"></div>
<header class="topbar">
    <div class="container row space">
        <a href="{{ route('home') }}" class="brand">Kelajak Markazi</a>
        <nav class="row gap">
            <a href="/#/home">Bosh sahifa</a>
            <a href="/#/about-us">Biz Haqimizda</a>
            <a href="/#/courses">Yo'nalishlar</a>
            <a href="/#/events">Tadbirlar</a>
            @auth
                <a href="/#/dashboard">Dashboard</a>
                @if(auth()->user()->isAdmin())
                    <a href="/#/admin">Admin</a>
                @endif
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="btn ghost">Chiqish</button>
                </form>
            @else
                <a href="/#/auth/login">Kirish</a>
                <a href="/#/auth/register" class="btn">Ro'yxatdan o'tish</a>
            @endauth
        </nav>
    </div>
</header>

<main class="container">
    @if(session('ok'))
        <div class="alert ok">{{ session('ok') }}</div>
    @endif

    @if($errors->any())
        <div class="alert err">
            {{ $errors->first() }}
        </div>
    @endif

    @yield('content')
</main>
<script src="{{ asset('platform.js') }}" defer></script>
</body>
</html>
