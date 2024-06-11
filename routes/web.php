<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SurveyUploadController;
use App\Models\LocalHousingContact;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Route::get('/auth/redirect', function () {
    return Socialite::driver('google')->redirect();
});

Route::get('/auth/callback', function () {
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
    }


    Auth::login($user);

    return redirect('/dashboard');
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $surveys = Auth::user()->localHousingContact->survey()->paginate(10);
    return Inertia::render('Dashboard', [
        'surveys' => $surveys,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get(
        '/survey/{id}',
        [SurveyUploadController::class, 'show']
    )->name('survey.show');
    Route::get(
        '/upload-survey',
        [SurveyUploadController::class, 'view']
    )->name('survey.upload');
    Route::post(
        '/upload-survey',
        [SurveyUploadController::class, 'upload']
    )->name('survey.upload.survey');
    Route::get('/survey-download/{fileName}', [SurveyUploadController::class, 'download'])->name('survey.download');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
