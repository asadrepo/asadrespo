import React, {Component} from "react";
import AlertMessage from "../components/common/AlertMessage";

const ErrorMessagesHOC = (WrappedComponent) => {
    return class ErrorMessagesHOC extends Component {

        constructor(props) {
            super(props);
        }

        state = {
            errorMessages: false,
        }
    
        showMessages = (messages, type = 'danger') => {
        
          this.setState({
              errorMessages: <AlertMessage type={type} message={messages} />
          });
        }
     
        render (){
            
           return (
               <React.Fragment>
                    <WrappedComponent messages={this.state.errorMessages} printMessages={this.showMessages}
                     {...this.props} 
                     />
               </React.Fragment>
           );

        }
    }
}
export default ErrorMessagesHOC;