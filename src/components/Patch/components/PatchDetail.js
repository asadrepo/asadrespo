import React  from 'react';
import ReactHtmlParser from "react-html-parser";

const PatchDetail = (props) => {

    return (
        <div className="modal-body vul_modal_inner_padding">
            <div className="container">
              
                    <p><strong>Title:</strong><br />
                        {props.detail.title}<br /><br />
                        <strong>Description:</strong><br />
                        {ReactHtmlParser(props.detail.description)}
                        <strong>Short Description:</strong><br />
                        {ReactHtmlParser(props.detail.short_description)}
                        <strong>Severity: </strong><span>{props.detail.severity}</span><br /><br />
                        <strong>Patch:</strong><br />
                        {ReactHtmlParser(props.detail.patch)}
                    </p>
               
            </div>
        </div>
    );
};

export default PatchDetail;
