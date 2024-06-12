<?php

use App\Models\ProjectHousingContact;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('local_housing_contacts', function (Blueprint $table) {
            $table->foreignIdFor(ProjectHousingContact::class)->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('local_housing_contacts', function (Blueprint $table) {
            $table->dropForeignIdFor(ProjectHousingContact::class);
        });
    }
};
