/* reactFunctionalComponent Syntax */

const reactFunctionalComponent = `
    import React from 'react'
    import PropTypes from 'prop-types'

    [import-css-file]

    function [comp] (props) {
        return (
            <div [create-css-class]>
                <h1>[comp]</h1>
            </div>
        )
    }

    [comp].propTypes = {

    }

    export default [comp]
`;

module.exports = reactFunctionalComponent;
