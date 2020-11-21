import React, {Component} from 'react';
import {Search} from "./components/Search";
import {Link, Redirect, Route} from "react-router-dom";
import {AuthGuard, removeUserStorage} from "../../../containers/Auth/Auth";
import Popup from "../../common/Popup";
import Login from "../../../containers/Auth/Login";
import PopupHOC from '../../../hoc/PopupHOC';
import SubmitTicket from '../../Settings/SubmitTicket';


class Header extends Component {
    constructor(props) {
        super(props);
      }
    state = {
        isModelshow: false,
        popUpTitle: 'Login',
        isLoggedIn: AuthGuard()
    }

    handleonClosePop = () => {
        this.setState({isModelshow:false});
    };


    handleOnClickLogout = () => {

        console.log("logout");
       // removeUserStorage();
        return (
            <Route render={props => (
               (<Redirect to={{pathname: '/login'}} />)
            )} />
        );
      //  return (<Redirect to={{pathname: '/login'}} />);
    }

    handleSearchKeyword = (keyword, categories) => {
       
        
        if(typeof this.props.searchKeyWordData !== 'undefined'){
            
            this.props.searchKeyWordData(keyword, categories);
        }
      
     
    }


   render(){

    return (
        <header className="main_header pt-2 pl-2 pr-2">
            <div className="container-fluid">
                <div className="row">
                    <div className="main_logo col-2 col-sm-2 col-xs-12 mw-100">
                        <Link to="/" ><img onClick={() => window.location.replace(process.env.REACT_APP_BASE_URL)} src="/images/logo.png" alt="Certstation"/> </Link>
                    </div>

                    {AuthGuard() && (<Search searchKeyWord={this.handleSearchKeyword}   />)}

                    {!AuthGuard() && (<div className="col-10 col-md-10 col-sm-10 col-xs-12">
                        <nav className="navbar navbar-light">
                            <ul className="nav" id="nav-top">
                                <li>
                                    <a onClick={() => this.props.handleOnClickModal(<Login  />, 'lg')} 
                                        style={{color:'white', cursor:'pointer'}}
                                        >Already have an account? Login</a></li>
                            </ul>
                        </nav>
                         {/* <Popup
                        isShow={this.state.isModelshow}
                        onClosePop={this.handleonClosePop}
                        title={this.state.popUpTitle}
                        container={<Login onClosePop={this.handleonClosePop} />} /> */}
                    </div>
                    )}
                   


                    {AuthGuard() && (<div className="col-4 col-sm-4 col-xs-12 for-sm-xs pl-sm-0" id="main-top-nav">
                        {/* HIDE ON MOBILE */}
                        <nav className="navbar navbar-light" id="hom">
                            <ul className="nav" id="nav-top">
                                <li id="cs_tool_bg"><a><span className="cst_ico"><img
                                    src="images/cs_tool_icon.png" alt="CSTool"/></span>CS Tool</a>
                                    <ul>
                                        <li className="heartbeat_scanner"><a>Heart Beat Scanner</a>
                                            <ul className="p-2">
                                                <li className="bk_t_nrml"><a><img
                                                    src="images/heartbeat_icon.png" alt="Heart Beat Scanner"
                                                    className="hbs_icon"/>Heart Beat Scanner</a> <a
                                                                                                    className="p-0"><img
                                                    src="images/apple_icon.png" alt="Apple" className="apple_icon"/></a>
                                                    <a className="p-0"><img src="images/android_icon.png"
                                                                                     alt="Android"
                                                                                     className="android_icon"/></a>
                                                </li>
                                                <hr/>
                                                <li className="hbs_inner_li bk_t_nrml">Provide IP detail to monitor,
                                                    you have only 10 IPs allowed.
                                                </li>
                                                <li className="create_hbs bk_t_nrml"><a
                                                                                        data-toggle="modal"
                                                                                        data-target="#exampleModalCenter11">Create
                                                    Heart Beat Scanner</a></li>
                                            </ul>
                                        </li>
                                        <li className="submenu_sep"><img src="images/separator.png"
                                                                         alt="Separator"/></li>
                                        <li className="heartbeat_scanner"><a>Web Defacement</a>
                                            <ul className="p-2">
                                                <li><a>Web Defacement</a></li>
                                                <hr/>
                                                <li className="wd_inner_li">Provide website URLs to monitor,<br/>only
                                                    5 URLs are allowed.
                                                </li>
                                                <li className="create_wd"><a data-toggle="modal"
                                                                             data-target="#exampleModalCenter12">Configure
                                                    Web Defacement Monitor</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <div className="show_hide2" style={{display: 'none'}}/>
                                <li><a><span className="api_ico"><img src="images/api_icon.png" alt="API"/></span>API</a>
                                </li>
                                <li className="notification_menu"><a><span
                                    className="notification_ico"><img src="images/notification_icon.png"
                                                                      alt="Notification"/><img
                                    src="images/notify_icon.png" alt="NotifyIcon"
                                    className="small_icon"/></span></a>
                                    <ul>
                                        <li>
                                            <a href="https://certstation.com/blog/researchers-identify-multiple-flaws-open-source-vnc-systems/"
                                               target="_blank">Researchers Identify Multiple</a>
                                            <span className="status_point">Blog</span><span
                                            className="float-right notification_date">25-Nov-2019</span>
                                        </li>
                                        <li>
                                            <a  data-toggle="modal"
                                               data-target="#exampleModalCenter2">Windows RDP BlueKeep DoS</a>
                                            <span className="status_point">Exploit</span><span
                                            className="float-right notification_date">25-Nov-2019</span>
                                        </li>
                                        <li>
                                            <a  data-toggle="modal"
                                               data-target="#exampleModalCenter13">Researchers Identify Multiple</a>
                                            <span className="status_point">Malware</span><span
                                            className="float-right notification_date">25-Nov-2019</span>
                                        </li>
                                    </ul>
                                </li>
                                <li><a><span className="round_image"><img src="images/avatar.png"
                                                                                   alt="UserImage"/></span>Bob Hyden</a>
                                    <ul>
                                        <li><Link to="/profile" ><span className="setting_ico"><img
                                            src="images/settings.png" alt="Settings"/></span>Settings</Link></li>
                                        <li><a onClick={() => this.props.handleOnClickModal(<SubmitTicket onClickClose={this.props.handleOnCloseClick}  />, 'lg', 'sat_modal')} style={{cursor: 'pointer'}}><span className="ticket_ico"><img
                                            src="images/ticket.png" alt="Tickets"/></span>Submit a Ticket</a></li>
                                        <li><Link to='/logout'><span className="logout_ico"><img
                                            src="images/logout.png" alt="Logout"/></span>Logout</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                        {/* HIDE ON MOBILE */}
                    </div>)}
                    {/* MODAL SUBMIT A TICKET */}

                </div>
            </div>
        </header>
    );
   }
}

export default PopupHOC(Header);