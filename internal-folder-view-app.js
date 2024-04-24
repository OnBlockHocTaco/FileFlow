document.addEventListener('DOMContentLoaded', (event) => {
    const addFolderBtn = document.querySelector('.new-note-btn');
    const folderList = document.querySelector('.note-list');
    const pastelColors = [
        '#ffd7d5', //pastel pink 
        '#ffebb7', //pastel orange
        '#ffffb5', // Example pastel yellow
        '#d0f4de', //Example pastel green 
        '#a9def9', //Example pastel blue 
        '#e4c1f9', //Example pastel purple 
    ];

    function getRandomPastelColor() {
        const randomIndex = Math.floor(Math.random() * pastelColors.length);
        return pastelColors[randomIndex];
    }

    addFolderBtn.addEventListener('click', function() {
        const newFolder = document.createElement('div');
        newFolder.classList.add('note-item');
        newFolder.textContent = 'New Note'; // You can modify this to set a specific folder name
        newFolder.style.backgroundColor = getRandomPastelColor(); // Set the desired color for the new folder

        const anchorElement = document.createElement('a');
        anchorElement.href = 'note-creation.html';

        const newFolderButton = document.createElement('button');
        newFolderButton.classList.add('note-btn');
        newFolderButton.textContent = '➡️';

        anchorElement.appendChild(newFolderButton)
        newFolder.appendChild(anchorElement)
        folderList.appendChild(newFolder);
    });
});