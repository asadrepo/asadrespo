import React from 'react';

const RatingImage = ({rating}) => {
    return (
        <img src={'/images/'+rating+'-active.jpg'} alt="Severity" />
    );
};

export default RatingImage;
