import React from 'react';

const PaymentCancel  = () => {
    return (
        <div className="modal-body modal_inner_padding signup_modal_inner_section">
            <div className="container">
                <div className="row">
                    <h3>Payment Cancelled! </h3>
                    <p className="text-danger">Thank you for signing up with CertStation. Please check your email for account activation instructions. In case you do not receive an email make sure to check your spam folder.</p>
                </div>
            </div>
        </div>
    );
}

export default PaymentCancel;