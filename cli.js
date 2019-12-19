const program = require('commander');
const fs = require('fs');
const fx = require('mkdir-recursive');
const path = require('path');

const reactClassComponent = require('./templates/ReactClassComponent');
const reactFunctionalComponent = require('./templates/ReactFunctionalComponent');
const cssFileTemplate = require('./templates/CssTemplate');
const testFileTemplate = require('./templates/TestTemplate');

program.version('0.0.1');

let componentTemplate = '';
let componentTemplateResult = '';
let componentFileName = '';
let cssTemplateResult = '';
let testTemplateResult = '';
let directoryForFile = path.resolve(__dirname);
let hasCssPrefix = false;

program
  .command('comp')
  .description('create components')
  .option('-c, --componentName [name]', 'Create Component', 'layout')
  .option(
    '-v, --componentType [type]',
    'Component Type Class or Functional',
    'F'
  )
  .option('-f, --folder [folder]', 'Folder [./]', './')
  .option('-s, --cssFile [cssFile]', 'Create CSS [No]', 'No')
  .option('-p, --cssFilePrefix [type]', 'CSS Prefix [No]', 'No')
  .option('-t, --testFile [testFile]', 'Create Test file [No]', 'No')
  .action(function(componentName, options) {
    console.log('Composing components...');
    console.log('Creating React component: ');
    console.log('  - Component Name: %s ', this.componentName);
    console.log('  - Component Type: %s ', this.componentType);
    console.log('  - Folder: %s ', this.folder);
    console.log('  - CSS file created: %s ', this.cssFile);
    console.log('  - Test file created: %s ', this.testFile);

    //select Component Type as class based or functional-> default is functional
    if (this.componentType === 'C') componentTemplate = reactClassComponent;
    else componentTemplate = reactFunctionalComponent;

    if (this.cssFilePrefix === 'y' || this.cssFilePrefix === 'Y') {
      hasCssPrefix = true;
    }

    //Create component file from template, replacing holder text with componentName
    //basic replacment regardless of CSS flag
    componentTemplateResult = componentTemplate.replace(
      /\[comp\]/g,
      this.componentName[0].toUpperCase() + this.componentName.substring(1)
    );

    //Handle CSS flag (-s)
    //Import CSS, create CSS from Template and add className to div of component file
    if (this.cssFile === 'y' || this.cssFile === 'Y') {
      componentTemplateResult = componentTemplateResult.replace(
        /\[import-css-file\]/g,
        `import styles from './${this.componentName}.module.${
          hasCssPrefix ? 'scss' : 'css'
        }'`
      );
      componentTemplateResult = componentTemplateResult.replace(
        /\[create-css-class\]/g,
        `className={styles.${this.componentName}}`
      );

      cssTemplateResult = cssFileTemplate.replace(
        /\[comp\]/g,
        this.componentName
      );
    } else {
      //remove CSS references from template
      //result = template.replace(/\[comp\]/g, this.componentName)
      componentTemplateResult = componentTemplateResult.replace(
        /\[import-css-file\]/g,
        ''
      );
      componentTemplateResult = componentTemplateResult.replace(
        /\[create-css-class\]/g,
        ''
      );
    }

    //Handle Test flag (-t)
    //Create Test file from Template
    if (this.testFile === 'y' || this.testFile === 'Y') {
      testTemplateResult = testFileTemplate.replace(
        /\[comp\]/g,
        this.componentName
      );
    }

    //build strings for directory and file outputs
    if (this.folder) {
      directoryForFile = path.join(directoryForFile, this.folder, '/');
    }

    //Check for -f directory and create if doesn't exist
    if (!fs.existsSync(directoryForFile)) {
      console.log('Directory does not exist: ' + directoryForFile);
      fx.mkdirSync(directoryForFile, function(err) {
        console.log('done');
      });
    } else {
      console.log('Directory exists: ' + directoryForFile);
    }

    //create component file in proper directory
    componentFileName =
      directoryForFile + this.componentName + '.component.jsx';
    fs.writeFile(componentFileName, componentTemplateResult, 'utf8', function(
      err
    ) {
      if (err) return console.log(err);
      console.log('New Component file created: ', componentFileName);
    });

    //create CSS file in proper directory
    if (this.cssFile === 'y' || this.cssFile === 'Y') {
      let cssFilename =
        directoryForFile +
        this.componentName +
        `.module.${hasCssPrefix ? 'scss' : 'css'}`;
      fs.writeFile(cssFilename, cssTemplateResult, 'utf8', function(err) {
        if (err) return console.log(err);
        console.log(
          `New ${hasCssPrefix ? 'SCSS' : 'CSS'} file created: ${cssFilename}`
        );
      });
    }

    //create test file
    if (this.testFile === 'y' || this.testFile === 'Y') {
      let testFilename = directoryForFile + this.componentName + '.test.js';

      fs.writeFile(testFilename, testTemplateResult, 'utf8', function(err) {
        if (err) return console.log(err);
        console.log('New Test file created: ', testFilename);
      });
    }
  });
program.parse(process.argv);
