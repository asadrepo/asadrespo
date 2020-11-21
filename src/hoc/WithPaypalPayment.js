import Popup from "../components/common/Popup";
import React, {Component} from "react";
import { isExpressionWrapper } from "@babel/types";
import AlertMessage from "../components/common/AlertMessage";
import axiosClient from "../shared/axiosClient";
import {getUser} from "../containers/Auth/Auth";

const WithPaypalPayment = (WrappedComponent) => {
    return class WithPaypalPayment extends Component {


        constructor(props) {
            super(props);
        }

        state = {
            isPrimiumShow: "none",
            showPaypalButton: false,
            amount: 0,
            package_id: null
        }

         user = JSON.parse(getUser());

        onChangeIsPremium = (event) => {

            if(parseInt(event.target.value)){
                this.setState({isPrimiumShow: "block"});
                return;
            }

            this.setState({isPrimiumShow: "none"});
            this.setState({showPaypalButton: false});
            // if (parseInt(event.target.value)) {
            //     setIsPrimiumShow("block");
            //     return;
            //   }
            //   setShowPaypalButton(false);
            //   setIsPrimiumShow("none");
        }

        handleOnSubscriptionChange = (event) => {

            axiosClient.profile.changePackage({
                user_id: this.user.id,
                package_id: 3,
                payment_status: 'COMPLETED',
                payer_email: 'imranmushtaq1987-buyer@gmail.com',
                recipient_name: 'test buyer',
                amount: 151.88,
                currency: 'USD',
                payer_id: '6UAE9V39Y3AF6'
            }).then(response => {

                console.log("payment success");
                console.log(response);
            }).catch(error => {
                console.log("errror");
                console.log(error);
            })

            console.log(this.props.packages);
            this.props.packages.map((subscription) => {
              if (parseInt(event.target.value) === parseInt(subscription.id)) {
               this.setState({
                   amount: subscription.amount,
                   package_id: subscription.id
               })
              }
            });
        
            if (parseInt(event.target.value)) {
              this.setState({showPaypalButton: true});
            } else {
              this.setState({showPaypalButton: false});
            }
          };

        client = {
            sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID,
        };

        handlePaypalOnError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error from hoc!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
          };
        
        handlePaypalOnSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            console.log("The payment was succeeded!", payment);
            // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data

            axiosClient.profile.changePackage({
                user_id: this.user.id,
                package_id: this.state.package_id,
                payment_status: 'COMPLETED',
                payer_email: payment.email,
                recipient_name: payment.address.recipient_name,
                amount: this.state.amount,
                currency: 'USD',
                payer_id: payment.payerID
            }).then(response => {

                console.log("payment success");
                console.log(response);
            }).catch(error => {
                console.log("errror");
                console.log(error);
            })
          };
        
        handlePaypalOnCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log("The payment was cancelled! from hoc", data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
          };
    
     
        render (){
            
           return (
               <React.Fragment>
                    <WrappedComponent
                     onError={this.handlePaypalOnError}
                     onSuccess={this.handlePaypalOnSuccess}
                     onCancel={this.handlePaypalOnCancel}
                     onChangeIsPremium={this.onChangeIsPremium}
                     isPrimiumShow={this.state.isPrimiumShow}
                     amount={this.state.amount}
                     paypalClient={this.client}
                     onSubscriptionChange={this.handleOnSubscriptionChange}
                     showPaypalButton={this.state.showPaypalButton}
                     {...this.props} 
                     />
               </React.Fragment>
           );

        }
    }
}
export default WithPaypalPayment;