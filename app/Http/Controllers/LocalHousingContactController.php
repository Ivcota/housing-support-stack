<?php

namespace App\Http\Controllers;

use App\Models\LocalHousingContact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LocalHousingContactController extends Controller
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(LocalHousingContact $localHousingContact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LocalHousingContact $localHousingContact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {

        $localHousingContact = Auth::user()->localHousingContact;

        $request->validate([
            'congregation' => 'required',
            'phone' => 'phone:US',
        ]);

        $localHousingContact->fill([
            'congregation' => $request->congregation,
        ]);

        $localHousingContact->user->fill([
            'phone' => $request->phone,
        ]);


        $localHousingContact->save();
        $localHousingContact->user->save();

        return redirect()->route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LocalHousingContact $localHousingContact)
    {
        //
    }
}
