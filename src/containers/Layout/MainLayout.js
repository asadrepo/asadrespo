import React, { Component } from 'react';
import { Header } from '../../components/partials/Header';
import { Footer } from '../../components/partials/Footer';

const MainLayout = (props) => {
    return (
        <React.Fragment>
            <Header />
            {props.children}
            <Footer />
        </React.Fragment>
    )
}

export default MainLayout;