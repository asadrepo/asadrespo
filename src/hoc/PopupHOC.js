import Popup from "../components/common/Popup";
import React, {Component} from "react";

const PopupHOC = (WrappedComponent) => {
    return class PopupHOC extends Component {

        constructor(props) {
            super(props);
        }

        state = {
            isModalShow: false,
            container: null,
            size: 'lg',
            contentClassName: 'comon_modal_content',
            timer: 0,
            isCloseClicked: false
        }
        handleOnClose = () => {
          this.setState({
            isCloseClicked: true
          });
            this.setState({
                isModalShow: false,
               
            })
        }

        showModalOnclick = (container, size = 'lg', contentClassName = 'comon_modal_content', timer = 0) => {
            this.setState({
                container: container,
                size: size,
                contentClassName: contentClassName,
                timer: timer
            });
           this.setState({
               isModalShow: true
           });
        }
        
        render (){
            
           return (
               <React.Fragment>
                    <WrappedComponent  handleOnClickModal={this.showModalOnclick} {...this.props}  handleOnCloseClick={this.handleOnClose} handleIsCloseClicked={this.state.isCloseClicked}/>
                    <Popup isShow={this.state.isModalShow}
                           container={this.state.container}
                           onClosePop={this.handleOnClose}
                           size={this.state.size}
                           className={this.state.contentClassName}
                           timer={this.state.timer}
                    />
               </React.Fragment>
           );

        }
    }
}
export default PopupHOC;