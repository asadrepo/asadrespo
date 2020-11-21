import React, {Component} from 'react';
import FieldError from '../common/FieldError';

class PwnedCheck extends Component {

    state = {
        email: '',
        formErrors: {
            email: "",
         
        },
        isSubmit: false
    }

    handleCheckPwed = () => {
        this.setState({
            isSubmit: true,
        });

        
     

        if(this.state.email.length < 3){
        
            this.setState({
                formErrors: {
                    email: 'Please enter email to proceed.'
                }
            })
        }

       alert("submitted");
    }


    handleOnChange = (event) => {

        const {name, value} = event.target;
        this.setState({
           [event.target.name]: event.target.value
        });



        let formErrors = this.state.formErrors;
        switch (name) {
            case 'email':
                formErrors.email = value.length < 3  ? 'Please enter email to proceed.' : "";
                break;
          
            default:
                break;
       }


    };

    render() {
        const {formErrors} = this.state;
        return (
            <div className="col-md-12 have_pwned_section">
                <div className="have_pwned_inner">
                    <h2>';--Have I Been Pwned</h2>
                    <p>Check an account compromised in a data breach</p>
                    <div className="input-group md-form form-sm form-2 pl-0 custom_search_have_pwned">
                        <input className="form-control my-0 py-1" type="text" name='email' placeholder="Email ID" aria-label="havPwnedSearch" />
                        <div className="input-group-append">
                            <span className="input-group-text custom_search_have_pwned_color" onClick={this.handleCheckPwed}>Check &gt;&gt;</span>
                        </div>
                    </div>
                    {formErrors.email.length  > 0 && this.state.isSubmit && (
              
              <FieldError message={formErrors.email} />
          )}
                </div>
               
            </div>
        );
    }
}

export default PwnedCheck;