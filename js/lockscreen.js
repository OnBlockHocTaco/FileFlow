// import { overall } from './index.js';

const startButton = document.getElementById('startButton');
const lockScreenBackground = document.querySelector('.lock-screen-background');
localStorage.setItem('currentfolder', 'null')
localStorage.setItem('currentnote', 'null')

if (!startButton || !lockScreenBackground) {
    console.error("Start button or lock screen background element not found in the DOM.");
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    console.error("SpeechRecognition API is not supported in this browser.");
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

    //transcript edited here

    // const transcript = "I have a client meeting on May 12th from 1pm to 2pm"


    // Fetch data from the API with the transcript as input
    fetch('https://noggin.rea.gent/distinguished-smelt-4172', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer rg_v1_scwdqh7r34un8lz15btbptzvd19g8lk85t10_ngk'
        },
        body: JSON.stringify({
            input: transcript, // Use the transcript as the input
        }),
    })
    .then(response => response.text()) // Convert response to text
    .then(data => {
        console.log("API response:", data); // Log the API response

        // Redirect based on the LLM output
        if (data.trim() === "note" || data.trim() === "knowledge") {
            const url = `note-creation.html?description=${encodeURIComponent(transcript)}`;
            window.location.href = url;
            // window.location.href = "note-creation.html"; // Redirect to note-creation.html
        // } else if (data.trim() === "todo") {
        //     const url = `todo-creation.html?description=${encodeURIComponent(transcript)}`;
        //     window.location.href = url;
         }
          else if (data.trim() === "calendar") {
              //
              // import fetch from 'node-fetch'; // for node.js

            // const overall = require('./index.js');

            fetch('http://localhost:8000/overall?input=' + encodeURIComponent(transcript), {
                mode: 'no-cors',

            })
            .catch(error => console.error('Error:', error));
            //     .then(response => response.json())
            //     .then(data => {
            //         // Use the data here
            //     });


            // overall(transcript);

            
          }
        //calendar end
        
    })
    .catch(error => {
        console.error("Error fetching API:", error); // Handle any errors
    });
};

let isRecording = false;

startButton.addEventListener('mousedown', function() {
    if (!isRecording) {
        console.log("Mouse down: Recording started");
        recognition.start();
        // Dim the background
        lockScreenBackground.style.opacity = '0.7'; // Dim by 30%
        // Change button image
        startButton.style.backgroundImage = 'url("images/start_button_pressed.png")';
        isRecording = true;
    } else {
        console.log("Mouse down: Recording stopped");
        recognition.stop();
        // Restore the background opacity
        lockScreenBackground.style.opacity = '1';
        // Restore the button image
        startButton.style.backgroundImage = 'url("images/start_button_normal.png")';
        isRecording = false;
    }
});


// startButton.addEventListener('mousedown', function() {
//     console.log("Mouse down: Recording started");
//     recognition.start();
//     // Dim the background
//     lockScreenBackground.style.opacity = '0.7'; // Dim by 30%
//     // Change button image
//     startButton.style.backgroundImage = 'url("images/start_button_pressed.png")';
// });

// startButton.addEventListener('mouseup', function() {
//     console.log("Mouse up: Recording stopped");
//     recognition.stop();
//     // Restore the background opacity
//     lockScreenBackground.style.opacity = '1';
//     // Restore the button image
//     startButton.style.backgroundImage = 'url("images/start_button_normal.png")';
// });

// import { overall }  from './index.js';   
   // const currentFolder = 'null';
    // const startButton = document.getElementById('startButton');
    // const lockScreenBackground = document.querySelector('.lock-screen-background');
    // localStorage.setItem('currentfolder', 'null')
    // localStorage.setItem('currentnote', 'null')

    // if (!startButton || !lockScreenBackground) {
    //     console.error("Start button or lock screen background element not found in the DOM.");
    // }

    // const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    // if (!SpeechRecognition) {
    //     console.error("SpeechRecognition API is not supported in this browser.");
    // }

    // const recognition = new SpeechRecognition();
    // recognition.lang = 'en-US';

    // recognition.onstart = function() {
    //     console.log("Recognition started");
    // };

    // recognition.onerror = function(event) {
    //     console.error("Recognition error:", event.error);
    // };

    // recognition.onend = function() {
    //     console.log("Recognition ended.");
    // };
    // recognition.onresult = function(event) {
    //     console.log("Recognition result:", event.results[0][0].transcript);
    //     const transcript = event.results[0][0].transcript;

    //     // Fetch data from the API with the transcript as input
    //     fetch('https://noggin.rea.gent/distinguished-smelt-4172', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: 'Bearer rg_v1_scwdqh7r34un8lz15btbptzvd19g8lk85t10_ngk'
    //         },
    //         body: JSON.stringify({
    //             input: transcript, // Use the transcript as the input
    //         }),
    //     })
    //     .then(response => response.text()) // Convert response to text
    //     .then(data => {
    //         console.log("API response:", data); // Log the API response

    //         // Redirect based on the LLM output
    //         if (data.trim() === "note") {
    //             const url = `note-creation.html?description=${encodeURIComponent(transcript)}`;
    //             window.location.href = url;
    //             // window.location.href = "note-creation.html"; // Redirect to note-creation.html
    //             // } else if (data.trim() === "todo") {
    //             //     const url = `todo-creation.html?description=${encodeURIComponent(transcript)}`;
    //             //     window.location.href = url;
    //             //  }
    //         } else if (data.trim() === "calendar") {
    //               //
    //               // import fetch from 'node-fetch'; // for node.js

    //             const response = await fetch(
    //               'https://noggin.rea.gent/peaceful-lungfish-5524',
    //               {
    //                 method: 'POST',
    //                 headers: {
    //                   'Content-Type': 'application/json',
    //                   Authorization: 'Bearer rg_v1_mprv6y95lc6y9lnkm0q32dpg4e0b3th87tny_ngk',
    //                 },
    //                 body: JSON.stringify({
    //                   // fill variables here.
    //                   "prompt": transcript,
    //                 }),
    //               }
    //             ).then(response => response.text());
    //           }
    //         //calendar end
            
    //     })
    //     .catch(error => {
    //         console.error("Error fetching API:", error); // Handle any errors
    //     });
    // };

    // startButton.addEventListener('mousedown', function() {
    //     console.log("Mouse down: Recording started");
    //     recognition.start();
    //     // Dim the background
    //     lockScreenBackground.style.opacity = '0.7'; // Dim by 30%
    //     // Change button image
    //     startButton.style.backgroundImage = 'url("images/start_button_pressed.png")';
    // });

    // startButton.addEventListener('mouseup', function() {
    //     console.log("Mouse up: Recording stopped");
    //     recognition.stop();
    //     // Restore the background opacity
    //     lockScreenBackground.style.opacity = '1';
    //     // Restore the button image
    //     startButton.style.backgroundImage = 'url("images/start_button_normal.png")';
    // });

    //const currentFolder = 'null';

//const currentFolder = 'null';
