import React from "react";
import OwlCarousel from "react-owl-carousel2";
import ReactHtmlParser from "react-html-parser";

const List = (props) => {
  return (
    <React.Fragment>
      <div className="st_inner">
        <a onClick={() => props.onClickDetail(props.security_tip)}>
          <label htmlFor="SecurityTips">{props.security_tip.title}</label>
        </a>
        <div> {ReactHtmlParser(props.security_tip.description)}</div>
      </div>
    </React.Fragment>
  );
};
export default List;
