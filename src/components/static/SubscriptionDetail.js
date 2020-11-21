import React from 'react';

const SubscriptionDetail = () => {
    return (
        <div className="modal-body modal_inner_padding subscription_modal_inner_section">
        <div className="container">
        <div className="row">
            <p><strong>Free User :</strong><br/>
                CERTStation grants you a personal, non-exclusive, non-transferable, limited license to use internally for your Personal Use or Evaluation. “Personal Use” requires that you use the Product on your personal Host Computer that no more than one client connect to that Host Computer at a time. “Evaluation” means testing the Product for a reasonable period (that is, normally for a few weeks); after expiry of that term, you are no longer permitted to evaluate the Product. Advertisements will be played on a Free User version.<br/><br/>
                <strong>Premium User :</strong><br/>
                This license allows the enterprise user to use the ad-free version of CERTStation security dashboard on multiple computers in an enterprise environment. It typically allows the limited use (based on subscription) of the dashboard in non-shared displays. A single Enterprise License is permissible for a single user identity. Using the issue user name / password in a shared manner is a violation of the license agreement. Enterprise User License is a single user license.<br/><br/>
            </p>
        </div>
    </div>
    </div>
    );
}

export default SubscriptionDetail;