import React, {Component} from 'react';
import {SlideOne} from "../SlideOne";
import {SlideTwo} from "../SlideTwo";
import {SlideThree} from "../SlideThree";
import {SlideFour} from "../SlideFour";
import {Header} from "../../components/partials/Header";
import {Footer} from "../../components/partials/Footer";
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import {Route, Switch} from 'react-router-dom';
import SearchResult from "../SearchResult/SearchResult";
import {Signup} from "../Signup";
import ZingChart from 'zingchart-react';
import 'zingchart-react/dist/modules/zingchart-depth.min.js';
import Carousel from "react-bootstrap/Carousel";
import { Map, GoogleApiWrapper } from 'google-maps-react';
import ProtectedRoutes from "../Auth/ProtectedRoutes";
import Home from "../Home/Home";
import {AuthGuard} from "../Auth/Auth";
import ForgotPassword from "../Auth/ForgotPassword";
import Logout from "../Auth/Logout";
import { Settings } from '../Settings';
import AccountActivation from '../../components/static/AccountActivation';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {
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
            setIndex: 0
        }
    }

    render() {
        return (

            <div className="back_color">
                
                <Switch>
                    
                    <ProtectedRoutes path="/" exact component={Home} />
                    <ProtectedRoutes exact path="/profile" component={Settings} />

                    <Route exact path="/search" component={SearchResult} />
                    <Route exact path="/login" component={Signup} />
                    <Route exact path="/forgot-password" component={ForgotPassword} />
                    <Route exact path="/logout" component={Logout} />
                   

                </Switch>
               
            </div>
        );
    }
}

export default Layout;


