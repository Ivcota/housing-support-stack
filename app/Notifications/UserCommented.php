<?php

namespace App\Notifications;

use App\Models\Comment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Slack\BlockKit\Blocks\ActionsBlock;
use Illuminate\Notifications\Slack\BlockKit\Blocks\SectionBlock;
use Illuminate\Notifications\Slack\SlackMessage;
use OpenAI\Laravel\Facades\OpenAI;

class UserCommented extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Comment $comment)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['slack'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    public function toSlack(object $notifiable): SlackMessage
    {
        $result = OpenAI::chat()->create([
            'model' =>  'gpt-4o',
            'messages' => [
                ['role' => 'system', 'content' => '
                    I will produce a custom slack notification regarding a comment to a survey.
                    I also will include a bit of wit and humor.
                    Example input: John Doe has commented on a survey location "123 Main St, New York, NY 12345". Comment: "Hey thanks for sending that."
                    Example output: Knock kock, Johnny made a comment on the survey location "123 Main St, New York, NY 12345". Be said thanks basically.
                '],
                ['role' => 'user', 'content' => $this->comment->user->name . ' has commented on a survey location ' . $this->comment->survey->address . '. Comment: "' . $this->comment->comment . '"'],
            ]
        ]);

        $slackNotificationMessage = $result->choices[0]->message->content;

        return (new SlackMessage)
            ->text($slackNotificationMessage)
            ->headerBlock('Comment')
            ->sectionBlock(function (SectionBlock $block) {
                $result = OpenAI::chat()->create([
                    'model' =>  'gpt-4o',
                    'messages' => [
                        ['role' => 'system', 'content' => '
                        I will provide a funny and witty tldr for a given comment:
                        Example input: John Doe has commented on a survey location "123 Main St, New York, NY 12345". Comment: "Hey thanks for sending that."
                        Example output: Knock kock, Johnny made a comment on the survey location "123 Main St, New York, NY 12345". Be said thanks basically.
                        Example output: Uhh, John would like to say thanks for sending that.
                '],
                        ['role' => 'user', 'content' => $this->comment->user->name . ' has commented on a survey location ' . $this->comment->survey->address . '. Comment: "' . $this->comment->comment . '"'],
                    ]
                ]);

                $slackNotificationMessage = $result->choices[0]->message->content;
                $block->text($slackNotificationMessage);
            })
            ->sectionBlock(function (SectionBlock $block) {
                $block->text($this->comment->user->name . " says:");
            })
            ->sectionBlock(function (SectionBlock $block) {
                $block->text($this->comment->comment);
            })
            ->actionsBlock(function (ActionsBlock $block) {
                $block->button('View Comment')->url(route('survey.show', $this->comment->survey->id));
            });
    }


    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
