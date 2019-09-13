// using ES6 modules
import { HashRouter, Switch, Route, NavLink, withRouter } from "react-router-dom";

import React from 'react';
import Home from '../home';
import Login from '../login';


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
        </Switch>
    </HashRouter>
);


export default BasicRoute;