import React, {Component} from 'react';
import TopVulnerbilities from "./components/TopVulnerbilities";
import Malware from "./components/Malware";
import LatestBreaches from "./components/LatestBreaches";
import Popup from "../common/Popup";
import TopVulnerbilitiesDetail from "./components/TopVulnerbilitiesDetail";
import MalwareDetail from "./components/MalwareDetail";
import axios from "axios";
import Loader from "../common/Loader";
import { getToken } from '../../containers/Auth/Auth';
import axiosClient from '../../shared/axiosClient';


class Graphs extends Component {
    state = {
        isTopVulerbilitesModalShow: false,
        isMalwareModalShow:false,
        isLatestBreachesModalShow: false,
        tabContent: "",
        size: 'lg'

    };

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

    handleOnClickMapWidget = () => {
        console.log(this.state.mapWidget);
        this.setState({mapWidget: !this.state.mapWidget});
        console.log(this.state.mapWidget);
        if (!this.state.mapWidget) {
            console.log("in condition");

        }
    }


    async getMalwareTypes(){
        return await axios.get(process.env.REACT_APP_API_URL+'malware/type/', {
            params: {
            },
            headers: {
            }
        });
    }

    async getTopTenVulnerbilitiesFeature() {
        return await axios.get(process.env.REACT_APP_API_URL+'vulnerabilities/featured/', {
            params: {
            },
            headers: {
                Authorization:`Token ${getToken()}`
            }
        });
    }



    handleonClosePop = () => {
        this.setState({isTopVulerbilitesModalShow:false});
    };

    onClickTopVulerbility = () => {

        this.setState({popUpContainer: <Loader/>, size: 'xl'})
        this.setState({isTopVulerbilitesModalShow:true});

        axiosClient.vulnerabilities.topVulnerbilitiesFeature().then(response => {
            this.setState({popUpContainer: <TopVulnerbilitiesDetail features={response.data.results}/>});
        });
        // this.getTopTenVulnerbilitiesFeature().then(response => {
        //     this.setState({popUpContainer: <TopVulnerbilitiesDetail features={response.data.results}/>})
        // });


    };

    handleOnSelectTab = (tabValue) => {
        this.setState({tabContent: tabValue})

    }

    onClickMalware = () => {
        this.setState({isTopVulerbilitesModalShow:true, size: 'lg'});
        this.setState({popUpContainer: <MalwareDetail />});

    };

    render() {
        return (
            <div className="row">
                <div className="col-md-12 graphs_section">
                    <TopVulnerbilities  onClickTopVulerbility={this.onClickTopVulerbility} />
                    <Malware onClickMalware={this.onClickMalware} />
                    <LatestBreaches />

                </div>
                <Popup isShow={this.state.isTopVulerbilitesModalShow}
                       onClosePop={this.handleonClosePop}
                       container={this.state.popUpContainer}
                       size={this.state.size}
                />
            </div>
        );
    }
}

export default Graphs;