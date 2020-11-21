import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import FieldError from "../common/FieldError";
import PasswordStrengthBar from 'react-password-strength-bar';
import axiosClient from "../../shared/axiosClient";
import { getUser, setOnlyUserObject } from "../../containers/Auth/Auth";

const Profile = (props) => {
  const displayValue = props.displayValue ? "block" : "none";
  const user = JSON.parse(getUser());
  const [password, setPassword] = useState("");
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(user.image);
  //const [countries, setCountries] = useState([]);

  const validate = (values) => {
    const errors = {};

    setPassword(values.password);
    if (!values.full_name) {
        errors.full_name = "Full name is required";
      } else if (values.full_name.length > 15) {
        errors.full_name = "Must be 15 characters or less";
    }
    if(!values.company){
        errors.company = "Company is required";
    } else if (values.company.length > 15) {
        errors.company = "Must be 15 characters or less";
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
      full_name: user.first_name + ' '+user.last_name,
      company: user.company ? user.company : "",
      country_id: user.country.id,
      password: "",
      old_password: "",
      password_confirmation: "",
      phone: user.phone,
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));

      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append('first_name', values.first_name);
      formData.append('last_name', 'abc');
      formData.append('company', values.company);
      formData.append('phone', values.phone);
      formData.append('country_id', values.country_id);
      formData.append('is_2f_verification', 1);
      formData.append('email', user.email);

      axiosClient.profile.edit(user.id, formData).then(
        response => {
          console.log("Edit profile response");
          console.log(response);

          setOnlyUserObject(response.data);
        }
      ).catch(
        error => {
          console.log("edit profile error response");
          console.log(error);
        }
      );

      console.log(formData);
    },
  });

  const fileChangeHandler = (event) => {
    console.log("image upload image");
    const file = event.target.files[0];

    var reader = new FileReader();
    reader.onload =  function(e){
      setProfileImage(e.target.result);
    }

    reader.readAsDataURL(event.target.files[0]);

    console.log(file);

    setSelectedFile(file);
   // setProfileImage(file.name);
    
    console.log(file);
  }

  

  // useEffect(() => {
  //   axiosClient.common.getCountries().then(response => {
  //       setCountries(response.data.results);
  //   });
  // }, []);

  return (


    <div id="edit_profile_div" style={{ display: displayValue }}>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <div className="row">
            <div className="col-12 mb-3 mb-sm-3 mb-md-0">
              <div className="avatar-upload">
                <div className="avatar-edit">
                  <input
                    type="file"
                    name="image"
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    onChange={fileChangeHandler}
                  />
                  <label htmlFor="imageUpload" />
                </div>
                <div className="avatar-preview">
                  <div
                    id="imagePreview"
                    style={{ backgroundImage: "url("+profileImage+")" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="col-12 mb-3 mb-sm-3 mb-md-0 pro_pic">
              <label htmlFor="ProfilePicture">
                Upload Profile Picture Here
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
      
          <div className="row">
          <div className="col-12 col-md-4 col-sm-12 mb-3 mb-sm-3 mb-md-0">
                                                <label for="Name">Name</label>
                                            </div>
            <div className="col-12 col-md-8 col-sm-12 mb-3 mb-sm-3 mb-md-0">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
                name="full_name"
                value={formik.values.full_name}
                onChange={formik.handleChange}
              />
              {formik.errors.full_name ? (
                      <FieldError message={formik.errors.full_name} />
                    ) : null}
            </div>
          
          </div>
        </div>
        

        <div className="form-group">
          <div className="row">
          <div className="col-12 col-md-4 col-sm-12 mb-3 mb-sm-3 mb-md-0">
                                                <label for="Name">Company</label>
                                            </div>
          <div className="col-12 col-md-8 col-sm-12 mb-3 mb-sm-3 mb-md-0">
              <input
                type="text"
                className="form-control"
                placeholder="Company"
                name="company"
                value={formik.values.company}
                onChange={formik.handleChange}
              />
               {formik.errors.company ? (
                      <FieldError message={formik.errors.company} />
                    ) : null}
            </div>
          
          </div>
        </div>


        <div className="clearfix" />
        <div className="form-group">
          <div className="row">
            <div className="col-12 col-md-6 col-sm-12">
              <select
                name="country_id"
                id="selectCountry"
                className="form-control"
              >
                <option value="">Select Country</option>
                {props.countries.map(country => {
                return <option key={country.id} value={country.id}>{country.name}</option>
                })}
              </select>
            </div>
            <div className="col-12 col-md-6 col-sm-12 col-xs-12 mb-3 mb-sm-3 mb-md-0">
              <input
                type="password"
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
            <div className="col-12 col-md-6 col-sm-12 col-xs-12 mb-3 mb-sm-3 mb-md-0">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="New Password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
                <PasswordStrengthBar password={password}  
                                                onChangeScore={onChangePasswordScore}
                             /> 
               {formik.errors.password ? (
                      <FieldError message={formik.errors.password} />
                    ) : null}
            </div>
            <div className="col-12 col-md-6 col-sm-12 col-xs-12">
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
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-12 col-md-6 col-sm-12 col-xs-12 mb-3 mb-sm-3 mb-md-0">
              <div className="row">
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Code"
                  />
                </div>
                <div className="col-8 pl-0">
                  <input
                    type="text"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Number"
                  />
                </div>
              </div>
              <small>
                ( Your number is verified if you want to change your number
                please <a className="comon_green_color">Edit Number</a> )
              </small>
            </div>
          </div>
        </div>
        <div className="clearfix" />
        <div className="form-group">
          <div className="row">
            <div className="col-12 col-md-6 col-sm-12 col-xs-12 two_factor_subscription">
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round" />
              </label>
              <span className="two_factor_verification">
                Enable Two Factor Verification
              </span>
            </div>
          </div>
        </div>
        <div className="clearfix" />
        <div className="form-group">
          <div className="row">
            <div className="col-12 sign_up_btn">
              <button type="submit" className="btn btn-primary float-right">
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
