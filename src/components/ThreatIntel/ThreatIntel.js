import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel2";
import axios from "axios";
import Loader from "../common/Loader";
import List from "./List";
import Popup from "../common/Popup";
import ThreatIntelDetail from "./ThreatIntelDetail";
import { getToken } from "../../containers/Auth/Auth";

class ThreatIntel extends Component {
  state = {
    pagination: {
      next: process.env.REACT_APP_API_URL + "threat_intel/",
      count: 0,
    },
    threat_intels: [1],
    isLoading: false,
    isModalShow: false,
    popUpContainer: null,
  };
  async getThreatIntels(pagination) {
    return await axios.get(pagination.next, {
      params: {},
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    });
  }

  componentDidMount() {
      console.log("threat intel length", this.state.threat_intels.length);
    this.setState({ isLoading: true });
    this.getThreatIntels(this.state.pagination).then((threat_intel) => {
      console.log(threat_intel.data.results.length);
      this.setState({
        threat_intels: threat_intel.data.results,
        isLoading: false,
      });


    });
  }

  handleOnClickDetail = (threat_intel) => {
      console.log(this.state.threat_intels.length)
    this.setState({
      popUpContainer: <ThreatIntelDetail threat_intel={threat_intel} />,
    });
    this.setState({ isModalShow: true });
  };

  render() {
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
      <div className="col-md-12 threat_intel_section">
        <div className="security_tips_inner_section clearfix">
          <h4>Threat Intel</h4>
          <section className="lazy slider" data-sizes="50vw">
            <OwlCarousel options={options} events={events}>
              {this.state.isLoading && this.state.threat_intels.length > 1 ? (
                <Loader />
              ) : (
                this.state.threat_intels.map((threat_intel, index) => {
                  return (
                    <List
                      key={index}
                      threat_intel={threat_intel}
                      onClickDetail={this.handleOnClickDetail}
                    />
                  );
                })
              )}
            </OwlCarousel>
          </section>
        </div>
        <Popup
          isShow={this.state.isModalShow}
          onClosePop={() => this.setState({ isModalShow: false })}
          container={this.state.popUpContainer}
        />
      </div>
    );
  }
}

export default ThreatIntel;
