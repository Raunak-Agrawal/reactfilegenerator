# reactfilegenerator

A simple node js cli to build react - .jsx, .(css | scss) and .test.js file

## Installation

    npm install -g reactfilegenerator

## Usage

    reactfilegenerator comp -c Parent     /* Creates new react components 'Parent' */

## Help

    reactfilegenerator --h

## Code Examples

### Create Components using 'comp'

**Command Line**

    reactfilegenerator comp -c ComponentName

**Output**
Creates a file in the working directory (Class Based Component option available with -v C flag, Default is a functional Component):

    import React, { Component } from 'react'
    import PropTypes from 'prop-types'


    class ComponentName extends Component {
        constructor(props){
            super(props)
            this.state = {

            }
        }

        render(){
            return (
                <div>
                    <h1>ComponentName</h1>
                </div>
            )
        }
    }

    ComponentName.propTypes = {

    };

    export default ComponentName

**Additional Flags**

    reactfilegenerator comp -c ComponentName -v C        /* Outputs Class Based Component Syntax */
    reactfilegenerator comp -c ComponentName -v F        /* Outputs Functional Component Syntax */
    reactfilegenerator comp -c ComponentName -f src      /* Specifies output folder */
    reactfilegenerator comp -c ComponentName -s y        /* Creates matching CSS file */
    reactfilegenerator comp -c ComponentName -p y        /* Creates matching SCSS file */
    reactfilegenerator comp -c ComponentName -s y -t y   /* Creates a test file configured with                                                                  react-testing library */

The `-v` flag allows you to specify either Class Based or Functional Based Component syntax.
Functional Based is the default if no version flag is used

The `-f` flag allows you to specify the output folder to match your project architecture

The `-s` flag will create a matched CSS file with the same name as the component. The CSS file will be imported into the component file, and the `<div>` will be given a class-name of "{styles.componentName}".
Create React App supports CSS modules out of the box.

For example:

    reactfilegenerator -c Test -f src -s Y

Will create a `Test.component.jsx` component file in the `./src` directory, and a Test.module.css file in the same directory. The main `<div>` in the render function will have a `className='{styles.Test}'`

## Motivation

I created this after getting frustrated with creating new files everytime I decide to introduce a new component.

reactFileGenerator saves on repeated keystrokes, simplify project development and reduce the time required for creating a working app.

By using this command line interface I was able to think about coding rather than think about syntax.

If you have suggestions for improvements, features or note any errors or corrections, please submit an issue or fork the repo and submit a pull request.

## Contributors

[Raunak Agrawal](https://github.com/Raunak-Agrawal)

Contributions to this project are welcome and will be recognized here,
feel free to create an issue with suggestions for templates or command line flags to include,
additional functionality to speed React development.

Open an issue or fork the repo here (https://github.com/Raunak-Agrawal/reactfilegenerator)

## License

MIT
