import React from 'react';
import ReactHtmlParser from "react-html-parser";

const List = ({threat_intel, onClickDetail}) => {
    return (<div data-dot={'<span></span>'}>
            <div className="th_int_inner">
                <a onClick={() => onClickDetail(threat_intel)} ><label htmlFor="Threat1">Recent Exploit</label></a>
                {ReactHtmlParser(threat_intel.exploit)}
            </div>
        </div>);
};

export default List;
