const shortenForm = document.getElementById('shortenForm');
const longUrlInput = document.getElementById('longUrlInput');
const shortUrlContainer = document.getElementById('shortUrlContainer');

shortenForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const longUrl = longUrlInput.value;

    if (!longUrl) {
        alert('Please enter a valid URL.');
        return;
    }

    fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(longUrl)}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.ok) {
                shortUrlContainer.innerText = `Shortened URL: ${data.result.full_short_link}`;
                longUrlInput.value = '';
            } else {
                throw new Error(data.error || 'Something went wrong.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Something went wrong. Please try again later.');
        });
});
