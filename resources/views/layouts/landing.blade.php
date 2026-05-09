<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelajak Markazi</title>
    <script>
        (function () {
            const stored = localStorage.getItem('kelajak-theme');
            const theme = stored === 'dark' || stored === 'light' ? stored : 'light';
            document.documentElement.classList.toggle('dark', theme === 'dark');
            document.documentElement.style.colorScheme = theme;
        })();
    </script>
    @vite(['resources/css/app.css', 'resources/js/landing.jsx'])
</head>
<body class="font-sans antialiased">
@yield('content')
</body>
</html>
