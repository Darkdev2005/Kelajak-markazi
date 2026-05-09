<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PlatformController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PlatformController::class, 'home'])->name('home');
Route::post('/contact-messages', [PlatformController::class, 'submitContact'])->name('contacts.store');

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
        Route::patch('/programs/{program}', [AdminController::class, 'updateProgram'])->name('programs.update');
        Route::delete('/programs/{program}', [AdminController::class, 'destroyProgram'])->name('programs.destroy');
        Route::post('/events', [AdminController::class, 'storeEvent'])->name('events.store');
        Route::patch('/events/{event}', [AdminController::class, 'updateEvent'])->name('events.update');
        Route::delete('/events/{event}', [AdminController::class, 'destroyEvent'])->name('events.destroy');
        Route::post('/announcements', [AdminController::class, 'storeAnnouncement'])->name('announcements.store');
        Route::patch('/announcements/{announcement}', [AdminController::class, 'updateAnnouncement'])->name('announcements.update');
        Route::delete('/announcements/{announcement}', [AdminController::class, 'destroyAnnouncement'])->name('announcements.destroy');
        Route::post('/lesson-schedules', [AdminController::class, 'storeLessonSchedule'])->name('lesson-schedules.store');
        Route::patch('/lesson-schedules/{lessonSchedule}', [AdminController::class, 'updateLessonSchedule'])->name('lesson-schedules.update');
        Route::delete('/lesson-schedules/{lessonSchedule}', [AdminController::class, 'destroyLessonSchedule'])->name('lesson-schedules.destroy');
        Route::post('/special-courses', [AdminController::class, 'storeSpecialCourse'])->name('special-courses.store');
        Route::patch('/special-courses/{specialCourse}', [AdminController::class, 'updateSpecialCourse'])->name('special-courses.update');
        Route::delete('/special-courses/{specialCourse}', [AdminController::class, 'destroySpecialCourse'])->name('special-courses.destroy');
        Route::post('/leadership-members', [AdminController::class, 'storeLeadershipMember'])->name('leadership-members.store');
        Route::patch('/leadership-members/{leadershipMember}', [AdminController::class, 'updateLeadershipMember'])->name('leadership-members.update');
        Route::delete('/leadership-members/{leadershipMember}', [AdminController::class, 'destroyLeadershipMember'])->name('leadership-members.destroy');
        Route::patch('/applications/{application}', [AdminController::class, 'updateApplicationStatus'])->name('applications.status');
        Route::delete('/applications/{application}', [AdminController::class, 'destroyApplication'])->name('applications.destroy');
        Route::patch('/contact-messages/{contactMessage}', [AdminController::class, 'updateContactStatus'])->name('contacts.status');
        Route::delete('/contact-messages/{contactMessage}', [AdminController::class, 'destroyContactMessage'])->name('contacts.destroy');
    });
});
