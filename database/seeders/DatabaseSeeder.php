<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\LocalHousingContact;
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
        User::factory(4)->has(
            LocalHousingContact::factory()->has(
                Survey::factory(6)
            )
        )->create();

        User::factory()->has(
            LocalHousingContact::factory()->has(
                Survey::factory(9)->has(
                    Comment::factory(3)->state([
                        'user_id' => 1,
                    ])
                )
            )
        )->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
