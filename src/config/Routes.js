/*
* Configures the redux router
* */
import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from '../components/Home/';
import Admin from '../components/Admin/';
import Gallery from '../components/Gallery/';

const Routes = (
    <Switch>
        <Route path="/admin/new-gallery" component={() => <Admin dialogOpened={true}/> }/>
        <Route path="/admin" component={Admin}/>
        <Route path="/galleries/:id" component={Gallery}/>
        <Route path="/" component={Home}/>
    </Switch>
);

export default Routes;
