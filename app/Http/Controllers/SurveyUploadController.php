<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SurveyUploadController extends Controller
{

    public function view()
    {
        return Inertia::render('Survey/Upload');
    }

    public function upload(Request $request)
    {
        $request->validate([
            'address' => ['required', 'string', 'max:255'],
            'survey' => ['required', 'file',],
        ]);

        $request->file('survey')->store('surveys');


        return redirect()->route('dashboard');
    }
}
