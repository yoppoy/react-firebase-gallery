import React from 'react';
import ReactDOM from 'react-dom';
import RouterConfig from './config/RouterConfig';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

ReactDOM.render(
    <RouterConfig/>,
    document.getElementById('root')
);
registerServiceWorker();
