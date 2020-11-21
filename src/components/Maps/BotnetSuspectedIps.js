import React, {useState} from "react";
import {Animated} from "react-animated-css";

const BotnetSuspectedIps = (props) => {
    const [isShowList, setIsShowList] =useState(false);


    const onClick = () => {
        setIsShowList(!isShowList);
    }
    return (
        <div className="sideNavi3 botnet_ips" style={{display: props.isShowList ? 'block' : 'none'}}>
            <div className="comon_side-navi-item item11 slideDiv" id="side_navi_show5" onClick={props.onClick}>
                <div>Botnet ips</div>
            </div>

            <Animated className="side-navi-data2 popdivbotnets" animationIn="slideInRight"
                      animationOut="slideOutRight" style={{display: props.isShowList ? 'block' : 'none'}} isVisible={props.isShowList}>

                <div className="side-navi-tab1 comon-side-navi-tab" style={{display: 'block'}}>
                    <div className="col-md-12 data_dna_inner_table">
                        <div className="row">
                            <div className="dd_security_news">
                                <table className="table-responsive">
                                    <tbody>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Network</th>
                                        <th># of Suspected Botnet Ips</th>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Tencent Cloud</td>
                                        <td>419</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Tencent-CN</td>
                                        <td>333</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Hinet-Net</td>
                                        <td>258</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Baidu</td>
                                        <td>256</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>DO-13</td>
                                        <td>238</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>VNPT-VN</td>
                                        <td>201</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>Kornet</td>
                                        <td>168</td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>Non-Ripe-NCC-Managed-Address-Block</td>
                                        <td>157</td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td>OVH</td>
                                        <td>154</td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td>Telkomnet</td>
                                        <td>130</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Animated>
        </div>
    )
}

export default BotnetSuspectedIps;