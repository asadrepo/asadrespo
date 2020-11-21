import React, {Component} from 'react';

class ErrorBoundary extends Component {


    // state = {
    //     hasError: false
    // }

    constructor(props){

        super(props);
        this.state = { error: null, errorInfo: null };
    }

    // static getDerivedStateFromError(error) {

    //     console.log("herererer ub error boundary");
    //     return {
    //         hasError: true
    //     }
    // }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message

        console.log("componenet did catch in error boundry")
        this.setState({
          error: error,
          errorInfo: errorInfo,
          hasError: true
        })
        // You can also log error messages to an error reporting service here
      }

    render() {
        if(this.state.errorInfo){
            return (
                <div className="col-md-12 col-xs-12 security_tips_section">
                <div className="security_tips_inner_section clearfix">
                    <h4> Something went wrong</h4>
                </div>
                </div>
            )
        }

        return this.props.children;
       
    }
}

export default ErrorBoundary;