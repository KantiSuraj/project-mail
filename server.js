const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static files from the public folder (your HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

let messages = []; // Store messages here

// Handle sending a message (POST request to /send)
app.post('/send', (req, res) => {
    const { recipient, message } = req.body;
    if (recipient && message) {
        messages.push({ recipient, message });
        res.status(200).json({ success: true, message: 'Message sent!' });
    } else {
        res.status(400).json({ success: false, message: 'Recipient and message are required!' });
    }
});

// Handle fetching inbox messages (GET request to /inbox)
app.get('/inbox', (req, res) => {
    res.json(messages);
});

// Handle other routes, redirect to index.html (so users don't get 404 errors when refreshing the page)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server on the specified port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
