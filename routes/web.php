<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LocalHousingContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SurveyController;
use Illuminate\Foundation\Application;
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


/*
*  Survey routes
*/
Route::middleware('auth')->group(function () {
    Route::get(
        '/dashboard',
        [SurveyController::class, 'index']
    )->name('dashboard');
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
    Route::get('/survey/{id}/edit', [SurveyController::class, 'editPage'])->name('survey.edit');
    Route::patch('/survey/{id}', [SurveyController::class, 'update'])->name('survey.update');
});

/*
* Comment routes
*/
Route::middleware('auth')->group(function () {
    Route::post('/comment', [CommentController::class, 'store'])->name('comment.store');
    Route::delete('/comment/{id}', [CommentController::class, 'destroy'])->name('comment.delete');
});

/*
* Profile routes
*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/final-details-collect', [RegisteredUserController::class, 'finalDetailsCollect'])->name('auth.final-details-collect');
    Route::patch('/final-details-collect', [LocalHousingContactController::class, 'update'])->name('auth.final-details-collect.update');
});

/*
* Admin routes
*/
Route::middleware(['auth', 'can:view-admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/lhc/{id}', [AdminDashboardController::class, 'show'])->name('admin.lhc.show');
    Route::get('admin/dashboard/{id}', [AdminDashboardController::class, 'index_with_selected'])->name('admin.dashboard.selected');
});

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy-policy');

Route::get('/terms-of-service', function () {
    return Inertia::render('TermsOfService');
})->name('terms-of-service');

require __DIR__ . '/auth.php';
