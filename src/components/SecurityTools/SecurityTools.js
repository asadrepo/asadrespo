import React, {Component} from 'react';
import axios from "axios";
import Loader from "../common/Loader";
import PopupHOC from "../../hoc/PopupHOC";
import DetailPopup from './DetailPopup';
import { Scrollbars } from 'react-custom-scrollbars';
import { getToken } from '../../containers/Auth/Auth';

class SecurityTools extends Component {

    state = {
        paging: {
            next:process.env.REACT_APP_API_URL+'securitytools/',
            limit:10,
            total:0
        },
        isLoading: false,
        securityTools: []
    }
    
    async getSecurityTools(paging){
        return await axios.get(this.state.paging.next, {
            params: {
                limit: paging.limit,
            },
            headers: {
                Authorization:`Token ${getToken()}`
                // authorization:'Token 977746ca9e1fe6471aeaf7e8c708cb46226f38a1'
            }
        });
    }

    componentDidMount() {
        this.setState({isLoading:true});
        this.getSecurityTools(this.state.paging).then((response) => {
            this.setState({securityTools:response.data.results});
            this.setState({paging:{
                    next: response.data.next
                }});
            this.setState({isLoading: false});
        });


    }

    handleToScroll = (event) => {
        let element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            this.setState({isLoading: true});
            let lists = this.state.securityTools;
            this.getSecurityTools(this.state.paging).then((results) => {
                this.setState({paging:{
                        next: results.data.next
                    }});

                results.data.results.map((res) => {
                    lists.push(res);
                });

                this.setState({securityTools: lists});
                this.setState({isLoading: false});
            });

        }
    }

    handleClickDetail = (security_tool) => {
        
        this.props.handleOnClickModal(<DetailPopup security_tool={security_tool} />);
    }
    render() {
        return (
            <Scrollbars  style={{ height: 227 }}  onScroll={this.handleToScroll}> 
            <div className="security_tools_inner" >
                {/*<div className="security_tool_loader"></div>*/}
                <h2>Security Tools</h2>
                <table>
                    <tbody>
                    {this.state.securityTools.map((security_tool) => {
                       return( <tr key={security_tool.id}>
                            <td><a style={{cursor: 'pointer'}} onClick={() => this.handleClickDetail(security_tool)}>{security_tool.title}</a></td>
                            <td><span>{security_tool.version}</span></td>
                        </tr>);
                    })}
                    {/*{this.state.isLoading && <tr>*/}
                    {/*    <td><Loader /></td>*/}
                    {/*</tr>}*/}

                    </tbody>

                </table>

                {/*<div className="loading">Loading</div>*/}
            </div>
            </Scrollbars>
        );
    }
}


//export default SecurityTools;
export default PopupHOC(SecurityTools);