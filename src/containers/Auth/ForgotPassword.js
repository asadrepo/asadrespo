import React, { Component } from 'react';
import FieldError from "../../components/common/FieldError";
import { validateEmail } from "../../helpers";
import axios from "axios";
import { AuthGuard, setUserStorage } from "./Auth";
import AlertMessage from "../../components/common/AlertMessage";
import LoginLayout from '../Layout/LoginLayout';
import { Link, Redirect } from "react-router-dom";

class ForgotPassword extends Component {
    state = {
        email: "",
        formErrors: {
            email: ""
        },
        isLoading: false,
        showMessages: "",
        successResetPassword: false

    }

    async makeUserResetPassword() {

    };

    handleOnSubmit = (event) => {
        console.log("Submit");

        let formErrors = this.state.formErrors;
        if (validateEmail(this.state.email)) {
            this.setState({ isLoading: true });


            axios.post(process.env.REACT_APP_API_URL + 'accounts/reset-password/', {
                email: this.state.email,
            }, {
                headers: {
                }
            }).then(response => {
                this.setState({ isLoading: false, successResetPassword: true });
                // console.log(response);

            }).catch((error) => {
                this.setState({ isLoading: false });

                if (error.response.status === 500) {
                    console.log(error.response.statusText);
                    const { statusText } = error.response;
                  
                    this.setState({ showMessages: <AlertMessage type={'danger'} message={{ email: [error.response.statusText] }} /> })
                    return;
                }
                this.setState({showMessages: <AlertMessage type={'danger'} message={{email: [error.response.data.message]}} />})


            });
        } else {
            this.setState({ formErrors: { email: 'Please insert valid email address.' } });
        }
        event.preventDefault();
    }
    handleOnChange = (event) => {

        const { name, value } = event.target;
        this.setState({
            [event.target.name]: event.target.value
        });

        let formErrors = this.state.formErrors;
        formErrors.email = !validateEmail(value) ? 'Please insert valid email address.' : '';
    }
    render() {
        if(AuthGuard()){
            return  (<Redirect to="/" />);
        }
        const { formErrors } = this.state;
        return (
            <LoginLayout>
                <div className="login_screen_bg">
                    <div className="col-12">
                        <div className="container">
                            <div className="signup_section m-auto forgot">
                                <h2>Forget Password</h2>
                                {this.state.showMessages}
                                <form onSubmit={this.handleOnSubmit}>
                                    <div className="confirmation_send">
                                        <p className="text-center">Please enter your registered Email address to reset password.</p>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-12 mb-3 mb-sm-3 mb-md-0">
                                                    <input type="email" className="form-control" name="email" placeholder="Enter Email Address" onChange={this.handleOnChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix" />
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-12">
                                                    {/*<p class="alert-danger p-2">Invalid email address</p>*/}
                                                    {formErrors.email.length > 0 && (
                                                        <FieldError message={formErrors.email} />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix" />
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-12 sign_up_btn">
                                                    <Link to="/login" className="btn btn-primary float-right">Cancel</Link>
                                                    <button type="submit" className="btn btn-primary float-right mr-2 send_conf" disabled={this.state.isLoading}>
                                                        {this.state.isLoading ? <span>Loading..</span> : <span>Send</span>}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {this.state.successResetPassword && (<div className="confirmed pt-2">
                                    <p className="text-center">A link has been send to your email address. Please click on the link in the email to continue. In case you did not receive an email make sure to check your spam folder.</p>
                                </div>)}
                                <div className="clearfix" />
                            </div>
                        </div>
                    </div>
                </div>
            </LoginLayout>
        );
    }
}

export default ForgotPassword;