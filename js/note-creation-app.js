document.addEventListener('DOMContentLoaded', async function() {
    // Function to extract a query parameter from the URL
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
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

    const descriptionInput = document.querySelector('.description-input');
    const noteTitleInput = document.querySelector('.new-note-btn input');

    if (descriptionInput) {
        const description = getQueryParam('description');
        if (description) {
            descriptionInput.value = description; // Auto-fill with the transcript
            
            try {
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

    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'lockscreen.html'; // Navigate back to lockscreen
        });
    }
});

document.querySelector('#note-creation').addEventListener('submit', function(event) {
    event.preventDefault();
    selectedFolder = document.querySelector('.form-select').value;

    const noteTitle = document.getElementById('notetitle').value;
    const noteDescription = document.querySelector('.description-input').value;
    const selectMenu = document.querySelector('.form-select')
    const currentFolder = selectMenu.value

    const newNote = {
        noteTitle: noteTitle,
        noteDescription: noteDescription
    };

    saveNewNote(newNote, currentFolder);
});
    
function saveNewNote(newNote, currentFolder) {
    const currentFolderNotes = JSON.parse(localStorage.getItem(currentFolder)) || {};
    currentFolderNotes[newNote.noteTitle] = newNote
    localStorage.setItem(currentFolder, JSON.stringify(currentFolderNotes));
}


