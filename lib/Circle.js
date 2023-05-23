class Circle {
  constructor() {
    this.color = '#000000';
  }

  setColor(color) {
    this.color = color;
  }

  draw(svgRoot) {
    const circle = svgRoot.circle(100).fill(this.color).move(50, 50);
  }

  render() {
    return `<circle cx="150" cy="100" r="50" fill="${this.color}" />`;
  }
}

module.exports = Circle;
