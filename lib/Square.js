class Square {
  constructor() {
    this.color = 'black';
  }

  setColor(color) {
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(50, 50, 200, 100);
  }
}

module.exports = Square;
