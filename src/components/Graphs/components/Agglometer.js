import React, {Component} from 'react';
import ZingChart from "zingchart-react";
import 'zingchart-react/dist/modules/zingchart-depth.min.js';

class Agglometer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SansInfo: {
                type: "gauge",
                globals: {
                    backgroundColor: 'transparent'
                },
                plotarea:{
                    marginTop:25
                },
                plot:{
                    size:'70%',
                    valueBox: {
                        placement: 'center', //Specify "center", "tip", or "edge".
                        fontColor: '#d1ff00',
                        text:'%v%', //default
                        fontSize:20,
                        paddingTop: 180,
                        backgroundColor: 'transparent'
                    }
                },
                tooltip:{
                    borderRadius:5
                },

                scaleR:{
                    aperture:260,
                    minValue: 0,
                    maxValue:100,
                    step:10,
                    center:{
                        visible:true,
                        size: '10%',
                        borderColor: 'transparent'
                    },
                    tick:{
                        "line-color":"#23293f",
                        "line-style":"solid", //solid, dashed, or dotted
                        "line-width":3,
                        "size":45,
                        "placement":"inner" //outer, inner, or cross
                    },
                    item:{
                        offsetR:-25,
                    },
                    labels:['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%','100%'],
                    ring:{
                        size:45,
                        rules:[
                            {
                                rule:'%v < 10',
                                backgroundColor:'#128937'
                            },
                            {
                                rule:'%v >= 10 && %v <= 20',
                                backgroundColor:'#72ad00'
                            },
                            {
                                rule:'%v >= 20 && %v <= 30',
                                backgroundColor:'#b3b700'
                            },
                            {
                                rule:'%v >= 30 && %v <= 40',
                                backgroundColor:'#fff200'
                            },
                            {
                                rule:'%v >= 40 && %v <= 50',
                                backgroundColor:'#ffce00'
                            },
                            {
                                rule:'%v >= 50 && %v <= 60',
                                backgroundColor:'#ff9d00'
                            },
                            {
                                rule:'%v >= 60 && %v <= 70',
                                backgroundColor:'#ff6d00'
                            },
                            {
                                rule:'%v >= 70 && %v <= 80',
                                backgroundColor:'#ff4800'
                            },
                            {
                                rule:'%v >= 80 && %v <= 90',
                                backgroundColor:'#af0000'
                            },
                            {
                                rule:'%v >= 90 && %v <= 100',
                                backgroundColor:'#870000'
                            }
                        ]
                    }
                },
                series : [
                    {
                        values : [24], // starting value
                        backgroundColor:'gray',
                        indicator:[10,0,0,0,10],
                        animation:{
                            effect:2,
                            method:5,
                            sequence:0,
                            speed: 10000
                        }
                    }
                ]
            },
            Other: {
                type: "gauge",
                globals: {
                    backgroundColor: 'transparent'
                },
                plotarea:{
                    marginTop:25
                },
                tooltip:{
                    borderRadius:3
                },

                scaleR:{
                    aperture:260,
                    minValue: 0,
                    maxValue:100,
                    step:10,
                    center:{
                        visible:true,
                        size: '5%',
                        borderColor: 'transparent'
                    },
                    tick:{
                        "line-color":"#23293f",
                        "line-style":"solid", //solid, dashed, or dotted
                        "line-width":2,
                        "size":20,
                        "placement":"inner" //outer, inner, or cross
                    },
                    item:{
                        offsetR:-17,
                        fontSize: "8"
                    },
                    labels:['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%','100%'],
                    ring:{
                        size:20,
                        rules:[
                            {
                                rule:'%v < 10',
                                backgroundColor:'#128937'
                            },
                            {
                                rule:'%v >= 10 && %v <= 20',
                                backgroundColor:'#72ad00'
                            },
                            {
                                rule:'%v >= 20 && %v <= 30',
                                backgroundColor:'#b3b700'
                            },
                            {
                                rule:'%v >= 30 && %v <= 40',
                                backgroundColor:'#fff200'
                            },
                            {
                                rule:'%v >= 40 && %v <= 50',
                                backgroundColor:'#ffce00'
                            },
                            {
                                rule:'%v >= 50 && %v <= 60',
                                backgroundColor:'#ff9d00'
                            },
                            {
                                rule:'%v >= 60 && %v <= 70',
                                backgroundColor:'#ff6d00'
                            },
                            {
                                rule:'%v >= 70 && %v <= 80',
                                backgroundColor:'#ff4800'
                            },
                            {
                                rule:'%v >= 80 && %v <= 90',
                                backgroundColor:'#af0000'
                            },
                            {
                                rule:'%v >= 90 && %v <= 100',
                                backgroundColor:'#870000'
                            }
                        ]
                    }
                },
                series : [
                    {
                        values : [80], // starting value
                        backgroundColor:'gray',
                        indicator:[5,0,0,0,0],
                        animation:{
                            effect:2,
                            method:5,
                            sequence:0,
                            speed: 10000
                        }
                    }
                ]
            }
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-7 col-xs-12">
                    <h4>Agglometer</h4>
                    <p>Combine all threatcon threat levels and intelligently churns them into a single sumarized threatCON</p>
                    <div className="row meter_height">
                        <div className="col-3 pr-0 pl-2">
                            <ZingChart data={this.state.Other} height="125"/>
                            <p>SANS <br />InfoCon</p>
                        </div>
                        <div className="col-3 pr-0 pl-2">
                            <ZingChart data={this.state.Other} height="125"/>
                            <p>CERTStation</p>
                        </div>
                        <div className="col-3 pr-0 pl-2">
                            <ZingChart data={this.state.Other} height="125"/>
                            <p>AVG</p>
                        </div>
                        <div className="col-3 pr-0 pl-2">
                            <ZingChart data={this.state.Other} height="125"/>
                            <p>Symantec</p>
                        </div>

                        <div className="clearfix" />

                        <div className="col-3 pr-0 pl-2">
                            <ZingChart data={this.state.Other} height="125"/>
                            <p>McAfee</p>
                        </div>
                        <div className="col-3 pr-0 pl-2">
                            <ZingChart data={this.state.Other} height="125"/>
                            <p>PCrisk</p>
                        </div>
                        <div className="col-3 pr-0 pl-2">
                            <ZingChart data={this.state.Other} height="125"/>
                            <p>CISecurity</p>
                        </div>
                        <div className="col-3 pr-0 pl-2">
                            <ZingChart data={this.state.Other} height="125"/>
                            <p>lolo</p>
                        </div>
                    </div>
                </div>
                <div className="col-5 col-xs-12">
                    <ZingChart data={this.state.SansInfo} height="300" />
                </div>
                <div className="clearfix" />
            </div>
        );
    }
}

export default Agglometer;