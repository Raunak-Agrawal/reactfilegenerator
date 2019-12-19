/* React Testing Library Syntax */

const testTemplate = `import React from 'react';
  import { render } from '@testing-library/react';

  import [comp] from './[comp].component.jsx';

  test('renders learn react link', () => {
    const { getByText } = render(<[comp] />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });`;

module.exports = testTemplate;
