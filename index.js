import { Square } from "./square.js";
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const size = 20;
const grid = [];

init();
window.requestAnimationFrame(draw);

function setCanvasSize() {
  canvas.width = 250;//window.innerWidth;
  canvas.height = 250;//window.innerHeight;
}

function clearRect() {
  context.clearRect(0, 0, canvas.width, canvas.height);
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
  grid[24].selected = true;
}

function draw() {
  clearRect();
  grid.forEach(square => square.draw());
  window.requestAnimationFrame(draw);
}

canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  // console.log('X', mouseX, rect.left, event.clientX - rect.left, 'Y', mouseY, rect.top, event.clientY - rect.top);

  grid.forEach(square => {
    if (square.isHovering(mouseX, mouseY)) {
      // change to a new square
      const random = Math.floor(Math.random() * grid.length);
      square.selected = false;
      console.log(square);
      grid[random].selected = true;
      grid[random].draw();
      console.log(`Mouse is hovering over square at (${square.x}, ${square.y}) & is Selected`);
    }
  });
});
