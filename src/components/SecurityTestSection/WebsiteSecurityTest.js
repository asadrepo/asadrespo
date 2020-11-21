import React, {Component} from 'react';
import FieldError from '../common/FieldError';

class WebsiteSecurityTest extends Component {

    state = {
        ipAddressOrDomain: '',
        formErrors: {
            ipAddressOrDomain: "",
         
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
            case 'ipAddressOrDomain':
                formErrors.ipAddressOrDomain = value.length < 3  ? 'Please enter domain or ip to proceed.' : "";
                break;
          
            default:
                break;
       }


    };



    handleWebSecurityCheck = () => {
        this.setState({
            isSubmit: true,
        });

        
     

        if(this.state.ipAddressOrDomain.length < 3){
        
            this.setState({
                formErrors: {
                    ipAddressOrDomain: 'Please enter domain or ip to proceed.'
                }
            })
        }

        
        alert("Website Security Test");
    }
    render() {
        const {formErrors} = this.state;
        return (
                <div className="mast_inner">
                    <h4>Website Security Test</h4>
                    <p>Check your website for GDPR and PCI DSS Compliance, Security and Privacy</p>
                    <div className="input-group md-form form-sm form-2 pl-0 website_security_search">
                        <input className="form-control my-0 py-1" name='ipAddressOrDomain' onChange={this.handleOnChange} value={this.state.ipAddressOrDomainInput}  type="text" placeholder="Enter a domain name or IP address" aria-label="SearchResult" />
                        <div className="input-group-append">
                            <span className="input-group-text website_security_search_color"><i className="website_security_icon"><img onClick={this.handleWebSecurityCheck} src="images/arrow-right.png" alt="WebsiteSecuritySearch" /></i></span>
                        </div>
                    </div>

                    {formErrors.ipAddressOrDomain.length  > 0 && this.state.isSubmit && (
                         <FieldError message={formErrors.ipAddressOrDomain} />
                    )}
                </div>
        );
    }
}

export default WebsiteSecurityTest;