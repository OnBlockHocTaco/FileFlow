document.addEventListener('DOMContentLoaded', async function() {
    // Function to extract a query parameter from the URL
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
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

            try {
                const response = await fetch('https://example.com/save-todo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: todoTitle,
                        description: todoDescription
                    })
                });

                if (response.ok) {
                    console.log('ToDo saved successfully.');
                } else {
                    console.error('Failed to save ToDo.');
                }
            } catch (error) {
                console.error('Error saving ToDo:', error);
            }
        });
    }
});
