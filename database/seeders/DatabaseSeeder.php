<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\ContactMessage;
use App\Models\Event;
use App\Models\LessonSchedule;
use App\Models\Program;
use App\Models\SpecialCourse;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@kelajak.uz'],
            [
                'name' => 'Kelajak Admin',
                'phone' => '+998900000001',
                'password' => Hash::make('admin12345'),
                'role' => 'admin',
            ]
        );

        User::query()->updateOrCreate(
            ['email' => 'mentor@kelajak.uz'],
            [
                'name' => "O'qituvchi User",
                'phone' => '+998900000002',
                'password' => Hash::make('mentor12345'),
                'role' => 'mentor',
            ]
        );

        $mathProgram = Program::query()->updateOrCreate(
            ['title' => 'MATEMATIKA'],
            [
                'description' => 'Matematika bo\'yicha mantiqiy fikrlash, masala yechish va fan olimpiadasiga tayyorgarlik.',
                'category' => 'Umumta\'lim fanlari',
                'club_type' => 'Fan to\'garagi',
                'duration' => 'Doimiy',
                'price' => 330000,
                'phone' => '999999999999',
                'address' => 'Farg\'ona viloyati, Farg\'ona shahri, Vatan ko\'chasi, 2-uy',
                'location_name' => 'Farg\'ona shahar maktabgacha va maktab ta\'limi bo\'limi',
                'map_url' => 'https://maps.google.com/?q=Fargona',
                'image_url' => 'images/special-physics.svg',
                'sort_order' => 1,
                'is_active' => true,
            ]
        );

        $childrenProgram = Program::query()->updateOrCreate(
            ['title' => 'Bolalar to\'garagi'],
            [
                'description' => 'Boshlang\'ich yoshdagi bolalar uchun ijodiy mashg\'ulot, o\'qish savodxonligi va qiziqarli amaliy topshiriqlar.',
                'category' => 'Qo\'shimcha ta\'lim (uzaytirilgan kun guruhlari)',
                'club_type' => 'Uzaytirilgan kun',
                'duration' => 'Doimiy',
                'price' => 412000,
                'phone' => '998972455878',
                'address' => 'Sirdaryo viloyati, Mirzaobod tumani, Dexqonobod MFY Tinchlik ko\'chasi 30-uy',
                'location_name' => 'Mirzaobod tumani 18-sonli umumiy o\'rta ta\'lim maktabi',
                'map_url' => 'https://maps.google.com/?q=Mirzaobod',
                'image_url' => 'images/special-school.svg',
                'sort_order' => 2,
                'is_active' => true,
            ]
        );

        $primaryProgram = Program::query()->updateOrCreate(
            ['title' => 'Boshlang\'ich sinflar uchun'],
            [
                'description' => 'Boshlang\'ich sinflar uchun matematika, o\'qish, yozuv va mantiqiy fikrlashni mustahkamlash.',
                'category' => 'Qo\'shimcha ta\'lim (uzaytirilgan kun guruhlari)',
                'club_type' => 'Boshlang\'ich ta\'lim',
                'duration' => 'Doimiy',
                'price' => 400000,
                'phone' => '998912628062',
                'address' => 'Qashqadaryo viloyati, Muborak tumani, Geolog, Temir yo\'l vokzali yaqinida',
                'location_name' => 'Muborak maktabgacha va maktab ta\'limi bo\'limi',
                'map_url' => 'https://maps.google.com/?q=Muborak',
                'image_url' => 'images/special-extended.svg',
                'sort_order' => 3,
                'is_active' => true,
            ]
        );

        $itProgram = Program::query()->updateOrCreate(
            ['title' => 'IT va Sun\'iy Intellekt'],
            [
                'description' => 'Frontend, backend, data, AI va robototexnika bo\'yicha loyiha asosidagi mashg\'ulotlar.',
                'category' => 'Axborot texnologiyalari',
                'club_type' => 'Kasb-hunar yo\'nalishlari',
                'duration' => '6 oy',
                'price' => 450000,
                'phone' => '+998901112233',
                'address' => 'Samarqand viloyati, Kelajak markazi IT laboratoriyasi',
                'location_name' => 'Kelajak IT laboratoriyasi',
                'map_url' => 'https://maps.google.com/?q=Samarqand',
                'image_url' => 'images/special-physics.svg',
                'sort_order' => 4,
                'is_active' => true,
            ]
        );

        $languageProgram = Program::query()->updateOrCreate(
            ['title' => 'Xorijiy Tillar'],
            [
                'description' => 'Ingliz tili, speaking club va xalqaro sertifikatlarga tayyorlov dasturi.',
                'category' => 'Xorijiy tillar',
                'club_type' => 'Til to\'garagi',
                'duration' => '4 oy',
                'price' => 380000,
                'phone' => '+998901112244',
                'address' => 'Samarqand viloyati, Kelajak markazi til xonasi',
                'location_name' => 'Kelajak til markazi',
                'map_url' => 'https://maps.google.com/?q=Samarqand',
                'image_url' => 'images/special-language.svg',
                'sort_order' => 5,
                'is_active' => true,
            ]
        );

        $mediaProgram = Program::query()->updateOrCreate(
            ['title' => 'Media Dizayn va Kontent'],
            [
                'description' => 'Grafik dizayn, video montaj, SMM va kreativ portfolio tayyorlash.',
                'category' => 'Media va ijod',
                'club_type' => 'Kasb-hunar yo\'nalishlari',
                'duration' => '3 oy',
                'price' => 420000,
                'phone' => '+998901112255',
                'address' => 'Samarqand viloyati, Kelajak markazi media studiyasi',
                'location_name' => 'Kelajak media studiyasi',
                'map_url' => 'https://maps.google.com/?q=Samarqand',
                'image_url' => 'images/special-biology.svg',
                'sort_order' => 6,
                'is_active' => true,
            ]
        );

        $leadershipProgram = Program::query()->updateOrCreate(
            ['title' => 'Liderlik va Debat'],
            [
                'description' => 'O\'quvchilar kengashi, ommaviy nutq, debat va loyiha boshqaruvi.',
                'category' => 'Liderlik va olimpiada',
                'club_type' => 'Rivojlanish to\'garagi',
                'duration' => 'Doimiy',
                'price' => 250000,
                'phone' => '+998901112266',
                'address' => 'Samarqand viloyati, Kelajak markazi konferensiya zali',
                'location_name' => 'Kelajak konferensiya zali',
                'map_url' => 'https://maps.google.com/?q=Samarqand',
                'image_url' => 'images/special-school.svg',
                'sort_order' => 7,
                'is_active' => true,
            ]
        );

        Event::query()->updateOrCreate(
            ['title' => 'Kelajak Hackathon'],
            [
                'event_date' => now()->addWeeks(2)->toDateString(),
                'location' => 'Toshkent',
                'description' => 'Jamoaviy texnologik tanlov va demo day.',
            ]
        );

        Event::query()->updateOrCreate(
            ['title' => 'Demo Day: Portfolio himoyasi'],
            [
                'event_date' => now()->addWeeks(4)->toDateString(),
                'location' => 'Kelajak Markazi',
                'description' => 'O\'quvchilar yakuniy loyihalarini o\'qituvchi va ota-onalar oldida himoya qiladi.',
            ]
        );

        Event::query()->updateOrCreate(
            ['title' => 'Speaking Club marafoni'],
            [
                'event_date' => now()->addDays(10)->toDateString(),
                'location' => 'Online + markaz',
                'description' => 'Ingliz tilida suhbat, mini challenge va o\'qituvchi feedback sessiyasi.',
            ]
        );

        Announcement::query()->updateOrCreate(
            ['title' => 'Platforma beta ishga tushdi'],
            [
                'body' => 'Yangi modullar: portfolio, ariza boshqaruvi, dars jadvali va murojaatlar paneli faol.',
                'is_pinned' => true,
                'published_at' => now(),
            ]
        );

        Announcement::query()->updateOrCreate(
            ['title' => 'Yangi guruhlarga qabul ochildi'],
            [
                'body' => 'IT, xorijiy til, media dizayn va liderlik yo\'nalishlari bo\'yicha yangi guruhlar shakllanmoqda.',
                'is_pinned' => false,
                'published_at' => now()->subDay(),
            ]
        );

        $scheduleItems = [
            [$itProgram->id, 'monday', 'Dushanba', '09:00', '10:30', 'Lab A-204', "Azizbek o'qituvchi", 24, false, 1],
            [$languageProgram->id, 'tuesday', 'Seshanba', '14:00', '15:30', 'Room B-110', "Madina o'qituvchi", 18, false, 2],
            [$mediaProgram->id, 'wednesday', 'Chorshanba', '16:00', '17:30', 'Media studio', "Dilshod o'qituvchi", 16, false, 3],
            [$leadershipProgram->id, 'friday', 'Juma', '10:00', '11:30', null, "Mohira o'qituvchi", 32, true, 4],
        ];

        foreach ($scheduleItems as [$programId, $weekday, $dayLabel, $start, $end, $room, $mentor, $capacity, $isOnline, $order]) {
            LessonSchedule::query()->updateOrCreate(
                [
                    'program_id' => $programId,
                    'weekday' => $weekday,
                    'start_time' => $start,
                ],
                [
                    'day_label' => $dayLabel,
                    'end_time' => $end,
                    'room' => $room,
                    'mentor' => $mentor,
                    'capacity' => $capacity,
                    'is_online' => $isOnline,
                    'is_active' => true,
                    'sort_order' => $order,
                ]
            );
        }

        $specialCourses = [
            [
                'title' => 'Prodlonka',
                'category' => 'Qo\'shimcha ta\'lim (uzaytirilgan kun guruhlari)',
                'price' => 300000,
                'image_url' => 'images/special-extended.svg',
                'address' => 'Namangan viloyati, Namangan shahri, O\'bihayot MFY Sirg\'ali ko\'chasi 1-uy',
                'description' => 'Boshlang\'ich sinf o\'quvchilari uchun xavfsiz uzaytirilgan kun, uy vazifasi va ijodiy mashg\'ulotlar.',
                'sort_order' => 1,
            ],
            [
                'title' => 'Biologlar',
                'category' => 'Umumta\'lim fanlari',
                'price' => 200000,
                'image_url' => 'images/special-biology.svg',
                'address' => 'Buxoro viloyati, Buxoro tumani, Gala Osiyo MFY Gala Osiyo ko\'chasi 13-uy',
                'description' => 'Biologiya fanidan laboratoriya, test va fan olimpiadasi uchun yo\'naltirilgan tayyorgarlik.',
                'sort_order' => 2,
            ],
            [
                'title' => 'Fizika',
                'category' => 'Umumta\'lim fanlari',
                'price' => 150000,
                'image_url' => 'images/special-physics.svg',
                'address' => 'Samarqand viloyati, Toyloq tumani, Saroy qishloq 24-uy',
                'description' => 'Formulalar, amaliy masalalar va tajribalar orqali fizika bilimini mustahkamlash.',
                'sort_order' => 3,
            ],
            [
                'title' => 'Rus tili 6-7',
                'category' => 'Umumta\'lim fanlari',
                'price' => 300000,
                'image_url' => 'images/special-language.svg',
                'address' => 'Samarqand viloyati, Kattaqo\'rg\'on shahri, U.Barnoev ko\'chasi 61-uy',
                'description' => '6-7-sinf o\'quvchilari uchun rus tili grammatikasi, suhbat va o\'qish ko\'nikmalari.',
                'sort_order' => 4,
            ],
            [
                'title' => 'Boshlang\'ich ta\'lim',
                'category' => 'Qo\'shimcha ta\'lim (uzaytirilgan kun guruhlari)',
                'price' => 200000,
                'image_url' => 'images/special-school.svg',
                'address' => 'Andijon viloyati, Izboskan tumani, Do\'stlik MFY 33-maktab binosi',
                'description' => 'Boshlang\'ich ta\'limdagi tayanch fanlar, o\'qish savodxonligi va mantiqiy fikrlash mashqlari.',
                'sort_order' => 5,
            ],
        ];

        foreach ($specialCourses as $course) {
            SpecialCourse::query()->updateOrCreate(
                ['title' => $course['title']],
                [
                    ...$course,
                    'is_active' => true,
                ]
            );
        }

        ContactMessage::query()->updateOrCreate(
            ['phone' => '+998901112233', 'subject' => 'Hamkorlik'],
            [
                'name' => 'Demo murojaat',
                'email' => 'demo@kelajak.uz',
                'message' => 'Media va IT yo\'nalishlari bo\'yicha hamkorlik qilishni xohlaymiz.',
                'status' => 'new',
            ]
        );
    }
}
