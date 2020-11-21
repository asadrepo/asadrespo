import React, {Component} from 'react';
import FieldError from '../common/FieldError';

class PhishingSecurityTest extends Component {

    state = {
        domain: '',
        formErrors: {
            domain: "",
         
        },
        isSubmit: false
    }


    handleOnChange = (event) => {

        const {name, value} = event.target;
        this.setState({
           [event.target.name]: event.target.value
        });

        console.log(event.target.name);

        let formErrors = this.state.formErrors;
        switch (name) {
            case 'domain':
                formErrors.domain = value.length < 3  ? 'Please enter domain proceed.' : "";
                break;
          
            default:
                break;
       }


    };



    handlePhishingTestCheck = () => {
        this.setState({
            isSubmit: true,
        });

        
     

        if(this.state.domain.length < 3){
        
            this.setState({
                formErrors: {
                    domain: 'Please enter domain to proceed.'
                }
            })
        }

        
        alert("Website Security Test");
    }


    render() {
        const {formErrors} = this.state;
        return (
                <div className="mast_inner">
                    <h4>Phishing Test</h4>
                    <p>Discover typosquatted, cybersquatted or phishing websites abusing your brand</p>
                    <div className="input-group md-form form-sm form-2 pl-0 phishing_test_search">
                        <input className="form-control my-0 py-1" type="text" onChange={this.handleOnChange} value={this.state.domain} placeholder="Enter a domain name" aria-label="SearchResult" />
                        <div className="input-group-append">
                            <span className="input-group-text phishing_test_search_color"><i className="phishing_test_icon"><img onClick={this.handlePhishingTestCheck} src="images/arrow-right.png" alt="PhishingTestSearch" /></i></span>
                        </div>
                    </div>
                    {formErrors.domain.length  > 0 && this.state.isSubmit && (
                        
                         <FieldError message={formErrors.domain} />
                    )}
                </div>
        );
    }
}

export default PhishingSecurityTest;