import React, {Component} from 'react';
import AnyChart from "anychart-react";
import axios from "axios";
import {latestChartBreachesConfigure} from "../../../helpers";
import PopupHOC from '../../../hoc/PopupHOC';
import LatestBreachesBubble from './LatestBreachesBubble';
import axiosClient from '../../../shared/axiosClient';



class LatestBreaches extends Component {

    state = {
        chartConfiguration:latestChartBreachesConfigure,
        popupData: [],
        yearArray: []
    }


    async getLatestBreachGrap(){
        return await axios.get(process.env.REACT_APP_API_URL+'latest_breach/graph/', {
            params: {

            }
        });
    }
    componentDidMount() {
        this.getLatestBreachGrap().then(response => {
            let chartData = [];
            response.data.results.map(v => {
                chartData.push({
                    x: v.entity, value:v.percent
                });
            });

            this.setState({
                chartConfiguration:{
                    data: chartData
                }}
            )
        });

        axiosClient.latestBreaches.popup_data()
        .then(response => {

            const dataSet = response.data.results;
            var dataRender = [];
            var yearArray = [];
          

            dataSet.map((result, index) => {
               // console.log("latest breach map");
                //console.log(result);

                for (let [key, value] of Object.entries(result)) {

                 yearArray.push(key);
                  dataRender.push({
                        "name": key,
                        "children": value
                    });
                  }
                  
            });
            this.setState({
                yearArray: yearArray 
            });
            var dataSetResult = {
                "name": "latest-breach",
                "children": dataRender
            };

            this.setState({
                popupData: dataSetResult
            })
            // console.log("latest breach map");
            // console.log(dataSetResult);

            // dataSet.forEach(function(child){

            //     console.log("latest breach foreach");
            //     console.log(child);
            // });

          //  console.log(dataSet);
            // this.setState({
            //     popupData: response.data.results 
            // });
        });

        // const dataResult = 

    }

    handleOnClick = () => {



        const dataResult =         {
            "name": "latest-breach",
            "children" : [

        
                {
            "name": "2012",
            "children": [
                {
                    "entity": "Facebook",
                    "lost_records": "29,000,000",
                    "story": "Oct 2018. Malicious third-party scrapers collected profile information from many Facebook users. ",
                    "year": 2012,
                    "source_link": "https://www.businessinsider.com.au/facebook-thinks-spammers-responsible-hack-stole-info-from-29-million-users-2018-10?r=US&IR=T",
                    "interesting_story" : 0
                },
            ],
            
        },
        {
            "name":"2019",
            "children": [

                {
                    "entity": "People Data Labs",
                    "lost_records": "3,000,000,000",
                    "story": "3bn records were left unsecured, affecting 1.2bn unique users.",
                    "year": 2019,
                    "source_link": "https://www.dataviper.io/blog/2019/pdl-data-exposure-billion-people/",
                    "interesting_story" : 1
                },
                {
                    "entity": "OxyData",
                    "lost_records": "380,000,000",
                    "story": "Analysis of the \"Oxy\" database revealed an almost complete scrape of LinkedIN data, including recruiter information.",
                    "year": 2019,
                    "source_link": "https://www.dataviper.io/blog/2019/pdl-data-exposure-billion-people/",
                    "interesting_story" : 0
                }            
            ]
        }

        
        ]
        };
        this.props.handleOnClickModal(<LatestBreachesBubble dataResult={dataResult} dataYearArray={this.state.yearArray} />, 'xl');
    }

    render() {
        return (
            <div className="breaches">
                <h3>Latest Breaches</h3>
                <div className="graph-cont" style={{position:'relative'}}>
                    <a onClick={this.handleOnClick} ><img style={{width:'40px', marginTop:'208px', cursor:'pointer'}} src="images/donut_chart_map.png" alt="chartsMap" className="dcm_img" /></a>
                </div>
                <AnyChart
                    {...this.state.chartConfiguration}
                />
                {/*<div className="graph-cont" id="container2"><a  data-toggle="modal" data-target="#exampleModalCenter3"><img src="images/donut_chart_map.png" alt="chartsMap" className="dcm_img" /></a></div>*/}
            </div>
        );
    }
}


export default PopupHOC(LatestBreaches);