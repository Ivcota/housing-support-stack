<?php

use App\Http\Controllers\ProfileController;
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


    if (!$survey) {
        return redirect()->route('dashboard', [
            'message' => 'Survey not found',
        ]);
    }

    return Inertia::render('Survey/Show', [
        'survey' => $survey,
    ]);
});


Route::get('/upload-survey', function () {
    return Inertia::render('Survey/Upload');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
