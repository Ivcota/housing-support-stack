<?php

use App\Models\LocalHousingContact;
use App\Models\User;
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
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(LocalHousingContact::class)->constrained('local_housing_contacts');
            $table->string('address');
            $table->string('file_location');
            $table->enum('status', ['needs_uploader_action', 'pre_review', 'in_review', 'approved', 'rejected'])->default('pre_review');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surveys');
    }
};
