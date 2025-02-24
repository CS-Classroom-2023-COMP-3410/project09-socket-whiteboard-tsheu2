const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;

// Controls
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const clearBoard = document.getElementById("clearBoard");

let drawing = false;
let color = colorPicker.value;
let size = brushSize.value;

const socket = io();  // Auto-detects the server host

// Update color & size when changed
colorPicker.addEventListener("change", (e) => color = e.target.value);
brushSize.addEventListener("input", (e) => size = e.target.value);

// Mouse event handlers
canvas.addEventListener("mousedown", (e) => {
    drawing = true;
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath(); // Stop connecting strokes
});

canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;

    const { offsetX, offsetY } = e;
    socket.emit("draw", { x: offsetX, y: offsetY, color, size });
});

// Listen for drawing events from the server
socket.on("draw", (data) => {
    drawOnCanvas(data.x, data.y, data.color, data.size);
});

// Function to draw on canvas when server confirms
function drawOnCanvas(x, y, color, size) {
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Clear board event
clearBoard.addEventListener("click", () => {
    socket.emit("clear");
});

socket.on("clear", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
