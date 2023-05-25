const Shape = require("./shapes");

class Circle extends Shape {
  constructor(answers = {}) {
    super(answers)
   }

  render() {
    return `<circle cx="150" cy="130" r="50" fill="${this.shapeColor}" />`;
  }
}

module.exports = Circle;
