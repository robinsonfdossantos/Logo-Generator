const Triangle = require("../lib/Triangle");
const Circle = require("../lib/Circle");
const Square = require("../lib/Square");

describe("Shape Classes", () => {
  describe("Triangle", () => {
    test("render() returns SVG string with the given shape color", () => {
      const shape = new Triangle({
        characters: "ABC",
        textColor: "black",
        font: "Arial",
        fontSize: 20,
        shapeColor: "blue",
      });
      expect(shape.render()).toEqual(
        '<polygon points="150, 18 244, 182 56, 182" fill="blue" />'
      );
    });
  });

  describe("Circle", () => {
    test("render() returns SVG string with the given shape color", () => {
      const shape = new Circle({
        characters: "XYZ",
        textColor: "white",
        font: "Verdana",
        fontSize: 20,
        shapeColor: "red",
      });
      expect(shape.render()).toEqual(
        '<circle cx="150" cy="130" r="50" fill="red" />'
      );
    });
  });

  describe("Square", () => {
    test("render() returns SVG string with the given shape color", () => {
      const shape = new Square({
        characters: "123",
        textColor: "green",
        font: "Courier",
        fontSize: 20,
        shapeColor: "yellow",
      });
      expect(shape.render()).toEqual(
        '<rect x="100" y="75" width="100" height="100" fill="yellow" />'
      );
    });
  });
});
