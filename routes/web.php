<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SurveyController;
use App\Models\Survey;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Route::get('/auth/redirect', function () {
    return Socialite::driver('google')->redirect();
});
Route::get('/auth/callback', [AuthenticatedSessionController::class, 'googleStore'])->name('auth.google');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {

    $input = request()->input('search');

    $surveys = Survey::search($input)->where('local_housing_contact_id', Auth::user()->localHousingContact->id)->paginate(100);
    return Inertia::render('Dashboard', [
        'surveys' => $surveys,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::post('/comment', [CommentController::class, 'store'])->name('comment.store');
});

Route::middleware('auth')->group(function () {
    Route::get(
        '/survey/{id}',
        [SurveyController::class, 'show']
    )->name('survey.show');
    Route::delete('/survey/{id}', [SurveyController::class, 'delete'])->name('survey.delete');
    Route::get(
        '/upload-survey',
        [SurveyController::class, 'view']
    )->name('survey.upload');
    Route::post(
        '/upload-survey',
        [SurveyController::class, 'upload']
    )->name('survey.upload.survey');
    Route::get('/survey-download/{fileName}', [SurveyController::class, 'download'])->name('survey.download');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth', 'can:view-admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/lhc/{id}', [AdminDashboardController::class, 'show'])->name('admin.lhc.show');
});

require __DIR__ . '/auth.php';
