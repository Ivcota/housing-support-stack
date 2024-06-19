<h1>
    Survey Uploaded
</h1>
<p>
    As survey has been uploaded for: {{ $survey->address }}. Thank you {{ $survey->localHousingContact->user->name }}!
</p>

<p>
    Check out the survey here: <a href={{ url('/survey/' . $survey->id) }}> {{ $survey->address }} </a>
</p>
