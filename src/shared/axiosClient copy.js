import axios from "axios";
import {getToken} from "../containers/Auth/Auth";
import Login from "../containers/Auth/Login";
import {getCountries} from "../helpers";
import swal from "sweetalert";
import React from 'react';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        //'authorization' : 'Token '+getToken()
        //'Authorization': 'Token ' + getToken(),
        'Authorization': 'Token ' + getToken(),
        //"Access-Control-Allow-Origin": "*"
    },
});

apiClient.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
      //  window.location.reload();
        return Promise.reject(error)
    }

    if(429 === error.response.status){
        var message = error.response.data.detail;
        var timeSeconds = message.match(/(\d+)/); 
     
        swal({
            title: error.response.statusText,
            text: error.response.data.detail,
            icon: 'error'
        }).then(value => {
            if(value){
                window.location = 'http://localhost:3000';
            }
        });
        return Promise.reject(error);
    }
});

const apiClientUnAuth = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

async function get(url, params) {
    return await apiClient.get(url, {
        params: params,
    });
}

async function post(url, params) {
    return await apiClient.post(url, params);
}

async function postWithJson(url, params) {
    return await apiClient.post(url, params, {
        headers: {
            'Content-Type': 'application/json',

        }
    });
}

async function put(url, params) {
    return await apiClient.put(url, params);
}

// axios.get(process.env.REACT_APP_API_URL+'countries/', {
//     params: {},
//     headers: {
//     }
// }).then(response => {
// this.setState({countries: response.data.results});
// });
export default {
    common: {
        async getCountries(params = {}) {
            return await axios.get(process.env.REACT_APP_API_URL + "countries/", {
                params: params,
            });
        },
        async getPackages(params = {}) {
            return axios.get(process.env.REACT_APP_API_URL + "packages/", {
                params: params,
            });
        },
        async getMalwareType(params = {}) {
            return axios.get(process.env.REACT_APP_API_URL + "malware/type/", {
                params: params,
            });
        },
        async getNewsCategories(params = {limit: 100}) {
            return axios.get(process.env.REACT_APP_API_URL + "news/categories/", {
                params: params,
            });
        },
        async getVulnerbilitiesVendor(params = {}) {
            return axios.get(
                process.env.REACT_APP_API_URL + "vulnerabilities/vendors/",
                {
                    params: params,
                }
            );
        },
        async getVulnerbilitiesProducts(params = {}) {
            return axios.get(
                process.env.REACT_APP_API_URL + "vulnerabilities/products/by_vendor/",
                {
                    params: params,
                }
            );
        },
    },
    auth: {
        async login(params = {}) {
            //  return post("accounts/login/", params);
            return await apiClientUnAuth.post('accounts/login/', params);
        },
        resetPassword(user_id, token, params) {
            return post(
                "accounts/reset-password-confirm/" + user_id + "/" + token + "/",
                params
            );
        },
        async signup(params = {}) {
            // return post("accounts/signup/", params);
            return await apiClientUnAuth.post('accounts/signup/', params);
        },

        async capture(params = {}) {
            // return post("accounts/capture/", params);
            return await apiClientUnAuth.post('accounts/capture/', params);
        },
        async accountActivate(user_id, token, params){
            return await apiClientUnAuth.get("accounts/activate/" + user_id + "/" + token + "/?uid=" + user_id + "&token=" + token + "/", params);
        }
    },
    securityNews: {
        async latestNewsList(params = {}) {
            return await apiClient.get("news/latest_news/?sort=-id", {
                params: params,
            });
        },
        async allNewsList(params = {}) {
            return await apiClient.get("news/", {
                params: params,
            });
        },
        async blogNewsList(params) {
            // return get('news/blog_news/', params);
            return await apiClient.get("news/blog_news/", {
                params: params,
            });
        },
    },
    ristRating: {
        async list(params = {}) {
            return await apiClient.get("vulnerabilities/risk_rating/", {
                params: params,
            });
        },
    },
    patches: {
        list(params = {}) {
            return get("patch/", params);
        },
        getById(id) {
            return get("patch/" + id + "/");
        },
    },

    securityTips: {
        async list(params = {}) {
            return await apiClient.get("securitytips/", {
                params :params
            });
        },
    },
    vulnerabilities: {
        async list(params = {}) {
            return await apiClient.get("vulnerabilities/", {
                params: params,
            });
        },
        getById(id){
            return get("vulnerabilities/" + id + "/");
        }
    },
    malwares: {
        graph(params = {}) {
        },
        getById(id) {
            return get("malware/" + id + "/");
        },
    },
    latestBreaches: {
        popup_data(params = {}) {
            return get("latest_breach/popup/", params);
        },
    },
    data2dna: {
        list(params = {}) {
            return get("data2dna/get_filters/", params);
        },
        async setFilter(params = {}) {
            //return post('data2dna/set_filters/', params);
            return await apiClient.post("data2dna/set_filters/", params);
        },
        async deleteFilter(id) {
            return await apiClient.delete("data2dna/" + id + "/");
        },
    },
    profile: {
        edit(id, params = {}) {
            return put("customer/" + id + "/", params);
        },
        changePassword(id, params = {}) {
            return put("customer/change_password/" + id + "/", params);
        },
        changePackage(params = {}) {
            //return await apiClientUnAuth.post('customer/change-package/', params);
            return post("customer/change-package/", params);
        }
    },
    userSetting: {
        list(params = {}) {
            return get("data2dna/user_settings/", params);
        },
    },
    globalSearch: {
        searchByKeyword(param = {}) {
            return get("common/search/", param);
        },
    },
    submitTicket: {
        create_ticket(params = {}) {
            return post('ticket/create_ticket/', params);
        },
        categories(params = {}) {
            return get('ticket/category/', params);
        }
    },
    advertisement: {
        listAds(params = {}) {
            return get('advertisement/', params);
        }
    },
    maps: {
        async dnsMap() {
            return await {
                count: 236,
                next: null,
                previous: null,
                results: [
                    {
                        id: 4,
                        title: 'Manly Beach',
                        lat: 22.105408,
                        lng: 47.771841
                    }

                ]
            }
        },
        async botNetMap() {
            return await {
                count: 236,
                next: null,
                previous: null,
                results: [
                    {
                        id: 1,
                        title: 'Cronulla Beach',
                        lat: 24.871139,
                        lng: 67.001080
                    },

                ]
            }
        },
        async routeMap() {
            return await {
                count: 236,
                next: null,
                previous: null,
                results: [
                    {
                        id: 2,
                        title: 'Canada',
                        lat: 59.286515,
                        lng: -98.068209
                    }

                ]
            }
        }
    }
};
