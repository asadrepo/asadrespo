import React, {Component} from 'react';
import { Tab, Nav } from 'react-bootstrap';
import queryString from 'query-string';
import { Header } from '../../components/partials/Header';
import { Footer } from '../../components/partials/Footer';
import axiosClient from '../../shared/axiosClient';
import { dateFormat, capitalizeText } from '../../helpers';
import Pagination from "react-js-pagination";
import PopupHOC from '../../hoc/PopupHOC';
import NewsDetail from '../../components/SecurityNews/components/NewsDetail';
import PatchDetail from '../../components/Patch/components/PatchDetail';
import VulnerabilityDetail from '../../components/Vulnerabilities/components/VulnerabilityDetail';
import ThreatIntelDetail from '../../components/ThreatIntel/ThreatIntelDetail';
import Loader from '../../components/common/Loader';


class SearchResult extends Component {
    
    state = {
        keyword: "",
        currentModule: 'security_news',
        categories: ['security_news', 'security_blogs'],
        isLoading: false,
        filters: {
            count_20_19: 0,
            count_18_17: 0,
            count_16_15: 0,
            count_14_13: 0,
        },
        selectedFilter: 0,
        security_news: {
            data: [],
            pagination: {
                total: 0,
                limit: 20,
                activePage: 1,
                offset: 0
            }
        },
        vulnerability: {
            data: [],
            pagination: {
                total: 0,
                limit: 20,
                activePage: 1,
                offset: 0
            }
        },
        ports: {
            data: [],
            pagination: {
                total: 0,
                limit: 20,
                activePage: 1,
                offset: 0
            }
        },
        patch: {
            data: [],
            pagination: {
                total: 0,
                limit: 20,
                activePage: 1,
                offset: 0
            }
        },
        exploit: {
            data: [],
            pagination: {
                total: 0,
                limit: 20,
                activePage: 1,
                offset: 0
            }
        },
        threat_intel: {
            data: [],
            pagination: {
                total: 0,
                limit: 20,
                activePage: 1,
                offset: 0
            }
        },
        security_tools: {
            data: [],
            pagination: {
                total: 0,
                limit: 20,
                activePage: 1,
                offset: 0
            }
        },
        security_blogs: {
            data: [],
            pagination: {
                total: 0,
                limit: 20,
                activePage: 1,
                offset: 1
            }
        }
    }

     searchByModule(query, offset = 0, module='security_news', from_year = 0, to_year = 0) {
        // const {module} = this.state;
        this.setState({
            isLoading: true
        });
        let moduleKey = module === 'security_news' ? null : module;

        let filters = {
            query: query,
            limit: this.state[module].pagination.limit,
            offset: offset,
            module: moduleKey
        }



        if(from_year > 0 && to_year > 0){
            filters = {
                query: query,
                limit: this.state[module].pagination.limit,
                offset: offset,
                module: moduleKey,
                from_year: from_year,
                to_year: to_year
            } 
        }


        if(module === 'security_blogs'){
            filters.page = offset
        }

     
        axiosClient.globalSearch.searchByKeyword(
            filters
        ).then(
            response => {
        
            if(module !== 'security_blogs'){
                this.setState({
                    [module]: {
                         ...this.state[module],
                        data:response.data.results.data,
                        pagination: {
                         ...this.state[module].pagination,
                         total: response.data.count
                        }
                    } 
                });
 
 
                this.setState({
                    
                    filters: {
                     count_20_19: response.data.results.count_20_19,
                     count_18_17: response.data.results.count_18_17,
                     count_16_15: response.data.results.count_16_15,
                     count_14_13: response.data.results.count_14_13,
                    }
                })
            } else {
               
                this.setState({
                    [module]: {
                         ...this.state[module],
                        data:response.data.results.data,
                        pagination: {
                         ...this.state[module].pagination,
                         total: parseInt(response.data.count)
                        }
                    } 
                });

 
                this.setState({
                    
                    filters: {
                     count_20_19: response.data.count_20_19,
                     count_18_17: response.data.count_18_17,
                     count_16_15: response.data.count_16_15,
                     count_14_13: response.data.count_14_13,
                    }
                })
            }

            this.setState({
                isLoading: false
            });
              
            }
        );

        console.log(this.state[module]);


    }



    componentWillMount(){
        
        const values = queryString.parse(this.props.location.search)
        console.log("this is component did mount");
        console.log(values.keyword); 

        const {security_news} = this.state;

        this.searchByModule(values.keyword);

        this.setState({
            categories: values.categories.split(',')
        });



        console.log(this.state.categories);

        // axiosClient.globalSearch.searchByKeyword(
        //     {
        //         query: values.keyword,
        //         limit: security_news.pagination.limit,
        //         offset: security_news.pagination.offset
        //     }
        // ).then(
        //     response => {
           
        //        this.setState({
        //            security_news: {
        //                 ...this.state.security_news,
        //                data:response.data.results,
        //                pagination: {
        //                 ...this.state.security_news.pagination,
        //                 total: response.data.count
        //                }
        //            } 
        //        })
        //     }
        // );
        this.setState({
            keyword: values.keyword
        });
    }

     handleSecurityNewsPagination (module, pageNumber){
      

         let offset = (pageNumber * this.state[module].pagination.limit) - 20;

         if(module === 'security_blogs'){
             offset = pageNumber;
         }

        this.setState({
            [module]: {
                ...this.state[module],
                pagination: {
                    ...this.state[module].pagination,
                    activePage: pageNumber,
                    offset: offset
                }
            }
        }, this.searchByModule(this.state.keyword, offset, module));

       

    }

    handleSearchByKeyword = (keyword) => {

        console.log("hti si search form search result componet");
        console.log(keyword);

        this.setState({
            keyword: keyword,

        });

        this.searchByModule(keyword, this.state[this.state.currentModule].pagination.offset, this.state.currentModule);
    }

    handleOnSelectTab = (module = 'security_news') => {


        console.log(module);
     
            this.searchByModule(this.state.keyword, this.state[module].pagination.offset, module);
      //  console.log(this.state[module].data.length);
      //  if(this.state[module].data.length < 1){
           
       //    }

        this.setState({currentModule: module});
                                    
    }

    handleOnClick = (module, data) => {

      if(module === 'security_news'){
        this.props.handleOnClickModal(<NewsDetail title="Security News" detail={data} />);
        return;
      }

      if(module === 'patch'){
        this.props.handleOnClickModal(<PatchDetail detail={data}/>);
        return;
      }

      if(module === 'vulnerability'){
        this.props.handleOnClickModal(<VulnerabilityDetail detail={data}/>);
        return;
      }

      if(module === 'threat_intel'){
        this.props.handleOnClickModal(<ThreatIntelDetail threat_intel={data} />);
        return;
      }

      if(module === 'ports'){
          
          //this.props.handleOnClickModal() );
      }

    }

    handleOnClickFilters = (from_year, to_year) => {
        console.log(this.state.currentModule);
        this.searchByModule(this.state.keyword, 0, this.state.currentModule, from_year, to_year);
        this.setState({
            selectedFilter: from_year.toString()+to_year.toString()
        });

        console.log(this.state.selectedFilter);
        

    }

    render() {
        const {security_news, vulnerability, ports, exploit, patch, security_tool, threat_intel, security_blogs, security_tools, isLoading} = this.state;

        const values = queryString.parse(this.props.location.search);
        const categoriesTabs = values.categories.split(',');
        return (
            <React.Fragment>
            <Header searchKeyWordData={this.handleSearchByKeyword}/>
                <div className="row srs_margin">
                <div className="col-2 search_result_section">
                    <div className="container">
                        <h3>Filter by Year</h3>
                        <ul>
                            <li><a style={{cursor: 'pointer'}} className={this.state.selectedFilter === "20192020" ? 'active' : ''} onClick={() => this.handleOnClickFilters(2019, 2020)}>2020 - 2019 </a><span>({this.state.filters.count_20_19})</span></li>
                            <li><a style={{cursor: 'pointer'}} className={this.state.selectedFilter === "20172018" ? 'active' : ''} onClick={() => this.handleOnClickFilters(2017, 2018)}>2018 - 2017 </a><span>({this.state.filters.count_18_17})</span></li>
                            <li><a style={{cursor: 'pointer'}} className={this.state.selectedFilter === "20152016" ? 'active' : ''} onClick={() => this.handleOnClickFilters(2015, 2016)}>2016 - 2015 </a><span>({this.state.filters.count_16_15})</span></li>
                            <li><a style={{cursor: 'pointer'}} className={this.state.selectedFilter === "20132014" ? 'active' : ''} onClick={() => this.handleOnClickFilters(2013, 2014)}>2014 - 2013 </a><span>({this.state.filters.count_14_13})</span></li>
                            {/* <li><a >2011 - 2010 </a><span>(1227)</span></li> */}
                        </ul>
                    </div>
                </div>
                <div className="col-10 search_result_right_section">
                    <Tab.Container defaultActiveKey="security_news">
                        <Nav as="ul" className="nav nav-tabs">

                            
                        {categoriesTabs.map((categories, index) => {
                            return <Nav key={index}  as="li" className="nav-item">
                            <Nav.Link className="nav-link" onSelect={() => this.handleOnSelectTab(categories)} eventKey={categories} style={{textTransform: 'capitalize'}}>{capitalizeText(categories)}</Nav.Link>
                                    </Nav>;
                        })}
                        {/* {this.state.categories.forEach((category, index) => {
                            return  <Nav as="li" className="nav-item">
                            <Nav.Link className="nav-link" onSelect={() => this.handleOnSelectTab(category)} eventKey={category}>{category}</Nav.Link>
                        </Nav>
                        })} */}
                            

                         
                            {/* <Nav as="li" className="nav-item">
                    <Nav.Link className="nav-link" onSelect={() => this.handleOnSelectTab('security_news')} eventKey={'security_news'}>Security News {this.state.categories}</Nav.Link>
                            </Nav>

                            <Nav as="li" className="nav-item">
                                <Nav.Link className="nav-link" onSelect={() => this.handleOnSelectTab('security_blog')} eventKey={'security_blog'}>Security Blogs</Nav.Link>
                            </Nav>

                            <Nav as="li" className="nav-item">
                                <Nav.Link className="nav-link" onSelect={() => this.handleOnSelectTab('vulnerability')} eventKey={'vulnerability'}>Vulnerabilities</Nav.Link>
                            </Nav>

                            <Nav as="li" className="nav-item">
                                <Nav.Link className="nav-link" onSelect={() => this.handleOnSelectTab('exploit')} eventKey={'exploit'}>Exploit</Nav.Link>
                            </Nav>

                            <Nav as="li" className="nav-item">
                                <Nav.Link className="nav-link" onSelect={() => this.handleOnSelectTab('patch')} eventKey={'patch'}>Patch</Nav.Link>
                            </Nav>

                            <Nav as="li" className="nav-item">
                                <Nav.Link className="nav-link" onSelect={() => this.handleOnSelectTab('security_tools')} eventKey={'security_tools'}>Security Tools</Nav.Link>
                            </Nav>

                            <Nav as="li" className="nav-item">
                                <Nav.Link className="nav-link" onSelect={() => this.handleOnSelectTab('threat_intel')} eventKey={'threat_intel'}>Threat Intel</Nav.Link>
                            </Nav>

                            <Nav as="li" className="nav-item">
                                <Nav.Link className="nav-link" onSelect={() => this.handleOnSelectTab('ports')} eventKey={'ports'}>Ports</Nav.Link>
                            </Nav>  */}
                           

                        </Nav>

                        <Tab.Content as="div" className="tab-pane">
                        <Tab.Pane eventKey="security_news">
                           {isLoading ? <Loader /> : 
                                    <React.Fragment>
                                    <nav aria-label="Page navigation example">
                                        <Pagination
                                            innerClass={'pagination'}
                                            itemClass={'page-item'}
                                            linkClass={'page-link'}
                                            activeLinkClass={'active'}
                                            prevPageText={'Previous'}
                                            nextPageText={'Next'}
                                            hideFirstLastPages={true}
                                            pageRangeDisplayed={10}
                                            activePage={security_news.pagination.activePage}
                                            itemsCountPerPage={security_news.pagination.limit}
                                            totalItemsCount={security_news.pagination.total}
                                            onChange={this.handleSecurityNewsPagination.bind(this, 'security_news')}
                                        />
                                    </nav>
                                    <h3>Security News</h3>
                                    {security_news.data.map(security_new => {
                                        return (
                                        <p key={security_new.id}><a style={{cursor:'pointer'}} onClick={() => this.handleOnClick('security_news', security_new)} >{security_new.title}</a> <span className="float-right">{dateFormat(security_new.date)}</span></p>
                                        )
                                    })}
                            
                            </React.Fragment>
                                }
                                </Tab.Pane> 
                           
                            <Tab.Pane eventKey="vulnerability">
                            {isLoading ? <Loader /> : <React.Fragment>
                            <nav aria-label="Page navigation example">
                                     <Pagination
                                            innerClass={'pagination'}
                                            itemClass={'page-item'}
                                            linkClass={'page-link'}
                                            activeLinkClass={'active'}
                                            prevPageText={'Previous'}
                                            nextPageText={'Next'}
                                            hideFirstLastPages={true}
                                            pageRangeDisplayed={10}
                                            activePage={vulnerability.pagination.activePage}
                                            itemsCountPerPage={vulnerability.pagination.limit}
                                            totalItemsCount={vulnerability.pagination.total}
                                            onChange={this.handleSecurityNewsPagination.bind(this, 'vulnerability')}
                                        />
                                        </nav>
                                        <h3>Vulnerabilities</h3>
                                        {vulnerability.data.map(vul => {
                                        return (
                                        <p key={vul.id}><a href={vul.link} onClick={() => this.handleOnClick('vulnerability', vul)} target="_blank">{vul.title}</a> <span className="float-right">{dateFormat(vul.date)}</span></p>
                                        )
                                    })}
                                      </React.Fragment>} 
                            
                            </Tab.Pane>

                            <Tab.Pane eventKey="ports">
                            {isLoading ? <Loader /> : <React.Fragment>
                            <nav aria-label="Page navigation example">
                                     <Pagination
                                            innerClass={'pagination'}
                                            itemClass={'page-item'}
                                            linkClass={'page-link'}
                                            activeLinkClass={'active'}
                                            prevPageText={'Previous'}
                                            nextPageText={'Next'}
                                            hideFirstLastPages={true}
                                            pageRangeDisplayed={10}
                                            activePage={ports.pagination.activePage}
                                            itemsCountPerPage={ports.pagination.limit}
                                            totalItemsCount={ports.pagination.total}
                                            onChange={this.handleSecurityNewsPagination.bind(this, 'ports')}
                                        />
                                        </nav>
                                        <h3>Ports</h3>
                                        {ports.data.map(port => {
                                        return (
                                        <p key={port.id}><a onClick={() => this.handleOnClick('ports', port)}  target="_blank">{port.service_name}</a></p>
                                        )
                                    })}
                                      </React.Fragment>}
                            </Tab.Pane>

                            <Tab.Pane eventKey="exploit">
                            {isLoading ? <Loader /> : <React.Fragment>
                            <nav aria-label="Page navigation example">
                                     <Pagination
                                            innerClass={'pagination'}
                                            itemClass={'page-item'}
                                            linkClass={'page-link'}
                                            activeLinkClass={'active'}
                                            prevPageText={'Previous'}
                                            nextPageText={'Next'}
                                            hideFirstLastPages={true}
                                            pageRangeDisplayed={10}
                                            activePage={exploit.pagination.activePage}
                                            itemsCountPerPage={exploit.pagination.limit}
                                            totalItemsCount={exploit.pagination.total}
                                            onChange={this.handleSecurityNewsPagination.bind(this, 'exploit')}
                                        />
                                        </nav>
                                        <h3>Exploit</h3>
                                        {exploit.data.map(exp => {
                                        return (
                                        <p key={exp.id}><a onClick={() => this.handleOnClick('exploit', exp)} target="_blank">{exp.service_name}</a></p>
                                        )
                                    })}
                                      </React.Fragment>}
                            </Tab.Pane>

                            <Tab.Pane eventKey="patch">
                                {isLoading ? <Loader /> : <React.Fragment>
                            <nav aria-label="Page navigation example">
                                     <Pagination
                                            innerClass={'pagination'}
                                            itemClass={'page-item'}
                                            linkClass={'page-link'}
                                            activeLinkClass={'active'}
                                            prevPageText={'Previous'}
                                            nextPageText={'Next'}
                                            hideFirstLastPages={true}
                                            pageRangeDisplayed={10}
                                            activePage={patch.pagination.activePage}
                                            itemsCountPerPage={patch.pagination.limit}
                                            totalItemsCount={patch.pagination.total}
                                            onChange={this.handleSecurityNewsPagination.bind(this, 'patch')}
                                        />
                                        </nav>
                                        <h3>Patch</h3>
                                        {patch.data.map(pat => {
                                        return (
                                        <p key={pat.id}><a onClick={() => this.handleOnClick('patch', pat)}  target="_blank">{pat.title}</a></p>
                                        )
                                    })}
                                     </React.Fragment>}
                            </Tab.Pane>

                            <Tab.Pane eventKey="security_tools">
                            {isLoading ? <Loader /> : <React.Fragment>
                            <nav aria-label="Page navigation example">
                                     <Pagination
                                            innerClass={'pagination'}
                                            itemClass={'page-item'}
                                            linkClass={'page-link'}
                                            activeLinkClass={'active'}
                                            prevPageText={'Previous'}
                                            nextPageText={'Next'}
                                            hideFirstLastPages={true}
                                            pageRangeDisplayed={10}
                                            activePage={security_tools.pagination.activePage}
                                            itemsCountPerPage={security_tools.pagination.limit}
                                            totalItemsCount={security_tools.pagination.total}
                                            onChange={this.handleSecurityNewsPagination.bind(this, 'security_tools')}
                                        />
                                        </nav>
                                        <h3>Security Tools</h3>
                                        {security_tools.data.map(security_tool => {
                                        return (
                                        <p key={security_tool.id}><a onClick={() => this.handleOnClick('security_tools', security_tool)}  target="_blank">{security_tool.title}</a></p>
                                        )
                                    })}
                                  </React.Fragment>}    
                            </Tab.Pane>



                            <Tab.Pane eventKey="threat_intel">
                            {isLoading ? <Loader /> : <React.Fragment>
                            <nav aria-label="Page navigation example">
                                     <Pagination
                                            innerClass={'pagination'}
                                            itemClass={'page-item'}
                                            linkClass={'page-link'}
                                            activeLinkClass={'active'}
                                            prevPageText={'Previous'}
                                            nextPageText={'Next'}
                                            hideFirstLastPages={true}
                                            pageRangeDisplayed={10}
                                            activePage={threat_intel.pagination.activePage}
                                            itemsCountPerPage={threat_intel.pagination.limit}
                                            totalItemsCount={threat_intel.pagination.total}
                                            onChange={this.handleSecurityNewsPagination.bind(this, 'threat_intel')}
                                        />
                                        </nav>
                                        <h3>Threat Intel</h3>
                                        {threat_intel.data.map(thr_int => {
                                        return (
                                        <p key={thr_int.id}><a onClick={() => this.handleOnClick('threat_intel', thr_int)} target="_blank">{thr_int.exploit}</a></p>
                                        )
                                    })}
                                      </React.Fragment>}  
                            </Tab.Pane>

                            <Tab.Pane eventKey="security_blogs">
                            {isLoading ? <Loader /> : <React.Fragment>
                            <nav aria-label="Page navigation example">
                                     <Pagination
                                            innerClass={'pagination'}
                                            itemClass={'page-item'}
                                            linkClass={'page-link'}
                                            activeLinkClass={'active'}
                                            prevPageText={'Previous'}
                                            nextPageText={'Next'}
                                            hideFirstLastPages={true}
                                            pageRangeDisplayed={10}
                                            activePage={security_blogs.pagination.activePage}
                                            itemsCountPerPage={security_blogs.pagination.limit}
                                            totalItemsCount={security_blogs.pagination.total}
                                            onChange={this.handleSecurityNewsPagination.bind(this, 'security_blogs')}
                                        />
                                        </nav>
                                        <h3>Security Blogs</h3>
                                        {security_blogs.data.map((blog, index) => {
                                        return (
                                            <p key={index}><a href={blog.link} onClick={() => this.handleOnClick('security_blogs')} target="_blank">{blog.title}</a> <span className="float-right">{dateFormat(blog.date)}</span></p>
                                        )
                                    })}
                                      </React.Fragment>}  
                            </Tab.Pane>
                        </Tab.Content>

                    </Tab.Container>
                   
                </div>
            </div>
            <Footer />
            </React.Fragment>
        );
    }
}

export default PopupHOC(SearchResult);