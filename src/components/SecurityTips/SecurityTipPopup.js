import React from 'react';
import ReactHtmlParser from "react-html-parser";

const SecurityTipPopup = ({security_tip}) => {
    return (
        <div className="modal-body thrat_intel_modal_inner_padding">
        <div className="container">
            <h3 className="thrat_intel_green_modal">{security_tip.title}</h3>
            {ReactHtmlParser(security_tip.description)}
        </div>
    </div>
    );
}

export default SecurityTipPopup;