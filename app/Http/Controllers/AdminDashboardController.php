<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {

        $lhcs = $request->user()->projectHousingContact->localHousingContact->map(function ($lhc) {
            return [
                'id' => $lhc->id,
                'name' => $lhc->user->name,
                'user_id' => $lhc->user->id,
                'congregation' => $lhc->user->congregation,
                'created_at' => $lhc->created_at,
                'updated_at' => $lhc->updated_at,
                'project_housing_contact_id' => $lhc->projectHousingContact->id,
            ];
        });


        return Inertia::render('Admin/Dashboard', [
            'lhcs' => $lhcs,
        ]);
    }
}
