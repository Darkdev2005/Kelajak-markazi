<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\ApplicationRequest;
use App\Models\ContactMessage;
use App\Models\Event;
use App\Models\LeadershipMember;
use App\Models\LessonSchedule;
use App\Models\Program;
use App\Models\SpecialCourse;
use App\Models\StudentCouncilAdvisor;
use App\Models\StudentCouncilMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Illuminate\View\View;

class AdminController extends Controller
{
    private function ensureAdmin(): void
    {
        if (!Auth::user() || !Auth::user()->isAdmin()) {
            abort(403);
        }
    }

    private function programValidationRules(): array
    {
        return [
            'title' => ['required', 'string', 'max:180'],
            'description' => ['required', 'string', 'max:2000'],
            'category' => ['nullable', 'string', 'max:140'],
            'club_type' => ['nullable', 'string', 'max:140'],
            'duration' => ['nullable', 'string', 'max:120'],
            'price' => ['nullable', 'integer', 'min:0', 'max:100000000'],
            'phone' => ['nullable', 'string', 'max:40'],
            'address' => ['nullable', 'string', 'max:2000'],
            'location_name' => ['nullable', 'string', 'max:180'],
            'map_url' => ['nullable', 'url', 'max:500'],
            'image_url' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:4096'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:999'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    private function resolveProgramImage(Request $request, ?Program $program = null): ?string
    {
        if (! $request->hasFile('image')) {
            return $request->filled('image_url') ? $request->string('image_url')->toString() : null;
        }

        $directory = public_path('images/programs');

        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $file = $request->file('image');
        $name = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) ?: 'togarak';
        $filename = $name . '-' . Str::uuid() . '.' . $file->extension();

        $file->move($directory, $filename);

        $oldImage = $program?->image_url;

        if ($oldImage && Str::startsWith($oldImage, 'images/programs/') && is_file(public_path($oldImage))) {
            @unlink(public_path($oldImage));
        }

        return 'images/programs/' . $filename;
    }

    private function programPayload(array $validated, ?string $imageUrl, bool $defaultActive): array
    {
        return [
            'title' => $validated['title'],
            'description' => $validated['description'],
            'category' => $validated['category'] ?? null,
            'club_type' => $validated['club_type'] ?? null,
            'duration' => $validated['duration'] ?? null,
            'price' => $validated['price'] ?? 0,
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'location_name' => $validated['location_name'] ?? null,
            'map_url' => $validated['map_url'] ?? null,
            'image_url' => $imageUrl,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => (bool) ($validated['is_active'] ?? $defaultActive),
        ];
    }

    private function leadershipValidationRules(): array
    {
        return [
            'name' => ['required', 'string', 'max:180'],
            'position' => ['required', 'string', 'max:220'],
            'employee_info' => ['nullable', 'string', 'max:2500'],
            'work_activity' => ['nullable', 'string', 'max:4000'],
            'image_url' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:4096'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:999'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    private function resolveLeadershipImage(Request $request, ?LeadershipMember $member = null): ?string
    {
        if (! $request->hasFile('image')) {
            return $request->filled('image_url') ? $request->string('image_url')->toString() : null;
        }

        $directory = public_path('images/leadership');

        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $file = $request->file('image');
        $name = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) ?: 'leadership';
        $filename = $name . '-' . Str::uuid() . '.' . $file->extension();

        $file->move($directory, $filename);

        $oldImage = $member?->image_url;

        if ($oldImage && Str::startsWith($oldImage, 'images/leadership/') && is_file(public_path($oldImage))) {
            @unlink(public_path($oldImage));
        }

        return 'images/leadership/' . $filename;
    }

    private function leadershipPayload(array $validated, ?string $imageUrl, bool $defaultActive): array
    {
        return [
            'name' => $validated['name'],
            'position' => $validated['position'],
            'organization' => null,
            'bio' => $validated['employee_info'] ?? null,
            'objective' => $validated['work_activity'] ?? null,
            'image_url' => $imageUrl,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => (bool) ($validated['is_active'] ?? $defaultActive),
        ];
    }

    private function announcementValidationRules(bool $withPublishedAt = false): array
    {
        $rules = [
            'title' => ['required', 'string', 'max:180'],
            'body' => ['required', 'string', 'max:2000'],
            'image_url' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:4096'],
            'is_pinned' => ['nullable', 'boolean'],
        ];

        if ($withPublishedAt) {
            $rules['published_at'] = ['nullable', 'date'];
        }

        return $rules;
    }

    private function resolveAnnouncementImage(Request $request, ?Announcement $announcement = null): ?string
    {
        if (! $request->hasFile('image')) {
            return $request->filled('image_url')
                ? $request->string('image_url')->toString()
                : ($announcement?->image_url ?? null);
        }

        $directory = public_path('images/announcements');

        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $file = $request->file('image');
        $name = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) ?: 'announcement';
        $filename = $name . '-' . Str::uuid() . '.' . $file->extension();

        $file->move($directory, $filename);

        $oldImage = $announcement?->image_url;

        if ($oldImage && Str::startsWith($oldImage, 'images/announcements/') && is_file(public_path($oldImage))) {
            @unlink(public_path($oldImage));
        }

        return 'images/announcements/' . $filename;
    }

    private function studentCouncilValidationRules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:180'],
            'achievement' => ['required', 'string', 'max:2500'],
            'image_url' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:4096'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:999'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    private function studentCouncilAdvisorValidationRules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:180'],
            'title' => ['nullable', 'string', 'max:220'],
            'description' => ['nullable', 'string', 'max:2500'],
            'image_url' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:4096'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    private function resolveStudentCouncilImage(Request $request, ?StudentCouncilMember $member = null): ?string
    {
        if (! $request->hasFile('image')) {
            return $request->filled('image_url')
                ? $request->string('image_url')->toString()
                : ($member?->image_url ?? null);
        }

        $directory = public_path('images/student-council');
        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $file = $request->file('image');
        $name = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) ?: 'student-council';
        $filename = $name . '-' . Str::uuid() . '.' . $file->extension();
        $file->move($directory, $filename);

        $oldImage = $member?->image_url;
        if ($oldImage && Str::startsWith($oldImage, 'images/student-council/') && is_file(public_path($oldImage))) {
            @unlink(public_path($oldImage));
        }

        return 'images/student-council/' . $filename;
    }

    private function resolveStudentCouncilAdvisorImage(Request $request, ?StudentCouncilAdvisor $advisor = null): ?string
    {
        if (! $request->hasFile('image')) {
            return $request->filled('image_url')
                ? $request->string('image_url')->toString()
                : ($advisor?->image_url ?? null);
        }

        $directory = public_path('images/student-council');
        if (! is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $file = $request->file('image');
        $name = Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) ?: 'student-council-advisor';
        $filename = $name . '-' . Str::uuid() . '.' . $file->extension();
        $file->move($directory, $filename);

        $oldImage = $advisor?->image_url;
        if ($oldImage && Str::startsWith($oldImage, 'images/student-council/') && is_file(public_path($oldImage))) {
            @unlink(public_path($oldImage));
        }

        return 'images/student-council/' . $filename;
    }

    public function index(Request $request): View
    {
        $this->ensureAdmin();

        $allowedSections = [
            'programs',
            'special',
            'lessons',
            'events',
            'announcements',
            'leadership',
            'student-council',
            'requests',
            'contacts',
        ];
        $activeSection = $request->string('section')->toString();
        if (! in_array($activeSection, $allowedSections, true)) {
            $activeSection = 'programs';
        }

        $stats = [
            'users' => \App\Models\User::count(),
            'programs' => Program::count(),
            'events' => Event::count(),
            'announcements' => Announcement::count(),
            'lessons' => LessonSchedule::count(),
            'special_courses' => SpecialCourse::count(),
            'leadership_members' => Schema::hasTable('leadership_members') ? LeadershipMember::count() : 0,
            'applications' => ApplicationRequest::count(),
            'contacts' => ContactMessage::query()->where('status', 'new')->count(),
            'student_council_members' => Schema::hasTable('student_council_members') ? StudentCouncilMember::count() : 0,
        ];

        $latestApplications = ApplicationRequest::query()
            ->with(['user', 'program'])
            ->latest()
            ->limit(10)
            ->get();

        $programs = Program::query()->orderBy('sort_order')->latest()->get();
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
        $leadershipMembers = Schema::hasTable('leadership_members')
            ? LeadershipMember::query()
                ->orderBy('sort_order')
                ->latest()
                ->get()
            : collect();
        $contactMessages = ContactMessage::query()->latest()->get();
        $studentCouncilMembers = Schema::hasTable('student_council_members')
            ? StudentCouncilMember::query()->orderBy('sort_order')->latest()->get()
            : collect();
        $studentCouncilAdvisor = Schema::hasTable('student_council_advisors')
            ? StudentCouncilAdvisor::query()->latest()->first()
            : null;

        return view('admin.index', compact(
            'stats',
            'latestApplications',
            'programs',
            'events',
            'announcements',
            'lessonSchedules',
            'specialCourses',
            'leadershipMembers',
            'contactMessages',
            'studentCouncilMembers',
            'studentCouncilAdvisor',
            'activeSection'
        ));
    }

    public function storeProgram(Request $request): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            ...$this->programValidationRules(),
        ]);

        Program::create($this->programPayload($validated, $this->resolveProgramImage($request), true));

        return back()->with('ok', 'To\'garak qo\'shildi.');
    }

    public function updateProgram(Request $request, Program $program): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            ...$this->programValidationRules(),
        ]);

        $program->update($this->programPayload($validated, $this->resolveProgramImage($request, $program), false));

        return back()->with('ok', 'To\'garak yangilandi.');
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

        $validated = $request->validate($this->announcementValidationRules());

        Announcement::create([
            'title' => $validated['title'],
            'body' => $validated['body'],
            'image_url' => $this->resolveAnnouncementImage($request),
            'is_pinned' => (bool) ($validated['is_pinned'] ?? false),
            'published_at' => now(),
        ]);

        return back()->with('ok', 'Yangilik joylandi.');
    }

    public function updateAnnouncement(Request $request, Announcement $announcement): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate($this->announcementValidationRules(true));

        $announcement->update([
            'title' => $validated['title'],
            'body' => $validated['body'],
            'image_url' => $this->resolveAnnouncementImage($request, $announcement),
            'is_pinned' => (bool) ($validated['is_pinned'] ?? false),
            'published_at' => $validated['published_at'] ?? null,
        ]);

        return back()->with('ok', 'Yangilik yangilandi.');
    }

    public function destroyAnnouncement(Announcement $announcement): RedirectResponse
    {
        $this->ensureAdmin();

        if ($announcement->image_url && Str::startsWith($announcement->image_url, 'images/announcements/') && is_file(public_path($announcement->image_url))) {
            @unlink(public_path($announcement->image_url));
        }

        $announcement->delete();

        return back()->with('ok', 'Yangilik o\'chirildi.');
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

    public function storeLeadershipMember(Request $request): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            ...$this->leadershipValidationRules(),
        ]);

        LeadershipMember::create($this->leadershipPayload($validated, $this->resolveLeadershipImage($request), true));

        return back()->with('ok', 'Rahbariyat a\'zosi qo\'shildi.');
    }

    public function updateLeadershipMember(Request $request, LeadershipMember $leadershipMember): RedirectResponse
    {
        $this->ensureAdmin();

        $validated = $request->validate([
            ...$this->leadershipValidationRules(),
        ]);

        $leadershipMember->update(
            $this->leadershipPayload($validated, $this->resolveLeadershipImage($request, $leadershipMember), false)
        );

        return back()->with('ok', 'Rahbariyat ma\'lumoti yangilandi.');
    }

    public function destroyLeadershipMember(LeadershipMember $leadershipMember): RedirectResponse
    {
        $this->ensureAdmin();

        $leadershipMember->delete();

        return back()->with('ok', 'Rahbariyat ma\'lumoti o\'chirildi.');
    }

    public function storeStudentCouncilMember(Request $request): RedirectResponse
    {
        $this->ensureAdmin();
        $validated = $request->validate($this->studentCouncilValidationRules());

        StudentCouncilMember::create([
            'full_name' => $validated['full_name'],
            'achievement' => $validated['achievement'],
            'image_url' => $this->resolveStudentCouncilImage($request),
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return back()->with('ok', "O'quvchilar kengashi a'zosi qo'shildi.");
    }

    public function updateStudentCouncilMember(Request $request, StudentCouncilMember $studentCouncilMember): RedirectResponse
    {
        $this->ensureAdmin();
        $validated = $request->validate($this->studentCouncilValidationRules());

        $studentCouncilMember->update([
            'full_name' => $validated['full_name'],
            'achievement' => $validated['achievement'],
            'image_url' => $this->resolveStudentCouncilImage($request, $studentCouncilMember),
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => (bool) ($validated['is_active'] ?? false),
        ]);

        return back()->with('ok', "O'quvchilar kengashi ma'lumoti yangilandi.");
    }

    public function destroyStudentCouncilMember(StudentCouncilMember $studentCouncilMember): RedirectResponse
    {
        $this->ensureAdmin();
        if ($studentCouncilMember->image_url && Str::startsWith($studentCouncilMember->image_url, 'images/student-council/') && is_file(public_path($studentCouncilMember->image_url))) {
            @unlink(public_path($studentCouncilMember->image_url));
        }
        $studentCouncilMember->delete();
        return back()->with('ok', "O'quvchilar kengashi ma'lumoti o'chirildi.");
    }

    public function upsertStudentCouncilAdvisor(Request $request): RedirectResponse
    {
        $this->ensureAdmin();
        $validated = $request->validate($this->studentCouncilAdvisorValidationRules());

        $advisor = StudentCouncilAdvisor::query()->latest()->first() ?? new StudentCouncilAdvisor();

        $advisor->fill([
            'full_name' => $validated['full_name'],
            'title' => $validated['title'] ?? null,
            'description' => $validated['description'] ?? null,
            'image_url' => $this->resolveStudentCouncilAdvisorImage($request, $advisor->exists ? $advisor : null),
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);
        $advisor->save();

        return back()->with('ok', "O'quvchilar kengashi maslahatchisi yangilandi.");
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
