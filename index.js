import { Square } from "./square.js";
const canvas = document.querySelector("canvas");
const pointsLabel = document.querySelector(".points");
const context = canvas.getContext("2d");
let points = 0;
const size = 20;
const grid = [];
const SELECTIONS = 3;
let maxTime = minMax(500, 2000);
let time = null;

init();
window.requestAnimationFrame(draw);

function setCanvasSize() {
  canvas.width = 840;//window.innerWidth;
  canvas.height = 640;//window.innerHeight;
  canvas.style.border = "1px solid black";
  updatePoints();
}

function clearRect() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function updatePoints() {
  pointsLabel.textContent = `Points: ${points}`;
}

function init() {
  setCanvasSize();

  for (let i = 0; i < Math.floor(canvas.width / size); i++) {
    for (let j = 0; j < Math.floor(canvas.height / size); j++) {
      const x = i * size;
      const y = j * size;
      grid.push(new Square(x, y, size, context));
    }
  }
  // grid[24].selected = true;
  setSelectedSquare();
}

function draw(ms) {
  if (!time) time = ms;
  if (ms - time > maxTime) {
    setSelectedSquare();
    time = ms;
  }
  clearRect();
  grid.forEach(square => square.draw());
  window.requestAnimationFrame(draw);
}

function setSelectedSquare() {
  if (grid.length == 0) return;
  grid.forEach(square => square.selected = false);
  for (let i = 0; i < SELECTIONS; i++) {
    const random = Math.floor(Math.random() * grid.length);
    grid[random].selected = true;
  }
}

function minMax(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleMouseMove(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  // console.log('X', mouseX, rect.left, event.clientX - rect.left, 'Y', mouseY, rect.top, event.clientY - rect.top);

  grid.forEach(square => {
    if (square.isHovering(mouseX, mouseY)) {
      points++;
      // change to a new square
      const random = Math.floor(Math.random() * grid.length);
      square.selected = false;
      grid[random].selected = true;
      updatePoints();
      maxTime = minMax(500, 2000);

      // console.log(`Mouse is hovering over square at (${square.x}, ${square.y}) & is Selected`);
    }
  });
}

canvas.addEventListener("mousemove", handleMouseMove);
