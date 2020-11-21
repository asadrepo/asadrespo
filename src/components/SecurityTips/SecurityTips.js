import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/lib/styles.css";
import axios from "axios";
import List from "./List";
import Loader from "../common/Loader";
import axiosClient from "../../shared/axiosClient";
import { ConsoleWriter } from "istanbul-lib-report";
import PopupHOC from "../../hoc/PopupHOC";
import SecurityTipPopup from "./SecurityTipPopup";
class SecurityTips extends Component {
  state = {
    pagination: {
      next: process.env.REACT_APP_API_URL + "securitytips/",
      count: 0,
    },
    security_tips: [1],
    isLoading: false,
    hasError: null,
  };
  async getSecurityTips(pagination) {
    let yourconfig = {
      headers: {
        authorization: "Token 977746ca9e1fe6471aeaf7e8c708cb46226f38a1",
      },
    };
    return await axios.get(pagination.next, yourconfig);
  }

  handleOnClickDetail = (security_tip) => {
    this.props.handleOnClickModal(
      <SecurityTipPopup security_tip={security_tip} />
    );
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    // fetch(process.env.REACT_APP_API_URL+'securitytips/', {
    //         method: 'GET',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //           'Authorization': 'Token 977746ca9e1fe6471aeaf7e8c708cb46226f38a1'
    //         }
    // }).then(res => res.json())
    //   .then(
    //     (result) => {
    //      console.log("in security tip success");
    //      console.log(result);
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //         console.log("in security tip error");
    //         console.log(error);
    //     }
    //   )

    axiosClient.securityTips
      .list({ limit: 10 })
      .then((security_tips) => {
        this.setState({
          security_tips: security_tips.data.results,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          hasError: error,
        });
      });
    // this.getSecurityTips(this.state.pagination).then(security_tips => {
    //     this.setState({
    //         security_tips: security_tips.data.results,
    //         isLoading: false
    //     })
    // });
  }

  render() {
    if (this.state.hasError) {
      throw new Error(this.state.hasError);
    }

    const options = {
        autoplay: true,
        items: 1,
        dotsEach: true,
        dotsData: true,
        dots: true,
        loop: false,
        dotClass: "carousel-indicators",
        dotsClass: "carousel-indicators-dots",
    };

    const events = {
      onDragged: function (event) {},
      onChanged: function (event) {},
    };
    return (
      <div className="col-md-12 col-xs-12 threat_intel_section">
        <div className="security_tips_inner_section clearfix">
          <h4>Security Tips</h4>
          <section className="lazy slider" data-sizes="50vw">
          <OwlCarousel options={options} events={events}>
            {this.state.isLoading && this.state.security_tips.length > 1 ? (
              <Loader />
            ) : (
              this.state.security_tips.map((security_tip, index) => {
                return (
                  <List
                    key={index}
                    security_tip={security_tip}
                    onClickDetail={this.handleOnClickDetail}
                  />
                );
              })
            )}
          </OwlCarousel>
          </section>
        </div>
      </div>
    );
  }
}

export default PopupHOC(SecurityTips);
