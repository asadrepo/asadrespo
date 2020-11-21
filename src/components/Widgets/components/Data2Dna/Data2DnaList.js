import React from "react";

const Data2DnaList = (props) => {
  return (
    <table className="table-responsive">
      <tbody>
        <tr key={0}>
          <th width={230}>Items</th>
          <th width={130}>Type</th>
          <th align="center">Rating/Severity</th>
          <th align="center" width={145}>
            Send Notification
          </th>
          <th width={235}>Email(s)</th>
          <th align="center">Delete</th>
        </tr>
        {props.listData.map((result, index) => {
           
            return (
                <tr key={index}>
                <td>{result.item}</td>
                <td>{result.type.replace("_", " ").toUpperCase()}</td>
                <td align="center">{result.severity}</td>
                <td align="center">
                  <img src="images/sn_e.png" alt="SendNotifications" />
                </td>
                <td>
                  <img src="images/sn_e.png" alt="Emails" />
                </td>
                <td align="center">
                  <a onClick={() => props.onClickDelete(result.id)} style={{cursor: 'pointer'}} className="delete-cross">X</a>
                </td>
              </tr>
            );
        })}
       
        {/* <tr>
          <td>Authentication</td>
          <td>Security News</td>
          <td align="center">2</td>
          <td align="center">
            <img src="images/sn_e.png" alt="SendNotifications" />
          </td>
          <td>
            <img src="images/sn_e.png" alt="Emails" />
          </td>
          <td align="center">
            <a className="delete-cross">X</a>
          </td>
        </tr>
        <tr>
          <td>RedHat</td>
          <td>Patch</td>
          <td align="center">4</td>
          <td align="center">
            <img src="images/sn_e.png" alt="SendNotifications" />
          </td>
          <td>
            <img src="images/sn_e.png" alt="Emails" />
          </td>
          <td align="center">
            <a className="delete-cross">X</a>
          </td>
        </tr>
        <tr>
          <td>Flash player 24.0.0.136 and...</td>
          <td>Vulnerability</td>
          <td align="center">4</td>
          <td align="center">
            <img src="images/sn_e.png" alt="SendNotifications" />
          </td>
          <td>
            <img src="images/sn_e.png" alt="Emails" />
          </td>
          <td align="center">
            <a className="delete-cross">X</a>
          </td>
        </tr>
        <tr>
          <td>Vulnerability Assessment</td>
          <td>Security News</td>
          <td align="center">4</td>
          <td align="center">
            <img src="images/sn_e.png" alt="SendNotifications" />
          </td>
          <td>
            <img src="images/sn_e.png" alt="Emails" />
          </td>
          <td align="center">
            <a className="delete-cross">X</a>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};

export default Data2DnaList;
