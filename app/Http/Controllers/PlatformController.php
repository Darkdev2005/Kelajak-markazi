<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\ApplicationRequest;
use App\Models\Event;
use App\Models\PortfolioItem;
use App\Models\Program;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class PlatformController extends Controller
{
    public function home(): View
    {
        $programs = Program::query()->where('is_active', true)->latest()->get();
        $events = Event::query()->orderBy('event_date')->get();
        $announcements = Announcement::query()
            ->whereNotNull('published_at')
            ->orderByDesc('is_pinned')
            ->orderByDesc('published_at')
            ->limit(6)
            ->get();

        return view('home', compact('programs', 'events', 'announcements'));
    }

    public function dashboard(): View
    {
        $user = Auth::user();

        $applications = ApplicationRequest::query()
            ->with('program')
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        $portfolioItems = PortfolioItem::query()
            ->where('user_id', $user->id)
            ->latest('achieved_at')
            ->latest()
            ->get();

        $programs = Program::query()->where('is_active', true)->orderBy('title')->get();
        $events = Event::query()->orderBy('event_date')->limit(5)->get();
        $nextEvent = Event::query()->whereDate('event_date', '>=', now()->toDateString())->orderBy('event_date')->first();

        $streakDays = $this->calculateStreakDays($user->id);
        $engagementScore = min(100, ($applications->count() * 18) + ($portfolioItems->count() * 14) + ($streakDays * 4));
        $level = match (true) {
            $engagementScore >= 85 => 'Pro',
            $engagementScore >= 55 => 'Advanced',
            default => 'Starter',
        };

        $missions = [
            ['title' => 'Birinchi arizani yuborish', 'done' => $applications->count() > 0],
            ['title' => 'Portfolio bandini qo\'shish', 'done' => $portfolioItems->count() > 0],
            ['title' => '3 kunlik faollik streak', 'done' => $streakDays >= 3],
        ];

        return view('dashboard.index', compact(
            'user',
            'applications',
            'portfolioItems',
            'programs',
            'events',
            'nextEvent',
            'streakDays',
            'engagementScore',
            'level',
            'missions'
        ));
    }

    public function submitApplication(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'program_id' => ['required', 'exists:programs,id'],
            'note' => ['nullable', 'string', 'max:1000'],
        ]);

        ApplicationRequest::create([
            'user_id' => Auth::id(),
            'program_id' => $validated['program_id'],
            'note' => $validated['note'] ?? null,
            'status' => 'new',
        ]);

        return back()->with('ok', 'Ariza muvaffaqiyatli yuborildi.');
    }

    public function addPortfolioItem(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string', 'max:1200'],
            'proof_url' => ['nullable', 'url', 'max:255'],
            'achieved_at' => ['nullable', 'date'],
        ]);

        PortfolioItem::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'proof_url' => $validated['proof_url'] ?? null,
            'achieved_at' => $validated['achieved_at'] ?? null,
        ]);

        return back()->with('ok', 'Portfolio bandi qo\'shildi.');
    }

    private function calculateStreakDays(int $userId): int
    {
        $days = ApplicationRequest::query()
            ->where('user_id', $userId)
            ->pluck('created_at')
            ->map(fn ($date) => Carbon::parse($date)->toDateString())
            ->merge(
                PortfolioItem::query()
                    ->where('user_id', $userId)
                    ->pluck('created_at')
                    ->map(fn ($date) => Carbon::parse($date)->toDateString())
            )
            ->unique()
            ->sortDesc()
            ->values();

        if ($days->isEmpty()) {
            return 0;
        }

        $streak = 0;
        $cursor = now()->startOfDay();

        foreach ($days as $day) {
            $dayDate = Carbon::parse($day)->startOfDay();

            if ($dayDate->equalTo($cursor)) {
                $streak++;
                $cursor->subDay();
                continue;
            }

            if ($streak === 0 && $dayDate->equalTo($cursor->copy()->subDay())) {
                $streak++;
                $cursor->subDays(2);
                continue;
            }

            break;
        }

        return $streak;
    }
}
