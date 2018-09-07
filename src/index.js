import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { data } from './extdata/data';
import { deepCopy } from './lib/index';
import PortfolioBuilder from './Components/PortfolioBuilder/index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PortfolioBuilder data={deepCopy(data)}/>, document.getElementById('root'));
registerServiceWorker();
