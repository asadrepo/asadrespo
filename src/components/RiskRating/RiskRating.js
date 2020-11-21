import React, {Component} from 'react';
import axios from "axios";
import Loader from "../common/Loader";
import RiskRatingList from "./components/RiskRatingList";
import axiosClient from "../../shared/axiosClient";
import WithDataExtraction from '../../hoc/WithDataExtraction';



// class RiskRating extends Component {
//     state = {
//         risk_ratings: [],
//         isLoading: false
//     }
//     async getRiskRating(){
//         return await axios.get(process.env.REACT_APP_API_URL+'vulnerabilities/risk_rating/', {
//             params: {
//             },
//             headers: {
//             }
//         });
//     }
//     componentDidMount() {
//         this.setState({
//             isLoading: true
//         });

//         axiosClient.ristRating.list().then(risk_ratings => {
//             console.log("risk Rating over here");    
//             console.log(risk_ratings);
//             this.setState({risk_ratings: risk_ratings.data.results, isLoading: false});

//         });
        
//         // this.getRiskRating().then(
//         //     risk_rating_respone => {
//         //         console.log(risk_rating_respone);
//         //         this.setState({risk_ratings: risk_rating_respone.data.results, isLoading: false});

//         //     }
//         // )
//     }

//     render() {
//         return (
//             <div className="col-md-4 col-sm-12 risk_rating_section pr-0">
//                 <div className="comon_bg_style risk_rating_inner">
//                     <h2>Risk Rating (CVSSv3)</h2>
//                     {this.state.isLoading ? <Loader /> : <RiskRatingList risk_ratings={this.state.risk_ratings} />}
//                 </div>
//             </div>
//         );
//     }
// }

// export default RiskRating;


class RiskRating extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        dataChange: "ok"
    }
    state = {
        risk_ratings: [],
        isLoading: false
    }
    // async getRiskRating(){
    //     return await axios.get(process.env.REACT_APP_API_URL+'vulnerabilities/risk_rating/', {
    //         params: {
    //         },
    //         headers: {
    //         }
    //     });
    // }
    componentDidMount() {
        this.setState({
            isLoading: true
        });

        axiosClient.ristRating.list().then(risk_ratings => {
            // console.log("risk Rating over here");    
        console.log(risk_ratings);
            this.setState({risk_ratings: risk_ratings.data.results, isLoading: false});

        });
        
        // this.getRiskRating().then(
        //     risk_rating_respone => {
        //         console.log(risk_rating_respone);
        //         this.setState({risk_ratings: risk_rating_respone.data.results, isLoading: false});

        //     }
        // )
    }

    render() {
        return (
            <div className="col-md-4 col-sm-12 risk_rating_section">
                <div className="comon_bg_style risk_rating_inner">
                    <h2>Risk Rating (CVSSv3)</h2>
                    {this.props.isLoading ? <Loader /> : <RiskRatingList risk_ratings={this.state.risk_ratings} />}
                </div>
            </div>
        );
    }
}

export default RiskRating;
//export default WithDataExtraction(RiskRating, axiosClient.ristRating.list());