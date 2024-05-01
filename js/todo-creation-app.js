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

    const descriptionInput = document.querySelector('.description-input');
    const todoTitleInput = document.querySelector('.new-todo-btn input');

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

                if (todoTitleInput) {
                    todoTitleInput.value = generatedTitle; // Set the generated title as the ToDo title
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

    const submitButton = document.querySelector('.submitbtn');
    if (submitButton) {
        submitButton.addEventListener('click', async function(event) {
            event.preventDefault();

            const todoTitle = document.querySelector('.new-todo-btn input').value;
            const todoDescription = document.querySelector('.description-input').value;
            const selectedFolder = document.querySelector('.form-select').value;
            const todoDueDate = document.querySelector('.date-input').value;
            const todoPriority = document.querySelector('.priority-input').value;
            
            localStorage.setItem('currentFolder', selectedFolder);

            const newToDo = {
                todoTitle: todoTitle,
                todoDescription: todoDescription,
                todoFolder: selectedFolder,
                todoDueDate: todoDueDate,
                todoPriority: todoPriority,
                isNote: false,
            }
            
            saveNewToDo(newToDo, selectedFolder);

            window.location.href = 'internal-folder-view.html';



        });
    }
});


function saveNewToDo(newNote, currentFolder) {
    const currentFolderNotes = JSON.parse(localStorage.getItem(currentFolder)) || {};
    currentFolderNotes[newNote.todoTitle] = newNote
    localStorage.setItem(currentFolder, JSON.stringify(currentFolderNotes));
}
