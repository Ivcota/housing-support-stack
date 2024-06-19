<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Notifications\UserCommented;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'comment' => 'required',
            'survey_id' => 'required',
        ]);

        $comment = Comment::create([
            'comment' => $request->comment,
            'survey_id' => $request->survey_id,
            'user_id' => auth()->user()->id,
        ]);

        Notification::route('slack', '#housing-support-stack')->notify(new UserCommented($comment));

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
