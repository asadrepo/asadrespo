import React, {Component} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class Notification extends Component {

    render(){
        return (
          
            <ul>
                  <Scrollbars style={{ height: 500 }}>
            <li>
                <a href="https://certstation.com/blog/researchers-identify-multiple-flaws-open-source-vnc-systems/"
                   target="_blank">Researchers Identify Multiple</a>
                <span className="status_point">Blog</span><span
                className="float-right notification_date">25-Nov-2019</span>
            </li>
            <li>
                <a  data-toggle="modal"
                   data-target="#exampleModalCenter2">Windows RDP BlueKeep DoS</a>
                <span className="status_point">Exploit</span><span
                className="float-right notification_date">25-Nov-2019</span>
            </li>
            <li>
                <a  data-toggle="modal"
                   data-target="#exampleModalCenter13">Researchers Identify Multiple</a>
                <span className="status_point">Malware</span><span
                className="float-right notification_date">25-Nov-2019</span>
            </li>
            </Scrollbars>
        </ul>
         
        );
    }
}

export default Notification;