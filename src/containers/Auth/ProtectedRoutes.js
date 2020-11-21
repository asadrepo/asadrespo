import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {AuthGuard} from "./Auth";


const ProtectedRoutes = ({component: Component, ...rest}) => {

    return (
        <Route {...rest} render={props => (
            AuthGuard() ? (<Component {...props} />): (<Redirect to={{pathname: '/signup'}} />)
        )} />
    );
};

export default ProtectedRoutes;