import React, {useEffect, useState} from 'react';

const Pagination = (props) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <React.Fragment>
                    <li key={0} className='page-item'>
                        <a style={{cursor: 'pointer'}} onClick={() => props.paginate(parseInt(props.activePageNumber)-2, parseInt(props.activePageNumber)-1)} className="page-link"  aria-label="Previous">
                            <span aria-hidden="true">{<img src="images/arrow-left.png" alt="Arrow Left" />}</span>
                        </a>
                    </li>
                </React.Fragment>
                {pageNumbers.map((number, index) => {

                    return (<li key={number} className='page-item'>
                        <a style={{cursor: 'pointer'}} onClick={() => props.paginate(index, number)}
                           className={number === props.activePageNumber ? 'page-link active' : 'page-link'}>
                            {number}
                        </a>
                    </li>);

                })}
                <React.Fragment>
                    <li key={0} className='page-item'>
                        <a style={{cursor: 'pointer'}} onClick={() => props.paginate(props.activePageNumber, props.activePageNumber + 1)} className="page-link"  aria-label="Previous">
                            <span aria-hidden="true"><img src="images/arrow-right.png" alt="Arrow Right" /></span>
                        </a>
                    </li>
                </React.Fragment>
            </ul>
        </nav>
    );
};

export default Pagination;