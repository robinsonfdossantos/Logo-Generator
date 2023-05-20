class Triangle {
  constructor() {
    this.color = '#000000'; // Default color is black
  }

  setColor(color) {
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(150, 50);
    ctx.lineTo(250, 150);
    ctx.lineTo(50, 150);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

module.exports = Triangle;
