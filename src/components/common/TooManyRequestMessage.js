import React, {Component, useEffect, useState} from "react";
import {Modal} from "react-bootstrap";

class TooManyRequestMessage extends Component {

    state = {
        second: this.props.timer
    }

    componentDidMount() {


            this.interval = setInterval(() => {
                if(this.state.second > 0){
                    this.setState(prevState => ({
                        second: prevState.second - 1
                    }));
                }
            }, 1000);


    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
   
    render() {


        return (
            <React.Fragment>
            {(this.state.second < 1) ? 'Request was throttled. Expected available in'+this.state.second+' seconds.': null}
          </React.Fragment>
        );
    }
}

export default TooManyRequestMessage;