import React, {Component} from 'react';
import axios from "axios";
import Loader from "../common/Loader";
import ReactHtmlParser from 'react-html-parser';
import Popup from "../common/Popup";
import NewsDetail from "../SecurityNews/components/NewsDetail";
import List from "./components/List";
import PatchDetail from "./components/PatchDetail";
import PopupHOC from "../../hoc/PopupHOC";
import VulnerabilityDetail from "../Vulnerabilities/components/VulnerabilityDetail";
import axiosClient from '../../shared/axiosClient';

class Patch extends Component {
    state = {
        patches: [],
        isLoading: false,
        // isModelshow: false,
        // patchDetail: ""
    }
    async getPatches() {
        return await axios.get(process.env.REACT_APP_API_URL+'patch/', {
            params: {
                limit: 3,
            },
            headers: {
                //  Authorization:'Token 977746ca9e1fe6471aeaf7e8c708cb46226f38a1'
            }
        });
    }

    componentDidMount() {
        this.setState({isLoading: true});
        axiosClient.patches.list({limit: 3}).then(
            response => {
                this.setState({
                         patches: response.data.results
                     });
                this.setState({isLoading: false});
            }
        );
        // this.getPatches().then(response => {
        //     this.setState({
        //         patches: response.data.results
        //     });
        //     this.setState({isLoading: false});
        // });
    }

    handleOnClickDetail = (patch) => {
        
        this.props.handleOnClickModal(<PatchDetail detail={patch}/>);
        // this.setState({
        //     isModelshow: true,
        //     patchDetail: <Detail detail={patch}/>
        // })

    }



    render() {
        return (
            <div className="col-md-5 col-sm-12 patch_section">
                <div className="comon_bg_style patch_inner">
                    <div id="patch-inner-bottom-pdng">
                    <h2>Patch</h2>
                    {this.state.isLoading ?
                        <Loader /> :
                        <List
                            patches={this.state.patches}
                            onClickDetail={this.handleOnClickDetail}
                        />}
                    </div>
                </div>
                {/*<Popup*/}
                {/*    isShow={this.state.isModelshow}*/}
                {/*    onClosePop={() => this.setState({isModelshow: false})}*/}
                {/*    container={this.state.patchDetail}*/}
                {/*/>*/}
            </div>
        );
    }
}

export default PopupHOC(Patch);