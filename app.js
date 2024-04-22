document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const lockScreenBackground = document.querySelector('.lock-screen-background');

    if (!startButton || !lockScreenBackground) {
        console.error("Start button or lock screen background element not found in the DOM.");
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.error("SpeechRecognition API is not supported in this browser.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        console.log("Recognition started");
    };

    recognition.onerror = function(event) {
        console.error("Recognition error:", event.error);
    };

    recognition.onend = function() {
        console.log("Recognition ended.");
    };

    recognition.onresult = function(event) {
        console.log("Recognition result:", event.results[0][0].transcript);
        const transcript = event.results[0][0].transcript;
    };

    startButton.addEventListener('mousedown', function() {
        console.log("Mouse down: Recording started");
        recognition.start();
        // Dim the background
        lockScreenBackground.style.opacity = '0.7'; // Dim by 30%
        // Change button image
        startButton.style.backgroundImage = 'url("start_button_pressed.png")';
    });

    startButton.addEventListener('mouseup', function() {
        console.log("Mouse up: Recording stopped");
        recognition.stop();
        // Restore the background opacity
        lockScreenBackground.style.opacity = '1';
        // Restore the button image
        startButton.style.backgroundImage = 'url("start_button_normal.png")';
    });
});
