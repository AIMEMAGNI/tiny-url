const shortenForm = document.getElementById('shortenForm');
const longUrlInput = document.getElementById('longUrlInput');
const shortUrlContainer = document.getElementById('shortUrlContainer');
const copyButton = document.getElementById('copyButton');

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
                const shortUrl = data.result.full_short_link;
                shortUrlContainer.innerText = `Shortened URL: ${shortUrl}`;
                longUrlInput.value = '';

                // Show the "Copy" button after the short link is generated
                copyButton.style.display = 'inline-block';
                copyButton.addEventListener('click', () => {
                    copyToClipboard(shortUrl);
                    copyButton.style.backgroundColor = 'black';
                });
            } else {
                throw new Error(data.error || 'Something went wrong.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Something went wrong. Please try again later.');
        });
});

// Function to copy text to clipboard
function copyToClipboard(text) {
    const dummyElement = document.createElement('textarea');
    dummyElement.value = text;
    document.body.appendChild(dummyElement);
    dummyElement.select();
    document.execCommand('copy');
    document.body.removeChild(dummyElement);
}
