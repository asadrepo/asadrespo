import React, {useState} from "react";
import {Animated} from "react-animated-css";

const RoutesPanel = (props) => {
    const [isShowList, setIsShowList] =useState(true);
    return (
        <div>
            <div className="show_hide7" style={{display: 'none'}} />
            <div className="sideNavi3 router-map" style={{display: props.isShowList ? 'block' : 'none'}}>

                {/*<div className="comon_side-navi-item item11 slideDiv" id="side_navi_show5" onClick={props.onClick}><div>Offline Router List</div></div>*/}
                <div className="comon_side-navi-item item11 slideDiv" id="side_navi_show5" onClick={props.onClick}>
                    <div>Offline Router List</div>
                </div>
                <Animated className="side-navi-data2 popdiv" animationIn="slideInRight"
                          animationOut="slideOutRight" style={{display: props.isShowList ? 'block' : 'none'}} isVisible={props.isShowList}>
                {/*<div className="side-navi-data2 popdiv">*/}
                    <div className="side-navi-tab1 comon-side-navi-tab" style={{display: 'block'}}>
                        <div className="col-md-12 data_dna_inner_table">
                            <div className="row">
                                <div className="dd_security_news">
                                    <ul>
                                        <li>209.97.212, <span>Kelowna</span></li>
                                        <li>209.97.212, <span>Kelowna</span></li>
                                        <li>82.146.40.113, <span>Moscow</span></li>
                                        <li>128.8.10.90, <span>Topeka</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
                {/*</div>*/}
            </div>
        </div>
    );
}

export default RoutesPanel;