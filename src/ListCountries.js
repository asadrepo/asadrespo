import React, {Component} from 'react';

const ListCountries = props => {
    const arrayResult = props.countries;

    // eslint-disable-next-line array-callback-return
    arrayResult.map((country) => {
       console.log(country.name);
    });

  // const listRender = props.countries.map((country) => {
  //    return "ssdf";
  // });
   return "sdfsdf";
};

export default ListCountries;