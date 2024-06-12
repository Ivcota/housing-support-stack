<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {

        $lhcs = $request->user()->projectHousingContact->localHousingContact;

        return Inertia::render('Admin/Dashboard', [
            'lhcs' => $lhcs,
        ]);
    }
}
