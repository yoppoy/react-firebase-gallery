/*
* Configures the redux router
* */
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import TopBar from '../components/TopBar';
import Routes from './Routes';

const RouterConfig = () => (
    <BrowserRouter>
        <div className={'fillPage'}>
            <TopBar id={'header'}/>
            <div className="content">
                {Routes}
            </div>
        </div>
    </BrowserRouter>
);

export default RouterConfig;
