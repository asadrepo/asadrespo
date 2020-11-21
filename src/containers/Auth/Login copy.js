import React, {Component, useState} from 'react';
import {FieldArray} from "formik";
import FieldError from "../../components/common/FieldError";
import axios from "axios";
import AlertMessage from "../../components/common/AlertMessage";
import {Link, Redirect} from "react-router-dom";
import {AuthGuard, setUserStorage} from "./Auth";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";

const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }


    if(!values.password){
        errors.password = "Password is required";
    }

    return errors;
  };

    async function login(params){
         return await axios.post(process.env.REACT_APP_API_URL +'accounts/login/', params,
            {
                headers: {
                }
            }
        );
     }

const Login = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validate,
        onSubmit: (values) => {

            login({
                email: values.email,
                password: values.password
            }).then(response => {

            }).catch(error => {
                setIsLoading(true);
                //alert(JSON.stringify(values, null, 2));
                setUserStorage('34ddee3222808089999993733934', {'email': 'imran@gmail.com', 'first_name': 'Imran'});
                props.onClosePop();
                // this.setState({isLoggedIn: AuthGuard()});
                setIsLoggedIn(AuthGuard());
            });
          
        },
      });
    // state = {
    //     // email: "mustabshir.khan0313@arpatech.com",
    //     //password: "admin.123",
    //     email: "",
    //     password: "",
    //     remember_me: 0,
    //     isSubmit: false,
    //     isLoading: false,
    //     formErrors: {
    //         email: "",
    //         password: ""
    //     },
    //     isLoggedIn: AuthGuard(),
    // };

  

    //  handleOnLoginSubmit = async(event) => {
    //     event.preventDefault();
    //     this.setState({isSubmit: true, isLoading:true});
    //     this.login({
    //         email: this.state.email,
    //         password: this.state.password
    //     }).then((response) => {
    //         console.log('Success');
    //     }).catch(error => {
    //         setUserStorage('34ddee3222808089999993733934', {'email': 'imran@gmail.com', 'first_name': 'Imran'});
    //         this.props.onClosePop();
    //         this.setState({isLoggedIn: AuthGuard()});
    //         console.log("error here");
    //         console.log(error);

    //     });
    //     event.preventDefault();
    //    return await axios.post(process.env.REACT_APP_API_URL +'accounts/login/', {
    //         email: this.state.email,
    //         password:this.state.password,

    //     },{
    //         headers: {
    //         }
    //     }).then((response) => {
    //         console.log('success');
    //         console.log(response);
    //         setUserStorage(response.data.token, response.data);
    //         this.props.onClosePop();
    //         this.setState({isLoggedIn: AuthGuard()});

    //     }).catch( (error) => {
    //         console.log("hererer");
    //         console.log(error);

    //         // setUserStorage('34ddee3222808089999993733934', {'email': 'imran@gmail.com', 'first_name': 'Imran'});
    //         // this.props.onClosePop();
    //         // this.setState({isLoggedIn: AuthGuard()});
    //         // console.log("The is error");
    //         // console.log(error);
    //         // this.setState({isLoading:false});
    //         // this.setState({showMessages: <AlertMessage type={'danger'} message={error.response.data} />})
    //     });
   // };

    // handleOnChange = (event) => {

    //     const {name, value} = event.target;
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     });

    //     let formErrors = this.state.formErrors;
    //     switch (name) {
    //         case 'email':
    //             formErrors.email = value.length < 3 && value.length > 0 ? 'minimum 3 characters required' : "";
    //             break;
    //         case 'password':
    //             formErrors.password = value.length < 3 && value.length > 0 ? 'minimum 3 characters required' : "";
    //             break;
    //         default:
    //             break;
    //     }


    // };



    
        if(AuthGuard()){
            return (<Redirect to="/" />);
        }
        
        return (
            <React.Fragment>
                <div className="modal-body login-signup">
                    <div className="container">
                        <form onSubmit={formik.handleSubmit} >
                        <img src="images/logo.png" alt="CertStationLogo" className="m-auto mw-100" />
                        <h3 className="text-center mt-3">Login</h3>
                        <div className="form-group">
                            <label htmlFor="EmailId">Email ID</label>
                            <input type="text" className="form-control" value={formik.values.email} name="email" placeholder="Email" onChange={formik.handleChange} />
                            {formik.errors.email ? (
                                <FieldError message={formik.errors.email} />
                                ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <input type="password" name="password" className="form-control" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
                            {formik.errors.password ? (
                      <FieldError message={formik.errors.password} />
                    ) : null}
                        </div>
                        <div className="form-group">
                            <input type="checkbox" name="remember_me" /><span>Remember me</span>
                           <Link to="/forgot-password" className="text-center float-right" onClick={props.onClosePop}>Forgot Password</Link>
                        </div>

                        <div className="form-group sign_up_btn float-right">
                            <button type="submit" className="btn btn-primary btn-md mw-100" disabled={isLoading}>
                                {isLoading ? <span>Loading..</span> : <span>Login</span>}
                            </button>
                            {/*<a onClick={this.props.onClosePop} class="btn btn-primary btn-md mw-100">Sign Up</a>*/}
                        </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );


}

export default Login;