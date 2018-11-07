/*
* Configures the redux router
* */
import React, {Fragment} from 'react';
import {BrowserRouter} from 'react-router-dom';
import TopBar from '../components/TopBar';
import Routes from './Routes';
import {Map} from "google-maps-react";

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
