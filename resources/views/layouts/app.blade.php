<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelajak Markazi</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Nunito:wght@500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('platform.css') }}">
</head>
<body class="{{ request()->routeIs('admin.*') ? 'admin-clean' : '' }}">
<header class="topbar">
    <div class="container nav-shell">
        <a href="{{ route('home') }}#/home" class="brand" aria-label="Kelajak Markazi">
            <img src="{{ asset('images/kelajak-logo.png') }}" alt="Kelajak Markazi">
        </a>

        <button class="nav-toggle" type="button" aria-label="Menyuni ochish" data-nav-toggle>
            <span></span>
            <span></span>
            <span></span>
        </button>

        <nav class="site-nav" data-site-nav>
            <a href="/#/home" data-route-link="home">Asosiy sahifa</a>
            <a href="/#/clubs" data-route-link="clubs">To'garaklar</a>
            <a href="/#/lessonSchedule" data-route-link="lessonSchedule">Dars jadvali</a>
            <a href="/#/about-us" data-route-link="about-us">Markaz haqida</a>
            <a href="/#/our-contact" data-route-link="our-contact">Kontaktlar</a>
            @auth
                <a href="{{ route('dashboard') }}" data-route-link="dashboard">Profil</a>
                @if(auth()->user()->isAdmin())
                    <a href="{{ route('admin.index') }}" data-route-link="admin">Admin</a>
                @endif
                <form method="POST" action="{{ route('logout') }}" class="nav-form">
                    @csrf
                    <button type="submit" class="logout-btn" title="Chiqish">
                        <span class="logout-icon" aria-hidden="true">⏻</span>
                        <span>Chiqish</span>
                    </button>
                </form>
            @else
                <a href="/#/auth/login" data-route-link="auth/login">Kirish</a>
                <a href="/#/auth/register" class="btn small" data-route-link="auth/register">Ro'yxatdan o'tish</a>
            @endauth
        </nav>
    </div>
</header>

<main class="container {{ request()->routeIs('admin.*') ? 'admin-main' : '' }}">
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

<footer class="footer">
    <div class="container footer-grid">
        <div class="footer-brand">
            <img src="{{ asset('images/kelajak-logo.png') }}" alt="Kelajak Markazi">
            <p>Qo'shimcha ta'lim, to'garaklar, tadbirlar va shaxsiy rivojlanish uchun raqamli markaz.</p>
        </div>
        <div>
            <h3>Bo'limlar</h3>
            <a href="/#/home">Asosiy sahifa</a>
            <a href="/#/clubs">To'garaklar</a>
            <a href="/#/lessonSchedule">Dars jadvali</a>
            <a href="/#/about-us">Markaz haqida</a>
        </div>
        <div>
            <h3>Aloqa</h3>
            <p>+998 (71) 217-18-71</p>
            <p>samarqandviloyatkelajakmarkazi@gmail.com</p>
            <p>Toshkent, Navoiy ko'chasi, 2A-uy</p>
        </div>
    </div>
    <div class="container footer-bottom">
        <span>© {{ date('Y') }} Kelajak Markazi</span>
        <span>Barcha huquqlar himoyalangan</span>
    </div>
</footer>

<script src="{{ asset('platform.js') }}" defer></script>
</body>
</html>
