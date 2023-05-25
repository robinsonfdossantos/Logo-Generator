class Shape{
  constructor({ characters, textColor, font, fontSize, shapeColor } ){
    this.textColor = textColor;
    this.font = font;
    this.characters = characters;
    this.fontSize = fontSize;
    this.shapeColor = shapeColor;
  }

  render(){
    return 'implement in child class'
  }

  getSVG(){
    return `
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="200">

      ${this.render()}

      <text x="150" y="140" font-family="${this.font}" font-size="${this.fontSize}" text-anchor="middle" fill="${this.textColor}">${this.characters}</text>
    </svg>
    `
  }
}

module.exports = Shape;