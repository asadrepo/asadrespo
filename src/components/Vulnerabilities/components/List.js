import React from 'react';
import ReactHtmlParser from "react-html-parser";
import {getValueIfExist, subStringText, vulnerbilityBase, dateFormat} from "../../../helpers";
import {Scrollbars} from "react-custom-scrollbars";

const List = (props) => {


    return (
        <table className="table-responsive fixed_header">
            <tbody>
            <tr>
                <td>Date</td>
                <td>CVE</td>
                <td>Vulnerability</td>
                <td>Base</td>
                <td>Exploits</td>
                <td>Remedy</td>
            </tr>
            {props.vulnerabilities.length ? props.vulnerabilities && props.vulnerabilities.map((value) => {
                let remedy = "";
                let remedyStyle = "";
                if(value.remedy === 'not_available' || value.remedy === ''){
                    remedy = <a>Not Defined</a>;
                    remedyStyle = 'nd';
                } else if (value.remedy === 'work_around'){
                    remedyStyle = 'work_nd';
                    remedy = <a style={{cursor: 'pointer'}} onClick={() => props.onClickWorkaroud(value.work_around)}>Work Around</a>;
                } else if (value.remedy === 'official_fix') {
                    remedyStyle = 'off_fix';
                    remedy = <a style={{cursor: 'pointer'}} target="_blank" href={value.official_fix}>Official fix</a>;
                }

                let exploit = <a style={{cursor: 'pointer'}}>Not Available</a>;
                let exploitClass = 'nd';
                if(value.exploit === 'proof_of_concept'){
                    exploit = <a style={{cursor: 'pointer'}} onClick={() => props.onClickProofOfConcept(value.proof_of_concept)}>Proof of Con</a>;
                    exploitClass = 'prof_of_c';
                }

                return (

                    <tr key={value.id}>
                    <td><a style={{cursor: 'pointer'}} onClick={() => props.onClickDetail(value)}>{dateFormat(value.date)}</a></td>
                    <td><a style={{cursor: 'pointer'}} onClick={() => props.onClickDetail(value)}>{getValueIfExist(value, 'cve_id')}</a></td>
                    <td><a style={{cursor: 'pointer'}} onClick={() => props.onClickDetail(value)}>{subStringText(getValueIfExist(value, 'title'), 0, 65).replace(/<[^>]+>/g, '')}</a></td>
                    <td className={vulnerbilityBase(value.cvss)}><a style={{cursor: 'pointer'}} onClick={() => props.onClickDetail(value)}>{value.cvss}</a></td>
                    <td className={exploitClass}>{exploit}</td>
                    <td className={remedyStyle}>
                        {remedy}
                        {/*<a style={{cursor: 'pointer'}} onClick={() => props.onClickWorkaroud(value.work_around)}>Work Around</a>*/}
                    </td>
                </tr>);
            }) : <tr><td  rowSpan="6">No records found</td></tr>}
            </tbody>
        </table>
    );
};

export default List;