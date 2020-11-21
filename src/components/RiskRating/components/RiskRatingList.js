import React from 'react';

const RiskRatingList = ({risk_ratings}) => {
    return (
        <table>
            <thead>
            <tr key={0}>
                <th>CVSS</th>
                <th>Affected CVE</th>
            </tr>
            </thead>
            <tbody>
            {risk_ratings.map((risk_rating, index) => {
                return (<tr key={index}>
                    <td>{risk_rating.cvss_score}</td>
                    <td>{risk_rating.affected_cve}</td>
                </tr>);
            })}

            </tbody>
        </table>
    );
};

export default RiskRatingList;
