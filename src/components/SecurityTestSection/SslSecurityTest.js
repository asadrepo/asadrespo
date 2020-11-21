import React, {Component} from 'react';
import FieldError from '../common/FieldError';

class SslSecurityTest extends Component {
    state = {
        ipAddressOrDomain: '',
        formErrors: {
            ipAddressOrDomain: "",
         
        },
        isSubmit: false
    }

    checkSslSecurity = () => {
        
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

       alert("submitted");
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

    render() {
        const {formErrors} = this.state;
        return (
            <div className="mast_inner">
                <h4>SSL Security Test</h4>
                <p>Test your servers for security and compliance with PCI DSS, HIPAA & NIST</p>
                <div className="input-group md-form form-sm form-2 pl-0 ssl_security_search">
                    <input className="form-control my-0 py-1 " type="text"
                           placeholder="Enter a domain name or IP address" name='ipAddressOrDomain' value={this.state.ipAddressOrDomainInput} onChange={this.handleOnChange} aria-label="Search" />
                        <div className="input-group-append">
                            <span className="input-group-text ssl_security_search_color"><i
                                className="ssl_security_icon"><img onClick={this.checkSslSecurity} src="images/arrow-right.png" alt="SSLSecuritySearch" /></i></span>
                        </div>
                </div>
                {formErrors.ipAddressOrDomain.length  > 0 && this.state.isSubmit && (
                
                                            <FieldError message={formErrors.ipAddressOrDomain} />
                                        )}
            </div>
        );
    }
}

export default SslSecurityTest;