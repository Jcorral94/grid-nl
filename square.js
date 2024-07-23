export class Square {
  constructor(x, y, size, context) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.context = context;
    this.selected = false;
  }

  draw() {
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x + this.size, this.y);


    this.context.moveTo(this.x + this.size, this.y);
    this.context.lineTo(this.x + this.size, this.y + this.size);

    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x, this.y + this.size);

    this.context.moveTo(this.x, this.y + this.size);
    this.context.lineTo(this.x + this.size, this.y + this.size);

    this.context.closePath();
    this.context.lineWidth = 1;
    this.context.stroke();

    if (this.selected) {
      this.context.fillStyle = "red";
      this.context.fillRect(this.x, this.y, this.size, this.size);
    }
  }

  isHovering(x, y) {
    return x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size && this.selected;
  }
}