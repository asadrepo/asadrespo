import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import FieldError from "../common/FieldError";
import PasswordStrengthBar from 'react-password-strength-bar';
import axiosClient from "../../shared/axiosClient";
import { getUser, setOnlyUserObject } from "../../containers/Auth/Auth";
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import AlertMessage from "../common/AlertMessage";
import { getCroppedImg, getRotatedImage } from '../../helpers/canvasUtils'

import { getOrientation } from 'get-orientation/browser'
// import ImgDialog from './ImgDialog'

import Cropper from 'react-easy-crop'

const ORIENTATION_TO_ANGLE = {
    '3': 180,
    '6': 90,
    '8': -90,
  }

  function readFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }
  

const Profile = (props) => {
  const displayValue = props.displayValue ? "block" : "none";
//  const [phoneNumber, setPhoneNumber] = useState()
  const user = JSON.parse(getUser());
  const [password, setPassword] = useState("");
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(user.image);
  const [is2FactorVerification, setIs2FactorVerification] = useState(user.is_2f_verification);
  const [errorMessages, setErrorMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //const [countries, setCountries] = useState([]);



  const [imageSrc, setImageSrc] = React.useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)

      var link = window.URL.createObjectURL(croppedImage);

      console.log(link);



    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels, rotation])


  const onFileChange = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      // apply rotation if needed
      const orientation = await getOrientation(file)
      const rotation = ORIENTATION_TO_ANGLE[orientation]
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
      }

      console.log("hgerer");
      console.log(imageDataUrl);
      setImageSrc(imageDataUrl)
    }
  }

  const validate = (values) => {
    const errors = {};


    setPassword(values.password);

  console.log(values.is_2f_verification);

    if(values.country_code == ""){
      errors.country_code = "Country code is required";
    }

    if(!values.country_code.includes('+')){
      errors.country_code = "Country code is not valid";
    }

    if(values.phone == ""){
      errors.phone = "Phone number is required";
    }


    const phoneNumberCheck = parsePhoneNumberFromString(values.country_code+''+ values.phone);

    if(phoneNumberCheck !== undefined){

      if(!phoneNumberCheck.isValid()){
        errors.phone = "Phone number is not valid";
      }
    }
   

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

  const phoneNumber = parsePhoneNumberFromString(user.phone);

  const formik = useFormik({
    initialValues: {
      full_name: user.first_name + ' '+user.last_name,
      company: user.company ? user.company : "",
      country_id: user.country.id,
      is_2f_verification: user.is_2f_verification,
      // phone: "",
      // country_code: ""
      phone: phoneNumber !== undefined ? phoneNumber.nationalNumber : "",
      country_code: phoneNumber !== undefined ? '+'+phoneNumber.countryCallingCode : ""
    },
    validate,
    onSubmit: (values) => {
      setIsLoading(true);
      const full_name = values.full_name.split(' ');
      const phoneNumber = parsePhoneNumberFromString(values.country_code+''+values.phone);
      const formData = new FormData();
      
    //   if(selectedFile){
    //     formData.append("image", selectedFile);
    //   }
      formData.append('image', croppedImage);
      formData.append('first_name', full_name[0]);
      formData.append('last_name', full_name[1]);
      formData.append('company', values.company);

      formData.append('phone', phoneNumber.number);

      formData.append('country_id', values.country_id);
      formData.append('is_2f_verification', is2FactorVerification);
      formData.append('email', user.email);

      axiosClient.profile.edit(user.id, formData).then(
        response => {
          if(!selectedFile){
            response.data.image = profileImage;
          }

          if(response.status == 200){
            setOnlyUserObject(response.data);

            setErrorMessages(<AlertMessage type='success' message={{success: ['Profile has been updated successfully.']}} />);
          }
          setIsLoading(false);
         

        }
      ).catch(
        error => {
          if(error.response.status === 500){
            const {statusText} = error.response;
            setErrorMessages(<AlertMessage type={'danger'} message={{danger: [statusText]}} />);
            setIsLoading(false);
         
            return;
          }
        setErrorMessages(<AlertMessage type={'danger'} message={error.response.data} />);
        setIsLoading(false);
         
        }
      );

      console.log(formData);
    },
  });

  const fileChangeHandler = (event) => {
   
    const file = event.target.files[0];
    var reader = new FileReader();
    reader.onload =  function(e){
      setProfileImage(e.target.result);
    }

    reader.readAsDataURL(event.target.files[0]);
    setSelectedFile(file);
  
  }



  return (


    <div id="edit_profile_div" style={{ display: displayValue }}>
      <h2>Edit Profile</h2>
      {errorMessages}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <div className="row">
         
            <div className="col-12 mb-3 mb-sm-3 mb-md-0">
            {imageSrc ? (
        <React.Fragment>
          <div style={{height: '275px'}} >
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
             
            />

           
          </div>
        
        </React.Fragment>
        
      ) : (
        <input type="file" onChange={onFileChange} accept="image/*" />
      )}
            </div>
            <div className="col-12 mb-3 mb-sm-3 mb-md-0 pro_pic">
            <div className="avatar-preview">
                {/* <img src={croppedImage} /> */}
                  <div
                    id="imagePreview"
                    style={{ backgroundImage: croppedImage }}
                  ></div>
                </div>
              <label htmlFor="ProfilePicture">
                Upload Profile Picture Here
              </label>
              <input type="range" className="custom-range" id="customRange1" value={zoom}
                min={1}
                max={3}
                step={0.1}  onChange={(e) => setZoom(e.target.value)}/>

            <input type="range" className="custom-range" id="customRange1"   value={rotation}
                min={0}
                max={360}
                step={1}
                onChange={(e) => setRotation(e.target.value)} />
            <button type="button" onClick={showCroppedImage} className="btn btn-success" name="crop" >Crop Image</button>
            </div>
          </div>
        </div>
        <div className="form-group">
      
          <div className="row">
          <div className="col-12 col-md-4 col-sm-12 mb-3 mb-sm-3 mb-md-0">
                                                <label htmlFor="Name">Name</label>
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
                                                <label htmlFor="Company">Company</label>
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
          <div className="col-12 col-md-4 col-sm-12 mb-3 mb-sm-3 mb-md-0">
                                                <label htmlFor="country">Select Country</label>
                                            </div>
            <div className="col-12 col-md-8 col-sm-12">
              <select
                name="country_id"
                id="selectCountry"
                className="form-control"
                onChange={formik.handleChange} 
                value={formik.values.country_id}
              >
                <option value="">Select Country</option>
                {props.countries.map(country => {
                return <option key={country.id} value={country.id}  >{country.name}</option>
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="clearfix" />
        <div className="form-group">
          <div className="row">
          <div className="col-12 col-md-4 col-sm-12 mb-3 mb-sm-3 mb-md-0">
                                                <label htmlFor="country">Number</label>
                                            </div>
            <div className="col-12 col-md-8 col-sm-12 col-xs-12 mb-3 mb-sm-3 mb-md-0">
              <div className="row">
                <div className="col-4">
                  <input
                  
                    name="country_code"
                    value={formik.values.country_code}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="+1"
                  />
                   {formik.errors.country_code ? (
                      <FieldError message={formik.errors.country_code} />
                    ) : null}
                </div>
                <div className="col-8 pl-0">

                {/* <InputMask mask="(999) 999-99-99" 
                defaultValue={formik.values.phone} 
                onChange={formik.handleChange}   
                 className="form-control"  
                  placeholder="Number"/> */}
                  <input
                    type="text"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="123456789"
                  /> 
                    {formik.errors.phone ? (
                      <FieldError message={formik.errors.phone} />
                    ) : null}
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
                <input type="checkbox" value={formik.values.is_2f_verification} defaultChecked={is2FactorVerification} onChange={() => setIs2FactorVerification(!is2FactorVerification)}/>
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
              <button type="submit" className="btn btn-primary float-right" disabled={isLoading}>
                {isLoading ? <span>Loading..</span> : <span>Update</span>}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
