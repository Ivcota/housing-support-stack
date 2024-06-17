<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {

        // if (!$request->user()->can('view-admin')) {
        //     return redirect()->route('dashboard');
        // }

        $lhcs = $request->user()->projectHousingContact->localHousingContact->map(function ($lhc) {
            return [
                'id' => $lhc->id,
                'name' => $lhc->user->name,
                'user_id' => $lhc->user->id,
                'congregation' => $lhc->congregation,
                'created_at' => $lhc->created_at,
                'updated_at' => $lhc->updated_at,
                'project_housing_contact_id' => $lhc->projectHousingContact->id,
            ];
        });

        return Inertia::render('Admin/Dashboard', [
            'lhcs' => $lhcs,
        ]);
    }

    public function show($id)
    {
        $lhc = Auth::user()->projectHousingContact->localHousingContact->find($id);
        $lhc = $lhc->map(function ($lhc) {
            return [
                'id' => $lhc->id,
                'name' => $lhc->user->name,
                'user_id' => $lhc->user->id,
                'congregation' => $lhc->congregation,
                'created_at' => $lhc->created_at,
                'updated_at' => $lhc->updated_at,
                'project_housing_contact_id' => $lhc->projectHousingContact->id,
            ];
        });

        return Inertia::render('Admin/LHC', [
            'lhc' => $lhc,
        ]);
    }
}
