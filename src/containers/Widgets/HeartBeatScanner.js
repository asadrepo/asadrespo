import React, { Component } from 'react';
import Detail from '../../components/TopExploits/components/Detail';
import { Animated } from 'react-animated-css';

class HeartBeatScanner extends Component {

    state = {
        display: 'none',
        isWidgetDisplay: false
    }

    handleOnClickHeartBeatScanner = async () => {
        const {isWidgetDisplay, display} = this.state;
        if(!isWidgetDisplay){

            this.setState({
                display: 'block',
                isWidgetDisplay: true
                
            });
        } else {

                this.setState({
                    display: 'none',
                    isWidgetDisplay: false
                    
                });
           
        }
       

        
       
    }

    render () {
        const {display, isLoading} = this.state;
        return (
            <React.Fragment>
            <div className="show_hide3" style={{display: display}} />
            <div className="sideNavi4">
              {/* sidenavi menu //*/}
              <div className="comon_side-navi-item item11 slideDiv hb_scanner" id="side_navi_show3" onClick={this.handleOnClickHeartBeatScanner} >
                <div><img src="images/settings_white.png" alt="UserSetting" /> Heart Beat Scanner</div>
              </div>
              {/* sidenavi data //*/}
              <Animated  className="side-navi-data1 heartbeat_side_navi" animationIn="slideInRight" animationOut="slideOutRight" isVisible={this.state.isWidgetDisplay} style={{display: display}} > 
             
                <div className="comon-side-navi-tab" style={{display:display}}>
                  <div className="col-md-12 heartbeat_generated_table">
                    <div className="row">
                      <table className="table-responsive">
                        <tbody>
                          <tr>
                            <th align="center">IP Alias</th>
                            <th align="center">Status</th>
                            <th align="center">HTTP</th>
                            <th align="center">HTTPS</th>
                            <th align="center">POP3</th>
                            <th align="center">SMTP</th>
                            <th align="center">IMAP4</th>
                            <th align="center">DNS</th>
                          </tr>
                          <tr>
                            <td>gmail</td>
                            <td><div className="hb-up" /></td>
                            <td><div className="hb-up" /></td>
                            <td><div className="hb-up" /></td>
                            <td><div className="hb-down" /></td>
                            <td><div className="hb-down" /></td>
                            <td><div className="hb-down" /></td>
                            <td><div className="hb-down" /></td>
                          </tr>
                          <tr>
                            <td>google</td>
                            <td><div className="hb-up" /></td>
                            <td><div className="hb-up" /></td>
                            <td><div className="text-center">--</div></td>
                            <td><div className="hb-down" /></td>
                            <td><div className="hb-down" /></td>
                            <td><div className="hb-down" /></td>
                            <td><div className="hb-down" /></td>
                          </tr>
                          <tr>
                            <td>arpatech</td>
                            <td><div className="hb-up" /></td>
                            <td><div className="hb-up" /></td>
                            <td><div className="hb-down" /></td>
                            <td><div className="hb-down" /></td>
                            <td><div className="hb-down" /></td>
                            <td><div className="hb-down" /></td>
                            <td><div className="hb-down" /></td>
                          </tr>
                          <tr>
                            <td>yahoo</td>
                            <td><div className="hb-up" /></td>
                            <td><div className="hb-up" /></td>
                            <td><div className="hb-up" /></td>
                            <td><div className="hb-down" /></td>
                            <td><div className="hb-down" /></td>
                            <td><div className="hb-down" /></td>
                            <td><div className="hb-down" /></td>
                          </tr>
                          <tr>
                            <td>facebook</td>
                            <td><div className="hb-up" /></td>
                            <td><div className="text-center">--</div></td>
                            <td><div className="text-center">--</div></td>
                            <td><div className="text-center">--</div></td>
                            <td><div className="text-center">--</div></td>
                            <td><div className="text-center">--</div></td>
                            <td><div className="text-center">--</div></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Animated>
            </div>
            </React.Fragment>
        );
    }
}

export default HeartBeatScanner;