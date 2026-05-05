<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PlatformController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PlatformController::class, 'home'])->name('home');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.store');

    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.store');
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/dashboard', [PlatformController::class, 'dashboard'])->name('dashboard');
    Route::post('/applications', [PlatformController::class, 'submitApplication'])->name('applications.store');
    Route::post('/portfolio', [PlatformController::class, 'addPortfolioItem'])->name('portfolio.store');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [AdminController::class, 'index'])->name('index');
        Route::post('/programs', [AdminController::class, 'storeProgram'])->name('programs.store');
        Route::post('/events', [AdminController::class, 'storeEvent'])->name('events.store');
        Route::post('/announcements', [AdminController::class, 'storeAnnouncement'])->name('announcements.store');
        Route::patch('/applications/{application}', [AdminController::class, 'updateApplicationStatus'])->name('applications.status');
    });
});