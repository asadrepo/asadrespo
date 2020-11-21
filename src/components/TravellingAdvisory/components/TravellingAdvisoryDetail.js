import React from 'react';
import {advisoryRating, dateFormat} from "../../../helpers";
import ReactHtmlParser from "react-html-parser";

const TravellingAdvisoryDetail = ({content}) => {
    return (
        <div className="modal-body tr_ad_modal_inner_padding">
            <div className="container">
                <h3 className="tr_ad_green_modal">Advisory Detail:</h3>
                <label htmlFor="Title">Title:</label>
                <p>{content.title}</p>
                <label htmlFor="IssuerCountry">Issuer Country:</label>
                <p>{content.issuer_country.name}</p>
                <label htmlFor="TargetCountry">Target Country:</label>
                <p>{content.target_country.name}</p>
                <label htmlFor="AdvisoryLevel">Advisory Level:</label>
                <p>{advisoryRating(content.advisory_level)}</p>
                <label htmlFor="Category">Category:</label>
                <p>{content.category.name}</p>
                <label htmlFor="IssueDate">Issue Date:</label>
                <p>{dateFormat(content.issue_date)}</p>
                <label htmlFor="EndDate">End Date:</label>
                <p>{dateFormat(content.end_date)}</p>
                <label htmlFor="EndDate">Last Update Date:</label>
                <p>{dateFormat(content.last_update_date)}</p>
                <label htmlFor="Link">Link:</label>
                <p><a href={content.link} target="_blank" className="thrat_intel_green_modal">{content.link}</a></p>
                <label htmlFor="Detail">Detail:</label>
                {ReactHtmlParser(content.detail)}
            </div>
        </div>
    );
};

export default TravellingAdvisoryDetail;
