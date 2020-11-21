import React from 'react';

const FieldError = (props) => {
    return (
        <small id="passwordHelp" className={props.type ? props.type : 'text-danger'}>
            {props.message}
        </small>
    );
};

export default FieldError;