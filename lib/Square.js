const Shape = require("./shapes");

class Square extends Shape {
  constructor(answers = {}) {
   super(answers)
  }

  render() {
    return `<rect x="100" y="75" width="100" height="100" fill="${this.shapeColor}" />`;
  }
}

module.exports = Square;
