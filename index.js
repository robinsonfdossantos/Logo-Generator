const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const { createCanvas } = require('canvas');

const Triangle = require('./lib/Triangle');
const Square = require('./lib/Square');
const Circle = require('./lib/Circle');

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

function generateLogo(answers) {
  const { characters, textColor, shape, shapeColor } = answers;

  const window = createSVGWindow();
  const document = window.document;
  registerWindow(window, document);

  const canvas = SVG(document.documentElement).size(300, 200);

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
  shapeObject.draw(canvas);

  const text = canvas.text(characters).fill(textColor);

  const textWidth = text.bbox().width;
  const textHeight = text.bbox().height;
  const textX = 100 - textWidth / 2;
  const textY = 100 - textHeight / 2;

  text.move(textX, textY);

  const logoSvgContent = canvas.svg();

  fs.writeFile('logo.svg', logoSvgContent, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Generated logo.svg');
      console.log('Open logo.svg in a browser to view the logo.');
    }
  });

  const saveLogo = 'examples';
  const saveLogoPath = path.join(saveLogo, `${characters}.svg`);

  fs.writeFile(saveLogoPath, logoSvgContent, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Generated ${saveLogoPath}`);
      console.log(`Open ${saveLogoPath} in a browser to view the logo.`);
    }
  });
}

function createREADME(answers) {
  return `# Logo Generator 

  ## Table of Contents
  - [Characters](#characters)
  - [Text Color](#textColor)
  - [Shape](#shape)
  - [Shape Color](#shapeColor)

  ## Characters
  ${answers.characters}
  
  ## Text Color
  ${answers.textColor}
  
  ## Shape
  ${answers.shape}
  
  ## Shape Color
  ${answers.shapeColor}
  `;
}

function writeToFile(fileName, content) {
  fs.writeFile(fileName, content, (err) =>
    err
      ? console.error(err)
      : console.log(`Generated ${fileName} successfully.`)
  );
}

function generateLogoAndReadme() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      generateLogo(answers);

      const readmeContent = createREADME(answers);
      writeToFile('README.md', readmeContent);
    })
    .catch((error) => {
      console.error(error);
    });
}

generateLogoAndReadme();
