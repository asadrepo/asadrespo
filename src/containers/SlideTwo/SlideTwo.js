import React, { Component } from 'react';
import { TravellingAdvisory } from "../../components/TravellingAdvisory";
import { ThreatIntel } from "../../components/ThreatIntel";
import { PortInformation } from "../../components/PortInformation";
import { PwnedCheck } from "../../components/PwnedCheck";
import Agglometer from "../../components/Graphs/components/Agglometer";
import MobileAppSecurityTest from "../../components/SecurityTestSection/MobileAppSecurityTest";
import SslSecurityTest from "../../components/SecurityTestSection/SslSecurityTest";
import WebsiteSecurityTest from "../../components/SecurityTestSection/WebsiteSecurityTest";
import PhishingSecurityTest from "../../components/SecurityTestSection/PhishingSecurityTest";
import { SecurityTools } from "../../components/SecurityTools";
import { SecurityTips } from "../../components/SecurityTips";
import OwlCarousel from "react-owl-carousel2";
import AdvertisementDetail from "../../components/Advertisement/AdvertisementDetail";
import AdvertisementPopup from "../../components/common/AdvertisementPopup";
import ErrorBoundary from '../../components/common/ErrorBoundary';

class SlideTwo extends Component {

    state = {
        isModelshow: false,
        timer: 10,
        adContainer: null,

        activeSlider: null

    }


    componentDidUpdate(prevProps, prevState) {
      
        if (this.props.ad !== prevProps.ad && this.props.activeSlider === 1) {

            this.setState({
                activeSlider: 1
            });

           if(Object.keys(this.props.ad).length){
               
            // this.setState({
            //     isModelshow: true,
            //     adContainer: <AdvertisementDetail image={this.props.ad.image} timer={parseInt(this.props.ad.timer)}
            //         onClosePop={() => this.setState({ isModelshow: false })}
            //     />
            // });
           }
           
        }
     

    }
    render() {
        const options = {
            autoplay: false,
            items: 1,
            dotsEach: true,
            dotsData: true,
            dots: true,
            dotClass: 'carousel-indicators',
            dotsClass: 'carousel-indicators-dots',
        };
        const events = {
            onDragged: function (event) { },
            onChanged: function (event) { }
        };


        return (
            <React.Fragment>
                {this.state.activeSlider ? <div className="container-fluid">
                    <div className="row">
                        <div className="col-3 col-md-3 col-sm-6 col-xs-12 left_side_section" id="left-content">
                            <div className="row">
                                <ErrorBoundary>
                                    <SecurityTips />
                                </ErrorBoundary>
                                <TravellingAdvisory />
                            </div>
                        </div>
                        <div className="col-3 col-md-3 col-sm-6 col-xs-12 left_side_section" id="left-content">
                            <div className="row">
                                <ThreatIntel />
                                <PortInformation />
                                <PwnedCheck />
                            </div>
                        </div>
                        <div className="col-6 col-md-6 col-sm-12 col-xs-12 right_side_section" id="right-content">
                            <div className="row">
                                <div className="col-md-12 col-xs-12 agglometer_section">
                                    <div className="agglometer_inner_section clearfix">
                                        <Agglometer />
                                    </div>
                                </div>
                                <div className="clearfix" />
                                <div className="col-7 col-md-7 col-sm-6 mobile_app_security_section" id="mobile-security">
                                    <div className="mobile_app_security_inner_section clearfix">
                                        <section className="lazy slider" data-sizes="50vw">
                                            <OwlCarousel options={options} events={events} >
                                                <div data-dot="<span></span>">
                                                    <MobileAppSecurityTest />
                                                </div>
                                                <div data-dot="<span></span>">
                                                    <SslSecurityTest />
                                                </div>
                                                <div data-dot="<span></span>">
                                                    <WebsiteSecurityTest />
                                                </div>
                                                <div data-dot="<span></span>">
                                                    <PhishingSecurityTest />
                                                </div>
                                            </OwlCarousel>
                                        </section>
                                    </div>
                                </div>
                                <div className="col-5 col-md-5 col-sm-6 security_tools_section" id="security-sec">
                                    <div className="modal fade" id="exampleModalCenter9" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div className="modal-dialog modal-lg main_security_tools" role="document">
                                            <div className="modal-content security_tools_modal comon_modal_content">
                                                <button type="button" className="close float-left comon_modal_close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                                <div className="modal-body modal_inner_padding">
                                                    <div className="container">
                                                        <div className="row">
                                                            <h4>Tool Details </h4>
                                                            <hr />
                                                            <p><strong>Title : </strong>Sqlmap<br /><br />
                                                                <strong>Version : </strong>1.3.10<br /><br />
                                                                <strong>Description:</strong><br />
                                                                Sqlmap is one of the most popular and powerful sql injection automation tool. It is used to detect and exploit database vulnerabilities and provides options for injecting malicious codes into them.<br /><br />
                                                                <strong>Severity : </strong><img src="images/severity.png" alt="Severity" /><br /><br />
                                                                <strong>Link : </strong><a href="https://sourceforge.net/projects/flawfinder" target="_blank"><span className="comon_green_color">https://sourceforge.net/projects/flawfinder</span></a></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <SecurityTools />
                                </div>
                                <AdvertisementPopup isShow={this.state.isModelshow}
                                    container={this.state.adContainer}
                                />
                            </div>
                        </div>
                    </div>
                </div> : null}
            </React.Fragment>


        );
    }
}

export default SlideTwo;