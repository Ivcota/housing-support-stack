<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SurveyUploadController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
