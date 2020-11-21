import React, {Component} from 'react';
import Popup from "../common/Popup";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import LatestNews from "./components/LatestNews";
import Loader from "../common/Loader";
import axios from "axios";
import NewsDetail from "./components/NewsDetail";
import { Scrollbars } from 'react-custom-scrollbars';
import BlogNews from "./components/BlogNews";
import { getToken } from '../../containers/Auth/Auth';

class SecurityNews extends Component {

    state = {
        isModelshow: false,
        showAllNewModel: false,
        popUpTitle: 'Latest News',
        modelContent: "",
        isLoading: false,
        latestNews: [],
        allNews: [],
        blogNews: [],
        paging: {
            next:process.env.REACT_APP_API_URL+'news/latest_news/?ordering=-date',
            limit:50,
            total:0,
        },
        pagingAll: {
            next:process.env.REACT_APP_API_URL+'news/?ordering=-date',
            limit:50,
            total:0
        },
        pagingBlog: {
            next:process.env.REACT_APP_API_URL+'news/blog_news/?ordering=-date',
            page: 1,
            limit:50,
            total:0
        }
    };
    

    async getBlogNewsResult(page){
        return await axios.get(process.env.REACT_APP_API_URL+'news/blog_news/', {
            params: {
               /// per_page: limit,
                page:page
            },
            headers: {
                Authorization:`Token ${getToken()}`
            }
        });
    }

    async getNewDataResult(paging){
        return await axios.get(paging.next, {
           params: {
               limit: paging.limit,
           },
           headers: {
            Authorization:`Token ${getToken()}`
           }
       });

    };

    componentDidMount() {

        this.setState({isLoading:true});

        // axiosClient.securityNews.latestNewsList().then(
        //     latest_news => {
        //             this.setState({latestNews:latest_news.data.results});

        //    if(latest_news.data.count  > this.state.paging.limit){
        //        this.setState({
        //            paging:{
        //                 next: latest_news.data.next,
        //                 total: latest_news.data.count
        //             }
        //        });
        //    }

        //    this.setState({isLoading: false});
        //     }
        // );



        this.getNewDataResult(this.state.paging).then((response) => {
           this.setState({latestNews:response.data.results});

           if(response.data.count  > this.state.paging.limit){
               this.setState({
                   paging:{
                        next: response.data.next,
                        total: response.data.count
                    }
               });
           }

           this.setState({isLoading: false});
        });

        this.getNewDataResult(this.state.pagingAll).then((response) => {
            this.setState({allNews:response.data.results});
            if(response.data.count  > this.state.pagingAll.limit){
                this.setState(
                    {
                    pagingAll:{
                        next: response.data.next,
                        total: response.data.count
                    }
                });
            }
            this.setState({isLoading: false});
        });


        // axiosClient.securityNews.blogNewsList({
        //     page: this.state.pagingBlog.page
        // }).then(
        //     blogNews => {
        //             this.setState({blogNews:blogNews.data.results});
        //             this.setState(
        //                 {
        //                     isLoading: false,
        //                     pagingBlog: {
        //                         total: blogNews.headers.total_records,
        //                         page: 1
        //                     }
        //                 }
        //             );
        //     }
        // );

        this.getBlogNewsResult(this.state.pagingBlog.page).then((response) => {

            this.setState({blogNews:response.data.results});

            console.log(response.headers);
            this.setState(
                {
                    isLoading: false,
                    pagingBlog: {
                        total: response.headers.total_records,
                        page: 1
                    }
                }
            );

         });



    }

    handleonClosePop = () => {
        this.setState({isModelshow:false});
    };

    handleOnClickSecurityLatestNewsModal = (news, new_type) => {
        this.setState({isModelshow:true, popUpContainer: news});
    };

    handleOnTabChange = (type) => {
        if(type==='latest-news'){
            this.setState({popUpTitle: 'Latest News'});
        } else if(type === 'all-news') {
            this.setState({popUpTitle: 'All News'});
        } else if(type === 'blog-news'){
            this.setState({popUpTitle: 'Blog News'});
        }
    };

    handleOnClickAllNews = () => {
        this.setState({showAllNewModel:true});
    };

    handleToScrollAllNews = (event) => {
        let element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            let lists = this.state.allNews;
            if(lists.length >= this.state.pagingAll.total)
                return;

            this.setState({isLoading: true});
            this.getNewDataResult(this.state.pagingAll).then((results) => {
                this.setState({
                    pagingAll:{
                        next: results.data.next
                    }
                });
                results.data.results.map((res) => {
                    lists.push(res);
                });
                this.setState({allNews: lists});
                this.setState({isLoading: false});
            });
        }
        return;
    }

    handleToScrollBlogNews = (event) => {
        let element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            let listBlog = this.state.blogNews;
            let page = this.state.pagingBlog.page + 1;

            if(listBlog.length >= this.state.pagingBlog.total)
                return;

            this.setState({isLoading: true});
            this.getBlogNewsResult(page).then((response) => {
                console.log(response.headers);
                this.setState(
                    {
                        pagingBlog: {
                            total: response.headers.total_records,
                            page: page
                        }
                    }
                );

                response.data.results.map((res) => {
                    listBlog.push(res);
                });
                this.setState({blogNews: listBlog});
                this.setState({isLoading: false});
            });
        }
    }


    handleToScroll = (event) => {

        let element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {

            if(this.state.popUpTitle === 'Latest News'){
                let lists = this.state.latestNews;

                if(lists.length >= this.state.paging.total)
                    return;

                this.setState({isLoading: true});
                this.getNewDataResult(this.state.paging).then((results) => {
                    this.setState({paging:{
                            next: results.data.next
                        }});
                    results.data.results.map((res) => {
                        lists.push(res);
                    });
                    this.setState({latestNews: lists});
                    this.setState({isLoading: false});
                });

            }

            if(this.state.popUpTitle === 'All News')
            {
                let lists = this.state.allNews;
                if(lists.length >= this.state.pagingAll.total)
                    return;

                this.setState({isLoading: true});
                this.getNewDataResult(this.state.pagingAll).then((results) => {
                    this.setState({
                        pagingAll:{
                            next: results.data.next
                        }
                    });
                    results.data.results.map((res) => {
                        lists.push(res);
                    });
                    this.setState({allNews: lists});
                    this.setState({isLoading: false});
                });
            }

            if(this.state.popUpTitle === 'Blog News')
            {

                let blogLimit = this.state.blogNews.length + 25;

                this.setState({isLoading: true});
                this.getBlogNewsResult(blogLimit).then((results) => {

                    this.setState({blogNews: results.data.results});
                    this.setState({isLoading: false});
                    
                });

            }
        }
    };

    render() {
        return (
            <div className="col-md-4 security_new_section">

            <h2>Security News</h2>
                <Tab.Container defaultActiveKey="latest-news">
                    <Row as="ul" className="nav nav-tabs">
                        <Nav as="li" className="nav-item">
                            <Nav.Link className="nav-link" eventKey="latest-news" onSelect={() => this.handleOnTabChange('latest-news')}>Latest News</Nav.Link>
                            <Nav.Link className="nav-link" eventKey="all-news" onSelect={() => this.handleOnTabChange('all-news')}>All News</Nav.Link>
                            <Nav.Link className="nav-link" eventKey={'blog-news'} onSelect={() => this.handleOnTabChange('blog-news')}>Blog News</Nav.Link>
                        </Nav>
                        {this.state.isLoading ? <Loader/> : ''}
                    </Row>
                    <Tab.Content className="security_news_tab_inner" >

                        <Tab.Pane eventKey="latest-news" >
                            <Scrollbars style={{ height: 500 }}>
                            {<LatestNews
                                onModelClick={this.handleOnClickSecurityLatestNewsModal}
                                latestNews={this.state.latestNews}

                            />}
                            </Scrollbars>

                        </Tab.Pane>
                        <Tab.Pane eventKey="all-news" >
                            <Scrollbars style={{ height: 500 }}  onScroll={this.handleToScrollAllNews}>
                            <LatestNews
                                onModelClick={this.handleOnClickSecurityLatestNewsModal}
                                latestNews={this.state.allNews}
                               />
                            </Scrollbars>
                            {/*<AllNews  onModelClick={this.handleOnClickSecurityLatestNewsModal} />*/}
                        </Tab.Pane>

                        <Tab.Pane eventKey="blog-news" >
                            <Scrollbars style={{ height: 490 }}  onScroll={this.handleToScrollBlogNews}>
                            <BlogNews
                                blogNews={this.state.blogNews}
                            />
                            </Scrollbars>
                        </Tab.Pane>

                    </Tab.Content>
                </Tab.Container>
                <Popup isShow={this.state.isModelshow}
                       onClosePop={this.handleonClosePop}
                       container={<NewsDetail title={this.state.popUpTitle}
                                              detail={this.state.popUpContainer}
                       />}
                />

        </div>
        );
    }
}

export default SecurityNews;