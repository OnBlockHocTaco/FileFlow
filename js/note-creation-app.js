document.addEventListener('DOMContentLoaded', async function() {
    // Function to extract a query parameter from the URL
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
    document.getElementById('backButton').addEventListener('click', function() {
        window.location.href = 'main-page.html';
    });
    //autofill stored note contents if current note is not null
    if (localStorage.getItem('currentnote') != 'null'){
        storedNote = JSON.parse(localStorage.getItem(localStorage.getItem('currentfolder')))[localStorage.getItem('currentnote')]; // returns note json object
        const noteTitle = document.querySelector('#notetitle');
        const noteDescription = document.querySelector('.description-input');
        
        noteTitle.placeholder = storedNote.noteTitle;
        noteDescription.placeholder = storedNote.noteDescription;
    }



    const selectMenu = document.querySelector('.form-select')
    const folderNameListDict = JSON.parse(localStorage.getItem('foldernames'))
    for (key in folderNameListDict){
        folderNameOption = document.createElement('option')
        folderNameOption.value = key
        folderNameOption.innerText = key
        selectMenu.appendChild(folderNameOption)
    }

    selectMenu.value = localStorage.getItem('currentfolder')




    chosenFolder = selectMenu.value

    const descriptionInput = document.querySelector('.description-input');
    const noteTitleInput = document.querySelector('.new-note-btn input');

    if (descriptionInput) {
        const description = getQueryParam('description');
        if (description) {
            descriptionInput.value = description; // Auto-fill with the transcript
            
            try {
                //ADD LLM PIPING HERE
                //GET LIST OF FOLDERS
                folder_list = []
                for (key in JSON.parse(localStorage.getItem('foldernames'))) {
                    // createFolderElement(key); 
                    // console.log(key);
                    folder_list.push(key);
                };

                console.log(folder_list);

                // import fetch from 'node-fetch'; // for node.js

                const folderFit = await fetch(
                    'https://noggin.rea.gent/sheer-puma-5142',
                    {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer rg_v1_7xr7sk62ptnfhsy4i8sg9d4rr0goqqv3vkmz_ngk',
                    },
                    body: JSON.stringify({
                        // fill variables here.
                        "folders": folder_list.join(", "),
                        "description": description,
                    }),
                    }
                ).then(response => response.text());

                selectMenu.value = folderFit;

                localStorage.setItem('currentFolder', folderFit);


                // Call the LLM endpoint to generate a topic/title based on the description
                const response = await fetch(
                  'https://noggin.rea.gent/selected-fox-1274',
                  {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          Authorization: 'Bearer rg_v1_188s94fapv4rlzvzgmiy3d5dha75hnoa8bhm_ngk',
                      },
                      body: JSON.stringify({
                          "note": description, // Use the description as input
                      }),
                  }
                );

                const generatedTitle = await response.text(); // Get the generated title from the response

                if (noteTitleInput) {
                    noteTitleInput.value = generatedTitle; // Set the generated title as the note topic
                }
            } catch (error) {
                console.error("Error fetching generated topic:", error);
            }
        } 
    }

    document.getElementById('backButton').addEventListener('click', function() {
        window.location.href = 'main-page.html';
    });
});

document.querySelector('#note-creation').addEventListener('submit', function(event) {
    event.preventDefault();
    selectedFolder = document.querySelector('.form-select').value;

    const noteTitle = document.getElementById('notetitle').value;
    const noteDescription = document.querySelector('.description-input').value;
    const selectMenu = document.querySelector('.form-select')

    const currentFolder = selectMenu.value

    console.log(selectMenu.value)



    // console.log(currentFolder)
    localStorage.setItem('currentFolder', currentFolder);
    // localStorage.setItem('currentFolder', currentFolder);

    const newNote = {
        noteTitle: noteTitle,
        noteFolder: currentFolder,
        noteDescription: noteDescription,
        isNote: true,
    };

    saveNewNote(newNote, currentFolder);

    window.location.href = 'internal-folder-view.html';
});
    
function saveNewNote(newNote, currentFolder) {
    const currentFolderNotes = JSON.parse(localStorage.getItem(currentFolder)) || {};
    currentFolderNotes[newNote.noteTitle] = newNote
    localStorage.setItem(currentFolder, JSON.stringify(currentFolderNotes));
}


