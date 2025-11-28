const fetchButton = document.getElementById('fetchUser');
const userContainer = document.getElementById('userContainer');

// Using the Random User API: https://randomuser.me/api/
const API_URL = 'https://randomuser.me/api/';

fetchButton.addEventListener('click', async function() {
    try {
        // 1. SHOW LOADING STATE
        userContainer.innerHTML = '<p>Loading...</p>';

        // 2. FETCH data from the API
        const response = await fetch(API_URL);

        // 3. CHECK if the response is OK
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // 4. PARSE the JSON response
        const data = await response.json();

        // 5. EXTRACT the user data we need
        const user = data.results[0];
        const userName = `${user.name.first} ${user.name.last}`;
        const userEmail = user.email;
        const userPicture = user.picture.medium;

        // 6. UPDATE the DOM with the new user info
        userContainer.innerHTML = `
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
                <img src="${userPicture}" alt="User picture">
                <h3>${userName}</h3>
                <p>Email: ${userEmail}</p>
            </div>
        `;

    } catch (error) {
        // 7. HANDLE any errors
        console.error('Error fetching user:', error);
        userContainer.innerHTML = '<p>Sorry, failed to fetch user data. Please try again.</p>';
    }
});
