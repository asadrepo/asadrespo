import React from 'react';
import ReactHtmlParser from "react-html-parser";

const ThreatIntelDetail = ({threat_intel}) => {
    return (
        <div className="modal-body thrat_intel_modal_inner_padding">
            <div className="container">
                <h3 className="thrat_intel_green_modal">Threat Intel:</h3>
                <label htmlFor="RecentExploit">Recent Exploit:</label>
                {ReactHtmlParser(threat_intel.exploit)}

                <label htmlFor="WebsiteOfTheWeek">Website Of The Week:</label>
                {ReactHtmlParser(threat_intel.website)}
                <label htmlFor="ToolsOfTheWeek">Tool of the week:</label>
                {ReactHtmlParser(threat_intel.tool)}
            </div>
        </div>
    );
};

export default ThreatIntelDetail;
