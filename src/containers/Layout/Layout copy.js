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
import {Profile} from "../Profile";
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

    state = {
        isLoggedIn: AuthGuard()
    }

    componentWillMount(){
        this.setState({isLoggedIn: AuthGuard()});
    }

    render() {

        const handleSelect = (selectedIndex, e) => {
            this.setState({setIndex:selectedIndex});
        };


        return (

            <div className="back_color">
                <Header isLoggedIn={this.state.isLoggedIn} />
                <Switch>
                <ProtectedRoutes path="/" exact component={Home} />
                {/*<ProtectedRoutes path="/home" exact  >*/}
                {/*    /!*<Carousel activeIndex={this.state.setIndex} onSelect={handleSelect}>*!/*/}
                {/*    /!*    <Carousel.Item>*!/*/}
                {/*    /!*        <SlideOne />*!/*/}
                {/*    /!*    </Carousel.Item>*!/*/}
                {/*    /!*    <Carousel.Item>*!/*/}
                {/*    /!*        <SlideTwo />*!/*/}
                {/*    /!*    </Carousel.Item>*!/*/}
                {/*    /!*    <Carousel.Item>*!/*/}
                {/*    /!*        <SlideThree />*!/*/}
                {/*    /!*    </Carousel.Item>*!/*/}
                {/*    /!*    <Carousel.Item>*!/*/}
                {/*    /!*        <SlideFour />*!/*/}
                {/*    /!*    </Carousel.Item>*!/*/}
                {/*    /!*</Carousel>*!/*/}

                {/*</ProtectedRoutes>*/}

                <ProtectedRoutes exact path="/profile" component={Profile} />
                <Route exact path="/search" component={SearchResult} />
                <Route exact path="/login" render={() => <Signup {...this.props}/>} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/logout" component={Logout} />

                </Switch>

                {/*{AuthGuard() && (<div id="hide_from_third">*/}
                {/*    /!* DATA 2 DNA *!/*/}
                {/*    <div className="show_hide" style={{display: 'none'}} />*/}
                {/*    <div className="sideNavi">*/}
                {/*        /!* sidenavi menu //*!/*/}
                {/*        <div className="comon_side-navi-item item1 slideDiv" id="side_navi_show"><div><img src="images/settings_white.png" alt="Data2DNA" /> Data 2 DNA</div></div>*/}
                {/*        /!* sidenavi data //*!/*/}
                {/*        <div className="side-navi-data popdiv">*/}
                {/*            <div className="side-navi-tab comon-side-navi-tab">*/}
                {/*                <div>Data 2 DNA / User Setting</div>*/}
                {/*                <div className="data_dna_inner col-md-12">*/}
                {/*                    <div className="row">*/}
                {/*                        <div className="col-md-6 dd_user_setting">*/}
                {/*                            <div className="row">*/}
                {/*                                <div className="col-md-4">*/}
                {/*                                    <input type="radio" name="dd_us" /> <span>Security News</span>*/}
                {/*                                </div>*/}
                {/*                                <div className="col-md-8">*/}
                {/*                                    <select name="securityNews" className="form-control">*/}
                {/*                                        <option value={1}>Select Category</option>*/}
                {/*                                        <option value={2}>News 1</option>*/}
                {/*                                        <option value={3}>News 2</option>*/}
                {/*                                        <option value={4}>News 3</option>*/}
                {/*                                    </select>*/}
                {/*                                </div>*/}
                {/*                                <div className="col-md-4">*/}
                {/*                                    <input type="radio" name="dd_us" /> <span>Patch</span>*/}
                {/*                                </div>*/}
                {/*                                <div className="col-md-8">*/}
                {/*                                    <input type="text" className="form-control" placeholder="Enter Keywords" />*/}
                {/*                                    <small className="patch_example">Eg. microsoft windows</small>*/}
                {/*                                </div>*/}
                {/*                                <div className="col-md-4">*/}
                {/*                                    <input type="radio" name="dd_us" /> <span>Vulnerability</span>*/}
                {/*                                </div>*/}
                {/*                                <div className="col-md-8">*/}
                {/*                                    <select name="securityNews" className="form-control">*/}
                {/*                                        <option value={1}>Select Vendor</option>*/}
                {/*                                        <option value={2}>Vendor 1</option>*/}
                {/*                                        <option value={3}>Vendor 2</option>*/}
                {/*                                        <option value={4}>Vendor 3</option>*/}
                {/*                                    </select>*/}
                {/*                                    <select name="securityNews" className="form-control">*/}
                {/*                                        <option value={1}>Select Product</option>*/}
                {/*                                        <option value={2}>Product 1</option>*/}
                {/*                                        <option value={3}>Product 2</option>*/}
                {/*                                        <option value={4}>Product 3</option>*/}
                {/*                                    </select>*/}
                {/*                                </div>*/}
                {/*                                <div className="col-md-4 patch_radio">*/}
                {/*                                    <input type="radio" name="dd_us" /> <span>Malware</span>*/}
                {/*                                </div>*/}
                {/*                                <div className="col-md-8">*/}
                {/*                                    <select name="securityNews" className="form-control">*/}
                {/*                                        <option value={1}>Select Type</option>*/}
                {/*                                        <option value={2}>Virus</option>*/}
                {/*                                        <option value={3}>Worm</option>*/}
                {/*                                        <option value={4}>Trojan</option>*/}
                {/*                                        <option value={4}>Ransomware</option>*/}
                {/*                                    </select>*/}
                {/*                                </div>*/}
                {/*                                <div className="col-md-4 patch_radio">*/}
                {/*                                    Send Email :*/}
                {/*                                </div>*/}
                {/*                                <div className="col-md-8 free_user_email">*/}
                {/*                                    <input type="checkbox" name="email_check" /> <span>test.example@test.com</span>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <div className="col-md-6">*/}
                {/*                            <div className="col-range">*/}
                {/*                                <div className="range">*/}
                {/*                                    <input type="range" min={1} max={5} steps={1} defaultValue={1} />*/}
                {/*                                </div>*/}
                {/*                                <ul className="range-labels">*/}
                {/*                                    <li className="active selected">1</li>*/}
                {/*                                    <li>2</li>*/}
                {/*                                    <li>3</li>*/}
                {/*                                    <li>4</li>*/}
                {/*                                    <li>5</li>*/}
                {/*                                </ul>*/}
                {/*                            </div>*/}
                {/*                            <br />*/}
                {/*                            <div className="col-range">*/}
                {/*                                <div className="range">*/}
                {/*                                    <input type="range" min={1} max={5} steps={1} defaultValue={1} />*/}
                {/*                                </div>*/}
                {/*                                <ul className="range-labels">*/}
                {/*                                    <li className="active selected">1</li>*/}
                {/*                                    <li>2</li>*/}
                {/*                                    <li>3</li>*/}
                {/*                                    <li>4</li>*/}
                {/*                                    <li>5</li>*/}
                {/*                                </ul>*/}
                {/*                            </div>*/}
                {/*                            <br />*/}
                {/*                            <div className="col-range">*/}
                {/*                                <div className="range">*/}
                {/*                                    <input type="range" min={1} max={5} steps={1} defaultValue={1} />*/}
                {/*                                </div>*/}
                {/*                                <ul className="range-labels">*/}
                {/*                                    <li className="active selected">1</li>*/}
                {/*                                    <li>2</li>*/}
                {/*                                    <li>3</li>*/}
                {/*                                    <li>4</li>*/}
                {/*                                    <li>5</li>*/}
                {/*                                </ul>*/}
                {/*                            </div>*/}
                {/*                            <br />*/}
                {/*                            <br />*/}
                {/*                            <br />*/}
                {/*                            <div className="col-range">*/}
                {/*                                <div className="range">*/}
                {/*                                    <input type="range" min={1} max={5} steps={1} defaultValue={1} />*/}
                {/*                                </div>*/}
                {/*                                <ul className="range-labels">*/}
                {/*                                    <li className="active selected">1</li>*/}
                {/*                                    <li>2</li>*/}
                {/*                                    <li>3</li>*/}
                {/*                                    <li>4</li>*/}
                {/*                                    <li>5</li>*/}
                {/*                                </ul>*/}
                {/*                            </div>*/}
                {/*                            <br />*/}
                {/*                            <br />*/}
                {/*                            <div className="clearfix" />*/}
                {/*                            <div className="premium_user_email">*/}
                {/*                                <div className="faded3">*/}
                {/*                                    <p>This section is enable for Premium Users only.</p>*/}
                {/*                                </div>*/}
                {/*                                <input type="email" className="form-control" placeholder="Add more email addresses" />*/}
                {/*                                <small>Eg. yourname@domain.com, youremail@domain.com</small>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <div className="col-md-12 add_row_div">*/}
                {/*                    Showing 5 of 10 items*/}
                {/*                    <a  className="add_row"><span>+ </span>Add</a>*/}
                {/*                </div>*/}
                {/*                <div className="col-md-12 data_dna_inner_table">*/}
                {/*                    <div className="row">*/}
                {/*                        <table className="table-responsive">*/}
                {/*                            <tbody>*/}
                {/*                            <tr>*/}
                {/*                                <th width={230}>Items</th>*/}
                {/*                                <th width={130}>Type</th>*/}
                {/*                                <th align="center">Rating/Saverity</th>*/}
                {/*                                <th align="center" width={145}>Send Notification</th>*/}
                {/*                                <th width={235}>Email(s)</th>*/}
                {/*                                <th align="center">Delete</th>*/}
                {/*                            </tr>*/}
                {/*                            <tr>*/}
                {/*                                <td>Linux 6</td>*/}
                {/*                                <td>Vulnerability</td>*/}
                {/*                                <td align="center">5</td>*/}
                {/*                                <td align="center"><img src="images/sn_e.png" alt="SendNotifications" /></td>*/}
                {/*                                <td><img src="images/sn_e.png" alt="Emails" /></td>*/}
                {/*                                <td align="center"><a  className="delete-cross">X</a></td>*/}
                {/*                            </tr>*/}
                {/*                            <tr>*/}
                {/*                                <td>Authentication</td>*/}
                {/*                                <td>Security News</td>*/}
                {/*                                <td align="center">2</td>*/}
                {/*                                <td align="center"><img src="images/sn_e.png" alt="SendNotifications" /></td>*/}
                {/*                                <td><img src="images/sn_e.png" alt="Emails" /></td>*/}
                {/*                                <td align="center"><a  className="delete-cross">X</a></td>*/}
                {/*                            </tr>*/}
                {/*                            <tr>*/}
                {/*                                <td>RedHat</td>*/}
                {/*                                <td>Patch</td>*/}
                {/*                                <td align="center">4</td>*/}
                {/*                                <td align="center"><img src="images/sn_e.png" alt="SendNotifications" /></td>*/}
                {/*                                <td><img src="images/sn_e.png" alt="Emails" /></td>*/}
                {/*                                <td align="center"><a  className="delete-cross">X</a></td>*/}
                {/*                            </tr>*/}
                {/*                            <tr>*/}
                {/*                                <td>Flash player 24.0.0.136 and...</td>*/}
                {/*                                <td>Vulnerability</td>*/}
                {/*                                <td align="center">4</td>*/}
                {/*                                <td align="center"><img src="images/sn_e.png" alt="SendNotifications" /></td>*/}
                {/*                                <td><img src="images/sn_e.png" alt="Emails" /></td>*/}
                {/*                                <td align="center"><a  className="delete-cross">X</a></td>*/}
                {/*                            </tr>*/}
                {/*                            <tr>*/}
                {/*                                <td>Vulnerability Assessment</td>*/}
                {/*                                <td>Security News</td>*/}
                {/*                                <td align="center">4</td>*/}
                {/*                                <td align="center"><img src="images/sn_e.png" alt="SendNotifications" /></td>*/}
                {/*                                <td><img src="images/sn_e.png" alt="Emails" /></td>*/}
                {/*                                <td align="center"><a  className="delete-cross">X</a></td>*/}
                {/*                            </tr>*/}
                {/*                            </tbody>*/}
                {/*                        </table>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                /!*<div class="col-md-12 add_row_div">*/}
                {/*             class="add_row comon_green_color">Apply Filter</a>*/}
                {/*        </div>*!/*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    /!* DATA 2 DNA *!/*/}
                {/*    /!* USER SETTING *!/*/}
                {/*    <div className="show_hide1" style={{display: 'none'}} />*/}
                {/*    <div className="sideNavi1">*/}
                {/*        /!* sidenavi menu //*!/*/}
                {/*        <div className="comon_side-navi-item item11 slideDiv" id="side_navi_show1"><div><img src="images/settings_white.png" alt="UserSetting" /> User Setting</div></div>*/}
                {/*        /!* sidenavi data //*!/*/}
                {/*        <div className="side-navi-data1 popdiv">*/}
                {/*            <div className="side-navi-tab1 comon-side-navi-tab">*/}
                {/*                <div className="col-md-12 data_dna_inner_table">*/}
                {/*                    <div className="row">*/}
                {/*                        <div className="dd_security_news">*/}
                {/*                            <h4>Security News</h4>*/}
                {/*                            <ul>*/}
                {/*                                <li>Windows Zero-Day Exploited...</li>*/}
                {/*                                <li>News Sample 1</li>*/}
                {/*                                <li>News Sample 2</li>*/}
                {/*                                <li>News Sample 3</li>*/}
                {/*                                <li>News Sample 4</li>*/}
                {/*                                <li>News Sample 5</li>*/}
                {/*                                <li>News Sample 6</li>*/}
                {/*                                <li>News Sample 7</li>*/}
                {/*                            </ul>*/}
                {/*                        </div>*/}
                {/*                        <div className="dd_vulnerability">*/}
                {/*                            <h4>Vurnerabilities</h4>*/}
                {/*                            <ul>*/}
                {/*                                <li>CVE-2019-0708</li>*/}
                {/*                                <li>News Sample 1</li>*/}
                {/*                                <li>News Sample 2</li>*/}
                {/*                                <li>News Sample 3</li>*/}
                {/*                                <li>News Sample 4</li>*/}
                {/*                                <li>News Sample 5</li>*/}
                {/*                                <li>News Sample 6</li>*/}
                {/*                                <li>News Sample 7</li>*/}
                {/*                            </ul>*/}
                {/*                        </div>*/}
                {/*                        <div className="dd_risk_rating">*/}
                {/*                            <h4>Risk Rating (CVSS)</h4>*/}
                {/*                            <table>*/}
                {/*                                <thead>*/}
                {/*                                <tr>*/}
                {/*                                    <th>CVSS</th>*/}
                {/*                                    <th align="right">Affected CVE</th>*/}
                {/*                                </tr>*/}
                {/*                                </thead>*/}
                {/*                                <tbody>*/}
                {/*                                <tr>*/}
                {/*                                    <td>None(0.0)</td>*/}
                {/*                                    <td align="right">6176</td>*/}
                {/*                                </tr>*/}
                {/*                                <tr>*/}
                {/*                                    <td>Low(0.1-3.9)</td>*/}
                {/*                                    <td align="right">9737</td>*/}
                {/*                                </tr>*/}
                {/*                                <tr>*/}
                {/*                                    <td>Medium(4.0-6.9)</td>*/}
                {/*                                    <td align="right">64910</td>*/}
                {/*                                </tr>*/}
                {/*                                <tr>*/}
                {/*                                    <td>High(7.0-8.9)</td>*/}
                {/*                                    <td align="right">26892</td>*/}
                {/*                                </tr>*/}
                {/*                                <tr>*/}
                {/*                                    <td>Critical(9.0-10.0)</td>*/}
                {/*                                    <td align="right">15814</td>*/}
                {/*                                </tr>*/}
                {/*                                </tbody>*/}
                {/*                            </table>*/}
                {/*                        </div>*/}
                {/*                        <div className="dd_exploits">*/}
                {/*                            <h4>Exploits</h4>*/}
                {/*                            <ul>*/}
                {/*                                <li>Privilege Escalation</li>*/}
                {/*                                <li>News Sample 1</li>*/}
                {/*                                <li>News Sample 2</li>*/}
                {/*                                <li>News Sample 3</li>*/}
                {/*                                <li>News Sample 4</li>*/}
                {/*                                <li>News Sample 5</li>*/}
                {/*                                <li>News Sample 6</li>*/}
                {/*                                <li>News Sample 7</li>*/}
                {/*                            </ul>*/}
                {/*                        </div>*/}
                {/*                        <div className="dd_malware">*/}
                {/*                            <h4>Malware</h4>*/}
                {/*                            <ul>*/}
                {/*                                <li>Ransom.Ryuk</li>*/}
                {/*                                <li>News Sample 1</li>*/}
                {/*                                <li>News Sample 2</li>*/}
                {/*                                <li>News Sample 3</li>*/}
                {/*                                <li>News Sample 4</li>*/}
                {/*                                <li>News Sample 5</li>*/}
                {/*                                <li>News Sample 6</li>*/}
                {/*                                <li>News Sample 7</li>*/}
                {/*                            </ul>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    /!* USER SETTING *!/*/}
                {/*    /!* HEART BEAT SCANNER *!/*/}
                {/*    <div className="show_hide3" style={{display: 'none'}} />*/}
                {/*    <div className="sideNavi4">*/}
                {/*        /!* sidenavi menu //*!/*/}
                {/*        <div className="comon_side-navi-item item11 slideDiv hb_scanner" id="side_navi_show3">*/}
                {/*            <div><img src="images/settings_white.png" alt="UserSetting" /> Heart Beat Scanner</div>*/}
                {/*        </div>*/}
                {/*        /!* sidenavi data //*!/*/}
                {/*        <div className="side-navi-data1 heartbeat_side_navi popdiv">*/}
                {/*            <div className="side-navi-tab1 comon-side-navi-tab">*/}
                {/*                <div className="col-md-12 heartbeat_generated_table">*/}
                {/*                    <div className="row">*/}
                {/*                        <table className="table-responsive">*/}
                {/*                            <tbody>*/}
                {/*                            <tr>*/}
                {/*                                <th align="center">IP Alias</th>*/}
                {/*                                <th align="center">Status</th>*/}
                {/*                                <th align="center">HTTP</th>*/}
                {/*                                <th align="center">HTTPS</th>*/}
                {/*                                <th align="center">POP3</th>*/}
                {/*                                <th align="center">SMTP</th>*/}
                {/*                                <th align="center">IMAP4</th>*/}
                {/*                                <th align="center">DNS</th>*/}
                {/*                            </tr>*/}
                {/*                            <tr>*/}
                {/*                                <td>gmail</td>*/}
                {/*                                <td><div className="hb-up" /></td>*/}
                {/*                                <td><div className="hb-up" /></td>*/}
                {/*                                <td><div className="hb-up" /></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                            </tr>*/}
                {/*                            <tr>*/}
                {/*                                <td>google</td>*/}
                {/*                                <td><div className="hb-up" /></td>*/}
                {/*                                <td><div className="hb-up" /></td>*/}
                {/*                                <td><div className="text-center">--</div></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                            </tr>*/}
                {/*                            <tr>*/}
                {/*                                <td>arpatech</td>*/}
                {/*                                <td><div className="hb-up" /></td>*/}
                {/*                                <td><div className="hb-up" /></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                            </tr>*/}
                {/*                            <tr>*/}
                {/*                                <td>yahoo</td>*/}
                {/*                                <td><div className="hb-up" /></td>*/}
                {/*                                <td><div className="hb-up" /></td>*/}
                {/*                                <td><div className="hb-up" /></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                                <td><div className="hb-down" /></td>*/}
                {/*                            </tr>*/}
                {/*                            <tr>*/}
                {/*                                <td>facebook</td>*/}
                {/*                                <td><div className="hb-up" /></td>*/}
                {/*                                <td><div className="text-center">--</div></td>*/}
                {/*                                <td><div className="text-center">--</div></td>*/}
                {/*                                <td><div className="text-center">--</div></td>*/}
                {/*                                <td><div className="text-center">--</div></td>*/}
                {/*                                <td><div className="text-center">--</div></td>*/}
                {/*                                <td><div className="text-center">--</div></td>*/}
                {/*                            </tr>*/}
                {/*                            </tbody>*/}
                {/*                        </table>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    /!* HEART BEAT SCANNER *!/*/}
                {/*    /!* WEB DEFACEMENT *!/*/}
                {/*    <div className="show_hide4" style={{display: 'none'}} />*/}
                {/*    <div className="sideNavi5">*/}
                {/*        /!* sidenavi menu //*!/*/}
                {/*        <div className="comon_side-navi-item item11 slideDiv" id="side_navi_show7"><div><img src="images/settings_white.png" alt="UserSetting" /> Web Defacement</div></div>*/}
                {/*        /!* sidenavi data //*!/*/}
                {/*        <div className="side-navi-data1 webdefacement_side_navi popdiv">*/}
                {/*            <div className="side-navi-tab1 comon-side-navi-tab">*/}
                {/*                <div className="col-md-12 data_dna_inner_table">*/}
                {/*                    <div className="row">*/}
                {/*                        <div className="webdefacement_inner_content">*/}
                {/*                            <div className="row">*/}
                {/*                                <div className="col-6">*/}
                {/*                                    <h6>Monitored Content (Sample Web Name)</h6>*/}
                {/*                                    <div className="clearfix">*/}
                {/*                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>*/}
                {/*                                    </div>*/}
                {/*                                </div>*/}
                {/*                                <div className="col-6">*/}
                {/*                                    <h6>Currently Accessible Content</h6>*/}
                {/*                                    <div className="clearfix">*/}
                {/*                                        <img src="images/sample.jpg" alt="Sample Web Image" />*/}
                {/*                                    </div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    /!* WEB DEFACEMENT *!/*/}
                {/*</div>)}*/}

                {/*<SlideTwo />*/}
                {/*<SlideThree />*/}
                {/*<SlideFour />*/}
                <Footer/>
            </div>
        );
    }
}

export default Layout;


