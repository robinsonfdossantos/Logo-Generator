class Triangle {
  constructor() {
    this.color = '#000000';
  }

  setColor(color) {
    this.color = color;
  }

  draw(svgRoot) {
   svgRoot.polygon('100,0 50,100 150,100').fill(this.color).move(50, 30);;
  }

  render() {
    return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`;
  }
}

module.exports = Triangle;

