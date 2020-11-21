import React, { Component, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import FieldError from "../../components/common/FieldError";
import ReCAPTCHA from "react-google-recaptcha";
import PaypalExpressBtn from "react-paypal-express-checkout";
import AlertMessage from "../../components/common/AlertMessage";
import PopupHOC from "../../hoc/PopupHOC";
import SubscriptionDetail from "../../components/static/SubscriptionDetail";
import axios from "axios";
import RegistrationSuccess from "../../components/static/RegistrationSuccess";
import PasswordStrengthBar from 'react-password-strength-bar';
import PasswordCriteria from "../../components/common/PasswordCriteria";
import axiosClient from "../../shared/axiosClient";
import PaymentCancel from "../../components/static/PaymentCancel";
import { parsePhoneNumberFromString, parsePhoneNumber } from "libphonenumber-js";
import TermsAndConditions from "../../components/static/TermsAndConditions";

const SignupFormik = (props) => {

  const [isPremiumShow, setIsPrimiumShow] = useState("none");
  const [isVerifiedCaptcha, setIsVerifiedCaptcha] = useState(false);
  const [blurCaptcha, setBlurCaptcha] = useState(false);
  const [showPaypalButton, setShowPaypalButton] = useState(false);
  const [errorMessages, setErrorMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [term, setTerm] = useState(false);
  const [blurTerm, setBlurTerm] = useState(false);
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [userId, setUserId] = useState(0);


  const onCheckTermAndCondition = (event) => {
    setTerm(!term);
  }

  const onBlurTermAndCondition = () => {
    setBlurTerm(true);
  }

  const validate = (values) => {

    var regFullName = /^[a-zA-Z]+ [a-zA-Z]+$/;


    const errors = {};
    //return errors;
    setPassword(values.password);

    if (!values.full_name) {
      errors.full_name = "Full name is required";
    } else if (values.full_name.length > 100) {
      errors.full_name = "Must be 100 characters or less";
    } else if (!regFullName.test(values.full_name)) {
      errors.full_name = "Full name is not valid and can contain only alpha characters.";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.company) {
      errors.company = "Company is required";
    } else if (values.company.length > 100) {
      errors.company = "Must be 100 characters or less";
    }

    if (!values.country_id) {
      errors.country_id = "Country is required";
    }

    if (!values.package && values.is_premium === 1) {
      errors.package = "Please select a package.";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    if (values.password !== values.password_confirmation) {
      errors.password_confirmation = "Password does not match.";
    }

   
    if (!values.phone) {
      errors.phone = "Phone number is required";
    }

    if(values.phone){
      try{
        const phoneNumber = parsePhoneNumber(values.phone);
      } catch(error) {
        errors.phone = "Phone number is valid";
      }
      
      // try{
        
      //   console.log(phoneNumber);
      //   console.log(phoneNumber.isValid);
      // } catch(error){
      //   console.log(error);
      // }
      
   
      // if(!phoneNumber.isValid()){
      //   errors.phone = "Phone number is valid";
      // }
    }


    if (!term) {
      errors.term = "Please accept terms and conditions.";
    }

    if (!isVerifiedCaptcha) {
      errors.captcha = "Captcha is not verified";
    }

    return errors;
  };



  const formErrors = {};

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      company: "",
      password: "",
      phone: "",
      country_id: "",
      is_premium: 0,
      package: "",
      tou: false
    },
    validate,
    onSubmit: (values, { resetForm }) => {

      setIsLoading(true);

      setButtonDisable(true);
      setBlurCaptcha(true);
      setBlurTerm(true);


      axiosClient.auth.signup({
        email: values.email,
        password: values.password,
        first_name: values.full_name,
        last_name: '',
        phone: values.phone,
        country_id: values.country_id,
        is_premium: parseInt(values.is_premium),
        package: parseInt(values.package),
        //  country_id:"United States",
        username: ''
      }).then(response => {

        setUserId(response.data.id);


        setButtonDisable(false);

        if (amount > 0) {
          setShowPaypalButton(true);
          setIsLoading(false);
        } else {
          props.handleOnClickModal(<RegistrationSuccess />);
          resetForm({
            values: ''
          });
          setIsLoading(false);

        }


      }).catch(error => {

        setIsLoading(false);
        setButtonDisable(false);
        if (error.response.status === 500) {
          const { statusText } = error.response;
          setErrorMessages(<AlertMessage type={'danger'} message={{ danger: [statusText] }} />);
          return;
        }
        setErrorMessages(<AlertMessage type={'danger'} message={error.response.data} />);

      });

    },
  });

  const handleOnChangeCaptcha = () => {
    setBlurCaptcha(true);
    setIsVerifiedCaptcha(true);
  };

  const handleOnExpiredCaptcha = () => {
    setIsVerifiedCaptcha(false);
  }

  const onChangeIsPremium = (event) => {



    formik.handleChange(event);
    if (parseInt(event.target.value)) {
      setIsPrimiumShow("block");
      return;
    }
    setShowPaypalButton(false);
    setIsPrimiumShow("none");
    setAmount(0);
  };

  const handleOnSubscriptionChange = (event) => {
    formik.handleChange(event);
    props.subscriptions.map((subscription) => {
      if (parseInt(event.target.value) === parseInt(subscription.id)) {
        setAmount(parseFloat(subscription.amount));
      }
    });

    if (parseInt(event.target.value)) {
      // setShowPaypalButton(true);
    } else {
      setShowPaypalButton(false);
      setAmount(0);
    }
  };

  const handlePaypalOnError = (err) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log("Error!", err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  };

  const handlePaypalOnSuccess = (payment) => {
    setIsLoading(true);
    console.log(payment);
    // console.log('package id', formik.values.package);
    axiosClient.auth.capture({
      user_id: userId,
      package_id: parseInt(formik.values.package),
      payment_status: 'COMPLETED',
      payer_email: payment.email,
      recipient_name: payment.address.recipient_name,
      amount: amount,
      currency: 'USD',
      payer_id: payment.payerID

    }).then(response => {
      props.handleOnClickModal(<RegistrationSuccess />);
      setIsLoading(false);
    }).catch(error => {
        
    });
    // Congratulation, it came here means everything's fine!
    console.log("The payment was succeeded!", payment);
    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const handlePaypalOnCancel = (data) => {
    console.log(formik.values.email);
    setIsLoading(true);
    axiosClient.auth.capture({
      user_id: userId,
      package_id: parseInt(formik.values.package),
      payment_status: 'CANCELLED',
      currency: 'USD',
      payer_id: data.paymentID,
      payer_email: null

    }).then(response => {
      props.handleOnClickModal(<PaymentCancel />);
      setIsLoading(false);
      console.log("payment on success");
      console.log(response);
    }).catch(error => {
      setIsLoading(false);
      console.log("payment on error");
      console.log(error);
    });
    // User pressed "cancel" or close Paypal's popup!
    console.log("The payment was cancelled!", data);
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
  };

  const client = {
    sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID,
  };

  return (
    <div className="login_screen_bg">
      {isLoading ? <div className="loading">Loading;</div> : null}
      <div className="col-12">
        <div className="container">
          <div className="signup_section m-auto">
            <h2>Sign Up</h2>
            {errorMessages}
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <div className="row">
                  <div className="col-12 col-md-6 col-sm-12 mb-3 mb-sm-3 mb-md-0">
                    <input
                      type="text"
                      name="full_name"
                      className={`form-control`}
                      placeholder="Your Name"
                      value={formik.values.full_name || ""}
                      onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      
                    />
                    {formik.errors.full_name && formik.touched.full_name ? (
                      <FieldError message={formik.errors.full_name} />
                    ) : null}
                  </div>
                  <div className="col-12 col-md-6 col-sm-12">
                    <input
                      type="email"
                      name="email"
                      className={`form-control`}
                      placeholder="Email Address"
                      value={formik.values.email || ""}
                      onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <FieldError message={formik.errors.email} />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="clearfix" />
              <div className="form-group">
                <div className="row">
                  <div className="col-12 col-md-6 col-sm-12 mb-3 mb-sm-3 mb-md-0">
                    <input
                      type="text"
                      name="company"
                      value={formik.values.company || ""}
                      onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      className={`form-control`}
                      placeholder="Company"
                    />
                    {formik.errors.company && formik.touched.company ? (
                      <FieldError message={formik.errors.company} />
                    ) : null}
                  </div>
                  <div className="col-12 col-md-6 col-sm-12">
                    <select
                      name="country_id"
                      id="selectCountry"
                      className={`form-control`}
                      onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                      <option value={0}>Select Country</option>
                      {props.countries &&
                        props.countries.map((country, index) => {
                          return (
                            <option value={country.id} key={country.id}>{country.name}</option>
                          );
                        })}

                    </select>
                    {formik.errors.country_id && formik.touched.country_id ? (
                      <FieldError message={formik.errors.country_id} />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="clearfix" />
              <div className="form-group">
                <div className="row">
                  <div className="col-12 col-md-6 col-sm-12 col-xs-12 mb-3 mb-sm-3 mb-md-0">
                    <input
                      type="password"
                      name="password"
                      value={formik.values.password || ""}
                      onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      className="form-control"
                      placeholder="Password"
                    />

                    <PasswordStrengthBar password={password} />
                    {formik.errors.password && formik.touched.password ? (
                      <FieldError message={formik.errors.password} />
                    ) : null}
                  </div>
                  <div className="col-12 col-md-6 col-sm-12 col-xs-12">
                    <input
                      type="password"
                      name="password_confirmation"
                      value={formik.values.password_confirmation || ""}
                      onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      className="form-control"
                      placeholder="Confirm Password"
                    />

                    {formik.errors.password_confirmation && formik.touched.password_confirmation ? (
                      <FieldError
                        message={formik.errors.password_confirmation}
                      />
                    ) : null}
                  </div>
                  {/* <div className="col-12 col-md-6 col-sm-12 col-xs-12"><PasswordCriteria /></div> */}

                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-12 col-md-6 col-sm-12 col-xs-12 mb-3 mb-sm-3 mb-md-0">
                    <input
                      type="text"
                      name="phone"
                      value={formik.values.phone || ""}
                      onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      className="form-control"
                      placeholder="Phone"
                    />
                    <small>
                      ( This field is use for Two Factor Verification)
                    </small>
                    {formik.errors.phone && formik.touched.phone ? (
                      <FieldError message={formik.errors.phone} />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="clearfix" />
              <div className="form-group">
                <div className="row">
                  <div className="col-12 col-md-6 col-sm-12 col-xs-12">
                    <input
                      type="radio"
                      name="is_premium"
                      value={0}
                      defaultChecked
                      className="free_subs"
                      onChange={onChangeIsPremium}

                    />
                    <span>Free (30 days trial)</span>
                  </div>
                  <div className="col-12 col-md-6 col-sm-12 col-xs-12">
                    <input
                      type="radio"
                      name="is_premium"
                      value={1}
                      className="select_prem"
                      onChange={onChangeIsPremium}
                    />
                    <span>Premium</span>
                  </div>
                </div>
                {formik.errors.is_premium ? (
                  <FieldError message={formik.errors.is_premium} />
                ) : null}
              </div>
              <div className="clearfix" />
              <div className="form-group" style={{ display: isPremiumShow }}>
                <div className="row">
                  <div className="col-12">
                    <select
                      name="package"
                      id="selectSubscription"
                      className="form-control"
                      onChange={handleOnSubscriptionChange}
                    >
                      <option value="">Select Subscription</option>
                      {props.subscriptions &&
                        props.subscriptions.map((subscription) => {
                          return (
                            <option
                              value={subscription.id}
                              id={subscription.id}
                              key={subscription.id}
                            >
                              {subscription.title} - ${subscription.amount} -{" "}
                              {subscription.frequency}
                            </option>
                          );
                        })}
                    </select>
                    {formik.errors.package ? (
                      <FieldError message={formik.errors.package} />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="clearfix" />
              <div className="form-group">
                <div className="row">
                  <div className="col-12">
                    <a
                      onClick={() => props.handleOnClickModal(<SubscriptionDetail />)}
                      className="comon_green_color"
                      style={{ cursor: 'pointer' }}
                    >
                      Find out more about our subscriptions.
                    </a>
                  </div>
                </div>
              </div>
              <div className="clearfix" />
              <div className="form-group">
                <div className="row">
                  <div className="col-12 col-md-3 col-sm-12 col-xs-12">
                    <div className="form-group">
                      <div className="row">
                        <div className="captcha-code col-12">
                          <div className="row" style={{ marginLeft: 0 }}>
                            <ReCAPTCHA
                              sitekey={
                                process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY
                              }
                              onChange={handleOnChangeCaptcha}
                              onExpired={handleOnExpiredCaptcha}
                            />
                            {!isVerifiedCaptcha ? (
                              <FieldError message={formik.errors.captcha} />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
                <div className="form-group">
                  <div className="row">
                    <div className="col-12">
                      <input type="checkbox" name="tou" className="mr-2" defaultChecked={term} onBlur={formik.handleBlur} onChange={onCheckTermAndCondition} />
                      <span>
                        I agree to the CERTStation{" "}
                        <a   onClick={() => props.handleOnClickModal(<TermsAndConditions  />, 'xl')} style={{ cursor: 'pointer' }}  className="comon_green_color">Term of Service</a>

                      </span><br />
                      {! term && formik.touched.tou  ? <FieldError message={formik.errors.term} /> : null}
                    </div>

                  </div>

                </div>

                <div className="clearfix" />
                <div className="form-group">
                  <div className="row">
                    <div className="col-2 sign_up_btn">
                      {/*<a  className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter15">Sign Up</a>*/}
                      <button type="submit" className="btn btn-primary" disabled={isLoading || buttonDisable}>
                        {isLoading ? <span>Loading..</span> : <span>Sign Up</span>}
                      </button>
                    </div>
                    <div className="col-6 sign_up_btn">
                      {showPaypalButton && (
                        <PaypalExpressBtn

                          client={client}
                          currency={"USD"}
                          total={amount}
                          style={{
                            size: "medium",
                            color: "gold",
                            shape: "pill",
                            label: "pay"
                          }}
                          onError={handlePaypalOnError}
                          onSuccess={handlePaypalOnSuccess}
                          onCancel={handlePaypalOnCancel}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="clearfix" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupHOC(SignupFormik);
