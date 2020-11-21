import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import {Animated} from "react-animated-css";
import BotnetSuspectedIps from "../../components/Maps/BotnetSuspectedIps";
import {stylesMap} from "../../helpers/mapStyles";
import axiosClient from "../../shared/axiosClient";
import RoutesPanel from "../../components/Maps/RoutesPanel";
import DnsMapPanel from "../../components/Maps/DnsMapPanel";
import AdvertisementPopup from "../../components/common/AdvertisementPopup";
import AdvertisementDetail from "../../components/Advertisement/AdvertisementDetail";



class SlideFour extends Component {
    state = {
        markers: [

        ],
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        mapWidget: false,
        botnetSuspectedIpsPanel: false,
        activeMapType: null,
        routePanelIsShow: false,
        dnsMapPanel: false,
        activeSlider: null,
        isModelshow: false,
        timer: 10,
        adContainer: null,
    }

    componentDidMount() {
        this.setState({
            timer: 5
        });
    
    }


  
     

    // }
    componentDidUpdate(prevProps, prevState) {
    
        if (this.props.ad !== prevProps.ad && this.props.activeSlider === 2) {
            this.setState({
                activeSlider: 1
            });

           if(Object.keys(this.props.ad).length){
               
            this.setState({
                isModelshow: true,
                adContainer: <AdvertisementDetail image={this.props.ad.image} timer={parseInt(this.props.ad.timer)}
                    onClosePop={() => this.setState({ isModelshow: false })}
                />
            });
           }
        }


    }

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

    onClickThreatMap = () => {

        this.setState({
            markers: [
                {
                    title: 'Canada',
                    lat: 60.286515,
                    lng: -98.068209
                }
            ],
            botnetSuspectedIpsPanel: false
        });
    }

    onClickBotnetMap = () => {
        this.setState({
            showingInfoWindow: false,
            botnetSuspectedIpsPanel: false,
            routePanelIsShow:false

        });

        axiosClient.maps.botNetMap().then(response => {
          this.setState({
              markers: response.results,
              activeMapType: 'botnet'
          })
        });
    }

    onClickRouterMap = () => {
        this.setState({
            showingInfoWindow: false,
            botnetSuspectedIpsPanel: false,
            routePanelIsShow:false

        });

        axiosClient.maps.routeMap() .then(response => {
            this.setState({
                markers: response.results,
                activeMapType: 'route'
            });
        });

    }

    onClickDnsMap = () => {
        this.setState({
            showingInfoWindow: false,
            botnetSuspectedIpsPanel: false,
            routePanelIsShow:false
        });

        axiosClient.maps.dnsMap().then(response => {
            this.setState({
                markers: response.results,
                activeMapType: 'dns'
            })
        });
    }


    onMapClicked = () => {
        this.setState({
            showingInfoWindow: false,
            botnetSuspectedIpsPanel: false,
            routePanelIsShow:false

        })
    }

    render() {
        var image = {
            url: 'images/pointer.png',
        };

        return (
            <React.Fragment>
                <Map
                    style={{
                        minHeight: "835px"
                    }}
                    initialCenter={{
                        lat: 41.40338,
                        lng: 2.17403
                    }}
                    draggable={false}
                    onClick={this.onMapClicked}
                    zoom={2}
                    disableDefaultUI={false}
                    mapTypeControl={false}
                    streetViewControl={false}
                    google={this.props.google}
                    styles={stylesMap}
                >
                    {this.state.markers.map((location, index) => {
                        return (<Marker key={index} title={location.title}
                                        id={location.id}
                                        onClick={this.onMarkerClick}

                                        icon={image}
                                        position={{lat: location.lat, lng: location.lng}}
                        />);
                    })}

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div id="map_point_content" className="botnet_ips_width">
                            <div id="siteNotice"></div>
                            <div id="bodyContent">
                                <div id="botnet_info" className="col-12 dns_map_style">
                                    <div className="row">
                                        <div className="col-2"><label htmlFor="Rank">Rank</label><p>2</p></div>
                                        <div className="col-4"><label htmlFor="Country">Country</label><p>USA</p>
                                        </div>
                                        <div className="col-6"><label htmlFor="SuspectedIps">Suspected Botnet
                                            IPs</label><p>1703</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </InfoWindow>
                </Map>


                <div id="map_menu" className="sideNavi2" style={{marginTop: '100px'}}>

                    <div className="side-navi-item2-modify item11 slideDiv" id="side_navi_show2">
                        <div onClick={this.handleOnClickMapWidget}> Maps</div>
                    </div>

                    <Animated className="side-navi-data2" animationIn="slideInLeft" animationOut="slideOutLeft"
                              isVisible={this.state.mapWidget}>

                        <div className="side-navi-item2 item11 slideDiv" id="side_navi_show2">
                            <div onClick={this.handleOnClickMapWidget}> Maps</div>
                        </div>
                        <div className="side-navi-tab1 comon-side-navi-tab" style={{display: 'block'}}>
                            <div className="col-md-12 data_dna_inner_table map_list">
                                <div className="row">
                                    <ul>
                                        {/*<li><a onClick={this.onClickThreatMap} style={{cursor: 'pointer'}}>Threat Map</a></li>*/}
                                        <li><a onClick={this.onClickRouterMap} style={{cursor: 'pointer'}}>Router Map</a></li>
                                        <li><a onClick={this.onClickDnsMap} style={{cursor: 'pointer'}}>DNS Map</a></li>
                                        {/*<li><a onClick={this.onClickPhysicalMap} style={{cursor: 'pointer'}}>Physical Threat Map</a></li>*/}
                                        <li><a onClick={this.onClickBotnetMap} style={{cursor: 'pointer'}}>BotNet Map</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                    </Animated>
                </div>
                {this.state.activeMapType === 'botnet' ? <BotnetSuspectedIps
                    isShowList={this.state.botnetSuspectedIpsPanel}
                    onClick={() => this.setState({botnetSuspectedIpsPanel: !this.state.botnetSuspectedIpsPanel})}
                /> : null}

                {this.state.activeMapType === 'route' ? <RoutesPanel
                    isShowList={this.state.routePanelIsShow}
                    onClick={() => this.setState({routePanelIsShow: !this.state.routePanelIsShow})}
                /> : null}

                <AdvertisementPopup isShow={this.state.isModelshow}
                                    container={this.state.adContainer}
                />

                {/*{this.state.activeMapType === 'dns' ? <DnsMapPanel isShowList={}/> : null}*/}
                {/*{this.state.activeMapType == 'route' ? <RoutesPanel isShowList={this.state.botnetSuspectedIpsPanel} /> : null}*/}


            </React.Fragment>

        );
    }
}

// export default SlideFour;
//
// import React, {Component} from 'react';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
// const mapStyles = {
//     width: '50%',
//     height: '50%'
// };
// className SlideFour extends Component {
//
//     render() {
//         console.log(this.props.google);
//         return (
//             <Map
//                 google={this.props.google}
//
//                 initialCenter={{
//                     lat: -1.2884,
//                     lng: 36.8233
//                 }}
//             />
//         );
//     }
// }
export default GoogleApiWrapper(
    (props) => ({
            apiKey: 'AIzaSyCDLAi1Pv1jf6Nc8stlVqh3gXFnxx1HtpI'
        }
    ))(SlideFour)
