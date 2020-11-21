import React, { Component } from 'react';
import UserSettingList from '../../components/Widgets/components/UserSetting/UserSettingList';
import axiosClient from '../../shared/axiosClient';
import { Animated } from 'react-animated-css';
import Loader from '../../components/common/Loader';
import PopupHOC from '../../hoc/PopupHOC';
import { getUserId } from '../Auth/Auth';
import PatchDetail from '../../components/Patch/components/PatchDetail';
import MalwareTypeModalContent from '../../components/Graphs/components/MalwareTypeModalContent';
import VulnerabilityDetail from "../../components/Vulnerabilities/components/VulnerabilityDetail";

class UserSetting extends Component {

    state = {
        listData: [
            {
                security_news: [],
                malware: [],
                patch: [],
                vulnerabilities: []
            }
        ],
        display: 'none',
        isWidgetDisplay: true,
        isLoading: false,
        patchDetail: "looks cool"
    }

    onClickUserSetting = async () => {
        const { isWidgetDisplay, display } = this.state;


        if (isWidgetDisplay) {
            this.setState({
                display: 'block',
                isLoading: true
            }, () => {
                axiosClient.userSetting.list({
                    user_id: getUserId()
                }).then(
                    response => {
                        console.log("user settings");
                        console.log(response);
                        if (response.data.hasOwnProperty('results')) {
                            this.setState({
                                listData: response.data.results
                            })
                        }

                        this.setState({
                            isLoading: false
                        });

                    }
                );
            });
        } else {
            setTimeout(() => {
                this.setState({
                    display: 'none'
                });
            }, 500)

        }

        this.setState({
            isWidgetDisplay: !isWidgetDisplay
        });


    }

    componentDidMount() {
        // axiosClient.userSetting.list().then(
        //     response => {
        //         console.log("users setting");
        //         console.log(response);
        //         this.setState({
        //             listData: response.data.results
        //         })
        //     }
        // );
    }

    handleOnClickSecurityNews = (security_news) => {
        // console.log(security_news);
        window.open(security_news.link);
    }

    handleOnClickVulnerbility = (vulnerbity) => {

        axiosClient.vulnerabilities.getById(vulnerbity.id).then(response => {
            this.props.handleOnClickModal(<VulnerabilityDetail detail={response.data} />);
        });

    }

    handleOnClickPatch = (patch) => {

        axiosClient.patches.getById(patch.id)
            .then(response => {
                this.props.handleOnClickModal(<PatchDetail detail={response.data} />);
            });
    }


    handleOnClickMalware = (malware) => {
        axiosClient.malwares.getById(malware.id)
            .then(response => {
                this.props.handleOnClickModal(<MalwareTypeModalContent detail={response.data} />, 'xl');
            });
    }



    render() {
        const { display, isLoading } = this.state;
        return (
            <React.Fragment>
                <div className="show_hide" style={{ display: display }} />
                <div className="sideNavi1">

                    {/* sidenavi menu //*/}
                    <div className="comon_side-navi-item item11 slideDiv" id="side_navi_show1"><div onClick={this.onClickUserSetting}><img src="images/settings_white.png" alt="UserSetting" /> User Setting</div></div>
                    {/* sidenavi data //*/}
                    <Animated className="side-navi-data" animationIn="slideInRight" animationOut="slideOutRight" isVisible={this.state.isWidgetShow} style={{ display: display }} >
                        {/* <div className="side-navi-data1" style={{display: display}}> */}
                        <div className="side-navi-tab1 comon-side-navi-tab" style={{ display: display }}>
                            <div className="col-md-12 data_dna_inner_table">
                                {isLoading ? <Loader /> : <UserSettingList
                                    onClickSecurityNews={this.handleOnClickSecurityNews}
                                    onClickVulnerbility={this.handleOnClickVulnerbility}
                                    onClickPatch={this.handleOnClickPatch}
                                    onClickMalware={this.handleOnClickMalware}
                                    listData={this.state.listData} />}
                            </div>

                        </div>
                        {/* </div> */}
                    </Animated>
                </div>
            </React.Fragment>
            // <UserSettingList listData={this.state.listData} />
        );
    }
}

export default PopupHOC(UserSetting);