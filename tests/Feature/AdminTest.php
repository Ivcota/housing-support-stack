<?php

use App\Models\LocalHousingContact;
use App\Models\User;

test('middlware blocks users there are not admins', function () {

    $user = User::factory()->has(
        LocalHousingContact::factory()
    )->create();


    $response = $this->actingAs($user)->get('/admin/dashboard');
});
