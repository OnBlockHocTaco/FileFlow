// document.addEventListener('DOMContentLoaded', function () {
//     document.querySelector('#folder-creation').addEventListener('submit', function(event) {
//         event.preventDefault();
    
//         const folderName = document.querySelector('.folder-title').value;
//         const newFolderName = {
//             folderName: folderName
//         };
    
//         saveFolder(newFolderName)
       
//     });
    
//     function saveFolder(newFolderName){
//         const storedFolderNames = JSON.parse(localStorage.getItem('foldernames')) || {};
//         storedFolderNames[newFolderName.folderName] = newFolderName;
//         localStorage.setItem('foldernames', JSON.stringify(storedFolderNames));
//     }
// });

    // document.addEventListener('DOMContentLoaded', function () {
    function createFolder(newFolderName) {
        const storedFolderNames = JSON.parse(localStorage.getItem('foldernames')) || {};
        storedFolderNames[newFolderName] = newFolderName;
        localStorage.setItem('foldernames', JSON.stringify(storedFolderNames)); 
    };

    function verifyFolderName(newFolderName) {
        const folderNames = JSON.parse(localStorage.getItem('foldernames')) || {};

        if (newFolderName == '') {
            alert("Folder name cannot be empty");
            return false
        } else if (newFolderName in folderNames) {
            alert("Folder name already exists");
            return false
        }
        return true

    }

    function createFolderPage(folderName) {
        localStorage.setItem('currentFolder', folderName);
        window.location.href = `internal-folder-view.html`;
    }

    document.querySelector('#folder-creation').addEventListener('submit', function(event) {
        event.preventDefault();
        const folderName = document.querySelector('.folder-title').value;
        if (verifyFolderName(folderName)) {
            createFolder(folderName);
            createFolderPage(folderName);
        }
    });

// });
