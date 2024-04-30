document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#folder-creation').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const folderName = document.querySelector('.folder-title').value;
        const newFolderName = {
            folderName: folderName
        };
    
        saveFolder(newFolderName)
       
    });
    
    function saveFolder(newFolderName){
        const storedFolderNames = JSON.parse(localStorage.getItem('foldernames')) || {};
        storedFolderNames[newFolderName.folderName] = newFolderName;
        localStorage.setItem('foldernames', JSON.stringify(storedFolderNames));
    }
});

