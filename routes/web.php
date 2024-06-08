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

Route::get('/survey/{id}', function ($id) {
    $survey = Auth::user()->localHousingContact->survey()->find($id);
    $message = null;

    switch ($survey->status) {
        case 'needs_uploader_action':
            $message = 'You need to upload the survey to the local housing contact';
            break;
        case 'pre_review':
            $message = 'You need to review the survey';
            break;
        case 'in_review':
            $message = 'The survey is in review';
            break;
        case 'approved':
            $message = 'The survey has been approved';
            break;
        case 'rejected':
            $message = 'The survey has been rejected';
            break;
        default:
            $message = 'The survey is not in a valid state';
            break;
    }


    if (!$survey) {
        return redirect()->route('dashboard', [
            'message' => 'Survey not found',
        ]);
    }

    return Inertia::render('Survey/Show', [
        'survey' => $survey,
        'message' => $message,
    ]);
})->middleware(['auth', 'verified'])->name('survey.show');


Route::get(
    '/upload-survey',
    [SurveyUploadController::class, 'view']
)->middleware(['auth'])->name('survey.upload');

Route::post(
    '/upload-survey',
    [SurveyUploadController::class, 'upload']
)->middleware(['auth'])->name('survey.upload.survey');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
