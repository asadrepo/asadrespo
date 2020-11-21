import React, {Component} from 'react';
import SecurityNews from "../../components/SecurityNews/SecurityNews";
import Vulnerabilities from "../../components/Vulnerabilities/Vulnerabilities";
import RiskRating from "../../components/RiskRating/RiskRating";
import Patch from "../../components/Patch/Patch";
import TopExploits from "../../components/TopExploits/TopExploits";
import Graphs from "../../components/Graphs/Graphs";
import Data2Dna from '../Widgets/Data2Dna';
import UserSetting from '../Widgets/UserSetting';
import AdvertisementDetail from "../../components/Advertisement/AdvertisementDetail";
import AdvertisementPopup from "../../components/common/AdvertisementPopup";
import HeartBeatScanner from '../Widgets/HeartBeatScanner';
import WebDefacement from '../Widgets/WebDefacement';
import {isLoginFirstTime} from "../Auth/Auth";
import PopupHOC from "../../hoc/PopupHOC";
import FirstTimeLogin from "../../components/static/FirstTimeLogin";


class SlideOne extends Component {

    state = {
        isModelshow: false,
        timer: 10,
        adContainer: null,

    }

    componentDidMount() {
        // if(isLoginFirstTime()){
        //     this.props.handleOnClickModal(<FirstTimeLogin />);
        // }
    }


    componentDidUpdate(prevProps, prevState) {

        if (this.props.ad !== prevProps.ad && this.props.activeSlider === 0) {
            // this.setState({
            //     isModelshow: true,
            //     adContainer: <AdvertisementDetail image={this.props.ad.image} timer={parseInt(this.props.ad.timer)}
            //                                   onClosePop={() => this.setState({isModelshow: false})}
            //     />
            // });
        }

    }


    render() {
        return (

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-9 left_side_section">
                            <div className="row">
                               <SecurityNews />
                                <Vulnerabilities />
                                <div className="col-md-12">
                                    <div className="row">
                                        <RiskRating />
                                        <Patch />
                                        <TopExploits />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <Graphs />

                        </div>
                        
                    </div>

                    <AdvertisementPopup isShow={this.state.isModelshow}

                       container={this.state.adContainer}
                       timer={this.props.ad.timer}
                />
                    
                      <Data2Dna />
                      <UserSetting />
                      <HeartBeatScanner />
                      <WebDefacement />
                </div>

        );
    }
}

export default  PopupHOC(SlideOne);