import React, {useEffect, useState} from 'react';
import {getCountries} from "../../helpers";

const CountriesDropDown = ({label, name, id, onChange, countries}) => {

    return (
       <React.Fragment>
           <label htmlFor="issuerCountry">{label}</label>
           <select name={name} id={id} onChange={onChange}>
                <option key={0} value={''} >All Countries</option>
               {countries.map(country => {
                   return (<option key={country.id} value={country.id}>{country.name}</option>);
               })}
           </select>
       </React.Fragment>
    );
};

export default CountriesDropDown;
