<?php

namespace App\Http\Controllers;

use App\Models\LocalHousingContact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {

        $lhcs = LocalHousingContact::all()->map(function (LocalHousingContact $lhc) {

            return [
                'id' => $lhc->id,
                'name' => $lhc->user->name,
                'user_id' => $lhc->user->id,
                'congregation' => $lhc->congregation,
                'created_at' => $lhc->created_at,
                'updated_at' => $lhc->updated_at,
                'project_housing_contact_name' => $lhc->projectHousingContact->user->name,
                'project_housing_contact_id' => $lhc->projectHousingContact->id,
            ];
        });



        return Inertia::render('Admin/Dashboard', [
            'lhcs' => $lhcs,
        ]);
    }

    public function index_with_selected(Request $request,  $id)
    {
        $lhcs = LocalHousingContact::all()->map(function (LocalHousingContact $lhc) {
            return [
                'id' => $lhc->id,
                'name' => $lhc->user->name,
                'user_id' => $lhc->user->id,
                'congregation' => $lhc->congregation,
                'created_at' => $lhc->created_at,
                'updated_at' => $lhc->updated_at,
                'project_housing_contact_name' => $lhc->projectHousingContact->user->name,
                'project_housing_contact_id' => $lhc->projectHousingContact->id,
            ];
        });

        $selected = LocalHousingContact::find($id);
        $selected_notes = $selected->notes;


        return Inertia::render('Admin/Dashboard', [
            'lhcs' => $lhcs,
            'selected' => $selected,
            'selected_notes' => $selected_notes,
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
