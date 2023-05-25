const Shape = require("./shapes");

class Triangle extends Shape {
  constructor(answers = {}) {
    super(answers)
  }

  render() {
    return `<polygon points="150, 18 244, 182 56, 182" fill="${this.shapeColor}" />`;
  }
}

module.exports = Triangle;

