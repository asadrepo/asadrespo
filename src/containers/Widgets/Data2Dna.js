import React, { Component } from 'react';
import Data2DnaList from '../../components/Widgets/components/Data2Dna/Data2DnaList';
import Data2DnaForm from '../../components/Widgets/components/Data2Dna/Data2DnaForm';
import axiosClient from '../../shared/axiosClient';
import Loader from '../../components/common/Loader';
import {getUserId, getUserObject} from '../Auth/Auth';
import { ToastProvider, useToasts } from 'react-toast-notifications'
import WithToastMessagesHOC from '../../hoc/WithToastMessagesHOC';
import axios from 'axios';
import { Animated } from 'react-animated-css';
import AlertMessage from '../../components/common/AlertMessage';
import Pagination from "react-js-pagination";


class Data2Dna extends Component {

    state = {
        display: 'none',
        isWidgetShow: false,
        listData: [],
        malwareType: [],
        newsCategories: [],
        vulnerbilitiesVendor: [],
        vulnerbilitiesProducts: [],
        isLoader: false,
        isLoaderListing: false,
        filters: {
            module_name: '',
            user_id: getUserId(),
            attribute: '',
            attribute_value: '',
            severity: 0,
            is_notify: false,
            emails: getUserObject().email
        },
        listDataPagination: {
            total: 12,
            limit: 1,
            offset: 0,
            activePage: 1
        },
        saverity: {
            security_news: 1,
            patch: 1,
            vulnerabilities: 1,
            malware: 1

        },
        attribute: {
            security_news: 'category',
            patch: 'keywords',
            vulnerabilities: 'product',
            malware: 'type'
        },
        attribute_value: {
            security_news: '',
            patch: '',
            vulnerabilities: '',
            malware: ''
        },
        formState: false

    }


    onClickData2Dna = async () => {

        const { limit, offset, total } = this.state.listDataPagination;
        if (this.state.display === 'none') {
            this.setState({
                display: 'block',
                isLoader: true
            }, async () => {

                const [malwareType, newsCategories, vulnerbilitiesVendor, listData] = await Promise.all([
                    axiosClient.common.getMalwareType({limit: 1000}),
                    axiosClient.common.getNewsCategories({limit: 1000}),
                    axiosClient.common.getVulnerbilitiesVendor({limit: 1000}),
                    axiosClient.data2dna.list({ limit: limit, offset: offset, user_id: getUserId() })
                ]);


                this.setState({
                    listDataPagination: {
                        ...this.state.listDataPagination,
                        limit: listData.data.results.length
                    }
                });

                this.setState({
                    malwareType: malwareType.data.results,
                    newsCategories: newsCategories.data.results,
                    vulnerbilitiesVendor: vulnerbilitiesVendor.data.results,
                    listData: listData.data.results

                }, () => {
                    this.setState({
                        isLoader: false
                    })
                });
            });
        } else {
            setTimeout(() => {
                this.setState({
                    display: 'none'
                });
            }, 500)

        }

        //setTimeout(() => {
        this.setState({
            isWidgetShow: !this.state.isWidgetShow
        });
        // }, 1000)


    }

    handleOnChangeRange = (event) => {

        if (event.target.name === this.state.filters.module_name) {
            this.setState({
                filters: {
                    ...this.state.filters,
                    severity: parseInt(event.target.value)
                }
            });

        }

        this.setState({
            saverity: {
                ...this.state.saverity,
                [event.target.name]: event.target.value
            }
        });

    }

    handleOnChangeDropDown = (event) => {

        if (this.state.filters.module_name === event.target.name) {
            this.setState({
                filters: {
                    ...this.state.filters,
                    attribute_value: event.target.value
                }
            });
        }

        this.setState({
            attribute_value: {
                ...this.state.attribute_value,
                [event.target.name]: event.target.value
            }
        });

    }

    handleOnChangeRadioButton = (event) => {

        this.setState({
            filters: {
                ...this.state.filters,
                module_name: event.target.value,
                severity: parseInt(this.state.saverity[event.target.value]),
                attribute: this.state.attribute[event.target.value],
                attribute_value: this.state.attribute_value[event.target.value]
            }
        });

    }

    handleOnChangeVulnerbilityVendor = (event) => {

        axiosClient.common.getVulnerbilitiesProducts({ vendor_id: event.target.value }).then(

            response => {
                if (response.data.status === 200) {
                    this.setState({
                        vulnerbilitiesProducts: response.data.results
                    });
                }
            }
        ).catch(error => {

        });
    }

     setFilter(params) {

        return axiosClient.data2dna.setFilter(params);
       // return await axios.post(process.env.REACT_APP_API_URL + 'data2dna/set_filters/', params);
    }

    handleOnSubmit = () => {

        const addToast = this.props.addToast;
        const { module_name, attribute_value, attribute, severity, user_id, is_notify, emails } = this.state.filters;

        if (module_name === '') {
            addToast('Please select atleast one module to proceed.', { appearance: 'error', autoDismiss: true });
            return;
        }

        if (attribute_value === '') {
            addToast('Please select filter of module to proceed.', { appearance: 'error', autoDismiss: true });
            return;
        }

        this.setState({
            isLoaderListing: true
        });

        this.setFilter({
            module_name: module_name,
            attribute: attribute,
            attribute_value: attribute_value,
            severity: severity,
            is_notify: is_notify,
            emails: emails,
            user_id: user_id
        }).then(response => {
            console.log(response);
            addToast('Filter has been added successfully.', { appearance: 'success' });
            this.setState({ listData: response.data.results });
            this.setState({
                listDataPagination: {
                    ...this.state.listDataPagination,
                    total: response.data.count
                }
            });
            this.setState({
                isLoaderListing: false
            });
        }).catch(error => {
            console.log("in error data2dna");
            console.log(error.response);

            this.setState({
                isLoaderListing: false
            });

            addToast(<AlertMessage type={'danger'} message={error.response.data} />, { appearance: 'error' });

            // const object_size = Object.keys().length;

            // addToast('no ok tooke', {appearance: 'error'});
        });

        //    axiosClient.data2dna.setFilter(
        //         {
        //             module_name: module_name,
        //             attribute: attribute,
        //             attribute_value: attribute_value,
        //             severity: severity,
        //             is_notify: is_notify,
        //             emails: emails,
        //             user_id: user_id
        //         }
        //    ).then(response => {
        //         addToast('Ok tokke', {appearance: 'sucess'});
        //    }).catch(error => {
        //         addToast('no ok tooke', {appearance: 'error'});
        //    });

        //    console.log(this.state.filters);

    }

    handleOnChangeIsNotify = (event) => {
        this.setState({
            filters: {
                ...this.state.filters,
                is_notify: !this.state.filters.is_notify
            }
        })
    }

    handleOnChangeEmails = (event) => {
        this.setState({
            filters: {
                ...this.state.filters,
                emails: event.target.value
            }
        })
    }


    handleOnClickDelete = (id) => {

        const { limit, offset, total } = this.state.listDataPagination;

        axiosClient.data2dna.deleteFilter(id).then(response => {

            axiosClient.data2dna.list({ limit: limit, offset: offset, user_id: getUserId() }).then(response => {
                this.setState({
                    listData: response.data.results
                })
            });
        }).catch(error => {

        });
    }

    handlePageChange(pageNumber) {
        this.setState({
            listDataPagination: {
                ...this.state.listDataPagination,
                activePage: pageNumber
            }
        });

    }


    cardStyle = {
        display: this.state.isWidgetShow ? 'block' : 'none',
        transition: "all 1s ease-in",
    };

    render() {
        const { display, listData, malwareType, newsCategories, vulnerbilitiesVendor, vulnerbilitiesProducts } = this.state;
        const { limit, offset, total } = this.state.listDataPagination;
        return (

            <div id="hide_from_third">
                {/* DATA 2 DNA */}
                <div className="show_hide" style={{ display: display }} />
                <div className="sideNavi">

                    <div className="comon_side-navi-item item1 slideDiv" id="side_navi_show">
                        <div onClick={this.onClickData2Dna}>
                            <img src="images/settings_white.png" alt="Data2DNA" />Data 2 DNA
                </div>
                    </div>
                    <Animated className="side-navi-data" animationIn="slideInRight" animationOut="slideOutRight" isVisible={this.state.isWidgetShow} style={{ display: display }} >
                        {/* <div className="side-navi-data" style={{display: display}}> */}
                        <div className="comon-side-navi-tab" >
                            {/* <div>Data 2 DNA / User Setting</div> */}
                            <div className="data_dna_inner col-md-12">
                                {this.state.isLoader ? <Loader /> : <Data2DnaForm
                                    onChangeDropDown={this.handleOnChangeDropDown}
                                    onChangeRange={this.handleOnChangeRange}
                                    malwareType={malwareType}
                                    newsCategories={newsCategories}
                                    vulnerbilitiesVendor={vulnerbilitiesVendor}
                                    vulnerbilitiesProducts={vulnerbilitiesProducts}
                                    onChangeVulnerbilityVendor={this.handleOnChangeVulnerbilityVendor}
                                    onChangeRadioButton={this.handleOnChangeRadioButton}
                                    onSubmitHandler={this.state.formState}
                                    onChangeIsNotify={this.handleOnChangeIsNotify}
                                    isNotify={this.state.filters.is_notify}
                                    onChangeEmails={this.handleOnChangeEmails}



                                />}   {/* */}
                            </div>

                            <div className="col-md-12 add_row_div" style={{ maxWidth: '' }}>
                                {this.state.isLoaderListing ? <Loader size='small' /> : ''} Showing {limit} of 10 items
                                    <a onClick={this.handleOnSubmit} className="add_row" style={{ marginRight: '30px', cursor: 'pointer' }}><span>+ </span>Add </a>
                            </div>
                            <div className="col-md-12 data_dna_inner_table">
                                <div className="row">
                                    {this.state.isLoader ? <Loader /> : <Data2DnaList listData={listData} onClickDelete={this.handleOnClickDelete} />}
                                </div>
                            </div>
                        </div>
                        {/* </div> */}

                        {/* <ToastContainer position={ToastsContainerPosition.TOP_LEFT}/> */}


                    </Animated>
                </div>

            </div>);
    }
}



export default WithToastMessagesHOC(Data2Dna);