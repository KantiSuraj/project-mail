// Event listeners for switching between views
document.getElementById('composeBtn').addEventListener('click', function () {
    // Show the compose section and hide others
    document.getElementById('composeSection').classList.remove('hidden');
    document.getElementById('inboxSection').classList.add('hidden');
    document.getElementById('sentSection').classList.add('hidden');
});

document.getElementById('inboxBtn').addEventListener('click', function () {
    // Show inbox and hide others
    document.getElementById('composeSection').classList.add('hidden');
    document.getElementById('inboxSection').classList.remove('hidden');
    document.getElementById('sentSection').classList.add('hidden');

    fetchInbox(); // Fetch messages for the inbox
});

document.getElementById('sentBtn').addEventListener('click', function () {
    // Show sent section and hide others
    document.getElementById('composeSection').classList.add('hidden');
    document.getElementById('inboxSection').classList.add('hidden');
    document.getElementById('sentSection').classList.remove('hidden');

    displaySentMessages(); // Display sent messages
});

// Handle form submission (sending the message)
document.getElementById('messageForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const recipient = document.getElementById('recipient').value;
    const message = document.getElementById('message').value;

    // Send the message to the backend
    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recipient, message })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            saveToSent(recipient, message); // Save to sent messages
            fetchInbox(); // Fetch updated inbox
        })
        .catch(error => console.error('Error:', error));

    document.getElementById('messageForm').reset(); // Clear the form
    alert("Message sent!");
});

// Fetch inbox messages
function fetchInbox() {
    fetch('/inbox')
        .then(response => response.json())
        .then(data => {
            const inbox = document.getElementById('inboxMessages');
            inbox.innerHTML = ''; // Clear previous messages

            data.forEach(msg => {
                const messageDiv = document.createElement('div');
                messageDiv.innerHTML = `<strong>From: ${msg.recipient}</strong><p>${msg.message}</p>`;
                inbox.appendChild(messageDiv);
            });
        });
}

// Sent messages stored in local array
let sentMessages = [];

// Save to sent messages
function saveToSent(recipient, message) {
    sentMessages.push({ recipient, message });
}

// Display sent messages
function displaySentMessages() {
    const sentDiv = document.getElementById('sentMessages');
    sentDiv.innerHTML = ''; // Clear previous messages

    sentMessages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `<strong>To: ${msg.recipient}</strong><p>${msg.message}</p>`;
        sentDiv.appendChild(messageDiv);
    });
}