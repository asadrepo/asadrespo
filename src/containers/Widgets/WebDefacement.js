import React, { Component } from "react";
import { Animated } from "react-animated-css";

class WebDefacement extends Component {

    state = {
        display: 'none',
        isWidgetDisplay: false
    }

    handleOnClickWebDefacement = async () => {
        const {isWidgetDisplay} = this.state;
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
  render() {
    const {display} = this.state;
    return (
      <React.Fragment>
        <div className="show_hide4" style={{display: display}}  />
        <div className="sideNavi5">
          {/* sidenavi menu //*/}
          <div
            className="comon_side-navi-item item11 slideDiv"
            id="side_navi_show7"
            onClick={this.handleOnClickWebDefacement}
          >
            <div>
              <img src="images/settings_white.png" alt="UserSetting" /> Web
              Defacement
            </div>
          </div>
          {/* sidenavi data //*/}
          <Animated  className="side-navi-data1 webdefacement_side_navi" animationIn="slideInRight" animationOut="slideOutRight" isVisible={this.state.isWidgetDisplay} style={{display: display}} > 
        
            <div className="side-navi-tab1 comon-side-navi-tab" style={{display:display}}>
              <div className="col-md-12 data_dna_inner_table">
                <div className="row">
                  <div className="webdefacement_inner_content">
                    <div className="row">
                      <div className="col-6">
                        <h6>Monitored Content (Sample Web Name)</h6>
                        <div className="clearfix">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </div>
                      </div>
                      <div className="col-6">
                        <h6>Currently Accessible Content</h6>
                        <div className="clearfix">
                          <img src="images/sample.jpg" alt="Sample Web Image" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Animated>
        </div>
      </React.Fragment>
    );
  }
}


export default WebDefacement;