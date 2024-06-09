<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;



class SurveyUploadController extends Controller
{

    public function download($fileName)
    {
        return response()->download(storage_path('app/public/surveys/' . $fileName));
    }

    public function view()
    {
        return Inertia::render('Survey/Upload');
    }

    public function show($id)
    {
        $survey = Auth::user()->localHousingContact->survey()->find($id);


        if (!$survey) {
            return redirect()->route('dashboard', [
                'message' => 'Survey not found',
            ]);
        }

        $message = $this->getMessage($survey);

        $comments = Comment::where('survey_id', $id)->orderBy('id', 'desc')->get();

        return Inertia::render('Survey/Show', [
            'survey' => $survey,
            'file' => $survey->file_location,
            'message' => $message,
            'comments' => $comments->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'user_id' => $comment->user_id,
                    'comment' => $comment->comment,
                    'created_at' => $comment->created_at,
                    'updated_at' => $comment->updated_at,
                    'user' => [
                        'id' => $comment->user_id,
                        'name' => $comment->user->name,
                    ],
                ];
            }),
        ]);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'address' => ['required', 'string', 'max:255',],
            'survey' => ['required', 'file',],
        ]);

        $path = $request->file('survey')->store('surveys');
        $fileName = basename($path);

        $survey = new Survey();


        $survey->fill([
            'local_housing_contact_id' => Auth::user()->localHousingContact->id,
            'address' => $request->address,
            'file_location' => $fileName,
        ])->save();



        return redirect()->route('survey.show', [
            'id' => $survey->id,
        ]);
    }

    private function getMessage($survey)
    {
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

        return $message;
    }
}