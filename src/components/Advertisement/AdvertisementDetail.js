import React, {Component, useEffect, useState} from "react";
import {Modal} from "react-bootstrap";

class AdvertisementDetail extends Component {

    state = {
        second: this.props.timer
    }

    componentDidMount() {


            this.interval = setInterval(() => {
                if(this.state.second > 0){
                    this.setState(prevState => ({
                        second: prevState.second - 1
                    }));
                }
            }, 1000);


    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    handleOnTabChange = (type) => {
        if(type==='latest-news'){
            this.setState({popUpTitle: 'Latest News'});
        } else if(type === 'all-news') {
            this.setState({popUpTitle: 'All News'});
        } else if(type === 'blog-news'){
            this.setState({popUpTitle: 'Blog News'});
        }
    };

    // const [second, setSecond] = useState(props.timer);
    // var interv;
    // useEffect(() => {
    //
    //      interv = setInterval(() => {
    //         setSecond(second - 1);
    //     }, 1000);
    //     // setTimeout(() => {
    //     //     console.log("hsdfsdf");
    //     // }, 1000)
    //
    //     // var interv = setInterval(
    //     //      function() {
    //     //          setSecond(second - 1);
    //     //      },
    //     //      1000
    //     //  );
    //     // //
    //     //  if(second < 2){
    //     //      clearInterval(interv);
    //     //  }
    // });
    //
    // useEffect(() => {
    //     clearInterval(interv);
    // }, [])
    render() {


        return (
            <React.Fragment>
            {(this.state.second < 1) ? <button onClick={this.props.onClosePop} type="button" className="close float-left comon_modal_close"
                                               data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>: null}
            <div className="modal-body vul_modal_inner_padding advertisement_popup">
                <div className="container">
                    <div className="row">
                        <h1>{this.props.title}</h1>
                           {/* <strong>Are you using this interface in an Enterprise Environment?</strong>
                        <div className="clearfix"/>
                        <strong className="license_policy">You are not in compliance with our License Policy.</strong>
                        <div className="clearfix"/>
                        <strong className="upgrade">UPGRADE NOW</strong>
                        <small className="upgrade_small text-center"><a href="profile.html"
                                                                        className="comon_green_color">Click here to
                            upgrade</a></small>
                        <div className="clearfix"/>
                        <div className="logo_div">
                            <a href="https://www.certstation.com/" className="link_site">certstation.com</a>
                            <img src="images/logo.png" alt="CertStation Logo" className="ad_logo"/>
                        </div>*/}
                        <img src={this.props.image} alt="Ad Image" className="advertisement"/>
                        <div className="clearfix"/>
                        <span className="skip_ad">You can close this Ad in {this.state.second} second</span>
                    </div>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default AdvertisementDetail;