import React, {Component} from 'react';
import AnyChart from 'anychart-react'
import {topVulnerbilitiesChartConfigue} from "../../../helpers";
import axios from "axios";
import {getToken} from "../../../containers/Auth/Auth";
import Loader from "../../common/Loader";
import axiosClient from '../../../shared/axiosClient';


// const complexSettings = ;
class TopVulnerbilities extends Component {
    state = {
        chartConfiguration:topVulnerbilitiesChartConfigue,
    }

    async getTopTenVulerbilities() {
        return await axios.get(process.env.REACT_APP_API_URL+'vulnerabilities/top_ten_vul_graph/', {
            params: {

            },
            headers: {
                Authorization:`Token ${getToken()}`
               /* Authorization:'Token 977746ca9e1fe6471aeaf7e8c708cb46226f38a1',
                ContentType: 'application/json',*/
            }
        });
    }

    componentDidMount() {
        axiosClient.vulnerabilities.topVulnerbilities().then(response => {
            let chartData = [];
            response.data.results.map(v => {
                chartData.push({
                    x: v.cve_id, value:v.value
                });
            });

            this.setState({chartConfiguration:{
                    data: chartData
            }});
        });
        // this.getTopTenVulerbilities().then(response => {
        //     let chartData = [];
        //     response.data.results.map(v => {
        //         chartData.push({
        //             x: v.cve_id, value:v.value
        //         });
        //     });

        //     this.setState({chartConfiguration:{
        //             data: chartData
        //     }});
        //   //
        // });

    }

    render() {
        return (
            <div className="top_vulnerabilities">
                <h3>Top 10 Vulnerabilities</h3>
                <div className="graph-cont" style={{position:'relative'}}>
                        <a onClick={this.props.onClickTopVulerbility} ><img style={{width:'40px', marginTop:'208px', cursor:'pointer'}} src="images/donut_chart_map.png" alt="chartsMap" className="dcm_img" /></a>
                    </div>
                    <AnyChart
                    {...this.state.chartConfiguration}
                    />
            </div>
        );
    }
}

export default TopVulnerbilities;