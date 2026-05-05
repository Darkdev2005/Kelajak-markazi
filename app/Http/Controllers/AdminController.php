<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\ApplicationRequest;
use App\Models\ContactMessage;
use App\Models\Event;
use App\Models\LessonSchedule;
use App\Models\Program;
use App\Models\SpecialCourse;
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
            'announcements' => Announcement::count(),
            'lessons' => LessonSchedule::count(),
            'special_courses' => SpecialCourse::count(),
            'applications' => ApplicationRequest::count(),
            'contacts' => ContactMessage::query()->where('status', 'new')->count(),
        ];

        $latestApplications = ApplicationRequest::query()
            ->with(['user', 'program'])
            ->latest()
            ->limit(10)
            ->get();

        $programs = Program::query()->latest()->get();
        $events = Event::query()->latest('event_date')->get();
        $announcements = Announcement::query()->latest('published_at')->latest()->get();
        $lessonSchedules = LessonSchedule::query()
            ->with('program')
            ->orderBy('sort_order')
            ->latest()
            ->get();
        $specialCourses = SpecialCourse::query()
            ->orderBy('sort_order')
            ->latest()
            ->get();
        $contactMessages = ContactMessage::query()->latest()->get();

        return view('admin.index', compact(
            'stats',
            'latestApplications',
            'programs',
            'events',
            'announcements',
            'lessonSchedules',
            'specialCourses',
            'contactMessages'
        ));
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

    public function updateProgram(Request $request, Program $program): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'description' => ['required', 'string', 'max:2000'],
            'duration' => ['nullable', 'string', 'max:120'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $program->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'duration' => $validated['duration'] ?? null,
            'is_active' => (bool) ($validated['is_active'] ?? false),
        ]);

        return back()->with('ok', 'Dastur yangilandi.');
    }

    public function destroyProgram(Program $program): RedirectResponse
    {
        $this->ensureAdmin();

        $program->delete();

        return back()->with('ok', 'Dastur o\'chirildi.');
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

    public function updateEvent(Request $request, Event $event): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'event_date' => ['required', 'date'],
            'location' => ['required', 'string', 'max:180'],
            'description' => ['nullable', 'string', 'max:1200'],
        ]);

        $event->update($validated);

        return back()->with('ok', 'Tadbir yangilandi.');
    }

    public function destroyEvent(Event $event): RedirectResponse
    {
        $this->ensureAdmin();

        $event->delete();

        return back()->with('ok', 'Tadbir o\'chirildi.');
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

    public function updateAnnouncement(Request $request, Announcement $announcement): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'body' => ['required', 'string', 'max:2000'],
            'is_pinned' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
        ]);

        $announcement->update([
            'title' => $validated['title'],
            'body' => $validated['body'],
            'is_pinned' => (bool) ($validated['is_pinned'] ?? false),
            'published_at' => $validated['published_at'] ?? null,
        ]);

        return back()->with('ok', 'E\'lon yangilandi.');
    }

    public function destroyAnnouncement(Announcement $announcement): RedirectResponse
    {
        $this->ensureAdmin();

        $announcement->delete();

        return back()->with('ok', 'E\'lon o\'chirildi.');
    }

    public function storeLessonSchedule(Request $request): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'program_id' => ['nullable', 'exists:programs,id'],
            'weekday' => ['required', 'string', 'max:40'],
            'day_label' => ['required', 'string', 'max:80'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'room' => ['nullable', 'string', 'max:120'],
            'mentor' => ['nullable', 'string', 'max:120'],
            'capacity' => ['required', 'integer', 'min:1', 'max:500'],
            'is_online' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:999'],
        ]);

        LessonSchedule::create([
            ...$validated,
            'is_online' => (bool) ($validated['is_online'] ?? false),
            'is_active' => true,
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return back()->with('ok', 'Dars jadvali qo\'shildi.');
    }

    public function updateLessonSchedule(Request $request, LessonSchedule $lessonSchedule): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'program_id' => ['nullable', 'exists:programs,id'],
            'weekday' => ['required', 'string', 'max:40'],
            'day_label' => ['required', 'string', 'max:80'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'room' => ['nullable', 'string', 'max:120'],
            'mentor' => ['nullable', 'string', 'max:120'],
            'capacity' => ['required', 'integer', 'min:1', 'max:500'],
            'is_online' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:999'],
        ]);

        $lessonSchedule->update([
            ...$validated,
            'is_online' => (bool) ($validated['is_online'] ?? false),
            'is_active' => (bool) ($validated['is_active'] ?? false),
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return back()->with('ok', 'Dars jadvali yangilandi.');
    }

    public function destroyLessonSchedule(LessonSchedule $lessonSchedule): RedirectResponse
    {
        $this->ensureAdmin();

        $lessonSchedule->delete();

        return back()->with('ok', 'Dars jadvali o\'chirildi.');
    }

    public function storeSpecialCourse(Request $request): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'category' => ['required', 'string', 'max:120'],
            'price' => ['required', 'integer', 'min:0', 'max:100000000'],
            'image_url' => ['nullable', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:2000'],
            'description' => ['nullable', 'string', 'max:1200'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:999'],
        ]);

        SpecialCourse::create([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'price' => $validated['price'],
            'image_url' => $validated['image_url'] ?? null,
            'address' => $validated['address'],
            'description' => $validated['description'] ?? null,
            'is_active' => (bool) ($validated['is_active'] ?? false),
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return back()->with('ok', 'Maxsus katalog elementi qo\'shildi.');
    }

    public function updateSpecialCourse(Request $request, SpecialCourse $specialCourse): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'category' => ['required', 'string', 'max:120'],
            'price' => ['required', 'integer', 'min:0', 'max:100000000'],
            'image_url' => ['nullable', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:2000'],
            'description' => ['nullable', 'string', 'max:1200'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:999'],
        ]);

        $specialCourse->update([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'price' => $validated['price'],
            'image_url' => $validated['image_url'] ?? null,
            'address' => $validated['address'],
            'description' => $validated['description'] ?? null,
            'is_active' => (bool) ($validated['is_active'] ?? false),
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return back()->with('ok', 'Maxsus katalog yangilandi.');
    }

    public function destroySpecialCourse(SpecialCourse $specialCourse): RedirectResponse
    {
        $this->ensureAdmin();

        $specialCourse->delete();

        return back()->with('ok', 'Maxsus katalog elementi o\'chirildi.');
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

    public function destroyApplication(ApplicationRequest $application): RedirectResponse
    {
        $this->ensureAdmin();

        $application->delete();

        return back()->with('ok', 'Ariza o\'chirildi.');
    }

    public function updateContactStatus(Request $request, ContactMessage $contactMessage): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            'status' => ['required', 'in:new,contacted,resolved,archived'],
        ]);

        $contactMessage->update([
            'status' => $validated['status'],
            'resolved_at' => $validated['status'] === 'resolved' ? now() : $contactMessage->resolved_at,
        ]);

        return back()->with('ok', 'Murojaat holati yangilandi.');
    }

    public function destroyContactMessage(ContactMessage $contactMessage): RedirectResponse
    {
        $this->ensureAdmin();

        $contactMessage->delete();

        return back()->with('ok', 'Murojaat o\'chirildi.');
    }
}
