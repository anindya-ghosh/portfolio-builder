import React from 'react';
import ReactDOM from 'react-dom';
import PortfolioBuilder from './PortfolioBuilder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PortfolioBuilder />, div);
  ReactDOM.unmountComponentAtNode(div);
});
