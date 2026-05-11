<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;

class AuthController extends Controller
{
    public function showLogin(Request $request): View
    {
        return view('auth.login', [
            'next' => $this->resolveNext($request->input('next')),
        ]);
    }

    public function showRegister(Request $request): View
    {
        return view('auth.register', [
            'next' => $this->resolveNext($request->input('next')),
        ]);
    }

    public function register(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:120', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:30'],
            'password' => ['required', 'confirmed', 'min:6'],
            'role' => ['required', 'in:student'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        Auth::login($user);

        return redirect()->to($this->nextRedirectUrl($request->input('next')))
            ->with('ok', 'Xush kelibsiz! Profil yaratildi.');
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);
        $next = $this->resolveNext($request->input('next'));

        if (!Auth::attempt($credentials, $request->boolean('remember'))) {
            return back()->withErrors([
                'email' => 'Email yoki parol noto\'g\'ri.',
            ])->withInput([
                'email' => $request->input('email'),
                'next' => $next,
            ]);
        }

        $request->session()->regenerate();

        return redirect()->to($this->nextRedirectUrl($next))
            ->with('ok', 'Tizimga kirildi.');
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home')->with('ok', 'Chiqish bajarildi.');
    }

    private function resolveNext(?string $next): ?string
    {
        return in_array($next, ['applications'], true) ? $next : null;
    }

    private function nextRedirectUrl(?string $next): string
    {
        if ($this->resolveNext($next) === 'applications') {
            return route('dashboard', ['tab' => 'applications']);
        }

        return route('dashboard');
    }
}
