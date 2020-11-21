import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../Home/Home';
import { Profile } from '../Profile';
import SearchResult from '../SearchResult/SearchResult';
import { Signup } from '../Signup';
import ForgotPassword from '../Auth/ForgotPassword';
import Logout from '../Auth/Logout';
import ProtectedRoutes from "../Auth/ProtectedRoutes";
import { Header } from '../../components/partials/Header';
import AccountActivation from '../../components/static/AccountActivation';
const LayoutLogin = () => {
    return (
        <div className="back_color">
            <Header />
              <Switch>
                <ProtectedRoutes path="/" exact component={Home} />
                {/*<ProtectedRoutes path="/home" exact  >*/}
                {/*    /!*<Carousel activeIndex={this.state.setIndex} onSelect={handleSelect}>*!/*/}
                {/*    /!*    <Carousel.Item>*!/*/}
                {/*    /!*        <SlideOne />*!/*/}
                {/*    /!*    </Carousel.Item>*!/*/}
                {/*    /!*    <Carousel.Item>*!/*/}
                {/*    /!*        <SlideTwo />*!/*/}
                {/*    /!*    </Carousel.Item>*!/*/}
                {/*    /!*    <Carousel.Item>*!/*/}
                {/*    /!*        <SlideThree />*!/*/}
                {/*    /!*    </Carousel.Item>*!/*/}
                {/*    /!*    <Carousel.Item>*!/*/}
                {/*    /!*        <SlideFour />*!/*/}
                {/*    /!*    </Carousel.Item>*!/*/}
                {/*    /!*</Carousel>*!/*/}

                {/*</ProtectedRoutes>*/}

                <ProtectedRoutes exact path="/profile" component={Profile} />
                <Route exact path="/search" component={SearchResult} />
                <Route exact path="/login" component={Signup} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/logout" component={Logout} />
              
                </Switch>

        </div>
    )
}


export default LayoutLogin;