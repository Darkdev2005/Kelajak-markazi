<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\ApplicationRequest;
use App\Models\Event;
use App\Models\Program;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AdminController extends Controller
{
    private function ensureAdmin(): void
    {
        if (!Auth::user() || !Auth::user()->isAdmin()) {
            abort(403);
        }
    }

    public function index(): View
    {
        $this->ensureAdmin();

        $stats = [
            'users' => \App\Models\User::count(),
            'programs' => Program::count(),
            'events' => Event::count(),
            'applications' => ApplicationRequest::count(),
        ];

        $latestApplications = ApplicationRequest::query()
            ->with(['user', 'program'])
            ->latest()
            ->limit(10)
            ->get();

        $programs = Program::query()->latest()->limit(10)->get();
        $events = Event::query()->latest('event_date')->limit(10)->get();

        return view('admin.index', compact('stats', 'latestApplications', 'programs', 'events'));
    }

    public function storeProgram(Request $request): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'description' => ['required', 'string', 'max:2000'],
            'duration' => ['nullable', 'string', 'max:120'],
        ]);

        Program::create([
            ...$validated,
            'is_active' => true,
        ]);

        return back()->with('ok', 'Dastur qo\'shildi.');
    }

    public function storeEvent(Request $request): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'event_date' => ['required', 'date'],
            'location' => ['required', 'string', 'max:180'],
            'description' => ['nullable', 'string', 'max:1200'],
        ]);

        Event::create($validated);

        return back()->with('ok', 'Tadbir qo\'shildi.');
    }

    public function storeAnnouncement(Request $request): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'body' => ['required', 'string', 'max:2000'],
            'is_pinned' => ['nullable', 'boolean'],
        ]);

        Announcement::create([
            'title' => $validated['title'],
            'body' => $validated['body'],
            'is_pinned' => (bool) ($validated['is_pinned'] ?? false),
            'published_at' => now(),
        ]);

        return back()->with('ok', 'E\'lon joylandi.');
    }

    public function updateApplicationStatus(Request $request, ApplicationRequest $application): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'status' => ['required', 'in:new,in_review,approved,rejected'],
        ]);

        $application->update([
            'status' => $validated['status'],
        ]);

        return back()->with('ok', 'Ariza holati yangilandi.');
    }
}