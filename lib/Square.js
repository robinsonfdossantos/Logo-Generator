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

  render() {
    return `<rect x="100" y="50" width="100" height="100" fill="${this.color}" />`;
  }
}

module.exports = Square;
