document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const output = document.getElementById('output');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';

    recognition.onstart = function() {
        console.log("Recognition started");
        output.textContent = 'Listening...';
        startButton.textContent = 'Listening';
    };

    recognition.onerror = function(event) {
        console.error("Recognition error:", event.error);
        output.textContent = 'Error occurred: ' + event.error;
        startButton.textContent = 'Hold to Record';
    };

    recognition.onend = function() {
        console.log("Recognition ended");
    };

    recognition.onresult = function(event) {
        console.log("Recognition result:", event.results[0][0].transcript);
        const transcript = event.results[0][0].transcript;
        output.textContent = 'You said: ' + transcript;
        startButton.textContent = 'Hold to Record';
    };

    startButton.addEventListener('mousedown', function() {
        console.log("Mouse down: Recording started");
        recognition.start();
    });

    startButton.addEventListener('mouseup', function() {
        console.log("Mouse up: Recording stopped");
        recognition.stop();
    });
});

