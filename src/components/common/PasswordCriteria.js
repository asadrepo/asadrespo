import React from 'react';

const PasswordCriteria = () => {
    return (
        <div className="col-md-1 col-sm-1 col-xs-1">
        <div className="tooltip tooltip_icon">?
          <span className="tooltiptext">
            The password must contain:
            <ul>
              <li>At least 8 characters.</li>
              <li>1 upper case letter (A-Z).</li>
              <li>1 lower case letter (a-z).</li>
              <li>1 numeric character (1-9).</li>
              <li>1 special character (!#^&amp;*).</li>
            </ul>
          </span>
        </div>
      </div>
    );
}

export default PasswordCriteria;