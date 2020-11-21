import React from 'react';

const Loader = ({size = 'lg'}) => {
    return (
        <React.Fragment>
            {size === 'lg' ? <div className="d-flex align-items-center" style={{color:'white'}}>
            <div className="loading">Loading;</div>
            </div> : <div className="spinner-border spinner-border-sm" role="status">
  <span className="sr-only">Loading...</span>
</div>}
            
        </React.Fragment>
    );
};

export default Loader;