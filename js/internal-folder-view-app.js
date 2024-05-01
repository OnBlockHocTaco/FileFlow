document.addEventListener('DOMContentLoaded', (event) => {

    //label values
    var currentFolder = localStorage.getItem("currentFolder");
    var folderLabel = document.querySelector('.folders-label');
    if (currentFolder == null) {
        document.title = "Folder";
    } else {
        document.title = currentFolder;
        if (folderLabel) {
            folderLabel.textContent = 'Folder: ' + currentFolder;
        }
    }

    const addNoteBtn = document.querySelector('.new-note-btn');
    const noteList = document.querySelector('.note-list');

    const pastelColors = [
        '#ffd7d5', //pastel pink 
        '#ffebb7', //pastel orange
        '#ffffb5', // Example pastel yellow
        '#d0f4de', //Example pastel green 
        '#a9def9', //Example pastel blue 
        '#e4c1f9', //Example pastel purple 
    ];

    const folderNameDisplay = document.querySelector('.folders-label');
    folderNameDisplay.innerText = 'Folder: ' + currentFolder

    function getRandomPastelColor() {
        const randomIndex = Math.floor(Math.random() * pastelColors.length);
        return pastelColors[randomIndex];
    }

    addNoteBtn.addEventListener('click', function() {
        const newNote = document.createElement('div');
        newNote.classList.add('note-item');
        newNote.textContent = 'New Note or TODO MAYBE'; // You can modify this to set a specific folder name
        newNote.style.backgroundColor = getRandomPastelColor(); // Set the desired color for the new folder

        const anchorElement = document.createElement('a');
        anchorElement.href = 'note-creation.html';

        const newNoteButton = document.createElement('button');
        newNoteButton.classList.add('note-btn');
        newNoteButton.textContent = '➡️';

        anchorElement.appendChild(newNoteButton)
        newNote.appendChild(anchorElement)
        noteList.appendChild(newNote);
    });

    loadStoredNotes();

    function loadStoredNotes () {        
        folderContents = JSON.parse(localStorage.getItem(currentFolder))
        if (folderContents == 'null') {
            return;
        }
        for (key in folderContents) {
            const newNote = document.createElement('div');
            newNote.classList.add('note-item');
            newNote.textContent = key; // You can modify this to set a specific folder name
            newNote.style.backgroundColor = getRandomPastelColor(); // Set the desired color for the new folder

            const anchorElement = document.createElement('a');
            anchorElement.href = 'note-creation.html';  

            const accessNoteButton = document.createElement('button');
            accessNoteButton.classList.add('note-btn');
            accessNoteButton.textContent = '➡️';

            anchorElement.appendChild(accessNoteButton);
            newNote.appendChild(anchorElement);
            folderList.appendChild(newNote);
        }
    };
});
