import React, { Component } from 'react';
import Loader from "../common/Loader";
import VulnerabilityDetail from "./components/VulnerabilityDetail";
import List from "./components/List";
import Workaround from "./components/Workaround";
import { Scrollbars } from "react-custom-scrollbars";
import VulnerbilitiesService from "../../shared/vulnerbilities-service";
import PopupHOC from "../../hoc/PopupHOC";
import axiosClient from '../../shared/axiosClient';

class Vulnerabilities extends Component {

    constructor(props) {
        super(props);
        this.vulnerbilitiesService = new VulnerbilitiesService();
    }
    state = {
        vulnerabilities: [],
        isLoading: false,
        // isModelShow: false,
        // popUpContailer: null,
        limit: 25,
        offset: 0,
        total: 0, 
        hasErrorInfo: null
    };

    componentDidMount() {
        this.setState({
            isLoading: true
        });

        axiosClient.vulnerabilities.list({
            offset: this.state.offset,
            limit: this.state.limit
        }).then(response => {
            this.setState({ vulnerabilities: response.data.results });
            this.setState({
                isLoading: false,
                total: response.data.count
            });
        }).catch(error => {
            console.log("Vulnerbilites in catch");
                this.setState({
                    hasErrorInfo: error,
                });
        });

    }

    handlOnClickDetail = (value) => {

        this.props.handleOnClickModal(<VulnerabilityDetail detail={value} />);
        // this.setState({isModelShow:true});
        // this.setState({popUpContailer:<VulnerabilityDetail detail={value}/>})
    };

    handelOnClickWorkaround = (value) => {
        this.props.handleOnClickModal(<Workaround detail={value} title={'Work Around'} />);
        // this.setState({isModelShow:true});
        // this.setState({popUpContailer:<Workaround detail={value} title={'Work Around'}/>})
    };

    handleOnClickProofOfConcept = (value) => {
        this.props.handleOnClickModal(<Workaround detail={value} title={'PROOF OF CONCEPT'} />);
        /* this.setState({isModelShow:true});
         this.setState({popUpContailer:<Workaround detail={value} title={'PROOF OF CONCEPT'}/>})*/
    }

    handleOnScrollDownVulnerbilities = (event) => {

        let element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            let lists = this.state.vulnerabilities;
            if (lists.length >= this.state.total)
                return;

            const offset = this.state.offset + this.state.limit;
            this.setState({
                isLoading: true
            });

            axiosClient.vulnerabilities.list({
                offset: offset,
                limit: this.state.limit
            }).then(
                response => {
                    response.data.results.map((res) => {
                        lists.push(res);
                    });
                    this.setState({ vulnerabilities: lists });
                    this.setState({
                        isLoading: false,
                        total: response.data.count
                    });
                }
            ).catch(error => {
                console.log("Vulnerbilites in catch");
                this.setState({
                    hasErrorInfo: error,
                });
            });
            // this.vulnerbilitiesService.getVulnerbilitiesList(offset, this.state.limit).then(
            //     response => {
            //         response.data.results.map((res) => {
            //             lists.push(res);
            //         });
            //         this.setState({vulnerabilities: lists});
            //         this.setState({
            //             isLoading: false,
            //             total: response.data.count
            //         });
            //     }
            // )
            this.setState({ offset: offset });
            return;


        }
    }

    render() {

        // if (this.state.hasErrorInfo) {
        //     throw new Error(this.state.hasErrorInfo);
        // }
        return (

            <div className="col-md-8 vulnerability_section">
                {/*<Popup isShow={this.state.isModelShow}*/}
                {/*       onClosePop={() => this.setState({isModelShow: false})}*/}
                {/*       container={this.state.popUpContailer}*/}
                {/*/>*/}

                <h2>Vulnerability </h2>
                {this.state.isLoading ? <Loader /> : null}
                <Scrollbars style={{ height: 560 }} onScroll={this.handleOnScrollDownVulnerbilities}>
                    <List onClickDetail={this.handlOnClickDetail}
                        onClickWorkaroud={this.handelOnClickWorkaround}
                        onClickProofOfConcept={this.handleOnClickProofOfConcept}
                        vulnerabilities={this.state.vulnerabilities}
                    />
                </Scrollbars>

            </div>
        );
    }
}

export default PopupHOC(Vulnerabilities);