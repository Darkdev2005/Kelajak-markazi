<?php

namespace Database\Seeders;

use App\Models\LessonSchedule;
use App\Models\Program;
use Illuminate\Database\Seeder;

class SamarqandClubsScheduleSeeder extends Seeder
{
    public function run(): void
    {
        // One-time import guard: if previously imported, never touch existing data.
        if (
            Program::query()->where('location_name', 'like', 'Kelajak markazi (%')->exists()
            || LessonSchedule::query()->where('mentor', 'like', '%-guruh)%')->exists()
        ) {
            return;
        }

        $mapUrl = 'https://maps.google.com/maps?q=39.655984,66.949152&ll=39.655984,66.949152&z=16';
        $dayLabels = [
            'monday' => 'Dushanba',
            'tuesday' => 'Seshanba',
            'wednesday' => 'Chorshanba',
            'thursday' => 'Payshanba',
            'friday' => 'Juma',
            'saturday' => 'Shanba',
        ];

        $clubs = [
            [
                'leader' => 'Babamurodova Ruqiya',
                'title' => "Bichish-tikish",
                'phone' => '937215452',
                'room' => '2-qavat 34-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['tuesday', '14:00', '15:30'], ['thursday', '14:00', '15:30']]],
                ],
            ],
            [
                'leader' => 'Toxirova Mijgona',
                'title' => 'Mental arifmetika',
                'phone' => '979185929',
                'room' => '2-qavat 14-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '08:00', '09:30'], ['wednesday', '08:00', '09:30']]],
                    ['no' => 2, 'slots' => [['monday', '13:00', '14:30'], ['wednesday', '13:00', '14:30']]],
                ],
            ],
            [
                'leader' => 'Achilova Nargiza',
                'title' => "Tasviriy san'at",
                'phone' => '933450798',
                'room' => '3-qavat 26-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['tuesday', '10:00', '11:30'], ['thursday', '10:00', '11:30']]],
                    ['no' => 2, 'slots' => [['tuesday', '14:00', '15:30'], ['thursday', '14:00', '15:30']]],
                ],
            ],
            [
                'leader' => 'Zargaryan Violetta',
                'title' => 'Zamonaviy raqs',
                'phone' => '915565393',
                'room' => '3-qavat 43-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '09:00', '10:30'], ['friday', '09:00', '10:30']]],
                    ['no' => 2, 'slots' => [['tuesday', '14:00', '15:30'], ['saturday', '14:00', '15:30']]],
                ],
            ],
            [
                'leader' => "Djo'rayev Soib",
                'title' => 'Shaxmat',
                'phone' => '933339253',
                'room' => '1-qavat 2-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '09:00', '10:30'], ['wednesday', '09:00', '10:30']]],
                    ['no' => 2, 'slots' => [['monday', '14:00', '16:30'], ['wednesday', '14:00', '16:30']]],
                    ['no' => 3, 'slots' => [['tuesday', '09:00', '10:30'], ['thursday', '09:00', '10:30']]],
                    ['no' => 4, 'slots' => [['tuesday', '14:00', '16:30'], ['thursday', '14:00', '16:30']]],
                ],
            ],
            [
                'leader' => 'Xudoyberdiyev Erkin',
                'title' => 'Taekwondo',
                'phone' => '912998194',
                'room' => 'Sport zal',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '09:30', '11:00'], ['wednesday', '09:30', '11:00']]],
                    ['no' => 2, 'slots' => [['tuesday', '18:00', '19:30'], ['thursday', '18:00', '19:30']]],
                ],
            ],
            [
                'leader' => 'Budagov Artyom',
                'title' => 'Taekwondo',
                'phone' => '990488324',
                'room' => 'Sport zal',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '15:00', '16:30'], ['wednesday', '15:00', '16:30']]],
                ],
            ],
            [
                'leader' => 'Nasrullayeva Shahnoza',
                'title' => "Bichish-tikish",
                'phone' => '940229555',
                'room' => '3-qavat 28-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '14:30', '16:00'], ['wednesday', '14:30', '16:00']]],
                ],
            ],
            [
                'leader' => 'Sharifova Zilola',
                'title' => 'Ingliz tili',
                'phone' => '933459991',
                'room' => '2-qavat 38-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['tuesday', '11:00', '12:30'], ['thursday', '11:00', '12:30']]],
                    ['no' => 2, 'slots' => [['monday', '13:30', '15:00'], ['friday', '13:30', '15:00']]],
                ],
            ],
            [
                'leader' => 'Qalandarov Furqat',
                'title' => 'Karate',
                'phone' => '507255999',
                'room' => '2-qavat 33-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '08:30', '10:00'], ['wednesday', '08:30', '10:00']]],
                    ['no' => 2, 'slots' => [['thursday', '15:00', '16:30'], ['saturday', '15:00', '16:30']]],
                    ['no' => 3, 'slots' => [['tuesday', '17:00', '18:30'], ['thursday', '17:00', '18:30']]],
                ],
            ],
            [
                'leader' => 'Sharipova Zilola',
                'title' => 'Milliy raqs',
                'phone' => '905038313',
                'room' => '2-qavat 35-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '09:00', '10:30'], ['wednesday', '09:00', '10:30']]],
                    ['no' => 2, 'slots' => [['monday', '16:00', '17:30'], ['wednesday', '16:00', '17:30']]],
                ],
            ],
            [
                'leader' => 'Muxtorov Mehroj',
                'title' => 'Estrada vokal',
                'phone' => '991781211',
                'room' => '2-qavat 17-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '10:00', '11:30'], ['wednesday', '10:00', '11:30']]],
                ],
            ],
            [
                'leader' => "Qo'shayev Murod",
                'title' => "Tasviriy san'at",
                'phone' => '995940743',
                'room' => '2-qavat 19-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['thursday', '15:30', '17:00'], ['friday', '15:30', '17:00']]],
                ],
            ],
            [
                'leader' => 'Qambarova Gulhayo',
                'title' => 'Matematika',
                'phone' => '938931343',
                'room' => '2-qavat 37-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['tuesday', '14:00', '15:30'], ['thursday', '14:00', '15:30']]],
                ],
            ],
            [
                'leader' => 'Alimdjanov Begzod',
                'title' => 'Estrada vokal',
                'phone' => '979167505',
                'room' => '3-qavat 23-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['tuesday', '10:00', '11:30'], ['thursday', '10:00', '11:30']]],
                ],
            ],
            [
                'leader' => 'Gaziyeva Dilnoza',
                'title' => 'Rus tili',
                'phone' => '772571547',
                'room' => '2-qavat 39-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '08:00', '09:30'], ['wednesday', '08:00', '09:30']]],
                ],
            ],
            [
                'leader' => 'Xaydarov Diyor',
                'title' => 'Doira',
                'phone' => '906575451',
                'room' => '3-qavat 24-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '09:00', '10:30'], ['friday', '09:00', '10:30']]],
                ],
            ],
            [
                'leader' => 'Raximov Baraka',
                'title' => 'Doira',
                'phone' => '973969920',
                'room' => '3-qavat 24-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '14:00', '15:30'], ['friday', '14:00', '15:30']]],
                ],
            ],
            [
                'leader' => 'Xayrullayeva Barno',
                'title' => 'Mental arifmetika',
                'phone' => '996824634',
                'room' => '2-qavat 21-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['wednesday', '14:30', '16:00'], ['saturday', '14:30', '16:00']]],
                ],
            ],
            [
                'leader' => 'Ashurova Shahlo',
                'title' => 'Maktabga tayyorlov',
                'phone' => '937223937',
                'room' => '3-qavat 44-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '08:30', '10:30'], ['wednesday', '08:30', '10:30'], ['saturday', '08:30', '10:30']]],
                ],
            ],
            [
                'leader' => 'Azimova Munira',
                'title' => 'Maktabga tayyorlov',
                'phone' => '770306490',
                'room' => '2-qavat 41-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '08:30', '10:30'], ['wednesday', '08:30', '10:30'], ['saturday', '08:30', '10:30']]],
                ],
            ],
            [
                'leader' => 'Azimova Mavluda',
                'title' => 'Maktabga tayyorlov',
                'phone' => '906069042',
                'room' => '2-qavat 36-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '08:30', '10:30'], ['wednesday', '08:30', '10:30'], ['saturday', '08:30', '10:30']]],
                ],
            ],
            [
                'leader' => 'Egamova Muxayyo',
                'title' => 'Maktabga tayyorlov',
                'phone' => '973978555',
                'room' => '3-qavat 47-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '08:30', '10:30'], ['wednesday', '08:30', '10:30'], ['saturday', '08:30', '10:30']]],
                ],
            ],
            [
                'leader' => 'Vardaryan Zlata',
                'title' => 'Maktabga tayyorlov',
                'phone' => '915371162',
                'room' => '3-qavat 42-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['monday', '08:30', '10:30'], ['wednesday', '08:30', '10:30'], ['saturday', '08:30', '10:30']]],
                ],
            ],
            [
                'leader' => 'Turopova Uljanoy',
                'title' => 'Gimnastika',
                'phone' => '902285082',
                'room' => '3-qavat 27-xona',
                'groups' => [
                    ['no' => 1, 'slots' => [['tuesday', '09:00', '10:30'], ['thursday', '09:00', '10:30']]],
                ],
            ],
        ];

        foreach ($clubs as $index => $club) {
            $phone = $this->normalizePhone($club['phone']);
            $address = "Samarqand viloyati, Samarqand shahri, Kelajak markazi, {$club['room']}";
            $category = $this->resolveCategory($club['title']);

            $program = Program::query()->firstOrCreate(
                [
                    'title' => $club['title'],
                    'phone' => $phone,
                    'address' => $address,
                ],
                [
                    'description' => "{$club['title']} yo'nalishi bo'yicha {$club['leader']} rahbarligida mashg'ulotlar.",
                    'category' => $category,
                    'club_type' => $this->resolveClubType($category),
                    'duration' => 'Doimiy',
                    'price' => 0,
                    'location_name' => "Kelajak markazi ({$club['room']})",
                    'map_url' => $mapUrl,
                    'image_url' => $this->resolveImageByCategory($category),
                    'sort_order' => 100 + $index,
                    'is_active' => true,
                ]
            );

            $slotOrder = 1;
            foreach ($club['groups'] as $group) {
                $mentor = "{$club['leader']} ({$group['no']}-guruh)";
                foreach ($group['slots'] as [$weekday, $startTime, $endTime]) {
                    LessonSchedule::query()->firstOrCreate(
                        [
                            'program_id' => $program->id,
                            'weekday' => $weekday,
                            'start_time' => $startTime,
                            'end_time' => $endTime,
                            'mentor' => $mentor,
                        ],
                        [
                            'day_label' => $dayLabels[$weekday],
                            'room' => $club['room'],
                            'capacity' => 24,
                            'is_online' => false,
                            'is_active' => true,
                            'sort_order' => $slotOrder++,
                        ]
                    );
                }
            }
        }
    }

    private function normalizePhone(string $phone): string
    {
        $digits = preg_replace('/\D+/', '', $phone) ?? '';

        if (strlen($digits) === 9) {
            return '+998' . $digits;
        }

        if (strlen($digits) === 12 && str_starts_with($digits, '998')) {
            return '+' . $digits;
        }

        return $phone;
    }

    private function resolveCategory(string $title): string
    {
        $name = mb_strtolower($title);

        if (str_contains($name, 'taekwondo') || str_contains($name, 'karate') || str_contains($name, 'gimnastika')) {
            return 'Sport';
        }

        if (str_contains($name, 'ingliz') || str_contains($name, 'rus')) {
            return 'Xorijiy tillar';
        }

        if (str_contains($name, 'mental') || str_contains($name, 'matematika') || str_contains($name, 'shaxmat')) {
            return "Umumta'lim fanlari";
        }

        if (str_contains($name, 'maktabga tayyorlov')) {
            return "Qo'shimcha ta'lim (uzaytirilgan kun guruhlari)";
        }

        return "San'at va ijod";
    }

    private function resolveClubType(string $category): string
    {
        return match ($category) {
            'Sport' => "Sport to'garagi",
            'Xorijiy tillar' => "Til to'garagi",
            "Umumta'lim fanlari" => "Fan to'garagi",
            "Qo'shimcha ta'lim (uzaytirilgan kun guruhlari)" => 'Uzaytirilgan kun',
            default => "Ijodiy to'garak",
        };
    }

    private function resolveImageByCategory(string $category): string
    {
        return match ($category) {
            'Sport' => 'images/special-school.svg',
            'Xorijiy tillar' => 'images/special-language.svg',
            "Umumta'lim fanlari" => 'images/special-physics.svg',
            default => 'images/special-biology.svg',
        };
    }
}
