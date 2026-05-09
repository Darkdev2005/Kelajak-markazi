<?php

namespace Tests\Feature;

use App\Models\SpecialCourse;
use App\Models\LeadershipMember;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_open_management_sections_separately(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $programs = $this->actingAs($admin)->get('/admin');
        $programs->assertOk();
        $programs->assertSeeText("To'garak qo'shish");
        $programs->assertSeeText("To'garak katalogini tahrirlash");
        $programs->assertDontSeeText("Dars jadvali qo'shish");

        $lessons = $this->actingAs($admin)->get('/admin?section=lessons');
        $lessons->assertOk();
        $lessons->assertSeeText("Dars jadvali qo'shish");
        $lessons->assertSeeText('Jadvalni boshqarish');
        $lessons->assertDontSeeText("To'garak qo'shish");

        $contacts = $this->actingAs($admin)->get('/admin?section=contacts');
        $contacts->assertOk();
        $contacts->assertSeeText('Murojaatlar');
        $contacts->assertDontSeeText('Arizalar topilmadi.');
    }

    public function test_home_renders_special_catalog_from_database(): void
    {
        SpecialCourse::create([
            'title' => 'Fizika',
            'category' => 'Umumta\'lim fanlari',
            'price' => 150000,
            'image_url' => 'images/special-physics.svg',
            'address' => 'Toyloq tumani, Saroy qishloq',
            'description' => 'Amaliy masalalar va tajribalar.',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        $response = $this->get('/');

        $response->assertOk();
        $response->assertSeeText("Ayrim toifadagi o'quvchilar uchun");
        $response->assertSeeText('Fizika');
        $response->assertSeeText("150 000 so'm");
        $response->assertSee('images/special-physics.svg');
    }

    public function test_admin_can_manage_special_catalog(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $this->actingAs($admin)
            ->post('/admin/special-courses', [
                'title' => 'Biologlar',
                'category' => 'Umumta\'lim fanlari',
                'price' => 200000,
                'image_url' => 'images/special-biology.svg',
                'address' => 'Buxoro tumani',
                'description' => 'Biologiya tayyorgarligi.',
                'is_active' => '1',
                'sort_order' => 2,
            ])
            ->assertRedirect()
            ->assertSessionHas('ok');

        $course = SpecialCourse::query()->firstOrFail();

        $this->assertSame('Biologlar', $course->title);
        $this->assertTrue($course->is_active);

        $this->actingAs($admin)
            ->patch("/admin/special-courses/{$course->id}", [
                'title' => 'Biologiya',
                'category' => 'Fan to\'garagi',
                'price' => 220000,
                'image_url' => 'images/special-biology.svg',
                'address' => 'Buxoro shahri',
                'description' => 'Yangilangan tavsif.',
                'sort_order' => 1,
            ])
            ->assertRedirect()
            ->assertSessionHas('ok');

        $this->assertDatabaseHas('special_courses', [
            'id' => $course->id,
            'title' => 'Biologiya',
            'price' => 220000,
            'is_active' => false,
        ]);

        $this->actingAs($admin)
            ->delete("/admin/special-courses/{$course->id}")
            ->assertRedirect()
            ->assertSessionHas('ok');

        $this->assertDatabaseMissing('special_courses', [
            'id' => $course->id,
        ]);
    }

    public function test_admin_can_manage_leadership_members(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $this->actingAs($admin)
            ->post('/admin/leadership-members', [
                'name' => 'Abdulla Xasanov',
                'position' => 'Maktab direktori',
                'employee_info' => 'Ta\'lim sifati bo\'yicha rahbar.',
                'work_activity' => '2018 yildan buyon boshqaruv faoliyati.',
                'image_url' => 'images/leadership/director.jpg',
                'is_active' => '1',
                'sort_order' => 1,
            ])
            ->assertRedirect()
            ->assertSessionHas('ok');

        $member = LeadershipMember::query()->firstOrFail();

        $this->assertSame('Abdulla Xasanov', $member->name);
        $this->assertTrue($member->is_active);

        $this->actingAs($admin)
            ->patch("/admin/leadership-members/{$member->id}", [
                'name' => 'Abdulla Xasanov',
                'position' => 'O\'quv ishlari bo\'yicha direktor o\'rinbosari',
                'employee_info' => 'Yangilangan xodim ma\'lumoti.',
                'work_activity' => 'Yangilangan mehnat faoliyati.',
                'image_url' => 'images/leadership/director.jpg',
                'sort_order' => 2,
            ])
            ->assertRedirect()
            ->assertSessionHas('ok');

        $this->assertDatabaseHas('leadership_members', [
            'id' => $member->id,
            'position' => 'O\'quv ishlari bo\'yicha direktor o\'rinbosari',
            'objective' => 'Yangilangan mehnat faoliyati.',
            'is_active' => false,
        ]);

        $this->actingAs($admin)
            ->delete("/admin/leadership-members/{$member->id}")
            ->assertRedirect()
            ->assertSessionHas('ok');

        $this->assertDatabaseMissing('leadership_members', [
            'id' => $member->id,
        ]);
    }
}
