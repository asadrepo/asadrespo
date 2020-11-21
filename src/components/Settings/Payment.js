import React, { useState } from 'react';
import PaypalExpressBtn from "react-paypal-express-checkout";
import WithPaypalPayment from '../../hoc/WithPaypalPayment';

const Payment = (props) => {

    const displayValue = props.displayValue ? 'block' : 'none';

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
                      onChange={props.onChangeIsPremium}
                      
                    />
                    <span>Free (30 days trial)</span>
                </div>
                <div className="col-12 col-md-6 col-sm-12 col-xs-12">
                <input
                      type="radio"
                      name="is_premium"
                      value={1}
                      className="select_prem"
                      onChange={props.onChangeIsPremium}
                    />
                    <span>Premium</span>
                </div>
            </div>
        </div>
        <div className="clearfix" />
        <div className="form-group" style={{ display: props.isPrimiumShow }}>
            <div className="row">
                <div className="col-12">
                    <select name="package" id="selectSubscription" className="form-control" onChange={props.onSubscriptionChange}>
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
        {props.showPaypalButton && (
            
                        <PaypalExpressBtn
                        
                          client={props.paypalClient}
                          currency={"USD"}
                          total={props.amount}
                          style={{
                            size: "medium",
                            color: "gold",
                            shape: "pill",
                            label: "pay",
                          }}
                          onError={props.onError}
                          onSuccess={props.onSuccess}
                          onCancel={props.onCancel}
                        />
                      )}
    </div>
    );
}


export default WithPaypalPayment(Payment);