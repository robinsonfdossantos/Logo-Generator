const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const { createCanvas } = require('canvas');

const {Circle, Triangle, Square} = require("./lib")

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
    message: 'Enter the text color (Color name or hexadecimal number): ',
  },
  {
    type: 'list',
    name: 'font',
    message: 'Choose a font: ',
    choices: ['Arial', 'Helvetica', 'Verdana', 'Times New Roman', 'Calibri', 'Bahnschrift', 'Bradley Hand ITC', 'Cooper Black'],
  },
  {
    type: 'input',
    name: 'fontSize',
    message: 'Enter the font size (Pixels. Enter numbers only! ex: 20): ',
    validate: function (value) {
      return !isNaN(value) || 'Please, follow the example!.';
    },
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
    message: "Enter the shape's color (Color name or hexadecimal number): ",
  },
];

function generateLogo(answers) {
  const { characters, shape } = answers;

  let shapeObject;
  switch (shape) {
    case 'Triangle':
      shapeObject = new Triangle(answers);
      break;
    case 'Square':
      shapeObject = new Square(answers);
      break;
    case 'Circle':
      shapeObject = new Circle(answers);
      break;
    default:
      throw new Error('Invalid shape.');
  }

  const logoSvgContent = shapeObject.getSVG();

  fs.writeFile('logo.svg', logoSvgContent, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('\nGenerated logo.svg');
      console.log('\nOpen logo.svg in a browser to view the logo.');
    }
  });

  const saveLogo = 'examples';
  let saveLogoPath = path.join(saveLogo, `${characters}.svg`);

  // Check if the file already exists
  let counter = 1;
  while (fs.existsSync(saveLogoPath)) {
    const newName = `${characters}${counter}.svg`;
    saveLogoPath = path.join(saveLogo, newName);
    counter++;
  }

  fs.writeFile(saveLogoPath, logoSvgContent, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`\nGenerated a copy in ${saveLogoPath}`);
    }
  });
}

function createREADME(answers) {
  return `# Logo Generator 

  ## Table of Contents
  - [Characters](#characters)
  - [Text Color](#textColor)
  - [Text Font](#font)
  - [Font Size](#fontSize)
  - [Shape](#shape)
  - [Shape Color](#shapeColor)

  ## Characters
  ${answers.characters}
  
  ## Text Color
  ${answers.textColor}

  ## Text Font
  ${answers.font}

  ## Font Size
  ${answers.fontSize}
  
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
      : console.log(`\nGenerated ${fileName} successfully.`)
  );
}

function generateLogoAndReadme() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      generateLogo(answers);

      const readme = createREADME(answers);
      writeToFile('README.md', readme);
    })
    .catch((error) => {
      console.error(error);
    });
}

generateLogoAndReadme();
