import React, {Component} from 'react';
import OwlCarousel from "react-owl-carousel2";
import {SlideOne} from "../SlideOne";
import {SlideTwo} from "../SlideTwo";
import {SlideThree} from "../SlideThree";
import {SlideFour} from "../SlideFour";
import MainLayout from '../Layout/MainLayout'
import Data2Dna from '../Widgets/Data2Dna';
import UserSetting from '../Widgets/UserSetting';
import PopupHOC from "../../hoc/PopupHOC";
import axiosClient from "../../shared/axiosClient";
import AdvertisementPopup from "../../components/common/AdvertisementPopup";

class Home extends Component {


    constructor() {
        super();
        var _this = this;
        //this.events.onChanged = this.events.onChanged.bind(this);
    }

    state = {
        isModelshow: false,
        timer: 10,
        adContainer: null,
        loadedModule: 0,
        screenOneAd: {

        },
        screenTwoAd: {

        },
        screenThreeAd: {

        },
        screenFourAd: {

        },
         startPosition: 1,
        positionState: 0,
    }



    handleOnClickMapWidget = () => {
        console.log("hererer");
    }


    updateCarouselPosition(object){ if(object.item.index != this.state.startPosition){ this.setState({ startPosition: object.item.index }); } }
    componentDidMount() {
        axiosClient.advertisement.listAds().then(response => {
           const ads = response.data.results;
           ads.map(ad => {
               console.log(ad);
               if(ad.screen.includes('3')){
                   console.log("in add one state");
                    this.setState({
                        screenOneAd: ad
                    });
               }

               if(ad.screen.includes('3')){
                
                     this.setState({
                        screenTwoAd: ad
                     });
                }
               
           })
        });
       // window.addEventListener('load', this.handleLoad);
    }

    componentWillUnmount() {

    }

    onChangedSlider = (event) => {
        console.log('ON click change slider', this.state.positionState);
        this.setState({
            positionState: 1
        })
    }
    secondClickSlider = () => {
        console.log("this is s")
    }

    handleLoad = () => {
        //this.props.handleOnClickModal(<AdvertismentPopup />, 'none');
    }

    // componentDidMount() {
    //
    //     this.props.handleOnClickModal(<AdvertismentPopup />, 'none');
    // }

    events = {
        onDragged: function(event) {

        },
        onChanged: function(event) {
             console.log("this is worked" + event.item.index);


            // this.setState({
            //     positionState: 1
            // })

            // this.updateCarouselPosition(event)

            // this.setState({
            //     loadedModule: event.item.index
            // });
            
            // alert(this.state.loadedModule);
        }
    }
    render() {
        const options = {
            autoplay:false,
            items:1,
            nav: false,
            mouseDrag: false,
            startPosition: this.state.startPosition,
            // items: 1,
            dotsEach: true,
            dotsData: true,
            dots: true,
            // responsive: {
            //     0: {
            //         items: 1
            //     },
            //     600: {
            //         items: 1
            //     },
            //     1000: {
            //         items: 1,
            //         nav: false
            //     },
            //     1200: {
            //         items: 1,
            //         nav: false
            //     }
            // },

            // rewind: true,
            // autoplay: false,
            // navText: [
            //     '<span aria-label="' + 'Previous' + '">&#x2039;</span>',
            //     '<span aria-label="' + 'Next' + '">&#x203a;</span>'
            // ],
            // navSpeed: false,
            // navElement: 'button type="button" role="presentation"',
            // navContainerClass: 'owl-nav',
            dotClass: 'carousel-indicators',
            dotsClass: 'carousel-indicators-dots',
            // dotsContainer: false,
        };

        return (
            <MainLayout>
                <OwlCarousel options={options} events={this.events} >
                    <div className="carousel-item active" data-dot="<span></span>">
                       <SlideOne ad={this.state.screenOneAd} />
                    </div>
                    <div className="carousel-item active" data-dot="<span></span>">
                        <SlideTwo ad={this.state.screenTwoAd} onClickSecond={this.secondClickSlider} />
                    </div>
                    <div className="carousel-item active" data-dot="<span></span>">
                        <SlideFour />
                    </div>
                    <div className="carousel-item active" data-dot="<span></span>">
                        <SlideThree />
                    </div>
                    
                </OwlCarousel>
                <AdvertisementPopup isShow={this.state.isModelshow}

                                    container={this.state.adContainers}
                                    timer={52}
                />
                {/*<Data2Dna />*/}
                {/*<UserSetting />*/}
            </MainLayout>
        );
    }
}

export default PopupHOC(Home);