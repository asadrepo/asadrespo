import React, {Component} from 'react';
import MainLayout from '../Layout/MainLayout';
import Profile from '../../components/Settings/Profile';
import Payment from '../../components/Settings/Payment';
import axiosClient from '../../shared/axiosClient';
import ChangePassword from '../../components/Settings/ChangePassword';

class Settings extends Component {
    state = {
        profile: true,
        payment: false,
        change_password: false,
        countries: [],
        packages: []
    }

    componentDidMount(){
        axiosClient.common.getCountries().then(response => {
            this.setState({countries: response.data.results});
        });

        axiosClient.common.getPackages().then(response => {
            this.setState({packages: response.data.results});
        })
    }

    
    render() {
        return (
            <MainLayout>
                <div className="login_screen_bg">
                    <div className="col-12">
                        <div className="container">
                            <div className="row">
                                <div className="col-4">
                                    <div className="settings_left_section">
                                        <ul>
                                            <li><h2>Settings</h2></li>
                                            <li><a style={{cursor: 'pointer'}} onClick={() => this.setState({profile: true, payment: false, change_password: false})}>Edit Profile</a></li>
                                            <li><a style={{cursor: 'pointer'}} onClick={() => this.setState({profile: false, payment: false, change_password: true})}>Change Password</a></li>
                                            <li><a style={{cursor: 'pointer'}} onClick={() => this.setState({profile:false, payment: true, change_password: false})}>Payment Details</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="settings_right_section">
                                       <Profile displayValue={this.state.profile} countries={this.state.countries} />
                                       <ChangePassword displayValue={this.state.change_password} />
                                       <Payment displayValue={this.state.payment} packages={this.state.packages} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }
}

export default Settings;