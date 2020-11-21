import axios from 'axios';
import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import PaypalExpressBtn from 'react-paypal-express-checkout';
import AlertMessage from "../../components/common/AlertMessage";
import FieldError from "../../components/common/FieldError";



class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPremiumShow: "none",
            showPaypalbutton: false,
            paypalAmount: 0.00,
            isFormValid: false,
            isVerifiedCaptcha: false,
            isSubmit: false,
            errorMessages: [],
            full_name: null,
            email: null,
            password: null,
            password_confirmation: null,
            country_id: null,
            phone: null,
            is_premium: null,
            package: "",
            formErrors: {
                full_name: "",
                email: "",
                company: "",
                password: "",
                phone: "",
                country_id: "",
                is_premium: ""
            }
        }
    }

     validateForm = ({formErrors, ...rest}) => {
        let isValid = true;
        // console.log(rest);
        Object.values(formErrors).forEach(value => {
            value.length > 0 && (isValid = false);
        });

        Object.values(rest).forEach((val, key) => {
            val === null && (isValid = false);
        });

        return isValid;
    };

    handleOnChangeCaptcha = (event) => {
      this.setState({isVerifiedCaptcha:true, showMessages: ""});
      if (event === null) this.setState({ isVerifiedCaptcha: false });
    };


    isPremiumChange = (event) => {
        this.setState({is_premium: event.target.value});
        if(parseInt(event.target.value)){
            this.setState({isPremiumShow: 'block'});
            return;
        }

        this.setState({showPaypalbutton: false});
        this.setState({isPremiumShow: 'none'});
    }

    handleOnClickSubscriptionOption = (event) => {
        console.log(event);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({isSubmit: true});
        let formErrors = this.state;

        if(this.validateForm(this.state) && this.state.isVerifiedCaptcha){

            axios.post(process.env.REACT_APP_API_URL +'accounts/signup/', {
                email: null,
                password:this.state.password,
                first_name: null,
                last_name: this.state.full_name,
                phone: this.state.phone,
                country_id:1,
                is_premium:1,
                package: 2,
                username:'test Imran'

            },{
                headers: {

                }
            }).then((response) => {
                console.log('success');
               console.log(response);
            }).catch( (error) => {
                console.log("in error");

                this.setState({showMessages: <AlertMessage type={'danger'} message={error.response.data} />})
            });
        } else {
            console.log("not submit form");
           this.setState({showMessages: <AlertMessage type={'danger'} message={['All fields are required']} />})
        }

    };

    handleOnSubscriptionChange = (event) => {
        
        console.log(this.state.is_premium);
       this.props.subscriptions.map((subscription) => {
           if(parseInt(event.target.value) === parseInt(subscription.id)){
               this.setState({
                paypalAmount: parseFloat(subscription.amount)
               }, () => {
                this.setState({showPaypalbutton: true});
               })
               
           }
       })
    }



    handlePaypalOnError = (err) => {
         // The main Paypal's script cannot be loaded or somethings block the loading of that script!
         console.log("Error!", err);
         // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
         // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
     
    }

    handlePaypalOnSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
        console.log("The payment was succeeded!", payment);
        // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data

    }

    handlePaypalOnCancel = (data) => {
         // User pressed "cancel" or close Paypal's popup!
         console.log('The payment was cancelled!', data);
         // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
     
    }



    handleOnChange = (event) => {
        // console.log(event);
        const {name, value} = event.target;
        this.setState({
           [event.target.name]: event.target.value
        });

        let formErrors = this.state.formErrors;
        switch (name) {
            case 'full_name':
                formErrors.full_name = value.length < 3 && value.length > 0 ? 'minimum 3 characters required' : "";
                break;
            case 'email':
                formErrors.email = value.length < 3 && value.length > 0 ? 'minimum 3 characters required' : "";
                break;
            case 'company':
                formErrors.company = value.length < 3 && value.length > 0 ? 'minimum 3 characters required' : "";
                break;
            case 'password':
                formErrors.password = value.length < 3 && value.length > 0 ? 'minimum 3 characters required' : "";
                break;
            case 'phone':
                formErrors.phone = value.length < 3 && value.length > 0 ? 'minimum 3 characters required' : "";
                break;
            case 'country_id':
                //formErrors.country_id = parseInt(value) === 0 ? 'Please select any country.' : "";
                break;
            case 'is_premium':
                //  formErrors.is_premium = value === "" ? 'Please select any subscription.' : "";
                break;
            default:
                break;
       }
    };

    render() {
        const {formErrors} = this.state;
        const client = {
            sandbox:    process.env.REACT_APP_PAYPAL_CLIENT_ID,
        }

        return (
            <div className="login_screen_bg">

                <div className="col-12">
                    <div className="container">

                        <div className="signup_section m-auto">

                            {this.state.showMessages}
                            <h2>Sign Up</h2>
                            <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12 col-md-6 col-sm-12 mb-3 mb-sm-3 mb-md-0">
                                        <input
                                            type="text"
                                            name="full_name"
                                            className={`form-control ${formErrors.full_name.length > 0 ? 'is-invalid' : ''}`}
                                            placeholder="Your Name" value={this.state.full_name || ''}
                                            onChange={this.handleOnChange} />
                                        {formErrors.full_name.length > 0 && (
                                            <FieldError message={formErrors.full_name} />
                                        )}
                                    </div>
                                    <div className="col-12 col-md-6 col-sm-12">
                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control ${formErrors.email.length > 0 ? 'is-invalid' : ''}`}
                                            placeholder="Email Address" value={this.state.email || ''}
                                            onChange={this.handleOnChange} />
                                        {formErrors.email.length > 0 && (
                                            <FieldError message={formErrors.email} />
                                        )}
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
                                            value={this.state.company || ''}
                                            onChange={this.handleOnChange}
                                            className={`form-control ${formErrors.company.length > 0 ? 'is-invalid' : ''}`}
                                            placeholder="Company" />
                                        {formErrors.company.length > 0 && (
                                            <FieldError message={formErrors.company} />
                                        )}
                                    </div>
                                    <div className="col-12 col-md-6 col-sm-12">
                                        <select
                                            name="country_id"
                                            id="selectCountry"
                                            className={`form-control ${formErrors.country_id.length > 0 ? 'is-invalid' : ''}`}
                                            onClick={this.handleOnChange}>
                                            <option value={0}>Select Country</option>
                                            {this.props.countries && this.props.countries.map((country, index) => {
                                                return <option key={country.id}>{country.name}</option>
                                            })}
                                        </select>
                                        {/*{formErrors.country_id.length > 0 && (*/}
                                        {/*    <FieldError message={formErrors.country_id} />*/}
                                        {/*)}*/}

                                    </div>
                                </div>
                            </div>
                            <div className="clearfix" />
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12 col-md-6 col-sm-12 col-xs-12 mb-3 mb-sm-3 mb-md-0">
                                        <input type="password" name="password" value={this.state.password || ''} onChange={this.handleOnChange} className="form-control" placeholder="Password" />
                                    </div>
                                    <div className="col-12 col-md-6 col-sm-12 col-xs-12">
                                        <input type="password" name="password_confirmation" value={this.state.password_confirmation || ''} onChange={this.handleOnChange} className="form-control" placeholder="Confirm Password" />

                                    </div>
                                </div>
                                {/*{formErrors.password.length > 0 && (*/}
                                {/*    <FieldError message={formErrors.password} />*/}
                                {/*)}*/}
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12 col-md-6 col-sm-12 col-xs-12 mb-3 mb-sm-3 mb-md-0">
                                        <input type="text" name="phone" value={this.state.phone || ''} onChange={this.handleOnChange} className="form-control" placeholder="Phone" />
                                        <small>( This field is use for Two Factor Verification)</small>
                                        {formErrors.phone.length > 0 && (
                                            <FieldError message={formErrors.phone} />
                                        )}
                                    </div>
                                    {/*
                        <div class="col-12 col-md-6 col-sm-12 col-xs-12 two_factor_subscription">
                            <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider round"></span>
                            </label>
                            <span class="two_factor_verification">Enable Two Factor Verification</span>
                        </div>*/}
                                </div>
                            </div>
                            <div className="clearfix" />
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12 col-md-6 col-sm-12 col-xs-12">
                                        <input type="radio" name="is_premium" value={0} className="free_subs" onChange={this.isPremiumChange} />
                                        <span>Free (30 days trial)</span>
                                    </div>
                                    <div className="col-12 col-md-6 col-sm-12 col-xs-12">
                                        <input type="radio" name="is_premium" value={1} className="select_prem" onChange={this.isPremiumChange}  />
                                        <span>Premium</span>
                                    </div>

                                </div>
                                {formErrors.is_premium.length > 0 && (
                                    <FieldError message={formErrors.is_premium} />
                                )}

                            </div>
                            <div className="clearfix" />
                            <div className="form-group" style={{display: this.state.isPremiumShow}}>
                                <div className="row">
                                    <div className="col-12">
                                        <select name="is_premium" id="selectSubscription" className="form-control" onChange={this.handleOnSubscriptionChange}>
                                            <option value={0}>Select Subscription</option>
                                            {this.props.subscriptions && this.props.subscriptions.map((subscription) => {
                                                return <option value={subscription.id} 
                                                                id={subscription.id}
                                                                key={subscription.id}
                                                                onClick={() => this.handleOnClickSubscriptionOption(subscription)}
                                                                >{subscription.title} - ${subscription.amount} - {subscription.frequency}</option>
                                            })}
                                            {/*<option value={3}>Single User - $4.99/month</option>*/}
                                            {/*<option value={7}>Single User - $49.99/year</option>*/}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix" />
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12">
                                        <a  data-toggle="modal" data-target="#exampleModalCenter14" className="comon_green_color">Find out more about our subscriptions.</a>
                                    </div>
                                </div>
                            </div>
                            {/* MODAL SUBSCRIPTION */}
                            <div className="modal fade" id="exampleModalCenter14" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-lg main_patch" role="document">
                                    <div className="modal-content patch_modal comon_modal_content">
                                        <button type="button" className="close float-left comon_modal_close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                        <div className="modal-body modal_inner_padding subscription_modal_inner_section">
                                            <div className="container">
                                                <div className="row">
                                                    <p><strong>Free User :</strong>
                                                        <br /> CERTStation grants you a personal, non-exclusive, non-transferable, limited license to use internally for your Personal Use or Evaluation. “Personal Use” requires that you use the Product on your personal Host Computer that no more than one client connect to that Host Computer at a time. “Evaluation” means testing the Product for a reasonable period (that is, normally for a few weeks); after expiry of that term, you are no longer permitted to evaluate the Product. Advertisements will be played on a Free User version.
                                                        <br />
                                                        <br />
                                                        <strong>Premium User :</strong>
                                                        <br /> This license allows the enterprise user to use the ad-free version of CERTStation security dashboard on multiple computers in an enterprise environment. It typically allows the limited use (based on subscription) of the dashboard in non-shared displays. A single Enterprise License is permissible for a single user identity. Using the issue user name / password in a shared manner is a violation of the license agreement. Enterprise User License is a single user license.
                                                        <br />
                                                        <br />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* MODAL SUBSCRIPTION */}
                            <div className="clearfix" />
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12 col-md-3 col-sm-12 col-xs-12">
                                        <div className="form-group">
                                            <div className="row">

                                                {/* input captcha */}
                                                <div className="captcha-code col-12">
                                                    <div className="row">
                                                        <ReCAPTCHA
                                                            sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
                                                            onChange={this.handleOnChangeCaptcha}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {this.state.isSubmit && !this.state.isVerifiedCaptcha && (
                                            <FieldError message={"Captcha not verified."} />
                                        )}
                                    </div>
                                    {/*<div className="col-12 col-md-9 col-sm-12 col-xs-12 mb-3">*/}
                                    {/*    <div className="captcha-input">*/}
                                    {/*        <input type="text" className="form-control" id="captcha-input" required autoComplete="off" placeholder="Enter captcha code ..." />*/}
                                    {/*        <span id="errCaptcha" />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                                <div className="clearfix" />
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-12">
                                            <input type="checkbox" name="tou" className="mr-2" /><span>I agree to the CERTStation <a  className="comon_green_color">Term of Service</a></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix" />
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-3 sign_up_btn">
                                            {/*<a  className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter15">Sign Up</a>*/}
                                            <button type="submit" className="btn btn-primary"  >Sign Up</button>
                                        
                                        </div>
                                        <div className="col-9 sign_up_btn">
                                        {this.state.showPaypalbutton && ( <PaypalExpressBtn env={process.env.REACT_APP_PAYPAL_ENV} 
                                                client={client} 
                                                currency={'USD'} 
                                                total={this.state.paypalAmount} 
                                                style= {{
                                                    size: 'medium',
                                                    color: 'blue',
                                                    shape: 'rect',
                                                    label: 'pay'
                                                }}
                                                onError={this.handlePaypalOnError}
                                                onSuccess={this.handlePaypalOnSuccess} 
                                                onCancel={this.handlePaypalOnCancel}
                                            />)}
                                           
                                        </div>
                                    </div>
                                </div>

                                {/* MODAL SIGNUP */}
                                <div className="modal fade" id="exampleModalCenter15" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div className="modal-dialog modal-lg main_patch signup_modal_position" role="document">
                                        <div className="modal-content patch_modal comon_modal_content">
                                            <button type="button" className="close float-left comon_modal_close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                            <div className="modal-body modal_inner_padding signup_modal_inner_section">
                                                <div className="container">
                                                    <div className="row">
                                                        <h3>Welcome To CertStation Dashboard</h3>
                                                        <p>Thank you for signing up with CertStation. Please check your email for account activation instructions. In case you do not receive an email make sure to check your spam folder.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* MODAL SIGNUP */}
                                <div className="clearfix" />
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignupForm;
