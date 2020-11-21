import React, { useState } from 'react';
import PaypalExpressBtn from "react-paypal-express-checkout";

const Payment = (props) => {

    const displayValue = props.displayValue ? 'block' : 'none';
    const [showPaypalButton, setShowPaypalButton] = useState(false);
    const [isPremiumShow, setIsPrimiumShow] = useState("none");

    const onChangeIsPremium = (event) => {
        if (parseInt(event.target.value)) {
            setIsPrimiumShow("block");
            return;
          }
          setShowPaypalButton(false);
          setIsPrimiumShow("none");
    }

    const handleOnSubscriptionChange = (event) => {
        props.packages.map((subscription) => {
          if (parseInt(event.target.value) === parseInt(subscription.id)) {

          }
        });
    
        if (parseInt(event.target.value)) {
          setShowPaypalButton(true);
        } else {
          setShowPaypalButton(false);
        }
      };

      const handlePaypalOnError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
      };
    
      const handlePaypalOnSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
        console.log("The payment was succeeded!", payment);
        // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
      };
    
      const handlePaypalOnCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.log("The payment was cancelled!", data);
        // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
      };
    
      const client = {
        sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID,
      };

    return (
        <div id="payment_method_div" style={{display: displayValue}}>
        <div className="form-group">
            <div className="row">
                <div className="col-12 col-md-6 col-sm-12 col-xs-12">
                    <label htmlFor="Status">Status : </label><span> Free</span>
                </div>
                <div className="col-12 col-md-6 col-sm-12 col-xs-12">
                    <label htmlFor="Status">15 Days Remaining</label>
                </div>
            </div>
        </div>
        <div className="clearfix" />
        <div className="form-group">
            <div className="row">
                <div className="col-12 col-md-6 col-sm-12 col-xs-12">
                <input
                      type="radio"
                      name="is_premium"
                      value={0}
                      defaultChecked
                      className="free_subs"
                      onChange={onChangeIsPremium}
                      
                    />
                    <span>Free (30 days trial)</span>
                </div>
                <div className="col-12 col-md-6 col-sm-12 col-xs-12">
                <input
                      type="radio"
                      name="is_premium"
                      value={1}
                      className="select_prem"
                      onChange={onChangeIsPremium}
                    />
                    <span>Premium</span>
                </div>
            </div>
        </div>
        <div className="clearfix" />
        <div className="form-group" style={{ display: isPremiumShow }}>
            <div className="row">
                <div className="col-12">
                    <select name="package" id="selectSubscription" className="form-control" onChange={handleOnSubscriptionChange}>
                        <option value={0}>Select Subscription</option>
                        {props.packages &&
                        props.packages.map((subscription) => {
                          return (
                            <option
                              value={subscription.id}
                              id={subscription.id}
                              key={subscription.id}
                            >
                              {subscription.title} - ${subscription.amount} -{" "}
                              {subscription.frequency}
                            </option>
                          );
                        })}
                        {/* <option value={3}>Single User - $4.99/month</option>
                        <option value={7}>Single User - $49.99/year</option> */}
                    </select>
                </div>
            </div>
        </div>
        <div className="clearfix" />
        {showPaypalButton && (
            
                        <PaypalExpressBtn
                          env={process.env.REACT_APP_PAYPAL_ENV}
                          client={client}
                          currency={"USD"}
                          total={1}
                          style={{
                            size: "medium",
                            color: "gold",
                            shape: "pill",
                            label: "pay",
                          }}
                          onError={handlePaypalOnError}
                          onSuccess={handlePaypalOnSuccess}
                          onCancel={handlePaypalOnCancel}
                        />
                      )}
    </div>
    );
}

export default Payment;