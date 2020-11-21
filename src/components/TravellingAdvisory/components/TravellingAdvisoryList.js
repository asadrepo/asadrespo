import React from 'react';
import {dateFormat} from "../../../helpers";
import Loader from "../../common/Loader";

const TravellingAdvisoryList = ({onClickDetail, travellingAdvisories, isLoading}) => {
    return (
        <>{isLoading ? <Loader size={'small'} /> : <table className="table-responsive">
           <tbody>
            {travellingAdvisories.map(travellingAdvisory => {
                return ( <tr key={travellingAdvisory.id}>
                    <td><span style={{cursor: 'pointer'}}  onClick={() => onClickDetail(travellingAdvisory)}>{dateFormat(travellingAdvisory.issue_date)}</span></td>
                    <td><a style={{cursor: 'pointer'}} href onClick={() => onClickDetail(travellingAdvisory)}>{travellingAdvisory.title.substring(0, 30)}</a></td>
                </tr>)
            })}
            </tbody>
        </table>}</>
    );
};

export default TravellingAdvisoryList;
