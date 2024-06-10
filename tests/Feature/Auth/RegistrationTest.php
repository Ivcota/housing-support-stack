<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'phone' => '520.555.5555',
        'congregation' => 'Animal Crossing',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('new users create local housing contact', function () {

    $response = $this->post('/register', [
        'name' => 'Valid User',
        'email' => 'test@example.com',
        'phone' => '520.555.5555',
        'congregation' => 'Animal Crossing',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    $user = User::first();

    $lhc = $user->localHousingContact;
    $this->assertNotNull($lhc);
    $this->assertEquals($lhc->congregation, 'Animal Crossing');
});
