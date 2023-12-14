// Function to fetch and display the meaning of a word
function getMeaning(word) {
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Extract relevant data from the API response
            let meanings = data[0].meanings;
            let audioSource = data[0].phonetics[0].audio.toString();
            let paragraph = document.createElement('div');
            let list = document.createElement('ul');
            list.style.listStyleType = 'none';

            // Iterate over different parts of speech and their definitions
            for (let partOfSpeech of meanings) {
                let listItem = document.createElement('li');
                listItem.innerHTML = `PartOfSpeech: <b>${partOfSpeech.partOfSpeech}</b>`;
                let subList = document.createElement('ol');

                for (let definition of partOfSpeech.definitions) {
                    let subListItem = document.createElement('li');
                    subListItem.innerHTML = `${definition.definition}`;
                    subList.appendChild(subListItem);
                }

                listItem.appendChild(subList);
                list.appendChild(listItem);
            }

            // Create and structure the HTML for displaying the word meaning
            document.querySelector('.meaning-forward').innerHTML = '';
            paragraph.innerHTML = `
                <i class="fa-solid fa-volume-high" id="audio-icon"></i>
                <audio id="audio">
                    <source src=${audioSource} type='audio/mpeg'>
                </audio>
                Word: <b>${data[0].word}</b>
            `;

            // Append the structured HTML to the DOM
            document.querySelector('.meaning-forward').appendChild(paragraph);
            document.querySelector('.meaning-forward').appendChild(list);

            // Add event listener to the audio icon for playing the pronunciation
            document.querySelector('#audio-icon').addEventListener('click', () => {
                document.querySelector('#audio').play();
            });

            return data;
        })
        .catch(error => {
            // Handle and log errors during the fetch process
            console.error('Error fetching the meaning', error);
            throw error;
        });
}

// Attach a submit event to the form element
document.querySelector('.dict-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let word = document.querySelector('.word-input').value;

    // Use the promise returned by getMeaning
    getMeaning(word)
        .then((data) => {
            console.log('Data retrieved:', data);
        })
        .catch((error) => {
            console.error('Error fetching the meaning', error);
        });
});

// Attach click event to the search button
document.querySelector('.button-search').addEventListener('click', (event) => {
    event.preventDefault();
    let word = document.querySelector('.word-input').value;

    // Use the promise returned by getMeaning
    getMeaning(word)
        .then((data) => {
            console.log('Data retrieved:', data);
        })
        .catch((error) => {
            console.error('Error fetching the meaning', error);
        });
});