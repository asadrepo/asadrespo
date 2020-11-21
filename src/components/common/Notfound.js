import React, { Component } from 'react';
import LoginLayout from '../../containers/Layout/LoginLayout';

const Notfound = ({ size = 'lg' }) => {
    return (
        <React.Fragment>
            <LoginLayout>
                <div className="login_screen_bg">
                    <div className="col-12">
                        <div className="container">
                            <div className="signup_section m-auto forgot">
                                <h1 style={{fontSize: '120px'}}>404</h1>

                                <div className="confirmation_send">
                                   <h5>It's look like you are lost.</h5>
                                </div>
                                <div className="clearfix" />

                            </div>
                        </div>
                    </div>
                </div>
            </LoginLayout>
        </React.Fragment>
    );
};

export default Notfound;