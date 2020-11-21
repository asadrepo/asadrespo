import React from 'react';
import ReactHtmlParser from "react-html-parser";

const Workaround = (props) => {
    return (
        <div className="modal-body vul_modal_inner_padding">
            <div className="container">
                <h4>{props.title}</h4>
                <hr />
                {ReactHtmlParser(props.detail)}
                <div className="clearfix" />
            </div>
        </div>
    );
};

export default Workaround;