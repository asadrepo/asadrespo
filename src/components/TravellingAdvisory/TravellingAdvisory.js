import React, {Component} from 'react';
import TravellingAdvisoryList from "./components/TravellingAdvisoryList";
import Popup from "../common/Popup";
import TravellingAdvisoryDetail from "./components/TravellingAdvisoryDetail";
import axios from "axios";
import Pagination from "react-js-pagination";
import CountriesDropDown from "../common/CountriesDropDown";
import {getCountries} from "../../helpers";
import { Scrollbars } from 'react-custom-scrollbars';

class TravellingAdvisory extends Component {
    state = {
        isShowModal: false,
        travellingAdvisories: [],
        isLoading: false,
        pagination: {
            activePage: 1,
        },
        total: 0,
        limit: 10,
        offset: 0,
        countries: [],
        issuer_country_id: null,
        target_country_id: null,
        category_id: null,
        paginationLoading: false,
        categories: [
        ],
        categoryCount: 0,
        detail: ""


    }

    async getTravellingAdvisoryData(limit = this.state.limit,
                                    offset=this.state.offset,
                                    issuer_country_id = this.state.issuer_country_id,
                                    target_country_id = this.state.target_country_id,
                                    category_id = this.state.category_id
    ){
        return await axios.get(process.env.REACT_APP_API_URL+'advisory/?ordering=-id', {
            params: {
                limit: limit,
                offset: offset,
                issuer_country_id: issuer_country_id,
                target_country_id: target_country_id,
                category_id: category_id

            },
            headers: {
            }
        });
    }

    async getAdvisoryCategories() {
        return await axios.get(process.env.REACT_APP_API_URL+'advisory/category/', {
            params: {
                limit: 100
            },
            headers: {
                
            }
        });
    }


    componentWillMount() {
        this.setState({
            isLoading: true
        })
        this.getTravellingAdvisoryData().then(response => {
            this.setState({
                travellingAdvisories: response.data.results,
                total: response.data.count

            });
            this.setState({
                isLoading: false
            });
        });

        this.getAdvisoryCategories().then(response => {
            this.setState({
                categories: response.data.results
            })
        })

        getCountries().then(countries => {
            this.setState({countries: countries});
        })
    }

    handleOnClickDetail  = (detail) => {
        console.log(detail);
        this.setState({
            isShowModal: true,
            detail: <TravellingAdvisoryDetail content={detail} />
        })
    }
    handlePageChange(pageNumber) {
        let offset = (pageNumber * this.state.limit) - 10;

        this.setState({paginationLoading: true});
        this.getTravellingAdvisoryData(this.state.limit, offset).then(response => {
            this.setState({
                travellingAdvisories: response.data.results,
                total: response.data.count
            });
            this.setState({
                paginationLoading: false
            });
        });
        this.setState({
            activePage: pageNumber,
            offset: offset
        });

    }
    handeOnChangeIssueCountry = (event) => {
        // let filters = this.state.filters;
        this.setState({
            issuer_country_id: event.target.value
        });
        this.setState({isLoading: true});
        this.getTravellingAdvisoryData(this.state.limit, this.state.offset, event.target.value).then(response => {
            this.setState({
                travellingAdvisories: response.data.results,
                total: response.data.count
            });
            this.setState({
                isLoading: false
            });
        });

    }

    handeOnChangeTargetCountry = (event) => {
        this.setState({
            target_country_id: event.target.value
        });
        this.setState({isLoading: true});
        this.getTravellingAdvisoryData(
            this.state.limit,
            this.state.offset,
            this.state.issuer_country_id,
            event.target.value
        ).then(response => {
            this.setState({
                travellingAdvisories: response.data.results,
                total: response.data.count
            });
            this.setState({
                isLoading: false
            });
        });


    }

    handleOnChangeCategory = (event) => {
        this.setState({
            category_id: event.target.value
        });
        this.setState({isLoading: true});
        this.getTravellingAdvisoryData(
            this.state.limit,
            this.state.offset,
            this.state.issuer_country_id,
            this.state.target_country_id,
            event.target.value
        ).then(response => {
            this.setState({
                travellingAdvisories: response.data.results,
                total: response.data.count
            });
            this.setState({
                isLoading: false
            });
        });
    }

    handleOnClickCategoryPrevious = () => {

        this.setState({
            categoryCount: this.state.categoryCount  - 1
        });
    }

    handleOnClickCategoryNext = () => {

        this.setState({
            categoryCount: this.state.categoryCount + 1
        });
    }
    render() {
        return (
             <Scrollbars  style={{ height: 517 }} >
            <div className="travelling_advisory">
                 {/* <Scrollbars  style={{ height: 517 }} > */}
                <h4>Travelling Advisory</h4>

            
                <div className="row">
                    <div className="col-md-12 col-xs-12">

                        <CountriesDropDown
                            label={'Issuer Country'}
                            name={'issuer_country_id'}
                            id={'issuerCountry'}
                            onChange={this.handeOnChangeIssueCountry}
                            countries={this.state.countries}
                        />

                    </div>

                    <div className="col-md-12 col-xs-12">
                        <CountriesDropDown
                            label={'Target Country'}
                            name={'target_country_id'}
                            id={'targetCountry'}
                            onChange={this.handeOnChangeTargetCountry}
                            countries={this.state.countries}
                        />
                    </div>

                    <div className="col-md-12 col-xs-12">
                        <label htmlFor={'category'}>Category</label>
                        <select name={'category_id'} onChange={this.handleOnChangeCategory} id={'targetCountry'}>
                            <option key={0} value={''} >All Categories</option>
                            {this.state.categories.map(category => {
                                return (<option key={category.id} value={category.id}>{category.name}</option>);
                            })}
                        </select>

                        {/*<label htmlFor={'categoy'}>Category</label>*/}
                        {/*<div className="all"><span className="float-left" onClick={this.handleOnClickCategoryPrevious}> &lt; </span>*/}
                        {/*    {this.state.categories.length > 0 ? this.state.categories[this.state.categoryCount].name : 'All'}*/}
                        {/*    <span className="float-right" onClick={this.handleOnClickCategoryNext}> &gt; </span></div>*/}
                    </div>
                    <div className="col-md-12 col-xs-12">
                        <div className="separator_tr_ad" />
                    </div>
                    <div className="travelling_table table-responsive">
                       <TravellingAdvisoryList
                           onClickDetail={this.handleOnClickDetail}
                           travellingAdvisories={this.state.travellingAdvisories}
                           isLoading={this.state.isLoading}
                       />
                        {this.state.paginationLoading ? <div className="col-md-12 col-xs-12" style={{textAlign: 'center', color: 'white'}}>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                        </div> : ''}

                        <nav aria-label="Page navigation example">
                            <Pagination
                                innerClass={'pagination'}
                                itemClass={'page-item'}
                                linkClass={'page-link'}
                                activeLinkClass={'active'}
                                prevPageText={'<'}
                                nextPageText={'>'}
                                hideFirstLastPages={true}
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.limit}
                                totalItemsCount={this.state.total}
                                onChange={this.handlePageChange.bind(this)}
                            />
                        </nav>
                    </div>
                </div>
            {/* </Scrollbars> */}

           <Popup
               isShow={this.state.isShowModal}
               onClosePop={() => this.setState({isShowModal: false})}
               container={this.state.detail}
               id={'exampleModalCenter6'}

           />
            </div>
         </Scrollbars>
        );
    }
}

export default TravellingAdvisory;