import React, {useState} from 'react';
import {Modal} from "react-bootstrap";

const Popup  = (props) => {

    let timer = props.timer ? props.timer : 0;
    let size = props.size ? props.size : 'lg';
    let id = props.id ? props.id : '';
    let contentClass = props.className ? props.className : 'comon_modal_content'
    let i =0 ;

    // setInterval(() => console.log(timer), 1000);

    // React.useEffect(() => {
    

    //     counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    //   }, [counter]);
    
    return (
        <Modal
            size={size}
            show={props.isShow}
            onHide={props.onClosePop}
            backdrop={'static'}
        >
            <Modal.Body className={contentClass} id={id}>
                {(timer < 1 && <button onClick={props.onClosePop} type="button"   className="close float-left comon_modal_close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>)}
                
                {props.container}
                {/*{props.timer}*/}
            </Modal.Body>
        </Modal>
    );
};

export default Popup;

