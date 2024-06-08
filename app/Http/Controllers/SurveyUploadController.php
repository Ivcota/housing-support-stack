<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SurveyUploadController extends Controller
{

    public function view()
    {
        return Inertia::render('Survey/Upload');
    }

    public function show($id)
    {
        $survey = Auth::user()->localHousingContact->survey()->find($id);
        $message = null;

        if (!$survey) {
            return redirect()->route('dashboard', [
                'message' => 'Survey not found',
            ]);
        }

        switch ($survey->status) {
            case 'needs_uploader_action':
                $message = "There's something you need to do with this survey. See comments.";
                break;
            case 'pre_review':
                $message = 'This survey is in pre-review';
                break;
            case 'in_review':
                $message = 'This survey is in review';
                break;
            case 'approved':
                $message = 'This survey has been approved';
                break;
            case 'rejected':
                $message = 'This survey has been rejected';
                break;
            default:
                $message = 'The survey is not in a valid state';
                break;
        }

        return Inertia::render('Survey/Show', [
            'survey' => $survey,
            'message' => $message,
        ]);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'address' => ['required', 'string', 'max:255',],
            'survey' => ['required', 'file',],
        ]);

        $path = $request->file('survey')->store('surveys');

        $survey = new Survey();

        $survey->fill([
            'local_housing_contact_id' => Auth::user()->localHousingContact->id,
            'address' => $request->address,
            'file_location' => $path,
        ])->save();


        return redirect()->route('survey.show', [
            'id' => $survey->id,
        ]);
    }
}
