import React, {Component, useState} from 'react';
import {Modal} from "react-bootstrap";

class  AdvertismentPopup  extends Component {

    onMarkerClick = (props, marker, e) => {

        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
        });

        if(this.state.activeMapType === 'route'){
            this.setState({
                routePanelIsShow: true
            })
        }

        if(this.state.activeMapType === 'botnet'){
            this.setState({
                botnetSuspectedIpsPanel: true,
            })
        }

        if(this.state.activeMapType === 'dns'){
            this.setState({
                dnsMapPanel: true,
            })
        }



    }

    // state = {
    //     second: 7
    // }
    //
    // componentDidMount() {
    //
    //
    //     this.interval = setInterval(() => {
    //         if(this.state.second > 0){
    //             this.setState(prevState => ({
    //                 second: prevState.second - 1
    //             }));
    //         }
    //     }, 1000);
    //
    //
    // }
    //
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

render() {


    return (
        <Modal
            size={'small'}
            show={this.props.isShow}
             backdrop={'static'}
        >
            <Modal.Body className='comon_modal_content' >
                {this.props.container}
            </Modal.Body>
        </Modal>
    );
}
};

export default AdvertismentPopup;

