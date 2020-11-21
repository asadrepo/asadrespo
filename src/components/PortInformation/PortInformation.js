import React, {Component} from 'react';
import ListPort from "./components/ListPort";
import axios from "axios";
import { Scrollbars } from 'react-custom-scrollbars';

class PortInformation extends Component {
    state = {
        limit: 10,
        ports: [],
        total:0
    }

    async getPortInformation(limit){
        return await axios.get(process.env.REACT_APP_API_URL+'ports/', {
            params: {
                limit: limit
            },
            headers: {
            }
        });
    }
    componentDidMount() {

        this.getPortInformation(this.state.limit).then(
            response => {
               this.setState({
                   ports: response.data.results,
                   total: response.data.count
               })
            }
        )
    }

    handleOnchangeLimit = (event) => {
       this.setState({
           limit: event.target.value
       });

       this.getPortInformation(event.target.value).then(
           response => {
               this.setState({
                   ports: response.data.results,
                   total: response.data.count
               })
           }
       )
    }
    render() {
        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12 ports_information_section">

                    <Scrollbars  style={{ height: 280 }} > 
                        <div className="ports_information_inner">
                            <h2>Ports Information</h2>
                            <div className="entries_section">
                                <span>Show</span>
                                <select name="enteies" id="showEntries" onChange={this.handleOnchangeLimit}>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                    {/*<option value={this.state.total}>All</option>*/}
                                </select>
                                <span>entries</span>
                            </div>
                            <table>
                                <thead>
                                <tr>
                                    <th width="15%">Port</th>
                                    <th width="65%">Service</th>
                                    <th width="20%">Name</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <ListPort ports={this.state.ports} />
                                </tbody>
                            </table>

                        </div>

                    </Scrollbars>

                    
                    </div>
                </div>
            </div>
        );
    }
}

export default PortInformation;