import axios from "axios";
import React from "react";
import Moment from "react-moment";

export const APP_SETTINGS  = {
    DATE_FORMAT: 'YYYY-MM-DD'
}


export const dateFormat = (date) => {

    return (date) ? <Moment format={APP_SETTINGS.DATE_FORMAT}>{date}</Moment> : "";
}

export const advisoryRating = (data) => {
    switch (parseInt(data)){
        case 1:
            return 'High';
        case 2:
            return 'Medium';
        case 3:
            return 'Low';
        default:
            return '';
    }
}



export const subStringText = (str, offset, limit) => {
    if(str !== "" && str !== null){
       return str.substring(offset, limit)
    }

    return "";
}

export const getValueIfExist = (data, property) => {
    if(data.hasOwnProperty(property)){
        return data[property];
    }
    return "";
}

export const getCountries = async () => {
   return  await axios.get(process.env.REACT_APP_API_URL+'countries/', {
       params: {
           limit: 236
       }
   }).then(
       response => {
           return response.data.results;
       }
   ).catch(error => {
       return [];
   });
}
export const arraySeparator = (data = [], key = 'name', separator = ', ') => {
    if(data !== null) {
        return data?.length > 0 ? data.map((res, index) => {
            let name = res[key];
            let sep = index !== data.length - 1 ? separator : '';
            return name + sep;
        }) : 'None';
    }

    return 'None';
   
}

export const capitalizeText = (str) => {
    return str.split('_').join(' ');
}
export const validateEmail = (email) => {
    var regExp =    /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    return regExp.test(email);
}

export const vulnerbilityBase = (base) => {
    if(base >= 5 && base <= 5.9){
        return 'base_c2';
    } else if (base >= 6 && base <= 8) {
        return 'base_c3';
    } else if(base >= 8){
        return 'base_c4';
    }

    return 'base_c1';
}


export const topVulnerbilitiesChartConfigue = {
    type: 'pie',
    innerRadius: '30%',
    background: {
        fill: 'transparent'
    },
    center: {
        fill:{
            src: 'images/donut_chart_map.png',
            url: 'http://www.google.com'
        }
    },
    data: [

    ],
    className: 'graph-cont',
    id: 'container',
    // legend: {
    //     itemsLayout: 'horizontal-expandable',
    //
    // }
};

export const malwarChartConfigure = {
    type: 'pie',
    innerRadius: '30%',
    background: {
        fill: 'transparent'
    },
    center: {
        fill:{
            src: 'images/donut_chart_map.png',
            url: 'http://www.google.com'
        }
    },
    data: [
    ],
    className: 'graph-cont',
    id: 'container1'
}

export const latestChartBreachesConfigure = {
    type: 'pie',
    innerRadius: '30%',
    background: {
        fill: 'transparent'
    },
    center: {
        fill:{
            src: 'images/donut_chart_map.png',
            url: 'http://www.google.com'
        }
    },
    data: [

    ],
    className: 'graph-cont',
    id: 'container2'
}