<?php

namespace App\Jobs;

use App\Models\Survey;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use OpenAI\Laravel\Facades\OpenAI;

class RefineSurveyAddress implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public Survey $survey)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $result = OpenAI::chat()->create([
            'model' =>  'gpt-4o',
            'messages' => [
                ['role' => 'system', 'content' => '
                    I will produce a refined output of a given address.
                    Example input: 139 e street, new york, ny 10010
                    Example output: 139 E Street, New York, NY 10010

                    If I dont have enough information to refine the address, I will return the input with an invalid tag:
                    Example input: random text and stuff
                    Example output: random text and stuff #invalid

                    IMPORTANT: I will follow the format of the example output ONLY.
                '],
                ['role' => 'user', 'content' => $this->survey->address],
            ]
        ]);

        $address = $result->choices[0]->message->content;

        $this->survey->fill([
            'address' => $address,
        ]);

        $this->survey->save();
    }
}
