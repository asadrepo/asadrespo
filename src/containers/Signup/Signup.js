import React, {Component} from 'react';
import SignupForm from "./SignupForm";
import axios from 'axios';
import ListCountries from "../../ListCountries";
import {AuthGuard} from "../Auth/Auth";
import {Redirect} from "react-router-dom";
import SignupFormik from './SignupFormik';
import MainLayout from '../Layout/MainLayout';
import LoginLayout from '../Layout/LoginLayout';
import axiosClient from '../../shared/axiosClient';

class Signup extends Component {
    state = {
        countries: [],
        subscriptions: [],
        isLoggedIn: AuthGuard()
    };

    constructor() {
        super();
    }

    componentDidMount() {
        axiosClient.common.getCountries({limit: 236}).then(
            response => {
                this.setState({countries: response.data.results});
            }
        );

        axiosClient.common.getPackages().then(
            response => {
                this.setState({subscriptions: response.data.results});
            }
        );
        // axios.get(process.env.REACT_APP_API_URL+'countries/', {
        //         params: {},
        //         headers: {
        //         }
        // }).then(response => {
        //     this.setState({countries: response.data.results});
        // });

        // axios.get(process.env.REACT_APP_API_URL +'packages/', {
        //     params: {},
        //     headers: {
        //     }
        // }).then(response => {
        //     this.setState({subscriptions: response.data.results});
        // });

        // this.setState({countries:[
        //         {
        //             id: 1,
        //             name: 'Afghanistan'
        //         },
        //         {
        //             id: 2,
        //             name: 'Pakistan'
        //         }
        //     ]});
        //
        // this.setState({subscriptions:[
        //         {
        //             id: 1,
        //             title: 'Monthly',
        //             amount: 10,
        //             frequency: 'Monthly'
        //         },
        //         {
        //             id: 2,
        //             title: 'Yearly',
        //             amount: 20,
        //             frequency: 'Yearly'
        //         }
        //     ]});
    }


    render() {
        if(AuthGuard()){
            return  (<Redirect to="/" />);
        }
        return (
            <LoginLayout>
            {/* //<SignupForm countries={this.state.countries} subscriptions={this.state.subscriptions} /> */}
             <SignupFormik countries={this.state.countries} subscriptions={this.state.subscriptions} />
            </LoginLayout>
        );
    }
}

export default Signup;