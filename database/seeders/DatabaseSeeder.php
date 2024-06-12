<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\LocalHousingContact;
use App\Models\ProjectHousingContact;
use App\Models\Survey;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $phc = User::factory()->has(
            ProjectHousingContact::factory()
        )->create([
            'name' => 'Iverson Diles',
            'email' => 'ivcotad@gmail.com',
            'role' => 'admin',
        ]);

        User::factory(5)->has(
            LocalHousingContact::factory()->state([
                'project_housing_contact_id' => $phc->id,
            ])->has(
                Survey::factory(5)->has(
                    Comment::factory(3)->state([
                        'user_id' => rand(1, 3),
                    ])
                )
            )
        )->create();

        LocalHousingContact::factory()->create([
            'user_id' => $phc->id,
            'project_housing_contact_id' => $phc->projectHousingContact->id,
        ]);
    }
}
