import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {AuthGuard, removeUserStorage} from "./Auth";

const Logout = () => {
        removeUserStorage();
        if(AuthGuard()){
             return  (<Redirect to="/" />);
        }


        return (<Redirect to="/signup" />);

}

export default Logout;