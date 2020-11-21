import React, { Component, useState } from 'react';
import LoginLayout from '../Layout/LoginLayout';
import ReactPasswordStrength from 'react-password-strength';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import FieldError from '../../components/common/FieldError';
import PasswordCriteria from '../../components/common/PasswordCriteria';
import axiosClient from '../../shared/axiosClient';
import AlertMessage from '../../components/common/AlertMessage';
import ErrorMessagesHOC from '../../hoc/ErrorMessagesHOC';
import { Link } from "react-router-dom";



const ResetPassword = (props) => {

  const { user_id, token } = props.match.params;
  const [password, setPassword] = useState("");
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //  const {errorMessages, setErrorMessages} = useState(false);
  // const [errorMessages, setErrorMessages] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setPassword(value);
  }


  const validate = (values) => {
    const errors = {};
    setPassword(values.password);
    if (!values.password) {
      errors.password = " Password is required";
    }

    if (values.password !== values.password_confirmation && values.password_confirmation !== "") {
      errors.password_confirmation = "Confirm password should be matched with password.";
    }

    return errors;
  };



  const formik = useFormik({
    initialValues: {
      //   email: "",
      //   password: "",
      password: "",
      password_confirmation: "",
    },
    validate,
    onSubmit: (values) => {


      setIsLoading(true);

      axiosClient.auth.resetPassword(user_id, token, {
        password: values.password,
        password_confirmation: values.password_confirmation
      }).then(response => {

        setIsLoading(false);

        if (response.data.status === 400) {
          props.printMessages({ success: [response.data.message] }, 'danger');
          return;
        }
        props.printMessages({ success: ['Password has been changed successfully.'] }, 'success');
        props.history.push('/signup');
      }).catch(error => {
        setIsLoading(false);

        console.log(error.response);
        props.printMessages(<AlertMessage type={"danger"} message={error.response.data} />)
        // setErrorMessages(

        // );
      });



    }
  });


  const onChangePasswordScore = (event) => {
    setIsStrongPassword(true);
    // if(event > 3) {
    //     setIsStrongPassword(true);
    //     return;
    // }

    // setIsStrongPassword(false);
  }


  return (
    <LoginLayout>
      <div className="login_screen_bg">
        <div className="col-12">
          <div className="container">
            <div className="signup_section m-auto forgot">
              <h2>Reset Password</h2>
              {props.messages}
              <form onSubmit={formik.handleSubmit}>
                <div className="confirmation_send">
                  <p className="text-center">Please enter your registered Email address to reset password.</p>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-12 mb-3 mb-sm-3 mb-md-0 row">
                        <div className="col-md-11 col-sm-11 col-xs-11">
                          <input type="password"
                            name="password"
                            className="form-control"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            placeholder="Password"
                          />
                          <PasswordStrengthBar password={password}
                            onChangeScore={onChangePasswordScore}
                          />

                          {!isStrongPassword && formik.touched.password ? <FieldError message={' Password is not strong.'} /> : null}
                          {formik.errors.password ? (
                            <FieldError message={formik.errors.password} />
                          ) : null}
                          {/* <ReactPasswordStrength
                                className="form-control"
                                style={{ display: 'block' }}
                                minLength={5}
                                minScore={2}
                                scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
                                changeCallback={() => {
                                    return;
                                }}
                                
                            /> */}
                          {/* <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
 
                            <div className="progress">
                              <div className="progress-bar" />
                            </div> */}
                        </div>
                        <PasswordCriteria />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-12 mb-3 mb-sm-3 mb-md-0 row">
                        <div className="col-md-11 col-sm-11 col-xs-11">
                          <input type="password"
                            className="form-control"
                            name="password_confirmation"
                            placeholder="Re-enter Your New Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password_confirmation}
                          />
                          {formik.errors.password_confirmation  ? (
                            <FieldError message={formik.errors.password_confirmation} />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="form-group">
                    <div className="row">
                      <div className="col-12 sign_up_btn">


                        <button type="submit" className="btn btn-primary save_continue" disabled={isLoading} >
                          {isLoading ? <span>Loading..</span> : <span>Save and continue</span>}
                        </button>

                        <Link to="/login" className="btn btn-primary">Cancel</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
  );

}

export default ErrorMessagesHOC(ResetPassword);