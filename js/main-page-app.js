window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload() 
    }
};

document.addEventListener('DOMContentLoaded', (event) => {


    const addFolderBtn = document.querySelector('#new-folder-btn');
    const addNoteBtn = document.querySelector('#new-note-btn')
    const folderList = document.querySelector('.folder-list');
    const pastelColors = [
        '#ffd7d5', //pastel pink 
        '#ffebb7', //pastel orange
        '#ffffb5', // Example pastel yellow
        '#d0f4de', //Example pastel green 
        '#a9def9', //Example pastel blue 
        '#e4c1f9', //Example pastel purple 
    ];
    localStorage.setItem('currentfolder', 'null');
    localStorage.setItem('currentnote', 'null');

    addFolderBtn.addEventListener('click', () => {
        window.location.href = `folder-creation.html`;
    });

    addNoteBtn.addEventListener('click', () => {
        window.location.href = 'note-creation.html'
    });

    function getRandomPastelColor() {
        const randomIndex = Math.floor(Math.random() * pastelColors.length);
        return pastelColors[randomIndex];
    };

    for (key in JSON.parse(localStorage.getItem('foldernames'))) {
        // createFolderElement(key); 
        // console.log(key);
        createFolderElement(key);   
    };

    function createFolderElement(folderName) {
        const newFolder = document.createElement('div');
        newFolder.classList.add('folder-item');
        newFolder.textContent = folderName; // You can modify this to set a specific folder name
        newFolder.style.backgroundColor = getRandomPastelColor(); // Set the desired color for the new folder
        newFolder.style.cursor = 'pointer'; // Makes the mouse cursor indicate clickable element
        folderList.appendChild(newFolder);

        // Optional: Adding a button or icon inside the folder div for visual purposes
        const folderIcon = document.createElement('i');
        folderIcon.classList.add('fa-solid', 'fa-arrow-right', 'folder-btn', 'fa-lg');
        folderIcon.style.pointerEvents = 'none'; // Prevents the icon from capturing click events
        newFolder.appendChild(folderIcon);

        // Event listener for the whole folder div
        newFolder.addEventListener('click', function() {
            localStorage.setItem('currentfolder', folderName);
            window.location.href = `internal-folder-view.html`;
        });

    }

});

