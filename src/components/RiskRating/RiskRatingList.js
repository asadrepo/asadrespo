import React from 'react';
import ReactHtmlParser from "react-html-parser";

const RiskRatingList = (props) => {

    return (
        <div className="col-md-4 col-sm-12 risk_rating_section pr-0">
            <div className="comon_bg_style risk_rating_inner">
                <h2>Risk Rating (CVSSv3)</h2>
                {this.props.isLoading ? <Loader /> : <RiskRatingList risk_ratings={this.props.dataResult} />}
            </div>
        </div>
    );
};

export default RiskRatingList;