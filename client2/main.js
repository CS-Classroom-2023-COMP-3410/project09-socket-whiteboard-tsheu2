import { io } from "socket.io-client";
import { setupWhiteboard } from "./whiteboard.js";

const socket = io("http://localhost:3000");

document.addEventListener("DOMContentLoaded", () => {
    setupWhiteboard(socket);
});
