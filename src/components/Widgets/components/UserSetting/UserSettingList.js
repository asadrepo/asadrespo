import React, { useState } from 'react';

const UserSettingList = (props) => {
  // console.log("in user settings");
   console.log(props.listData);
    return (
        <React.Fragment>
          <div className="row">
                    <div className="dd_security_news">
                      <h4>Security News</h4>
                      <ul>
                          {props.listData[0].security_news && props.listData[0].security_news.map((security_news, index) => {
                              return (<li key={index}><a style={{cursor: 'pointer'}}  onClick={() => props.onClickSecurityNews(security_news)}>{security_news.name}</a></li>)
                          })}
                        {/* <li ><a onClick={() => props.onClickSecurityNews()}>Windows Zero-Day Exploited...</a></li>
                        <li>News Sample 1</li>
                        <li>News Sample 2</li>
                        <li>News Sample 3</li>
                        <li>News Sample 4</li>
                        <li>News Sample 5</li>
                        <li>News Sample 6</li>
                        <li>News Sample 7</li> */}
                      </ul>
                    </div>
                    <div className="dd_vulnerability">
                      <h4>Vurnerabilities</h4>
                      <ul>
                          {props.listData[0].vulnerabilities && props.listData[0].vulnerabilities.map((vulnerability, index) => {
                              return (<li key={index}><a style={{cursor: 'pointer'}}  onClick={() => props.onClickVulnerbility(vulnerability)}>{vulnerability.name}</a></li>)
                          })}
                        {/* <li><a onClick={() => props.onClickVulnerbility()}>CVE-2019-0708</a></li>
                        <li>News Sample 1</li>
                        <li>News Sample 2</li>
                        <li>News Sample 3</li>
                        <li>News Sample 4</li>
                        <li>News Sample 5</li>
                        <li>News Sample 6</li>
                        <li>News Sample 7</li> */}
                      </ul>
                    </div>
                    <div className="dd_exploits">
                      <h4>Patch</h4>
                      <ul>
                      {props.listData[0].patch && props.listData[0].patch.map((patch, index) => {
                              return (<li key={index}><a style={{cursor: 'pointer'}}  onClick={() => props.onClickPatch(patch)}>{patch.name}</a></li>)
                          })}
                        {/* <li><a onClick={() => props.onClickExploit()}>Privilege Escalation</a></li>
                        <li>News Sample 1</li>
                        <li>News Sample 2</li>
                        <li>News Sample 3</li>
                        <li>News Sample 4</li>
                        <li>News Sample 5</li>
                        <li>News Sample 6</li>
                        <li>News Sample 7</li> */}
                      </ul>
                    </div>
                    <div className="dd_malware">
                      <h4>Malware</h4>
                      <ul>
                      {props.listData[0].malware && props.listData[0].malware.map((malware, index) => {
                              return (<li key={index}><a style={{cursor: 'pointer'}} onClick={() => props.onClickMalware(malware)}>{malware.name}</a></li>)
                          })}
                        {/* <li><a onClick={() => props.onClickMalware()}>Ransom.Ryuk</a></li>
                        <li>News Sample 1</li>
                        <li>News Sample 2</li>
                        <li>News Sample 3</li>
                        <li>News Sample 4</li>
                        <li>News Sample 5</li>
                        <li>News Sample 6</li>
                        <li>News Sample 7</li> */}
                      </ul>
                    </div>
        </div>
      </React.Fragment>
    );
}

export default UserSettingList;