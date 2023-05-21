class Square {
  constructor() {
    this.color = '#000000';
  }

  setColor(color) {
    this.color = color;
  }

  draw(svgRoot) {
    svgRoot.rect(100, 100).fill(this.color).move(50, 50);
  }
}

module.exports = Square;
