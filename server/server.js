const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Allow dynamic ports (useful for cloud hosting like Heroku)
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
    cors: {
        origin: "*",  // Allow connections from any frontend
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.static("public")); // Serve static files

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle drawing actions
    socket.on("draw", (data) => {
        io.emit("draw", data);
    });

    // Handle clear board event
    socket.on("clear", () => {
        io.emit("clear");
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
