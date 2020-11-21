import React, {useState, useEffect} from 'react';
import {Link, Redirect, withRouter} from "react-router-dom";
import queryString from 'query-string';

const Search = (props) => {

    const [submit, setSubmit] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [categoriesParam, setCategoriesParam] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoriesParamFilter, setCategoriesParamFilter] = useState("sdfsdf");
    const [showFitlers, setShowFilters] = useState('');
    const [securityNews, setSecurityNews] = useState(true);
    const [securityBlogs, setSecurityBlogs] = useState(false);
    const [vulnerability, setVulnerability] = useState(false);
    const [exploit, setExploit] = useState(false);
    const [patch, setPatch] = useState(false);
    const [securityTools, setSecurityTools] = useState(false);
    const [threatIntel, setThreatIntel] = useState(false);
    const [ports, setPorts] = useState(false);

    //  let categories = ['security_news'];

    const onSubmitForm = (e) => {
        e.preventDefault();
        setSubmit(true);

        setShowFilters('');
        setCategoriesParamFilter(categoriesParam);
        
        props.searchKeyWord(keyword, categoriesParam);

        props.history.push(`/search?keyword=${keyword}&categories=${categoriesParam}`);
    }

    const onChangeKeyword = (event) => {
        setKeyword(event.target.value);
    }
    if (submit) {
        // console.log("herer you go");

        //setSubmit(false);
        // return <Redirect to={'/search'
        // } />
    }

    const handleShowFitlers = () => {
        if (showFitlers === '') {
            setShowFilters('show');
            return;
        }

        setShowFilters('');

    }


    const onChangeCategory = (event) => {
        console.log(event.target.checked);

        if (event.target.checked) {
            categories.push(event.target.value);
            setCategories(categories);
        }

        console.log(categories);
        if (!event.target.checked) {
            removeA(categories, event.target.value);
            setCategories(categories);
        }


        console.log(categories.toString());
        setCategoriesParam(categories.toString());


    }

    useEffect(() => {
        const values = queryString.parse(props.location.search);
        setKeyword(values.keyword);
        if(values.categories !== undefined){
            setCategoriesParamFilter(values.categories);
        }
        // var selectedCategories = values.categories;
        // // alert("Search categories", values.categories);
        // // alert("use effect");
        // // alert(values.categories);
        // if(values.categories !== undefined){
        //     alert("in condition over here");
        //     alert(values.categories);
        //     setCategoriesParamFilter(values.categories);
        //     alert(categoriesParamFilter);
        // }
        // alert(categoriesParamFilter);
        // alert(categoriesParamFilter.includes('security_news'));
        //setCategoriesParamFilter(values.categories);
        // console.log("Seach is calling");        
    }, []);


    function removeA(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }
    // const searchValues = queryString.parse(props.location.search);
    

    // if(searchValues !== undefined){

    // }

  
      
    return (

        <div className="navigation col-6 col-sm-6 col-xs-12 for-sm-xs-search" id="top-search" >
            <div className="row">
                <form className="myform md-form form-sm form-2 pl-0 custom_search" onSubmit={onSubmitForm}>
                    <div className="input-group">
                        <input className="form-control my-0 py-1" type="text" name={"keyword"} onClick={() => setShowFilters('')} required
                               placeholder="SearchResult" value={keyword} onChange={onChangeKeyword}

                               aria-label="SearchResult"/>
                        <div className="search_drpdn">

                            <div className="dropdown cq-dropdown" data-name="statuses">
                                <button className="btn-sm dropdown-toggle" type="button" id="dropdown1" 
                                        onClick={handleShowFitlers}
                                       
                                        data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="true"> Select Category <span className="caret"/>
                                </button>
                                <ul className={`searchDropdown dropdown-menu ${showFitlers}`} 
                                    aria-labelledby="dropdown1">
                                    <li>
                                        <label className="radio-btn"> <input type="checkbox" name="category"
                                                                             onChange={onChangeCategory}
                                                                             value="security_news"
                                                                           

                                                                            defaultChecked={(categoriesParamFilter.includes('security_news') ? true : 'sdfsdfsdf')}
                                                                            // defaultChecked={categoriesParamFilter.includes('security_news') ? true : false}
                                                                           /> Security 
                                            News {categoriesParamFilter.includes('security_news') ? 'sdfsdf' : "not"} </label>
                                    </li>
                                    <li>
                                        <label className="radio-btn"> <input type="checkbox" name="category"
                                                                             onChange={onChangeCategory}
                                                                             value="security_blogs"/> Security
                                            Blogs </label>
                                    </li>
                                    <li>
                                        <label className="radio-btn"> <input type="checkbox" name="category"
                                                                             onChange={onChangeCategory}
                                                                             value="vulnerability"/> Vulnerability
                                        </label>
                                    </li>
                                    <li>
                                        <label className="radio-btn"> <input type="checkbox" name="category"
                                                                             onChange={onChangeCategory}
                                                                             value="exploit"/> Exploit
                                        </label>
                                    </li>
                                    <li>
                                        <label className="radio-btn"> <input type="checkbox" name="category"
                                                                             onChange={onChangeCategory}
                                                                             value="patch"/> Patch
                                        </label>
                                    </li>
                                    <li>
                                        <label className="radio-btn"> <input type="checkbox" name="category"
                                                                             onChange={onChangeCategory}
                                                                             value="security_tools"/> Security
                                            Tools </label>
                                    </li>
                                    <li>
                                        <label className="radio-btn"> <input type="checkbox" name="category"
                                                                             onChange={onChangeCategory}
                                                                             value="threat_intel"/> Threat
                                            Intel </label>
                                    </li>
                                    <li>
                                        <label className="radio-btn"> <input type="checkbox" name="category"
                                                                             onChange={onChangeCategory}
                                                                             value="ports"/> Ports
                                        </label>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <button type={"submit"} className="search_btn">
                            {/*<Link to='/search'> SearchResult </Link>*/}
                            Search Result
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default withRouter(Search);