import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import FieldError from '../common/FieldError';
import PasswordStrengthBar from 'react-password-strength-bar';
import axiosClient from '../../shared/axiosClient';
import { getUser } from '../../containers/Auth/Auth';
import ErrorMessagesHOC from '../../hoc/ErrorMessagesHOC';

const ChangePassword = (props) => {
    const displayValue = props.displayValue ? 'block' : 'none';
    const [password, setPassword] = useState("");
    const [isStrongPassword, setIsStrongPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const user = JSON.parse(getUser());
    const [errorMessages, setErrorMessages] = useState(null);

    const validate = (values) => {
        const errors = {};
    setPassword(values.password);
    if(values.old_password === ""){
        errors.old_password = "Old password is required.";
    }

    if(values.old_password && !values.password){
        errors.password = "New password is required";
    }

    if(values.password && values.password_confirmation !== values.password ){
        errors.password_confirmation = "Confirm password should be matched with password.";
    }

    if(values.password && !values.old_password){
        errors.old_password = "Old password is required to change password.";
    }
      
        return errors;
      };

    const onChangePasswordScore = (event) => {
        if(event > 3) {
            setIsStrongPassword(true);
            return;
        }
    
        setIsStrongPassword(false);
    } 
    
    const formik = useFormik({
        initialValues: {
            old_password: "",
            password: "",
            password_confirmation: ""
        
        },
        validate,
        onSubmit: (values, {resetForm}) => {
          setIsLoading(true);
          alert(JSON.stringify(values, null, 2));
          axiosClient.profile.changePassword(user.id, {
            old_password: values.old_password,
            new_password: values.password,
            confirm_password: values.password_confirmation
          }).then(response => {

           
            props.printMessages({success: ['Password has been changed successfully.']}, 'success');
            resetForm({values: ''});
            setIsLoading(false);
            setPassword('');
          }).catch(error => {
           
            setIsLoading(false);
           // resetForm({values: ''});
            props.printMessages(error.response.data);
          });
    
        },
      });

    return(  <div id="change_password_div"  style={{display: displayValue}} >
        <h2 className="mt-3">Change Password</h2>
        {props.messages}
        <form onSubmit={formik.handleSubmit}>
        <div className="form-group mt-5">
          <div className="row">
            <div className="col-12 col-md-4 col-sm-12 col-xs-12 mb-3 mb-sm-3 mb-md-0">
              <label htmlFor="OldPassword">Old Password</label>
            </div>
            <div className="col-12 col-md-8 col-sm-12 col-xs-12 mb-3 mb-sm-3 mb-md-0">
              <input type="password"
               name="old_password"
               className="form-control"
                placeholder="Old Password"
                value={formik.values.old_password}
                onChange={formik.handleChange}
                 />
                 {formik.errors.old_password ? (
                      <FieldError message={formik.errors.old_password} />
                    ) : null}
            </div>
            
          </div>
        </div>
        <div className="clearfix" />
        <div className="form-group">
          <div className="row">
            <div className="col-12 col-md-4 col-sm-12 col-xs-12 mb-3 mb-sm-3 mb-md-0">
              <label htmlFor="NewPassword">New Password</label>
            </div>
            <div className="col-12 col-md-8 col-sm-12 col-xs-12 mb-3 mb-sm-3 mb-md-0">
              <input type="password"
               name="password"
                className="form-control"
                placeholder="New Password"
                value={formik.values.password}
                onChange={formik.handleChange} />
                  <PasswordStrengthBar password={password}  
                            
                             /> 
               {formik.errors.password ? (
                      <FieldError message={formik.errors.password} />
                    ) : null}
            </div>
            
          
          </div>
        </div>
        <div className="clearfix" />
        <div className="form-group">
          <div className="row">
            <div className="col-12 col-md-4 col-sm-12 col-xs-12 mb-3 mb-sm-3 mb-md-0">
              <label htmlFor="ConfirmPassword">Confirm Password</label>
            </div>
            <div className="col-12 col-md-8 col-sm-12 col-xs-12 mb-3 mb-sm-3 mb-md-0">
            <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="password_confirmation"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
            />
            {formik.errors.password_confirmation ? (
                <FieldError message={formik.errors.password_confirmation} />
             ) : null}
            </div>
            {/* <div className="col-12 col alert alert-success mt-4" role="alert">
              Password has been Updated
            </div>
            <div className="col-12 col alert alert-danger" role="alert">
              Error Updating Password
            </div> */}
            
          </div>
        </div>
        <div className="clearfix" />
             <div className="form-group">
          <div className="row">
            <div className="col-12 sign_up_btn">
            <button type="submit" className="btn btn-primary float-right" disabled={isLoading}>
                {isLoading ? <span>Loading..</span> : <span>Update</span>}
              </button>
            </div>
          </div>
        </div>
        </form>
      </div>);
}
export default ErrorMessagesHOC(ChangePassword);
// ErrorMessagesHOC
// export default ChangePassword;