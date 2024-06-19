<?php

namespace App\Http\Controllers;

use App\Mail\SurveyUploaded;
use App\Models\Comment;
use App\Models\Survey;
use App\Notifications\SurveyUploaded as NotificationsSurveyUploaded;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;



class SurveyController extends Controller
{

    public function index()
    {
        $input = request()->input('search');
        $surveys = Survey::search($input)->where('local_housing_contact_id', Auth::user()->localHousingContact->id)->paginate(100);
        return Inertia::render('Dashboard', [
            'surveys' => $surveys,
        ]);
    }

    public function download($fileName)
    {
        $url = Storage::url('surveys/' . $fileName);
        return response()->download($url);
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
        $url = Storage::url('surveys/' . $survey->file_location);

        return Inertia::render('Survey/Show', [
            'survey' => $survey,
            'file' => $url,
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


        $path = Storage::disk('digitalocean')->putFile('surveys', $request->file('survey'), 'public');
        $fileName = basename($path);

        $survey = new Survey();


        $survey->fill([
            'local_housing_contact_id' => Auth::user()->localHousingContact->id,
            'address' => $request->address,
            'file_location' => $fileName,
        ])->save();

        Mail::to('ivcotad@gmail.com')->queue(
            new SurveyUploaded($survey)
        );

        Notification::route('slack', '#housing-support-stack')->notify(new NotificationsSurveyUploaded($survey));

        return redirect()->route('survey.show', [
            'id' => $survey->id,
        ]);
    }

    public function editPage($id)
    {
        $survey = Auth::user()?->localHousingContact?->survey()->find($id);

        if (!$survey) {
            return redirect()->route('dashboard', [
                'message' => 'Survey not found',
            ]);
        }

        return Inertia::render('Survey/Edit', [
            'survey' => $survey,
            'back' => url()->previous(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'address' => ['string', 'max:255'],
        ]);

        $survey = Auth::user()?->localHousingContact?->survey()->find($id);

        if (!$survey) {
            return redirect()->route('dashboard', [
                'message' => 'Survey not found',
            ]);
        }

        $survey->fill([
            'address' => $request->address,
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

    public function delete($id)
    {
        $survey = Auth::user()->localHousingContact->survey()->find($id);
        $survey->delete();
        return redirect()->route('dashboard');
    }
}
