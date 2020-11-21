import React from 'react';
import { Header } from '../../components/partials/Header';
import { Footer } from '../../components/partials/Footer';

const LoginLayout = (props) => {
    return (
        <React.Fragment>
            <Header />
            {props.children}
            <Footer />
        </React.Fragment>
    )
}

export default LoginLayout;