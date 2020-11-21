import React from 'react';
import ReactHtmlParser from "react-html-parser";

const TopVulnerbilitiesDetail = ({features}) => {
    return (

            <div className="vulnerability_modal" >
                <div className="col-md-12">
                    <table>
                        <tbody>
                        <tr>
                            <th align="center" className="vul_margin">Vulnerability</th>
                            <th>Description</th>
                        </tr>
                        {features.map((feature, index) => {
                            return (<tr key={index}>
                                <td width="180" align="center">{feature.cve_id}</td>
                                <td>{ReactHtmlParser(feature.description)}
                                </td>
                            </tr>)
                        })}


                        </tbody>
                    </table>
                </div>
            </div>
    );
};

export default TopVulnerbilitiesDetail;