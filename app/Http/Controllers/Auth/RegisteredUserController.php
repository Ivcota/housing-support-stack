<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\LocalHousingContact;
use App\Models\User;
use App\Notifications\AccountCreated;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'phone:US',
            'congregation' => 'required',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        LocalHousingContact::create([
            'user_id' => $user->id,
            'congregation' => $request->congregation,
        ]);

        event(new Registered($user));

        Auth::login($user);

        Notification::route('slack', '#housing-support-stack')->notify(new AccountCreated($user));

        return redirect(route('dashboard', absolute: false));
    }

    public function googleStore(): RedirectResponse
    {
        $googleUser = Socialite::driver('google')->user();

        $user = User::where('email', $googleUser->email)->first();

        if (!$user) {
            $user = User::create([
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'password' => bcrypt($googleUser->id),
            ]);

            LocalHousingContact::create([
                'user_id' => $user->id,
                'congregation' => 'Please select a congregation',
            ]);

            Notification::route('slack', '#housing-support-stack')->notify(new AccountCreated($user));
        }


        Auth::login($user);


        return AuthenticatedSessionController::routeDashboard($user);
    }
}
