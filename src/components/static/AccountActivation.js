import React, { useEffect } from 'react';
import LoginLayout from '../../containers/Layout/LoginLayout';
import axiosClient from '../../shared/axiosClient';
import ErrorMessagesHOC from '../../hoc/ErrorMessagesHOC';

const AccountActivation = (props) => {
  const { user_id, token } = props.match.params;


  useEffect(() => {
    axiosClient.auth.accountActivate(user_id, token, {
      uid: user_id,
      token: token
    }).then(response => {

      if(response.data.status === 400){
        props.printMessages({ success: [response.data.message] }, 'danger');
        return;
      }

      props.printMessages({ success: [response.data.message] }, 'success');
    }).catch(error => {
     console.log(error);
    });
  }, []);

  return (
    <LoginLayout>
      <div className="login_screen_bg">
        <div className="col-12">
          <div className="container">
            <div className="signup_section m-auto forgot">
              <h2>Activate Account</h2>

              <div className="confirmation_send">
                {props.messages}
              </div>
              <div className="clearfix" />

            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
}

export default ErrorMessagesHOC(AccountActivation);