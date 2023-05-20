class Circle {
  constructor() {
    this.color = '#000000'; // Default color is black
  }

  setColor(color) {
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(150, 100, 50, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

module.exports = Circle;