import React, {Component} from "react";


const WithDataExtraction = (WrappedComponent, dataSource) => {
    return class WithDataExtraction extends Component {

        constructor(props) {
            super(props);
        }

        state = {
            isLoading: true,
            dataResult: []
        }

        componentDidMount() {
            this.setState({
                isLoading: true
            });
    
            dataSource.then(response => {
                this.setState({dataResult: response.data.results, isLoading: false});
                this.setState({isLoading: false});
    
            });


        }
     
        render (){
            
           return (
               <React.Fragment>
                    <WrappedComponent 
                        dataResult={this.state.dataResult} 
                        isLoading={this.state.isLoading}
                         {...this.props} 
                     />
               </React.Fragment>
           );

        }
    }
}
export default WithDataExtraction;