<?php

namespace Tests\Feature;

use App\Models\SpecialCourse;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_open_full_management_panel(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $response = $this->actingAs($admin)->get('/admin');

        $response->assertOk();
        $response->assertSeeText("Dars jadvali qo'shish");
        $response->assertSeeText('Jadvalni boshqarish');
        $response->assertSeeText('Dasturlarni tahrirlash');
        $response->assertSeeText("Maxsus katalog qo'shish");
        $response->assertSeeText("Ayrim toifadagi o'quvchilar kartochkalari");
        $response->assertSeeText('Murojaatlar');
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
}
