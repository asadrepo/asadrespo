import React, {  useState, useEffect, useRef } from "react";
import FieldError from "../../components/common/FieldError";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { AuthGuard, setUserStorage } from "./Auth";
import { useFormik } from "formik";
import axiosClient from "../../shared/axiosClient";
import ErrorMessagesHOC from "../../hoc/ErrorMessagesHOC";
import PopupHOC from "../../hoc/PopupHOC";
import FirstTimeLogin from "../../components/static/FirstTimeLogin";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

async function login(params) {
  return await axios.post(
    process.env.REACT_APP_API_URL + "accounts/login/",
    params,
    {
      headers: {},
    }
  );
}

const Login = (props) => {
  const mounted = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
    } else {
      // do componentDidUpdate logic
      if(props.handleIsCloseClicked){
        setIsLoggedIn(AuthGuard());
      }
  
    }
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {


    setIsLoading(true);

    axiosClient.auth
      .login({
        email: values.email,
        password: values.password,
      })
      .then((response) => {
      
      if(response.data.is_first_login){
         props.handleOnClickModal(<FirstTimeLogin />);  
         setUserStorage(response.data.token, response.data);  
      } else {
        setUserStorage(response.data.token, response.data);
        setIsLoggedIn(AuthGuard());
        
      }

    
     
          //props.handleOnClickModal(<h1>abc ed gh</h1>);
         
       

      // setTimeout(function (){
      //   setUserStorage(response.data.token, response.data);
      //   setIsLoggedIn(AuthGuard());
      // }, loginTime);

      })
      .catch((error) => {

        setIsLoading(false);
        props.printMessages(error.response.data);

      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate,
    onSubmit,
  });

  if (AuthGuard()) {
      return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <div className="modal-body login-signup">
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <img
              src="/images/logo.png"
              alt="CertStationLogo"
              className="m-auto mw-100"
            />
            <h3 className="text-center mt-3">Login</h3>
            
            {props.messages}
            <div className="form-group">
              <label htmlFor="EmailId">Email ID</label>
              <input
                type="text"
                className="form-control"
                value={formik.values.email}
                name="email"
                placeholder="Email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email ? (
                <FieldError message={formik.errors.email} />
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password  ?  (
                <FieldError message={formik.errors.password} />
              ) : null}
            </div>
            <div className="form-group">
              <input type="checkbox" name="remember_me" />
              <span>Remember me</span>
              <Link
                to="/forgot-password"
                className="text-center float-right"
                onClick={props.onClosePop}
              >
                Forgot Password
              </Link>
            </div>

            <div className="form-group sign_up_btn float-right">
              <button
                type="submit"
                className="btn btn-primary btn-md mw-100"
                disabled={isLoading}
              >
                {isLoading ? <span>Loading..</span> : <span>Login</span>}
              </button>

              {(window.location.href.includes('forgot-password') || window.location.href.includes('reset-password')) &&  <Link to="/login" className="btn btn-primary btn-md mw-100">
                Sign Up
              </Link> }
             
              {/* <a  class="btn btn-primary btn-md mw-100">Sign Up</a> */}
              {/*<a onClick={this.props.onClosePop} class="btn btn-primary btn-md mw-100">Sign Up</a>*/}
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PopupHOC(ErrorMessagesHOC(Login));
