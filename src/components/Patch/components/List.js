import React from 'react';
import ReactHtmlParser from 'react-html-parser';
const List = (props) => {
   return props.patches.map(patch => {
        let title = patch.title.split('|');
       return ( <div key={patch.id}><a style={{cursor: 'pointer'}} onClick={() => props.onClickDetail(patch)}>{title[0]} | <span className="comon_green_color">{title[1]}</span></a>
            <span>{ReactHtmlParser(patch.short_description)}</span></div>);
    });


};

export default List;
