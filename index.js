const inquirer = require('inquirer');
const fs = require('fs');

const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const { createCanvas } = require('canvas');

const Triangle = require('./lib/Triangle');
const Square = require('./lib/Square');
const Circle = require('./lib/Circle');

// ***** Questions to generate the Logo and create README ******
const questions = [
  {
    type: 'input',
    name: 'characters',
    message: 'Enter up to three characters: ',
    validate: function (value) {
      return value.length <= 3 || 'Please enter up to three characters.';
    },
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (keyword or hexadecimal number): ',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape:',
    choices: ['Triangle', 'Square', 'Circle'],
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: "Enter the shape's color (keyword or hexadecimal number): ",
  },
];

// **** Function of Logo Generator ****
function generateLogo(answers) {
  const { characters, textColor, shape, shapeColor } = answers;

  const window = createSVGWindow();
  const document = window.document;
  registerWindow(window, document);

  const canvas = SVG(document.documentElement).size(300, 200); // Set the size of the SVG canvas

  const ctx = createCanvas(300, 200).getContext('2d');

  let shapeObject;
  switch (shape) {
    case 'Triangle':
      shapeObject = new Triangle();
      break;
    case 'Square':
      shapeObject = new Square();
      break;
    case 'Circle':
      shapeObject = new Circle();
      break;
    default:
      throw new Error('Invalid shape selected.');
  }
  shapeObject.setColor(shapeColor);
  shapeObject.draw(ctx);

  ctx.font = '40px Arial';
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(characters, 150, 100); // Position the text in the center of the canvas

  const logoSvgContent = canvas.svg();

  fs.writeFile('logo.svg', logoSvgContent, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Generated logo.svg');
      console.log('Open logo.svg in a browser to view the logo.');
    }
  });
}

// **** Function to create README ****
function createREADME(answers) {
  const { characters, textColor, shape, shapeColor } = answers;

  return `# Logo Generator

## Table of Contents
- [Characters](#characters)
- [Text Color](#textColor)
- [Shape](#shape)
- [Shape Color](#shapeColor)

## Characters
${characters}

## Text Color
${textColor}

## Shape
${shape}

## Shape Color
${shapeColor}
`;
}

// *** Function to write README file ***
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    err ? console.error(err) : console.log('Congratulations!! README.md created :)')
  );
}

// **** Function call Logo Generator or README creator ****
function generateLogoAndReadme(answers) {
  generateLogo(answers);
  const readme = createREADME(answers);
  writeToFile('README.md', readme);
}

// **** Function to prompt for input and generate logo and readme ****
function promptForInput() {
  inquirer.prompt(questions).then((answers) => {
    generateLogoAndReadme(answers);
  });
}

if (require.main === module) {
  promptForInput();
}

module.exports = {
  generateLogo,
};



//const saveLogo = './examples/'
//fs.writeFileSync(`${saveLogo}${answers.characteres}`, logo.renderLogo());

