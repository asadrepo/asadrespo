import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const AlertMessage = (props) => {


    console.log("in alertmenssage");
    console.log(props.message);
    // console.log(props.message);
    const object_size = Object.keys(props.message).length;
    console.log(object_size);
    // Object.entries(props.message).map((value) => {
    //     console.log(value[0]);
    //     console.log(value[1]);
    // });
    return (

        <React.Fragment>

            {object_size > 0 && (<div className={`alert alert-${props.type}`} role="alert">
                {Object.entries(props.message).map((value, key) => {
                    return <p key={key}> {ReactHtmlParser(value[1][0])}</p>
                })}
            </div>)}
        </React.Fragment>
    );
};

export default AlertMessage;