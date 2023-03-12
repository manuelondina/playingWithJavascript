//@author: Manuel Ondina
//@date: 12-Marzo-2023

//Please make sure to read documentation to get the proper voices for the due region.
AWS.config.update({
    accessKeyId: 'INSERT_YOUR_ACCOUNT_ID',
    secretAccessKey: 'INSERT_YOUR_ACCOUNT_SECRET_KEY',
    region: 'INSERT_YOUR_ACCOUNT_REGION'
  });
  
// Create Polly service object
var polly = new AWS.Polly();

// Get list of available voices
var params = {
  LanguageCode: 'en-US'
};

polly.describeVoices(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else {
      var voices = data.Voices;
      var selectElement = document.getElementById('voice-select');
  
      for (var i = 0; i < voices.length; i++) {
        if (voices[i].SupportedEngines.includes('neural')) {
          var optionElement = document.createElement('option');
          optionElement.value = voices[i].Id;
          optionElement.textContent = voices[i].Name;
          selectElement.appendChild(optionElement);
        }
      }
    }
});
  
document.getElementById('synthesize-button').addEventListener('click', function() {
    var textToSynthesize = document.getElementById('text-to-synthesize').value;
    var selectedVoiceId = document.getElementById('voice-select').value;

    var params = {
        OutputFormat: 'mp3',
        Text: textToSynthesize,
        TextType: 'text',
        VoiceId: selectedVoiceId,
        Engine: "neural"
    };

    polly.synthesizeSpeech(params, function(err, data) {
        if (err) console.log(err, err.stack); 
        else {
        var audioPlayer = document.getElementById('audio-player');
        var audioBlob = new Blob([data.AudioStream], { type: 'audio/mpeg' });
        var reader = new FileReader();

        reader.onload = function() {
            audioPlayer.src = reader.result;
            audioPlayer.play();
        };

        reader.readAsDataURL(audioBlob);
        }
    });
});
  