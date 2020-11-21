import React from 'react';
import ReactHtmlParser from "react-html-parser";
import RatingImage from "../../common/RatingImage";
import { dateFormat } from '../../../helpers';

const NewsDetail = ({detail, title}) => {
    return (
        <div className="modal-body vul_modal_inner_padding">
        <div className="container">
            <h4>{title}</h4>
            <hr/>
            <label htmlFor="Category">Category : </label> <span>{detail.category}</span>
            <div className="clearfix" />
            <label htmlFor="SubCategory">Sub-Category : </label> <span>{detail.sub_category}</span>
            <div className="clearfix" />
            <label htmlFor="Date">Date : </label><span>{dateFormat(detail.date)}</span>
            <div className="clearfix" />
            <label htmlFor="Title">Title : </label> <span>{detail.title}</span>
            <div className="clearfix" />
            <label htmlFor="Link">Link : </label>
            <span><a href={detail.link} target="_blank" className="thrat_intel_green_modal">{detail.link}</a></span>
            <div className="clearfix" />
            <label htmlFor="Country">Country : </label> <span>{detail.country}</span>
            <div className="clearfix" />
            <label htmlFor="City">City : </label> <span>{detail.city}</span>
            <div className="clearfix" />
            <label htmlFor="SecurityRating">Security Rating : </label>
            <p><RatingImage rating={detail.security_rating} /></p>
            {/*<p><img src="images/severity.png" alt="Severity" /></p>*/}
            <div className="clearfix" />
            <label htmlFor="Description">Description : </label>
                {ReactHtmlParser(detail.description)}
            <div className="clearfix" />
            <label htmlFor="Author">Author : </label> <span>{detail.author}</span>
        </div>
        </div>
    );
};

export default NewsDetail;