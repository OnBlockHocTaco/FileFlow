window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload() 
    }
};

document.addEventListener('DOMContentLoaded', (event) => {


    const addFolderBtn = document.querySelector('.new-folder-btn');
    const folderList = document.querySelector('.folder-list');
    const pastelColors = [
        '#ffd7d5', //pastel pink 
        '#ffebb7', //pastel orange
        '#ffffb5', // Example pastel yellow
        '#d0f4de', //Example pastel green 
        '#a9def9', //Example pastel blue 
        '#e4c1f9', //Example pastel purple 
    ];
    localStorage.setItem('currentfolder', 'Random');
    localStorage.setItem('currentnote', 'null');



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

        const anchorElement = document.createElement('a');
        anchorElement.href = 'internal-folder-view.html';

        const newFolderButton = document.createElement('button');
        newFolderButton.classList.add('folder-btn');
        newFolderButton.textContent = '➡️';

        anchorElement.appendChild(newFolderButton);
        newFolder.appendChild(anchorElement);
        folderList.appendChild(newFolder);
            
        newFolderButton.addEventListener('click', function() {
            localStorage.setItem('currentfolder', folderName);
            window.location.href = `internal-folder-view.html`;
        });
        
    }

});

