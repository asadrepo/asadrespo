import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("Error Boundry");
    console.log("Error", error);
    console.log("Error Info", errorInfo);
    this.setState({errorInfo: error})
  }

  render() {
    if (this.state.hasError) {
    
      return  <div className="col-md-12 col-xs-12 security_tips_section">
                <div className="security_tips_inner_section clearfix">
                    <h4>Error!</h4>
                    <div className="row" style={{color: 'white'}}><p>Something went wrong.</p></div>
                    
                </div>

            </div>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;