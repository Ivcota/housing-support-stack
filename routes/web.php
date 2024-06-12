<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SurveyUploadController;
use App\Http\Middleware\Admin;
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
    $surveys = Auth::user()->localHousingContact->survey()->paginate(500);
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
        [SurveyUploadController::class, 'show']
    )->name('survey.show');
    Route::delete('/survey/{id}', [SurveyUploadController::class, 'delete'])->name('survey.delete');
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


Route::middleware(['auth', Admin::class])->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
});

require __DIR__ . '/auth.php';
