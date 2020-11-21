import React from 'react';
import ReactHtmlParser from "react-html-parser";

const DetailPopup = ({security_tool}) => {
    return (
        <div className="modal-body modal_inner_padding">
        <div className="container">
          <div className="row">
              <br />
            <h4>Tool Details</h4>
            <hr />
            <p><strong>Title : </strong>{security_tool.title}<br /><br />
              <strong>Version : </strong>{security_tool.version}<br /><br />
              <strong>Description:</strong><br />
              {ReactHtmlParser(security_tool.description)}<br /><br />
              {/*<strong>Severity : </strong><img src="images/severity.png" alt="Severity"><br/><br/>*/}
              <strong>Link : </strong><a href={security_tool.link} target="_blank"><span className="comon_green_color">{security_tool.link}</span></a></p>
          </div>
        </div>
      </div>
    );
}

export default DetailPopup;