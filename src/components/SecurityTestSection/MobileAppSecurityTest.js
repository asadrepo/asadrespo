import React, {Component} from 'react';

class MobileAppSecurityTest extends Component {
    render() {
        return (
                <div className="mast_inner" id="mobile-app-test">
                    <h4>Mobile App Security Test</h4>
                    <p>Audit your iOS or Android apps for OWASP Mobile Top 10 and other vulnerabilities</p>
                    <a ><img src="images/and_app.png" alt="AndroidApple" /> <span>Upload your mobile app</span></a>
                    <a  className="andr_button"><img src="images/andr.png" alt="Android" className="andr_image" /> <span>Type Google Play app name</span></a>
                </div>
        );
    }
}

export default MobileAppSecurityTest;