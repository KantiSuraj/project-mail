const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/email.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "email.html"));
});


app.get("*", (req, res) => {
    res.status(404).send("Page Not Found");
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("sendMessage", (data) => {
        console.log(`Message from ${data.from} to ${data.to}: ${data.message}`);

        io.emit("receiveMessage", data); 
    });
    
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});


server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
