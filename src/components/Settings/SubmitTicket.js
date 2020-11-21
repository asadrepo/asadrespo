import React, { useState, useEffect } from 'react';
import { useFormik, useField } from 'formik';
import FieldError from '../common/FieldError';
import axiosClient from '../../shared/axiosClient';
import { getUser } from '../../containers/Auth/Auth';
import ErrorMessagesHOC from '../../hoc/ErrorMessagesHOC';


const SubmitTicket = (props) => {
  const user = JSON.parse(getUser());
  const [isLoading, setIsLoading] = useState(false);
  const [otherCategoryDisplay, setOtherCategoryDisplay] = useState('none');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosClient.submitTicket.categories().then(
      response => {
        setCategories(response.data.results);
      }
    );
  }, []);


  const validate = (values) => {
    const errors = {};

    if (!values.full_name) {
        errors.full_name = "Full name is required";
      } else if (values.full_name.length > 15) {
        errors.full_name = "Must be 15 characters or less";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.question) {
      errors.question = "Question is required";
    } 


  
    return errors;
  };

  const handleChangeCategory = (event) => {
    var selectOption = event.target.options[event.target.selectedIndex].text;
    formik.handleChange(event);
    setOtherCategoryDisplay('none');
    if(selectOption.toLowerCase() === 'other'){
      setOtherCategoryDisplay('block');
    }

  }

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      question: "",
      category: "",
      sub_category: ""
    },
    validate,
    onSubmit: (values, {resetForm}) => {
      setIsLoading(true);
      // resetForm({values: ''});
      axiosClient.submitTicket.create_ticket({
        title: values.full_name,
        category_id: values.category,
        user_id: user.id,
        email: values.email,
        question: values.question,
        priority: 'high'

      }).then(
        response => {
          props.printMessages({success: ['Ticket has been submitted successfully.']}, 'success');
          setIsLoading(false);
          resetForm({values: ''});
        }
      ).catch(error => {
        props.printMessages(error.response.data);
        setIsLoading(false);
        resetForm({values: ''});
      });
    }
  });
    
    return (
        <div className="modal-body sat_modal_inner_padding">
          {props.messages}
        <div className="container">
          <form onSubmit={formik.handleSubmit} >
          <h3>Submit a Ticket</h3>
          <label htmlFor="Name">Name</label>
          <input type="text" className="form-control" name="full_name" 
                      value={formik.values.full_name || ""}
                      onChange={formik.handleChange} />
           {formik.errors.full_name ? (
                      <FieldError message={formik.errors.full_name} />
                    ) : null}
           <div className="clearfix" />                      
          <label htmlFor="Email">Email</label>
          <input type="email" className="form-control" name="email" 
                      value={formik.values.email || ""}
                      onChange={formik.handleChange}/>
             {formik.errors.email ? (
                      <FieldError message={formik.errors.email} />
                    ) : null}
           <div className="clearfix" />    

          <label htmlFor="Category">Category</label>
          <select name={'category'} onChange={handleChangeCategory} className="form-control">
            <option>Select Category</option>
            {categories.map(category => {
              return <option key={category.id} value={category.id}>{category.name}</option>
            })}
            {/* <option value={1}>Category 1</option>
            <option value={2}>Category 2</option>
            <option value={3}>Category 3</option>
            <option value={4}>Category 4</option>
            <option value={5}>Other</option> */}
          </select>
         
          <input type="text" className="form-control" name="other_category" placeholder="Other Category" style={{display: otherCategoryDisplay}}/>

          <label htmlFor="AskYourQuestion">Ask Your Question</label>

    

          <textarea className="form-control" name="question" value={formik.values.question || ""}
                      onChange={formik.handleChange} />
                         {formik.errors.question ? (
                      <FieldError message={formik.errors.question} />
                    ) : null}
           <div className="clearfix" />  

          <button type="submit" className="btn btn-primary"  disabled={isLoading}>
          {isLoading ? <span>Loading..</span> : <span>Submit</span>}
          </button>

          <a style={{cursor: 'pointer'}} onClick={props.onClickClose}> &lt;&lt; Back</a>
          </form>
        </div>
      </div>
    )
}

export default ErrorMessagesHOC(SubmitTicket);